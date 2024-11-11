import type * as Types from './schema.types';

export type CreateUserMutationVariables = Types.Exact<{
  input: Types.CreateOneUserInput;
}>;

export type CreateUserMutation = {
  createOneUser: Pick<
    Types.User,
    'email' | 'firstName' | 'lastName' | 'placeOfResidence' | 'birthDate'
  >;
};

export type CreateEventMutationVariables = Types.Exact<{
  input: Types.CreateEvent;
}>;

export type CreateEventMutation = {
  createEvent: Pick<
    Types.Event,
    'id' | 'name' | 'created' | 'seatMap' | 'date'
  > & {
    template: Pick<
      Types.Template,
      | 'id'
      | 'name'
      | 'type'
      | 'category'
      | 'subtitles'
      | 'language'
      | 'description'
      | 'length'
      | 'posterUrl'
    > & { venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'> };
    business: Pick<Types.Business, 'id'>;
  };
};

export type CreateTemplateMutationVariables = Types.Exact<{
  input: Types.CreateTemplate;
}>;

export type CreateTemplateMutation = {
  createTemplate: Pick<
    Types.Template,
    | 'name'
    | 'category'
    | 'type'
    | 'length'
    | 'description'
    | 'language'
    | 'subtitles'
    | 'posterUrl'
  > & { venue: Pick<Types.Venue, 'id'>; business: Pick<Types.Business, 'id'> };
};

export type CreateBenefitMutationVariables = Types.Exact<{
  input: Types.CreateOneBenefitInput;
}>;

export type CreateBenefitMutation = {
  createOneBenefit: Pick<
    Types.Benefit,
    'name' | 'description' | 'points' | 'expiryDate'
  > & {
    membershipType?: Types.Maybe<Pick<Types.MembershipType, 'id' | 'name'>>;
    business: Pick<Types.Business, 'id'>;
  };
};

export type CreateMembershipMutationVariables = Types.Exact<{
  input: Types.CreateOneMembershipInput;
}>;

export type CreateMembershipMutation = {
  createOneMembership: Pick<Types.Membership, 'points' | 'expiryDate'> & {
    membershipType: Pick<Types.MembershipType, 'id' | 'name'>;
    user: Pick<Types.User, 'id' | 'email'>;
    business: Pick<Types.Business, 'id'>;
  };
};

export type CreateDiscountMutationVariables = Types.Exact<{
  input: Types.CreateOneDiscountInput;
}>;

export type CreateDiscountMutation = {
  createOneDiscount: Pick<Types.Discount, 'name' | 'percentage'> & {
    business: Pick<Types.Business, 'id'>;
  };
};

export type CreateUserBenefitMutationVariables = Types.Exact<{
  input: Types.CreateOneUserBenefitInput;
}>;

export type CreateUserBenefitMutation = {
  createOneUserBenefit: {
    user: Pick<Types.User, 'id' | 'email'>;
    benefit: Pick<Types.Benefit, 'id' | 'name'>;
    business: Pick<Types.Business, 'id' | 'name'>;
  };
};

export type CreateMembershipTypeMutationVariables = Types.Exact<{
  input: Types.CreateOneMembershipTypeInput;
}>;

export type CreateMembershipTypeMutation = {
  createOneMembershipType: Pick<
    Types.MembershipType,
    'name' | 'description'
  > & { business: Pick<Types.Business, 'id'> };
};

export type CreateBusinessMutationVariables = Types.Exact<{
  input: Types.CreateBusiness;
}>;

export type CreateBusinessMutation = {
  createBusiness: Pick<
    Types.Business,
    'name' | 'apiKey' | 'logoUrl' | 'currency'
  >;
};

export type CreateVenueMutationVariables = Types.Exact<{
  input: Types.CreateVenue;
}>;

export type CreateVenueMutation = {
  createVenue: Pick<
    Types.Venue,
    | 'name'
    | 'capacity'
    | 'buildingNumber'
    | 'city'
    | 'street'
    | 'hasSeats'
    | 'seatMap'
  > & { business: Pick<Types.Business, 'id'> };
};

export type CreateTicketMutationVariables = Types.Exact<{
  input: Types.CreateOneTicketInput;
}>;

export type CreateTicketMutation = {
  createOneTicket: Pick<Types.Ticket, 'price' | 'validated'> & {
    order?: Types.Maybe<Pick<Types.Order, 'id'>>;
    discount?: Types.Maybe<Pick<Types.Discount, 'id'>>;
    seat?: Types.Maybe<Pick<Types.Seat, 'id'>>;
    user?: Types.Maybe<Pick<Types.User, 'id'>>;
    event: Pick<Types.Event, 'id'>;
  };
};

export type UpdateTicketMutationVariables = Types.Exact<{
  input: Types.UpdateOneTicketInput;
}>;

export type UpdateTicketMutation = {
  updateOneTicket: Pick<Types.Ticket, 'id' | 'price' | 'validated'> & {
    order?: Types.Maybe<Pick<Types.Order, 'id'>>;
    discount?: Types.Maybe<Pick<Types.Discount, 'id' | 'name'>>;
    section: Pick<Types.Section, 'id' | 'name'>;
    seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'name'>>;
    row?: Types.Maybe<Pick<Types.Row, 'id' | 'name'>>;
    user?: Types.Maybe<
      Pick<Types.User, 'id' | 'firstName' | 'lastName' | 'email'>
    >;
    event: Pick<Types.Event, 'id' | 'name' | 'date'>;
  };
};

export type UpdateBusinessMutationVariables = Types.Exact<{
  input: Types.UpdateOneBusinessInput;
}>;

export type UpdateBusinessMutation = {
  updateOneBusiness: Pick<
    Types.Business,
    'id' | 'name' | 'logoUrl' | 'currency'
  >;
};

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateOneUserInput;
}>;

export type UpdateUserMutation = {
  updateOneUser: Pick<
    Types.User,
    | 'email'
    | 'birthDate'
    | 'firstName'
    | 'lastName'
    | 'avatarUrl'
    | 'placeOfResidence'
  > & { defaultBusiness?: Types.Maybe<Pick<Types.Business, 'id' | 'name'>> };
};

export type UpdateUserPasswordMutationVariables = Types.Exact<{
  input: Types.UpdatePassword;
}>;

export type UpdateUserPasswordMutation = Pick<Types.Mutation, 'updatePassword'>;

export type SendEmailMutationVariables = Types.Exact<{
  input: Types.BatchUserEmail;
}>;

export type SendEmailMutation = Pick<Types.Mutation, 'sendEmail'>;

export type UpdateEventMutationVariables = Types.Exact<{
  input: Types.UpdateEvent;
}>;

export type UpdateEventMutation = {
  updateEvent: Pick<Types.Event, 'id' | 'name' | 'date' | 'seatMap'> & {
    template: Pick<
      Types.Template,
      | 'id'
      | 'name'
      | 'category'
      | 'language'
      | 'subtitles'
      | 'description'
      | 'length'
      | 'posterUrl'
    > & { venue: Pick<Types.Venue, 'id' | 'name'> };
    business: Pick<Types.Business, 'id' | 'name'>;
  };
};

export type UpdateVenueMutationVariables = Types.Exact<{
  input: Types.UpdateVenue;
}>;

export type UpdateVenueMutation = {
  updateVenue: Pick<
    Types.Venue,
    | 'hasSeats'
    | 'id'
    | 'name'
    | 'capacity'
    | 'buildingNumber'
    | 'city'
    | 'street'
  >;
};

export type UpdateTemplateMutationVariables = Types.Exact<{
  input: Types.UpdateTemplate;
}>;

export type UpdateTemplateMutation = {
  updateTemplate: Pick<
    Types.Template,
    | 'id'
    | 'name'
    | 'category'
    | 'type'
    | 'length'
    | 'subtitles'
    | 'description'
    | 'language'
    | 'posterUrl'
  > & {
    venue: Pick<Types.Venue, 'id' | 'name'>;
    business: Pick<Types.Business, 'id' | 'name'>;
  };
};

export type UpdateBenefitMutationVariables = Types.Exact<{
  input: Types.UpdateOneBenefitInput;
}>;

export type UpdateBenefitMutation = {
  updateOneBenefit: Pick<
    Types.Benefit,
    'id' | 'name' | 'description' | 'points' | 'expiryDate'
  > & {
    membershipType?: Types.Maybe<Pick<Types.MembershipType, 'id' | 'name'>>;
  };
};

export type UpdateMembershipMutationVariables = Types.Exact<{
  input: Types.UpdateOneMembershipInput;
}>;

export type UpdateMembershipMutation = {
  updateOneMembership: Pick<
    Types.Membership,
    'id' | 'points' | 'expiryDate'
  > & {
    membershipType: Pick<Types.MembershipType, 'id' | 'name'>;
    user: Pick<Types.User, 'id' | 'email' | 'firstName' | 'lastName'>;
    business: Pick<Types.Business, 'id' | 'name'>;
  };
};

export type UpdateDiscountMutationVariables = Types.Exact<{
  input: Types.UpdateOneDiscountInput;
}>;

export type UpdateDiscountMutation = {
  updateOneDiscount: Pick<Types.Discount, 'id' | 'name' | 'percentage'>;
};

export type UpdateOrderMutationVariables = Types.Exact<{
  input: Types.UpdateOneOrderInput;
}>;

export type UpdateOrderMutation = {
  updateOneOrder: Pick<Types.Order, 'id' | 'total'> & {
    user?: Types.Maybe<
      Pick<Types.User, 'id' | 'email' | 'firstName' | 'lastName'>
    >;
    business: Pick<Types.Business, 'id' | 'name'>;
  };
};

export type UpdateMembershipTypeMutationVariables = Types.Exact<{
  input: Types.UpdateOneMembershipTypeInput;
}>;

export type UpdateMembershipTypeMutation = {
  updateOneMembershipType: Pick<
    Types.MembershipType,
    'name' | 'description'
  > & { business: Pick<Types.Business, 'id'> };
};

export type CreateTicketsMutationVariables = Types.Exact<{
  input: Types.CreateTicketOrder;
}>;

export type CreateTicketsMutation = {
  createTickets: Pick<Types.Event, 'id' | 'name' | 'date' | 'seatMap'> & {
    template: Pick<Types.Template, 'id' | 'name' | 'category' | 'length'> & {
      business: Pick<Types.Business, 'id' | 'name'>;
      venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'>;
    };
  };
};

export type EventsListQueryVariables = Types.Exact<{
  filter: Types.EventFilter;
  sorting?: Types.InputMaybe<Array<Types.EventSort> | Types.EventSort>;
  paging: Types.OffsetPaging;
}>;

export type EventsListQuery = {
  events: Pick<Types.EventConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.Event,
        'id' | 'created' | 'updated' | 'name' | 'date' | 'seatMap'
      > & {
        template: Pick<
          Types.Template,
          | 'id'
          | 'type'
          | 'name'
          | 'category'
          | 'description'
          | 'subtitles'
          | 'posterUrl'
          | 'length'
          | 'language'
        > & { venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'> };
        business: Pick<Types.Business, 'id' | 'name'>;
      }
    >;
  };
};

export type EventCheckoutListQueryVariables = Types.Exact<{
  meta: Types.Scalars['String']['input'];
}>;

export type EventCheckoutListQuery = {
  getEventCheckout: {
    tickets?: Types.Maybe<
      Array<
        Pick<Types.Ticket, 'id' | 'price' | 'validated'> & {
          user?: Types.Maybe<
            Pick<Types.User, 'id' | 'firstName' | 'lastName' | 'email'>
          >;
          event: Pick<Types.Event, 'id' | 'name' | 'seatMap'> & {
            template: Pick<Types.Template, 'id' | 'name'> & {
              venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'>;
            };
          };
          seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'name'>>;
          section: Pick<Types.Section, 'id' | 'name'>;
          discount?: Types.Maybe<Pick<Types.Discount, 'id' | 'name'>>;
        }
      >
    >;
    priceCategories?: Types.Maybe<
      Pick<Types.PriceCategoryAvailable, 'counts'> & {
        nodes: Array<
          Pick<
            Types.PriceCategory,
            'id' | 'name' | 'startDate' | 'endDate' | 'price'
          > & { section: Pick<Types.Section, 'id' | 'name'> }
        >;
      }
    >;
    events: Array<
      Pick<Types.Event, 'id' | 'name' | 'seatMap' | 'date'> & {
        template: Pick<Types.Template, 'id' | 'name'> & {
          venue: Pick<Types.Venue, 'id' | 'name' | 'hasSeats'>;
        };
      }
    >;
    users: Array<Pick<Types.User, 'id' | 'firstName' | 'lastName' | 'email'>>;
    discounts?: Types.Maybe<
      Array<Pick<Types.Discount, 'id' | 'name' | 'percentage'>>
    >;
  };
};

export type CustomersListQueryVariables = Types.Exact<{
  filter: Types.BusinessUserFilter;
  sorting?: Types.InputMaybe<
    Array<Types.BusinessUserSort> | Types.BusinessUserSort
  >;
  paging: Types.OffsetPaging;
}>;

export type CustomersListQuery = {
  businessUsers: {
    nodes: Array<{
      user: Pick<
        Types.User,
        | 'id'
        | 'email'
        | 'avatarUrl'
        | 'firstName'
        | 'lastName'
        | 'created'
        | 'birthDate'
        | 'placeOfResidence'
      >;
    }>;
  };
};

export type BusinessMetricsQueryVariables = Types.Exact<{
  meta: Types.Scalars['String']['input'];
}>;

export type BusinessMetricsQuery = {
  getBusinessMetrics: Pick<
    Types.BusinessMetrics,
    'customers' | 'events' | 'memberships' | 'tickets'
  >;
};

export type VenuesListQueryVariables = Types.Exact<{
  filter: Types.VenueFilter;
  sorting?: Types.InputMaybe<Array<Types.VenueSort> | Types.VenueSort>;
  paging: Types.OffsetPaging;
}>;

export type VenuesListQuery = {
  venues: Pick<Types.VenueConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.Venue,
        | 'id'
        | 'name'
        | 'capacity'
        | 'buildingNumber'
        | 'city'
        | 'street'
        | 'created'
        | 'hasSeats'
      > & { business: Pick<Types.Business, 'id'> }
    >;
  };
};

export type SectionsListQueryVariables = Types.Exact<{
  filter: Types.SectionFilter;
  sorting?: Types.InputMaybe<Array<Types.SectionSort> | Types.SectionSort>;
  paging: Types.OffsetPaging;
}>;

export type SectionsListQuery = {
  sections: {
    nodes: Array<
      Pick<Types.Section, 'id' | 'name' | 'capacity'> & {
        venue: Pick<Types.Venue, 'id' | 'name'>;
      }
    >;
  };
};

export type PriceCategoryListQueryVariables = Types.Exact<{
  filter: Types.PriceCategoryFilter;
  sorting?: Types.InputMaybe<
    Array<Types.PriceCategorySort> | Types.PriceCategorySort
  >;
  paging: Types.OffsetPaging;
}>;

export type PriceCategoryListQuery = {
  priceCategories: Pick<Types.PriceCategoryConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.PriceCategory,
        'id' | 'name' | 'price' | 'startDate' | 'endDate'
      > & {
        section: Pick<Types.Section, 'id' | 'name'>;
        template: Pick<Types.Template, 'id' | 'name'>;
      }
    >;
  };
};

export type BenefitsListQueryVariables = Types.Exact<{
  filter: Types.BenefitFilter;
  sorting?: Types.InputMaybe<Array<Types.BenefitSort> | Types.BenefitSort>;
  paging: Types.OffsetPaging;
}>;

export type BenefitsListQuery = {
  benefits: Pick<Types.BenefitConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.Benefit,
        'id' | 'name' | 'description' | 'points' | 'expiryDate' | 'created'
      > & {
        membershipType?: Types.Maybe<Pick<Types.MembershipType, 'id' | 'name'>>;
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};

export type DiscountsListQueryVariables = Types.Exact<{
  filter: Types.DiscountFilter;
  sorting?: Types.InputMaybe<Array<Types.DiscountSort> | Types.DiscountSort>;
  paging: Types.OffsetPaging;
}>;

export type DiscountsListQuery = {
  discounts: Pick<Types.DiscountConnection, 'totalCount'> & {
    nodes: Array<
      Pick<Types.Discount, 'id' | 'name' | 'percentage'> & {
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};

export type TemplateDiscountsListQueryVariables = Types.Exact<{
  filter: Types.TemplateDiscountFilter;
  sorting?: Types.InputMaybe<
    Array<Types.TemplateDiscountSort> | Types.TemplateDiscountSort
  >;
  paging: Types.OffsetPaging;
}>;

export type TemplateDiscountsListQuery = {
  templateDiscounts: {
    nodes: Array<{
      discount: Pick<Types.Discount, 'id' | 'name' | 'percentage'>;
      template: Pick<Types.Template, 'id' | 'name'>;
    }>;
  };
};

export type OrdersListQueryVariables = Types.Exact<{
  filter: Types.OrderFilter;
  sorting?: Types.InputMaybe<Array<Types.OrderSort> | Types.OrderSort>;
  paging: Types.OffsetPaging;
}>;

export type OrdersListQuery = {
  orders: Pick<Types.OrderConnection, 'totalCount'> & {
    nodes: Array<
      Pick<Types.Order, 'id' | 'total' | 'created'> & {
        user?: Types.Maybe<
          Pick<Types.User, 'id' | 'email' | 'firstName' | 'lastName'>
        >;
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};

export type OrdersGraphQueryVariables = Types.Exact<{
  meta: Types.Scalars['String']['input'];
}>;

export type OrdersGraphQuery = {
  getOrderTotals: Array<Pick<Types.OrderGraph, 'date' | 'total'>>;
};

export type TicketsListQueryVariables = Types.Exact<{
  filter: Types.TicketFilter;
  sorting?: Types.InputMaybe<Array<Types.TicketSort> | Types.TicketSort>;
  paging: Types.OffsetPaging;
}>;

export type TicketsListQuery = {
  tickets: Pick<Types.TicketConnection, 'totalCount'> & {
    nodes: Array<
      Pick<Types.Ticket, 'id' | 'price' | 'validated' | 'created'> & {
        discount?: Types.Maybe<Pick<Types.Discount, 'id' | 'name'>>;
        user?: Types.Maybe<
          Pick<Types.User, 'id' | 'email' | 'firstName' | 'lastName'>
        >;
        event: Pick<Types.Event, 'id' | 'name' | 'date'>;
        seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'name'>>;
        row?: Types.Maybe<Pick<Types.Row, 'id' | 'name'>>;
        section: Pick<Types.Section, 'id' | 'name'>;
        order?: Types.Maybe<Pick<Types.Order, 'id'>>;
      }
    >;
  };
};

export type BusinessesListQueryVariables = Types.Exact<{
  filter: Types.BusinessFilter;
  sorting?: Types.InputMaybe<Array<Types.BusinessSort> | Types.BusinessSort>;
  paging: Types.OffsetPaging;
}>;

export type BusinessesListQuery = {
  businesses: {
    nodes: Array<
      Pick<Types.Business, 'id' | 'name' | 'apiKey' | 'logoUrl' | 'currency'>
    >;
  };
};

export type MembershipsListQueryVariables = Types.Exact<{
  filter: Types.MembershipFilter;
  sorting?: Types.InputMaybe<
    Array<Types.MembershipSort> | Types.MembershipSort
  >;
  paging: Types.OffsetPaging;
}>;

export type MembershipsListQuery = {
  memberships: {
    nodes: Array<
      Pick<Types.Membership, 'id' | 'points' | 'expiryDate'> & {
        user: Pick<Types.User, 'id' | 'email'>;
        membershipType: Pick<Types.MembershipType, 'id' | 'name'>;
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
};

export type MembershipTypeListQueryVariables = Types.Exact<{
  filter: Types.MembershipTypeFilter;
  sorting?: Types.InputMaybe<
    Array<Types.MembershipTypeSort> | Types.MembershipTypeSort
  >;
  paging: Types.OffsetPaging;
}>;

export type MembershipTypeListQuery = {
  membershipTypes: {
    nodes: Array<
      Pick<Types.MembershipType, 'id' | 'name' | 'price' | 'description'>
    >;
  };
};

export type UserBusinessesListQueryVariables = Types.Exact<{
  filter: Types.BusinessUserFilter;
  sorting?: Types.InputMaybe<
    Array<Types.BusinessUserSort> | Types.BusinessUserSort
  >;
  paging: Types.OffsetPaging;
}>;

export type UserBusinessesListQuery = {
  businessUsers: {
    nodes: Array<{
      business: Pick<Types.Business, 'id' | 'name' | 'currency'>;
      user: Pick<Types.User, 'id' | 'email' | 'firstName' | 'lastName'> & {
        defaultBusiness?: Types.Maybe<Pick<Types.Business, 'id' | 'name'>>;
      };
    }>;
  };
};

export type TemplatesListQueryVariables = Types.Exact<{
  filter: Types.TemplateFilter;
  sorting?: Types.InputMaybe<Array<Types.TemplateSort> | Types.TemplateSort>;
  paging: Types.OffsetPaging;
}>;

export type TemplatesListQuery = {
  templates: Pick<Types.TemplateConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.Template,
        | 'id'
        | 'category'
        | 'created'
        | 'updated'
        | 'name'
        | 'length'
        | 'type'
        | 'language'
        | 'subtitles'
        | 'posterUrl'
        | 'description'
      > & {
        business: Pick<Types.Business, 'id'>;
        venue: Pick<Types.Venue, 'id' | 'name'>;
      }
    >;
  };
};

export type GetUserQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;

export type GetUserQuery = {
  user: Pick<
    Types.User,
    'id' | 'email' | 'firstName' | 'lastName' | 'avatarUrl' | 'placeOfResidence'
  > & { defaultBusiness?: Types.Maybe<Pick<Types.Business, 'id' | 'name'>> };
};

export type CustomBusinessesListQueryVariables = Types.Exact<{
  filter: Types.BusinessFilter;
  sorting?: Types.InputMaybe<Array<Types.BusinessSort> | Types.BusinessSort>;
  paging: Types.OffsetPaging;
  meta: Types.Scalars['String']['input'];
}>;

export type CustomBusinessesListQuery = {
  getUserBusinesses: {
    nodes: Array<
      Pick<Types.Business, 'id' | 'name' | 'apiKey' | 'logoUrl' | 'currency'>
    >;
  };
};
