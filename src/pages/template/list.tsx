import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  BooleanField,
  CloneButton,
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo, useNavigation } from '@refinedev/core';
import { Checkbox, Input, InputNumber, Select, Space, Table } from 'antd';
import { TEMPLATES_QUERY, VENUES_QUERY } from 'graphql/queries';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CopyOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { Text } from 'components/text';
import { Template } from 'graphql/schema.types';
import { shortenString } from '../../util';
import { CategoryTag } from 'components';
import { categoryOptions, languageOptions } from 'enum/enum';
import { useGlobalStore } from 'providers/context/store';
import { VenuesListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';

export const TemplateList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Templates - Eventeak');
  const go = useGo();
  const { edit } = useNavigation();
  const { tableProps, filters, sorters } = useTable({
    resource: 'templates',
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
          field: 'description',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: TEMPLATES_QUERY,
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

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            disabled={!business}
            onClick={() => {
              go({
                to: { resource: 'templates', action: 'create' },
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
          <Table.Column<Template>
            dataIndex="type"
            title="Root"
            defaultFilteredValue={getDefaultFilter('type', filters)}
            filterIcon={<FilterFilled />}
            filterMultiple={false}
            filterDropdown={(props) => (
              <FilterDropdown
                {...props}
                mapValue={(selectedKeys) => {
                  return selectedKeys;
                }}
              >
                <Checkbox.Group>
                  <Checkbox value={'Root'}>Yes</Checkbox>
                  <Checkbox value={'Leaf'}>No</Checkbox>
                </Checkbox.Group>
              </FilterDropdown>
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('type', sorters)}
            render={(value, record) => (
              <BooleanField
                value={record.type == 'Root' ? true : false}
                trueIcon={<CheckCircleTwoTone twoToneColor="#007965" />}
                falseIcon={<CloseCircleTwoTone twoToneColor="#ad001d" />}
                valueLabelTrue="Yes"
                valueLabelFalse="No"
              />
            )}
          />
          <Table.Column<Template>
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
          <Table.Column<Template>
            dataIndex="description"
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
                  {record.description
                    ? shortenString(25, record.description)
                    : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Template>
            dataIndex="category"
            title="Category"
            defaultFilteredValue={getDefaultFilter('category', filters)}
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
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('category', sorters)}
            render={(value, record) => (
              <Space>
                <CategoryTag category={record.category} />
              </Space>
            )}
          />
          <Table.Column<Template>
            dataIndex="language"
            title="Language"
            defaultFilteredValue={getDefaultFilter('language', filters)}
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
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('language', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.language ?? null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Template>
            dataIndex="subtitles"
            title="Subtitles"
            defaultFilteredValue={getDefaultFilter('subtitles', filters)}
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
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('subtitles', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.subtitles ?? null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Template>
            dataIndex="venue.id"
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
          <Table.Column<Template>
            dataIndex="length"
            title="Length"
            defaultFilteredValue={getDefaultFilter('length', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  mapValue={(selectedKeys) => [selectedKeys]}
                  {...props}
                >
                  <InputNumber style={{ width: 250 }} placeholder="Length" />
                </FilterDropdown>
              );
            }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('length', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.length ? `${record.length} min` : null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Template>
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
                  errorNotification={(data: any, values, resource) => {
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
