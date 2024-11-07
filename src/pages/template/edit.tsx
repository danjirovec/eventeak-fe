import React, { useEffect, useState } from 'react';
import { Edit, ListButton, useForm, useSelect } from '@refinedev/antd';
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Tooltip,
} from 'antd';
import { UPDATE_TEMPLATE_MUTATION } from 'graphql/mutations';
import {
  DiscountsListQuery,
  PriceCategoryListQuery,
  SectionsListQuery,
  TemplateDiscountsListQuery,
  VenuesListQuery,
} from 'graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import {
  DISCOUNTS_QUERY,
  EVENTS_QUERY,
  PRICE_CATEGORY_QUERY,
  SECTIONS_QUERY,
  TEMPLATE_DISCOUNTS_QUERY,
  VENUES_QUERY,
} from 'graphql/queries';
import { requiredOptionalMark } from 'components/requiredMark';
import { languageOptions, categoryOptions } from 'enum/enum';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useGo, useList } from '@refinedev/core';
import dayjs from 'dayjs';
import { uploadEdit } from 'components/upload/util';
import SupaUpload from 'components/upload/supaUpload';
import { useGlobalStore } from 'providers/context/store';
import { v4 } from 'uuid';

type KeyValueObject = {
  [key: string]: string | Date | number;
};

type SelectedPriceCategory = {
  label: string;
  value: string;
  fields: KeyValueObject;
};

export const EditTemplate = () => {
  const business = useGlobalStore((state) => state.business);
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const [root, setRoot] = useState(false);
  const [edit, setEdit] = useState(true);
  const [selectedPriceCategories, setSelectedPriceCategories] = useState<
    SelectedPriceCategory[]
  >([]);
  const [first, setFirst] = useState(true);
  const { formProps, formLoading, onFinish, form, id, saveButtonProps } =
    useForm({
      action: 'edit',
      redirect: 'list',
      meta: {
        customType: true,
        gqlMutation: UPDATE_TEMPLATE_MUTATION,
      },
    });
  const [venueId, setVenueId] = useState<string>();
  const { TextArea } = Input;
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'templates', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { selectProps: venues, query: venuesQuery } = useSelect<
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
        value: business?.id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  const { selectProps: sections, query: sectionsQuery } = useSelect<
    GetFieldsFromList<SectionsListQuery>
  >({
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
        value: venueId,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    queryOptions: {
      enabled: !!venueId,
    },
  });

  const filteredSections = sections?.options?.filter(
    (o: any) =>
      !selectedPriceCategories.some(
        (price: any) => price.fields.pcSection === o.value,
      ),
  );

  const { selectProps: discounts, query: discountsQuery } = useSelect<
    GetFieldsFromList<DiscountsListQuery>
  >({
    resource: 'discounts',
    optionLabel: 'name',
    optionValue: 'id',
    meta: {
      gqlQuery: DISCOUNTS_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'business.id',
        operator: 'eq',
        value: business?.id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  const { data: events, isFetching: eventsLoading } = useList<
    GetFieldsFromList<TemplateDiscountsListQuery>
  >({
    resource: 'events',
    meta: {
      gqlQuery: EVENTS_QUERY,
    },
    pagination: {
      pageSize: 50,
      mode: 'server',
    },
    filters: [
      {
        field: 'template.id',
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

  const { data: priceCategories, isFetching: pricesLoading } = useList<
    GetFieldsFromList<PriceCategoryListQuery>
  >({
    resource: 'priceCategories',
    meta: {
      gqlQuery: PRICE_CATEGORY_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'template.id',
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

  const { data: templateDiscounts, isFetching: templateDiscountsLoading } =
    useList<GetFieldsFromList<TemplateDiscountsListQuery>>({
      resource: 'templateDiscounts',
      meta: {
        gqlQuery: TEMPLATE_DISCOUNTS_QUERY,
      },
      pagination: {
        pageSize: 20,
        mode: 'server',
      },
      filters: [
        {
          field: 'template.id',
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

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const handleOnFinish = async (values: any) => {
    values.priceCategory = values.priceCategory.map(
      (pc: SelectedPriceCategory) => ({
        id: pc.fields.pcId,
        name: pc.fields.pcName,
        sectionId: pc.fields.pcSection,
        price: pc.fields.pcPrice,
        startDate: pc.fields.pcStart,
        endDate: pc.fields.pcEnd,
        templateId: id,
      }),
    );
    values.id = id;
    values.type = root ? 'Root' : 'Leaf';

    const prev = formProps.initialValues?.posterUrl;
    const posterUrl = await uploadEdit('posters', formData, prev);

    onFinish({
      ...values,
      posterUrl: posterUrl,
    });
  };

  const handleSave = async (values: any) => {
    const validValues = await form
      .validateFields([
        'type',
        'name',
        'category',
        'length',
        'venueId',
        'language',
        'priceCategory',
        'description',
        'discount',
        'subtitles',
        'posterUrl',
      ])
      .catch(() => {
        return;
      });

    if (validValues) {
      await handleOnFinish(validValues);
    }
  };

  useEffect(() => {
    if (!pricesLoading) {
      const updated = priceCategories?.data.map((item: any) => ({
        label: `${item.name} - ${item.price} ${business?.currency}`,
        value: item.id,
        fields: {
          pcId: item.id,
          pcName: item.name,
          pcSection: item.section.id,
          pcPrice: item.price,
          pcStart: item.startDate,
          pcEnd: item.endDate,
        },
      }));
      if (updated) {
        setSelectedPriceCategories(updated);
        form.setFieldsValue({
          priceCategory: updated,
        });
      }
    }
  }, [pricesLoading]);

  useEffect(() => {
    if (!templateDiscountsLoading) {
      const updated = templateDiscounts?.data.map(
        (item: any) => item.discount.id,
      );
      if (updated) {
        form.setFieldsValue({
          discount: updated,
        });
      }
    }
  }, [templateDiscountsLoading]);

  useEffect(() => {
    if (first && formProps?.initialValues) {
      setVenueId(formProps?.initialValues?.venue.id);
      setRoot(formProps.initialValues.type == 'Root' ? true : false);
      setFirst(false);
    }
  }, [formProps?.initialValues]);

  useEffect(() => {
    if (events && events.total > 0) {
      setEdit(false);
    }
  }, [eventsLoading]);

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={16}>
          <Edit
            goBack={<Button>←</Button>}
            isLoading={
              formLoading ||
              templateDiscountsLoading ||
              pricesLoading ||
              venuesQuery.isLoading
            }
            saveButtonProps={{
              ...saveButtonProps,
              onClick: handleSave,
              loading: formLoading,
            }}
            breadcrumb={false}
            headerProps={{ onBack: goToListPage }}
            headerButtons={({ listButtonProps }) => (
              <>{listButtonProps && <ListButton {...listButtonProps} />}</>
            )}
          >
            <Form
              {...formProps}
              layout="vertical"
              requiredMark={requiredOptionalMark}
              onFinish={handleOnFinish}
            >
              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
                <Form.Item
                  label="Root"
                  name="type"
                  rules={[{ required: true, message: '' }]}
                >
                  <Tooltip
                    title={
                      !edit
                        ? "You can't edit Root because Event with this Template already exists"
                        : ''
                    }
                  >
                    <Switch
                      disabled={!edit}
                      checked={root}
                      unCheckedChildren={<CloseOutlined />}
                      checkedChildren={<CheckOutlined />}
                      onClick={() => setRoot(!root)}
                    />
                  </Tooltip>
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
                  <Tooltip
                    title={
                      !edit
                        ? "You can't edit Venue because Event with this Template already exists"
                        : ''
                    }
                  >
                    <Select
                      disabled={!edit}
                      defaultValue={formProps.initialValues?.venue.id}
                      onChange={(value) => {
                        if (!value) {
                          setVenueId(undefined);
                          setSelectedPriceCategories([]);
                          form.setFieldsValue({
                            pcSection: undefined,
                            priceCategory: undefined,
                          });
                        } else {
                          setVenueId(String(value));
                        }
                      }}
                      allowClear={true}
                      placeholder="Venue"
                      {...venues}
                      options={venues.options}
                    />
                  </Tooltip>
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
                  rules={[{ required: !root, message: '' }]}
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
                  rules={[{ required: !root, message: '' }]}
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
                rules={[{ required: !root, message: '' }]}
              >
                <TextArea placeholder="Description"></TextArea>
              </Form.Item>

              <Space
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
              >
                <Form.Item
                  name="priceCategory"
                  label="Price categories"
                  rules={[{ required: true, message: '' }]}
                  initialValue={priceCategories?.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                >
                  <Select
                    mode="multiple"
                    value={selectedPriceCategories}
                    options={selectedPriceCategories.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    onDeselect={(value) => {
                      const updated = selectedPriceCategories.filter(
                        (item) => item.value !== String(value),
                      );
                      setSelectedPriceCategories(updated);
                      form.setFieldsValue({ priceCategory: updated });
                    }}
                    showSearch={false}
                    placeholder="Price categories"
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
                            name="pcName"
                            rules={[{ required: true, message: '' }]}
                          >
                            <Input
                              placeholder="Name"
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </Form.Item>
                          <Form.Item
                            layout="vertical"
                            label="Price"
                            name="pcPrice"
                            rules={[{ required: true, message: '' }]}
                          >
                            <InputNumber
                              min={0}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                              }}
                              placeholder="Price"
                              addonAfter={business?.currency}
                            />
                          </Form.Item>
                          <Form.Item
                            layout="vertical"
                            label="Section"
                            name="pcSection"
                            rules={[{ required: true, message: '' }]}
                          >
                            <Select
                              allowClear={true}
                              placeholder="Section"
                              options={venueId ? filteredSections : []}
                            />
                          </Form.Item>
                          <Form.Item
                            layout="vertical"
                            label="Start Date"
                            name="pcStart"
                          >
                            <div
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                            >
                              <DatePicker
                                onChange={(value) =>
                                  form.setFieldValue('pcStart', value)
                                }
                                showNow={false}
                                format="D. M. YYYY"
                                placeholder="Start Date"
                                allowClear={true}
                                needConfirm={false}
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr',
                                }}
                              />
                            </div>
                          </Form.Item>
                          <Form.Item
                            layout="vertical"
                            label="End Date"
                            name="pcEnd"
                          >
                            <div
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                              }}
                            >
                              <DatePicker
                                onChange={(value) =>
                                  form.setFieldValue('pcEnd', value)
                                }
                                showNow={false}
                                format="D. M. YYYY"
                                placeholder="End Date"
                                allowClear={true}
                                needConfirm={false}
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1fr',
                                }}
                              />
                            </div>
                          </Form.Item>
                          <Button
                            type="dashed"
                            block
                            icon={<PlusOutlined />}
                            onClick={() => {
                              form
                                .validateFields([
                                  'pcName',
                                  'pcPrice',
                                  'pcSection',
                                  'pcStart',
                                  'pcEnd',
                                ])
                                .then(() => {
                                  const id = v4();
                                  const fields = form.getFieldsValue([
                                    'pcName',
                                    'pcSection',
                                    'pcStart',
                                    'pcEnd',
                                    'pcPrice',
                                  ]);
                                  const updated = [
                                    ...selectedPriceCategories,
                                    {
                                      label: form.getFieldValue('pcName'),
                                      value: id,
                                      fields: fields,
                                    },
                                  ];
                                  setSelectedPriceCategories(updated);
                                  form.setFieldsValue({
                                    priceCategory: updated,
                                  });
                                  form.resetFields([
                                    'pcName',
                                    'pcSection',
                                    'pcStart',
                                    'pcEnd',
                                    'pcPrice',
                                  ]);
                                })
                                .catch(() => {
                                  return;
                                });
                            }}
                          >
                            Add category
                          </Button>
                        </Flex>
                      </div>
                    )}
                  />
                </Form.Item>
                <Form.Item name="discount" label="Discounts">
                  <Select
                    labelRender={(item) => {
                      const discount = discountsQuery.data?.data.find(
                        (discount) => discount.id == item.value,
                      );
                      return `${discount?.name} - ${discount?.percentage} %`;
                    }}
                    placement="topLeft"
                    mode="multiple"
                    options={discounts.options}
                    placeholder="Discounts"
                  />
                </Form.Item>
              </Space>
              <Form.Item name="posterUrl" label="Poster" hasFeedback>
                <SupaUpload
                  folder="posters"
                  incomingUrl={formProps.initialValues?.posterUrl}
                  onUpload={handleUpload}
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
