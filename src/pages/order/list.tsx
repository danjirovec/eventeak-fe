// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo, useNavigation } from '@refinedev/core';
import { Input, InputNumber, Select, Space, Table } from 'antd';
import { ORDERS_QUERY, USER_BUSINESSES_QUERY } from 'graphql/queries';
import { FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { Order } from 'graphql/schema.types';
import { useGlobalStore } from 'providers/context/store';
import { UserBusinessesListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';

export const OrderList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Orders - Eventeak');
  const go = useGo();
  const { edit } = useNavigation();
  const { tableProps, filters, sorters } = useTable({
    resource: 'orders',
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
          field: 'name',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: ORDERS_QUERY,
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

  return (
    <div>
      <List breadcrumb={false}>
        <Table
          {...tableProps}
          pagination={{ ...tableProps.pagination }}
          bordered
          rowHoverable
          showSorterTooltip
          dataSource={business ? tableProps.dataSource : []}
        >
          <Table.Column<Order>
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
              } = props;
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
          <Table.Column<Order>
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
          <Table.Column<Order>
            dataIndex="total"
            title="Total"
            defaultFilteredValue={getDefaultFilter('total', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  mapValue={(selectedKeys) => [selectedKeys]}
                  {...props}
                >
                  <InputNumber style={{ width: 250 }} placeholder="Total" />
                </FilterDropdown>
              );
            }}
            onFilter={(value, record) => {
              return record.total == value;
            }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('total', sorters)}
            render={(value, record) => (
              <Space>
                <Text
                  style={{ whiteSpace: 'nowrap' }}
                >{`${record.total} ${business?.currency}`}</Text>
              </Space>
            )}
          />
          <Table.Column<Order>
            width={200}
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
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
