import {
  BuildOutlined,
  CalendarOutlined,
  DashboardOutlined,
  GiftOutlined,
  HeartOutlined,
  HomeOutlined,
  MinusSquareOutlined,
  PicCenterOutlined,
  QrcodeOutlined,
  ScanOutlined,
  ScheduleOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { IResourceItem } from '@refinedev/core';

export const resources: IResourceItem[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
  },
  {
    name: 'businesses',
    list: '/businesses',
    clone: 'businesses/clone/:id',
    create: '/businesses/new',
    edit: '/businesses/edit/:id',
    meta: {
      label: 'Businesses',
      icon: <ShopOutlined />,
    },
  },
  {
    name: 'userManagement',
    meta: {
      label: 'User',
      icon: <UserOutlined />,
    },
  },
  {
    name: 'benefits',
    list: '/benefits',
    clone: '/benefits/clone/:id',
    create: '/benefits/new',
    edit: '/benefits/edit/:id',
    meta: {
      label: 'Benefits',
      icon: <GiftOutlined />,
      parent: 'userManagement',
    },
  },
  {
    name: 'membership-types',
    list: '/membership-types',
    clone: '/membership-types/clone/:id',
    create: '/membership-types/new',
    edit: '/membership-types/edit/:id',
    meta: {
      label: 'Membership Types',
      icon: <HeartOutlined />,
      parent: 'userManagement',
    },
  },
  {
    identifier: 'users',
    name: 'users',
    list: '/users',
    create: '/users/new',
    edit: '/users/edit/:id',
    meta: {
      label: 'Users',
      icon: <TeamOutlined />,
      parent: 'userManagement',
    },
  },
  {
    name: 'venues',
    list: '/venues',
    clone: '/venues/clone/:id',
    create: '/venues/new',
    edit: '/venues/edit/:id',
    meta: {
      label: 'Venues',
      icon: <HomeOutlined />,
    },
  },
  {
    name: 'eventManagement',
    meta: {
      label: 'Event',
      icon: <ScheduleOutlined />,
    },
  },
  {
    name: 'event-templates',
    list: '/event-templates',
    clone: '/event-templates/clone/:id',
    create: '/event-templates/new',
    edit: '/event-templates/edit/:id',
    meta: {
      label: 'Templates',
      icon: <BuildOutlined />,
      parent: 'eventManagement',
    },
  },
  {
    name: 'events',
    list: '/events',
    clone: '/events/clone/:id',
    create: '/events/new',
    edit: '/events/edit/:id',
    meta: {
      label: 'Events',
      icon: <PicCenterOutlined />,
      parent: 'eventManagement',
    },
  },
  {
    name: 'scheduler',
    list: '/scheduler',
    meta: {
      label: 'Scheduler',
      icon: <CalendarOutlined />,
    },
  },
  {
    name: 'ticketManagement',
    meta: {
      label: 'Ticket',
      icon: <QrcodeOutlined />,
    },
  },
  {
    name: 'discounts',
    list: '/discounts',
    create: '/discounts/new',
    clone: '/discounts/clone/:id',
    edit: '/discounts/edit/:id',
    meta: {
      label: 'Discounts',
      icon: <MinusSquareOutlined />,
      parent: 'ticketManagement',
    },
  },
  {
    name: 'orders',
    list: '/orders',
    create: '/orders/new',
    edit: '/orders/edit/:id',
    meta: {
      label: 'Orders',
      icon: <ShoppingCartOutlined />,
      parent: 'ticketManagement',
    },
  },
  {
    name: 'tickets',
    list: '/tickets',
    create: '/tickets/new',
    edit: '/tickets/edit/:id',
    meta: {
      label: 'Tickets',
      icon: <ScanOutlined />,
      parent: 'ticketManagement',
    },
  },
];
