import React from 'react';
import CurrentUser from './current-user';
import { Layout, Space } from 'antd';
import { LiveClock } from '../home';
import { ShopOutlined, ShopTwoTone } from '@ant-design/icons';
import { useGlobalStore } from 'providers/context/store';

const Header = () => {
  const business = useGlobalStore((state) => state.business);
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
          <ShopTwoTone twoToneColor={'#007965'} style={{ marginRight: 10 }} />
          <p style={{ marginBottom: 0 }}>
            <strong>{business?.name || 'No data'}</strong>
          </p>
        </div>
        <LiveClock />
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
