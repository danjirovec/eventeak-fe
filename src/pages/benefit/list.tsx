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
import { BENEFITS_QUERY } from 'graphql/queries';
import { FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { Benefit } from 'graphql/schema.types';
import { formatDate, shortenString } from '../../util';
import { getBusiness } from 'util/get-business';

export const BenefitList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Benefits - Applausio');
  const go = useGo();
  const { tableProps, filters } = useTable({
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
      gqlQuery: BENEFITS_QUERY,
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
          dataSource={
            sessionStorage.getItem('business') ? tableProps.dataSource : []
          }
        >
          <Table.Column<Benefit>
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
          <Table.Column<Benefit>
            dataIndex="description"
            title="Description"
            defaultFilteredValue={getDefaultFilter('id', filters)}
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
          <Table.Column<Benefit>
            dataIndex="points"
            title="Points"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Points" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>{record.points}</Text>
              </Space>
            )}
          />
          <Table.Column<Benefit>
            dataIndex="expiryDate"
            title="Expiry Date"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Expiry Date" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(
                    true,
                    record.expiryDate ? record.expiryDate : null,
                  )}
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
                <DeleteButton hideText size="small" recordItemId={value} />
                <ShowButton hideText size="small" recordItemId={value} />
                <CloneButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
