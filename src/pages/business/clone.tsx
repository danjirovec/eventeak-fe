import React, { useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { Create, useForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_BUSINESS_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import SupaUpload from 'components/upload/supaUpload';
import { uploadClone } from 'components/upload/util';
import { getAuth } from 'util/get-auth';

export const CloneBusiness = () => {
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'businesses', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, onFinish, formLoading, saveButtonProps } = useForm({
    action: 'clone',
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
    const prev = formProps?.initialValues?.logoUrl;
    const logoUrl = await uploadClone('businesses', formData, prev);
    onFinish({
      ...values,
      logoUrl: logoUrl,
      userId: getAuth().userId,
    });
  };

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={10}>
        <Create
          title="Clone Business"
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
            variant="filled"
            layout="vertical"
            requiredMark={requiredOptionalMark}
            onFinish={handleOnFinish}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Logo" name="logoUrl">
              <SupaUpload
                folder="businesses"
                incomingUrl={formProps?.initialValues?.logoUrl}
                onUpload={handleUpload}
              />
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
