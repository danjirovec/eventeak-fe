import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  rangePickerFilterMapper,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo, useNavigation } from '@refinedev/core';
import { DatePicker, InputNumber, Select, Space, Table } from 'antd';
import {
  MEMBERSHIP_TYPE_QUERY,
  MEMBERSHIPS_QUERY,
  USER_BUSINESSES_QUERY,
} from 'graphql/queries';
import { FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { Membership } from 'graphql/schema.types';
import { useGlobalStore } from 'providers/context/store';
import { formatDate } from 'util/date-formatter';
import {
  MembershipTypeListQuery,
  UserBusinessesListQuery,
} from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';

export const MembershipList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Memberships - Eventeak');
  const { edit } = useNavigation();
  const go = useGo();
  const { tableProps, filters, sorters } = useTable({
    resource: 'memberships',
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
          field: 'expiryDate',
          operator: 'between',
          value: [],
        },
      ],
    },
    meta: {
      gqlQuery: MEMBERSHIPS_QUERY,
    },
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

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            disabled={!business}
            onClick={() => {
              go({
                to: { resource: 'memberships', action: 'create' },
                options: { keepQuery: true },
                type: 'replace',
              });
            }}
          />
        )}
      >
        <Table
          {...tableProps}
          pagination={{ ...tableProps.pagination }}
          bordered
          rowHoverable
          showSorterTooltip
          dataSource={business ? tableProps.dataSource : []}
        >
          <Table.Column<Membership>
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
              <Space onClick={() => edit('users', record.user.id)}>
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#007965',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {record.user.email}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Membership>
            dataIndex="membershipType.id"
            title="Membership Type"
            defaultFilteredValue={getDefaultFilter(
              'membershipType.id',
              filters,
            )}
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
                  placeholder="Select membership type"
                  options={membershipTypes.options}
                />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space
                onClick={() =>
                  edit(
                    'membership-types',
                    record.membershipType ? record.membershipType.id : '',
                  )
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
                  {record.membershipType?.name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Membership>
            dataIndex="points"
            title="Points"
            defaultFilteredValue={getDefaultFilter('points', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  mapValue={(selectedKeys) => [selectedKeys]}
                  {...props}
                >
                  <InputNumber style={{ width: 250 }} placeholder="Points" />
                </FilterDropdown>
              );
            }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('points', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.points}</Text>
              </Space>
            )}
          />
          <Table.Column<Membership>
            dataIndex="expiryDate"
            title="Expiry Date"
            defaultFilteredValue={getDefaultFilter(
              'expiryDate',
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
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('expiryDate', sorters)}
            render={(value, record) => {
              return (
                <Space>
                  <Text style={{ whiteSpace: 'nowrap' }}>
                    {formatDate(false, record.expiryDate)}
                  </Text>
                </Space>
              );
            }}
          />
          <Table.Column<Membership>
            width={200}
            title="Actions"
            dataIndex="id"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton
                  hideText
                  size="small"
                  recordItemId={value}
                  errorNotification={(data: any) => {
                    return {
                      description: 'Error',
                      message: `${data.message}`,
                      type: 'error',
                    };
                  }}
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
