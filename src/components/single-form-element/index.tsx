import React from 'react';

import type { UseFormProps } from '@refinedev/antd';
import { useForm } from '@refinedev/antd';

import { EditOutlined } from '@ant-design/icons';
import type { FormItemProps, FormProps } from 'antd';
import { Button, Form, Input, Skeleton } from 'antd';

import { Text } from '../text';
import styles from './index.module.css';
import { requiredMark } from '../requiredMark';

type SingleElementFormProps = {
  icon?: React.ReactNode;
  itemProps?: FormItemProps;
  password?: boolean;
  extra?: React.ReactNode;
  view?: React.ReactNode;
  state?: 'empty' | 'form' | 'view';
  onUpdate?: () => void;
  onCancel?: () => void;
  onClick?: () => void;
  loading?: boolean;
  style?: React.CSSProperties;
  useFormProps?: UseFormProps;
  formProps?: FormProps;
} & React.PropsWithChildren;

export const SingleElementForm: React.FC<SingleElementFormProps> = ({
  state = 'view',
  view,
  icon,
  itemProps,
  password,
  onClick,
  onUpdate,
  onCancel,
  loading,
  children,
  style,
  extra,
  useFormProps,
  formProps: formPropsFromProp,
}) => {
  const { formProps, saveButtonProps, onFinish } = useForm({
    action: 'edit',
    redirect: false,
    autoSave: {
      enabled: false,
    },
    queryOptions: {
      enabled: false,
    },
    onMutationSuccess() {
      onUpdate?.();
    },
    mutationMode: 'pessimistic',
    ...useFormProps,
  });

  const handleOnFinish = (values: any) => {
    if (password) {
      const { confirmPassword, password } = values;
      onFinish({
        userId: sessionStorage.getItem('user_id'),
        password: password,
      });
    } else {
      onFinish(values);
    }
  };

  return (
    <Form
      layout="vertical"
      {...formProps}
      {...formPropsFromProp}
      requiredMark={requiredMark}
      onFinish={handleOnFinish}
    >
      <div className={styles.container} style={style}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.content}>
          <div className={styles.input}>
            <Text size="sm" type="secondary" className={styles.label}>
              {itemProps?.label}
            </Text>
            {loading && (
              <Skeleton.Input className={styles.skeleton} size="small" active />
            )}
            {state === 'form' && !password && !loading && (
              <div className={styles.formItem}>
                <Form.Item {...itemProps} style={{ margin: 0 }}>
                  {children}
                </Form.Item>
                {extra}
              </div>
            )}
            {state === 'form' && password && !loading && (
              <div>
                <div className={styles.formItem}>
                  <Form.Item
                    name="password"
                    style={{ margin: 0 }}
                    hasFeedback
                    rules={[
                      { required: true, message: '' },
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
                    <Input.Password
                      type="password"
                      placeholder="New Password"
                    />
                  </Form.Item>
                  {extra}
                </div>
                <div className={styles.formItem}>
                  <Form.Item
                    label={
                      <label style={{ color: '#000', opacity: 0.4 }}>
                        Confirm Password
                      </label>
                    }
                    style={{ margin: 0 }}
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
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
                          return Promise.reject(
                            new Error('Passwords do not match'),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      type="password"
                      placeholder="Confirm New Password"
                    />
                  </Form.Item>
                  {extra}
                </div>
              </div>
            )}
            {state === 'empty' && !loading && (
              <Button
                onClick={onClick}
                type="link"
                size="small"
                style={{ padding: 0, color: '#34a3f5' }}
              >
                Set New {itemProps?.label}
              </Button>
            )}
            {state === 'view' && view}
          </div>

          {state === 'form' && (
            <div className={styles.buttons}>
              <Button onClick={() => onCancel?.()}>Cancel</Button>
              <Button type="primary" {...saveButtonProps}>
                Save
              </Button>
            </div>
          )}
        </div>

        {state === 'view' && (
          <div className={styles.actions}>
            <Button onClick={onClick} icon={<EditOutlined />} />
          </div>
        )}
      </div>
    </Form>
  );
};
