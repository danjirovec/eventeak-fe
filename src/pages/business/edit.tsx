import React, { useState } from 'react';
import { Edit, ListButton, useForm } from '@refinedev/antd';
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Select,
} from 'antd';
import { UPDATE_BUSINESS_MUTATION } from 'graphql/mutations';
import { requiredMark, requiredOptionalMark } from 'components/requiredMark';
import { useGo } from '@refinedev/core';
import SupaUpload from 'components/upload/supaUpload';
import { uploadEdit } from 'components/upload/util';
import { SendOutlined } from '@ant-design/icons';
import { BASE_API_URL } from 'providers';
import { useGlobalStore } from 'providers/context/store';
import { currencyOptions } from 'enum/enum';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const EditBusiness = () => {
  const user = useGlobalStore((state) => state.user);
  const business = useGlobalStore((state) => state.business);
  const setBusiness = useGlobalStore((state) => state.setBusiness);
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
    const valid = await inviteForm.validateFields(['email']).catch(() => {
      return;
    });
    if (
      !valid ||
      inviteForm.getFieldValue('email') == '' ||
      inviteForm.getFieldValue('email') == undefined
    ) {
      return;
    }
    try {
      const response = await fetch(`${BASE_API_URL}invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
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
        showNotification('success', 'Invitation sent');
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

    if (id && id == business?.id) {
      setBusiness({
        name: values.name,
        id: id,
        currency: values.currency,
      });
    }
  };

  return (
    <React.Fragment>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={8}>
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
            headerButtons={({ listButtonProps }) => (
              <>{listButtonProps && <ListButton {...listButtonProps} />}</>
            )}
          >
            {contextHolder}
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
                initialValue={formProps?.initialValues?.currency}
                rules={[{ required: true, message: '' }]}
              >
                <Select
                  allowClear
                  placeholder="Currency"
                  options={currencyOptions}
                />
              </Form.Item>
              <Form.Item name="logoUrl" label="Logo" hasFeedback>
                <SupaUpload
                  folder="businesses"
                  incomingUrl={formProps?.initialValues?.logoUrl}
                  onUpload={handleUpload}
                />
              </Form.Item>
            </Form>
            <Divider />
            <Form form={inviteForm} layout="vertical">
              <Flex align="flex-end" gap={8}>
                <Form.Item
                  label="Invite user to manage this business"
                  name="email"
                  style={{ margin: 0, width: '100%' }}
                  rules={[
                    { type: 'email', message: '' },
                    // { required: true, message: '' },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Button
                  icon={<SendOutlined />}
                  type="default"
                  onClick={handleOnClick}
                >
                  Send
                </Button>
              </Flex>
            </Form>
          </Edit>
        </Col>
      </Row>
    </React.Fragment>
  );
};
