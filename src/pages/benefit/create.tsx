import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_BENEFIT_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { useGlobalStore } from 'providers/context/store';
import { MembershipTypeListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { MEMBERSHIP_TYPE_QUERY } from 'graphql/queries';

export const CreateBenefit = () => {
  const business = useGlobalStore((state) => state.business);
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'benefits', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };
  const { TextArea } = Input;

  const { formProps, saveButtonProps, onFinish } = useForm({
    action: 'create',
    resource: 'benefits',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      gqlMutation: CREATE_BENEFIT_MUTATION,
    },
    submitOnEnter: true,
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

  const handleOnFinish = (values: any) => {
    onFinish({
      ...values,
      businessId: business?.id,
    });
  };

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={8}>
        <Create
          saveButtonProps={saveButtonProps}
          goBack={<Button>←</Button>}
          breadcrumb={false}
          headerProps={{ onBack: goToListPage }}
        >
          <Form
            {...formProps}
            layout="vertical"
            requiredMark={requiredOptionalMark}
            onFinish={handleOnFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: '' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Description"></TextArea>
            </Form.Item>
            <Form.Item
              name="points"
              label="Points"
              style={{ width: '100%' }}
              rules={[{ required: true, message: '' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Points"
                addonAfter="points"
                min={0}
              />
            </Form.Item>
            <Form.Item
              name="membershipTypeId"
              label="Membership Type"
              style={{ width: '100%' }}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                options={membershipTypes.options}
                placeholder="Membership Type"
                allowClear={true}
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Form.Item
              name="expiryDate"
              label="Expiry Date"
              style={{ width: '100%' }}
            >
              <DatePicker
                showNow={false}
                style={{ width: '100%' }}
                format="D. M. YYYY"
                placeholder="Expiry Date"
                allowClear={true}
                needConfirm={false}
              />
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
