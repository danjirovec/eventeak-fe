import React from 'react';
import { Edit, ListButton, useForm } from '@refinedev/antd';
import { Button, Col, Form, Input, Row } from 'antd';
import { UPDATE_MEMBERSHIP_TYPE_MUTATION } from 'graphql/mutations';
import { requiredOptionalMark } from 'components/requiredMark';
import { useGo } from '@refinedev/core';

export const EditMembershipType = () => {
  const go = useGo();
  const goToListPage = () => {
    go({
      to: { resource: 'membership-types', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };
  const { saveButtonProps, formProps, formLoading } = useForm({
    action: 'edit',
    redirect: 'list',
    mutationMode: 'pessimistic',
    meta: {
      gqlMutation: UPDATE_MEMBERSHIP_TYPE_MUTATION,
    },
    successNotification() {
      return {
        description: 'Success',
        message: 'Successfully updated a membership type',
        type: 'success',
      };
    },
    submitOnEnter: true,
  });

  return (
    <div>
      <Row justify="center" gutter={[32, 32]}>
        <Col xs={24} xl={8}>
          <Edit
            title="Edit Membership Type"
            goBack={<Button>←</Button>}
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
            headerButtons={({ listButtonProps }) => (
              <>{listButtonProps && <ListButton {...listButtonProps} />}</>
            )}
            headerProps={{ onBack: goToListPage }}
          >
            <Form
              {...formProps}
              layout="vertical"
              requiredMark={requiredOptionalMark}
            >
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
