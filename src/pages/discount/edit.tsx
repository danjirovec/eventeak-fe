import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { UPDATE_DISCOUNT_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';

export const EditDiscount = () => {
  const { saveButtonProps, formProps, formLoading } = useForm({
    redirect: 'list',
    meta: {
      gqlMutation: UPDATE_DISCOUNT_MUTATION,
    },
  });

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={10}>
          <Edit
            canDelete
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
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="Percentage"
                name="percentage"
                rules={[{ required: true, message: '' }]}
              >
                <InputNumber
                  min={1}
                  max={100}
                  placeholder="Percentage"
                  addonAfter="%"
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
