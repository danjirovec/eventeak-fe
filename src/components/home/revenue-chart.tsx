import React from 'react';
import { DollarOutlined } from '@ant-design/icons';
import { Area, type AreaConfig } from '@ant-design/plots';
import { Card } from 'antd';
import { Text } from '../text';
import RevenueSkeleton from '../skeleton/revenue';

const RevenueChart = ({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) => {
  const dealData = React.useMemo(() => {
    return data?.data?.getOrderTotals;
  }, [data?.data?.getOrderTotals]);

  const config: AreaConfig = {
    isStack: false,
    data: dealData ? dealData : [],
    xField: 'date',
    yField: 'total',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    color: '#f58634',
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
          name: 'Month total',
          value: `${Number(data.total)} CZK`,
        };
      },
      crosshairs: { type: 'xy' },
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2:#007965 1:#001814`,
      };
    },
    line: {
      color: '#007965',
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
      {isLoading ? <RevenueSkeleton /> : <Area {...config} height={325} />}
    </Card>
  );
};

export default RevenueChart;
