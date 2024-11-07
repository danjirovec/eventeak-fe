import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { Create, useForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_BUSINESS_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import SupaUpload from 'components/upload/supaUpload';
import { uploadCreate } from 'components/upload/util';
import { useGlobalStore } from 'providers/context/store';
import { currencyOptions } from 'enum/enum';

export const CreateBusiness = () => {
  const user = useGlobalStore((state) => state.user);
  const [formData, setFormData] = useState<FormData | null>(null);
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'businesses', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, onFinish, formLoading, saveButtonProps } = useForm({
    action: 'create',
    resource: 'businesses',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_BUSINESS_MUTATION,
      customType: true,
    },
    submitOnEnter: true,
  });

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const handleOnFinish = async (values: any) => {
    const logoUrl = await uploadCreate('businesses', formData);
    onFinish({
      ...values,
      userId: user?.id,
      logoUrl: logoUrl,
    });
  };

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={8}>
        <Create
          saveButtonProps={{
            ...saveButtonProps,
            loading: formLoading,
          }}
          isLoading={formLoading}
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
              label="Currency"
              name="currency"
              rules={[{ required: true, message: '' }]}
            >
              <Select
                allowClear
                placeholder="Currency"
                options={currencyOptions}
              />
            </Form.Item>
            <Form.Item label="Logo" name="logoUrl">
              <SupaUpload onUpload={handleUpload} />
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
