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
import {
  getDefaultFilter,
  useGo,
  useList,
  useNavigation,
} from '@refinedev/core';
import { Input, Space, Table } from 'antd';
import { CUSTOMERS_QUERY, MEMBERSHIPS_QUERY } from 'graphql/queries';
import { FilterFilled } from '@ant-design/icons';
import { Text } from 'components/text';
import { BusinessUser } from 'graphql/schema.types';
import { formatDate } from '../../util';
import { getBusiness } from 'util/get-business';

export const CustomerList = ({ children }: React.PropsWithChildren) => {
  useDocumentTitle('Users - Applausio');
  const go = useGo();
  const { edit } = useNavigation();
  const { tableProps, filters } = useTable({
    resource: 'businessUsers',
    onSearch: (values: any) => {
      return [
        {
          field: 'email',
          operator: 'contains',
          value: values.email,
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
          field: 'email',
          operator: 'contains',
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: CUSTOMERS_QUERY,
    },
  });

  const { data } = useList({
    resource: 'memberships',
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'business.id',
        operator: 'eq',
        value: sessionStorage.getItem('currentBusiness'),
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    meta: {
      gqlQuery: MEMBERSHIPS_QUERY,
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
                to: { resource: 'users', action: 'create' },
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
          <Table.Column<BusinessUser>
            dataIndex="firstName"
            title="First Name"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user.firstName}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="lastName"
            title="Last Name"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Last Name" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user.lastName}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="email"
            title="Email"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Email" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {record.user.email}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="birthDate"
            title="Birth Date"
            defaultFilteredValue={getDefaultFilter('birthDate', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Birth Date" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(false, record.user.birthDate)}
                </Text>
              </Space>
            )}
          />
          <Table.Column<BusinessUser>
            dataIndex="type"
            title="Membership Type"
            defaultFilteredValue={getDefaultFilter('type', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Membership Type" />
              </FilterDropdown>
            )}
            render={(value, record) => {
              const membership = data?.data.filter(
                (item) => item.user.id === record.user.id,
              );
              const type = membership
                ? membership.length > 0
                  ? membership[0].membershipType.name
                  : '-'
                : '-';
              return (
                <Space
                  onClick={() =>
                    edit(
                      'membership-types',
                      membership ? membership[0].membershipType.id : undefined,
                    )
                  }
                >
                  <Text
                    style={{
                      whiteSpace: 'nowrap',
                      color: '#007965',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {type}
                  </Text>
                </Space>
              );
            }}
          />
          <Table.Column<BusinessUser>
            dataIndex="points"
            title="Membership Points"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Membership Points" />
              </FilterDropdown>
            )}
            render={(value, record) => {
              const membership = data?.data.filter(
                (item) => item.user.id === record.user.id,
              );
              const points = membership
                ? membership.length > 0
                  ? membership[0].points
                  : '-'
                : '-';
              return (
                <Space>
                  <Text style={{ whiteSpace: 'nowrap' }}>{points}</Text>
                </Space>
              );
            }}
          />
          <Table.Column<BusinessUser>
            dataIndex="expiryDate"
            title="Membership Expiry Date"
            defaultFilteredValue={getDefaultFilter('id', filters)}
            filterIcon={<FilterFilled />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Membership Expiry Date" />
              </FilterDropdown>
            )}
            render={(value, record) => {
              const membership = data?.data.filter(
                (item) => item.user.id === record.user.id,
              );
              const expiryDate = membership
                ? membership.length > 0
                  ? membership[0].expiryDate
                  : '-'
                : '-';
              return (
                <Space>
                  <Text style={{ whiteSpace: 'nowrap' }}>
                    {formatDate(false, expiryDate)}
                  </Text>
                </Space>
              );
            }}
          />
          <Table.Column<BusinessUser>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value, record) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.user.id}
                />
                <DeleteButton
                  hideText
                  size="small"
                  recordItemId={record.user.id}
                />
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.user.id}
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
