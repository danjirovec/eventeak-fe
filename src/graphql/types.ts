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
    | 'name'
    | 'category'
    | 'length'
    | 'date'
    | 'description'
    | 'language'
    | 'subtitles'
    | 'posterUrl'
  > & {
    venue: Pick<Types.Venue, 'id'>;
    eventTemplate: Pick<Types.EventTemplate, 'id' | 'name'>;
    business: Pick<Types.Business, 'id'>;
  };
};

export type CreateTemplateMutationVariables = Types.Exact<{
  input: Types.CreateEventTemplate;
}>;

export type CreateTemplateMutation = {
  createEventTemplateAndEventPriceCategory: Pick<
    Types.EventTemplate,
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
  > & { business: Pick<Types.Business, 'id'> };
};

export type CreateDiscountMutationVariables = Types.Exact<{
  input: Types.CreateOneDiscountInput;
}>;

export type CreateDiscountMutation = {
  createOneDiscount: Pick<Types.Discount, 'name' | 'percentage'> & {
    business: Pick<Types.Business, 'id'>;
  };
};

export type CreateMembershipTypeMutationVariables = Types.Exact<{
  input: Types.CreateOneMembershipTypeInput;
}>;

export type CreateMembershipTypeMutation = {
  createOneMembershipType: Pick<Types.MembershipType, 'name'> & {
    business: Pick<Types.Business, 'id'>;
  };
};

export type CreateBusinessMutationVariables = Types.Exact<{
  input: Types.CreateBusiness;
}>;

export type CreateBusinessMutation = {
  createBusinessAndBusinessUserAdmin: Pick<
    Types.Business,
    'name' | 'apiKey' | 'logoUrl'
  >;
};

export type CreateVenueMutationVariables = Types.Exact<{
  input: Types.CreateVenue;
}>;

export type CreateVenueMutation = {
  createVenueWithSeats: Pick<
    Types.Venue,
    | 'name'
    | 'capacity'
    | 'buildingNumber'
    | 'city'
    | 'street'
    | 'hasSeats'
    | 'data'
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
  updateOneTicket: Pick<Types.Ticket, 'price' | 'validated'> & {
    order?: Types.Maybe<Pick<Types.Order, 'id'>>;
    discount?: Types.Maybe<Pick<Types.Discount, 'id'>>;
    seat?: Types.Maybe<Pick<Types.Seat, 'id'>>;
    user?: Types.Maybe<Pick<Types.User, 'id'>>;
    event: Pick<Types.Event, 'id'>;
  };
};

export type UpdateBusinessMutationVariables = Types.Exact<{
  input: Types.UpdateOneBusinessInput;
}>;

export type UpdateBusinessMutation = {
  updateOneBusiness: Pick<Types.Business, 'name' | 'logoUrl'>;
};

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateOneUserInput;
}>;

export type UpdateUserMutation = {
  updateOneUser: Pick<
    Types.User,
    'email' | 'firstName' | 'lastName' | 'placeOfResidence'
  > & { defaultBusiness?: Types.Maybe<Pick<Types.Business, 'id' | 'name'>> };
};

export type UpdateUserPasswordMutationVariables = Types.Exact<{
  input: Types.UpdateUserPassword;
}>;

export type UpdateUserPasswordMutation = Pick<
  Types.Mutation,
  'updateUserPassword'
>;

export type UpdateEventMutationVariables = Types.Exact<{
  input: Types.UpdateEvent;
}>;

export type UpdateEventMutation = {
  updateEvent: Pick<
    Types.Event,
    | 'id'
    | 'name'
    | 'category'
    | 'date'
    | 'length'
    | 'description'
    | 'subtitles'
    | 'language'
    | 'posterUrl'
  > & {
    venue: Pick<Types.Venue, 'id' | 'name'>;
    eventTemplate: Pick<Types.EventTemplate, 'id' | 'name'>;
    business: Pick<Types.Business, 'id' | 'name'>;
  };
};

export type UpdateTemplateMutationVariables = Types.Exact<{
  input: Types.UpdateEventTemplate;
}>;

export type UpdateTemplateMutation = {
  updateEventTemplateAndEventPriceCategory: Pick<
    Types.EventTemplate,
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
  >;
};

export type UpdateDiscountMutationVariables = Types.Exact<{
  input: Types.UpdateOneDiscountInput;
}>;

export type UpdateDiscountMutation = {
  updateOneDiscount: Pick<Types.Discount, 'id' | 'name' | 'percentage'>;
};

export type UpdateMembershipTypeMutationVariables = Types.Exact<{
  input: Types.UpdateOneMembershipTypeInput;
}>;

export type UpdateMembershipTypeMutation = {
  updateOneMembershipType: Pick<Types.MembershipType, 'name'> & {
    business: Pick<Types.Business, 'id'>;
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
        | 'id'
        | 'category'
        | 'created'
        | 'name'
        | 'length'
        | 'description'
        | 'posterUrl'
        | 'language'
        | 'subtitles'
        | 'date'
      > & {
        eventTemplate: Pick<Types.EventTemplate, 'id'>;
        business: Pick<Types.Business, 'id'>;
        venue: Pick<Types.Venue, 'id' | 'name'>;
      }
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
        | 'firstName'
        | 'lastName'
        | 'created'
        | 'birthDate'
        | 'placeOfResidence'
      >;
    }>;
  };
};

export type CountsQueryVariables = Types.Exact<{
  meta: Types.Scalars['String']['input'];
}>;

export type CountsQuery = {
  businessCounts: Pick<
    Types.CountsBusiness,
    'customers' | 'events' | 'memberships'
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
      Pick<Types.Section, 'id' | 'name'> & {
        venue: Pick<Types.Venue, 'id' | 'name'>;
      }
    >;
  };
};

export type EventPriceCategoryListQueryVariables = Types.Exact<{
  filter: Types.EventPriceCategoryFilter;
  sorting?: Types.InputMaybe<
    Array<Types.EventPriceCategorySort> | Types.EventPriceCategorySort
  >;
  paging: Types.OffsetPaging;
}>;

export type EventPriceCategoryListQuery = {
  eventPriceCategories: {
    nodes: Array<
      Pick<
        Types.EventPriceCategory,
        'id' | 'name' | 'price' | 'startDate' | 'endDate'
      > & { section: Pick<Types.Section, 'id' | 'name'> }
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
      > & { business: Pick<Types.Business, 'id'> }
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

export type OrdersListQueryVariables = Types.Exact<{
  filter: Types.OrderFilter;
  sorting?: Types.InputMaybe<Array<Types.OrderSort> | Types.OrderSort>;
  paging: Types.OffsetPaging;
}>;

export type OrdersListQuery = {
  orders: Pick<Types.OrderConnection, 'totalCount'> & {
    nodes: Array<
      Pick<Types.Order, 'id' | 'total'> & {
        user: Pick<Types.User, 'id' | 'firstName' | 'lastName'>;
        business: Pick<Types.Business, 'id'>;
      }
    >;
  };
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
        discount?: Types.Maybe<Pick<Types.Discount, 'id'>>;
        user?: Types.Maybe<Pick<Types.User, 'id' | 'firstName' | 'lastName'>>;
        event: Pick<Types.Event, 'id' | 'name' | 'date'>;
        seat?: Types.Maybe<Pick<Types.Seat, 'id' | 'row' | 'seat'>>;
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
    nodes: Array<Pick<Types.Business, 'id' | 'name' | 'apiKey' | 'logoUrl'>>;
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
        user: Pick<Types.User, 'id'>;
        membershipType?: Types.Maybe<Pick<Types.MembershipType, 'id' | 'name'>>;
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
  membershipTypes: { nodes: Array<Pick<Types.MembershipType, 'id' | 'name'>> };
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
      business: Pick<Types.Business, 'id' | 'name'>;
      user: Pick<Types.User, 'id'> & {
        defaultBusiness?: Types.Maybe<Pick<Types.Business, 'id' | 'name'>>;
      };
    }>;
  };
};

export type TemplatesListQueryVariables = Types.Exact<{
  filter: Types.EventTemplateFilter;
  sorting?: Types.InputMaybe<
    Array<Types.EventTemplateSort> | Types.EventTemplateSort
  >;
  paging: Types.OffsetPaging;
}>;

export type TemplatesListQuery = {
  eventTemplates: Pick<Types.EventTemplateConnection, 'totalCount'> & {
    nodes: Array<
      Pick<
        Types.EventTemplate,
        | 'id'
        | 'category'
        | 'created'
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
  userBusinesses: {
    nodes: Array<Pick<Types.Business, 'id' | 'name' | 'apiKey' | 'logoUrl'>>;
  };
};
