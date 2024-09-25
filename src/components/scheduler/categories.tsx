import React from 'react';
import { FlagOutlined } from '@ant-design/icons';
import { Card, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { Text } from '../text';

import { Category } from 'enum/enum';

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
            <FlagOutlined />
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
            gap: 5,
          }}
        >
          {Object.values(Category)?.map((item) => (
            <div
              key={item}
              style={{
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Checkbox value={item} onChange={onChange}>
                <Text>{item}</Text>
              </Checkbox>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
