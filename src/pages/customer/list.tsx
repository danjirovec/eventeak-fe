import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  rangePickerFilterMapper,
  useSelect,
  useTable,
} from '@refinedev/antd';
import {
  getDefaultFilter,
  useCreate,
  useCustomMutation,
  useList,
  useNavigation,
} from '@refinedev/core';
import {
  Avatar,
  Button,
  DatePicker,
  Flex,
  Input,
  Modal,
  Select,
  Space,
  Table,
} from 'antd';
import {
  BENEFITS_QUERY,
  CUSTOMERS_QUERY,
  MEMBERSHIP_TYPE_QUERY,
  MEMBERSHIPS_QUERY,
} from 'graphql/queries';
import {
  CheckCircleOutlined,
  FilterFilled,
  HeartOutlined,
  MailOutlined,
  PictureOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Text } from 'components/text';
import { BusinessUser } from 'graphql/schema.types';
import { formatDate } from '../../util';
import { useGlobalStore } from 'providers/context/store';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { requiredMark } from 'components';
import { BenefitsListQuery, MembershipTypeListQuery } from 'graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import {
  CREATE_USER_BENEFIT_MUTATION,
  SEND_EMAIL_MUTATION,
} from 'graphql/mutations';
import { BUCKET_URL } from 'config/config';

export const CustomerList = ({ children }: React.PropsWithChildren) => {
  const [singleEmailOpen, setSingleEmailOpen] = useState(false);
  const [batchEmailOpen, setBatchEmailOpen] = useState(false);
  const [benefitOpen, setBenefitOpen] = useState(false);
  const [benefit, setBenefit] = useState<string | undefined>();
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Users - Eventeak');
  const { mutate: create, isLoading: createLoading } = useCreate();
  const [singleEmailForm] = Form.useForm();
  const [batchEmailForm] = Form.useForm();
  const [benefitForm] = Form.useForm();
  const { edit } = useNavigation();

  const { mutate, isLoading: customLoading } = useCustomMutation();

  const { tableProps, filters, tableQuery } = useTable({
    resource: 'businessUsers',
    onSearch: (values: any) => {
      return [
        {
          field: 'email',
          operator: 'contains',
          value: values.email,
        },
      ];
    },
    pagination: {
      pageSize: 20,
    },
    sorters: {
      mode: 'off',
      initial: [
        {
          field: 'created',
          order: 'desc',
        },
      ],
    },
    filters: {
      permanent: [
        {
          field: 'business.id',
          operator: 'eq',
          value: business?.id,
        },
      ],
      initial: [
        {
          field: 'user.email',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'user.firstName',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'user.lastName',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'user.placeOfResidence',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'user.birthDate',
          operator: 'between',
          value: [],
        },
      ],
    },
    meta: {
      gqlQuery: CUSTOMERS_QUERY,
    },
  });

  const { selectProps: benefits, query: benefitsQuery } = useSelect<
    GetFieldsFromList<BenefitsListQuery>
  >({
    resource: 'benefits',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: BENEFITS_QUERY,
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
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  const { selectProps: membershipTypes, query: membershipTypesQuery } =
    useSelect<GetFieldsFromList<MembershipTypeListQuery>>({
      resource: 'membership-types',
      optionLabel: 'name',
      optionValue: 'id',
      meta: {
        gqlQuery: MEMBERSHIP_TYPE_QUERY,
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
      ],
      sorters: [
        {
          field: 'created',
          order: 'desc',
        },
      ],
    });

  const { data, isLoading: membershipsLoading } = useList({
    resource: 'memberships',
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
    meta: {
      gqlQuery: MEMBERSHIPS_QUERY,
    },
  });

  const showSingleEmailModal = () => {
    setSingleEmailOpen(true);
  };

  const showBatchEmailModal = () => {
    setBatchEmailOpen(true);
  };

  const showBenefitModal = () => {
    setBenefitOpen(true);
  };

  const handleSingleEmail = async (
    email: string,
    subject: string,
    message: string,
  ) => {
    const valid = await singleEmailForm.validateFields().catch(() => {
      return;
    });
    if (!valid) return;
    mutate({
      url: '',
      method: 'post',
      values: {},
      meta: {
        variables: { input: { emails: [email], subject: subject, message } },
        gqlMutation: SEND_EMAIL_MUTATION,
      },
      successNotification: () => {
        return {
          description: 'Success',
          message: 'Successfully sent email',
          type: 'success',
        };
      },
    });
  };

  const handleBatchEmail = (
    emails: [string],
    subject: string,
    message: string,
  ) => {
    mutate({
      url: '',
      method: 'post',
      values: {},
      meta: {
        variables: { input: { emails: emails, subject: subject, message } },
        gqlMutation: SEND_EMAIL_MUTATION,
      },
      successNotification: () => {
        return {
          description: 'Success',
          message: 'Successfully sent emails',
          type: 'success',
        };
      },
    });
  };

  const handleBenefit = async (id: string, benefit: string | undefined) => {
    const valid = await benefitForm.validateFields().catch(() => {
      return;
    });
    if (!valid) return;
    create({
      resource: 'userBenefits',
      values: {
        userId: id,
        businessId: business?.id,
        benefitId: benefit,
      },
      successNotification: () => {
        return {
          description: 'Success',
          message: 'Successfully applied benefit',
          type: 'success',
        };
      },
      errorNotification: (data: any) => {
        return {
          description: 'Error',
          message: data.message,
          type: 'error',
        };
      },
      meta: {
        gqlMutation: CREATE_USER_BENEFIT_MUTATION,
      },
    });
    benefitForm.resetFields();
  };

  const handleCancelSingleEmail = () => {
    setSingleEmailOpen(false);
    singleEmailForm.resetFields();
  };
  const handleCancelBatchEmail = () => {
    setBatchEmailOpen(false);
    batchEmailForm.resetFields();
  };
  const handleCancelBenefit = () => {
    setBenefitOpen(false);
  };

  useEffect(() => {
    if (!createLoading) {
      handleCancelBenefit();
    }
  }, [createLoading]);

  useEffect(() => {
    if (!customLoading) {
      handleCancelSingleEmail();
      handleCancelBatchEmail();
    }
  }, [customLoading]);

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <Flex gap={10}>
            <Modal
              open={batchEmailOpen}
              title={`Send email`}
              onCancel={handleCancelBatchEmail}
              footer={[
                <Button
                  key="submit"
                  icon={<SendOutlined />}
                  type="primary"
                  loading={customLoading}
                  onClick={() => {
                    handleBatchEmail(
                      batchEmailForm.getFieldValue('emails'),
                      batchEmailForm.getFieldValue('subject'),
                      batchEmailForm.getFieldValue('message'),
                    );
                  }}
                >
                  Send
                </Button>,
              ]}
            >
              <Form
                form={batchEmailForm}
                layout="vertical"
                requiredMark={requiredMark}
              >
                <Form.Item
                  name="emails"
                  label="Users"
                  rules={[{ required: true, message: '' }]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      String(option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder="Select users"
                    options={[
                      { label: 'Select all', value: 'ALL' },
                      ...(tableQuery.data?.data || []).map((item) => ({
                        label: item.user.email,
                        value: item.user.email,
                      })),
                    ]}
                    onChange={(selectedValues) => {
                      const allOption = 'ALL';
                      const allValues = tableQuery.data?.data.map(
                        (item) => item.user.email,
                      );

                      if (allValues && selectedValues.includes(allOption)) {
                        batchEmailForm.setFieldValue('emails', allValues);
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: '' }]}
                >
                  <Input placeholder="Subject"></Input>
                </Form.Item>
                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: '' }]}
                >
                  <Input.TextArea placeholder="Message" />
                </Form.Item>
              </Form>
            </Modal>
            <Button
              key="submit"
              icon={<MailOutlined />}
              type="default"
              loading={customLoading}
              onClick={() => {
                showBatchEmailModal();
              }}
            >
              Batch Email
            </Button>
            {/* <CreateButton
              disabled={!business}
              onClick={() => {
                go({
                  to: { resource: 'users', action: 'create' },
                  options: { keepQuery: true },
                  type: 'replace',
                });
              }}
            /> */}
          </Flex>
        )}
      >
        <Table
          {...tableProps}
          pagination={{ ...tableProps.pagination }}
          bordered
          rowHoverable
          showSorterTooltip
          loading={membershipsLoading || tableQuery.isLoading}
          dataSource={business ? tableProps.dataSource : []}
        >
          <Table.Column<BusinessUser>
            dataIndex="user.avatarUrl"
            title="Avatar"
            render={(value, record) => (
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  size="large"
                  icon={<PictureOutlined />}
                  shape="circle"
                  src={
                    record.user.avatarUrl
                      ? `${BUCKET_URL}avatars/${record.user.avatarUrl}`
                      : null
                  }
                />
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="user.firstName"
            title="First Name"
            defaultFilteredValue={getDefaultFilter(
              'user.firstName',
              filters,
              'contains',
            )}
            sorter={(a, b) => a.user.firstName.localeCompare(b.user.firstName)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user.firstName}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="user.lastName"
            title="Last Name"
            defaultFilteredValue={getDefaultFilter(
              'user.lastName',
              filters,
              'contains',
            )}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Last Name" />
              </FilterDropdown>
            )}
            sorter={(a, b) => a.user.lastName.localeCompare(b.user.lastName)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user.lastName}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="user.email"
            title="Email"
            defaultFilteredValue={getDefaultFilter(
              'user.email',
              filters,
              'contains',
            )}
            sorter={(a, b) => a.user.email.localeCompare(b.user.email)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input style={{ width: 250 }} placeholder="Email" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user.email}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="user.birthDate"
            title="Birth Date"
            defaultFilteredValue={getDefaultFilter(
              'user.birthDate',
              filters,
              'between',
            )}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown
                {...props}
                mapValue={(selectedKeys, event) => {
                  return rangePickerFilterMapper(selectedKeys, event);
                }}
              >
                <DatePicker.RangePicker
                  format="D. M. YYYY"
                  placeholder={['From', 'To']}
                  style={{ width: 250 }}
                />
              </FilterDropdown>
            )}
            sorter={(a, b) => a.user.birthDate.localeCompare(b.user.birthDate)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(false, record.user.birthDate)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="user.placeOfResidence"
            title="Place of Residence"
            defaultFilteredValue={getDefaultFilter(
              'user.placeOfResidence',
              filters,
              'contains',
            )}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Place of Residence" />
              </FilterDropdown>
            )}
            sorter={(a, b) => {
              if (a.user.placeOfResidence && !b.user.placeOfResidence) {
                return -1;
              }
              if (!a.user.placeOfResidence && b.user.placeOfResidence) {
                return 1;
              }
              if (a.user.placeOfResidence && b.user.placeOfResidence) {
                return a.user.placeOfResidence.localeCompare(
                  b.user.placeOfResidence,
                );
              }
              return 0;
            }}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user.placeOfResidence}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="user.id"
            title="Membership"
            sorter={(a, b) => {
              const x = data?.data.find((item) => item.user.id === a.user.id);
              const y = data?.data.find((item) => item.user.id === b.user.id);
              if (x && y) {
                return x.membershipType.name.localeCompare(
                  y.membershipType.name,
                );
              }
              if (x && !y) {
                return -1;
              }
              if (!x && y) {
                return 1;
              }
              return 0;
            }}
            render={(value, record) => {
              const membership = data?.data.find(
                (item) => item.user.id === record.user.id,
              );
              const type = membership ? membership.membershipType.name : null;
              return (
                <Space
                  onClick={() =>
                    edit('memberships', membership?.id ? membership.id : '')
                  }
                >
                  <Text
                    style={{
                      whiteSpace: 'nowrap',
                      color: '#007965',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {type}
                  </Text>
                </Space>
              );
            }}
          />
          <Table.Column<BusinessUser>
            width={200}
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value, record) => (
              <Space>
                <Modal
                  open={singleEmailOpen}
                  title={`Send email to ${record.user.email}`}
                  onCancel={handleCancelSingleEmail}
                  footer={[
                    <Button
                      key="submit"
                      icon={<SendOutlined />}
                      type="primary"
                      loading={customLoading}
                      onClick={() => {
                        handleSingleEmail(
                          record.user.email,
                          singleEmailForm.getFieldValue('subject'),
                          singleEmailForm.getFieldValue('message'),
                        );
                      }}
                    >
                      Send
                    </Button>,
                  ]}
                >
                  <Form
                    form={singleEmailForm}
                    layout="vertical"
                    requiredMark={requiredMark}
                  >
                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[{ required: true, message: '' }]}
                    >
                      <Input placeholder="Subject"></Input>
                    </Form.Item>
                    <Form.Item
                      name="message"
                      label="Message"
                      rules={[{ required: true, message: '' }]}
                    >
                      <Input.TextArea placeholder="Message"></Input.TextArea>
                    </Form.Item>
                  </Form>
                </Modal>
                <Button
                  onClick={showSingleEmailModal}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  icon={<MailOutlined />}
                />
                <Modal
                  open={benefitOpen}
                  title={`Apply benefit`}
                  onCancel={handleCancelBenefit}
                  footer={[
                    <Button
                      key="submit"
                      icon={<CheckCircleOutlined />}
                      type="primary"
                      loading={createLoading}
                      onClick={() => {
                        handleBenefit(record.user.id, benefit);
                      }}
                    >
                      Apply
                    </Button>,
                  ]}
                >
                  <Form
                    form={benefitForm}
                    layout="vertical"
                    requiredMark={requiredMark}
                  >
                    <Form.Item
                      name="benefit"
                      label="Benefit"
                      rules={[{ required: true, message: '' }]}
                    >
                      <Select
                        onChange={(value) => setBenefit(value)}
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          String(option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        placeholder="Select benefit"
                        options={benefits.options}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
                <Button
                  onClick={showBenefitModal}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  icon={<HeartOutlined />}
                />
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.user.id}
                />
                <DeleteButton
                  errorNotification={(data: any) => {
                    return {
                      description: 'Error',
                      message: `${data.message}`,
                      type: 'error',
                    };
                  }}
                  hideText
                  size="small"
                  recordItemId={record.user.id}
                />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
