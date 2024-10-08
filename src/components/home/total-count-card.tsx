import { Card } from 'antd';
import React from 'react';
import { Text } from '../text';
import { ScheduleOutlined, TeamOutlined } from '@ant-design/icons';
import { Area, AreaConfig } from '@ant-design/plots';
import TotalSkeleton from '../skeleton/total';

type Props = {
  resource: 'customers' | 'events' | 'memberships';
  isLoading: boolean;
  counts: number[];
};

const DashboardTotalCountCard = ({ resource, isLoading, counts }: Props) => {
  const config: AreaConfig = {
    data: counts
      ? counts
          .map((value, index) => ({ index: `${index + 1}`, value }))
          .reverse()
      : [],
    xField: 'index',
    yField: 'value',
    autoFit: true,
    padding: 0,
    tooltip: false,
    animation: false,
    syncViewPadding: true,
    appendPadding: [1, 0, 0, 0],
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          fill: 'transparent',
        },
      },
      grid: {
        line: {
          style: {
            stroke: 'transparent',
          },
        },
      },
    },
    smooth: true,
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
    <div>
      {isLoading ? (
        <TotalSkeleton />
      ) : (
        <Card
          style={{ height: 90, padding: 0 }}
          styles={{ body: { padding: '8px 8px 8px 12px' } }}
          size="small"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            {resource == 'customers' ? <TeamOutlined /> : <ScheduleOutlined />}
            <Text size="md" style={{ marginLeft: 8 }}>
              {resource.charAt(0).toUpperCase() + resource.slice(1)}
            </Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Text
              size="xxxl"
              strong
              style={{
                flex: 1,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                textAlign: 'start',
                marginLeft: 28,
                fontVariant: 'tabular-nums',
              }}
            >
              {counts.length ? counts[0] : 0}
            </Text>
            <Area
              {...config}
              style={{
                width: '50%',
                height: 50,
              }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardTotalCountCard;
