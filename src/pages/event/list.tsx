import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CloneButton,
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  getDefaultSortOrder,
  rangePickerFilterMapper,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo, useNavigation } from '@refinedev/core';
import { Button, DatePicker, Flex, Input, Select, Space, Table } from 'antd';
import { EVENTS_QUERY, TEMPLATES_QUERY, VENUES_QUERY } from 'graphql/queries';
import {
  CopyOutlined,
  FilterFilled,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Text } from 'components/text';
import { Event } from 'graphql/schema.types';
import { formatDate, shortenString } from '../../util';
import { categoryOptions, languageOptions } from 'enum/enum';
import { CategoryTag } from 'components';
import { useGlobalStore } from 'providers/context/store';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { TemplatesListQuery, VenuesListQuery } from '/graphql/types';

export const EventList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Events - Eventeak');
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
          field: 'template.description',
          operator: 'contains',
          value: undefined,
        },
        {
          field: 'date',
          operator: 'between',
          value: [],
        },
      ],
    },
    meta: {
      gqlQuery: EVENTS_QUERY,
    },
  });

  const { selectProps: venues, query: venuesQuery } = useSelect<
    GetFieldsFromList<VenuesListQuery>
  >({
    resource: 'venues',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: VENUES_QUERY,
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

  const { selectProps: templates, query: templatesQuery } = useSelect<
    GetFieldsFromList<TemplatesListQuery>
  >({
    resource: 'templates',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: TEMPLATES_QUERY,
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
          dataSource={business ? tableProps.dataSource : []}
        >
          <Table.Column<Event>
            dataIndex="template.id"
            title="Template"
            defaultFilteredValue={getDefaultFilter('templateId', filters)}
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
                  placeholder="Select template"
                  options={templates.options}
                />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space onClick={() => edit('templates', record.template.id)}>
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#007965',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {record.template.name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="name"
            title="Name"
            defaultFilteredValue={getDefaultFilter('name', filters)}
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
          <Table.Column<Event>
            dataIndex="template.description"
            title="Description"
            defaultFilteredValue={getDefaultFilter(
              'description',
              filters,
              'contains',
            )}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input style={{ width: 250 }} placeholder="Description" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.template.description
                    ? shortenString(25, record.template.description)
                    : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="date"
            title="Date & Time"
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
            defaultFilteredValue={getDefaultFilter('date', filters, 'between')}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('date', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(true, record.date)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="template.category"
            title="Category"
            defaultFilteredValue={getDefaultFilter(
              'template.category',
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
                  placeholder="Select category"
                  options={categoryOptions}
                />
              </FilterDropdown>
            )}
            onFilter={(value, record) => {
              return value === record.template.category;
            }}
            render={(value, record) => (
              <Space>
                <CategoryTag category={record.template.category} />
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="template.language"
            title="Language"
            defaultFilteredValue={getDefaultFilter(
              'template.language',
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
                  placeholder="Select language"
                  options={languageOptions}
                />
              </FilterDropdown>
            )}
            onFilter={(value, record) => {
              return value === record.template.language;
            }}
            render={(value, record) => (
              <Space>
                <Text>{record.template.language ?? null}</Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="template.subtitles"
            title="Subtitles"
            defaultFilteredValue={getDefaultFilter(
              'template.subtitles',
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
                  placeholder="Select subtitles"
                  options={languageOptions}
                />
              </FilterDropdown>
            )}
            onFilter={(value, record) => {
              return value === record.template.subtitles;
            }}
            render={(value, record) => (
              <Space>
                <Text>{record.template.subtitles ?? null}</Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            dataIndex="template.venueId"
            title="Venue"
            defaultFilteredValue={getDefaultFilter('venue', filters)}
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
                  placeholder="Select venue"
                  options={venues.options}
                />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space onClick={() => edit('venues', record.template.venue.id)}>
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#007965',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {record.template.venue.name}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Event>
            width={200}
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
