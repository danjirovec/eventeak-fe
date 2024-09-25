import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CloneButton,
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  ShowButton,
  getDefaultSortOrder,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo, useNavigation } from '@refinedev/core';
import { Input, Radio, Select, Space, Table } from 'antd';
import { TEMPLATES_QUERY } from 'graphql/queries';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CopyOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { Text } from 'components/text';
import { EventTemplate } from 'graphql/schema.types';
import { shortenString, emptyChecker } from '../../util';
import { CategoryTag } from 'components';
import { categoryOptions } from 'enum/enum';
import { getBusiness } from 'util/get-business';

export const TemplateList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Templates - Applausio');
  const go = useGo();
  const { edit } = useNavigation();
  const { tableProps, filters, sorters } = useTable({
    resource: 'event-templates',
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
          field: 'type',
          order: 'asc',
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
      gqlQuery: TEMPLATES_QUERY,
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
                to: { resource: 'event-templates', action: 'create' },
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
          <Table.Column<EventTemplate>
            dataIndex="type"
            title="Parent"
            defaultFilteredValue={getDefaultFilter('type', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Radio.Group>
                  <Radio value={'Parent'}>Yes</Radio>
                  <Radio value={'Child'}>No</Radio>
                </Radio.Group>
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                {record.type == 'Parent' ? (
                  <CheckCircleTwoTone twoToneColor="#007965" />
                ) : (
                  <CloseCircleTwoTone twoToneColor="#ad001d" />
                )}
              </Space>
            )}
          />
          <Table.Column<EventTemplate>
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
          <Table.Column<EventTemplate>
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
          <Table.Column<EventTemplate>
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
                  {shortenString(25, emptyChecker(record.description))}
                </Text>
              </Space>
            )}
          />
          <Table.Column<EventTemplate>
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
          <Table.Column<EventTemplate>
            dataIndex="length"
            title="Length"
            defaultFilteredValue={getDefaultFilter('length', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Length" />
              </FilterDropdown>
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('length', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.length} {record.length ? 'min' : '-'}
                </Text>
              </Space>
            )}
          />
          <Table.Column<EventTemplate>
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
