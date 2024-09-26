export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
  JSON: { input: any; output: any };
};

export type AnonymizeUser = {
  businessId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Benefit = {
  business: Business;
  created: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  points: Scalars['Float']['output'];
  updated: Scalars['DateTime']['output'];
};

export type BenefitConnection = {
  /** Array of nodes. */
  nodes: Array<Benefit>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type BenefitDeleteFilter = {
  and?: InputMaybe<Array<BenefitDeleteFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BenefitDeleteFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BenefitDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type BenefitFilter = {
  and?: InputMaybe<Array<BenefitFilter>>;
  business?: InputMaybe<BenefitFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BenefitFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BenefitFilterBusinessFilter = {
  and?: InputMaybe<Array<BenefitFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BenefitFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BenefitSort = {
  direction: SortDirection;
  field: BenefitSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type BenefitSortFields =
  | 'businessId'
  | 'created'
  | 'expiryDate'
  | 'id'
  | 'name'
  | 'points'
  | 'updated';

export type BenefitSubscriptionFilter = {
  and?: InputMaybe<Array<BenefitSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BenefitSubscriptionFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BenefitUpdateFilter = {
  and?: InputMaybe<Array<BenefitUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BenefitUpdateFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Business = {
  apiKey: Scalars['String']['output'];
  created: Scalars['DateTime']['output'];
  currency: Currency;
  id: Scalars['ID']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type BusinessConnection = {
  /** Array of nodes. */
  nodes: Array<Business>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type BusinessDeleteFilter = {
  and?: InputMaybe<Array<BusinessDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BusinessDeleteFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BusinessDeleteResponse = {
  apiKey?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  currency?: Maybe<Currency>;
  id?: Maybe<Scalars['ID']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type BusinessFilter = {
  and?: InputMaybe<Array<BusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BusinessMetrics = {
  customers: Array<Scalars['Float']['output']>;
  events: Array<Scalars['Float']['output']>;
  memberships: Array<Scalars['Float']['output']>;
};

export type BusinessSort = {
  direction: SortDirection;
  field: BusinessSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type BusinessSortFields =
  | 'created'
  | 'currency'
  | 'id'
  | 'name'
  | 'updated';

export type BusinessSubscriptionFilter = {
  and?: InputMaybe<Array<BusinessSubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BusinessSubscriptionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BusinessUpdateFilter = {
  and?: InputMaybe<Array<BusinessUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BusinessUpdateFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BusinessUser = {
  business: Business;
  created: Scalars['DateTime']['output'];
  role: Role;
  updated: Scalars['DateTime']['output'];
  user: User;
};

export type BusinessUserConnection = {
  /** Array of nodes. */
  nodes: Array<BusinessUser>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type BusinessUserDeleteFilter = {
  and?: InputMaybe<Array<BusinessUserDeleteFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<BusinessUserDeleteFilter>>;
  role?: InputMaybe<RoleFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type BusinessUserDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<Role>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type BusinessUserFilter = {
  and?: InputMaybe<Array<BusinessUserFilter>>;
  business?: InputMaybe<BusinessUserFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<BusinessUserFilter>>;
  role?: InputMaybe<RoleFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  user?: InputMaybe<BusinessUserFilterUserFilter>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type BusinessUserFilterBusinessFilter = {
  and?: InputMaybe<Array<BusinessUserFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BusinessUserFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BusinessUserFilterUserFilter = {
  and?: InputMaybe<Array<BusinessUserFilterUserFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BusinessUserFilterUserFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type BusinessUserSort = {
  direction: SortDirection;
  field: BusinessUserSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type BusinessUserSortFields =
  | 'businessId'
  | 'created'
  | 'role'
  | 'updated'
  | 'userId';

export type BusinessUserSubscriptionFilter = {
  and?: InputMaybe<Array<BusinessUserSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<BusinessUserSubscriptionFilter>>;
  role?: InputMaybe<RoleFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type BusinessUserUpdateFilter = {
  and?: InputMaybe<Array<BusinessUserUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<BusinessUserUpdateFilter>>;
  role?: InputMaybe<RoleFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type Category =
  | 'Concert'
  | 'Dance'
  | 'Exhibition'
  | 'Festival'
  | 'Movie'
  | 'Performance'
  | 'Quiz'
  | 'Talk'
  | 'Theater'
  | 'Workshop';

export type CategoryFilterComparison = {
  eq?: InputMaybe<Category>;
  gt?: InputMaybe<Category>;
  gte?: InputMaybe<Category>;
  iLike?: InputMaybe<Category>;
  in?: InputMaybe<Array<Category>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Category>;
  lt?: InputMaybe<Category>;
  lte?: InputMaybe<Category>;
  neq?: InputMaybe<Category>;
  notILike?: InputMaybe<Category>;
  notIn?: InputMaybe<Array<Category>>;
  notLike?: InputMaybe<Category>;
};

export type CreateBenefit = {
  businessId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  points: Scalars['Float']['input'];
};

export type CreateBenefitSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BenefitSubscriptionFilter;
};

export type CreateBusiness = {
  currency: Currency;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateBusinessSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BusinessSubscriptionFilter;
};

export type CreateBusinessUser = {
  businessId: Scalars['ID']['input'];
  role?: Role;
  userId: Scalars['ID']['input'];
};

export type CreateBusinessUserSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BusinessUserSubscriptionFilter;
};

export type CreateDiscount = {
  businessId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  percentage: Scalars['Float']['input'];
};

export type CreateDiscountSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: DiscountSubscriptionFilter;
};

export type CreateEvent = {
  businessId: Scalars['ID']['input'];
  category: Category;
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  eventTemplateId: Scalars['ID']['input'];
  language: Language;
  length: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  subtitles?: InputMaybe<Language>;
  venueData?: InputMaybe<Scalars['JSON']['input']>;
  venueId: Scalars['ID']['input'];
};

export type CreateEventPriceCategory = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sectionId: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateEventPriceCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventPriceCategorySubscriptionFilter;
};

export type CreateEventSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventSubscriptionFilter;
};

export type CreateEventTemplate = {
  businessId: Scalars['ID']['input'];
  category: Category;
  description?: InputMaybe<Scalars['String']['input']>;
  eventPriceCategory?: InputMaybe<Array<CreateEventPriceCategory>>;
  language?: InputMaybe<Language>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  subtitles?: InputMaybe<Language>;
  type: TemplateType;
  venueId: Scalars['ID']['input'];
};

export type CreateEventTemplateSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventTemplateSubscriptionFilter;
};

export type CreateManyBenefitsInput = {
  /** Array of records to create */
  benefits: Array<CreateBenefit>;
};

export type CreateManyBusinessUsersInput = {
  /** Array of records to create */
  businessUsers: Array<CreateBusinessUser>;
};

export type CreateManyBusinessesInput = {
  /** Array of records to create */
  businesses: Array<CreateBusiness>;
};

export type CreateManyDiscountsInput = {
  /** Array of records to create */
  discounts: Array<CreateDiscount>;
};

export type CreateManyEventPriceCategoriesInput = {
  /** Array of records to create */
  eventPriceCategories: Array<CreateEventPriceCategory>;
};

export type CreateManyEventTemplatesInput = {
  /** Array of records to create */
  eventTemplates: Array<CreateEventTemplate>;
};

export type CreateManyEventsInput = {
  /** Array of records to create */
  events: Array<CreateEvent>;
};

export type CreateManyMembershipTypesInput = {
  /** Array of records to create */
  membershipTypes: Array<CreateMembershipType>;
};

export type CreateManyMembershipsInput = {
  /** Array of records to create */
  memberships: Array<CreateMembership>;
};

export type CreateManyOrdersInput = {
  /** Array of records to create */
  orders: Array<CreateOrder>;
};

export type CreateManySeatsInput = {
  /** Array of records to create */
  seats: Array<CreateSeat>;
};

export type CreateManySectionsInput = {
  /** Array of records to create */
  sections: Array<CreateSection>;
};

export type CreateManyTicketsInput = {
  /** Array of records to create */
  tickets: Array<CreateTicket>;
};

export type CreateManyUserBenefitDtosInput = {
  /** Array of records to create */
  userBenefitDtos: Array<CreateUserBenefit>;
};

export type CreateManyUsersInput = {
  /** Array of records to create */
  users: Array<CreateUser>;
};

export type CreateManyVenuesInput = {
  /** Array of records to create */
  venues: Array<CreateVenue>;
};

export type CreateMembership = {
  businessId: Scalars['ID']['input'];
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  membershipTypeId?: InputMaybe<Scalars['ID']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['ID']['input'];
};

export type CreateMembershipSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: MembershipSubscriptionFilter;
};

export type CreateMembershipType = {
  businessId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateMembershipTypeSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: MembershipTypeSubscriptionFilter;
};

export type CreateOneBenefitInput = {
  /** The record to create */
  benefit: CreateBenefit;
};

export type CreateOneBusinessInput = {
  /** The record to create */
  business: CreateBusiness;
};

export type CreateOneBusinessUserInput = {
  /** The record to create */
  businessUser: CreateBusinessUser;
};

export type CreateOneDiscountInput = {
  /** The record to create */
  discount: CreateDiscount;
};

export type CreateOneEventInput = {
  /** The record to create */
  event: CreateEvent;
};

export type CreateOneEventPriceCategoryInput = {
  /** The record to create */
  eventPriceCategory: CreateEventPriceCategory;
};

export type CreateOneEventTemplateInput = {
  /** The record to create */
  eventTemplate: CreateEventTemplate;
};

export type CreateOneMembershipInput = {
  /** The record to create */
  membership: CreateMembership;
};

export type CreateOneMembershipTypeInput = {
  /** The record to create */
  membershipType: CreateMembershipType;
};

export type CreateOneOrderInput = {
  /** The record to create */
  order: CreateOrder;
};

export type CreateOneSeatInput = {
  /** The record to create */
  seat: CreateSeat;
};

export type CreateOneSectionInput = {
  /** The record to create */
  section: CreateSection;
};

export type CreateOneTicketInput = {
  /** The record to create */
  ticket: CreateTicket;
};

export type CreateOneUserBenefitDtoInput = {
  /** The record to create */
  userBenefitDto: CreateUserBenefit;
};

export type CreateOneUserInput = {
  /** The record to create */
  user: CreateUser;
};

export type CreateOneVenueInput = {
  /** The record to create */
  venue: CreateVenue;
};

export type CreateOrder = {
  businessId: Scalars['ID']['input'];
  total: Scalars['Float']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateOrderSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: OrderSubscriptionFilter;
};

export type CreateSeat = {
  row: Scalars['String']['input'];
  seat: Scalars['Float']['input'];
  sectionId: Scalars['String']['input'];
};

export type CreateSeatSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: SeatSubscriptionFilter;
};

export type CreateSection = {
  capacity?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  venueId: Scalars['ID']['input'];
};

export type CreateSectionSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: SectionSubscriptionFilter;
};

export type CreateTicket = {
  businessId: Scalars['ID']['input'];
  discountId?: InputMaybe<Scalars['ID']['input']>;
  eventId: Scalars['ID']['input'];
  price: Scalars['Float']['input'];
  seatId?: InputMaybe<Scalars['ID']['input']>;
  sectionId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  validated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTicketSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TicketSubscriptionFilter;
};

export type CreateUser = {
  birthDate: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  placeOfResidence?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserBenefit = {
  benefitId: Scalars['ID']['input'];
  businessId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateUserBenefitDtoSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserBenefitDtoSubscriptionFilter;
};

export type CreateUserSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserSubscriptionFilter;
};

export type CreateVenue = {
  buildingNumber: Scalars['String']['input'];
  businessId: Scalars['ID']['input'];
  capacity: Scalars['Float']['input'];
  city: Scalars['String']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
  hasSeats: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  sections?: InputMaybe<Array<VenueSection>>;
  street: Scalars['String']['input'];
};

export type CreateVenueSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: VenueSubscriptionFilter;
};

export type Currency = 'CZK' | 'EUR' | 'USD';

export type CurrencyFilterComparison = {
  eq?: InputMaybe<Currency>;
  gt?: InputMaybe<Currency>;
  gte?: InputMaybe<Currency>;
  iLike?: InputMaybe<Currency>;
  in?: InputMaybe<Array<Currency>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Currency>;
  lt?: InputMaybe<Currency>;
  lte?: InputMaybe<Currency>;
  neq?: InputMaybe<Currency>;
  notILike?: InputMaybe<Currency>;
  notIn?: InputMaybe<Array<Currency>>;
  notLike?: InputMaybe<Currency>;
};

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type DeleteManyBenefitsInput = {
  /** Filter to find records to delete */
  filter: BenefitDeleteFilter;
};

export type DeleteManyBusinessUsersInput = {
  /** Filter to find records to delete */
  filter: BusinessUserDeleteFilter;
};

export type DeleteManyBusinessesInput = {
  /** Filter to find records to delete */
  filter: BusinessDeleteFilter;
};

export type DeleteManyDiscountsInput = {
  /** Filter to find records to delete */
  filter: DiscountDeleteFilter;
};

export type DeleteManyEventPriceCategoriesInput = {
  /** Filter to find records to delete */
  filter: EventPriceCategoryDeleteFilter;
};

export type DeleteManyEventTemplatesInput = {
  /** Filter to find records to delete */
  filter: EventTemplateDeleteFilter;
};

export type DeleteManyEventsInput = {
  /** Filter to find records to delete */
  filter: EventDeleteFilter;
};

export type DeleteManyMembershipTypesInput = {
  /** Filter to find records to delete */
  filter: MembershipTypeDeleteFilter;
};

export type DeleteManyMembershipsInput = {
  /** Filter to find records to delete */
  filter: MembershipDeleteFilter;
};

export type DeleteManyOrdersInput = {
  /** Filter to find records to delete */
  filter: OrderDeleteFilter;
};

export type DeleteManyResponse = {
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManySeatsInput = {
  /** Filter to find records to delete */
  filter: SeatDeleteFilter;
};

export type DeleteManySectionsInput = {
  /** Filter to find records to delete */
  filter: SectionDeleteFilter;
};

export type DeleteManyTicketsInput = {
  /** Filter to find records to delete */
  filter: TicketDeleteFilter;
};

export type DeleteManyUserBenefitDtosInput = {
  /** Filter to find records to delete */
  filter: UserBenefitDtoDeleteFilter;
};

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter;
};

export type DeleteManyVenuesInput = {
  /** Filter to find records to delete */
  filter: VenueDeleteFilter;
};

export type DeleteOneBenefitInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneBenefitSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BenefitSubscriptionFilter;
};

export type DeleteOneBusinessInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneBusinessSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BusinessSubscriptionFilter;
};

export type DeleteOneBusinessUserInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneBusinessUserSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BusinessUserSubscriptionFilter;
};

export type DeleteOneDiscountInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneDiscountSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: DiscountSubscriptionFilter;
};

export type DeleteOneEventInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneEventPriceCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneEventPriceCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventPriceCategorySubscriptionFilter;
};

export type DeleteOneEventSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventSubscriptionFilter;
};

export type DeleteOneEventTemplateInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneEventTemplateSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventTemplateSubscriptionFilter;
};

export type DeleteOneMembershipInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneMembershipSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: MembershipSubscriptionFilter;
};

export type DeleteOneMembershipTypeInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneMembershipTypeSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: MembershipTypeSubscriptionFilter;
};

export type DeleteOneOrderInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneOrderSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: OrderSubscriptionFilter;
};

export type DeleteOneSeatInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneSeatSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: SeatSubscriptionFilter;
};

export type DeleteOneSectionInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneSectionSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: SectionSubscriptionFilter;
};

export type DeleteOneTicketInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTicketSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TicketSubscriptionFilter;
};

export type DeleteOneUserBenefitDtoInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneUserBenefitDtoSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserBenefitDtoSubscriptionFilter;
};

export type DeleteOneUserInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneUserSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserSubscriptionFilter;
};

export type DeleteOneVenueInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneVenueSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: VenueSubscriptionFilter;
};

export type Discount = {
  business: Business;
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  percentage: Scalars['Float']['output'];
  updated: Scalars['DateTime']['output'];
};

export type DiscountConnection = {
  /** Array of nodes. */
  nodes: Array<Discount>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type DiscountDeleteFilter = {
  and?: InputMaybe<Array<DiscountDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountDeleteFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type DiscountDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  percentage?: Maybe<Scalars['Float']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type DiscountFilter = {
  and?: InputMaybe<Array<DiscountFilter>>;
  business?: InputMaybe<DiscountFilterBusinessFilter>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type DiscountFilterBusinessFilter = {
  and?: InputMaybe<Array<DiscountFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type DiscountSort = {
  direction: SortDirection;
  field: DiscountSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type DiscountSortFields =
  | 'created'
  | 'id'
  | 'name'
  | 'percentage'
  | 'updated';

export type DiscountSubscriptionFilter = {
  and?: InputMaybe<Array<DiscountSubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountSubscriptionFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type DiscountUpdateFilter = {
  and?: InputMaybe<Array<DiscountUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountUpdateFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type Event = {
  business: Business;
  category: Category;
  created: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  eventTemplate: EventTemplate;
  id: Scalars['ID']['output'];
  language: Language;
  length: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  posterUrl?: Maybe<Scalars['String']['output']>;
  subtitles?: Maybe<Language>;
  updated: Scalars['DateTime']['output'];
  venue: Venue;
  venueData?: Maybe<Scalars['JSON']['output']>;
};

export type EventConnection = {
  /** Array of nodes. */
  nodes: Array<Event>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type EventDeleteFilter = {
  and?: InputMaybe<Array<EventDeleteFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventDeleteFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventDeleteResponse = {
  category?: Maybe<Category>;
  created?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  language?: Maybe<Language>;
  length?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  subtitles?: Maybe<Language>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  venueData?: Maybe<Scalars['JSON']['output']>;
};

export type EventFilter = {
  and?: InputMaybe<Array<EventFilter>>;
  business?: InputMaybe<EventFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  eventTemplate?: InputMaybe<EventFilterEventTemplateFilter>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venue?: InputMaybe<EventFilterVenueFilter>;
};

export type EventFilterBusinessFilter = {
  and?: InputMaybe<Array<EventFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventFilterEventTemplateFilter = {
  and?: InputMaybe<Array<EventFilterEventTemplateFilter>>;
  business?: InputMaybe<EventFilterEventTemplateFilterBusinessFilter>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilterEventTemplateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TemplateTypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venue?: InputMaybe<EventFilterEventTemplateFilterVenueFilter>;
};

export type EventFilterEventTemplateFilterBusinessFilter = {
  and?: InputMaybe<Array<EventFilterEventTemplateFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilterEventTemplateFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventFilterEventTemplateFilterVenueFilter = {
  and?: InputMaybe<Array<EventFilterEventTemplateFilterVenueFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilterEventTemplateFilterVenueFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventFilterVenueFilter = {
  and?: InputMaybe<Array<EventFilterVenueFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  business?: InputMaybe<EventFilterVenueFilterBusinessFilter>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilterVenueFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventFilterVenueFilterBusinessFilter = {
  and?: InputMaybe<Array<EventFilterVenueFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilterVenueFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventPriceCategory = {
  created: Scalars['DateTime']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  eventTemplate: EventTemplate;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  section: Section;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updated: Scalars['DateTime']['output'];
};

export type EventPriceCategoryAvailable = {
  counts: Array<Scalars['Float']['output']>;
  nodes: Array<EventPriceCategory>;
};

export type EventPriceCategoryConnection = {
  /** Array of nodes. */
  nodes: Array<EventPriceCategory>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type EventPriceCategoryDeleteFilter = {
  and?: InputMaybe<Array<EventPriceCategoryDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  eventTemplateId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventPriceCategoryDeleteFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventPriceCategoryDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type EventPriceCategoryFilter = {
  and?: InputMaybe<Array<EventPriceCategoryFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  eventTemplate?: InputMaybe<EventPriceCategoryFilterEventTemplateFilter>;
  eventTemplateId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventPriceCategoryFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  section?: InputMaybe<EventPriceCategoryFilterSectionFilter>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventPriceCategoryFilterEventTemplateFilter = {
  and?: InputMaybe<Array<EventPriceCategoryFilterEventTemplateFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventPriceCategoryFilterEventTemplateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TemplateTypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventPriceCategoryFilterSectionFilter = {
  and?: InputMaybe<Array<EventPriceCategoryFilterSectionFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventPriceCategoryFilterSectionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type EventPriceCategorySort = {
  direction: SortDirection;
  field: EventPriceCategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type EventPriceCategorySortFields =
  | 'created'
  | 'endDate'
  | 'eventTemplateId'
  | 'id'
  | 'name'
  | 'price'
  | 'sectionId'
  | 'startDate'
  | 'updated';

export type EventPriceCategorySubscriptionFilter = {
  and?: InputMaybe<Array<EventPriceCategorySubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  eventTemplateId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventPriceCategorySubscriptionFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventPriceCategoryUpdateFilter = {
  and?: InputMaybe<Array<EventPriceCategoryUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  eventTemplateId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventPriceCategoryUpdateFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventSort = {
  direction: SortDirection;
  field: EventSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type EventSortFields =
  | 'businessId'
  | 'category'
  | 'created'
  | 'date'
  | 'id'
  | 'language'
  | 'length'
  | 'name'
  | 'subtitles'
  | 'updated';

export type EventSubscriptionFilter = {
  and?: InputMaybe<Array<EventSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventSubscriptionFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventTemplate = {
  business: Business;
  category: Category;
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Language>;
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  posterUrl?: Maybe<Scalars['String']['output']>;
  subtitles?: Maybe<Language>;
  type: TemplateType;
  updated: Scalars['DateTime']['output'];
  venue: Venue;
};

export type EventTemplateConnection = {
  /** Array of nodes. */
  nodes: Array<EventTemplate>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type EventTemplateDeleteFilter = {
  and?: InputMaybe<Array<EventTemplateDeleteFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventTemplateDeleteFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TemplateTypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventTemplateDeleteResponse = {
  category?: Maybe<Category>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  language?: Maybe<Language>;
  length?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  subtitles?: Maybe<Language>;
  type?: Maybe<TemplateType>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type EventTemplateFilter = {
  and?: InputMaybe<Array<EventTemplateFilter>>;
  business?: InputMaybe<EventTemplateFilterBusinessFilter>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventTemplateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TemplateTypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venue?: InputMaybe<EventTemplateFilterVenueFilter>;
};

export type EventTemplateFilterBusinessFilter = {
  and?: InputMaybe<Array<EventTemplateFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventTemplateFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventTemplateFilterVenueFilter = {
  and?: InputMaybe<Array<EventTemplateFilterVenueFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventTemplateFilterVenueFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventTemplateSort = {
  direction: SortDirection;
  field: EventTemplateSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type EventTemplateSortFields =
  | 'category'
  | 'created'
  | 'id'
  | 'language'
  | 'length'
  | 'name'
  | 'subtitles'
  | 'type'
  | 'updated';

export type EventTemplateSubscriptionFilter = {
  and?: InputMaybe<Array<EventTemplateSubscriptionFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventTemplateSubscriptionFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TemplateTypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventTemplateUpdateFilter = {
  and?: InputMaybe<Array<EventTemplateUpdateFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventTemplateUpdateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TemplateTypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventUpdateFilter = {
  and?: InputMaybe<Array<EventUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventUpdateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

/** Group by */
export type GroupBy = 'DAY' | 'MONTH' | 'WEEK' | 'YEAR';

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iLike?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  notILike?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  notLike?: InputMaybe<Scalars['ID']['input']>;
};

export type Language =
  | 'Arabic'
  | 'Czech'
  | 'English'
  | 'French'
  | 'German'
  | 'Japanese'
  | 'Mandarin'
  | 'Portuguese'
  | 'Russian'
  | 'Slovak'
  | 'Spanish';

export type LanguageFilterComparison = {
  eq?: InputMaybe<Language>;
  gt?: InputMaybe<Language>;
  gte?: InputMaybe<Language>;
  iLike?: InputMaybe<Language>;
  in?: InputMaybe<Array<Language>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Language>;
  lt?: InputMaybe<Language>;
  lte?: InputMaybe<Language>;
  neq?: InputMaybe<Language>;
  notILike?: InputMaybe<Language>;
  notIn?: InputMaybe<Array<Language>>;
  notLike?: InputMaybe<Language>;
};

export type Membership = {
  business: Business;
  created: Scalars['DateTime']['output'];
  expiryDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  membershipType?: Maybe<MembershipType>;
  points: Scalars['Float']['output'];
  updated: Scalars['DateTime']['output'];
  user: User;
};

export type MembershipConnection = {
  /** Array of nodes. */
  nodes: Array<Membership>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type MembershipDeleteFilter = {
  and?: InputMaybe<Array<MembershipDeleteFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<MembershipDeleteFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type MembershipDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type MembershipFilter = {
  and?: InputMaybe<Array<MembershipFilter>>;
  business?: InputMaybe<MembershipFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  membershipType?: InputMaybe<MembershipFilterMembershipTypeFilter>;
  or?: InputMaybe<Array<MembershipFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  user?: InputMaybe<MembershipFilterUserFilter>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type MembershipFilterBusinessFilter = {
  and?: InputMaybe<Array<MembershipFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipFilterMembershipTypeFilter = {
  and?: InputMaybe<Array<MembershipFilterMembershipTypeFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipFilterMembershipTypeFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipFilterUserFilter = {
  and?: InputMaybe<Array<MembershipFilterUserFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipFilterUserFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipSort = {
  direction: SortDirection;
  field: MembershipSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type MembershipSortFields =
  | 'businessId'
  | 'created'
  | 'expiryDate'
  | 'id'
  | 'points'
  | 'updated'
  | 'userId';

export type MembershipSubscriptionFilter = {
  and?: InputMaybe<Array<MembershipSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<MembershipSubscriptionFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type MembershipType = {
  business: Business;
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type MembershipTypeConnection = {
  /** Array of nodes. */
  nodes: Array<MembershipType>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type MembershipTypeDeleteFilter = {
  and?: InputMaybe<Array<MembershipTypeDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeDeleteFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipTypeDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type MembershipTypeFilter = {
  and?: InputMaybe<Array<MembershipTypeFilter>>;
  business?: InputMaybe<MembershipTypeFilterBusinessFilter>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipTypeFilterBusinessFilter = {
  and?: InputMaybe<Array<MembershipTypeFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipTypeSort = {
  direction: SortDirection;
  field: MembershipTypeSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type MembershipTypeSortFields = 'created' | 'id' | 'name' | 'updated';

export type MembershipTypeSubscriptionFilter = {
  and?: InputMaybe<Array<MembershipTypeSubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeSubscriptionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipTypeUpdateFilter = {
  and?: InputMaybe<Array<MembershipTypeUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeUpdateFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipUpdateFilter = {
  and?: InputMaybe<Array<MembershipUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<MembershipUpdateFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type Mutation = {
  anonymizeUser: Scalars['String']['output'];
  createBusiness: Business;
  createEvent: Event;
  createEventTemplate: EventTemplate;
  createManyBenefits: Array<Benefit>;
  createManyBusinessUsers: Array<BusinessUser>;
  createManyBusinesses: Array<Business>;
  createManyDiscounts: Array<Discount>;
  createManyEventPriceCategories: Array<EventPriceCategory>;
  createManyEventTemplates: Array<EventTemplate>;
  createManyEvents: Array<Event>;
  createManyMembershipTypes: Array<MembershipType>;
  createManyMemberships: Array<Membership>;
  createManyOrders: Array<Order>;
  createManySeats: Array<Seat>;
  createManySections: Array<Section>;
  createManyTickets: Array<Ticket>;
  createManyUserBenefitDtos: Array<UserBenefitDto>;
  createManyUsers: Array<User>;
  createManyVenues: Array<Venue>;
  createOneBenefit: Benefit;
  createOneBusiness: Business;
  createOneBusinessUser: BusinessUser;
  createOneDiscount: Discount;
  createOneEvent: Event;
  createOneEventPriceCategory: EventPriceCategory;
  createOneEventTemplate: EventTemplate;
  createOneMembership: Membership;
  createOneMembershipType: MembershipType;
  createOneOrder: Order;
  createOneSeat: Seat;
  createOneSection: Section;
  createOneTicket: Ticket;
  createOneUser: User;
  createOneUserBenefitDto: UserBenefitDto;
  createOneVenue: Venue;
  createTickets: Array<Ticket>;
  createVenue: Venue;
  deleteManyBenefits: DeleteManyResponse;
  deleteManyBusinessUsers: DeleteManyResponse;
  deleteManyBusinesses: DeleteManyResponse;
  deleteManyDiscounts: DeleteManyResponse;
  deleteManyEventPriceCategories: DeleteManyResponse;
  deleteManyEventTemplates: DeleteManyResponse;
  deleteManyEvents: DeleteManyResponse;
  deleteManyMembershipTypes: DeleteManyResponse;
  deleteManyMemberships: DeleteManyResponse;
  deleteManyOrders: DeleteManyResponse;
  deleteManySeats: DeleteManyResponse;
  deleteManySections: DeleteManyResponse;
  deleteManyTickets: DeleteManyResponse;
  deleteManyUserBenefitDtos: DeleteManyResponse;
  deleteManyUsers: DeleteManyResponse;
  deleteManyVenues: DeleteManyResponse;
  deleteOneBenefit: BenefitDeleteResponse;
  deleteOneBusiness: BusinessDeleteResponse;
  deleteOneBusinessUser: BusinessUserDeleteResponse;
  deleteOneDiscount: DiscountDeleteResponse;
  deleteOneEvent: EventDeleteResponse;
  deleteOneEventPriceCategory: EventPriceCategoryDeleteResponse;
  deleteOneEventTemplate: EventTemplateDeleteResponse;
  deleteOneMembership: MembershipDeleteResponse;
  deleteOneMembershipType: MembershipTypeDeleteResponse;
  deleteOneOrder: OrderDeleteResponse;
  deleteOneSeat: SeatDeleteResponse;
  deleteOneSection: SectionDeleteResponse;
  deleteOneTicket: TicketDeleteResponse;
  deleteOneUser: UserDeleteResponse;
  deleteOneUserBenefitDto: UserBenefitDtoDeleteResponse;
  deleteOneVenue: VenueDeleteResponse;
  updateEvent: Event;
  updateEventTemplate: EventTemplate;
  updateManyBenefits: UpdateManyResponse;
  updateManyBusinessUsers: UpdateManyResponse;
  updateManyBusinesses: UpdateManyResponse;
  updateManyDiscounts: UpdateManyResponse;
  updateManyEventPriceCategories: UpdateManyResponse;
  updateManyEventTemplates: UpdateManyResponse;
  updateManyEvents: UpdateManyResponse;
  updateManyMembershipTypes: UpdateManyResponse;
  updateManyMemberships: UpdateManyResponse;
  updateManyOrders: UpdateManyResponse;
  updateManySeats: UpdateManyResponse;
  updateManySections: UpdateManyResponse;
  updateManyTickets: UpdateManyResponse;
  updateManyUserBenefitDtos: UpdateManyResponse;
  updateManyUsers: UpdateManyResponse;
  updateManyVenues: UpdateManyResponse;
  updateOneBenefit: Benefit;
  updateOneBusiness: Business;
  updateOneBusinessUser: BusinessUser;
  updateOneDiscount: Discount;
  updateOneEvent: Event;
  updateOneEventPriceCategory: EventPriceCategory;
  updateOneEventTemplate: EventTemplate;
  updateOneMembership: Membership;
  updateOneMembershipType: MembershipType;
  updateOneOrder: Order;
  updateOneSeat: Seat;
  updateOneSection: Section;
  updateOneTicket: Ticket;
  updateOneUser: User;
  updateOneUserBenefitDto: UserBenefitDto;
  updateOneVenue: Venue;
  updatePassword: Scalars['String']['output'];
};

export type MutationAnonymizeUserArgs = {
  input: AnonymizeUser;
};

export type MutationCreateBusinessArgs = {
  input: CreateBusiness;
};

export type MutationCreateEventArgs = {
  input: CreateEvent;
};

export type MutationCreateEventTemplateArgs = {
  input: CreateEventTemplate;
};

export type MutationCreateManyBenefitsArgs = {
  input: CreateManyBenefitsInput;
};

export type MutationCreateManyBusinessUsersArgs = {
  input: CreateManyBusinessUsersInput;
};

export type MutationCreateManyBusinessesArgs = {
  input: CreateManyBusinessesInput;
};

export type MutationCreateManyDiscountsArgs = {
  input: CreateManyDiscountsInput;
};

export type MutationCreateManyEventPriceCategoriesArgs = {
  input: CreateManyEventPriceCategoriesInput;
};

export type MutationCreateManyEventTemplatesArgs = {
  input: CreateManyEventTemplatesInput;
};

export type MutationCreateManyEventsArgs = {
  input: CreateManyEventsInput;
};

export type MutationCreateManyMembershipTypesArgs = {
  input: CreateManyMembershipTypesInput;
};

export type MutationCreateManyMembershipsArgs = {
  input: CreateManyMembershipsInput;
};

export type MutationCreateManyOrdersArgs = {
  input: CreateManyOrdersInput;
};

export type MutationCreateManySeatsArgs = {
  input: CreateManySeatsInput;
};

export type MutationCreateManySectionsArgs = {
  input: CreateManySectionsInput;
};

export type MutationCreateManyTicketsArgs = {
  input: CreateManyTicketsInput;
};

export type MutationCreateManyUserBenefitDtosArgs = {
  input: CreateManyUserBenefitDtosInput;
};

export type MutationCreateManyUsersArgs = {
  input: CreateManyUsersInput;
};

export type MutationCreateManyVenuesArgs = {
  input: CreateManyVenuesInput;
};

export type MutationCreateOneBenefitArgs = {
  input: CreateOneBenefitInput;
};

export type MutationCreateOneBusinessArgs = {
  input: CreateOneBusinessInput;
};

export type MutationCreateOneBusinessUserArgs = {
  input: CreateOneBusinessUserInput;
};

export type MutationCreateOneDiscountArgs = {
  input: CreateOneDiscountInput;
};

export type MutationCreateOneEventArgs = {
  input: CreateOneEventInput;
};

export type MutationCreateOneEventPriceCategoryArgs = {
  input: CreateOneEventPriceCategoryInput;
};

export type MutationCreateOneEventTemplateArgs = {
  input: CreateOneEventTemplateInput;
};

export type MutationCreateOneMembershipArgs = {
  input: CreateOneMembershipInput;
};

export type MutationCreateOneMembershipTypeArgs = {
  input: CreateOneMembershipTypeInput;
};

export type MutationCreateOneOrderArgs = {
  input: CreateOneOrderInput;
};

export type MutationCreateOneSeatArgs = {
  input: CreateOneSeatInput;
};

export type MutationCreateOneSectionArgs = {
  input: CreateOneSectionInput;
};

export type MutationCreateOneTicketArgs = {
  input: CreateOneTicketInput;
};

export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};

export type MutationCreateOneUserBenefitDtoArgs = {
  input: CreateOneUserBenefitDtoInput;
};

export type MutationCreateOneVenueArgs = {
  input: CreateOneVenueInput;
};

export type MutationCreateTicketsArgs = {
  order: CreateOrder;
  tickets: Array<CreateTicket>;
};

export type MutationCreateVenueArgs = {
  input: CreateVenue;
};

export type MutationDeleteManyBenefitsArgs = {
  input: DeleteManyBenefitsInput;
};

export type MutationDeleteManyBusinessUsersArgs = {
  input: DeleteManyBusinessUsersInput;
};

export type MutationDeleteManyBusinessesArgs = {
  input: DeleteManyBusinessesInput;
};

export type MutationDeleteManyDiscountsArgs = {
  input: DeleteManyDiscountsInput;
};

export type MutationDeleteManyEventPriceCategoriesArgs = {
  input: DeleteManyEventPriceCategoriesInput;
};

export type MutationDeleteManyEventTemplatesArgs = {
  input: DeleteManyEventTemplatesInput;
};

export type MutationDeleteManyEventsArgs = {
  input: DeleteManyEventsInput;
};

export type MutationDeleteManyMembershipTypesArgs = {
  input: DeleteManyMembershipTypesInput;
};

export type MutationDeleteManyMembershipsArgs = {
  input: DeleteManyMembershipsInput;
};

export type MutationDeleteManyOrdersArgs = {
  input: DeleteManyOrdersInput;
};

export type MutationDeleteManySeatsArgs = {
  input: DeleteManySeatsInput;
};

export type MutationDeleteManySectionsArgs = {
  input: DeleteManySectionsInput;
};

export type MutationDeleteManyTicketsArgs = {
  input: DeleteManyTicketsInput;
};

export type MutationDeleteManyUserBenefitDtosArgs = {
  input: DeleteManyUserBenefitDtosInput;
};

export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput;
};

export type MutationDeleteManyVenuesArgs = {
  input: DeleteManyVenuesInput;
};

export type MutationDeleteOneBenefitArgs = {
  input: DeleteOneBenefitInput;
};

export type MutationDeleteOneBusinessArgs = {
  input: DeleteOneBusinessInput;
};

export type MutationDeleteOneBusinessUserArgs = {
  input: DeleteOneBusinessUserInput;
};

export type MutationDeleteOneDiscountArgs = {
  input: DeleteOneDiscountInput;
};

export type MutationDeleteOneEventArgs = {
  input: DeleteOneEventInput;
};

export type MutationDeleteOneEventPriceCategoryArgs = {
  input: DeleteOneEventPriceCategoryInput;
};

export type MutationDeleteOneEventTemplateArgs = {
  input: DeleteOneEventTemplateInput;
};

export type MutationDeleteOneMembershipArgs = {
  input: DeleteOneMembershipInput;
};

export type MutationDeleteOneMembershipTypeArgs = {
  input: DeleteOneMembershipTypeInput;
};

export type MutationDeleteOneOrderArgs = {
  input: DeleteOneOrderInput;
};

export type MutationDeleteOneSeatArgs = {
  input: DeleteOneSeatInput;
};

export type MutationDeleteOneSectionArgs = {
  input: DeleteOneSectionInput;
};

export type MutationDeleteOneTicketArgs = {
  input: DeleteOneTicketInput;
};

export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput;
};

export type MutationDeleteOneUserBenefitDtoArgs = {
  input: DeleteOneUserBenefitDtoInput;
};

export type MutationDeleteOneVenueArgs = {
  input: DeleteOneVenueInput;
};

export type MutationUpdateEventArgs = {
  input: UpdateEvent;
};

export type MutationUpdateEventTemplateArgs = {
  input: UpdateEventTemplate;
};

export type MutationUpdateManyBenefitsArgs = {
  input: UpdateManyBenefitsInput;
};

export type MutationUpdateManyBusinessUsersArgs = {
  input: UpdateManyBusinessUsersInput;
};

export type MutationUpdateManyBusinessesArgs = {
  input: UpdateManyBusinessesInput;
};

export type MutationUpdateManyDiscountsArgs = {
  input: UpdateManyDiscountsInput;
};

export type MutationUpdateManyEventPriceCategoriesArgs = {
  input: UpdateManyEventPriceCategoriesInput;
};

export type MutationUpdateManyEventTemplatesArgs = {
  input: UpdateManyEventTemplatesInput;
};

export type MutationUpdateManyEventsArgs = {
  input: UpdateManyEventsInput;
};

export type MutationUpdateManyMembershipTypesArgs = {
  input: UpdateManyMembershipTypesInput;
};

export type MutationUpdateManyMembershipsArgs = {
  input: UpdateManyMembershipsInput;
};

export type MutationUpdateManyOrdersArgs = {
  input: UpdateManyOrdersInput;
};

export type MutationUpdateManySeatsArgs = {
  input: UpdateManySeatsInput;
};

export type MutationUpdateManySectionsArgs = {
  input: UpdateManySectionsInput;
};

export type MutationUpdateManyTicketsArgs = {
  input: UpdateManyTicketsInput;
};

export type MutationUpdateManyUserBenefitDtosArgs = {
  input: UpdateManyUserBenefitDtosInput;
};

export type MutationUpdateManyUsersArgs = {
  input: UpdateManyUsersInput;
};

export type MutationUpdateManyVenuesArgs = {
  input: UpdateManyVenuesInput;
};

export type MutationUpdateOneBenefitArgs = {
  input: UpdateOneBenefitInput;
};

export type MutationUpdateOneBusinessArgs = {
  input: UpdateOneBusinessInput;
};

export type MutationUpdateOneBusinessUserArgs = {
  input: UpdateOneBusinessUserInput;
};

export type MutationUpdateOneDiscountArgs = {
  input: UpdateOneDiscountInput;
};

export type MutationUpdateOneEventArgs = {
  input: UpdateOneEventInput;
};

export type MutationUpdateOneEventPriceCategoryArgs = {
  input: UpdateOneEventPriceCategoryInput;
};

export type MutationUpdateOneEventTemplateArgs = {
  input: UpdateOneEventTemplateInput;
};

export type MutationUpdateOneMembershipArgs = {
  input: UpdateOneMembershipInput;
};

export type MutationUpdateOneMembershipTypeArgs = {
  input: UpdateOneMembershipTypeInput;
};

export type MutationUpdateOneOrderArgs = {
  input: UpdateOneOrderInput;
};

export type MutationUpdateOneSeatArgs = {
  input: UpdateOneSeatInput;
};

export type MutationUpdateOneSectionArgs = {
  input: UpdateOneSectionInput;
};

export type MutationUpdateOneTicketArgs = {
  input: UpdateOneTicketInput;
};

export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};

export type MutationUpdateOneUserBenefitDtoArgs = {
  input: UpdateOneUserBenefitDtoInput;
};

export type MutationUpdateOneVenueArgs = {
  input: UpdateOneVenueInput;
};

export type MutationUpdatePasswordArgs = {
  input: UpdatePassword;
};

export type NumberFieldComparison = {
  between?: InputMaybe<NumberFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  notBetween?: InputMaybe<NumberFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export type OffsetPageInfo = {
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Order = {
  business: Business;
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  total: Scalars['Float']['output'];
  updated: Scalars['DateTime']['output'];
  user: User;
};

export type OrderConnection = {
  /** Array of nodes. */
  nodes: Array<Order>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type OrderDeleteFilter = {
  and?: InputMaybe<Array<OrderDeleteFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderDeleteFilter>>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type OrderDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderFilter = {
  and?: InputMaybe<Array<OrderFilter>>;
  business?: InputMaybe<OrderFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderFilter>>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  user?: InputMaybe<OrderFilterUserFilter>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type OrderFilterBusinessFilter = {
  and?: InputMaybe<Array<OrderFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<OrderFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type OrderFilterUserFilter = {
  and?: InputMaybe<Array<OrderFilterUserFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<OrderFilterUserFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type OrderSort = {
  direction: SortDirection;
  field: OrderSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type OrderSortFields =
  | 'businessId'
  | 'created'
  | 'id'
  | 'total'
  | 'updated'
  | 'userId';

export type OrderSubscriptionFilter = {
  and?: InputMaybe<Array<OrderSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderSubscriptionFilter>>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type OrderUpdateFilter = {
  and?: InputMaybe<Array<OrderUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderUpdateFilter>>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type Query = {
  benefit: Benefit;
  benefits: BenefitConnection;
  business: Business;
  businessUser: BusinessUser;
  businessUsers: BusinessUserConnection;
  businesses: BusinessConnection;
  discount: Discount;
  discounts: DiscountConnection;
  event: Event;
  eventPriceCategories: EventPriceCategoryConnection;
  eventPriceCategory: EventPriceCategory;
  eventTemplate: EventTemplate;
  eventTemplates: EventTemplateConnection;
  events: EventConnection;
  getBusinessMetrics: BusinessMetrics;
  getEventPrices: EventPriceCategoryAvailable;
  getUserBenefits: UserBenefits;
  getUserBusinesses: BusinessConnection;
  getUserTickets: TicketSet;
  membership: Membership;
  membershipType: MembershipType;
  membershipTypes: MembershipTypeConnection;
  memberships: MembershipConnection;
  order: Order;
  orders: OrderConnection;
  profileInfo: UserProfile;
  seat: Seat;
  seats: SeatConnection;
  section: Section;
  sections: SectionConnection;
  ticket: Ticket;
  ticketAggregate: Array<TicketAggregateResponse>;
  tickets: TicketConnection;
  user: User;
  userBenefitDto: UserBenefitDto;
  userBenefitDtos: UserBenefitDtoConnection;
  users: UserConnection;
  venue: Venue;
  venues: VenueConnection;
};

export type QueryBenefitArgs = {
  id: Scalars['ID']['input'];
};

export type QueryBenefitsArgs = {
  filter?: BenefitFilter;
  paging?: OffsetPaging;
  sorting?: Array<BenefitSort>;
};

export type QueryBusinessArgs = {
  id: Scalars['ID']['input'];
};

export type QueryBusinessUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryBusinessUsersArgs = {
  filter?: BusinessUserFilter;
  paging?: OffsetPaging;
  sorting?: Array<BusinessUserSort>;
};

export type QueryBusinessesArgs = {
  filter?: BusinessFilter;
  paging?: OffsetPaging;
  sorting?: Array<BusinessSort>;
};

export type QueryDiscountArgs = {
  id: Scalars['ID']['input'];
};

export type QueryDiscountsArgs = {
  filter?: DiscountFilter;
  paging?: OffsetPaging;
  sorting?: Array<DiscountSort>;
};

export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEventPriceCategoriesArgs = {
  filter?: EventPriceCategoryFilter;
  paging?: OffsetPaging;
  sorting?: Array<EventPriceCategorySort>;
};

export type QueryEventPriceCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEventTemplateArgs = {
  id: Scalars['ID']['input'];
};

export type QueryEventTemplatesArgs = {
  filter?: EventTemplateFilter;
  paging?: OffsetPaging;
  sorting?: Array<EventTemplateSort>;
};

export type QueryEventsArgs = {
  filter?: EventFilter;
  paging?: OffsetPaging;
  sorting?: Array<EventSort>;
};

export type QueryGetBusinessMetricsArgs = {
  meta: Scalars['String']['input'];
};

export type QueryGetEventPricesArgs = {
  filter?: EventPriceCategoryFilter;
  meta: Scalars['String']['input'];
  paging?: OffsetPaging;
  sorting?: Array<EventPriceCategorySort>;
};

export type QueryGetUserBenefitsArgs = {
  filter?: BenefitFilter;
  meta: Scalars['String']['input'];
  paging?: OffsetPaging;
  sorting?: Array<BenefitSort>;
};

export type QueryGetUserBusinessesArgs = {
  filter?: BusinessFilter;
  meta: Scalars['String']['input'];
  paging?: OffsetPaging;
  sorting?: Array<BusinessSort>;
};

export type QueryGetUserTicketsArgs = {
  filter?: TicketFilter;
  paging?: OffsetPaging;
  sorting?: Array<TicketSort>;
};

export type QueryMembershipArgs = {
  id: Scalars['ID']['input'];
};

export type QueryMembershipTypeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryMembershipTypesArgs = {
  filter?: MembershipTypeFilter;
  paging?: OffsetPaging;
  sorting?: Array<MembershipTypeSort>;
};

export type QueryMembershipsArgs = {
  filter?: MembershipFilter;
  paging?: OffsetPaging;
  sorting?: Array<MembershipSort>;
};

export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};

export type QueryOrdersArgs = {
  filter?: OrderFilter;
  paging?: OffsetPaging;
  sorting?: Array<OrderSort>;
};

export type QueryProfileInfoArgs = {
  filter?: UserFilter;
  meta: Scalars['String']['input'];
  paging?: OffsetPaging;
  sorting?: Array<UserSort>;
};

export type QuerySeatArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySeatsArgs = {
  filter?: SeatFilter;
  paging?: OffsetPaging;
  sorting?: Array<SeatSort>;
};

export type QuerySectionArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySectionsArgs = {
  filter?: SectionFilter;
  paging?: OffsetPaging;
  sorting?: Array<SectionSort>;
};

export type QueryTicketArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTicketAggregateArgs = {
  filter?: InputMaybe<TicketAggregateFilter>;
};

export type QueryTicketsArgs = {
  filter?: TicketFilter;
  paging?: OffsetPaging;
  sorting?: Array<TicketSort>;
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUserBenefitDtoArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUserBenefitDtosArgs = {
  filter?: UserBenefitDtoFilter;
  paging?: OffsetPaging;
  sorting?: Array<UserBenefitDtoSort>;
};

export type QueryUsersArgs = {
  filter?: UserFilter;
  paging?: OffsetPaging;
  sorting?: Array<UserSort>;
};

export type QueryVenueArgs = {
  id: Scalars['ID']['input'];
};

export type QueryVenuesArgs = {
  filter?: VenueFilter;
  paging?: OffsetPaging;
  sorting?: Array<VenueSort>;
};

export type Role = 'Admin' | 'User';

export type RoleFilterComparison = {
  eq?: InputMaybe<Role>;
  gt?: InputMaybe<Role>;
  gte?: InputMaybe<Role>;
  iLike?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Role>;
  lt?: InputMaybe<Role>;
  lte?: InputMaybe<Role>;
  neq?: InputMaybe<Role>;
  notILike?: InputMaybe<Role>;
  notIn?: InputMaybe<Array<Role>>;
  notLike?: InputMaybe<Role>;
};

export type Seat = {
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  row: Scalars['String']['output'];
  seat: Scalars['Float']['output'];
  section: Section;
  updated: Scalars['DateTime']['output'];
};

export type SeatConnection = {
  /** Array of nodes. */
  nodes: Array<Seat>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SeatDeleteFilter = {
  and?: InputMaybe<Array<SeatDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SeatDeleteFilter>>;
  row?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type SeatDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  row?: Maybe<Scalars['String']['output']>;
  seat?: Maybe<Scalars['Float']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type SeatFilter = {
  and?: InputMaybe<Array<SeatFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SeatFilter>>;
  row?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<NumberFieldComparison>;
  section?: InputMaybe<SeatFilterSectionFilter>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type SeatFilterSectionFilter = {
  and?: InputMaybe<Array<SeatFilterSectionFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SeatFilterSectionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type SeatSort = {
  direction: SortDirection;
  field: SeatSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type SeatSortFields =
  | 'created'
  | 'id'
  | 'row'
  | 'seat'
  | 'sectionId'
  | 'updated';

export type SeatSubscriptionFilter = {
  and?: InputMaybe<Array<SeatSubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SeatSubscriptionFilter>>;
  row?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type SeatUpdateFilter = {
  and?: InputMaybe<Array<SeatUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<SeatUpdateFilter>>;
  row?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type Section = {
  capacity: Scalars['Float']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  venue: Venue;
};

export type SectionConnection = {
  /** Array of nodes. */
  nodes: Array<Section>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type SectionDeleteFilter = {
  and?: InputMaybe<Array<SectionDeleteFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SectionDeleteFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type SectionDeleteResponse = {
  capacity?: Maybe<Scalars['Float']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type SectionFilter = {
  and?: InputMaybe<Array<SectionFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SectionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venue?: InputMaybe<SectionFilterVenueFilter>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type SectionFilterVenueFilter = {
  and?: InputMaybe<Array<SectionFilterVenueFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SectionFilterVenueFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type SectionSort = {
  direction: SortDirection;
  field: SectionSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type SectionSortFields =
  | 'capacity'
  | 'created'
  | 'id'
  | 'name'
  | 'updated'
  | 'venueId';

export type SectionSubscriptionFilter = {
  and?: InputMaybe<Array<SectionSubscriptionFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SectionSubscriptionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type SectionUpdateFilter = {
  and?: InputMaybe<Array<SectionUpdateFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SectionUpdateFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

/** Sort Directions */
export type SortDirection = 'ASC' | 'DESC';

/** Sort Nulls Options */
export type SortNulls = 'NULLS_FIRST' | 'NULLS_LAST';

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  createdBenefit: Benefit;
  createdBusiness: Business;
  createdBusinessUser: BusinessUser;
  createdDiscount: Discount;
  createdEvent: Event;
  createdEventPriceCategory: EventPriceCategory;
  createdEventTemplate: EventTemplate;
  createdMembership: Membership;
  createdMembershipType: MembershipType;
  createdOrder: Order;
  createdSeat: Seat;
  createdSection: Section;
  createdTicket: Ticket;
  createdUser: User;
  createdUserBenefitDto: UserBenefitDto;
  createdVenue: Venue;
  deletedManyBenefits: DeleteManyResponse;
  deletedManyBusinessUsers: DeleteManyResponse;
  deletedManyBusinesses: DeleteManyResponse;
  deletedManyDiscounts: DeleteManyResponse;
  deletedManyEventPriceCategories: DeleteManyResponse;
  deletedManyEventTemplates: DeleteManyResponse;
  deletedManyEvents: DeleteManyResponse;
  deletedManyMembershipTypes: DeleteManyResponse;
  deletedManyMemberships: DeleteManyResponse;
  deletedManyOrders: DeleteManyResponse;
  deletedManySeats: DeleteManyResponse;
  deletedManySections: DeleteManyResponse;
  deletedManyTickets: DeleteManyResponse;
  deletedManyUserBenefitDtos: DeleteManyResponse;
  deletedManyUsers: DeleteManyResponse;
  deletedManyVenues: DeleteManyResponse;
  deletedOneBenefit: BenefitDeleteResponse;
  deletedOneBusiness: BusinessDeleteResponse;
  deletedOneBusinessUser: BusinessUserDeleteResponse;
  deletedOneDiscount: DiscountDeleteResponse;
  deletedOneEvent: EventDeleteResponse;
  deletedOneEventPriceCategory: EventPriceCategoryDeleteResponse;
  deletedOneEventTemplate: EventTemplateDeleteResponse;
  deletedOneMembership: MembershipDeleteResponse;
  deletedOneMembershipType: MembershipTypeDeleteResponse;
  deletedOneOrder: OrderDeleteResponse;
  deletedOneSeat: SeatDeleteResponse;
  deletedOneSection: SectionDeleteResponse;
  deletedOneTicket: TicketDeleteResponse;
  deletedOneUser: UserDeleteResponse;
  deletedOneUserBenefitDto: UserBenefitDtoDeleteResponse;
  deletedOneVenue: VenueDeleteResponse;
  updatedManyBenefits: UpdateManyResponse;
  updatedManyBusinessUsers: UpdateManyResponse;
  updatedManyBusinesses: UpdateManyResponse;
  updatedManyDiscounts: UpdateManyResponse;
  updatedManyEventPriceCategories: UpdateManyResponse;
  updatedManyEventTemplates: UpdateManyResponse;
  updatedManyEvents: UpdateManyResponse;
  updatedManyMembershipTypes: UpdateManyResponse;
  updatedManyMemberships: UpdateManyResponse;
  updatedManyOrders: UpdateManyResponse;
  updatedManySeats: UpdateManyResponse;
  updatedManySections: UpdateManyResponse;
  updatedManyTickets: UpdateManyResponse;
  updatedManyUserBenefitDtos: UpdateManyResponse;
  updatedManyUsers: UpdateManyResponse;
  updatedManyVenues: UpdateManyResponse;
  updatedOneBenefit: Benefit;
  updatedOneBusiness: Business;
  updatedOneBusinessUser: BusinessUser;
  updatedOneDiscount: Discount;
  updatedOneEvent: Event;
  updatedOneEventPriceCategory: EventPriceCategory;
  updatedOneEventTemplate: EventTemplate;
  updatedOneMembership: Membership;
  updatedOneMembershipType: MembershipType;
  updatedOneOrder: Order;
  updatedOneSeat: Seat;
  updatedOneSection: Section;
  updatedOneTicket: Ticket;
  updatedOneUser: User;
  updatedOneUserBenefitDto: UserBenefitDto;
  updatedOneVenue: Venue;
};

export type SubscriptionCreatedBenefitArgs = {
  input?: InputMaybe<CreateBenefitSubscriptionFilterInput>;
};

export type SubscriptionCreatedBusinessArgs = {
  input?: InputMaybe<CreateBusinessSubscriptionFilterInput>;
};

export type SubscriptionCreatedBusinessUserArgs = {
  input?: InputMaybe<CreateBusinessUserSubscriptionFilterInput>;
};

export type SubscriptionCreatedDiscountArgs = {
  input?: InputMaybe<CreateDiscountSubscriptionFilterInput>;
};

export type SubscriptionCreatedEventArgs = {
  input?: InputMaybe<CreateEventSubscriptionFilterInput>;
};

export type SubscriptionCreatedEventPriceCategoryArgs = {
  input?: InputMaybe<CreateEventPriceCategorySubscriptionFilterInput>;
};

export type SubscriptionCreatedEventTemplateArgs = {
  input?: InputMaybe<CreateEventTemplateSubscriptionFilterInput>;
};

export type SubscriptionCreatedMembershipArgs = {
  input?: InputMaybe<CreateMembershipSubscriptionFilterInput>;
};

export type SubscriptionCreatedMembershipTypeArgs = {
  input?: InputMaybe<CreateMembershipTypeSubscriptionFilterInput>;
};

export type SubscriptionCreatedOrderArgs = {
  input?: InputMaybe<CreateOrderSubscriptionFilterInput>;
};

export type SubscriptionCreatedSeatArgs = {
  input?: InputMaybe<CreateSeatSubscriptionFilterInput>;
};

export type SubscriptionCreatedSectionArgs = {
  input?: InputMaybe<CreateSectionSubscriptionFilterInput>;
};

export type SubscriptionCreatedTicketArgs = {
  input?: InputMaybe<CreateTicketSubscriptionFilterInput>;
};

export type SubscriptionCreatedUserArgs = {
  input?: InputMaybe<CreateUserSubscriptionFilterInput>;
};

export type SubscriptionCreatedUserBenefitDtoArgs = {
  input?: InputMaybe<CreateUserBenefitDtoSubscriptionFilterInput>;
};

export type SubscriptionCreatedVenueArgs = {
  input?: InputMaybe<CreateVenueSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneBenefitArgs = {
  input?: InputMaybe<DeleteOneBenefitSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneBusinessArgs = {
  input?: InputMaybe<DeleteOneBusinessSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneBusinessUserArgs = {
  input?: InputMaybe<DeleteOneBusinessUserSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneDiscountArgs = {
  input?: InputMaybe<DeleteOneDiscountSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneEventArgs = {
  input?: InputMaybe<DeleteOneEventSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneEventPriceCategoryArgs = {
  input?: InputMaybe<DeleteOneEventPriceCategorySubscriptionFilterInput>;
};

export type SubscriptionDeletedOneEventTemplateArgs = {
  input?: InputMaybe<DeleteOneEventTemplateSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneMembershipArgs = {
  input?: InputMaybe<DeleteOneMembershipSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneMembershipTypeArgs = {
  input?: InputMaybe<DeleteOneMembershipTypeSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneOrderArgs = {
  input?: InputMaybe<DeleteOneOrderSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneSeatArgs = {
  input?: InputMaybe<DeleteOneSeatSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneSectionArgs = {
  input?: InputMaybe<DeleteOneSectionSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneTicketArgs = {
  input?: InputMaybe<DeleteOneTicketSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneUserArgs = {
  input?: InputMaybe<DeleteOneUserSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneUserBenefitDtoArgs = {
  input?: InputMaybe<DeleteOneUserBenefitDtoSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneVenueArgs = {
  input?: InputMaybe<DeleteOneVenueSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneBenefitArgs = {
  input?: InputMaybe<UpdateOneBenefitSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneBusinessArgs = {
  input?: InputMaybe<UpdateOneBusinessSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneBusinessUserArgs = {
  input?: InputMaybe<UpdateOneBusinessUserSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneDiscountArgs = {
  input?: InputMaybe<UpdateOneDiscountSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneEventArgs = {
  input?: InputMaybe<UpdateOneEventSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneEventPriceCategoryArgs = {
  input?: InputMaybe<UpdateOneEventPriceCategorySubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneEventTemplateArgs = {
  input?: InputMaybe<UpdateOneEventTemplateSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneMembershipArgs = {
  input?: InputMaybe<UpdateOneMembershipSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneMembershipTypeArgs = {
  input?: InputMaybe<UpdateOneMembershipTypeSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneOrderArgs = {
  input?: InputMaybe<UpdateOneOrderSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneSeatArgs = {
  input?: InputMaybe<UpdateOneSeatSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneSectionArgs = {
  input?: InputMaybe<UpdateOneSectionSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneTicketArgs = {
  input?: InputMaybe<UpdateOneTicketSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneUserArgs = {
  input?: InputMaybe<UpdateOneUserSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneUserBenefitDtoArgs = {
  input?: InputMaybe<UpdateOneUserBenefitDtoSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneVenueArgs = {
  input?: InputMaybe<UpdateOneVenueSubscriptionFilterInput>;
};

export type TemplateType = 'Child' | 'Parent';

export type TemplateTypeFilterComparison = {
  eq?: InputMaybe<TemplateType>;
  gt?: InputMaybe<TemplateType>;
  gte?: InputMaybe<TemplateType>;
  iLike?: InputMaybe<TemplateType>;
  in?: InputMaybe<Array<TemplateType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<TemplateType>;
  lt?: InputMaybe<TemplateType>;
  lte?: InputMaybe<TemplateType>;
  neq?: InputMaybe<TemplateType>;
  notILike?: InputMaybe<TemplateType>;
  notIn?: InputMaybe<Array<TemplateType>>;
  notLike?: InputMaybe<TemplateType>;
};

export type Ticket = {
  business: Business;
  created: Scalars['DateTime']['output'];
  discount?: Maybe<Discount>;
  event: Event;
  id: Scalars['ID']['output'];
  order?: Maybe<Order>;
  price: Scalars['Float']['output'];
  seat?: Maybe<Seat>;
  section: Section;
  updated: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  validated?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilter>>;
  business?: InputMaybe<TicketAggregateFilterBusinessAggregateFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  discount?: InputMaybe<TicketAggregateFilterDiscountAggregateFilter>;
  event?: InputMaybe<TicketAggregateFilterEventAggregateFilter>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketAggregateFilter>>;
  order?: InputMaybe<TicketAggregateFilterOrderAggregateFilter>;
  price?: InputMaybe<NumberFieldComparison>;
  seat?: InputMaybe<TicketAggregateFilterSeatAggregateFilter>;
  section?: InputMaybe<TicketAggregateFilterSectionAggregateFilter>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  user?: InputMaybe<TicketAggregateFilterUserAggregateFilter>;
  userId?: InputMaybe<StringFieldComparison>;
  validated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateFilterBusinessAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterBusinessAggregateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterBusinessAggregateFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateFilterDiscountAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterDiscountAggregateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterDiscountAggregateFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateFilterEventAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterEventAggregateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterEventAggregateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateFilterOrderAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterOrderAggregateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterOrderAggregateFilter>>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type TicketAggregateFilterSeatAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterSeatAggregateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterSeatAggregateFilter>>;
  row?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateFilterSectionAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterSectionAggregateFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterSectionAggregateFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type TicketAggregateFilterUserAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterUserAggregateFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterUserAggregateFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateGroupBy = {
  businessId?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  sectionId?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  validated?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketAggregateGroupByCreatedArgs = {
  by?: GroupBy;
};

export type TicketAggregateGroupByUpdatedArgs = {
  by?: GroupBy;
};

export type TicketAggregateGroupByValidatedArgs = {
  by?: GroupBy;
};

export type TicketAggregateResponse = {
  avg?: Maybe<TicketAvgAggregate>;
  count?: Maybe<TicketCountAggregate>;
  groupBy?: Maybe<TicketAggregateGroupBy>;
  max?: Maybe<TicketMaxAggregate>;
  min?: Maybe<TicketMinAggregate>;
  sum?: Maybe<TicketSumAggregate>;
};

export type TicketAvgAggregate = {
  price?: Maybe<Scalars['Float']['output']>;
};

export type TicketConnection = {
  /** Array of nodes. */
  nodes: Array<Ticket>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TicketCountAggregate = {
  businessId?: Maybe<Scalars['Int']['output']>;
  created?: Maybe<Scalars['Int']['output']>;
  eventId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  sectionId?: Maybe<Scalars['Int']['output']>;
  updated?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  validated?: Maybe<Scalars['Int']['output']>;
};

export type TicketDeleteFilter = {
  and?: InputMaybe<Array<TicketDeleteFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketDeleteFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
  validated?: InputMaybe<DateFieldComparison>;
};

export type TicketDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  validated?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketFilter = {
  and?: InputMaybe<Array<TicketFilter>>;
  business?: InputMaybe<TicketFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  discount?: InputMaybe<TicketFilterDiscountFilter>;
  event?: InputMaybe<TicketFilterEventFilter>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketFilter>>;
  order?: InputMaybe<TicketFilterOrderFilter>;
  price?: InputMaybe<NumberFieldComparison>;
  seat?: InputMaybe<TicketFilterSeatFilter>;
  section?: InputMaybe<TicketFilterSectionFilter>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  user?: InputMaybe<TicketFilterUserFilter>;
  userId?: InputMaybe<StringFieldComparison>;
  validated?: InputMaybe<DateFieldComparison>;
};

export type TicketFilterBusinessFilter = {
  and?: InputMaybe<Array<TicketFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketFilterDiscountFilter = {
  and?: InputMaybe<Array<TicketFilterDiscountFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterDiscountFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketFilterEventFilter = {
  and?: InputMaybe<Array<TicketFilterEventFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterEventFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketFilterOrderFilter = {
  and?: InputMaybe<Array<TicketFilterOrderFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketFilterOrderFilter>>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type TicketFilterSeatFilter = {
  and?: InputMaybe<Array<TicketFilterSeatFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketFilterSeatFilter>>;
  row?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketFilterSectionFilter = {
  and?: InputMaybe<Array<TicketFilterSectionFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterSectionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type TicketFilterUserFilter = {
  and?: InputMaybe<Array<TicketFilterUserFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterUserFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketMaxAggregate = {
  businessId?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  sectionId?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  validated?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketMinAggregate = {
  businessId?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  sectionId?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  validated?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketSet = {
  invalid: Array<UserTickets>;
  valid: Array<UserTickets>;
};

export type TicketSort = {
  direction: SortDirection;
  field: TicketSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type TicketSortFields =
  | 'businessId'
  | 'created'
  | 'eventId'
  | 'id'
  | 'price'
  | 'sectionId'
  | 'updated'
  | 'userId'
  | 'validated';

export type TicketSubscriptionFilter = {
  and?: InputMaybe<Array<TicketSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketSubscriptionFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
  validated?: InputMaybe<DateFieldComparison>;
};

export type TicketSumAggregate = {
  price?: Maybe<Scalars['Float']['output']>;
};

export type TicketUpdateFilter = {
  and?: InputMaybe<Array<TicketUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketUpdateFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
  validated?: InputMaybe<DateFieldComparison>;
};

export type UpdateBenefit = {
  description?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateBusiness = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Currency>;
  id?: InputMaybe<Scalars['ID']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateBusinessUser = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  role?: InputMaybe<Role>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateDiscount = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  percentage?: InputMaybe<Scalars['Float']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateEvent = {
  category?: InputMaybe<Category>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  language?: InputMaybe<Language>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  subtitles?: InputMaybe<Language>;
  venueData?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateEventPriceCategory = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  eventTemplateId: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sectionId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateEventTemplate = {
  category?: InputMaybe<Category>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventPriceCategory?: InputMaybe<Array<UpdateEventPriceCategory>>;
  id: Scalars['ID']['input'];
  language?: InputMaybe<Language>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  subtitles?: InputMaybe<Language>;
  type?: InputMaybe<TemplateType>;
  venueId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateManyBenefitsInput = {
  /** Filter used to find fields to update */
  filter: BenefitUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateBenefit;
};

export type UpdateManyBusinessUsersInput = {
  /** Filter used to find fields to update */
  filter: BusinessUserUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateBusinessUser;
};

export type UpdateManyBusinessesInput = {
  /** Filter used to find fields to update */
  filter: BusinessUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateBusiness;
};

export type UpdateManyDiscountsInput = {
  /** Filter used to find fields to update */
  filter: DiscountUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateDiscount;
};

export type UpdateManyEventPriceCategoriesInput = {
  /** Filter used to find fields to update */
  filter: EventPriceCategoryUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateEventPriceCategory;
};

export type UpdateManyEventTemplatesInput = {
  /** Filter used to find fields to update */
  filter: EventTemplateUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateEventTemplate;
};

export type UpdateManyEventsInput = {
  /** Filter used to find fields to update */
  filter: EventUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateEvent;
};

export type UpdateManyMembershipTypesInput = {
  /** Filter used to find fields to update */
  filter: MembershipTypeUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateMembershipType;
};

export type UpdateManyMembershipsInput = {
  /** Filter used to find fields to update */
  filter: MembershipUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateMembership;
};

export type UpdateManyOrdersInput = {
  /** Filter used to find fields to update */
  filter: OrderUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateOrder;
};

export type UpdateManyResponse = {
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManySeatsInput = {
  /** Filter used to find fields to update */
  filter: SeatUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateSeat;
};

export type UpdateManySectionsInput = {
  /** Filter used to find fields to update */
  filter: SectionUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateSection;
};

export type UpdateManyTicketsInput = {
  /** Filter used to find fields to update */
  filter: TicketUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTicket;
};

export type UpdateManyUserBenefitDtosInput = {
  /** Filter used to find fields to update */
  filter: UserBenefitDtoUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateUserBenefitDto;
};

export type UpdateManyUsersInput = {
  /** Filter used to find fields to update */
  filter: UserUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateUser;
};

export type UpdateManyVenuesInput = {
  /** Filter used to find fields to update */
  filter: VenueUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateVenue;
};

export type UpdateMembership = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateMembershipType = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateOneBenefitInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateBenefit;
};

export type UpdateOneBenefitSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BenefitSubscriptionFilter;
};

export type UpdateOneBusinessInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateBusiness;
};

export type UpdateOneBusinessSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BusinessSubscriptionFilter;
};

export type UpdateOneBusinessUserInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateBusinessUser;
};

export type UpdateOneBusinessUserSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: BusinessUserSubscriptionFilter;
};

export type UpdateOneDiscountInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateDiscount;
};

export type UpdateOneDiscountSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: DiscountSubscriptionFilter;
};

export type UpdateOneEventInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateEvent;
};

export type UpdateOneEventPriceCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateEventPriceCategory;
};

export type UpdateOneEventPriceCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventPriceCategorySubscriptionFilter;
};

export type UpdateOneEventSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventSubscriptionFilter;
};

export type UpdateOneEventTemplateInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateEventTemplate;
};

export type UpdateOneEventTemplateSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventTemplateSubscriptionFilter;
};

export type UpdateOneMembershipInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateMembership;
};

export type UpdateOneMembershipSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: MembershipSubscriptionFilter;
};

export type UpdateOneMembershipTypeInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateMembershipType;
};

export type UpdateOneMembershipTypeSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: MembershipTypeSubscriptionFilter;
};

export type UpdateOneOrderInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateOrder;
};

export type UpdateOneOrderSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: OrderSubscriptionFilter;
};

export type UpdateOneSeatInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateSeat;
};

export type UpdateOneSeatSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: SeatSubscriptionFilter;
};

export type UpdateOneSectionInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateSection;
};

export type UpdateOneSectionSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: SectionSubscriptionFilter;
};

export type UpdateOneTicketInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTicket;
};

export type UpdateOneTicketSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TicketSubscriptionFilter;
};

export type UpdateOneUserBenefitDtoInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateUserBenefitDto;
};

export type UpdateOneUserBenefitDtoSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserBenefitDtoSubscriptionFilter;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateUser;
};

export type UpdateOneUserSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserSubscriptionFilter;
};

export type UpdateOneVenueInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateVenue;
};

export type UpdateOneVenueSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: VenueSubscriptionFilter;
};

export type UpdateOrder = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdatePassword = {
  password: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdateSeat = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  row?: InputMaybe<Scalars['String']['input']>;
  seat?: InputMaybe<Scalars['Float']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSection = {
  capacity?: InputMaybe<Scalars['Float']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTicket = {
  discountId?: InputMaybe<Scalars['ID']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  seatId?: InputMaybe<Scalars['ID']['input']>;
  sectionId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  validated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUser = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  defaultBusinessId?: InputMaybe<Scalars['ID']['input']>;
  deleted?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  placeOfResidence?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserBenefitDto = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateVenue = {
  buildingNumber?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  hasSeats?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type User = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  birthDate: Scalars['DateTime']['output'];
  created: Scalars['DateTime']['output'];
  defaultBusiness?: Maybe<Business>;
  deleted?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  placeOfResidence?: Maybe<Scalars['String']['output']>;
  updated: Scalars['DateTime']['output'];
};

export type UserBenefitDto = {
  benefit: Benefit;
  business: Business;
  created: Scalars['DateTime']['output'];
  user: User;
};

export type UserBenefitDtoConnection = {
  /** Array of nodes. */
  nodes: Array<UserBenefitDto>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type UserBenefitDtoDeleteFilter = {
  and?: InputMaybe<Array<UserBenefitDtoDeleteFilter>>;
  benefitId?: InputMaybe<StringFieldComparison>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDtoDeleteFilter>>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefitDtoDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
};

export type UserBenefitDtoFilter = {
  and?: InputMaybe<Array<UserBenefitDtoFilter>>;
  benefit?: InputMaybe<UserBenefitDtoFilterBenefitFilter>;
  benefitId?: InputMaybe<StringFieldComparison>;
  business?: InputMaybe<UserBenefitDtoFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDtoFilter>>;
  user?: InputMaybe<UserBenefitDtoFilterUserFilter>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefitDtoFilterBenefitFilter = {
  and?: InputMaybe<Array<UserBenefitDtoFilterBenefitFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDtoFilterBenefitFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserBenefitDtoFilterBusinessFilter = {
  and?: InputMaybe<Array<UserBenefitDtoFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDtoFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserBenefitDtoFilterUserFilter = {
  and?: InputMaybe<Array<UserBenefitDtoFilterUserFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDtoFilterUserFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserBenefitDtoSort = {
  direction: SortDirection;
  field: UserBenefitDtoSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type UserBenefitDtoSortFields =
  | 'benefitId'
  | 'businessId'
  | 'created'
  | 'userId';

export type UserBenefitDtoSubscriptionFilter = {
  and?: InputMaybe<Array<UserBenefitDtoSubscriptionFilter>>;
  benefitId?: InputMaybe<StringFieldComparison>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDtoSubscriptionFilter>>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefitDtoUpdateFilter = {
  and?: InputMaybe<Array<UserBenefitDtoUpdateFilter>>;
  benefitId?: InputMaybe<StringFieldComparison>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDtoUpdateFilter>>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefits = {
  available: Array<Benefit>;
  membershipPoints: Scalars['Float']['output'];
  unavailable: Array<Benefit>;
  used: Array<Benefit>;
};

export type UserConnection = {
  /** Array of nodes. */
  nodes: Array<User>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type UserDeleteFilter = {
  and?: InputMaybe<Array<UserDeleteFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserDeleteFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserDeleteResponse = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  deleted?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  placeOfResidence?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type UserFilter = {
  and?: InputMaybe<Array<UserFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusiness?: InputMaybe<UserFilterBusinessFilter>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserFilterBusinessFilter = {
  and?: InputMaybe<Array<UserFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserProfile = {
  avatarUrl?: Maybe<Scalars['String']['output']>;
  benefitsUsed: Scalars['Float']['output'];
  birthDate: Scalars['DateTime']['output'];
  created: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  eventsVisited: Scalars['Float']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  membershipPoints: Scalars['Float']['output'];
  placeOfResidence?: Maybe<Scalars['String']['output']>;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type UserSortFields =
  | 'avatarUrl'
  | 'birthDate'
  | 'created'
  | 'defaultBusinessId'
  | 'deleted'
  | 'email'
  | 'firstName'
  | 'id'
  | 'lastName'
  | 'placeOfResidence'
  | 'updated';

export type UserSubscriptionFilter = {
  and?: InputMaybe<Array<UserSubscriptionFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserSubscriptionFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserTickets = {
  id: Scalars['ID']['output'];
  ticketSet: Array<Ticket>;
};

export type UserUpdateFilter = {
  and?: InputMaybe<Array<UserUpdateFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserUpdateFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type Venue = {
  buildingNumber: Scalars['String']['output'];
  business: Business;
  capacity: Scalars['Float']['output'];
  city: Scalars['String']['output'];
  created: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  hasSeats: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  street: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type VenueConnection = {
  /** Array of nodes. */
  nodes: Array<Venue>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type VenueDeleteFilter = {
  and?: InputMaybe<Array<VenueDeleteFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<VenueDeleteFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type VenueDeleteResponse = {
  buildingNumber?: Maybe<Scalars['String']['output']>;
  capacity?: Maybe<Scalars['Float']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
  hasSeats?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type VenueFilter = {
  and?: InputMaybe<Array<VenueFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  business?: InputMaybe<VenueFilterBusinessFilter>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<VenueFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type VenueFilterBusinessFilter = {
  and?: InputMaybe<Array<VenueFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<VenueFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type VenueSection = {
  capacity: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type VenueSort = {
  direction: SortDirection;
  field: VenueSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type VenueSortFields =
  | 'buildingNumber'
  | 'capacity'
  | 'city'
  | 'created'
  | 'hasSeats'
  | 'id'
  | 'name'
  | 'street'
  | 'updated';

export type VenueSubscriptionFilter = {
  and?: InputMaybe<Array<VenueSubscriptionFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<VenueSubscriptionFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type VenueUpdateFilter = {
  and?: InputMaybe<Array<VenueUpdateFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<VenueUpdateFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};
