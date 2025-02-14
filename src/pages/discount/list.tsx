import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CloneButton,
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo } from '@refinedev/core';
import { Input, InputNumber, Space, Table } from 'antd';
import { DISCOUNTS_QUERY } from 'graphql/queries';
import { CopyOutlined, FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { Discount } from 'graphql/schema.types';
import { useGlobalStore } from 'providers/context/store';

export const DiscountList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Discounts - Eventeak');
  const go = useGo();
  const { tableProps, filters, sorters } = useTable({
    resource: 'discounts',
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
      gqlQuery: DISCOUNTS_QUERY,
    },
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
                to: { resource: 'discounts', action: 'create' },
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
          <Table.Column<Discount>
            dataIndex="name"
            title="Name"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input style={{ width: 250 }} placeholder="Name" />
              </FilterDropdown>
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('name', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
              </Space>
            )}
          />
          <Table.Column<Discount>
            dataIndex="percentage"
            title="Percentage"
            defaultFilteredValue={getDefaultFilter('percentage', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  mapValue={(selectedKeys) => [selectedKeys]}
                  {...props}
                >
                  <InputNumber
                    style={{ width: 250 }}
                    placeholder="Percentage"
                  />
                </FilterDropdown>
              );
            }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('percentage', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {`${record.percentage} %`}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Discount>
            width={200}
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <CloneButton
                  hideText
                  size="small"
                  recordItemId={value}
                  icon={<CopyOutlined />}
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
