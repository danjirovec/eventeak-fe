import React from 'react';
import CurrentUser from './current-user';
import { Layout, Space } from 'antd';
import { useShared } from 'providers/context/business';
import { getBusiness } from 'util/get-business';
import { LiveClock } from '../home';
import { ShopOutlined } from '@ant-design/icons';

const Header = () => {
  const { sharedValue } = useShared();
  const headerStyles: React.CSSProperties = {
    background: '#fff',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  };

  return (
    <Layout.Header style={headerStyles}>
      <Space
        align="center"
        size="middle"
        style={{
          display: 'flex',
          alignItems: 'center',
          lineHeight: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            marginRight: 10,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <ShopOutlined style={{ marginRight: 10 }} />
          <p style={{ marginBottom: 0 }}>
            <strong>{getBusiness().name || 'No data'}</strong>
          </p>
        </div>
        <LiveClock />
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
