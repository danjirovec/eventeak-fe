import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo } from '@refinedev/core';
import { Avatar, Input, Select, Space, Table } from 'antd';
import { CUSTOM_BUSINESSES_QUERY } from 'graphql/queries';
import { FilterFilled, PictureOutlined } from '@ant-design/icons';
import { Text } from 'components/text';
import { Business } from 'graphql/schema.types';
import { BUCKET_URL } from 'config/config';
import { useGlobalStore } from 'providers/context/store';
import { currencyOptions } from 'enum/enum';

export const BusinessList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Businesses - Eventeak');
  const user = useGlobalStore((state) => state.user);
  const go = useGo();

  const { tableProps, filters, sorters } = useTable({
    resource: 'getUserBusinesses',
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
      user: user?.id,
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
                <Avatar
                  size="large"
                  icon={<PictureOutlined />}
                  shape="circle"
                  src={
                    record.logoUrl
                      ? `${BUCKET_URL}businesses/${record.logoUrl}`
                      : null
                  }
                />
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
          <Table.Column<Business>
            dataIndex="currency"
            title="Currency"
            defaultFilteredValue={getDefaultFilter('currency', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ width: 250 }}
                  mode="multiple"
                  placeholder="Select currency"
                  options={currencyOptions}
                />
              </FilterDropdown>
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('currency', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.currency}</Text>
              </Space>
            )}
          />
          <Table.Column<Business>
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
