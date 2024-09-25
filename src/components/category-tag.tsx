import React from 'react';

import { PlayCircleFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Tag, TagProps } from 'antd';

import { Category } from 'graphql/schema.types';
import { Category as Cat } from 'enum/enum';

type Props = {
  category: Category;
};

export const CategoryTag = ({ category }: Props) => {
  let icon: React.ReactNode = null;
  let color: TagProps['color'] = undefined;

  switch (category) {
    case Cat.Movie:
      icon = <PlayCircleOutlined />;
      color = 'cyan';
      break;
    case Cat.Talk:
      icon = <PlayCircleOutlined />;
      color = 'red';
      break;
    case Cat.Concert:
      icon = <PlayCircleFilled />;
      color = 'green';
      break;
    case Cat.Theater:
      icon = <PlayCircleOutlined />;
      color = 'volcano';
      break;
    case Cat.Quiz:
      icon = <PlayCircleOutlined />;
      color = 'orange';
      break;
    case Cat.Performance:
      icon = <PlayCircleOutlined />;
      color = 'blue';
      break;
    case Cat.Exhibition:
      icon = <PlayCircleOutlined />;
      color = 'magenta';
      break;
    case Cat.Festival:
      icon = <PlayCircleOutlined />;
      color = 'gold';
      break;
    case Cat.Workshop:
      icon = <PlayCircleOutlined />;
      color = 'purple';
      break;
    case Cat.Dance:
      icon = <PlayCircleOutlined />;
      color = 'lime';
      break;
    default:
      break;
  }

  return (
    <Tag color={color} style={{ textTransform: 'capitalize' }}>
      {icon} {category.toLowerCase()}
    </Tag>
  );
};
