import React, { useState } from 'react';
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
import { Create, useForm, useSelect } from '@refinedev/antd';
import { useGo } from '@refinedev/core';
import { CREATE_TEMPLATE_MUTATION } from 'graphql/mutations';
import { SECTIONS_QUERY, VENUES_QUERY } from 'graphql/queries';
import { SectionsListQuery, VenuesListQuery } from 'graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { requiredOptionalMark } from 'components/requiredMark';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { languageOptions, categoryOptions } from 'enum/enum';
import { getBusiness } from 'util/get-business';
import { uploadCreate } from 'components/upload/util';
import SupaUpload from 'components/upload/supaUpload';
import { Text } from 'components';

export const CreateTemplate = () => {
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const [parent, setParent] = useState(false);
  const go = useGo();
  const { TextArea } = Input;
  const goToListPage = () => {
    go({
      to: { resource: 'event-templates', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { form, formProps, formLoading, onFinish, saveButtonProps } = useForm({
    action: 'create',
    resource: 'event-templates',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      customType: true,
      gqlMutation: CREATE_TEMPLATE_MUTATION,
    },
    submitOnEnter: true,
  });

  const [venueId, setVenueId] = useState(form.getFieldValue('venueId'));

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
          value: venueId,
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
    if (values.eventPriceCategory) {
      values.eventPriceCategory = values.eventPriceCategory.map(
        ({ section, id, ...rest }: any) => ({
          ...rest,
          sectionId: section ? (section.value ? section.value : section) : null,
        }),
      );
    }
    const posterUrl = await uploadCreate('posters', formData);

    onFinish({
      ...values,
      type: values.type ? 'Parent' : 'Child',
      businessId: getBusiness().id,
      posterUrl: posterUrl,
    });
  };

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={16}>
        <Create
          saveButtonProps={{
            ...saveButtonProps,
            loading: formLoading,
          }}
          isLoading={formLoading}
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
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
              <Form.Item
                label="Parent"
                name="type"
                rules={[{ required: true, message: '' }]}
                initialValue={parent}
              >
                <Switch
                  unCheckedChildren={<CloseOutlined />}
                  checkedChildren={<CheckOutlined />}
                  checked={parent}
                  onChange={() => setParent(!parent)}
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
                  onChange={() => setVenueId(form.getFieldValue('venueId'))}
                  placeholder="Venue"
                  {...selectProps}
                  options={queryResult.data?.data.map((venue) => ({
                    value: venue.id,
                    label: venue.name,
                  }))}
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
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Language"
                name="language"
                rules={[{ required: !parent, message: '' }]}
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
              rules={[{ required: !parent, message: '' }]}
            >
              <TextArea placeholder="Description"></TextArea>
            </Form.Item>
            <Form.Item name="posterUrl" label="Poster" hasFeedback>
              <SupaUpload folder="posters" onUpload={handleUpload} />
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
  );
};
