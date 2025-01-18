import React, { useEffect, useState } from 'react';
import SeatReservation from 'components/seats/reservation';
import {
  useCreate,
  useList,
  useNavigation,
  useParsed,
  useUpdate,
} from '@refinedev/core';
import { EVENT_CHECKOUT_QUERY } from 'graphql/queries';
import {
  Select,
  Spin,
  Card,
  Row,
  Col,
  Flex,
  Popconfirm,
  Tag,
  Empty,
  Button,
} from 'antd';
import { Discount, Event, User } from 'graphql/schema.types';
import { Text } from 'components';
import SelectSkeleton from 'components/skeleton/select';
import dayjs from 'dayjs';
import {
  CheckOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  MinusOutlined,
  PlusOutlined,
  SaveOutlined,
  ScanOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import {
  CREATE_TICKETS_CHECKOUT,
  UPDATE_TICKET_MUTATION,
} from 'graphql/mutations';
import { useGlobalStore } from 'providers/context/store';
import { SaveButton } from '@refinedev/antd';

type params = {
  eventId: string;
};

export const Checkout = () => {
  const business = useGlobalStore((state) => state.business);
  const { params } = useParsed<params>();
  const [tickets, setTickets] = useState<any[]>([]);
  const [event, setEvent] = useState<Event>();
  const [user, setUser] = useState<User | null>();
  const [customEmail, setCustomEmail] = useState<string | null>();
  const [removed, setRemoved] = useState(0);
  const [total, setTotal] = useState(0);
  const { edit } = useNavigation();
  const { mutate: validate, isLoading: validateLoading } = useUpdate();
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
        message: `Successfully created tickets`,
        type: 'success',
      };
    },
    errorNotification: (data: any) => {
      return {
        message: 'Error',
        description: data.messsage,
        type: 'error',
      };
    },
    meta: {
      customType: true,
      gqlMutation: CREATE_TICKETS_CHECKOUT,
    },
  });

  const eventId = params?.eventId;

  const { data, isFetching, refetch } = useList({
    resource: 'getEventCheckout',
    meta: {
      meta: {
        businessId: business?.id,
        eventId: event?.id,
      },
      gqlQuery: EVENT_CHECKOUT_QUERY,
    },
    queryOptions: {
      enabled: !!business,
    },
  });

  const handleEventChange = (value: string | undefined) => {
    setTickets([]);
    const selectedEvent = data?.response.events.find(
      (event: Event) => event.id === value,
    );
    setEvent(selectedEvent);
  };

  // const handleSetUser = (value: string) => {
  //   const selectedUser = data?.response.users.find(
  //     (user: User) => user.id === value,
  //   );
  //   setUser(selectedUser);
  // };

  const handleSetUser = (selectedValues: string[]) => {
    const selectedUser = data?.response.users.find(
      (user: User) => user.id === selectedValues[0],
    );
    if (selectedUser) {
      setUser(selectedUser);
      setCustomEmail(null);
    } else {
      setUser(null);
      setCustomEmail(selectedValues[0]);
    }
  };

  const handleSetDiscount = (value: string, index: number) => {
    const selectedDiscount = data?.response.discounts.find(
      (discount: Discount) => discount.id === value,
    );
    const updatedTickets = tickets.map((item: any, i: number) => {
      if (i == index) {
        item.discount = selectedDiscount;
        item.price = item.discount
          ? Math.ceil((1 - item.discount.percentage / 100) * item.pcPrice)
          : item.pcPrice;
      }
      return item;
    });
    setTickets(updatedTickets);
  };

  const handleRemoveDiscount = (index: number) => {
    const updatedTickets = tickets.map((item: any, i: number) => {
      if (i == index) {
        item.discount = null;
        item.price = item.pcPrice;
      }
      return item;
    });
    setTickets(updatedTickets);
  };

  const handleValidateState = async (ticketId: string) => {
    validate({
      resource: 'tickets',
      id: ticketId,
      values: { validated: new Date() },
      successNotification: () => {
        return {
          description: 'Success',
          message: 'Successfully validated ticket',
          type: 'success',
        };
      },
      meta: {
        gqlMutation: UPDATE_TICKET_MUTATION,
      },
    });
  };

  const getTicketHolder = (ticketId: string) => {
    const ticket = data?.response.tickets.find(
      (ticket: any) => ticket.id == ticketId,
    );
    if (ticket && ticket.user) {
      return (
        <Flex gap={10} align="center">
          <Flex gap={10} align="center">
            <Text>User:</Text>
            <Text
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => {
                if (ticket.user) edit('users', ticket?.user?.id);
              }}
            >
              {ticket.user.email}
            </Text>
          </Flex>
          <Flex gap={10} align="center">
            <Text>Ticket:</Text>
            <Text
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => edit('tickets', ticket.id)}
            >
              {ticket.id.slice(0, 8)}
            </Text>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => {
                handleValidateState(ticket.id);
              }}
              okText="Validate"
              cancelText="Cancel"
            >
              <Button
                loading={validateLoading}
                disabled={ticket.validated ? true : false}
                style={{
                  backgroundColor: ticket.validated ? '#f6ffed' : 'white',
                  ...(ticket.validated && { borderColor: '#b7eb8f' }),
                  width: 24,
                  height: 24,
                  color: ticket.validated ? '#389e0d' : '#383838',
                }}
                icon={ticket.validated ? <CheckOutlined /> : <ScanOutlined />}
              />
            </Popconfirm>
          </Flex>
        </Flex>
      );
    } else if (ticket) {
      return (
        <Flex gap={10} align="center">
          <Text>Ticket:</Text>
          <Text
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => edit('tickets', ticket.id)}
          >
            {ticket.id.slice(0, 8)}
          </Text>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => {
              handleValidateState(ticket.id);
            }}
            okText="Validate"
            cancelText="Cancel"
          >
            <Button
              loading={validateLoading}
              disabled={ticket.validated ? true : false}
              style={{
                backgroundColor: ticket.validated ? '#f6ffed' : 'white',
                ...(ticket.validated && { borderColor: '#b7eb8f' }),
                width: 24,
                height: 24,
                color: ticket.validated ? '#389e0d' : '#383838',
              }}
              icon={ticket.validated ? <CheckOutlined /> : <ScanOutlined />}
            />
          </Popconfirm>
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

  const handleRemoveTicket = (id: string, pc = false) => {
    if (pc) {
      const ticks = tickets.slice().reverse();
      const index = ticks.findIndex((item: any) => item.pc.id == id);
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
      tickets.filter((ticket) => ticket.pc.id == item.id).length <
      data?.response.priceCategories.counts[index]
    ) {
      const ticket = {
        id: uuidv4(),
        pc: item,
        pcPrice: item.price,
        price: item.price,
      };
      setTickets([...tickets, ticket]);
    }
  };

  const handleAction = () => {
    if (tickets.length < 1) {
      return;
    }
    const ticketsToCreate = [];
    if (event?.template.venue.hasSeats) {
      for (const ticket of tickets) {
        if (ticket.reserved) {
          return;
        }
        ticketsToCreate.push({
          price: ticket.price,
          userId: user ? user.id : null,
          customEmail: customEmail ? customEmail : user ? user.email : null,
          discountId: ticket.discount ? ticket.discount.id : null,
          discount: ticket.discount ? ticket.discount.name : null,
          seatId: ticket.seatId,
          seat: ticket.seatNumber,
          rowId: ticket.rowId,
          row: ticket.rowName,
          eventId: event.id,
          sectionId: ticket.sectionId,
          section: ticket.sectionName,
          businessId: business?.id,
        });
      }
    } else {
      for (const ticket of tickets) {
        ticketsToCreate.push({
          price: ticket.price,
          userId: user ? user.id : null,
          customEmail: customEmail ? customEmail : null,
          discountId: ticket.discount ? ticket.discount.id : null,
          eventId: event?.id,
          sectionId: ticket.pc.section.id,
          section: ticket.pc.section.name,
          businessId: business?.id,
        });
      }
    }
    mutate({
      values: {
        tickets: ticketsToCreate,
        order: {
          total: total,
          userId: user ? user.id : null,
          businessId: business?.id,
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
            {isFetching ? (
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Spin />
              </Flex>
            ) : !event ? (
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Flex>
            ) : event?.template.venue?.hasSeats ? (
              <SeatReservation
                eventData={event}
                setTickets={setTickets}
                tickets={tickets}
                removed={removed}
              />
            ) : (
              <Flex vertical gap={20} style={{ width: '100%', height: '100%' }}>
                {data?.response.priceCategories ? (
                  data?.response.priceCategories.nodes.map(
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
                          <Flex style={{ width: '100%' }} wrap>
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
                              <Text>{`${item.price} ${business?.currency}`}</Text>
                            </Flex>
                          </Flex>
                          <Flex gap={30} justify="space-between" align="center">
                            <MinusOutlined
                              style={{ marginTop: 2, marginLeft: 4 }}
                              onClick={() => handleRemoveTicket(item.id, true)}
                            />
                            <Text style={{ width: 10 }}>
                              {
                                tickets.filter(
                                  (ticket) => ticket.pc.id == item.id,
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
                          <Text>{`${data?.response.priceCategories.counts[index]} available`}</Text>
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
                {isFetching ? (
                  <SelectSkeleton width={'100%'} />
                ) : (
                  <Select
                    allowClear
                    style={{ width: '100%' }}
                    showSearch
                    placeholder="Select event"
                    value={event?.id}
                    filterOption={(input, option) =>
                      String(option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    defaultValue={event?.id}
                    options={data?.response.events
                      ?.slice()
                      ?.sort((a: Event, b: Event) =>
                        a.name.localeCompare(b.name),
                      )
                      ?.map((event: Event) => ({
                        label: `${event.name} (${dayjs(event.date).format('DD. MM. YYYY - HH:mm')})`,
                        value: event.id,
                      }))}
                    onChange={handleEventChange}
                  />
                )}
              </Flex>
              <Flex justify="flex-start" align="center">
                <Text style={{ width: '20%', fontWeight: 600 }}>User</Text>
                {isFetching ? (
                  <SelectSkeleton width={'100%'} />
                ) : (
                  <Select
                    mode="tags"
                    allowClear
                    style={{ width: '100%' }}
                    showSearch
                    placeholder="Select user or enter email"
                    filterOption={(input, option) =>
                      String(option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={user ? [user.id] : customEmail ? [customEmail] : []}
                    options={data?.response.users
                      ?.slice()
                      ?.sort((a: User, b: User) =>
                        a.lastName.localeCompare(b.lastName),
                      )
                      ?.map((customer: User) => ({
                        label: `${customer.lastName} ${customer.firstName} (${customer.email})`,
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
                          key={item.id}
                          vertical
                          style={{
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                            padding: 10,
                            borderRadius: 5,
                          }}
                        >
                          <Flex justify="space-between">
                            {event?.template.venue?.hasSeats ? (
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
                                    <Text>{`Price: ${item.price ? item.price : item.pcPrice} ${business?.currency}`}</Text>
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
                                <Text>{`Section: ${item.pc.section.name}`}</Text>
                                <Text>{`Price: ${item.price} ${business?.currency}`}</Text>
                              </Flex>
                            )}
                            <CloseOutlined
                              style={{ marginTop: 2 }}
                              onClick={() => {
                                handleRemoveTicket(item.id);
                              }}
                            />
                          </Flex>
                          {!event?.template.venue?.hasSeats ||
                          (event?.template.venue?.hasSeats &&
                            !item.reserved) ? (
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
                      <Text>{`${total} ${business?.currency}`}</Text>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Card>
          <Flex justify="flex-end" style={{ marginTop: 10 }}>
            <SaveButton
              loading={mutationLoading}
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleAction}
            >
              {tickets[0]
                ? (tickets[0] as any).reserve && event?.template.venue?.hasSeats
                  ? 'Remove tickets'
                  : 'Create tickets'
                : 'Create tickets'}
            </SaveButton>
          </Flex>
        </Col>
      </Row>
    </React.Fragment>
  );
};
