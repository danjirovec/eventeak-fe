import React, { useState } from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { Button, Card, Col, Form, Input, notification, Row, Space } from 'antd';
import { UPDATE_BUSINESS_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { useGo } from '@refinedev/core';
import { getBusiness } from 'util/get-business';
import { useShared } from 'providers/context/business';
import SupaUpload from 'components/upload/supaUpload';
import { uploadEdit } from 'components/upload/util';
import { getAuth } from 'util/get-auth';
import { SendOutlined } from '@ant-design/icons';
import { BASE_API_URL } from 'providers';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const EditBusiness = () => {
  const { setSharedValue } = useShared();
  const [api, contextHolder] = notification.useNotification();
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const { form: inviteForm } = useForm();
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'businesses', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, formLoading, onFinish, id, saveButtonProps } = useForm({
    redirect: false,
    action: 'edit',
    resource: 'businesses',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: UPDATE_BUSINESS_MUTATION,
    },
    submitOnEnter: true,
  });

  const showNotification = (type: NotificationType, message: string) => {
    api[type]({
      message: message,
    });
  };

  const handleOnClick = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuth().accessToken}`,
        },
        body: JSON.stringify({
          email: inviteForm.getFieldValue('email'),
          business: formProps.initialValues?.id,
        }),
      });
      const resJson = await response.json();

      if (!response.ok) {
        showNotification('error', resJson.message);
      } else {
        showNotification('success', 'User invited');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const handleOnFinish = async (values: any) => {
    const prev = formProps?.initialValues?.logoUrl;
    const logoUrl = await uploadEdit('businesses', formData, prev);

    onFinish({
      ...values,
      logoUrl: logoUrl,
    });

    if (id == getBusiness().id) {
      sessionStorage.setItem(
        'business',
        JSON.stringify({
          id: id,
          name: values.name,
        }),
      );
      setSharedValue((prev) => prev + 1);
    }
  };

  return (
    <React.Fragment>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={10}>
          <Edit
            canDelete
            goBack={<Button>←</Button>}
            isLoading={formLoading}
            saveButtonProps={{
              ...saveButtonProps,
              loading: formLoading,
            }}
            breadcrumb={false}
            headerProps={{ onBack: goToListPage }}
          >
            {contextHolder}
            <Form
              variant="filled"
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
              <Form.Item name="logoUrl" label="Logo" hasFeedback>
                <SupaUpload
                  folder="businesses"
                  incomingUrl={formProps?.initialValues?.logoUrl}
                  onUpload={handleUpload}
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
      <Row justify="center" gutter={[32, 32]} style={{ marginTop: 50 }}>
        <Col xs={24} xl={10}>
          <Card>
            {contextHolder}
            <Form form={inviteForm} layout="vertical" variant="filled">
              <Space style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Form.Item
                  label="Invite user to manage this business"
                  name="email"
                  style={{ margin: 0 }}
                  rules={[{ type: 'email', message: '' }]}
                >
                  <Input placeholder="Email"></Input>
                </Form.Item>
                <Button
                  icon={<SendOutlined />}
                  type="primary"
                  onClick={handleOnClick}
                >
                  Send
                </Button>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};
