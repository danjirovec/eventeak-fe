import gql from 'graphql-tag';

// Mutation to create user
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateOneUserInput!) {
    createOneUser(input: $input) {
      email
      firstName
      lastName
      placeOfResidence
      birthDate
    }
  }
`;

// Mutation to create event
export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: CreateEvent!) {
    createEvent(input: $input) {
      name
      category
      venue {
        id
      }
      length
      date
      description
      eventTemplate {
        id
        name
      }
      language
      subtitles
      business {
        id
      }
      posterUrl
    }
  }
`;

// Mutation to create template
export const CREATE_TEMPLATE_MUTATION = gql`
  mutation CreateTemplate($input: CreateEventTemplate!) {
    createEventTemplateAndEventPriceCategory(input: $input) {
      name
      category
      venue {
        id
      }
      type
      length
      description
      language
      subtitles
      business {
        id
      }
      posterUrl
    }
  }
`;

// Mutation to create benefit
export const CREATE_BENEFIT_MUTATION = gql`
  mutation CreateBenefit($input: CreateOneBenefitInput!) {
    createOneBenefit(input: $input) {
      name
      description
      points
      expiryDate
      business {
        id
      }
    }
  }
`;

// Mutation to create discount
export const CREATE_DISCOUNT_MUTATION = gql`
  mutation CreateDiscount($input: CreateOneDiscountInput!) {
    createOneDiscount(input: $input) {
      name
      percentage
      business {
        id
      }
    }
  }
`;

// Mutation to create membership type
export const CREATE_MEMBERSHIP_TYPE_MUTATION = gql`
  mutation CreateMembershipType($input: CreateOneMembershipTypeInput!) {
    createOneMembershipType(input: $input) {
      name
      business {
        id
      }
    }
  }
`;

// Mutation to create business
export const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness($input: CreateBusiness!) {
    createBusinessAndBusinessUserAdmin(input: $input) {
      name
      apiKey
      logoUrl
    }
  }
`;

// Mutation to create venue
export const CREATE_VENUE_MUTATION = gql`
  mutation CreateVenue($input: CreateVenue!) {
    createVenueWithSeats(input: $input) {
      name
      capacity
      buildingNumber
      city
      street
      hasSeats
      business {
        id
      }
      data
    }
  }
`;

// Mutation to create ticket
export const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicket($input: CreateOneTicketInput!) {
    createOneTicket(input: $input) {
      price
      validated
      order {
        id
      }
      discount {
        id
      }
      seat {
        id
      }
      user {
        id
      }
      event {
        id
      }
    }
  }
`;

// Mutation to update ticket
export const UPDATE_TICKET_MUTATION = gql`
  mutation UpdateTicket($input: UpdateOneTicketInput!) {
    updateOneTicket(input: $input) {
      price
      validated
      order {
        id
      }
      discount {
        id
      }
      seat {
        id
      }
      user {
        id
      }
      event {
        id
      }
    }
  }
`;

// Mutation to create business
export const UPDATE_BUSINESS_MUTATION = gql`
  mutation UpdateBusiness($input: UpdateOneBusinessInput!) {
    updateOneBusiness(input: $input) {
      name
      logoUrl
    }
  }
`;

// Mutation to update user
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      email
      firstName
      lastName
      placeOfResidence
      defaultBusiness {
        id
        name
      }
    }
  }
`;

// Mutation to update user password
export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation UpdateUserPassword($input: UpdateUserPassword!) {
    updateUserPassword(input: $input)
  }
`;

// Mutation to update event
export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($input: UpdateEvent!) {
    updateEvent(input: $input) {
      id
      name
      category
      date
      venue {
        id
        name
      }
      eventTemplate {
        id
        name
      }
      length
      description
      subtitles
      language
      business {
        id
        name
      }
      posterUrl
    }
  }
`;

// Mutation to update event
export const UPDATE_TEMPLATE_MUTATION = gql`
  mutation UpdateTemplate($input: UpdateEventTemplate!) {
    updateEventTemplateAndEventPriceCategory(input: $input) {
      id
      name
      category
      venue {
        id
        name
      }
      type
      length
      subtitles
      description
      language
      business {
        id
        name
      }
      posterUrl
    }
  }
`;

// Mutation to update benefit
export const UPDATE_BENEFIT_MUTATION = gql`
  mutation UpdateBenefit($input: UpdateOneBenefitInput!) {
    updateOneBenefit(input: $input) {
      id
      name
      description
      points
      expiryDate
    }
  }
`;

// Mutation to update discount
export const UPDATE_DISCOUNT_MUTATION = gql`
  mutation UpdateDiscount($input: UpdateOneDiscountInput!) {
    updateOneDiscount(input: $input) {
      id
      name
      percentage
    }
  }
`;

// Mutation to update membership type
export const UPDATE_MEMBERSHIP_TYPE_MUTATION = gql`
  mutation UpdateMembershipType($input: UpdateOneMembershipTypeInput!) {
    updateOneMembershipType(input: $input) {
      name
      business {
        id
      }
    }
  }
`;
