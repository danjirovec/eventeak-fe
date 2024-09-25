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
        category
        created
        name
        length
        description
        posterUrl
        language
        subtitles
        date
        eventTemplate {
          id
        }
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
          firstName
          lastName
          created
          birthDate
          placeOfResidence
        }
      }
    }
    # memberships(filter: $filter, paging: $paging) {
    #   nodes {
    #     id
    #     points
    #     expiryDate
    #     user {
    #       id
    #     }
    #     membershipType {
    #       id
    #       name
    #     }
    #   }
    # }
  }
`;

// Query to get counts
export const COUNTS_QUERY = gql`
  query Counts($meta: String!) {
    businessCounts(meta: $meta) {
      customers
      events
      memberships
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
        venue {
          id
          name
        }
      }
    }
  }
`;

export const EVENT_PRICE_CATEGORY_QUERY = gql`
  query EventPriceCategoryList(
    $filter: EventPriceCategoryFilter!
    $sorting: [EventPriceCategorySort!]
    $paging: OffsetPaging!
  ) {
    eventPriceCategories(filter: $filter, sorting: $sorting, paging: $paging) {
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
      }
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
          firstName
          lastName
        }
        business {
          id
        }
      }
      totalCount
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
          row
          seat
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
        }
        user {
          id
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
    $filter: EventTemplateFilter!
    $sorting: [EventTemplateSort!]
    $paging: OffsetPaging!
  ) {
    eventTemplates(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        id
        category
        created
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
    userBusinesses(
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
      }
    }
  }
`;
