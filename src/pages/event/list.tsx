import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CloneButton,
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  getDefaultSortOrder,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo, useNavigation } from '@refinedev/core';
import { Button, Input, Select, Space, Table } from 'antd';
import { EVENTS_QUERY } from 'graphql/queries';
import {
  CopyOutlined,
  FilterFilled,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Text } from 'components/text';
import { Event } from 'graphql/schema.types';
import { formatDate, shortenString } from '../../util';
import { categoryOptions } from 'enum/enum';
import { getBusiness } from 'util/get-business';
import { CategoryTag } from 'components';

export const EventList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Events - Applausio');
  const go = useGo();
  const { edit, replace } = useNavigation();
  const { tableProps, filters, sorters } = useTable({
    resource: 'events',
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
      gqlQuery: EVENTS_QUERY,
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
                to: { resource: 'events', action: 'create' },
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
          <Table.Column<Event>
            dataIndex="name"
            title="Name"
            defaultFilteredValue={getDefaultFilter('name', filters)}
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
          <Table.Column<Event>
            dataIndex="date"
            title="Date - Time"
            defaultFilteredValue={getDefaultFilter('date', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Date - Time" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(true, record.date)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="category"
            title="Category"
            defaultFilteredValue={getDefaultFilter('category', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select category..."
                  options={categoryOptions}
                />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <CategoryTag category={record.category} />
              </Space>
            )}
          />
          <Table.Column<Event>
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
                  {shortenString(25, record.description)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="venue"
            title="Venue"
            defaultFilteredValue={getDefaultFilter('venue', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Venue" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space onClick={() => edit('venues', record.venue.id)}>
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#007965',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {(record.venue as any).name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="length"
            title="Length"
            defaultFilteredValue={getDefaultFilter('length', filters)}
            filterIcon={<FilterFilled />}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('length', sorters)}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Length" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.length} min
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <Button
                  onClick={() => replace(`/checkout?eventId=${value}`)}
                  style={{ width: 24, height: 24 }}
                  icon={<ShoppingCartOutlined width={24} height={24} />}
                />
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
