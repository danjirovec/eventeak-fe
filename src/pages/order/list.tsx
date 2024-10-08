import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CloneButton,
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo } from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import { ORDERS_QUERY } from 'graphql/queries';
import { FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { Benefit, Order } from 'graphql/schema.types';
import { getBusiness } from 'util/get-business';

export const OrderList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Orders - Applausio');
  const go = useGo();
  const { tableProps, filters } = useTable({
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
          value: getBusiness().id,
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

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            disabled={sessionStorage.getItem('business') ? false : true}
            onClick={() => {
              go({
                to: { resource: 'orders', action: 'create' },
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
          dataSource={
            sessionStorage.getItem('business') ? tableProps.dataSource : []
          }
        >
          <Table.Column<Order>
            dataIndex="id"
            title="ID"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="ID" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.id}</Text>
              </Space>
            )}
          />
          <Table.Column<Order>
            dataIndex="user"
            title="User"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="User" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user
                    ? `${record.user.firstName} ${record.user.firstName}`
                    : '-'}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Order>
            dataIndex="total"
            title="Total"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Total" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.total}</Text>
              </Space>
            )}
          />
          <Table.Column<Benefit>
            width={200}
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
