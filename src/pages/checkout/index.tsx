import React, { useEffect, useState } from 'react';
import SeatReservation from 'components/seats/reservation';
import { useCreate, useList, useNavigation, useParsed } from '@refinedev/core';
import { EVENT_CHECKOUT_QUERY } from 'graphql/queries';
import {
  Select,
  Spin,
  Card,
  Row,
  Col,
  Flex,
  Popconfirm,
  Button,
  Tag,
  Empty,
} from 'antd';
import { Discount, Event, Ticket, User } from 'graphql/schema.types';
import { getBusiness } from 'util/get-business';
import { Text } from 'components';
import SelectSkeleton from 'components/skeleton/select';
import dayjs from 'dayjs';
import {
  CheckSquareOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { CREATE_TICKETS_CHECKOUT } from 'graphql/mutations';

type params = {
  eventId: string;
};

export const Checkout = () => {
  const { params } = useParsed<params>();
  const [tickets, setTickets] = useState<any[]>([]);
  const [event, setEvent] = useState<Event>();
  const [user, setUser] = useState<User | null>();
  const [removed, setRemoved] = useState(0);
  const [total, setTotal] = useState(0);
  const { edit } = useNavigation();

  const { mutate, isLoading: mutationLoading } = useCreate({
    resource: 'tickets',
    mutationOptions: {
      retry: 3,
    },
    successNotification: (data: any) => {
      const returnedEvent = data?.response.createTickets;
      setUser(null);
      setTickets([]);
      setEvent(returnedEvent);
      refetch();

      return {
        message: `Successfully created.`,
        type: 'success',
      };
    },
    errorNotification: () => {
      return {
        message: `Something went wrong creating tickets.`,
        type: 'error',
      };
    },
    meta: {
      customType: true,
      gqlMutation: CREATE_TICKETS_CHECKOUT,
    },
  });

  const eventId = params?.eventId;

  const { data, isFetching, isLoading, refetch } = useList({
    resource: 'getEventCheckout',
    meta: {
      meta: {
        businessId: getBusiness().id,
        eventId: event?.id,
      },
      gqlQuery: EVENT_CHECKOUT_QUERY,
    },
  });

  const handleEventChange = (value: string | undefined) => {
    setTickets([]);
    const selectedEvent = data?.response.events.find(
      (event: Event) => event.id === value,
    );
    setEvent(selectedEvent);
  };

  const handleSetUser = (value: string) => {
    const selectedUser = data?.response.users.find(
      (user: User) => user.id === value,
    );
    setUser(selectedUser);
  };

  const handleSetDiscount = (value: string, index: number) => {
    const selectedDiscount = data?.response.discounts.find(
      (discount: Discount) => discount.id === value,
    );
    const updatedTickets = tickets.map((item: any, i: number) => {
      if (i == index) {
        item.discount = selectedDiscount;
        item.price = item.discount
          ? Math.ceil((1 - item.discount.percentage / 100) * item.epcPrice)
          : item.epcPrice;
      }
      return item;
    });
    setTickets(updatedTickets);
  };

  const handleRemoveDiscount = (index: number) => {
    const updatedTickets = tickets.map((item: any, i: number) => {
      if (i == index) {
        item.discount = null;
        item.price = item.epcPrice;
      }
      return item;
    });
    setTickets(updatedTickets);
  };

  const getTicketHolder = (ticketId: string) => {
    const ticket = data?.response.tickets.find(
      (ticket: Ticket) => ticket.id == ticketId,
    );
    if (ticket.user) {
      return (
        <Flex gap={10}>
          <Flex gap={5}>
            <Text>User:</Text>
            <Text
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => edit('users', ticket.user.id)}
            >
              {ticket.user.email}
            </Text>
          </Flex>
          <Flex gap={10}>
            <Text>Ticket:</Text>
            <Text
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => edit('tickets', ticket.id)}
            >
              {ticket.id.slice(-12)}
            </Text>
          </Flex>
        </Flex>
      );
    } else {
      return (
        <Flex gap={5}>
          <Text>Ticket:</Text>
          <Text
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => edit('tickets', ticket.id)}
          >
            {ticket.id.slice(-12)}
          </Text>
        </Flex>
      );
    }
  };

  useEffect(() => {
    if (eventId) {
      const event = data?.response.events.find(
        (item: Event) => item.id == eventId,
      );
      setEvent(event);
    }
  }, [data?.response.events, eventId]);

  const handleRemoveTicket = (id: string, epc = false) => {
    if (epc) {
      const ticks = tickets.slice().reverse();
      const index = ticks.findIndex((item: any) => item.epc.id == id);
      if (index !== -1) {
        ticks.splice(index, 1);
        setTickets(ticks.slice().reverse());
      }
    } else {
      const updatedTickets = tickets.filter((item: any) => item.id !== id);
      setTickets(updatedTickets);
      setRemoved(removed + 1);
    }
  };

  const handleAddTicket = (item: any, index: number) => {
    if (
      tickets.filter((ticket) => ticket.epc.id == item.id).length <
      data?.response.eventPriceCategories.counts[index]
    ) {
      const ticket = {
        id: uuidv4(),
        epc: item,
        epcPrice: item.price,
        price: item.price,
      };
      setTickets([...tickets, ticket]);
    }
  };

  const handleAction = () => {
    if (tickets.length < 1) {
      return;
    }
    const ticketToCreate = [];
    if (event?.venue.hasSeats) {
      for (const ticket of tickets) {
        if (ticket.reserved) {
          return;
        }
        ticketToCreate.push({
          price: ticket.price,
          userId: user ? user.id : null,
          discountId: ticket.discount ? ticket.discount.id : null,
          seatId: ticket.seatId,
          eventId: event.id,
          sectionId: ticket.sectionId,
          businessId: getBusiness().id,
        });
      }
    } else {
      for (const ticket of tickets) {
        ticketToCreate.push({
          price: ticket.price,
          userId: user ? user.id : null,
          discountId: ticket.discount ? ticket.discount.id : null,
          eventId: event?.id,
          sectionId: ticket.epc.section.id,
          businessId: getBusiness().id,
        });
      }
    }
    mutate({
      values: {
        tickets: ticketToCreate,
        order: {
          total: total,
          userId: user ? user.id : null,
          businessId: getBusiness().id,
        },
      },
    });
  };

  useEffect(() => {
    let total = 0;
    if (!(tickets.length < 1)) {
      for (const tick of tickets) {
        total += tick.price;
      }
      setTotal(total);
    }
  }, [tickets]);

  return (
    <React.Fragment>
      <Row gutter={[32, 32]} justify={'center'}>
        <Col xs={24} xl={20}>
          <Text style={{ fontWeight: 600, fontSize: 20, lineHeight: 1.4 }}>
            Checkout
          </Text>
        </Col>
      </Row>
      <Row gutter={[32, 32]} justify={'center'} style={{ paddingTop: 12 }}>
        <Col xs={24} xl={12}>
          <Card
            style={{
              minHeight: '550px',
              maxHeight: '75vh',
              height: '75vh',
              width: '100%',
            }}
            styles={{ body: { height: '100%' } }}
          >
            {isLoading ? (
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Spin />
              </Flex>
            ) : !event ? (
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Flex>
            ) : event?.venue?.hasSeats ? (
              <SeatReservation
                eventData={event}
                setTickets={setTickets}
                tickets={tickets}
                removed={removed}
              />
            ) : (
              <Flex vertical gap={20} style={{ width: '100%', height: '100%' }}>
                {data?.response.eventPriceCategories && !isFetching ? (
                  data?.response.eventPriceCategories.nodes.map(
                    (item: any, index: number) => (
                      <Flex key={item.id} vertical>
                        <Flex
                          gap={20}
                          style={{
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                            borderRadius: 5,
                            padding: 20,
                          }}
                        >
                          <Flex style={{ width: '100%' }}>
                            <Flex gap={5} style={{ minWidth: 150 }}>
                              <Text>Category:</Text>
                              <Text>{item.name}</Text>
                            </Flex>
                            <Flex gap={5} style={{ minWidth: 150 }}>
                              <Text>Section:</Text>
                              <Text>{item.section.name}</Text>
                            </Flex>
                            <Flex gap={5} style={{ minWidth: 150 }}>
                              <Text>Price:</Text>
                              <Text>{item.price}</Text>
                            </Flex>
                          </Flex>
                          <Flex gap={30} justify="space-between">
                            <MinusOutlined
                              style={{ marginTop: 2, marginLeft: 4 }}
                              onClick={() => handleRemoveTicket(item.id, true)}
                            />
                            <Text style={{ width: 20 }}>
                              {
                                tickets.filter(
                                  (ticket) => ticket.epc.id == item.id,
                                ).length
                              }
                            </Text>
                            <PlusOutlined
                              style={{ marginTop: 2, marginLeft: 4 }}
                              onClick={() => handleAddTicket(item, index)}
                            />
                          </Flex>
                        </Flex>
                        <Flex justify="flex-end">
                          <Text>{`${data?.response.eventPriceCategories.counts[index]} available`}</Text>
                        </Flex>
                      </Flex>
                    ),
                  )
                ) : (
                  <Flex
                    justify="center"
                    align="center"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Spin />
                  </Flex>
                )}
              </Flex>
            )}
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card>
            <Flex vertical gap="large" style={{ width: '100%' }}>
              <Flex
                justify="flex-start"
                align="center"
                style={{ width: '100%' }}
              >
                <Text style={{ width: '20%', fontWeight: 600 }}>Event</Text>
                {isLoading ? (
                  <SelectSkeleton width={'100%'} />
                ) : (
                  <Select
                    allowClear
                    variant="filled"
                    style={{ width: '80%' }}
                    showSearch
                    placeholder="Select event"
                    filterOption={(input, option) =>
                      String(option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    defaultValue={event?.id}
                    options={data?.response.events?.map((event: Event) => ({
                      label: `${event.name} (${dayjs(event.date).format('DD. MM. - HH:mm')})`,
                      value: event.id,
                    }))}
                    onChange={handleEventChange}
                  />
                )}
              </Flex>
              <Flex justify="flex-start" align="center">
                <Text style={{ width: '20%', fontWeight: 600 }}>User</Text>
                {isLoading ? (
                  <SelectSkeleton width={'100%'} />
                ) : (
                  <Select
                    allowClear
                    variant="filled"
                    style={{ width: '80%' }}
                    showSearch
                    placeholder="Select user"
                    filterOption={(input, option) =>
                      String(option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={user ? user.id : null}
                    options={data?.response.users?.map((customer: User) => ({
                      label: `${customer.firstName} ${customer.lastName} (${customer.email})`,
                      value: customer.id,
                    }))}
                    onChange={handleSetUser}
                  />
                )}
              </Flex>
              <Flex justify="flex-start" align="center">
                <Text style={{ width: '20%', fontWeight: 600 }}>Selection</Text>
              </Flex>
              <Flex
                justify="flex-start"
                align="center"
                style={{ width: '100%' }}
              >
                {tickets.length == 0 ? (
                  <Flex
                    justify="center"
                    align="center"
                    style={{ width: '100%' }}
                  >
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Flex>
                ) : (
                  <Flex vertical gap={30} style={{ width: '100%' }}>
                    <Flex vertical gap={20} style={{ width: '100%' }}>
                      {tickets.map((item: any, i: number) => (
                        <Flex
                          key={i}
                          vertical
                          style={{
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                            padding: 10,
                            borderRadius: 5,
                          }}
                        >
                          <Flex justify="space-between">
                            {event?.venue?.hasSeats ? (
                              <Flex gap={10}>
                                <Text>{`Seat: ${item.seatNumber}`}</Text>
                                <Text>{`Row: ${item.rowName}`}</Text>
                                <Text>{`Section: ${item.sectionName}`}</Text>
                                {!item.reserved ? (
                                  <Flex>
                                    <Tag
                                      icon={<CheckSquareOutlined />}
                                      color="green"
                                    >
                                      Available
                                    </Tag>
                                    <Text>{`Price: ${item.price ? item.price : item.epcPrice}`}</Text>
                                  </Flex>
                                ) : (
                                  <Tag
                                    icon={<CloseSquareOutlined />}
                                    color="red"
                                  >
                                    Unavailable
                                  </Tag>
                                )}
                              </Flex>
                            ) : (
                              <Flex gap={10}>
                                <Text>{`Section: ${item.epc.section.name}`}</Text>
                                <Text>{`Price: ${item.price}`}</Text>
                              </Flex>
                            )}
                            <CloseOutlined
                              style={{ marginTop: 2 }}
                              onClick={() => {
                                handleRemoveTicket(item.id);
                              }}
                            />
                          </Flex>
                          {!event?.venue?.hasSeats ||
                          (event?.venue?.hasSeats && !item.reserved) ? (
                            <Flex align="center">
                              <Popconfirm
                                placement="topLeft"
                                title="Select discount"
                                description={
                                  <Select
                                    allowClear
                                    style={{ width: 150 }}
                                    showSearch
                                    placeholder="Select discount"
                                    filterOption={(input, option) =>
                                      String(option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    value={
                                      item.discount ? item.discount.id : null
                                    }
                                    options={data?.response.discounts?.map(
                                      (discount: Discount) => ({
                                        label: discount.name,
                                        value: discount.id,
                                      }),
                                    )}
                                    onChange={(value) =>
                                      handleSetDiscount(value, i)
                                    }
                                  />
                                }
                                okText="Ok"
                                cancelText="Cancel"
                              >
                                <a>
                                  <Text style={{ textDecoration: 'underline' }}>
                                    {item.discount
                                      ? data?.response.discounts.find(
                                          (discount: Discount) =>
                                            discount.id === item.discount.id,
                                        ).name
                                      : 'Select discount'}
                                  </Text>
                                </a>
                              </Popconfirm>
                              <Flex align="center">
                                {item.discount ? (
                                  <CloseOutlined
                                    style={{ marginTop: 2, marginLeft: 4 }}
                                    onClick={() => handleRemoveDiscount(i)}
                                  />
                                ) : null}
                              </Flex>
                            </Flex>
                          ) : (
                            <Flex>
                              <Text>{getTicketHolder(item.ticketId)}</Text>
                            </Flex>
                          )}
                        </Flex>
                      ))}
                    </Flex>
                    <Flex justify="space-between">
                      <Text>Total</Text>
                      <Text>{total}</Text>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Card>
          <Flex justify="flex-end" style={{ marginTop: 10 }}>
            <Button
              loading={mutationLoading}
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleAction}
            >
              {tickets[0]
                ? (tickets[0] as any).reserve && event?.venue?.hasSeats
                  ? 'Remove tickets'
                  : 'Create tickets'
                : 'Create tickets'}
            </Button>
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  );
};
