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
      id
      name
      created
      seatMap
      template {
        id
        name
        type
        category
        subtitles
        language
        description
        length
        posterUrl
        venue {
          id
          name
          hasSeats
        }
      }
      date
      business {
        id
      }
    }
  }
`;

// Mutation to create template
export const CREATE_TEMPLATE_MUTATION = gql`
  mutation CreateTemplate($input: CreateTemplate!) {
    createTemplate(input: $input) {
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
      membershipType {
        id
        name
      }
      points
      expiryDate
      business {
        id
      }
    }
  }
`;

// Mutation to create membership
export const CREATE_MEMBERSHIP_MUTATION = gql`
  mutation CreateMembership($input: CreateMembership!) {
    createMembership(input: $input) {
      membershipType {
        id
        name
      }
      user {
        id
        email
      }
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

// Mutation to create user benefit
export const CREATE_USER_BENEFIT_MUTATION = gql`
  mutation CreateUserBenefit($input: CreateOneUserBenefitInput!) {
    createOneUserBenefit(input: $input) {
      user {
        id
        email
      }
      benefit {
        id
        name
      }
      business {
        id
        name
      }
    }
  }
`;

// Mutation to create membership type
export const CREATE_MEMBERSHIP_TYPE_MUTATION = gql`
  mutation CreateMembershipType($input: CreateOneMembershipTypeInput!) {
    createOneMembershipType(input: $input) {
      name
      description
      pointsPerTicket
      price
      business {
        id
      }
    }
  }
`;

// Mutation to create business
export const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness($input: CreateBusiness!) {
    createBusiness(input: $input) {
      name
      logoUrl
      currency
    }
  }
`;

// Mutation to create venue
export const CREATE_VENUE_MUTATION = gql`
  mutation CreateVenue($input: CreateVenue!) {
    createVenue(input: $input) {
      name
      capacity
      buildingNumber
      city
      street
      hasSeats
      business {
        id
      }
      seatMap
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
      id
      price
      validated
      order {
        id
      }
      discount {
        id
        name
      }
      section {
        id
        name
      }
      seat {
        id
        name
      }
      row {
        id
        name
      }
      user {
        id
        firstName
        lastName
        email
      }
      event {
        id
        name
        date
      }
    }
  }
`;

// Mutation to create business
export const UPDATE_BUSINESS_MUTATION = gql`
  mutation UpdateBusiness($input: UpdateOneBusinessInput!) {
    updateOneBusiness(input: $input) {
      id
      name
      logoUrl
      currency
    }
  }
`;

// Mutation to update user
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateOneUserInput!) {
    updateOneUser(input: $input) {
      email
      birthDate
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

// Mutation to update password
export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdateUserPassword($input: UpdatePassword!) {
    updatePassword(input: $input)
  }
`;

// Mutation to update send mail
export const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail($input: BatchUserEmail!) {
    sendEmail(input: $input)
  }
`;

// Mutation to update event
export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($input: UpdateEvent!) {
    updateEvent(input: $input) {
      id
      name
      template {
        id
        name
        category
        language
        subtitles
        description
        length
        posterUrl
        venue {
          id
          name
        }
      }
      date
      seatMap
      business {
        id
        name
      }
      seatMap
    }
  }
`;

// Mutation to update venue
export const UPDATE_VENUE_MUTATION = gql`
  mutation UpdateVenue($input: UpdateVenue!) {
    updateVenue(input: $input) {
      hasSeats
      id
      name
      capacity
      buildingNumber
      city
      street
    }
  }
`;

// Mutation to update event template
export const UPDATE_TEMPLATE_MUTATION = gql`
  mutation UpdateTemplate($input: UpdateTemplate!) {
    updateTemplate(input: $input) {
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
      membershipType {
        id
        name
      }
      points
      expiryDate
    }
  }
`;

// Mutation to update membership
export const UPDATE_MEMBERSHIP_MUTATION = gql`
  mutation UpdateMembership($input: UpdateOneMembershipInput!) {
    updateOneMembership(input: $input) {
      id
      membershipType {
        id
        name
      }
      user {
        id
        email
        firstName
        lastName
      }
      points
      expiryDate
      business {
        id
        name
      }
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

// Mutation to update order
export const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrder($input: UpdateOneOrderInput!) {
    updateOneOrder(input: $input) {
      id
      user {
        id
        email
        firstName
        lastName
      }
      total
      business {
        id
        name
      }
    }
  }
`;

// Mutation to update membership type
export const UPDATE_MEMBERSHIP_TYPE_MUTATION = gql`
  mutation UpdateMembershipType($input: UpdateOneMembershipTypeInput!) {
    updateOneMembershipType(input: $input) {
      name
      description
      price
      pointsPerTicket
      business {
        id
      }
    }
  }
`;

export const CREATE_TICKETS_CHECKOUT = gql`
  mutation CreateTickets($input: CreateTicketOrder!) {
    createTickets(input: $input) {
      id
      name
      date
      seatMap
      template {
        id
        name
        category
        business {
          id
          name
        }
        length
        venue {
          id
          name
          hasSeats
        }
      }
    }
  }
`;
