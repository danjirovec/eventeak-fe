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
import { MEMBERSHIP_TYPE_QUERY } from 'graphql/queries';
import { CopyOutlined, FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { MembershipType } from 'graphql/schema.types';
import { getBusiness } from 'util/get-business';

export const MembershipTypeList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Membership Types - Applausio');
  const go = useGo();
  const { tableProps, filters } = useTable({
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
      gqlQuery: MEMBERSHIP_TYPE_QUERY,
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
          dataSource={
            sessionStorage.getItem('business') ? tableProps.dataSource : []
          }
        >
          <Table.Column<MembershipType>
            dataIndex="name"
            title="Name"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Name" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.name}</Text>
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
