import React, { useEffect, useState } from 'react';
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
} from 'antd';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { useGo, useList } from '@refinedev/core';
import { CREATE_EVENT_MUTATION } from 'graphql/mutations';
import {
  EVENT_PRICE_CATEGORY_QUERY,
  TEMPLATES_QUERY,
  VENUES_QUERY,
} from 'graphql/queries';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import {
  EventPriceCategoryListQuery,
  TemplatesListQuery,
  VenuesListQuery,
} from 'graphql/types';
import { requiredOptionalMark } from 'components/requiredMark';
import { languageOptions, categoryOptions } from 'enum/enum';
import { EllipsisOutlined, StopOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getBusiness } from 'util/get-business';
import SupaUpload from 'components/upload/supaUpload';
import { uploadClone } from 'components/upload/util';

export const CloneEvent = () => {
  const [formData, setFormData] = useState<FormData | null>(new FormData());
  const [editDisabled, setEditDisabled] = useState(false);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const go = useGo();
  const { TextArea } = Input;
  const goToListPage = () => {
    go({
      to: { resource: 'events', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, onFinish, form, formLoading, saveButtonProps } = useForm({
    action: 'clone',
    resource: 'events',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      customType: true,
      gqlMutation: CREATE_EVENT_MUTATION,
    },
    submitOnEnter: true,
  });

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

  const { selectProps: templateSelectProps, queryResult: templateQueryResult } =
    useSelect<GetFieldsFromList<TemplatesListQuery>>({
      resource: 'event-templates',
      optionLabel: 'name',
      optionValue: 'id',
      meta: {
        gqlQuery: TEMPLATES_QUERY,
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
        {
          field: 'type',
          operator: 'eq',
          value: 'Child',
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
        value: templateId
          ? templateId
          : formProps.initialValues?.eventTemplate.id,
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
    if (data?.data) {
      const updatedData = data.data.map((item: any) => ({
        ...item,
        section: item.section
          ? { value: item.section.id, name: item.section.name }
          : null,
      }));
      form.setFieldsValue({
        eventPriceCategory: updatedData,
      });
    }
  }, [data, templateId, form]);

  const handleUpload = (formData: FormData | null) => {
    setFormData(formData);
  };

  const handleOnFinish = async (values: any) => {
    const prev = formProps.initialValues?.posterUrl;
    const posterUrl = await uploadClone('posters', formData, prev);

    onFinish({
      ...values,
      businessId: getBusiness().id,
      posterUrl: posterUrl,
    });
  };

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={16}>
        <Create
          title="Clone Event"
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
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Template"
                name="eventTemplateId"
                rules={[{ required: true, message: '' }]}
                initialValue={formProps.initialValues?.eventTemplate.id}
              >
                <Select
                  allowClear={true}
                  placeholder="Template"
                  {...templateSelectProps}
                  options={templateQueryResult.data?.data.map((template) => ({
                    value: template.id,
                    label: template.name,
                  }))}
                  onSelect={() => setEditDisabled(false)}
                  onClear={() => {
                    const nullFields = Object.keys(
                      form.getFieldsValue(),
                    ).reduce(
                      (acc, key) => {
                        (acc as any)[key] = null;
                        return acc;
                      },
                      {} as { [key: string]: any },
                    );

                    form.setFieldsValue(nullFields);
                    setEditDisabled(true);
                  }}
                  onChange={() => {
                    const id = form.getFieldValue('eventTemplateId');
                    setTemplateId(id);
                    const template = templateQueryResult.data?.data.filter(
                      (template) => template.id == id,
                    )[0];
                    form.setFieldsValue({ ...template });
                    form.setFieldValue(
                      'venueId',
                      template ? template.venue.id : null,
                    );
                  }}
                />
              </Form.Item>
            </Space>
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: '' }]}
              >
                <Input disabled={editDisabled} placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="Venue"
                name="venueId"
                rules={[{ required: true, message: '' }]}
                initialValue={formProps.initialValues?.venue.id}
              >
                <Select
                  allowClear={true}
                  disabled={editDisabled}
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
                <Select
                  allowClear={true}
                  placeholder="Category"
                  options={categoryOptions}
                  disabled={editDisabled}
                />
              </Form.Item>
              <Form.Item
                label="Length"
                name="length"
                rules={[{ required: true, message: '' }]}
              >
                <InputNumber
                  disabled={editDisabled}
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
                rules={[{ required: true, message: '' }]}
              >
                <Select
                  allowClear={true}
                  placeholder="Language"
                  options={languageOptions}
                  disabled={editDisabled}
                />
              </Form.Item>
              <Form.Item label="Subtitles" name="subtitles">
                <Select
                  allowClear={true}
                  placeholder="Subtitles"
                  options={languageOptions}
                  disabled={editDisabled}
                />
              </Form.Item>
            </Space>

            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Date - Time"
                name="date"
                rules={[{ required: true, message: '' }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : '',
                })}
              >
                <DatePicker
                  disabled={editDisabled}
                  showTime
                  showNow={false}
                  format="D. M. YYYY - H:mm"
                  placeholder="Date - Time"
                  allowClear={true}
                  needConfirm={false}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                  }}
                />
              </Form.Item>
            </Space>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: '' }]}
            >
              <TextArea
                placeholder="Description"
                disabled={editDisabled}
              ></TextArea>
            </Form.Item>
            <Form.Item name="posterUrl" label="Poster">
              <SupaUpload
                disabled={editDisabled}
                folder="posters"
                incomingUrl={formProps.initialValues?.posterUrl}
                onUpload={handleUpload}
              />
            </Form.Item>
          </Form>
          <h4 style={{ fontWeight: 600, lineHeight: 1.4, fontSize: 20 }}>
            Price Categories
          </h4>
          {!editDisabled ? (
            data?.data.map((item, index) => (
              <React.Fragment key={index}>
                <Space
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <p style={{ marginBottom: 8 }}>Name</p>
                    <Input
                      variant="filled"
                      value={item.name}
                      placeholder="Name"
                    />
                  </div>
                  <div></div>
                </Space>
                <Space
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <p style={{ marginBottom: 8 }}>Price</p>
                    <Input
                      variant="filled"
                      value={item.price}
                      placeholder="Price"
                    />
                  </div>
                  <div>
                    <p style={{ marginBottom: 8 }}>Section</p>
                    <Input
                      variant="filled"
                      value={item.section?.name}
                      placeholder="Section"
                    />
                  </div>
                </Space>
                <Space
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <p style={{ marginBottom: 8 }}>Start Date</p>
                    <Input
                      variant="filled"
                      readOnly
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                      }}
                      value={
                        item.startDate
                          ? dayjs(item.startDate).format()
                          : undefined
                      }
                    />
                  </div>
                  <div>
                    <p style={{ marginBottom: 8 }}>End Date</p>
                    <Input
                      variant="filled"
                      readOnly
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                      }}
                      value={
                        item.endDate ? dayjs(item.endDate).format() : undefined
                      }
                    />
                  </div>
                </Space>
                <Divider
                  style={{ marginTop: 1 }}
                  children={<EllipsisOutlined />}
                />
              </React.Fragment>
            ))
          ) : (
            <Button
              style={{ color: '#bbbbbb' }}
              type="dashed"
              block
              icon={<StopOutlined />}
            >
              No data available
            </Button>
          )}
        </Create>
      </Col>
    </Row>
  );
};
