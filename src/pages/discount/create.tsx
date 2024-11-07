import React from 'react';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { Create, useForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_DISCOUNT_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { useGlobalStore } from 'providers/context/store';

export const CreateDiscount = () => {
  const business = useGlobalStore((state) => state.business);
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'discounts', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, formLoading, saveButtonProps, onFinish } = useForm({
    action: 'create',
    resource: 'discounts',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      gqlMutation: CREATE_DISCOUNT_MUTATION,
    },
    submitOnEnter: true,
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
          isLoading={formLoading}
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
              style={{ width: '100%' }}
              label="Percentage"
              name="percentage"
              rules={[{ required: true, message: '' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={100}
                placeholder="Percentage"
                addonAfter="%"
              />
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
