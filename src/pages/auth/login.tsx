import React, { useState } from 'react';
import {
  LoginPageProps,
  LoginFormTypes,
  useLink,
  useRouterType,
  useActiveAuthProvider,
  useLogin,
  useRouterContext,
} from '@refinedev/core';
import {
  bodyStyles,
  containerStyles,
  headStyles,
  layoutStyles,
  titleStyles,
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
  CardProps,
  LayoutProps,
  Divider,
  FormProps,
  theme,
  Flex,
} from 'antd';
import { useDocumentTitle } from '@refinedev/react-router-v6';
import { requiredOptionalMark } from 'components/requiredMark';
import logo from 'assets/eventeak.png';

const { Text, Title } = Typography;
const { useToken } = theme;

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { token } = useToken();
  const [form] = Form.useForm<LoginFormTypes>();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  useDocumentTitle('Login - Eventeak');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
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
      {'Sign in to your account'}
    </Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '8px',
                }}
                onClick={() =>
                  login({
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          {!hideForm && (
            <Divider>
              <Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {'or'}
              </Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

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
      {renderProviders()}
      {!hideForm && (
        <Form<LoginFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => login(values)}
          requiredMark={requiredOptionalMark}
          {...formProps}
        >
          <Form.Item
            name="email"
            label={'Email'}
            rules={[
              { required: true, message: '' },
              {
                type: 'email',
                message: '',
              },
            ]}
          >
            <Input placeholder={'Email'} />
          </Form.Item>
          <Form.Item
            name="password"
            label={'Password'}
            rules={[{ required: true, message: '' }]}
          >
            <Input.Password
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            {forgotPasswordLink ?? (
              <ActiveLink
                style={{
                  color: token.colorPrimaryTextHover,
                  fontSize: '12px',
                  marginLeft: 'auto',
                }}
                to="/forgot-password"
              >
                {'Forgot password?'}
              </ActiveLink>
            )}
          </div>
          {!hideForm && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                size="large"
              >
                {'Sign in'}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}

      {registerLink ?? (
        <div
          style={{
            marginTop: hideForm ? 16 : 8,
          }}
        >
          <Text style={{ fontSize: 12 }}>
            {'Don’t have an account?'}{' '}
            <ActiveLink
              to="/register"
              style={{
                fontWeight: 'bold',
                color: token.colorPrimaryTextHover,
              }}
            >
              {'Sign up'}
            </ActiveLink>
          </Text>
        </div>
      )}
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align={hideForm ? 'top' : 'middle'}
        style={{
          padding: '16px 0',
          minHeight: '100dvh',
          paddingTop: hideForm ? '15dvh' : '16px',
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
          <Flex style={{ marginTop: 10 }} justify="center">
            <Text>
              <ActiveLink
                to="/conditions"
                style={{
                  fontWeight: '400',
                  color: 'grey',
                }}
              >
                {' Privacy Policy'}
              </ActiveLink>
            </Text>
          </Flex>
        </Col>
      </Row>
    </Layout>
  );
};
