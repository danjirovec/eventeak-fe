import React, { useState } from 'react';

import { CreateButton } from '@refinedev/antd';
import { useCreate, useDelete, useList, useNavigation } from '@refinedev/core';

import { Button, Col, DatePicker, Form, Modal, Popconfirm, Row } from 'antd';

import { UpcomingEvents } from 'components';

import { Calendar } from 'components/scheduler';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { EventsListQuery } from 'graphql/types';
import { getBusiness } from 'util/get-business';
import { EVENTS_QUERY } from 'graphql/queries';
import dayjs from 'dayjs';
import { CalendarCategories } from 'components/scheduler/categories';
import { CategoryTag } from 'components';
import { Text } from 'components/text';
import {
  CalendarOutlined,
  CommentOutlined,
  FlagOutlined,
  HomeOutlined,
  HourglassOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { requiredOptionalMark } from 'components/requiredMark';
import { CREATE_EVENT_MUTATION } from 'graphql/mutations';
import { uploadCreate } from 'components/upload/util';

type EventInfoProps = {
  id: string;
  name: string;
};

export const CalendarPageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [form] = Form.useForm();
  const { create, edit } = useNavigation();
  const { mutate: deleteMutate } = useDelete();
  const { mutate: cloneMutate } = useCreate();
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventInfoProps | undefined>(
    undefined,
  );
  const [selectedEventCategory, setSelectedEventCategory] = useState<string[]>(
    [],
  );

  const { data, isLoading } = useList<GetFieldsFromList<EventsListQuery>>({
    resource: 'events',
    pagination: {
      pageSize: 50,
    },
    sorters: [
      {
        field: 'date',
        order: 'asc',
      },
    ],
    filters: [
      {
        field: 'businessId',
        operator: 'eq',
        value: getBusiness().id,
      },
      {
        field: 'category',
        operator: 'in',
        value: selectedEventCategory,
      },
    ],
    meta: {
      gqlQuery: EVENTS_QUERY,
      empty: getBusiness().id ? false : true,
    },
  });

  const showModal = (info: any) => {
    setEventInfo({
      id: info.event._def.publicId,
      name: info.event._def.title,
    });
    setOpen(true);
  };

  const handleEdit = () => {
    if (eventInfo?.id) {
      edit('events', eventInfo.id);
    }
  };

  const handleDelete = () => {
    if (eventInfo?.id) {
      deleteMutate({
        resource: 'events',
        id: eventInfo.id,
      });
    }
    setOpen(false);
  };

  const handleClone = async () => {
    await form.validateFields();
    if (eventInfo?.id) {
      const eventToClone = data?.data.filter(
        (event) => event.id === eventInfo.id,
      )[0];
      const {
        id,
        business,
        created,
        venue,
        eventTemplate,
        posterUrl,
        ...event
      } = {
        ...eventToClone,
      };
      const poster = await uploadCreate('posters', new FormData(), posterUrl);
      const values = {
        ...event,
        posterUrl: poster,
        date: form.getFieldValue('date'),
        businessId: business?.id,
        venueId: venue?.id,
        eventTemplateId: eventTemplate?.id,
      };
      cloneMutate({
        resource: 'events',
        values: values,
        meta: { customType: true, gqlMutation: CREATE_EVENT_MUTATION },
      });
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.setFieldValue('date', undefined);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        destroyOnClose
        centered
        open={open}
        title={eventInfo?.name}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            title={
              <Text size="sm" style={{ fontWeight: 600 }}>
                Are you sure?
              </Text>
            }
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger key="submit" type="default">
              Delete
            </Button>
          </Popconfirm>,
          <Popconfirm
            title="Choose date"
            description={
              <Form
                form={form}
                requiredMark={requiredOptionalMark}
                layout="vertical"
              >
                <Form.Item
                  label=" "
                  style={{ marginTop: 10, marginBottom: 10 }}
                  name="date"
                  rules={[{ required: true, message: '' }]}
                >
                  <DatePicker
                    showTime
                    format="D. M. YYYY - H:mm"
                    placeholder="Date - Time"
                    allowClear={true}
                    needConfirm={false}
                  />
                </Form.Item>
              </Form>
            }
            onConfirm={handleClone}
            okText="Duplicate"
            cancelText="Cancel"
          >
            <Button key="submit" type="default">
              Duplicate
            </Button>
          </Popconfirm>,
          <Button key="submit" type="primary" onClick={handleEdit}>
            Edit
          </Button>,
        ]}
      >
        {data?.data
          .filter((event) => eventInfo?.id == event.id)
          .map((event) => (
            <div
              key={event.id}
              style={{ display: 'flex', flexDirection: 'column', gap: 15 }}
            >
              <div style={{ marginTop: 15 }}>
                <FlagOutlined style={{ marginRight: 10 }} />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Category:
                </Text>
                <CategoryTag category={event.category} />
              </div>
              <div>
                <CalendarOutlined style={{ marginRight: 10 }} />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Date:
                </Text>
                <Text size="sm" strong>
                  {dayjs(event.date)
                    .format('dddd - D. M. YYYY - HH:mm')
                    .toString()}
                </Text>
              </div>
              <div>
                <HomeOutlined style={{ marginRight: 10 }} />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Venue:
                </Text>
                <Text strong size="sm">
                  {event.venue.name}
                </Text>
              </div>
              <div>
                <HourglassOutlined style={{ marginRight: 10 }} />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Length:
                </Text>
                <Text strong size="sm">{`${event.length} minutes`}</Text>
              </div>
              <div>
                <SoundOutlined style={{ marginRight: 10 }} />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Audio:
                </Text>
                <Text strong size="sm">
                  {event.language}
                </Text>
              </div>
              <div>
                <CommentOutlined style={{ marginRight: 10 }} />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Subtitles:
                </Text>
                <Text strong size="sm">
                  {event.subtitles ? event.subtitles : 'None'}
                </Text>
              </div>
            </div>
          ))}
      </Modal>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={6}>
          <CreateButton
            onClick={() => create('events')}
            block
            size="large"
            style={{ marginBottom: '1rem' }}
          >
            Create event
          </CreateButton>
          <UpcomingEvents loading={isLoading} data={data} />
          <CalendarCategories
            onChange={(event) => {
              setSelectedEventCategory((prev) => {
                if (prev.includes(event.target.value)) {
                  return prev.filter((item) => item !== event.target.value);
                }

                return [...prev, event.target.value];
              });
            }}
          />
        </Col>
        <Col xs={24} xl={18}>
          <Calendar data={data} onClickEvent={showModal} />
        </Col>
      </Row>
      {children}
    </div>
  );
};
