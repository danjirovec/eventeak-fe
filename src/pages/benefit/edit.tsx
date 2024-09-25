import React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import { UPDATE_BENEFIT_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import dayjs from 'dayjs';
import { getBusiness } from 'util/get-business';
import { useGo } from '@refinedev/core';

export const EditBenefit = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'benefits', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };
  const { saveButtonProps, formProps, formLoading, onFinish } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_BENEFIT_MUTATION,
    },
    onMutationSuccess: goToListPage,
  });
  const { TextArea } = Input;

  const handleOnFinish = (values: any) => {
    onFinish({
      ...values,
    });
  };

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
              onFinish={handleOnFinish}
            >
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
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
                rules={[{ required: true, message: '' }]}
              >
                <InputNumber addonAfter="points" min={0} />
              </Form.Item>
              <Form.Item
                name="expiryDate"
                label="Expiry Date"
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : '',
                })}
              >
                <DatePicker
                  format="D. M. YYYY"
                  placeholder="Date"
                  allowClear={true}
                  needConfirm={false}
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
