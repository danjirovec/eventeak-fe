import { CalendarOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Card, Flex, List } from 'antd';
import React from 'react';
import { Text } from './text';
import UpcomingEventsSkeleton from './skeleton/upcoming-events';
import { useNavigation } from '@refinedev/core';
import dayjs from 'dayjs';
import ColorBadge from './badge';
import { Event } from '/graphql/schema.types';
import { CategoryTag } from './category-tag';
import { getEventColor } from 'util/event-color';

type UpcomingEventsProps = {
  dashboard?: boolean;
  loading?: boolean;
  data: any;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  dashboard,
  loading,
  data,
}) => {
  const { list } = useNavigation();

  return (
    <Card
      style={dashboard ? { height: '100%' } : {}}
      styles={{
        header: { padding: '8px 16px' },
        body: { padding: '0 1rem' },
      }}
      title={
        <Flex align="center" gap={8}>
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: '0.7rem' }}>
            Next up
          </Text>
        </Flex>
      }
      extra={
        dashboard && (
          <Button
            onClick={() => list('scheduler')}
            icon={<RightCircleOutlined />}
          >
            See scheduler
          </Button>
        )
      }
    >
      {loading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        ></List>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={
            data?.data
              .filter(
                (event: Event) => event.date > dayjs().format('YYYY-MM-DD'),
              )
              .slice(0, 5) || []
          }
          renderItem={(item: any) => {
            const renderDate = () => {
              const start = dayjs(item.date).format(
                'dddd - D. M. YYYY - HH:mm',
              );

              return `${start}`;
            };

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <ColorBadge
                      color={getEventColor(item.template.category).background}
                    />
                  }
                  title={
                    <Text
                      size="xs"
                      style={{ fontWeight: 400 }}
                    >{`${renderDate()}`}</Text>
                  }
                  description={
                    <>
                      <CategoryTag category={item.template.category} />
                      <Text ellipsis={{ tooltip: true }} strong>
                        {item.name}
                      </Text>
                    </>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};

export default UpcomingEvents;
