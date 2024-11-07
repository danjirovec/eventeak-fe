import { Row, Col, Select } from 'antd';
import { UpcomingEvents } from 'components';
import { RevenueChart } from 'components/home';
import { useDocumentTitle } from '@refinedev/react-router-v6';
import { DashboardTotalCountCard } from 'components/home';
import { BaseOption, useCustom, useList } from '@refinedev/core';
import {
  BUSINESS_METRICS_QUERY,
  EVENTS_QUERY,
  ORDERS_GRAPH,
  USER_BUSINESSES_QUERY,
} from 'graphql/queries';
import { useSelect } from '@refinedev/antd';
import { EventsListQuery, UserBusinessesListQuery } from '/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import SelectSkeleton from 'components/skeleton/select';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useGlobalStore } from 'providers/context/store';

export const Home = () => {
  const [isDashLoading, setIsDashLoading] = useState(true);
  const user = useGlobalStore((state) => state.user);
  const business = useGlobalStore((state) => state.business);
  const setBusiness = useGlobalStore((state) => state.setBusiness);
  useDocumentTitle('Dashboard - Eventeak');

  const {
    data: metrics,
    isFetching: metricsLoading,
    refetch: metricsRefetch,
  } = useCustom({
    url: '',
    method: 'post',
    meta: {
      gqlQuery: BUSINESS_METRICS_QUERY,
      meta: JSON.stringify({ businessId: business?.id }),
      empty: !business,
    },
  });

  const {
    data: orders,
    isFetching: ordersLoading,
    refetch: ordersRefetch,
  } = useCustom({
    url: '',
    method: 'post',
    meta: {
      gqlQuery: ORDERS_GRAPH,
      meta: business?.id,
      empty: !business,
    },
  });

  const { selectProps, query } = useSelect<
    GetFieldsFromList<UserBusinessesListQuery>
  >({
    resource: 'businessUsers',
    optionLabel: (o) => o.business.name,
    optionValue: (o) => o.business.id,
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
        value: user?.id,
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

  const businesses = query.data?.data;

  const {
    data: eventsData,
    isFetching: eventsLoading,
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
        value: business?.id,
      },
    ],
    meta: {
      gqlQuery: EVENTS_QUERY,
      empty: !business,
    },
  });

  useEffect(() => {
    if (
      !metricsLoading &&
      !query.isFetching &&
      !eventsLoading &&
      !ordersLoading
    ) {
      setIsDashLoading(false);
    }
  }, [metricsLoading, query.isFetching, eventsLoading, ordersLoading]);

  const handleBusinessChange = (value: BaseOption) => {
    const selectedBusiness = businesses?.find(
      (b) => b.business.id === String(value),
    );
    if (selectedBusiness) {
      setBusiness({
        name: selectedBusiness?.business.name,
        id: selectedBusiness?.business.id,
        currency: selectedBusiness?.business.currency,
      });
    }
    metricsRefetch();
    ordersRefetch();
    eventsRefetch();
    query.refetch();
  };

  return (
    <div>
      <div>
        <Row gutter={[32, 32]} justify="start" style={{ marginBottom: 16 }}>
          <Col xs={24} sm={24} xl={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              <h2 style={{ margin: 0 }}>Business</h2>
              {!isDashLoading ? (
                <Select
                  onChange={handleBusinessChange}
                  style={{ width: 300 }}
                  defaultValue={{
                    label: business ? business.name : 'No data',
                    value: business?.id,
                  }}
                  placeholder={<h2 style={{ margin: 0 }}>Business</h2>}
                  {...selectProps}
                  options={selectProps.options}
                  labelRender={(o) => <h2 style={{ margin: 0 }}>{o.label}</h2>}
                  optionRender={(o) => <h2 style={{ margin: 0 }}>{o.label}</h2>}
                  showSearch={false}
                />
              ) : (
                <SelectSkeleton width={300} />
              )}
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <h2>Last 30 days</h2>
        <Row gutter={[32, 32]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={24} xl={6}>
            <DashboardTotalCountCard
              resource="customers"
              isLoading={isDashLoading}
              counts={
                metrics?.data ? metrics.data.getBusinessMetrics.customers : []
              }
            />
          </Col>
          <Col xs={24} sm={24} xl={6}>
            <DashboardTotalCountCard
              resource="memberships"
              isLoading={isDashLoading}
              counts={
                metrics?.data ? metrics.data.getBusinessMetrics.memberships : []
              }
            />
          </Col>
          <Col xs={24} sm={24} xl={6}>
            <DashboardTotalCountCard
              resource="events"
              isLoading={isDashLoading}
              counts={
                metrics?.data ? metrics.data.getBusinessMetrics.events : []
              }
            />
          </Col>
          <Col xs={24} sm={24} xl={6}>
            <DashboardTotalCountCard
              resource="tickets"
              isLoading={isDashLoading}
              counts={
                metrics?.data ? metrics.data.getBusinessMetrics.tickets : []
              }
            />
          </Col>
        </Row>
      </div>
      <Row gutter={[32, 32]}>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: '460px',
            marginBottom: 32,
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
          <RevenueChart data={orders ? orders : []} isLoading={isDashLoading} />
        </Col>
      </Row>
    </div>
  );
};
