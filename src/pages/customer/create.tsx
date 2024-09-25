import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Space,
  Switch,
  Upload,
  UploadProps,
  message,
  Radio,
  InputNumber,
  Col,
  Row,
} from 'antd';
import { useForm, Create } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_BENEFIT_MUTATION } from 'graphql/mutations';
import { UploadOutlined } from '@ant-design/icons';
import { Text } from 'components/text';
import { requiredOptionalMark } from 'components/requiredMark';
import { getAuth } from 'util/get-auth';

const props: UploadProps = {
  name: 'file',
  action: '',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const CreateCustomer = () => {
  const [disabled, setDisabled] = useState(true);
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'users', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const toggle = () => {
    setDisabled(!disabled);
  };

  const { form, formProps, onFinish, saveButtonProps } = useForm({
    action: 'create',
    resource: 'users',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      customType: true,
      gqlMutation: CREATE_BENEFIT_MUTATION,
    },
    submitOnEnter: true,
  });

  const handleOnFinish = (values: any) => {
    const dataToSubmit: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      email: values.email,
      birthDate: values.birthDate,
      placeOfResidence: values.placeOfResidence,
      avatar_url: values.avatar_url,
      userId: getAuth().userId,
      verifyToken: 'random',
    };

    if (values.membership) {
      dataToSubmit.membership = {
        points: values.points,
        type: values.type,
      };
    }
    onFinish(dataToSubmit);
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
            onFinish={handleOnFinish}
            requiredMark={requiredOptionalMark}
          >
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="First Name"
                name="firstName"
                hasFeedback
                style={{ width: '100%' }}
                rules={[{ required: true, message: 'First Name is required' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                hasFeedback
                rules={[{ required: true, message: 'Last Name is required' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Space>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                rules={[
                  { required: true, message: 'Email is required' },
                  {
                    type: 'email',
                    message: 'Invalid email address',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Birth Date"
                name="birthDate"
                hasFeedback
                style={{ display: 'grid', gridTemplateColumns: '1fr' }}
                rules={[
                  { required: true, message: 'Birth Date is required' },
                  {
                    type: 'date',
                    message: 'Invalid date',
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="Birth Date"
                  allowClear={true}
                  style={{ display: 'grid', gridTemplateColumns: '1fr' }}
                />
              </Form.Item>
            </Space>
            <Form.Item
              name="password"
              label={'Password'}
              hasFeedback
              rules={[
                { required: true, message: 'Password is required' },
                {
                  pattern: /^(?=.*?[A-Z])/,
                  message: 'Password must contain an uppercase letter',
                },
                {
                  pattern: /^(?=.*?[a-z])/,
                  message: 'Password must contain a lowercase letter',
                },
                {
                  pattern: /^(?=.*?[0-9])/,
                  message: 'Password must contain a number',
                },
                {
                  pattern: /^(?=.*?[^A-Za-z0-9])/,
                  message: 'Password must contain a special character',
                },
                { min: 8, message: 'Password must be 8 characters long' },
              ]}
            >
              <Input type="password" placeholder="●●●●●●●●" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label={'Confirm Password'}
              hasFeedback
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Password confirmation is required',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input type="password" placeholder="●●●●●●●●" />
            </Form.Item>
            <Form.Item
              label="Place of Residence"
              name="placeOfResidence"
              hasFeedback
            >
              <Input placeholder="Place of Residence" />
            </Form.Item>
            <Form.Item
              name="avatar_url"
              label="Upload Profile Picture"
              hasFeedback
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Text style={{ fontWeight: '600', lineHeight: 2.5 }} size="md">
              Membership
            </Text>
            <Space
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
            >
              <Form.Item name="membership" label="Include" hasFeedback>
                <Switch onClick={toggle}></Switch>
              </Form.Item>
              <Form.Item
                name="type"
                label="Type"
                hasFeedback
                rules={[{ required: !disabled, message: '' }]}
              >
                <Radio.Group
                  disabled={disabled}
                  options={[
                    { label: 'Normal', value: 'Normal' },
                    { label: 'Special', value: 'Special' },
                  ]}
                  optionType="button"
                  value={
                    disabled
                      ? form.setFieldValue('type', undefined)
                      : form.getFieldValue('type')
                  }
                />
              </Form.Item>
              <Form.Item
                name="points"
                label="Points"
                hasFeedback={!disabled}
                rules={[{ required: !disabled, message: '' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  disabled={disabled}
                  min={0}
                  value={
                    disabled
                      ? form.setFieldValue('points', undefined)
                      : form.getFieldValue('points')
                  }
                ></InputNumber>
              </Form.Item>
            </Space>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
