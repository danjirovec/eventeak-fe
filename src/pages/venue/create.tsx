import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  notification,
} from 'antd';
import { useForm, Create } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_VENUE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import Designer from 'components/seats/designer';
import React, { useRef, useState } from 'react';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useGlobalStore } from 'providers/context/store';
import { v4 } from 'uuid';

interface SeatMapData {
  getData: () => any;
}

type KeyValueObject = {
  [key: string]: string | Date | number;
};

type SelectedSection = {
  label: string;
  value: string;
  fields: KeyValueObject;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const CreateVenue = () => {
  const [api, contextHolder] = notification.useNotification();
  const business = useGlobalStore((state) => state.business);
  const actionRef = useRef<SeatMapData | null>(null);
  const [hasSeats, setHasSeats] = useState(true);
  const [selectedSections, setSelectedSections] = useState<SelectedSection[]>(
    [],
  );

  const capacity = (type: NotificationType) => {
    api[type]({
      message: 'Entered capacity does not equal actual capacity',
    });
  };

  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'venues', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, formLoading, onFinish, saveButtonProps, form } = useForm({
    action: 'create',
    resource: 'venues',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      customType: true,
      gqlMutation: CREATE_VENUE_MUTATION,
    },
    submitOnEnter: true,
  });

  const handleOnFinish = (values: any) => {
    const seatMapData = actionRef.current ? actionRef.current.getData() : null;
    let mapCapacity = 0;
    if (hasSeats) {
      for (const key in seatMapData.groups) {
        mapCapacity = mapCapacity + seatMapData.groups[key].numberOfSeats;
      }
      if (values.capacity !== mapCapacity) {
        capacity('error');
        return;
      }
    }
    if (!hasSeats) {
      values.sections = values.sections.map((item: SelectedSection) => {
        mapCapacity = mapCapacity + (item.fields.sectionCapacity as number);
        return {
          name: item.fields.sectionName,
          capacity: item.fields.sectionCapacity,
        };
      });
      if (values.capacity !== mapCapacity) {
        capacity('error');
        return;
      }
    }
    onFinish({
      ...values,
      businessId: business?.id,
      seatMap: seatMapData,
    });
  };

  const handleSave = async () => {
    const fields = [
      'hasSeats',
      'name',
      'city',
      'street',
      'buildingNumber',
      'capacity',
    ];
    if (!hasSeats) fields.push('sections');
    const validValues = await form.validateFields(fields).catch(() => {
      return;
    });

    if (validValues) {
      handleOnFinish(validValues);
    }
  };

  return (
    <React.Fragment>
      {contextHolder}
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={16}>
          <Create
            isLoading={formLoading}
            saveButtonProps={{
              ...saveButtonProps,
              onClick: handleSave,
              loading: formLoading,
            }}
            goBack={<Button>←</Button>}
            breadcrumb={false}
            headerProps={{ onBack: goToListPage }}
          >
            <Form
              {...formProps}
              form={form}
              layout="vertical"
              onFinish={handleOnFinish}
              requiredMark={requiredOptionalMark}
              style={{
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              <Form.Item
                label="Seats"
                name="hasSeats"
                initialValue={hasSeats}
                rules={[{ required: true, message: '' }]}
              >
                <Switch
                  unCheckedChildren={<CloseOutlined />}
                  checkedChildren={<CheckOutlined />}
                  onChange={() => {
                    setSelectedSections([]);
                    form.setFieldsValue({
                      sections: undefined,
                    });
                    setHasSeats(!hasSeats);
                  }}
                  value={hasSeats}
                ></Switch>
              </Form.Item>
              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
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
              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
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
              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
                <Form.Item
                  style={{ width: '100%' }}
                  label="Capacity"
                  name="capacity"
                  rules={[{ required: true, message: '' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    addonAfter="people"
                    placeholder="Capacity"
                  ></InputNumber>
                </Form.Item>
                {!hasSeats && (
                  <React.Fragment>
                    <Space
                      style={{ display: 'grid', gridTemplateColumns: '1fr' }}
                    >
                      <Form.Item
                        name="sections"
                        label="Sections"
                        rules={[{ required: true, message: '' }]}
                      >
                        <Select
                          mode="multiple"
                          value={selectedSections}
                          options={selectedSections.map((item) => ({
                            value: item,
                            label: item.fields.name,
                          }))}
                          onDeselect={(value) => {
                            const updated = selectedSections.filter(
                              (item) => item.value !== String(value),
                            );
                            setSelectedSections(updated);
                            form.setFieldsValue({ priceCategory: updated });
                          }}
                          showSearch={false}
                          placeholder="Sections"
                          dropdownRender={() => (
                            <div
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Flex vertical style={{ padding: 24 }}>
                                <Form.Item
                                  layout="vertical"
                                  label="Name"
                                  name="sectionName"
                                  rules={[{ required: true, message: '' }]}
                                >
                                  <Input
                                    placeholder="Name"
                                    onKeyDown={(e) => e.stopPropagation()}
                                  />
                                </Form.Item>
                                <Form.Item
                                  layout="vertical"
                                  label="Capacity"
                                  name="sectionCapacity"
                                  rules={[{ required: true, message: '' }]}
                                >
                                  <InputNumber
                                    min={0}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '1fr',
                                    }}
                                    placeholder="Capacity"
                                    addonAfter="people"
                                  />
                                </Form.Item>
                                <Button
                                  type="dashed"
                                  block
                                  icon={<PlusOutlined />}
                                  onClick={() => {
                                    form
                                      .validateFields([
                                        'sectionName',
                                        'sectionCapacity',
                                      ])
                                      .then(() => {
                                        const id = v4();
                                        const fields = form.getFieldsValue([
                                          'sectionName',
                                          'sectionCapacity',
                                        ]);
                                        const updated = [
                                          ...selectedSections,
                                          {
                                            label:
                                              form.getFieldValue('sectionName'),
                                            value: id,
                                            fields: fields,
                                          },
                                        ];
                                        setSelectedSections(updated);
                                        form.setFieldsValue({
                                          sections: updated,
                                        });
                                        form.resetFields([
                                          'sectionName',
                                          'sectionCapacity',
                                        ]);
                                      })
                                      .catch(() => {
                                        return;
                                      });
                                  }}
                                >
                                  Add section
                                </Button>
                              </Flex>
                            </div>
                          )}
                        />
                      </Form.Item>
                    </Space>
                  </React.Fragment>
                )}
              </Space>
              {hasSeats && (
                <React.Fragment>
                  <h4
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.4,
                      fontSize: 20,
                      marginBottom: 24,
                    }}
                  >
                    Venue Designer
                  </h4>
                  <Designer ref={actionRef} />
                </React.Fragment>
              )}
            </Form>
          </Create>
        </Col>
      </Row>
    </React.Fragment>
  );
};
