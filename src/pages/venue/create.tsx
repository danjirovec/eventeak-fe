import './create.index.css';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
} from 'antd';
import { useForm, Create } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_VENUE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import Designer from 'components/seats/designer';
import React, { useRef, useState } from 'react';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { getBusiness } from 'util/get-business';
import { Text } from 'components';

interface ChildComponentData {
  getData: () => object;
}

export const CreateVenue = () => {
  const actionRef = useRef<ChildComponentData | null>(null);
  const [hasSeats, setHasSeats] = useState(true);

  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'venues', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, onFinish, saveButtonProps } = useForm({
    action: 'create',
    resource: 'venues',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      customType: true,
      gqlMutation: CREATE_VENUE_MUTATION,
    },
    submitOnEnter: true,
  });

  const handleOnFinish = (values: any) => {
    const childData = actionRef.current ? actionRef.current.getData() : null;
    onFinish({
      ...values,
      businessId: getBusiness().id,
      data: childData,
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
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Space>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Street"
                name="street"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="Street" />
              </Form.Item>
              <Form.Item
                label="Building Number"
                name="buildingNumber"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="Building Number" />
              </Form.Item>
            </Space>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Capacity"
                name="capacity"
                rules={[{ required: true, message: '' }]}
              >
                <InputNumber
                  min={1}
                  addonAfter="seats"
                  placeholder="Capacity"
                ></InputNumber>
              </Form.Item>
              <Form.Item
                label="Venue Has Seats"
                name="hasSeats"
                initialValue={hasSeats}
                rules={[{ required: true, message: '' }]}
              >
                <Switch
                  unCheckedChildren={<CloseOutlined />}
                  checkedChildren={<CheckOutlined />}
                  onChange={() => setHasSeats(!hasSeats)}
                  value={hasSeats}
                ></Switch>
              </Form.Item>
            </Space>
            {hasSeats ? (
              <React.Fragment>
                <h4
                  style={{
                    fontWeight: 600,
                    lineHeight: 1.4,
                    fontSize: 20,
                    marginBottom: 50,
                  }}
                >
                  Designer
                </h4>
                <Designer ref={actionRef}></Designer>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h4
                  style={{
                    fontWeight: 600,
                    lineHeight: 1.4,
                    fontSize: 20,
                    marginBottom: 25,
                  }}
                >
                  Sections
                </h4>
                <Form.List
                  name="sections"
                  rules={[
                    {
                      validator: async (_, epc) => {
                        if (!epc || epc.length < 1) {
                          return Promise.reject(
                            new Error('You have to add at least one section'),
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex' }}>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <div>
                              <Form.Item
                                name={[name, 'name']}
                                {...restField}
                                rules={[{ required: !hasSeats, message: '' }]}
                                label="Name"
                              >
                                <Input variant="filled" placeholder="Name" />
                              </Form.Item>
                            </div>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <Form.Item
                                name={[name, 'capacity']}
                                {...restField}
                                rules={[{ required: !hasSeats, message: '' }]}
                                label="Capacity"
                              >
                                <InputNumber
                                  placeholder="Capacity"
                                  variant="filled"
                                  style={{ width: 150, marginRight: 5 }}
                                />
                              </Form.Item>
                              <Button
                                danger
                                type="text"
                                style={{ marginTop: 5 }}
                                onClick={() => {
                                  remove(name);
                                }}
                                icon={<DeleteOutlined />}
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div>
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            add();
                          }}
                        >
                          Add section
                        </Button>
                      </div>
                      <Space style={{ marginTop: 10 }}>
                        <Form.ErrorList
                          errors={errors.map((error) => (
                            <Text style={{ color: '#ad001d' }}>{error}</Text>
                          ))}
                        />
                      </Space>
                    </>
                  )}
                </Form.List>
              </React.Fragment>
            )}
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
