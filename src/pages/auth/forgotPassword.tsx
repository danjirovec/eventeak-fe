import React from 'react';
import {
  ForgotPasswordPageProps,
  ForgotPasswordFormTypes,
  useRouterType,
  useLink,
  useRouterContext,
  useForgotPassword,
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
import { useDocumentTitle } from '@refinedev/react-router-v6';
import { requiredOptionalMark } from 'components/requiredMark';
import logo from 'assets/eventeak.png';

type ResetPassworProps = ForgotPasswordPageProps<
  LayoutProps,
  CardProps,
  FormProps
>;

const { Text, Title } = Typography;
const { useToken } = theme;

export const ForgotPasswordPage: React.FC<ResetPassworProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
}) => {
  const { token } = useToken();
  const [form] = Form.useForm<ForgotPasswordFormTypes>();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  useDocumentTitle('Forgot Password - Eventeak');

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const { mutate: forgotPassword, isLoading } =
    useForgotPassword<ForgotPasswordFormTypes>();

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
          <ActiveLink to="/">
            <img src={logo} />
          </ActiveLink>
        )}
      </div>
    );

  const CardTitle = (
    <Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {'Forgot your password?'}
    </Title>
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
      <Form<ForgotPasswordFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) => forgotPassword(values)}
        requiredMark={requiredOptionalMark}
        {...formProps}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: '' },
            {
              type: 'email',
              message: '',
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {loginLink ?? (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 'auto',
              }}
            >
              {'Have an account?'}{' '}
              <ActiveLink
                style={{
                  fontWeight: 'bold',
                  color: token.colorPrimaryTextHover,
                }}
                to="/login"
              >
                {'Sign in'}
              </ActiveLink>
            </Text>
          )}
        </div>
        <Form.Item
          style={{
            marginTop: '24px',
            marginBottom: 0,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
            size="large"
          >
            {'Reset password'}
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
