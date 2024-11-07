import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  rangePickerFilterMapper,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useNavigation, useUpdate } from '@refinedev/core';
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import {
  DISCOUNTS_QUERY,
  EVENTS_QUERY,
  TICKETS_QUERY,
  USER_BUSINESSES_QUERY,
} from 'graphql/queries';
import { CheckOutlined, FilterFilled, ScanOutlined } from '@ant-design/icons';
import { Text } from 'components/text';
import { Ticket } from 'graphql/schema.types';
import { formatDate } from '../../util';
import { useGlobalStore } from 'providers/context/store';
import {
  DiscountsListQuery,
  EventsListQuery,
  UserBusinessesListQuery,
} from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { UPDATE_TICKET_MUTATION } from 'graphql/mutations';
import { FilterDropdownProps } from '@refinedev/antd';

export const TicketList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  const { edit } = useNavigation();
  const { mutate, isLoading, variables } = useUpdate();
  useDocumentTitle('Tickets - Eventeak');
  const { tableProps, filters, sorters } = useTable({
    resource: 'tickets',
    onSearch: (values: any) => {
      return [
        {
          field: 'name',
          operator: 'contains',
          value: values.name,
        },
      ];
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    sorters: {
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
          field: 'name',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'section.name',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'row.name',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'seat.name',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'event.date',
          operator: 'between',
          value: [],
        },
      ],
    },
    meta: {
      gqlQuery: TICKETS_QUERY,
    },
  });

  const { selectProps: events, query: eventsQuery } = useSelect<
    GetFieldsFromList<EventsListQuery>
  >({
    resource: 'events',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: EVENTS_QUERY,
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

  const { selectProps: discounts, query: discountsQuery } = useSelect<
    GetFieldsFromList<DiscountsListQuery>
  >({
    resource: 'discounts',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: DISCOUNTS_QUERY,
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

  const handleValidate = (id: string) => {
    mutate({
      resource: 'tickets',
      id: id,
      values: { validated: new Date() },
      successNotification: () => {
        return {
          description: 'Success',
          message: 'Successfully validated ticket',
          type: 'success',
        };
      },
      meta: {
        gqlMutation: UPDATE_TICKET_MUTATION,
      },
    });
  };

  return (
    <div>
      <List breadcrumb={false} canCreate={false}>
        <Table
          {...tableProps}
          pagination={{ ...tableProps.pagination }}
          bordered
          rowHoverable
          showSorterTooltip
          dataSource={business ? tableProps.dataSource : []}
        >
          <Table.Column<Ticket>
            dataIndex="id"
            title="ID"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              const {
                confirm,
                setSelectedKeys,
                selectedKeys,
                clearFilters,
                ...rest
              } = props as FilterDropdownProps;
              return (
                <FilterDropdown
                  {...rest}
                  setSelectedKeys={setSelectedKeys}
                  selectedKeys={selectedKeys}
                  clearFilters={clearFilters}
                  confirm={() => {
                    if (selectedKeys.length < 1) {
                      confirm({ closeDropdown: false });
                      return;
                    }
                    const filtered = tableProps.dataSource?.find((item) =>
                      item.id?.toString().startsWith(String(selectedKeys)),
                    );
                    if (!filtered?.id) return;
                    setSelectedKeys([filtered?.id]);
                    confirm();
                  }}
                  mapValue={(selectedKeys) => {
                    return [selectedKeys];
                  }}
                >
                  <Input placeholder="ID" />
                </FilterDropdown>
              );
            }}
            onFilter={(value, record) => {
              const filtered = tableProps.dataSource?.find((item) =>
                item.id?.toString().startsWith(String(value)),
              );
              return record.id === filtered?.id;
            }}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.id.slice(0, 8)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="event.id"
            title="Event"
            defaultFilteredValue={getDefaultFilter('event.id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    String(option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{ width: 250 }}
                  mode="multiple"
                  placeholder="Select event"
                  options={events.options}
                />
              </FilterDropdown>
            )}
            onFilter={(value, record) => {
              return value == record.event?.id;
            }}
            render={(value, record) => (
              <Space onClick={() => edit('events', record.event.id)}>
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#007965',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {record.event.name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="event.date"
            title="Date & Time"
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
            defaultFilteredValue={getDefaultFilter(
              'event.date',
              filters,
              'between',
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(true, record.event.date)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="user.id"
            title="User"
            defaultFilteredValue={getDefaultFilter('user.id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    String(option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{ width: 250 }}
                  mode="multiple"
                  placeholder="Select user"
                  options={users.options}
                />
              </FilterDropdown>
            )}
            onFilter={(value, record) => {
              return value == record.user?.id;
            }}
            render={(value, record) => (
              <Space
                onClick={() => edit('users', record.user ? record.user.id : '')}
              >
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#007965',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {record.user ? record.user.email : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="validated"
            title="Validated"
            // filterIcon={<FilterFilled />}
            // filterDropdown={(props) => (
            //   <FilterDropdown
            //     {...props}
            //     mapValue={(selectedKeys) => selectedKeys}
            //   >
            //     <Checkbox.Group>
            //       <Checkbox value={true}>Yes</Checkbox>
            //       <Checkbox value={false}>No</Checkbox>
            //     </Checkbox.Group>
            //   </FilterDropdown>
            // )}
            // onFilter={(value, record) => {
            //   if (value) {
            //     return record.validated !== null;
            //   } else {
            //     return record.validated === null;
            //   }
            // }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('validated', sorters)}
            render={(value, record) => (
              <Space>
                {record.validated ? (
                  <Tag color="green" style={{ textTransform: 'capitalize' }}>
                    {formatDate(true, record.validated)}
                  </Tag>
                ) : (
                  <Tag color="red" style={{ textTransform: 'capitalize' }}>
                    No
                  </Tag>
                )}
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="section.name"
            title="Section"
            defaultFilteredValue={getDefaultFilter(
              'section.name',
              filters,
              'contains',
            )}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  {...props}
                  mapValue={(selectedKeys) => [selectedKeys]}
                >
                  <Input style={{ width: 250 }} placeholder="Section" />
                </FilterDropdown>
              );
            }}
            onFilter={(value, record) => {
              return record.section?.name.includes(String(value));
            }}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.section.name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="row.name"
            title="Row"
            defaultFilteredValue={getDefaultFilter(
              'row.name',
              filters,
              'contains',
            )}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  {...props}
                  mapValue={(selectedKeys) => [selectedKeys]}
                >
                  <Input style={{ width: 250 }} placeholder="Row" />
                </FilterDropdown>
              );
            }}
            onFilter={(value, record) => {
              if (record.row) return record.row?.name.includes(String(value));
              return false;
            }}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.row ? record.row.name : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="seat.name"
            title="Seat"
            defaultFilteredValue={getDefaultFilter(
              'seat.name',
              filters,
              'contains',
            )}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  {...props}
                  mapValue={(selectedKeys) => [selectedKeys]}
                >
                  <Input style={{ width: 250 }} placeholder="Seat" />
                </FilterDropdown>
              );
            }}
            onFilter={(value, record) => {
              if (record.seat) return record.seat?.name.includes(String(value));
              return false;
            }}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.seat ? record.seat.name : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="price"
            title="Price"
            defaultFilteredValue={getDefaultFilter('price', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  mapValue={(selectedKeys) => [selectedKeys]}
                  {...props}
                >
                  <InputNumber style={{ width: 250 }} placeholder="Price" />
                </FilterDropdown>
              );
            }}
            onFilter={(value, record) => {
              return record.price == value;
            }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('price', sorters)}
            render={(value, record) => (
              <Space>
                <Text
                  style={{ whiteSpace: 'nowrap' }}
                >{`${record.price} ${business?.currency}`}</Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="discount.id"
            title="Discount"
            defaultFilteredValue={getDefaultFilter('discount.id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    String(option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{ width: 250 }}
                  mode="multiple"
                  placeholder="Select discount"
                  options={discounts.options}
                />
              </FilterDropdown>
            )}
            onFilter={(value, record) => {
              return value == record.discount?.id;
            }}
            render={(value, record) => (
              <Space
                onClick={() =>
                  edit('discounts', record.discount ? record.discount.id : '')
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
                  {record.discount ? record.discount?.name : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            dataIndex="order.id"
            title="Order"
            defaultFilteredValue={getDefaultFilter('order.id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              const {
                confirm,
                setSelectedKeys,
                selectedKeys,
                clearFilters,
                ...rest
              } = props as FilterDropdownProps;
              return (
                <FilterDropdown
                  {...rest}
                  setSelectedKeys={setSelectedKeys}
                  selectedKeys={selectedKeys}
                  clearFilters={clearFilters}
                  confirm={() => {
                    if (selectedKeys.length < 1) {
                      confirm({ closeDropdown: false });
                      return;
                    }
                    const filtered = tableProps.dataSource?.find((item) =>
                      item.order?.id
                        ?.toString()
                        .startsWith(String(selectedKeys)),
                    );
                    if (!filtered?.order.id) return;
                    setSelectedKeys([filtered?.order.id]);
                    confirm();
                  }}
                  mapValue={(selectedKeys) => {
                    return [selectedKeys];
                  }}
                >
                  <Input placeholder="ID" />
                </FilterDropdown>
              );
            }}
            onFilter={(value, record) => {
              const filtered = tableProps.dataSource?.find((item) =>
                item.order?.id?.toString().startsWith(String(value)),
              );
              return record.order?.id === filtered?.order.id;
            }}
            render={(value, record) => (
              <Space
                onClick={() =>
                  edit('orders', record.order ? record.order.id : '')
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
                  {record.order ? record.order.id.slice(0, 8) : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Ticket>
            width={200}
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value, record) => (
              <Space>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => {
                    handleValidate(record.id);
                  }}
                  okButtonProps={{
                    loading: record.id === variables?.id && isLoading,
                  }}
                  okText="Validate"
                  cancelText="Cancel"
                >
                  <Button
                    loading={record.id === variables?.id && isLoading}
                    disabled={record.validated ? true : false}
                    style={{
                      backgroundColor: record.validated ? '#f6ffed' : 'white',
                      ...(record.validated && { borderColor: '#b7eb8f' }),
                      width: 24,
                      height: 24,
                      color: record.validated ? '#389e0d' : '#383838',
                    }}
                    icon={
                      record.validated ? <CheckOutlined /> : <ScanOutlined />
                    }
                  />
                </Popconfirm>
                <EditButton hideText size="small" recordItemId={value} />
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
                  recordItemId={value}
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
