import React from 'react';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { Create, useForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_MEMBERSHIP_TYPE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { useGlobalStore } from 'providers/context/store';

export const CloneMembershipType = () => {
  const business = useGlobalStore((state) => state.business);
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'membership-types', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, saveButtonProps, onFinish } = useForm({
    action: 'clone',
    resource: 'membership-types',
    redirect: 'list',
    mutationMode: 'pessimistic',
    successNotification() {
      return {
        description: 'Success',
        message: 'Successfully created a membership type',
        type: 'success',
      };
    },
    meta: {
      gqlMutation: CREATE_MEMBERSHIP_TYPE_MUTATION,
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
          title="Clone Membership Type"
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
              <Input
                placeholder="Name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              style={{ width: '100%' }}
              rules={[{ required: true, message: '' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Price"
                addonAfter={business?.currency}
                min={0}
              />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
