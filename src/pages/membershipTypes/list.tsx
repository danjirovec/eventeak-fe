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
import { Input, Space, Table } from 'antd';
import { MEMBERSHIP_TYPE_QUERY } from 'graphql/queries';
import { CopyOutlined, FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { MembershipType } from 'graphql/schema.types';
import { useGlobalStore } from 'providers/context/store';

export const MembershipTypeList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Membership Types - Eventeak');
  const go = useGo();
  const { tableProps, filters, sorters } = useTable({
    resource: 'membership-types',
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
      gqlQuery: MEMBERSHIP_TYPE_QUERY,
    },
  });

  return (
    <div>
      <List
        title="Membership Types"
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            disabled={!business}
            onClick={() => {
              go({
                to: { resource: 'membership-types', action: 'create' },
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
          <Table.Column<MembershipType>
            dataIndex="name"
            title="Name"
            defaultFilteredValue={getDefaultFilter('name', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Name" />
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
          <Table.Column<MembershipType>
            dataIndex="description"
            title="Description"
            defaultFilteredValue={getDefaultFilter('description', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Description" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.description}
                </Text>
              </Space>
            )}
          />
          <Table.Column<MembershipType>
            width={200}
            title="Actions"
            dataIndex="id"
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
                  hideText
                  size="small"
                  recordItemId={value}
                  successNotification={() => {
                    return {
                      description: 'Success',
                      message: `Successfully deleted a membership type`,
                      type: 'success',
                    };
                  }}
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
