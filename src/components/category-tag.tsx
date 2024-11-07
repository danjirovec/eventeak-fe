import React from 'react';
import { Tag, TagProps } from 'antd';

import { Category } from 'graphql/schema.types';
import { Category as Cat } from 'enum/enum';

type Props = {
  category: Category;
};

export const CategoryTag = ({ category }: Props) => {
  let color: TagProps['color'] = undefined;

  switch (category) {
    case Cat.Movie:
      color = 'cyan';
      break;
    case Cat.Talk:
      color = 'red';
      break;
    case Cat.Concert:
      color = 'green';
      break;
    case Cat.Theater:
      color = 'volcano';
      break;
    case Cat.Quiz:
      color = 'orange';
      break;
    case Cat.Performance:
      color = 'blue';
      break;
    case Cat.Exhibition:
      color = 'magenta';
      break;
    case Cat.Festival:
      color = 'gold';
      break;
    case Cat.Workshop:
      color = 'purple';
      break;
    case Cat.Dance:
      color = 'lime';
      break;
    default:
      break;
  }

  return (
    <Tag color={color} style={{ textTransform: 'capitalize' }}>
      {category.toLowerCase()}
    </Tag>
  );
};
