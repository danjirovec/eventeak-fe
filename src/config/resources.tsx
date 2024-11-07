import {
  BuildOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FlagOutlined,
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
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { IResourceItem } from '@refinedev/core';

export const resources: IResourceItem[] = [
  {
    name: 'dashboard',
    list: '/dashboard',
    meta: {
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
  },
  {
    name: 'businesses',
    list: '/businesses',
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
    name: 'membership-types',
    list: '/membership-types',
    clone: '/membership-types/clone/:id',
    create: '/membership-types/new',
    edit: '/membership-types/edit/:id',
    meta: {
      label: 'Membership Types',
      icon: <FlagOutlined />,
      parent: 'userManagement',
    },
  },
  {
    name: 'memberships',
    list: '/memberships',
    create: '/memberships/new',
    edit: '/memberships/edit/:id',
    meta: {
      label: 'Memberships',
      icon: <HeartOutlined />,
      parent: 'userManagement',
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
    name: 'venues',
    list: '/venues',
    create: '/venues/new',
    edit: '/venues/edit/:id',
    meta: {
      label: 'Venues',
      icon: <HomeOutlined />,
      parent: 'eventManagement',
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
    name: 'templates',
    list: '/templates',
    clone: '/templates/clone/:id',
    create: '/templates/new',
    edit: '/templates/edit/:id',
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
    name: 'ticketManagement',
    meta: {
      label: 'Ticket',
      icon: <QrcodeOutlined />,
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
    edit: '/orders/edit/:id',
    meta: {
      label: 'Orders',
      icon: <ShoppingOutlined />,
      parent: 'ticketManagement',
    },
  },
  {
    name: 'tickets',
    list: '/tickets',
    edit: '/tickets/edit/:id',
    meta: {
      label: 'Tickets',
      icon: <ScanOutlined />,
      parent: 'ticketManagement',
    },
  },
  {
    name: 'checkout',
    list: '/checkout',
    meta: {
      label: 'Checkout',
      icon: <ShoppingCartOutlined />,
    },
  },
];
