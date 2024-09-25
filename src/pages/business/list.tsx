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
import { CUSTOM_BUSINESSES_QUERY } from 'graphql/queries';
import { CopyOutlined, FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { Business } from 'graphql/schema.types';
import LogoPreviewSkeleton from 'components/skeleton/logo-preview';
import { getAuth } from 'util/get-auth';
import { BUCKET_URL } from 'config/config';

export const BusinessList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Businesses - Applausio');
  const go = useGo();

  const { tableProps, filters } = useTable({
    resource: 'userBusinesses',
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
      permanent: [],
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: CUSTOM_BUSINESSES_QUERY,
      user: getAuth().userId,
    },
  });

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: { resource: 'businesses', action: 'create' },
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
        >
          <Table.Column<Business>
            dataIndex="logoUrl"
            title="Logo"
            render={(value, record) => (
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {record.logoUrl ? (
                  <img
                    height={50}
                    width={50}
                    src={`${BUCKET_URL}businesses/${record.logoUrl}`}
                  />
                ) : (
                  <LogoPreviewSkeleton />
                )}
              </Space>
            )}
          />
          <Table.Column<Business>
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
          <Table.Column<Business>
            dataIndex="apiKey"
            title="API Key"
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.apiKey}</Text>
              </Space>
            )}
          />
          <Table.Column<Business>
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
