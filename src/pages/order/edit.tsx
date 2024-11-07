import React from 'react';
import { Edit, ListButton, useForm, useSelect } from '@refinedev/antd';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { UPDATE_ORDER_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { UserBusinessesListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { USER_BUSINESSES_QUERY } from 'graphql/queries';
import { useGlobalStore } from 'providers/context/store';
import { useGo } from '@refinedev/core';

export const EditOrder = () => {
  const business = useGlobalStore((state) => state.business);
  const { saveButtonProps, formProps, formLoading } = useForm({
    resource: 'orders',
    action: 'edit',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      gqlMutation: UPDATE_ORDER_MUTATION,
    },
  });
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'orders', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { selectProps: users, query: usersQuery } = useSelect<
    GetFieldsFromList<UserBusinessesListQuery>
  >({
    resource: 'businessUsers',
    optionLabel: (item) => item.user.email,
    optionValue: (item) => item.user.id,
    meta: {
      gqlQuery: USER_BUSINESSES_QUERY,
    },
    pagination: {
      pageSize: 20,
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
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={8}>
          <Edit
            goBack={<Button>←</Button>}
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
            headerProps={{ onBack: goToListPage }}
            headerButtons={({ listButtonProps }) => (
              <>{listButtonProps && <ListButton {...listButtonProps} />}</>
            )}
          >
            <Form
              {...formProps}
              layout="vertical"
              requiredMark={requiredOptionalMark}
            >
              <Form.Item
                style={{ width: '100%' }}
                label="Total"
                name="total"
                rules={[{ required: true, message: '' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Total"
                  addonAfter={business?.currency}
                />
              </Form.Item>
              <Form.Item
                label="User"
                name="userId"
                initialValue={formProps?.initialValues?.user?.id}
              >
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    String(option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  defaultValue={formProps?.initialValues?.user?.id}
                  allowClear
                  placeholder="User"
                  {...users}
                  options={users.options}
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
