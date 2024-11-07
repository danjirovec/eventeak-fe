import { useDocumentTitle } from '@refinedev/react-router-v6';
import {
  CloneButton,
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultSortOrder,
  List,
  rangePickerFilterMapper,
  useSelect,
  useTable,
} from '@refinedev/antd';
import { getDefaultFilter, useGo, useNavigation } from '@refinedev/core';
import { DatePicker, Input, InputNumber, Select, Space, Table } from 'antd';
import { BENEFITS_QUERY, MEMBERSHIP_TYPE_QUERY } from 'graphql/queries';
import { CopyOutlined, FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { Benefit } from 'graphql/schema.types';
import { formatDate, shortenString } from '../../util';
import { useGlobalStore } from 'providers/context/store';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { MembershipTypeListQuery } from '/graphql/types';

export const BenefitList = ({ children }: React.PropsWithChildren) => {
  const business = useGlobalStore((state) => state.business);
  useDocumentTitle('Benefits - Eventeak');
  const go = useGo();
  const { edit } = useNavigation();
  const { tableProps, filters, sorters } = useTable({
    resource: 'benefits',
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
          field: 'expiryDate',
          operator: 'between',
          value: [],
        },
      ],
    },
    meta: {
      gqlQuery: BENEFITS_QUERY,
    },
  });

  const { selectProps: membershipTypes, query: membershipTypesQuery } =
    useSelect<GetFieldsFromList<MembershipTypeListQuery>>({
      resource: 'membership-types',
      optionLabel: 'name',
      optionValue: 'id',
      meta: {
        gqlQuery: MEMBERSHIP_TYPE_QUERY,
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
                to: { resource: 'benefits', action: 'create' },
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
          <Table.Column<Benefit>
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
          <Table.Column<Benefit>
            dataIndex="description"
            title="Description"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input style={{ width: 250 }} placeholder="Description" />
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
          <Table.Column<Benefit>
            dataIndex="points"
            title="Points"
            defaultFilteredValue={getDefaultFilter('points', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => {
              return (
                <FilterDropdown
                  mapValue={(selectedKeys) => [selectedKeys]}
                  {...props}
                >
                  <InputNumber style={{ width: 250 }} placeholder="Points" />
                </FilterDropdown>
              );
            }}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('points', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.points}</Text>
              </Space>
            )}
          />
          <Table.Column<Benefit>
            dataIndex="expiryDate"
            title="Expiry Date"
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
            defaultFilteredValue={getDefaultFilter(
              'expiryDate',
              filters,
              'between',
            )}
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder('points', sorters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(false, record.expiryDate ?? null)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Benefit>
            dataIndex="membershipType.id"
            title="Membership Type"
            defaultFilteredValue={getDefaultFilter('id', filters)}
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
                  placeholder="Select membership type"
                  options={membershipTypes.options}
                />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space
                onClick={() => {
                  if (record.membershipType) {
                    edit('membership-types', record.membershipType.id);
                  }
                  return;
                }}
              >
                <Text
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#007965',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {record.membershipType?.name ?? null}
                </Text>
              </Space>
            )}
          />
          <Table.Column<Benefit>
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
