import { Button, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import { useForm, Create } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_VENUE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { useGlobalStore } from 'providers/context/store';

export const CloneVenue = () => {
  const business = useGlobalStore((state) => state.business);
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'venues', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, onFinish, saveButtonProps } = useForm({
    action: 'clone',
    resource: 'venues',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_VENUE_MUTATION,
    },
    submitOnEnter: true,
  });

  const handleOnFinish = (values: any) => {
    onFinish({
      ...values,
      hasSeats: false,
      businessId: business?.id,
    });
  };

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={16}>
        <Create
          saveButtonProps={saveButtonProps}
          goBack={<Button>←</Button>}
          breadcrumb={false}
          headerProps={{ onBack: goToListPage }}
        >
          <Form
            {...formProps}
            variant="filled"
            layout="vertical"
            onFinish={handleOnFinish}
            requiredMark={requiredOptionalMark}
          >
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Name"
                name="name"
                hasFeedback
                rules={[{ required: true, message: 'Name is required' }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'City is required' }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Space>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Street"
                name="street"
                rules={[{ required: true, message: 'Street is required' }]}
              >
                <Input placeholder="Street" />
              </Form.Item>
              <Form.Item
                label="Building Number"
                name="buildingNumber"
                rules={[
                  { required: true, message: 'Building Number is required' },
                ]}
              >
                <Input placeholder="Building Number" />
              </Form.Item>
            </Space>
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: 'Capacity is required' }]}
            >
              <InputNumber
                min={1}
                addonAfter="seats"
                placeholder="Capacity"
              ></InputNumber>
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
