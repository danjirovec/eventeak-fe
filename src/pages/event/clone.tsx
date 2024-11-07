import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import { Create, useForm, useSelect } from '@refinedev/antd';
import { useGo, useList, useNavigation } from '@refinedev/core';
import { CREATE_EVENT_MUTATION } from 'graphql/mutations';
import {
  PRICE_CATEGORY_QUERY,
  TEMPLATE_DISCOUNTS_QUERY,
  TEMPLATES_QUERY,
} from 'graphql/queries';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import {
  PriceCategoryListQuery,
  TemplateDiscountsListQuery,
  TemplatesListQuery,
} from 'graphql/types';

import {
  CaretRightOutlined,
  DollarCircleTwoTone,
  FileTextTwoTone,
  HomeTwoTone,
  HourglassTwoTone,
  MessageTwoTone,
  MinusCircleTwoTone,
  PictureTwoTone,
  SoundTwoTone,
  TagTwoTone,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import SupaUpload from 'components/upload/supaUpload';
import { requiredMark, Text } from 'components';
import { useGlobalStore } from 'providers/context/store';
import { Business, Template, Venue } from '/graphql/schema.types';
import LogoPreviewSkeleton from 'components/skeleton/logo-preview';

type Selected = {
  label: string;
  value: string;
};

export const CloneEvent = () => {
  const business = useGlobalStore((state) => state.business);
  const [templatePriceCategories, setTemplatePriceCategories] = useState<
    Selected[]
  >([]);
  const { edit } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState<Selected[]>([]);
  const [template, setTemplate] = useState<
    Pick<
      Template,
      | 'length'
      | 'name'
      | 'id'
      | 'category'
      | 'created'
      | 'type'
      | 'language'
      | 'subtitles'
      | 'posterUrl'
      | 'description'
    > & {
      business: Pick<Business, 'id'>;
      venue: Pick<Venue, 'id' | 'name'>;
    }
  >();
  const go = useGo();
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

  const { selectProps: templates, query: templatesQuery } = useSelect<
    GetFieldsFromList<TemplatesListQuery>
  >({
    resource: 'templates',
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
        value: business?.id,
      },
      {
        field: 'type',
        operator: 'eq',
        value: 'Leaf',
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  const { data: priceCategories, isFetching: pricesFetching } = useList<
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
        value: template?.id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    queryOptions: {
      enabled: !!template,
    },
  });

  const { data: templateDiscounts, isFetching: discountsFetching } = useList<
    GetFieldsFromList<TemplateDiscountsListQuery>
  >({
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
        value: template?.id,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
    queryOptions: {
      enabled: !!template,
    },
  });

  useEffect(() => {
    if (!loading) {
      const updated = priceCategories?.data.map((item: any) => ({
        label: `${item.name} - ${item.price} ${business?.currency}`,
        value: item.id,
      }));
      if (updated) {
        setTemplatePriceCategories(updated);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      const updated = templateDiscounts?.data.map((item: any) => ({
        label: `${item.discount.name} - ${item.discount.percentage} %`,
        value: item.discount.id,
      }));
      if (updated) {
        setDiscounts(updated);
      }
    }
  }, [loading]);

  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      businessId: business?.id,
    });
  };

  useEffect(() => {
    if (!discountsFetching && !pricesFetching) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [discountsFetching, pricesFetching]);

  useEffect(() => {
    if (!formLoading && formProps.initialValues) {
      setTemplate(formProps.initialValues.template);
    }
  }, [formLoading]);

  return (
    <Row justify="center" gutter={[32, 32]}>
      <Col xs={24} xl={16}>
        <Create
          title="Clone Event"
          saveButtonProps={{
            ...saveButtonProps,
            loading: formLoading,
          }}
          isLoading={formLoading || loading}
          goBack={<Button>←</Button>}
          breadcrumb={false}
          headerProps={{ onBack: goToListPage }}
        >
          <Form
            {...formProps}
            form={form}
            layout="vertical"
            onFinish={handleOnFinish}
            requiredMark={requiredMark}
          >
            <Space style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Form.Item
                label="Template"
                name="templateId"
                rules={[{ required: true, message: '' }]}
                initialValue={formProps?.initialValues?.template.id}
              >
                <Select
                  placeholder="Template"
                  options={templates.options}
                  onChange={(value) => {
                    const tmp = templatesQuery.data?.data.find(
                      (item) => item.id == value,
                    );
                    setTemplate(tmp);
                    form.setFieldValue('name', tmp?.name);
                  }}
                />
              </Form.Item>
            </Space>
            <Space
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="Date - Time"
                name="date"
                rules={[{ required: true, message: '' }]}
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : '',
                })}
              >
                <DatePicker
                  minDate={dayjs()}
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
            <Space
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
              }}
            >
              <Text>{'Template Properties'}</Text>
              <Collapse
                collapsible={'header'}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                size="small"
                items={[
                  {
                    styles: {
                      header: { height: 30, padding: 4 },
                    },
                    label: template?.name,
                    key: '1',
                    children: (
                      <>
                        <Space
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                          }}
                        >
                          <Form.Item
                            label={
                              <Flex align="center" gap={5}>
                                <TagTwoTone twoToneColor={'#007965'} />
                                <Text>{'Category'}</Text>
                              </Flex>
                            }
                          >
                            <Input
                              disabled
                              value={template?.category ?? ''}
                              style={{
                                backgroundColor: 'white',
                                color: '#1d1d1d',
                              }}
                            />
                          </Form.Item>
                        </Space>
                        <Space
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                          }}
                        >
                          <Form.Item
                            label={
                              <Flex
                                onClick={() =>
                                  edit(
                                    'venues',
                                    template ? template.venue.id : '',
                                  )
                                }
                                align="center"
                                gap={5}
                              >
                                <HomeTwoTone twoToneColor={'#007965'} />
                                <Text
                                  style={{
                                    whiteSpace: 'nowrap',
                                    color: '#007965',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                  }}
                                >
                                  {'Venue'}
                                </Text>
                              </Flex>
                            }
                          >
                            <Input
                              disabled
                              value={template?.venue.name ?? ''}
                              style={{
                                backgroundColor: 'white',
                                color: '#1d1d1d',
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            label={
                              <Flex align="center" gap={5}>
                                <HourglassTwoTone twoToneColor={'#007965'} />
                                <Text>{'Length'}</Text>
                              </Flex>
                            }
                          >
                            <Input
                              value={template?.length ?? ''}
                              style={{
                                backgroundColor: 'white',
                                color: '#1d1d1d',
                              }}
                              addonAfter="minutes"
                              disabled
                            />
                          </Form.Item>
                        </Space>
                        <Space
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                          }}
                        >
                          <Form.Item
                            label={
                              <Flex align="center" gap={5}>
                                <SoundTwoTone twoToneColor={'#007965'} />
                                <Text>{'Language'}</Text>
                              </Flex>
                            }
                          >
                            <Input
                              disabled
                              value={template?.language ?? ''}
                              style={{
                                backgroundColor: 'white',
                                color: '#1d1d1d',
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            label={
                              <Flex align="center" gap={5}>
                                <MessageTwoTone twoToneColor={'#007965'} />
                                <Text>{'Subtitles'}</Text>
                              </Flex>
                            }
                          >
                            <Input
                              disabled
                              value={template?.subtitles ?? ''}
                              style={{
                                backgroundColor: 'white',
                                color: '#1d1d1d',
                              }}
                            />
                          </Form.Item>
                        </Space>
                        <Space
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                          }}
                        >
                          <Form.Item
                            label={
                              <Flex align="center" gap={5}>
                                <FileTextTwoTone twoToneColor={'#007965'} />
                                <Text>{'Description'}</Text>
                              </Flex>
                            }
                          >
                            <Input.TextArea
                              disabled
                              value={template?.description ?? ''}
                              style={{
                                backgroundColor: 'white',
                                color: '#1d1d1d',
                              }}
                            />
                          </Form.Item>
                        </Space>
                        <Space
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                          }}
                        >
                          <Form.Item
                            label={
                              <Flex align="center" gap={5}>
                                <DollarCircleTwoTone twoToneColor={'#007965'} />
                                <Text>{'Price categories'}</Text>
                              </Flex>
                            }
                          >
                            <Select
                              suffixIcon={null}
                              disabled
                              placement="topLeft"
                              mode="multiple"
                              value={templatePriceCategories}
                              options={templatePriceCategories}
                              placeholder="Price categories"
                            />
                          </Form.Item>
                          <Form.Item
                            label={
                              <Flex align="center" gap={5}>
                                <MinusCircleTwoTone twoToneColor={'#007965'} />
                                <Text>{'Discounts'}</Text>
                              </Flex>
                            }
                          >
                            <Select
                              suffixIcon={null}
                              disabled
                              placement="topLeft"
                              mode="multiple"
                              value={discounts}
                              options={discounts}
                              placeholder="Discounts"
                            />
                          </Form.Item>
                        </Space>
                        <Form.Item
                          label={
                            <Flex align="center" gap={5}>
                              <PictureTwoTone twoToneColor={'#007965'} />
                              <Text>{'Poster'}</Text>
                            </Flex>
                          }
                        >
                          {template?.posterUrl && !templatesQuery?.isLoading ? (
                            <SupaUpload
                              folder="posters"
                              disabled={true}
                              incomingUrl={template?.posterUrl}
                              onUpload={() => null}
                            />
                          ) : (
                            <Flex
                              vertical
                              gap={10}
                              justify="center"
                              align="center"
                              style={{
                                border: '1px solid #d9d9d9',
                                borderRadius: '5px',
                                width: 102,
                                height: 102,
                              }}
                            >
                              <LogoPreviewSkeleton />
                            </Flex>
                          )}
                        </Form.Item>
                      </>
                    ),
                  },
                ]}
              />
            </Space>
          </Form>
        </Create>
      </Col>
    </Row>
  );
};
