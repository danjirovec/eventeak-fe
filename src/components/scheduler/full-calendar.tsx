import type { Dispatch, FC, RefObject, SetStateAction } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { Event } from 'graphql/schema.types';
import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Space,
} from 'antd';
import { useForm, useSelect } from '@refinedev/antd';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { TemplatesListQuery } from 'graphql/types';
import { TEMPLATES_QUERY } from 'graphql/queries';
import { requiredOptionalMark } from '../requiredMark';
import { CREATE_EVENT_MUTATION } from 'graphql/mutations';
import dayjs from 'dayjs';
import './index.module.css';
import { useGlobalStore } from 'providers/context/store';
import { Text } from '../text';

type FullCalendarWrapperProps = {
  calendarRef: RefObject<FullCalendar>;
  events: Partial<Event>[];
  onClickEvent?: (event: any) => void;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
};

const renderEventContent = (eventInfo: any) => {
  return (
    <Flex wrap="nowrap" align="center" style={{ overflow: 'hidden' }}>
      <Text
        style={{
          margin: 0,
          marginRight: 5,
          whiteSpace: 'nowrap',
          color: eventInfo.textColor,
        }}
      >
        {eventInfo.timeText}
      </Text>
      <Text
        style={{
          fontWeight: 700,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: eventInfo.textColor,
        }}
      >
        {eventInfo.event.title}
      </Text>
    </Flex>
  );
};

const FullCalendarWrapper: FC<FullCalendarWrapperProps> = ({
  calendarRef,
  events,
  onClickEvent,
  setTitle,
}) => {
  const business = useGlobalStore((state) => state.business);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | undefined>(
    undefined,
  );

  const { formProps, onFinish, form, formLoading } = useForm({
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

  const { selectProps: templates, query: templatesQuery } = useSelect<
    GetFieldsFromList<TemplatesListQuery>
  >({
    resource: 'templates',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: TEMPLATES_QUERY,
    },
    pagination: {
      pageSize: 50,
      mode: 'server',
    },
    filters: [
      {
        field: 'business.id',
        operator: 'eq',
        value: business?.id,
      },
      {
        field: 'type',
        operator: 'eq',
        value: 'Leaf',
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    queryOptions: {
      enabled: !!business,
    },
  });

  const showModal = (info: any) => {
    setModalContent(info.startStr);
    setOpen(true);
  };

  const handleOk = async () => {
    const valid = await form.validateFields().catch(() => {
      return;
    });
    if (!valid) {
      return;
    }
    const templateId = form.getFieldValue('template');
    onFinish({
      templateId: templateId,
      businessId: business?.id,
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
        title="Create Event"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={formLoading}
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
                {...templates}
                options={templates.options}
                onSelect={(id) => {
                  const temp = templatesQuery.data?.data.find(
                    (template) => template.id == String(id),
                  );
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
                minDate={dayjs()}
                showNow={false}
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
        expandRows={true}
        unselectAuto={true}
        select={showModal}
        firstDay={1}
        selectAllow={(selectInfo) => {
          const { start, end } = selectInfo;
          return end.getTime() - start.getTime() === 1800000;
        }}
        selectConstraint={{
          start: new Date().toISOString(),
          end: undefined,
        }}
        events={events}
        eventTextColor="#1d1d1d"
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
