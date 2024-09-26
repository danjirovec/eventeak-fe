import { useOne, useUpdate } from '@refinedev/core';
import { GetFields, GetFieldsFromList } from '@refinedev/nestjs-query';

import {
  CloseOutlined,
  ControlOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Drawer,
  Input,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd';

import {
  UPDATE_USER_MUTATION,
  UPDATE_PASSWORD_MUTATION,
} from 'graphql/mutations';

import { Text } from '../../text';
import styles from './index.module.css';

import { GetUserQuery, UserBusinessesListQuery } from '/graphql/types';
import { useEffect, useState } from 'react';
import { USER_BUSINESSES_QUERY, USER_QUERY } from 'graphql/queries';
import { SingleElementForm } from 'components/single-form-element';
import { useSelect } from '@refinedev/antd';
import { getAuth } from 'util/get-auth';
import SupaUpload from 'components/upload/supaUpload';
import { uploadEdit } from 'components/upload/util';

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

type FormKeys =
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'placeOfResidence'
  | 'defaultBusiness'
  | 'password';

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  const [activeForm, setActiveForm] = useState<FormKeys>();
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const [savingImg, setSavingImg] = useState(false);
  const [seed, setSeed] = useState(1);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  const { mutate } = useUpdate();

  const { data, isLoading, isError } = useOne<GetFields<GetUserQuery>>({
    resource: 'users',
    id: userId,
    queryOptions: {
      enabled: opened,
    },
    meta: {
      gqlQuery: USER_QUERY,
    },
  });

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UserBusinessesListQuery>
  >({
    resource: 'businessUsers',
    optionLabel: 'business',
    optionValue: 'business',
    meta: {
      gqlQuery: USER_BUSINESSES_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'user.id',
        operator: 'eq',
        value: getAuth().userId,
      },
      {
        field: 'role',
        operator: 'eq',
        value: 0,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  useEffect(() => {
    if (data) {
      setImgUrl(data?.data.avatarUrl ? data?.data.avatarUrl : undefined);
    }
  }, [data]);

  const closeModal = () => {
    setOpened(false);
  };

  if (isError) {
    closeModal();
    return null;
  }

  const { id, email, firstName, lastName, placeOfResidence, defaultBusiness } =
    data?.data ?? {};

  const getActiveForm = (key: FormKeys) => {
    if (activeForm === key) {
      return 'form';
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!data?.data[key]) {
      return 'empty';
    }

    return 'view';
  };

  if (isLoading) {
    return (
      <Drawer
        open={opened}
        width={756}
        styles={{
          body: {
            background: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <Spin />
      </Drawer>
    );
  }

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const reset = () => {
    setSeed(Math.random());
    setSavingImg(false);
  };

  const handleUpdateImage = async () => {
    const prev = data?.data?.avatarUrl;
    if (!formData && prev) {
      setImgUrl(undefined);
    }
    const avatarUrl = await uploadEdit('avatars', formData, prev ? prev : null);
    mutate({
      resource: 'users',
      values: {
        avatarUrl: avatarUrl,
      },
      id: userId,
    });
    reset();
  };

  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { background: '#f5f5f5', padding: 0 },
        header: { display: 'none' },
      }}
    >
      <div className={styles.header}>
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => closeModal()}
        />
      </div>
      <div className={styles.container}>
        <div style={{ display: 'flex', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 100,
                minWidth: 100,
                height: 100,
                width: 100,
              }}
            >
              <SupaUpload
                key={seed}
                folder="avatars"
                onUpload={handleUpload}
                incomingUrl={imgUrl}
              />
            </div>
            <Button
              type="primary"
              loading={savingImg}
              onClick={() => {
                setSavingImg(true);
                handleUpdateImage();
              }}
            >
              Save
            </Button>
          </div>
          <Typography.Title
            level={3}
            style={{
              padding: 0,
              margin: 0,
              width: '100%',
            }}
            className={styles.title}
          >
            {firstName} {lastName}
          </Typography.Title>
        </div>
        <Card
          title={
            <Space size={15}>
              <UserOutlined />
              <Text size="sm">Personal</Text>
            </Space>
          }
          styles={{ header: { padding: '0 12px' }, body: { padding: '0' } }}
        >
          <SingleElementForm
            useFormProps={{
              id,
              resource: 'users',
              meta: {
                gqlMutation: UPDATE_USER_MUTATION,
              },
            }}
            formProps={{ initialValues: { firstName } }}
            icon={<SwapLeftOutlined />}
            state={getActiveForm('firstName')}
            itemProps={{
              name: 'firstName',
              label: 'First Name',
              rules: [
                { required: true, message: '' },
                { type: 'string', message: '' },
                { whitespace: true, message: '' },
                {
                  pattern: /^(?=.*?[A-Za-z])/,
                  message: '',
                },
              ],
              hasFeedback: true,
            }}
            view={<Text>{firstName}</Text>}
            onClick={() => setActiveForm('firstName')}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>
          <SingleElementForm
            useFormProps={{
              id,
              resource: 'users',
              meta: {
                gqlMutation: UPDATE_USER_MUTATION,
              },
            }}
            formProps={{ initialValues: { lastName } }}
            icon={<SwapRightOutlined />}
            state={getActiveForm('lastName')}
            itemProps={{
              name: 'lastName',
              label: 'Last Name',
              rules: [
                { required: true, message: '' },
                { type: 'string', message: '' },
                { whitespace: true, message: '' },
                {
                  pattern: /^(?=.*?[A-Za-z])/,
                  message: '',
                },
              ],
              hasFeedback: true,
            }}
            view={<Text>{lastName}</Text>}
            onClick={() => setActiveForm('lastName')}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>
          <SingleElementForm
            useFormProps={{
              id,
              resource: 'users',
              meta: {
                gqlMutation: UPDATE_USER_MUTATION,
              },
            }}
            formProps={{ initialValues: { placeOfResidence } }}
            icon={<HomeOutlined />}
            state={getActiveForm('placeOfResidence')}
            itemProps={{
              name: 'placeOfResidence',
              label: 'Place of Residence',
              rules: [
                { required: true, message: '' },
                { type: 'string', message: '' },
                { whitespace: true, message: '' },
                {
                  pattern: /^(?=.*?[A-Za-z])/,
                  message: '',
                },
              ],
              hasFeedback: true,
            }}
            view={<Text>{placeOfResidence}</Text>}
            onClick={() => setActiveForm('placeOfResidence')}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>
        </Card>
        <Card
          title={
            <Space size={15}>
              <SafetyCertificateOutlined />
              <Text size="sm">Credentials</Text>
            </Space>
          }
          styles={{ header: { padding: '0 12px' }, body: { padding: 0 } }}
        >
          <SingleElementForm
            useFormProps={{
              id,
              resource: 'users',
              meta: {
                gqlMutation: UPDATE_USER_MUTATION,
              },
            }}
            formProps={{ initialValues: { email } }}
            icon={<MailOutlined />}
            state={getActiveForm('email')}
            itemProps={{
              name: 'email',
              label: 'Email',
              rules: [
                { required: true, message: '' },
                { type: 'email', message: '' },
                { whitespace: true, message: '' },
              ],
              hasFeedback: true,
            }}
            view={<Text>{email}</Text>}
            onClick={() => setActiveForm('email')}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Input />
          </SingleElementForm>
          <SingleElementForm
            useFormProps={{
              id,
              resource: 'users',
              meta: {
                gqlMutation: UPDATE_PASSWORD_MUTATION,
                customType: true,
              },
            }}
            icon={<LockOutlined />}
            state={getActiveForm('password')}
            itemProps={{
              name: 'password',
              label: 'Password',
            }}
            password={true}
            view={<Text>{'●●●●●●●●'}</Text>}
            onClick={() => setActiveForm('password')}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          ></SingleElementForm>
        </Card>
        <Card
          title={
            <Space size={15}>
              <ControlOutlined />
              <Text size="sm">Preferences</Text>
            </Space>
          }
          styles={{ header: { padding: '0 12px' }, body: { padding: 0 } }}
        >
          <SingleElementForm
            useFormProps={{
              id,
              resource: 'users',
              meta: {
                gqlMutation: UPDATE_USER_MUTATION,
              },
            }}
            icon={<ShopOutlined />}
            state={getActiveForm('defaultBusiness')}
            itemProps={{
              name: 'defaultBusinessId',
              label: 'Default Business',
              initialValue: defaultBusiness?.name,
              rules: [{ required: true, message: '' }],
            }}
            view={<Text>{defaultBusiness?.name}</Text>}
            onClick={() => setActiveForm('defaultBusiness')}
            onUpdate={() => setActiveForm(undefined)}
            onCancel={() => setActiveForm(undefined)}
          >
            <Select
              placeholder="Business"
              {...selectProps}
              options={queryResult.data?.data.map((business) => ({
                value: business.business.id,
                label: business.business.name,
              }))}
              showSearch={false}
            />
          </SingleElementForm>
        </Card>
      </div>
    </Drawer>
  );
};
