import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  BooleanField,
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
import { VENUES_QUERY } from 'graphql/queries';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CopyOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { Text } from 'components/text';
import { Venue } from 'graphql/schema.types';
import { useGlobalStore } from 'providers/context/store';

export const VenueList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Venues - Eventeak');
  const go = useGo();
  const { tableProps, filters, sorters } = useTable({
    resource: 'venues',
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
        {
          field: 'city',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'street',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'buildingNumber',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: VENUES_QUERY,
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
                to: { resource: 'venues', action: 'create' },
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
          <Table.Column<Venue>
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
          <Table.Column<Venue>
            dataIndex="city"
            title="City"
            defaultFilteredValue={getDefaultFilter('city', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input style={{ width: 250 }} placeholder="City" />
              </FilterDropdown>
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('city', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.city}</Text>
              </Space>
            )}
          />
          <Table.Column<Venue>
            dataIndex="street"
            title="Street"
            defaultFilteredValue={getDefaultFilter('street', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input style={{ width: 250 }} placeholder="Street" />
              </FilterDropdown>
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('street', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.street}</Text>
              </Space>
            )}
          />
          <Table.Column<Venue>
            dataIndex="buildingNumber"
            title="Building Number"
            defaultFilteredValue={getDefaultFilter('buildingNumber', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Building Number" />
              </FilterDropdown>
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('buildingNumber', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.buildingNumber}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Venue>
            dataIndex="capacity"
            title="Capacity"
            defaultFilteredValue={getDefaultFilter('capacity', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  mapValue={(selectedKeys) => [selectedKeys]}
                  {...props}
                >
                  <InputNumber style={{ width: 250 }} placeholder="Capacity" />
                </FilterDropdown>
              );
            }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('capacity', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.capacity}</Text>
              </Space>
            )}
          />
          <Table.Column<Venue>
            dataIndex="hasSeats"
            title="Seats"
            defaultFilteredValue={getDefaultFilter('hasSeats', filters)}
            filterIcon={<FilterFilled />}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('hasSeats', sorters)}
            render={(value, record) => (
              <Space>
                <BooleanField
                  value={record.hasSeats}
                  trueIcon={<CheckCircleTwoTone twoToneColor="#007965" />}
                  falseIcon={<CloseCircleTwoTone twoToneColor="#ad001d" />}
                  valueLabelTrue="Yes"
                  valueLabelFalse="No"
                />
              </Space>
            )}
          />
          <Table.Column<Venue>
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
