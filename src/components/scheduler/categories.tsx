import React from 'react';
import { TagOutlined } from '@ant-design/icons';
import { Card, Checkbox, Flex } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { Text } from '../text';

import { Category } from 'enum/enum';
import { Category as CategoryType } from 'graphql/schema.types';
import ColorBadge from '../badge';
import { CategoryTag } from '../category-tag';
import { getEventColor } from 'util/event-color';

type CalendarCategoriesProps = {
  onChange?: (e: CheckboxChangeEvent) => void;
};

export const CalendarCategories: React.FC<CalendarCategoriesProps> = ({
  onChange,
  ...rest
}) => {
  return (
    <>
      <Card
        style={{ marginTop: '1rem' }}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TagOutlined />
            <Text size="sm" style={{ marginLeft: '0.7rem' }}>
              Category
            </Text>
          </div>
        }
        styles={{
          header: { padding: '8px 16px' },
          body: { padding: '1rem 1rem' },
        }}
        {...rest}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}
        >
          {Object.keys(Category).map((item) => (
            <Checkbox value={item} onChange={onChange}>
              <Flex align="center" gap={5}>
                <ColorBadge
                  color={getEventColor(item as CategoryType).background}
                />
                <CategoryTag category={item as CategoryType} />
              </Flex>
            </Checkbox>
          ))}
        </div>
      </Card>
    </>
  );
};
