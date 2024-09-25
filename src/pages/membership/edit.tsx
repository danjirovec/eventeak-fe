import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { Button, Col, Form, Input, Row } from 'antd';
import { UPDATE_MEMBERSHIP_TYPE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';

export const EditMembershipType = () => {
  const { saveButtonProps, formProps, formLoading } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_MEMBERSHIP_TYPE_MUTATION,
    },
  });

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={10}>
          <Edit
            goBack={<Button>←</Button>}
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form
              {...formProps}
              layout="vertical"
              requiredMark={requiredOptionalMark}
            >
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Name" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
