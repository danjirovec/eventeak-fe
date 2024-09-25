import { Category as Cat } from 'enum/enum';

export const getEventColor = (category: string) => {
  let backgroundColor = null;
  let textColor = null;

  switch (category) {
    case Cat.Movie:
      backgroundColor = 'cyan';
      textColor = 'black';
      break;
    case Cat.Talk:
      backgroundColor = 'red';
      textColor = 'white';
      break;
    case Cat.Concert:
      backgroundColor = 'green';
      textColor = 'white';
      break;
    case Cat.Theater:
      backgroundColor = '#e89175';
      textColor = 'black';
      break;
    case Cat.Quiz:
      backgroundColor = 'orange';
      textColor = 'black';
      break;
    case Cat.Performance:
      backgroundColor = 'blue';
      textColor = 'white';
      break;
    case Cat.Exhibition:
      backgroundColor = 'magenta';
      textColor = 'white';
      break;
    case Cat.Festival:
      backgroundColor = 'gold';
      textColor = 'black';
      break;
    case Cat.Workshop:
      backgroundColor = 'purple';
      textColor = 'white';
      break;
    case Cat.Dance:
      backgroundColor = 'lime';
      textColor = 'black';
      break;
    default:
      break;
  }

  return { background: backgroundColor, text: textColor };
};
