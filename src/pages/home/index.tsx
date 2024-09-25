import { Row, Col, Select } from 'antd';
import { UpcomingEvents } from 'components';
import { RevenueChart } from 'components/home';
import { useDocumentTitle } from '@refinedev/react-router-v6';
import { DashboardTotalCountCard } from 'components/home';
import { useCustom, useList } from '@refinedev/core';
import {
  COUNTS_QUERY,
  EVENTS_QUERY,
  USER_BUSINESSES_QUERY,
} from 'graphql/queries';
import { useSelect } from '@refinedev/antd';
import { EventsListQuery, UserBusinessesListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import SelectSkeleton from 'components/skeleton/select';
import { getAuth } from 'util/get-auth';
import { getBusiness } from 'util/get-business';
import { setBusiness } from 'util/set-business';
import { useShared } from 'providers/context/business';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const Home = () => {
  const [isDashLoading, setIsDashLoading] = useState(true);
  useDocumentTitle('Dashboard - Applausio');
  const { setSharedValue } = useShared();

  const {
    data: counts,
    isLoading: countsLoading,
    refetch: countsRefetch,
  } = useCustom({
    url: '',
    method: 'post',
    meta: {
      gqlQuery: COUNTS_QUERY,
      empty: getBusiness().id ? false : true,
      meta: JSON.stringify({ businessId: getBusiness().id }),
    },
  });

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UserBusinessesListQuery>
  >({
    resource: 'businessUsers',
    optionLabel: 'business',
    optionValue: 'business',
    meta: {
      gqlQuery: USER_BUSINESSES_QUERY,
    },
    pagination: {
      pageSize: 20,
      mode: 'server',
    },
    filters: [
      {
        field: 'user.id',
        operator: 'eq',
        value: getAuth().userId,
      },
      {
        field: 'role',
        operator: 'eq',
        value: 0,
      },
    ],
    sorters: [
      {
        field: 'created',
        order: 'desc',
      },
    ],
  });

  const {
    data: eventsData,
    isLoading: eventsLoading,
    refetch: eventsRefetch,
  } = useList<GetFieldsFromList<EventsListQuery>>({
    resource: 'events',
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: 'date',
        order: 'asc',
      },
    ],
    filters: [
      {
        field: 'date',
        operator: 'gte',
        value: dayjs().format('YYYY-MM-DD'),
      },
      {
        field: 'businessId',
        operator: 'eq',
        value: getBusiness().id,
      },
    ],
    meta: {
      gqlQuery: EVENTS_QUERY,
      empty: getBusiness().id ? false : true,
    },
  });

  useEffect(() => {
    if (!countsLoading && !queryResult.isLoading && !eventsLoading) {
      setIsDashLoading(false);
    }
  }, [countsLoading, queryResult.isLoading, eventsLoading]);

  const handleBusinessChange = (value: any, option: any) => {
    setBusiness(option.title, value);
    setSharedValue((prev) => prev + 1);
    countsRefetch();
    eventsRefetch();
    queryResult.refetch();
  };

  return (
    <div>
      <div>
        <Row
          gutter={[32, 32]}
          justify="start"
          style={{ marginBottom: 32, marginTop: 16 }}
        >
          <Col xs={24} sm={24} xl={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <h2 style={{ margin: 0 }}>Manage business:</h2>
              {!isDashLoading ? (
                <Select
                  onChange={handleBusinessChange}
                  style={{ width: 300 }}
                  defaultValue={{
                    label: (
                      <h2
                        style={{
                          margin: 0,
                        }}
                      >
                        {getBusiness().name ? getBusiness().name : 'No data'}
                      </h2>
                    ),
                    value: getBusiness().id,
                  }}
                  placeholder={
                    <h2 style={{ margin: 0 }}>Select bussines to manage</h2>
                  }
                  {...selectProps}
                  options={queryResult.data?.data.map((business) => ({
                    value: business.business.id,
                    label: (
                      <h2 style={{ margin: 0 }}>{business.business.name}</h2>
                    ),
                    title: business.business.name,
                  }))}
                  showSearch={false}
                />
              ) : (
                <SelectSkeleton />
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <h2>Totals</h2>
        <Row gutter={[32, 32]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={24} xl={8} style={{ height: 115 }}>
            <DashboardTotalCountCard
              resource="customers"
              isLoading={isDashLoading}
              counts={counts?.data ? counts.data.businessCounts.customers : []}
            />
          </Col>
          <Col xs={24} sm={24} xl={8} style={{ height: 115 }}>
            <DashboardTotalCountCard
              resource="memberships"
              isLoading={isDashLoading}
              counts={
                counts?.data ? counts.data.businessCounts.memberships : []
              }
            />
          </Col>
          <Col xs={24} sm={24} xl={8} style={{ height: 115 }}>
            <DashboardTotalCountCard
              resource="events"
              isLoading={isDashLoading}
              counts={counts?.data ? counts.data.businessCounts.events : []}
            />
          </Col>
        </Row>
      </div>
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: 16,
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: '460px',
          }}
        >
          <h2>Upcoming events</h2>
          <UpcomingEvents dashboard loading={isDashLoading} data={eventsData} />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: '460px',
          }}
        >
          <h2>Revenue</h2>
          <RevenueChart />
        </Col>
      </Row>
    </div>
  );
};
