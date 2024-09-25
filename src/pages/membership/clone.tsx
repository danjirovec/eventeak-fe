import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { Create, useForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_MEMBERSHIP_TYPE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { getBusiness } from 'util/get-business';

export const CloneMembershipType = () => {
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
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_MEMBERSHIP_TYPE_MUTATION,
    },
    submitOnEnter: true,
  });

  const handleOnFinish = (values: any) => {
    onFinish({
      ...values,
      businessId: getBusiness().id,
    });
  };

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={10}>
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
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
