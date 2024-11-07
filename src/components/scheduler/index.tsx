import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type FullCalendar from '@fullcalendar/react';
import { Button, Card, Grid, Radio } from 'antd';

import { Text } from '../text';
import { GetListResponse } from '@refinedev/core';
import { Business, Event, Template, Venue } from 'graphql/schema.types';

import styles from './index.module.css';
import { getEventColor } from 'util/event-color';
import { isDateTimeInPast } from 'util/past-event';

const FullCalendarWrapper = lazy(() => import('./full-calendar'));

type View =
  | 'dayGridMonth'
  | 'timeGridWeek'
  | 'timeGridDay'
  | 'listMonth'
  | 'listDay'
  | 'listWeek';

type CalendarProps = {
  data:
    | GetListResponse<
        Pick<Event, 'id' | 'created' | 'name' | 'date' | 'seatMap'> & {
          template: Pick<
            Template,
            | 'id'
            | 'category'
            | 'name'
            | 'length'
            | 'type'
            | 'description'
            | 'language'
            | 'posterUrl'
            | 'subtitles'
          > & {
            venue: Pick<Venue, 'id' | 'name' | 'hasSeats'>;
          };
          business: Pick<Business, 'id'>;
        }
      >
    | undefined;
  category?: string[];
  onClickEvent?: (event: any) => void;
};

export const Calendar: React.FC<CalendarProps> = ({ data, onClickEvent }) => {
  const [calendarView, setCalendarView] = useState<View>('timeGridWeek');
  const calendarRef = useRef<FullCalendar>(null);
  const [title, setTitle] = useState(calendarRef.current?.getApi().view.title);
  const { md } = Grid.useBreakpoint();

  useEffect(() => {
    calendarRef.current?.getApi().changeView(calendarView);
  }, [calendarView]);

  useEffect(() => {
    if (md) {
      setCalendarView('timeGridWeek');
    } else {
      setCalendarView('listMonth');
    }
  }, [md]);

  const addMinutesToDatetime = (
    datetimeString: string,
    minutes: number,
  ): string => {
    const date = new Date(datetimeString);
    date.setMinutes(date.getMinutes() + minutes);
    const newDatetimeString = date.toISOString();
    return newDatetimeString;
  };

  const events = (data?.data ?? []).map((item) => {
    return {
      id: item.id,
      title: item.name,
      start: item.date,
      end: addMinutesToDatetime(item.date, item.template.length ?? 30),
      extendedProps: { category: item.template.category },
      backgroundColor: isDateTimeInPast(item.date)
        ? 'lightgrey'
        : getEventColor(item.template.category).background,
      textColor: isDateTimeInPast(item.date)
        ? 'black'
        : getEventColor(item.template.category).text,
      borderColor: isDateTimeInPast(item.date)
        ? 'lightgrey'
        : getEventColor(item.template.category).background,
    };
  });

  return (
    <Card>
      <div className={styles.calendar_header}>
        <div className={styles.actions}>
          <Button
            onClick={() => {
              calendarRef.current?.getApi().prev();
            }}
            shape="circle"
            icon={<LeftOutlined />}
          />
          <Button
            onClick={() => {
              calendarRef.current?.getApi().next();
            }}
            shape="circle"
            icon={<RightOutlined />}
          />
          <Text className={styles.title} size="lg">
            {title}
          </Text>
        </div>

        <Radio.Group value={calendarView}>
          {[
            {
              label: 'Month',
              desktopView: 'dayGridMonth',
              mobileView: 'listMonth',
            },
            {
              label: 'Week',
              desktopView: 'timeGridWeek',
              mobileView: 'listWeek',
            },
            {
              label: 'Day',
              desktopView: 'timeGridDay',
              mobileView: 'listDay',
            },
          ].map(({ label, desktopView, mobileView }) => {
            const view = md ? desktopView : mobileView;
            return (
              <Radio.Button
                key={label}
                value={view}
                onClick={() => {
                  setCalendarView(view as View);
                }}
              >
                {label}
              </Radio.Button>
            );
          })}
          {md && (
            <Radio.Button
              value="listMonth"
              onClick={() => {
                setCalendarView('listMonth');
              }}
            >
              List
            </Radio.Button>
          )}
        </Radio.Group>
      </div>
      <Suspense>
        <FullCalendarWrapper
          {...{ calendarRef, events, onClickEvent, setTitle }}
        />
      </Suspense>
    </Card>
  );
};
