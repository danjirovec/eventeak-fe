import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { Create, useForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_BENEFIT_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { getAuth } from 'util/get-auth';

export const CreateTicket = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'tickets', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };
  const { TextArea } = Input;

  const { formProps, saveButtonProps, onFinish } = useForm({
    action: 'create',
    resource: 'tickets',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_BENEFIT_MUTATION,
    },
    submitOnEnter: true,
  });

  const handleOnFinish = (values: any) => {
    onFinish({ ...values, userId: getAuth().userId });
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
              <Input placeholder="Benefit Name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea placeholder="Description"></TextArea>
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
