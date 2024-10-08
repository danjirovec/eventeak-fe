import React from 'react';

import { useList } from '@refinedev/core';
import type { GetFieldsFromList } from '@refinedev/nestjs-query';

import { DollarOutlined } from '@ant-design/icons';
import { Area, type AreaConfig } from '@ant-design/plots';
import { Card } from 'antd';

import { Text } from '../text';
import { ORDERS_QUERY } from 'graphql/queries';
import { OrdersListQuery } from 'graphql/types';
import { getBusiness } from 'util/get-business';

const RevenueChart = () => {
  const { data } = useList<GetFieldsFromList<OrdersListQuery>>({
    resource: 'orders',
    filters: [
      {
        field: 'businessId',
        operator: 'eq',
        value: getBusiness().id,
      },
    ],
    meta: {
      gqlQuery: ORDERS_QUERY,
    },
  });

  const dealData = React.useMemo(() => {
    return data?.data;
  }, [data?.data]);

  const config: AreaConfig = {
    isStack: false,
    data: dealData ? dealData : [],
    xField: 'created',
    yField: 'total',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v) => {
          return `CZK ${Number(v) / 1000}k`;
        },
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.total,
          value: `CZK ${Number(data.total) / 1000}k`,
        };
      },
    },
    areaStyle: (data) => {
      const won = 'l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a';
      const lost = 'l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f';
      return { fill: won };
    },
    color: (data) => {
      return '#52C41A';
    },
  };

  return (
    <Card
      style={{ height: '100%' }}
      styles={{
        header: { padding: '8px 16px' },
        body: { padding: '24px 24px 0px 24px' },
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: '.5rem' }}>
            Income
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default RevenueChart;
