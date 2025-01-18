import React, { useState } from 'react';
import { CreateButton } from '@refinedev/antd';
import {
  useCreate,
  useCustom,
  useDelete,
  useList,
  useNavigation,
} from '@refinedev/core';
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Modal,
  Popconfirm,
  Row,
} from 'antd';
import { UpcomingEvents } from 'components';
import { Calendar } from 'components/scheduler';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { EventsListQuery } from 'graphql/types';
import { EVENT_TICKETS_SOLD, EVENTS_QUERY } from 'graphql/queries';
import dayjs from 'dayjs';
import { CalendarCategories } from 'components/scheduler/categories';
import { CategoryTag } from 'components';
import { Text } from 'components/text';
import {
  CalendarTwoTone,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeTwoTone,
  HourglassTwoTone,
  MessageTwoTone,
  ShoppingCartOutlined,
  ShoppingTwoTone,
  SoundTwoTone,
  TagTwoTone,
} from '@ant-design/icons';
import { requiredOptionalMark } from 'components/requiredMark';
import { CREATE_EVENT_MUTATION } from 'graphql/mutations';
import { useGlobalStore } from 'providers/context/store';

type EventInfoProps = {
  id: string;
  name: string;
  date: Date;
};

export const CalendarPageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const business = useGlobalStore((state) => state.business);
  const [form] = Form.useForm();
  const { create, edit, replace } = useNavigation();
  const { mutate: deleteMutate, isLoading: deleteLoading } = useDelete();
  const { mutate: cloneMutate, isLoading: cloneLoading } = useCreate();
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventInfoProps | undefined>(
    undefined,
  );
  const [selectedEventCategory, setSelectedEventCategory] = useState<string[]>(
    [],
  );

  const { data, isFetching: isLoading } = useList<
    GetFieldsFromList<EventsListQuery>
  >({
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
        field: 'business.id',
        operator: 'eq',
        value: business?.id,
      },
      {
        field: 'template.category',
        operator: 'in',
        value: selectedEventCategory,
      },
    ],
    meta: {
      gqlQuery: EVENTS_QUERY,
    },
    queryOptions: {
      enabled: !!business,
    },
  });

  const showModal = (info: any) => {
    setEventInfo({
      id: info.event._def.publicId,
      name: info.event._def.title,
      date: new Date(info.event._instance.range.end),
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
    await form.validateFields().catch(() => {
      return;
    });
    if (eventInfo?.id) {
      const eventToClone = data?.data.find(
        (event) => event.id === eventInfo.id,
      );
      const values = {
        name: eventToClone?.name,
        date: form.getFieldValue('date'),
        businessId: business?.id,
        templateId: eventToClone?.template.id,
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

  const {
    data: soldData,
    isFetching: soldDataLoading,
    refetch: soldRefetch,
  } = useCustom({
    url: '',
    method: 'post',
    meta: {
      gqlQuery: EVENT_TICKETS_SOLD,
      meta: JSON.stringify({ meta: business?.id }),
      empty: !business,
    },
  });

  return (
    <Flex vertical>
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
                Delete?
              </Text>
            }
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              loading={deleteLoading}
              danger
              key="submit"
              type="default"
            >
              Delete
            </Button>
          </Popconfirm>,
          <Popconfirm
            title="Select date"
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
                    minDate={dayjs()}
                    showNow={false}
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
            <Button
              icon={<CopyOutlined />}
              loading={cloneLoading}
              key="submit"
              type="default"
            >
              Duplicate
            </Button>
          </Popconfirm>,
          <Button
            icon={<EditOutlined />}
            key="submit"
            type="default"
            onClick={handleEdit}
          >
            Edit
          </Button>,
          <Button
            disabled={
              eventInfo?.date ? new Date(eventInfo.date) < new Date() : false
            }
            key="submit"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => replace(`/checkout?eventId=${eventInfo?.id}`)}
          >
            Checkout
          </Button>,
        ]}
      >
        {data?.data
          .filter((event) => eventInfo?.id == event.id)
          .map((event) => (
            <div
              key={event.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
                marginBottom: 30,
              }}
            >
              <div style={{ marginTop: 15 }}>
                <TagTwoTone
                  twoToneColor={'#007965'}
                  style={{ marginRight: 10 }}
                />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Category:
                </Text>
                <CategoryTag category={event.template.category} />
              </div>
              <div>
                <CalendarTwoTone
                  twoToneColor={'#007965'}
                  style={{ marginRight: 10 }}
                />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Date & Time:
                </Text>
                <Text size="sm" strong>
                  {dayjs(event.date)
                    .format('dddd - D. M. YYYY - HH:mm')
                    .toString()}
                </Text>
              </div>
              <div>
                <HomeTwoTone
                  twoToneColor={'#007965'}
                  style={{ marginRight: 10 }}
                />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Venue:
                </Text>
                <Text strong size="sm">
                  {event.template.venue.name}
                </Text>
              </div>
              <div>
                <HourglassTwoTone
                  twoToneColor={'#007965'}
                  style={{ marginRight: 10 }}
                />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Length:
                </Text>
                <Text
                  strong
                  size="sm"
                >{`${event.template.length} minutes`}</Text>
              </div>
              <div>
                <SoundTwoTone
                  twoToneColor={'#007965'}
                  style={{ marginRight: 10 }}
                />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Audio:
                </Text>
                <Text strong size="sm">
                  {event.template.language}
                </Text>
              </div>
              <div>
                <MessageTwoTone
                  twoToneColor={'#007965'}
                  style={{ marginRight: 10 }}
                />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Subtitles:
                </Text>
                <Text strong size="sm">
                  {event.template?.subtitles
                    ? event.template?.subtitles
                    : 'None'}
                </Text>
              </div>
              <div>
                <ShoppingTwoTone
                  twoToneColor={'#007965'}
                  style={{ marginRight: 10 }}
                />
                <Text size="sm" style={{ marginRight: 5 }}>
                  Tickets Sold:
                </Text>
                <Text strong size="sm">
                  {soldData?.data.getTicketsSold.find(
                    (event: any) => event.eventId === eventInfo?.id,
                  ) &&
                    `${
                      soldData.data.getTicketsSold.find(
                        (event: any) => event.eventId === eventInfo?.id,
                      ).sold
                    } / ${
                      soldData.data.getTicketsSold.find(
                        (event: any) => event.eventId === eventInfo?.id,
                      ).capacity
                    }`}
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
            Create Event
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
    </Flex>
  );
};
