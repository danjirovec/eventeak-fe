import React, { useState } from 'react';
import {
  RegisterPageProps,
  RegisterFormTypes,
  useRouterType,
  useLink,
  useActiveAuthProvider,
  useRouterContext,
  useRegister,
} from '@refinedev/core';
import { ThemedTitleV2, useStepsForm } from '@refinedev/antd';
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
  Divider,
  theme,
  DatePicker,
  Steps,
} from 'antd';
import { SVGLogo } from 'components/layout/svg-logo';
import { useDocumentTitle } from '@refinedev/react-router-v6';
import { requiredOptionalMark } from 'components/requiredMark';

const { Text, Title } = Typography;
const { useToken } = theme;

type RegisterProps = RegisterPageProps<LayoutProps, CardProps, FormProps>;

export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  title,
  hideForm,
}) => {
  const { token } = useToken();
  const { current, gotoStep, stepsProps, form, formProps } =
    useStepsForm<RegisterFormTypes>();
  const { Step } = Steps;
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  useDocumentTitle('Register - Applausio');
  const [user, setUser] = useState({});

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister<RegisterFormTypes>({
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
    <Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {'Sign up for your account'}
    </Title>
  );

  const handleOnFinish = (values: any) => {
    const dataToSubmit = {
      ...user,
      ...values,
      role: 0, // Admin
    };
    register(dataToSubmit);
  };

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
                  register({
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

  const formList = [
    <>
      <Form.Item
        label="First Name"
        name="firstName"
        hasFeedback
        style={{ width: '100%' }}
        rules={[
          { required: true, message: '' },
          { whitespace: true, message: '' },
          {
            pattern: /^(?=.*?[A-Za-z])/,
            message: '',
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        hasFeedback
        rules={[
          { required: true, message: '' },
          { whitespace: true, message: '' },
          {
            pattern: /^(?=.*?[A-Za-z])/,
            message: '',
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        label="Place of Residence"
        name="placeOfResidence"
        hasFeedback
        rules={[
          { whitespace: true, message: '' },
          {
            pattern: /^(?=.*?[A-Za-z])/,
            message: '',
          },
        ]}
      >
        <Input placeholder="Place of Residence" />
      </Form.Item>
      <Form.Item
        label="Birth Date"
        name="birthDate"
        hasFeedback
        style={{ display: 'grid', gridTemplateColumns: '1fr' }}
        rules={[
          { required: true, message: '' },
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
    </>,
    <>
      <Form.Item
        name="email"
        label="Email"
        hasFeedback
        rules={[
          { required: true, message: '' },
          {
            type: 'email',
            message: 'Invalid email address',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        validateTrigger={['onChange', 'onBlur']}
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
        <Input type="password" placeholder="●●●●●●●●" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        hasFeedback
        dependencies={['password']}
        rules={[
          { required: true, message: '' },
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
    </>,
  ];

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
        <>
          <Steps {...stepsProps} style={{ marginBottom: '30px' }}>
            <Step title="Personal" />
            <Step title="Credentials" />
          </Steps>
          <Form
            {...formProps}
            layout="vertical"
            onFinish={handleOnFinish}
            requiredMark={requiredOptionalMark}
          >
            {formList[current]}
          </Form>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <div>
              {current > 0 && (
                <Button
                  onClick={() => {
                    gotoStep(current - 1);
                  }}
                >
                  Previous
                </Button>
              )}
              {current < formList.length - 1 && (
                <Button
                  onClick={() => {
                    setUser(form.getFieldsValue());
                    gotoStep(current + 1);
                  }}
                >
                  Next
                </Button>
              )}
            </div>
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
          </div>
          {current === formList.length - 1 && (
            <Button
              onClick={() => {
                form.submit();
              }}
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              block
            >
              {'Sign up'}
            </Button>
          )}
        </>
      )}
      {hideForm && loginLink !== false && (
        <div
          style={{
            marginTop: hideForm ? 16 : 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
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
        </Col>
      </Row>
    </Layout>
  );
};
