import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { Authenticated, Refine } from '@refinedev/core';

import { ErrorComponent, useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { authProvider, dataProvider } from './providers';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  UpdatePasswordPage,
  CustomerList,
  EventList,
  CreateEvent,
  CreateCustomer,
  TemplateList,
  CreateTemplate,
  CloneTemplate,
  VenueList,
  CreateVenue,
  BenefitList,
  CreateBenefit,
  EditTemplate,
  EditEvent,
  EditCustomer,
  EditVenue,
  EditBenefit,
  Home,
  CalendarPageWrapper,
  CreateBusiness,
  EditBusiness,
  BusinessList,
  DiscountList,
  CreateDiscount,
  EditDiscount,
  CreateTicket,
  TicketList,
  EditTicket,
  CreateMembershipType,
  MembershipTypeList,
  EditMembershipType,
  OrderList,
  CloneDiscount,
  EditOrder,
  CloneMembershipType,
  CloneBusiness,
  CloneBenefit,
  CloneVenue,
  CloneEvent,
} from './pages';
import Layout from './components/layout';
import { resources } from './config/resources';
import { SharedProvider } from './providers/context/business';
import './index.css';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

function App() {
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    weekStart: 1,
  });
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#007965',
              borderRadius: 5,
              colorSuccess: '#007965',
              colorError: '#AD001D',
              colorBgLayout: '#f1f4f3', // #f0f2f2
            },
            algorithm: [theme.defaultAlgorithm],
            components: {
              Layout: {
                triggerBg: '#ffffff',
              },
              Menu: {
                itemSelectedBg: '#cce4e0',
                itemHoverBg: '#cce4e0',
                itemSelectedColor: '#001814',
                itemColor: '#001814',
              },
              Table: {
                headerBg: '#cce4e0',
              },
              Select: {
                optionSelectedBg: '#cce4e0',
              },
              Button: {
                textHoverBg: '#cce4e0',
                primaryShadow: undefined,
              },
            },
          }}
        >
          <AntdApp>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: 'z3fBNU-mW11vL-e2PrNT',
                liveMode: 'off',
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-routes"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <SharedProvider>
                        <Layout>
                          <Outlet />
                        </Layout>
                      </SharedProvider>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/users">
                    <Route index element={<CustomerList />} />
                    <Route path="new" element={<CreateCustomer />} />
                    <Route path="edit/:id" element={<EditCustomer />} />
                  </Route>
                  <Route path="/events">
                    <Route index element={<EventList />} />
                    <Route path="new" element={<CreateEvent />} />
                    <Route path="clone/:id" element={<CloneEvent />} />
                    <Route path="edit/:id" element={<EditEvent />} />
                  </Route>
                  <Route path="/event-templates">
                    <Route index element={<TemplateList />} />
                    <Route path="new" element={<CreateTemplate />} />
                    <Route path="clone/:id" element={<CloneTemplate />} />
                    <Route path="edit/:id" element={<EditTemplate />} />
                  </Route>
                  <Route path="/venues">
                    <Route index element={<VenueList />} />
                    <Route path="new" element={<CreateVenue />} />
                    <Route path="clone/:id" element={<CloneVenue />} />
                    <Route path="edit/:id" element={<EditVenue />} />
                  </Route>
                  <Route path="/benefits">
                    <Route index element={<BenefitList />} />
                    <Route path="new" element={<CreateBenefit />} />
                    <Route path="clone/:id" element={<CloneBenefit />} />
                    <Route path="edit/:id" element={<EditBenefit />} />
                  </Route>
                  <Route path="/discounts">
                    <Route index element={<DiscountList />} />
                    <Route path="new" element={<CreateDiscount />} />
                    <Route path="clone/:id" element={<CloneDiscount />} />
                    <Route path="edit/:id" element={<EditDiscount />} />
                  </Route>
                  <Route path="/tickets">
                    <Route index element={<TicketList />} />
                    <Route path="new" element={<CreateTicket />} />
                    <Route path="edit/:id" element={<EditTicket />} />
                  </Route>
                  <Route path="/businesses">
                    <Route index element={<BusinessList />} />
                    <Route path="new" element={<CreateBusiness />} />
                    <Route path="clone/:id" element={<CloneBusiness />} />
                    <Route path="edit/:id" element={<EditBusiness />} />
                  </Route>
                  <Route path="/membership-types">
                    <Route index element={<MembershipTypeList />} />
                    <Route path="new" element={<CreateMembershipType />} />
                    <Route path="clone/:id" element={<CloneMembershipType />} />
                    <Route path="edit/:id" element={<EditMembershipType />} />
                  </Route>
                  <Route path="/orders">
                    <Route index element={<OrderList />} />
                    <Route path="edit/:id" element={<EditOrder />} />
                  </Route>
                  <Route path="/scheduler" element={<CalendarPageWrapper />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <Navigate to="/" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="update-password"
                      fallback={<Navigate to="/login" />}
                    >
                      <Outlet />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/update-password"
                    element={<UpdatePasswordPage />}
                  />
                </Route>

                <Route
                  element={
                    <Authenticated key="catch-all">
                      <Outlet />
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </AntdApp>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
