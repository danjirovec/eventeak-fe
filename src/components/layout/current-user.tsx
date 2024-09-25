import { Popover, Button } from 'antd';
import React, { useState } from 'react';
import { useGetIdentity, useLogout, useOne } from '@refinedev/core';
import { Avatar as AntdAvatar } from 'antd';

import type { User } from '/graphql/schema.types';
import { Text } from '../text';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { AccountSettings } from './account-settings';
import { GetFields } from '@refinedev/nestjs-query';
import { USER_QUERY } from 'graphql/queries';
import { GetUserQuery } from 'graphql/types';
import AvatarSkeleton from '../skeleton/avatar';
import { BUCKET_URL } from 'config/config';

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetIdentity<User>();
  const { data, isLoading } = useOne<GetFields<GetUserQuery>>({
    resource: 'users',
    id: user?.id,
    meta: {
      gqlQuery: USER_QUERY,
    },
  });
  const { mutate: logout } = useLogout();

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Text strong style={{ padding: '12px 30px' }}>
          {user?.email}
        </Text>
      </div>
      <div
        style={{
          borderTop: '1px solid #d9d9d9',
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          justifyContent: 'flex-start',
        }}
      >
        <Button
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 24,
          }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
        <Button
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 24,
          }}
          icon={<LogoutOutlined />}
          type="text"
          danger
          block
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}
      >
        {isLoading ? (
          <AvatarSkeleton />
        ) : (
          <AntdAvatar
            size="default"
            src={
              data?.data?.avatarUrl
                ? `${BUCKET_URL}avatars/${data?.data?.avatarUrl}`
                : undefined
            }
            style={{
              flexShrink: 0,
              backgroundColor: '#f58634',
              display: 'flex',
              alignItems: 'center',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </AntdAvatar>
        )}
      </Popover>
      {user && (
        <AccountSettings
          opened={isOpen}
          setOpened={setIsOpen}
          userId={user.id}
        />
      )}
    </>
  );
};

export default CurrentUser;
