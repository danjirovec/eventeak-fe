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
  Tooltip,
} from 'antd';
import { useForm, Edit, ListButton } from '@refinedev/antd';
import { useGo, useList } from '@refinedev/core';
import { UPDATE_VENUE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { v4 } from 'uuid';
import { PRICE_CATEGORY_QUERY, SECTIONS_QUERY } from 'graphql/queries';
import { PriceCategoryListQuery, SectionsListQuery } from 'graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';

type KeyValueObject = {
  [key: string]: string | Date | number;
};

type SelectedSection = {
  label: string;
  value: string;
  fields: KeyValueObject;
};

export const EditVenue = () => {
  const [hasSeats, setHasSeats] = useState(true);
  const [edit, setEdit] = useState(true);
  const [selectedSections, setSelectedSections] = useState<SelectedSection[]>(
    [],
  );

  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'venues', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, formLoading, onFinish, saveButtonProps, form, id } =
    useForm({
      action: 'edit',
      resource: 'venues',
      redirect: 'list',
      mutationMode: 'pessimistic',
      meta: {
        customType: true,
        gqlMutation: UPDATE_VENUE_MUTATION,
      },
      submitOnEnter: true,
    });

  const { data: sections, isFetching: sectionsLoading } = useList<
    GetFieldsFromList<SectionsListQuery>
  >({
    resource: 'sections',
    meta: {
      gqlQuery: SECTIONS_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'venue.id',
        operator: 'eq',
        value: id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    queryOptions: {
      cacheTime: 0,
    },
  });

  const { data: priceCategories, isFetching: pricesLoading } = useList<
    GetFieldsFromList<PriceCategoryListQuery>
  >({
    resource: 'priceCategories',
    meta: {
      gqlQuery: PRICE_CATEGORY_QUERY,
    },
    pagination: {
      pageSize: 50,
      mode: 'server',
    },
    filters: [
      {
        field: 'section.id',
        operator: 'in',
        value: sections?.data.map((item: any) => {
          return item.id;
        }),
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    queryOptions: {
      enabled: !!sections,
    },
  });

  const handleOnFinish = (values: any) => {
    if (!hasSeats) {
      values.sections = values.sections.map((item: SelectedSection) => ({
        name: item.fields.sectionName,
        capacity: item.fields.sectionCapacity,
        id: item.fields.sectionId,
        venueId: id,
      }));
    }
    values.id = id;

    onFinish({
      ...values,
    });
  };

  const handleSave = async () => {
    const fields = ['name', 'city', 'street', 'buildingNumber', 'capacity'];
    if (!hasSeats) fields.push('sections');
    const validValues = await form.validateFields(fields).catch(() => {
      return;
    });

    if (validValues) {
      handleOnFinish(validValues);
    }
  };

  useEffect(() => {
    if (!sectionsLoading) {
      const updated = sections?.data.map((item: any) => ({
        label: item.name,
        value: item.id,
        fields: {
          sectionName: item.name,
          sectionCapacity: item.capacity,
          sectionId: item.id,
        },
      }));
      if (updated) {
        setSelectedSections(updated);
        form.setFieldsValue({
          sections: updated,
        });
      }
    }
  }, [sectionsLoading]);

  useEffect(() => {
    if (formProps?.initialValues) {
      setHasSeats(formProps?.initialValues?.hasSeats);
    }
  }, [formProps?.initialValues]);

  useEffect(() => {
    if (priceCategories && priceCategories.total > 0) {
      setEdit(false);
    }
  }, [pricesLoading]);

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={16}>
        <Edit
          isLoading={formLoading}
          saveButtonProps={{
            ...saveButtonProps,
            onClick: handleSave,
            loading: formLoading,
          }}
          goBack={<Button>←</Button>}
          breadcrumb={false}
          headerProps={{ onBack: goToListPage }}
          headerButtons={({ listButtonProps }) => (
            <>{listButtonProps && <ListButton {...listButtonProps} />}</>
          )}
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
                      <Tooltip
                        title={
                          !edit
                            ? "You can't edit Sections because Price Categories with these Sections already exist"
                            : ''
                        }
                      >
                        <Select
                          disabled={!edit}
                          mode="multiple"
                          value={selectedSections}
                          options={selectedSections.map((item) => ({
                            value: item.value,
                            label: item.label,
                          }))}
                          onDeselect={(value) => {
                            const updated = selectedSections.filter(
                              (item) => item.value !== String(value),
                            );
                            setSelectedSections(updated);
                            form.setFieldsValue({ sections: updated });
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
                      </Tooltip>
                    </Form.Item>
                  </Space>
                </React.Fragment>
              )}
            </Space>
          </Form>
        </Edit>
      </Col>
    </Row>
  );
};
