import type { Dispatch, FC, RefObject, SetStateAction } from 'react';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import type { Event } from 'graphql/schema.types';
import React, { useState } from 'react';
import { shortenString } from 'util/string-shortener';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { useForm, useSelect } from '@refinedev/antd';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { TemplatesListQuery } from 'graphql/types';
import { TEMPLATES_QUERY } from 'graphql/queries';
import { getBusiness } from 'util/get-business';
import { requiredOptionalMark } from '../requiredMark';
import { CREATE_EVENT_MUTATION } from 'graphql/mutations';
import dayjs from 'dayjs';
import './index.module.css';
import { uploadCreate } from '../upload/util';

type FullCalendarWrapperProps = {
  calendarRef: RefObject<FullCalendar>;
  events: Partial<Event>[];
  onClickEvent?: (event: any) => void;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
};

const renderEventContent = (eventInfo: any) => {
  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <p style={{ marginRight: 5 }}>{eventInfo.timeText}</p>
        <b>
          {['timeGridWeek', 'dayGridMonth'].includes(eventInfo.view.type)
            ? shortenString(10, eventInfo.event.title)
            : eventInfo.event.title}
        </b>
      </div>
    </React.Fragment>
  );
};

const FullCalendarWrapper: FC<FullCalendarWrapperProps> = ({
  calendarRef,
  events,
  onClickEvent,
  setTitle,
}) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | undefined>(
    undefined,
  );

  const {
    formProps,
    onFinish,
    form,
    formLoading,
    mutation: { isLoading },
  } = useForm({
    action: 'create',
    resource: 'events',
    redirect: false,
    mutationMode: 'pessimistic',
    meta: {
      customType: true,
      gqlMutation: CREATE_EVENT_MUTATION,
    },
    submitOnEnter: true,
  });

  const { selectProps: templateSelectProps, queryResult: templateQueryResult } =
    useSelect<GetFieldsFromList<TemplatesListQuery>>({
      resource: 'event-templates',
      optionLabel: 'name',
      optionValue: 'id',
      meta: {
        gqlQuery: TEMPLATES_QUERY,
      },
      pagination: {
        pageSize: 20,
        mode: 'server',
      },
      filters: [
        {
          field: 'business.id',
          operator: 'eq',
          value: getBusiness().id,
        },
        {
          field: 'type',
          operator: 'eq',
          value: 'Child',
        },
      ],
      sorters: [
        {
          field: 'created',
          order: 'desc',
        },
      ],
    });

  const showModal = (info: any) => {
    setModalContent(info.startStr);
    setOpen(true);
  };

  const handleOk = async () => {
    await form.validateFields();
    const templateId = form.getFieldValue('template');
    const temp = templateQueryResult.data?.data.filter(
      (template) => template.id == templateId,
    )[0];
    const { business, venue, id, type, created, posterUrl, ...event } = {
      ...temp,
    };
    const poster = await uploadCreate('posters', new FormData(), posterUrl);
    onFinish({
      ...event,
      posterUrl: poster,
      eventTemplateId: id,
      businessId: business?.id,
      venueId: venue?.id,
      name: form.getFieldValue('name'),
      date: form.getFieldValue('date').toDate(),
    });
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    form.setFieldValue('date', undefined);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        destroyOnClose
        centered
        open={open}
        title="Create event"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
            Create
          </Button>,
        ]}
      >
        <Form
          {...formProps}
          layout="vertical"
          requiredMark={requiredOptionalMark}
        >
          <Space style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <Form.Item
              label="Template"
              name="template"
              rules={[{ required: true, message: '' }]}
            >
              <Select
                allowClear={true}
                placeholder="Template"
                {...templateSelectProps}
                options={templateQueryResult.data?.data.map((template) => ({
                  value: template.id,
                  label: template.name,
                }))}
                onSelect={(id) => {
                  const temp = templateQueryResult.data?.data.filter(
                    (template) => template.id == String(id),
                  )[0];
                  form.setFieldValue('name', temp?.name);
                }}
              />
            </Form.Item>
          </Space>
          <Space style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: '' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Space>
          <Space style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <Form.Item
              label="Date - Time"
              name="date"
              rules={[{ required: true, message: '' }]}
              initialValue={dayjs(modalContent)}
              getValueProps={(value) => ({
                value: modalContent ? dayjs(modalContent) : value,
              })}
            >
              <DatePicker
                showTime
                onChange={() => setModalContent(undefined)}
                format="D. M. YYYY - H:mm"
                placeholder="Date - Time"
                allowClear={true}
                needConfirm={false}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                }}
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={'timeGridWeek'}
        selectable={true}
        unselectAuto={true}
        select={showModal}
        firstDay={1}
        selectAllow={(selectInfo) => {
          const { start, end } = selectInfo;
          return end.getTime() - start.getTime() === 1800000;
        }}
        events={events}
        eventTextColor="black"
        displayEventEnd={false}
        eventContent={renderEventContent}
        eventDisplay="block"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false,
        }}
        views={{
          timeGridDay: {
            dayHeaderFormat: {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
            },
          },
          dayGridMonth: { dayHeaderFormat: { weekday: 'long' } },
        }}
        dayHeaderFormat={{
          month: 'short',
          day: 'numeric',
          omitCommas: false,
        }}
        eventClick={onClickEvent}
        datesSet={({ view }) => {
          setTitle(view.title);
        }}
        headerToolbar={false}
        timeZone="local"
        height={700}
        allDaySlot={false}
        nowIndicator={true}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: true,
          hour12: false,
          meridiem: 'short',
        }}
      />
    </React.Fragment>
  );
};

export default FullCalendarWrapper;
