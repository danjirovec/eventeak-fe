import React from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import { Create, useForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_BENEFIT_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import dayjs from 'dayjs';
import { getBusiness } from 'util/get-business';

export const CloneBenefit = () => {
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
    action: 'clone',
    resource: 'benefits',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_BENEFIT_MUTATION,
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
              <InputNumber placeholder="Points" addonAfter="points" min={0} />
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
        </Create>
      </Col>
    </Row>
  );
};
