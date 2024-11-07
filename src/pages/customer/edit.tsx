import React, { useState } from 'react';
import { requiredOptionalMark } from 'components/requiredMark';
import { UPDATE_USER_MUTATION } from 'graphql/mutations';
import { useGlobalStore } from 'providers/context/store';
import { Edit, ListButton, useForm } from '@refinedev/antd';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import { useGo, useList, useNavigation } from '@refinedev/core';
import { MEMBERSHIPS_QUERY } from 'graphql/queries';
import { HeartOutlined } from '@ant-design/icons';
import SupaUpload from 'components/upload/supaUpload';
import { uploadEdit } from 'components/upload/util';

export const EditCustomer = () => {
  const business = useGlobalStore((state) => state.business);
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const { saveButtonProps, formProps, formLoading, onFinish, id } = useForm({
    resource: 'users',
    action: 'edit',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      gqlMutation: UPDATE_USER_MUTATION,
    },
  });
  const { edit } = useNavigation();
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'users', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { data, isFetching: membershipsLoading } = useList({
    resource: 'memberships',
    pagination: {
      pageSize: 1,
      mode: 'server',
    },
    filters: [
      {
        field: 'user.id',
        operator: 'eq',
        value: id,
      },
      {
        field: 'business.id',
        operator: 'eq',
        value: business?.id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    meta: {
      gqlQuery: MEMBERSHIPS_QUERY,
    },
  });

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const handleOnFinish = async (values: any) => {
    const prev = formProps.initialValues?.avatarUrl;
    const avatarUrl = await uploadEdit('avatars', formData, prev);

    onFinish({
      ...values,
      avatarUrl: avatarUrl,
    });
  };

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={8}>
          <Edit
            goBack={<Button>←</Button>}
            isLoading={formLoading && membershipsLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
            headerButtons={({ listButtonProps }) => (
              <>
                <Button
                  disabled={data?.data && data.data.length > 0 ? false : true}
                  onClick={() => {
                    edit(
                      'memberships',
                      data?.data && data.data.length > 0
                        ? data?.data[0].id
                          ? data?.data[0].id
                          : ''
                        : '',
                    );
                  }}
                  type="primary"
                  icon={<HeartOutlined />}
                >
                  Membership
                </Button>
                {listButtonProps && <ListButton {...listButtonProps} />}
              </>
            )}
            headerProps={{ onBack: goToListPage }}
          >
            <Form
              {...formProps}
              layout="vertical"
              requiredMark={requiredOptionalMark}
              onFinish={handleOnFinish}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: '', type: 'email' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                name="birthDate"
                label="Birth Date"
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : '',
                })}
                rules={[{ required: true, message: '' }]}
              >
                <DatePicker
                  showNow={false}
                  style={{ width: '100%' }}
                  format="D. M. YYYY"
                  placeholder="Birth Date"
                  allowClear={true}
                  needConfirm={false}
                />
              </Form.Item>
              <Form.Item label="Place of Residence" name="placeOfResidence">
                <Input placeholder="Place of Residence" />
              </Form.Item>
              <Form.Item name="avatarUrl" label="Avatar" hasFeedback>
                <SupaUpload
                  folder="avatars"
                  incomingUrl={formProps.initialValues?.avatarUrl}
                  onUpload={handleUpload}
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
