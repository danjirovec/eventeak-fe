import React from 'react';
import { Edit, ListButton, useForm, useSelect } from '@refinedev/antd';
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import { UPDATE_TICKET_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { UserBusinessesListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { USER_BUSINESSES_QUERY } from 'graphql/queries';
import { useGlobalStore } from 'providers/context/store';
import dayjs from 'dayjs';
import { Text } from 'components';
import {
  AppstoreTwoTone,
  BuildTwoTone,
  CaretRightOutlined,
  ClockCircleTwoTone,
  DollarTwoTone,
  LayoutTwoTone,
  MinusCircleTwoTone,
  ScheduleTwoTone,
  ShoppingTwoTone,
} from '@ant-design/icons';
import { useGo, useNavigation } from '@refinedev/core';

export const EditTicket = () => {
  const business = useGlobalStore((state) => state.business);
  const { edit } = useNavigation();
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'tickets', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };
  const { saveButtonProps, formProps, formLoading, onFinish, form } = useForm({
    resource: 'tickets',
    action: 'edit',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      gqlMutation: UPDATE_TICKET_MUTATION,
    },
  });

  const readForm = Form.useFormInstance();

  const { selectProps: users, query: usersQuery } = useSelect<
    GetFieldsFromList<UserBusinessesListQuery>
  >({
    resource: 'businessUsers',
    optionLabel: (item) => item.user.email,
    optionValue: (item) => item.user.id,
    meta: {
      gqlQuery: USER_BUSINESSES_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'business.id',
        operator: 'eq',
        value: business?.id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
    });
  };

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={16}>
          <Edit
            goBack={<Button>←</Button>}
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
            headerProps={{ onBack: goToListPage }}
            headerButtons={({ listButtonProps }) => (
              <>{listButtonProps && <ListButton {...listButtonProps} />}</>
            )}
          >
            <Form
              {...formProps}
              form={form}
              layout="vertical"
              onFinish={handleOnFinish}
              requiredMark={requiredOptionalMark}
            >
              <Space
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                }}
              >
                <Form.Item
                  label="Validated"
                  name="validated"
                  getValueProps={(value) => ({
                    value: value ? dayjs(value) : '',
                  })}
                >
                  <DatePicker
                    minDate={dayjs()}
                    showTime
                    showNow
                    format="D. M. YYYY - H:mm"
                    placeholder="Validated"
                    allowClear={true}
                    needConfirm={false}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="User"
                  name="userId"
                  initialValue={formProps.initialValues?.user?.id}
                >
                  <Select
                    defaultValue={formProps.initialValues?.user?.id}
                    showSearch
                    filterOption={(input, option) =>
                      String(option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    allowClear
                    placeholder="User"
                    {...users}
                    options={users.options}
                  />
                </Form.Item>
              </Space>
            </Form>
            <Space
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
              }}
            >
              <Text>{'Ticket Properties'}</Text>
              <Collapse
                collapsible={'header'}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                size="small"
                items={[
                  {
                    styles: {
                      header: { height: 30, padding: 4 },
                    },
                    label: formProps.initialValues?.id.slice(0, 8),
                    key: '1',
                    children: (
                      <>
                        <Form form={readForm} layout="vertical">
                          <Space
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                            }}
                          >
                            <Form.Item
                              label={
                                <Flex
                                  onClick={() =>
                                    edit(
                                      'events',
                                      formProps?.initialValues?.event.id,
                                    )
                                  }
                                  align="center"
                                  gap={5}
                                >
                                  <ScheduleTwoTone twoToneColor={'#007965'} />
                                  <Text
                                    style={{
                                      whiteSpace: 'nowrap',
                                      color: '#007965',
                                      cursor: 'pointer',
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {'Event'}
                                  </Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={formProps?.initialValues?.event.name}
                                style={{
                                  backgroundColor: 'white',
                                  color: '#1d1d1d',
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <Flex align="center" gap={5}>
                                  <ClockCircleTwoTone
                                    twoToneColor={'#007965'}
                                  />
                                  <Text>{'Date & Time'}</Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={dayjs(
                                  formProps?.initialValues?.event.date,
                                ).format('DD. MM. YYYY - HH:mm')}
                                style={{
                                  backgroundColor: 'white',
                                  color: '#1d1d1d',
                                }}
                              />
                            </Form.Item>
                          </Space>
                          <Space
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                            }}
                          >
                            <Form.Item
                              label={
                                <Flex align="center" gap={5}>
                                  <LayoutTwoTone twoToneColor={'#007965'} />
                                  <Text>{'Section'}</Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={formProps?.initialValues?.section?.name}
                                style={{
                                  backgroundColor: 'white',
                                  color: '#1d1d1d',
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <Flex align="center" gap={5}>
                                  <DollarTwoTone twoToneColor={'#007965'} />
                                  <Text>{'Price'}</Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={formProps?.initialValues?.price}
                                addonAfter={business?.currency}
                              />
                            </Form.Item>
                          </Space>
                          <Space
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                            }}
                          >
                            <Form.Item
                              label={
                                <Flex align="center" gap={5}>
                                  <BuildTwoTone twoToneColor={'#007965'} />
                                  <Text>{'Row'}</Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={formProps?.initialValues?.row?.name}
                                style={{
                                  backgroundColor: 'white',
                                  color: '#1d1d1d',
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <Flex align="center" gap={5}>
                                  <AppstoreTwoTone twoToneColor={'#007965'} />
                                  <Text>{'Seat'}</Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={formProps?.initialValues?.seat?.name}
                              />
                            </Form.Item>
                          </Space>
                          <Space
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                            }}
                          >
                            <Form.Item
                              label={
                                <Flex
                                  onClick={() =>
                                    edit(
                                      'discounts',
                                      formProps?.initialValues?.discount
                                        ? formProps?.initialValues?.discount.id
                                        : '',
                                    )
                                  }
                                  align="center"
                                  gap={5}
                                >
                                  <MinusCircleTwoTone
                                    twoToneColor={'#007965'}
                                  />
                                  <Text
                                    style={{
                                      whiteSpace: 'nowrap',
                                      color: '#007965',
                                      cursor: 'pointer',
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {'Discount'}
                                  </Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={formProps?.initialValues?.discount?.name}
                                style={{
                                  backgroundColor: 'white',
                                  color: '#1d1d1d',
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              label={
                                <Flex
                                  onClick={() =>
                                    edit(
                                      'orders',
                                      formProps?.initialValues?.order
                                        ? formProps?.initialValues?.order.id
                                        : '',
                                    )
                                  }
                                  align="center"
                                  gap={5}
                                >
                                  <ShoppingTwoTone twoToneColor={'#007965'} />
                                  <Text
                                    style={{
                                      whiteSpace: 'nowrap',
                                      color: '#007965',
                                      cursor: 'pointer',
                                      textDecoration: 'underline',
                                    }}
                                  >
                                    {'Order'}
                                  </Text>
                                </Flex>
                              }
                            >
                              <Input
                                disabled
                                value={formProps?.initialValues?.order?.id.slice(
                                  0,
                                  8,
                                )}
                              />
                            </Form.Item>
                          </Space>
                        </Form>
                      </>
                    ),
                  },
                ]}
              />
            </Space>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
