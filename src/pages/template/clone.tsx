import React, { useEffect, useState } from 'react';
import { Create, useForm, useSelect } from '@refinedev/antd';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
} from 'antd';
import { CREATE_TEMPLATE_MUTATION } from 'graphql/mutations';
import {
  EventPriceCategoryListQuery,
  SectionsListQuery,
  VenuesListQuery,
} from 'graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import {
  EVENT_PRICE_CATEGORY_QUERY,
  SECTIONS_QUERY,
  VENUES_QUERY,
} from 'graphql/queries';
import { requiredOptionalMark } from 'components/requiredMark';
import { languageOptions, categoryOptions } from 'enum/enum';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useList } from '@refinedev/core';
import dayjs from 'dayjs';
import { getBusiness } from 'util/get-business';
import { uploadClone } from 'components/upload/util';
import SupaUpload from 'components/upload/supaUpload';
import { Text } from 'components';

export const CloneTemplate = () => {
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const [parent, setParent] = useState(false);
  const { formProps, formLoading, onFinish, form, saveButtonProps, id } =
    useForm({
      action: 'clone',
      resource: 'event-templates',
      submitOnEnter: true,
      redirect: 'list',
      mutationMode: 'pessimistic',
      meta: {
        customType: true,
        gqlMutation: CREATE_TEMPLATE_MUTATION,
      },
    });

  const [venueId, setVenueId] = useState(formProps.initialValues?.venue.id);
  const { TextArea } = Input;

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<VenuesListQuery>
  >({
    resource: 'venues',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: VENUES_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'business.id',
        operator: 'eq',
        value: getBusiness().id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  const { selectProps: sectionsSelectProps, queryResult: sectionsQueryResult } =
    useSelect<GetFieldsFromList<SectionsListQuery>>({
      resource: 'sections',
      optionLabel: 'name',
      optionValue: 'id',
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
          value: venueId ? venueId : formProps.initialValues?.venue.id,
        },
      ],
      sorters: [
        {
          field: 'created',
          order: 'desc',
        },
      ],
    });

  const { data } = useList<GetFieldsFromList<EventPriceCategoryListQuery>>({
    resource: 'eventPriceCategories',
    meta: {
      gqlQuery: EVENT_PRICE_CATEGORY_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'eventTemplate.id',
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
  });

  useEffect(() => {
    setParent(formProps.initialValues?.type == 'Parent' ? true : false);
    form.setFieldValue(
      'type',
      formProps.initialValues?.type == 'Parent' ? true : false,
    );
    if (data?.data) {
      const updatedData = data.data.map((item) => ({
        ...item,
        section: item.section
          ? { value: item.section.id, name: item.section.name }
          : null,
      }));
      form.setFieldsValue({
        eventPriceCategory: updatedData,
      });
    }
  }, [data, formProps.initialValues, form]);

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const handleOnFinish = async (values: any) => {
    values.eventPriceCategory = values.eventPriceCategory.map(
      ({ section, id, ...rest }: any) => ({
        ...rest,
        sectionId: section ? (section.value ? section.value : section) : null,
      }),
    );
    const prev = formProps.initialValues?.posterUrl;
    const posterUrl = await uploadClone('posters', formData, prev);

    onFinish({
      ...values,
      type: values.type ? 'Parent' : 'Child',
      businessId: getBusiness().id,
      posterUrl: posterUrl,
    });
  };

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={16}>
          <Create
            title="Clone Template"
            goBack={<Button>←</Button>}
            isLoading={formLoading}
            saveButtonProps={{
              ...saveButtonProps,
              loading: formLoading,
            }}
            breadcrumb={false}
          >
            <Form
              {...formProps}
              variant="filled"
              layout="vertical"
              requiredMark={requiredOptionalMark}
              onFinish={handleOnFinish}
            >
              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
                <Form.Item
                  label="Parent"
                  name="type"
                  rules={[{ required: true, message: '' }]}
                >
                  <Switch
                    checked={parent}
                    unCheckedChildren={<CloseOutlined />}
                    checkedChildren={<CheckOutlined />}
                    onClick={() => setParent(!parent)}
                  />
                </Form.Item>
              </Space>
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
                  label="Venue"
                  name="venueId"
                  rules={[{ required: true, message: '' }]}
                  initialValue={formProps.initialValues?.venue.id}
                >
                  <Select
                    onChange={() => setVenueId(form.getFieldValue('venueId'))}
                    allowClear={true}
                    placeholder="Venue"
                    {...selectProps}
                    options={queryResult.data?.data.map((venue) => ({
                      value: venue.id,
                      label: venue.name,
                    }))}
                  />
                </Form.Item>
              </Space>
              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: '' }]}
                >
                  <Select
                    allowClear={true}
                    placeholder="Category"
                    options={categoryOptions}
                  />
                </Form.Item>
                <Form.Item
                  label="Length"
                  name="length"
                  rules={[{ required: !parent, message: '' }]}
                >
                  <InputNumber
                    min={0}
                    style={{ display: 'grid', gridTemplateColumns: '1fr' }}
                    placeholder="Length"
                    addonAfter="minutes"
                  />
                </Form.Item>
              </Space>
              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
                <Form.Item
                  label="Language"
                  name="language"
                  rules={[{ required: !parent, message: '' }]}
                >
                  <Select
                    allowClear={true}
                    placeholder="Language"
                    options={languageOptions}
                  />
                </Form.Item>
                <Form.Item label="Subtitles" name="subtitles">
                  <Select
                    allowClear={true}
                    placeholder="Subtitles"
                    options={languageOptions}
                  />
                </Form.Item>
              </Space>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: !parent, message: '' }]}
              >
                <TextArea placeholder="Description"></TextArea>
              </Form.Item>
              <Form.Item name="posterUrl" label="Poster" hasFeedback>
                <SupaUpload
                  folder="posters"
                  incomingUrl={formProps.initialValues?.posterUrl}
                  onUpload={handleUpload}
                />
              </Form.Item>

              <h4 style={{ fontWeight: 600, lineHeight: 1.4, fontSize: 20 }}>
                Price Categories
              </h4>

              <Form.List
                name="eventPriceCategory"
                rules={[
                  {
                    validator: async (_, epc) => {
                      if (!epc || epc.length < 1) {
                        return Promise.reject(
                          new Error(
                            'You have to add at least one price category',
                          ),
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        align="baseline"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr',
                        }}
                      >
                        <Space
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            alignItems: 'center',
                          }}
                        >
                          <Form.Item
                            label="Name"
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: '' }]}
                          >
                            <Input placeholder="Name" />
                          </Form.Item>
                          <Button
                            danger
                            type="text"
                            onClick={() => {
                              remove(name);
                            }}
                            style={{ marginTop: 5 }}
                            icon={<DeleteOutlined />}
                          />
                          <Form.Item
                            label="Price"
                            {...restField}
                            name={[name, 'price']}
                            rules={[{ required: true, message: '' }]}
                          >
                            <InputNumber
                              min={0}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                              }}
                              placeholder="Price"
                              addonAfter="Kč"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'section']}
                            label="Section"
                            rules={[{ required: true, message: '' }]}
                          >
                            <Select
                              allowClear={true}
                              placeholder="Section"
                              {...sectionsSelectProps}
                              options={sectionsQueryResult.data?.data.map(
                                (section) => ({
                                  value: section.id,
                                  label: section.name,
                                }),
                              )}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'startDate']}
                            label="Start Date"
                            getValueProps={(value) => ({
                              value: value ? dayjs(value) : '',
                            })}
                          >
                            <DatePicker
                              format="D. M. YYYY"
                              placeholder="Start Date"
                              allowClear={true}
                              needConfirm={false}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'endDate']}
                            label="End Date"
                            getValueProps={(value) => ({
                              value: value ? dayjs(value) : '',
                            })}
                          >
                            <DatePicker
                              format="D. M. YYYY"
                              placeholder="End Date"
                              allowClear={true}
                              needConfirm={false}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                              }}
                            />
                          </Form.Item>
                        </Space>
                        <Divider
                          style={{ marginTop: 1 }}
                          children={<EllipsisOutlined />}
                        ></Divider>
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Price Category
                      </Button>
                    </Form.Item>
                    <Form.ErrorList
                      errors={errors.map((error) => (
                        <Text style={{ color: '#ad001d' }}>{error}</Text>
                      ))}
                    />
                  </>
                )}
              </Form.List>
            </Form>
          </Create>
        </Col>
      </Row>
    </div>
  );
};
