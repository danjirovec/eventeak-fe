import React, { useState } from 'react';
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
} from 'antd';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_TEMPLATE_MUTATION } from 'graphql/mutations';
import { DISCOUNTS_QUERY, SECTIONS_QUERY, VENUES_QUERY } from 'graphql/queries';
import {
  DiscountsListQuery,
  SectionsListQuery,
  VenuesListQuery,
} from 'graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { requiredOptionalMark } from 'components/requiredMark';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { languageOptions, categoryOptions } from 'enum/enum';
import { uploadCreate } from 'components/upload/util';
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

export const CreateTemplate = () => {
  const business = useGlobalStore((state) => state.business);
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const [root, setRoot] = useState(false);
  const [selectedPriceCategories, setSelectedPriceCategories] = useState<
    SelectedPriceCategory[]
  >([]);
  const go = useGo();
  const { TextArea } = Input;
  const goToListPage = () => {
    go({
      to: { resource: 'templates', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { form, formProps, formLoading, onFinish, saveButtonProps } = useForm({
    action: 'create',
    resource: 'templates',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      customType: true,
      gqlMutation: CREATE_TEMPLATE_MUTATION,
    },
    submitOnEnter: true,
  });

  const [venueId, setVenueId] = useState<string>();

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

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const handleOnFinish = async (values: any) => {
    values.priceCategory = values.priceCategory.map(
      (pc: SelectedPriceCategory) => ({
        name: pc.fields.pcName,
        sectionId: pc.fields.pcSection,
        price: pc.fields.pcPrice,
        startDate: pc.fields.pcStart,
        endDate: pc.fields.pcEnd,
      }),
    );
    values.type = root ? 'Root' : 'Leaf';
    const posterUrl = await uploadCreate('posters', formData);

    onFinish({
      ...values,
      businessId: business?.id,
      posterUrl: posterUrl,
    });
  };

  const handleSave = async () => {
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

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={16}>
        <Create
          saveButtonProps={{
            ...saveButtonProps,
            onClick: handleSave,
            loading: formLoading,
          }}
          isLoading={formLoading}
          goBack={<Button>←</Button>}
          breadcrumb={false}
          headerProps={{ onBack: goToListPage }}
        >
          <Form
            {...formProps}
            layout="vertical"
            onFinish={handleOnFinish}
            requiredMark={requiredOptionalMark}
          >
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
              <Form.Item
                label="Root"
                name="type"
                rules={[{ required: true, message: '' }]}
                initialValue={root}
              >
                <Switch
                  unCheckedChildren={<CloseOutlined />}
                  checkedChildren={<CheckOutlined />}
                  checked={root}
                  onChange={() => setRoot(!root)}
                />
              </Form.Item>
            </Space>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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
              >
                <Select
                  allowClear
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
                  placeholder="Venue"
                  {...venues}
                  options={venues.options}
                />
              </Form.Item>
            </Space>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: '' }]}
              >
                <Select placeholder="Category" options={categoryOptions} />
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
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Language"
                name="language"
                rules={[{ required: !root, message: '' }]}
              >
                <Select placeholder="Language" options={languageOptions} />
              </Form.Item>
              <Form.Item label="Subtitles" name="subtitles">
                <Select placeholder="Subtitles" options={languageOptions} />
              </Form.Item>
            </Space>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: !root, message: '' }]}
            >
              <TextArea placeholder="Description"></TextArea>
            </Form.Item>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                name="priceCategory"
                label="Price categories"
                rules={[{ required: true, message: '' }]}
              >
                <Select
                  mode="multiple"
                  value={selectedPriceCategories}
                  options={selectedPriceCategories.map((item) => ({
                    value: item,
                    label: `${item.fields.pcName} - ${item.fields.pcPrice} ${business?.currency}`,
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
                                    label: `${form.getFieldValue('pcName')} - ${form.getFieldValue('pcPrice')} ${business?.currency}`,
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
                  placement="topLeft"
                  mode="multiple"
                  labelRender={(item) => {
                    const discount = discountsQuery.data?.data.find(
                      (discount) => discount.id == item.value,
                    );
                    return `${discount?.name} - ${discount?.percentage} %`;
                  }}
                  options={discounts.options}
                  placeholder="Discounts"
                />
              </Form.Item>
            </Space>
            <Form.Item name="posterUrl" label="Poster" hasFeedback>
              <SupaUpload folder="posters" onUpload={handleUpload} />
            </Form.Item>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
