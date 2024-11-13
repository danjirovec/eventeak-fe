import React from 'react';
import { Edit, ListButton, useForm, useSelect } from '@refinedev/antd';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { UPDATE_BENEFIT_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import dayjs from 'dayjs';
import { MembershipTypeListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { MEMBERSHIP_TYPE_QUERY } from 'graphql/queries';
import { useGlobalStore } from 'providers/context/store';

export const EditBenefit = () => {
  const business = useGlobalStore((state) => state.business);
  const { saveButtonProps, formProps, formLoading, onFinish } = useForm({
    resource: 'benefits',
    action: 'edit',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      gqlMutation: UPDATE_BENEFIT_MUTATION,
    },
  });
  const { TextArea } = Input;

  const { selectProps: membershipTypes, query: membershipTypesQuery } =
    useSelect<GetFieldsFromList<MembershipTypeListQuery>>({
      resource: 'membership-types',
      optionLabel: 'name',
      optionValue: 'id',
      meta: {
        gqlQuery: MEMBERSHIP_TYPE_QUERY,
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

  const handleOnFinish = (values: any) => {
    onFinish({
      ...values,
    });
  };

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={8}>
          <Edit
            goBack={<Button>←</Button>}
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
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
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
              >
                <TextArea placeholder="Description"></TextArea>
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                name="points"
                label="Points"
                rules={[{ required: true, message: '' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  addonAfter="points"
                  min={0}
                />
              </Form.Item>
              <Form.Item
                name="membershipTypeId"
                label="Membership Type"
                style={{ width: '100%' }}
                initialValue={formProps?.initialValues?.membershipType?.id}
              >
                <Select
                  style={{ width: '100%' }}
                  options={membershipTypes.options}
                  placeholder="Membership Type"
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                name="expiryDate"
                label="Expiry Date"
                getValueProps={(value) => ({
                  value: value ? dayjs(value) : '',
                })}
              >
                <DatePicker
                  minDate={dayjs()}
                  showNow={false}
                  style={{ width: '100%' }}
                  format="D. M. YYYY"
                  placeholder="Expiry Date"
                  allowClear={true}
                  needConfirm={false}
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
