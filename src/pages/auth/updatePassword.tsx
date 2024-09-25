import React from 'react';
import {
  UpdatePasswordPageProps,
  UpdatePasswordFormTypes,
  useActiveAuthProvider,
  useUpdatePassword,
} from '@refinedev/core';
import { ThemedTitleV2 } from '@refinedev/antd';
import {
  layoutStyles,
  containerStyles,
  titleStyles,
  headStyles,
  bodyStyles,
} from './styles';
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  LayoutProps,
  CardProps,
  FormProps,
  theme,
} from 'antd';
import { SVGLogo } from 'components/layout/svg-logo';
import { useDocumentTitle } from '@refinedev/react-router-v6';
import { requiredOptionalMark } from 'components/requiredMark';

type UpdatePasswordProps = UpdatePasswordPageProps<
  LayoutProps,
  CardProps,
  FormProps
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<UpdatePasswordFormTypes>();
  const authProvider = useActiveAuthProvider();
  useDocumentTitle('Update Password - Applausio');
  const { mutate: updatePassword, isLoading } =
    useUpdatePassword<UpdatePasswordFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '32px',
          fontSize: '20px',
        }}
      >
        {title ?? (
          <ThemedTitleV2 collapsed={false} text="Applausio" icon={SVGLogo} />
        )}
      </div>
    );

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {'Set New Password'}
    </Typography.Title>
  );

  const CardContent = (
    <Card
      title={CardTitle}
      styles={{ header: headStyles, body: bodyStyles }}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      <Form<UpdatePasswordFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) => updatePassword(values)}
        requiredMark={requiredOptionalMark}
        {...formProps}
      >
        <Form.Item
          name="password"
          label={'New Password'}
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
          style={{ marginBottom: '12px' }}
        >
          <Input type="password" placeholder="●●●●●●●●" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={'Confirm New Password'}
          hasFeedback
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '',
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
          style={{
            marginBottom: 0,
          }}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            block
          >
            {'Update password'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: '16px 0',
          minHeight: '100dvh',
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
