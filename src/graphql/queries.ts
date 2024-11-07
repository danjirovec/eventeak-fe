import gql from 'graphql-tag';

// Query to get events
export const EVENTS_QUERY = gql`
  query EventsList(
    $filter: EventFilter!
    $sorting: [EventSort!]
    $paging: OffsetPaging!
  ) {
    events(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        template {
          id
          type
          name
          category
          description
          subtitles
          posterUrl
          length
          language
          venue {
            id
            name
            hasSeats
          }
        }
        created
        updated
        name
        date
        business {
          id
          name
        }
        seatMap
      }
      totalCount
    }
  }
`;

// Query to get event checkout data
export const EVENT_CHECKOUT_QUERY = gql`
  query EventCheckoutList($meta: String!) {
    getEventCheckout(meta: $meta) {
      tickets {
        id
        price
        validated
        user {
          id
          firstName
          lastName
          email
        }
        event {
          id
          name
          seatMap
          template {
            id
            name
            venue {
              id
              name
              hasSeats
            }
          }
        }
        seat {
          id
          name
        }
        section {
          id
          name
        }
        discount {
          id
          name
        }
      }
      priceCategories {
        nodes {
          id
          name
          startDate
          endDate
          section {
            id
            name
          }
          price
        }
        counts
      }
      events {
        id
        name
        seatMap
        template {
          id
          name
          venue {
            id
            name
            hasSeats
          }
        }
        date
      }
      users {
        id
        firstName
        lastName
        email
      }
      discounts {
        id
        name
        percentage
      }
    }
  }
`;

// Query to get customers
export const CUSTOMERS_QUERY = gql`
  query CustomersList(
    $filter: BusinessUserFilter!
    $sorting: [BusinessUserSort!]
    $paging: OffsetPaging!
  ) {
    businessUsers(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        user {
          id
          email
          avatarUrl
          firstName
          lastName
          created
          birthDate
          placeOfResidence
        }
      }
    }
  }
`;

// Query to get business metrics
export const BUSINESS_METRICS_QUERY = gql`
  query BusinessMetrics($meta: String!) {
    getBusinessMetrics(meta: $meta) {
      customers
      events
      memberships
      tickets
    }
  }
`;

// Query to get venues
export const VENUES_QUERY = gql`
  query VenuesList(
    $filter: VenueFilter!
    $sorting: [VenueSort!]
    $paging: OffsetPaging!
  ) {
    venues(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        capacity
        buildingNumber
        city
        street
        created
        hasSeats
        business {
          id
        }
      }
      totalCount
    }
  }
`;

// Query to get sections
export const SECTIONS_QUERY = gql`
  query SectionsList(
    $filter: SectionFilter!
    $sorting: [SectionSort!]
    $paging: OffsetPaging!
  ) {
    sections(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        capacity
        venue {
          id
          name
        }
      }
    }
  }
`;

// Query to get event price categories
export const PRICE_CATEGORY_QUERY = gql`
  query PriceCategoryList(
    $filter: PriceCategoryFilter!
    $sorting: [PriceCategorySort!]
    $paging: OffsetPaging!
  ) {
    priceCategories(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        price
        startDate
        endDate
        section {
          id
          name
        }
        template {
          id
          name
        }
      }
      totalCount
    }
  }
`;

// Query to get benefits
export const BENEFITS_QUERY = gql`
  query BenefitsList(
    $filter: BenefitFilter!
    $sorting: [BenefitSort!]
    $paging: OffsetPaging!
  ) {
    benefits(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        description
        points
        membershipType {
          id
          name
        }
        expiryDate
        created
        business {
          id
        }
      }
      totalCount
    }
  }
`;

// Query to get discounts
export const DISCOUNTS_QUERY = gql`
  query DiscountsList(
    $filter: DiscountFilter!
    $sorting: [DiscountSort!]
    $paging: OffsetPaging!
  ) {
    discounts(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        percentage
        business {
          id
        }
      }
      totalCount
    }
  }
`;

// Query to get template discounts
export const TEMPLATE_DISCOUNTS_QUERY = gql`
  query TemplateDiscountsList(
    $filter: TemplateDiscountFilter!
    $sorting: [TemplateDiscountSort!]
    $paging: OffsetPaging!
  ) {
    templateDiscounts(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        discount {
          id
          name
          percentage
        }
        template {
          id
          name
        }
      }
    }
  }
`;

// Query to get orders
export const ORDERS_QUERY = gql`
  query OrdersList(
    $filter: OrderFilter!
    $sorting: [OrderSort!]
    $paging: OffsetPaging!
  ) {
    orders(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        total
        user {
          id
          email
          firstName
          lastName
        }
        business {
          id
        }
        created
      }
      totalCount
    }
  }
`;

// Query to get orders graph
export const ORDERS_GRAPH = gql`
  query OrdersGraph($meta: String!) {
    getOrderTotals(meta: $meta) {
      date
      total
    }
  }
`;

// Query to get tickets
export const TICKETS_QUERY = gql`
  query TicketsList(
    $filter: TicketFilter!
    $sorting: [TicketSort!]
    $paging: OffsetPaging!
  ) {
    tickets(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        price
        validated
        discount {
          id
          name
        }
        user {
          id
          email
          firstName
          lastName
        }
        event {
          id
          name
          date
        }
        seat {
          id
          name
        }
        row {
          id
          name
        }
        section {
          id
          name
        }
        order {
          id
        }
        created
      }
      totalCount
    }
  }
`;

// Query to get businesses
export const BUSINESSES_QUERY = gql`
  query BusinessesList(
    $filter: BusinessFilter!
    $sorting: [BusinessSort!]
    $paging: OffsetPaging!
  ) {
    businesses(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        apiKey
        logoUrl
        currency
      }
    }
  }
`;

// Query to get memberships
export const MEMBERSHIPS_QUERY = gql`
  query MembershipsList(
    $filter: MembershipFilter!
    $sorting: [MembershipSort!]
    $paging: OffsetPaging!
  ) {
    memberships(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        points
        expiryDate
        user {
          id
          email
        }
        membershipType {
          id
          name
        }
        business {
          id
        }
      }
    }
  }
`;

// Query to get membership types
export const MEMBERSHIP_TYPE_QUERY = gql`
  query MembershipTypeList(
    $filter: MembershipTypeFilter!
    $sorting: [MembershipTypeSort!]
    $paging: OffsetPaging!
  ) {
    membershipTypes(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        name
        description
      }
    }
  }
`;

// Query to get user business users
export const USER_BUSINESSES_QUERY = gql`
  query UserBusinessesList(
    $filter: BusinessUserFilter!
    $sorting: [BusinessUserSort!]
    $paging: OffsetPaging!
  ) {
    businessUsers(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        business {
          id
          name
          currency
        }
        user {
          id
          email
          firstName
          lastName
          defaultBusiness {
            id
            name
          }
        }
      }
    }
  }
`;

// Query to get benefits
export const TEMPLATES_QUERY = gql`
  query TemplatesList(
    $filter: TemplateFilter!
    $sorting: [TemplateSort!]
    $paging: OffsetPaging!
  ) {
    templates(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        category
        created
        updated
        name
        length
        type
        language
        subtitles
        posterUrl
        description
        business {
          id
        }
        venue {
          id
          name
        }
      }
      totalCount
    }
  }
`;

// Query to get user
export const USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
      avatarUrl
      placeOfResidence
      defaultBusiness {
        id
        name
      }
    }
  }
`;

// Query to get businesses for current user
export const CUSTOM_BUSINESSES_QUERY = gql`
  query CustomBusinessesList(
    $filter: BusinessFilter!
    $sorting: [BusinessSort!]
    $paging: OffsetPaging!
    $meta: String!
  ) {
    getUserBusinesses(
      filter: $filter
      sorting: $sorting
      paging: $paging
      meta: $meta
    ) {
      nodes {
        id
        name
        apiKey
        logoUrl
        currency
      }
    }
  }
`;
