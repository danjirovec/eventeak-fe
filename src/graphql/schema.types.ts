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

export type BatchUserEmail = {
  emails: Array<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};

export type Benefit = {
  business: Business;
  created: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  membershipType?: Maybe<MembershipType>;
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
  membershipTypeId?: InputMaybe<StringFieldComparison>;
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
  membershipType?: InputMaybe<BenefitFilterMembershipTypeFilter>;
  membershipTypeId?: InputMaybe<StringFieldComparison>;
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

export type BenefitFilterMembershipTypeFilter = {
  and?: InputMaybe<Array<BenefitFilterMembershipTypeFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BenefitFilterMembershipTypeFilter>>;
  pointsPerTicket?: InputMaybe<NumberFieldComparison>;
  price?: InputMaybe<NumberFieldComparison>;
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
  | 'membershipTypeId'
  | 'name'
  | 'points'
  | 'updated';

export type BenefitSubscriptionFilter = {
  and?: InputMaybe<Array<BenefitSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  membershipTypeId?: InputMaybe<StringFieldComparison>;
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
  membershipTypeId?: InputMaybe<StringFieldComparison>;
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
  tickets: Array<Scalars['Float']['output']>;
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
  membershipTypeId?: InputMaybe<Scalars['ID']['input']>;
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
  date: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  templateId: Scalars['ID']['input'];
};

export type CreateEventSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventSubscriptionFilter;
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

export type CreateManyPriceCategoriesInput = {
  /** Array of records to create */
  priceCategories: Array<CreatePriceCategory>;
};

export type CreateManyRowsInput = {
  /** Array of records to create */
  rows: Array<CreateRow>;
};

export type CreateManySeatsInput = {
  /** Array of records to create */
  seats: Array<CreateSeat>;
};

export type CreateManySectionsInput = {
  /** Array of records to create */
  sections: Array<CreateSection>;
};

export type CreateManyTemplateDiscountsInput = {
  /** Array of records to create */
  templateDiscounts: Array<CreateTemplateDiscount>;
};

export type CreateManyTemplatesInput = {
  /** Array of records to create */
  templates: Array<CreateTemplate>;
};

export type CreateManyTicketsInput = {
  /** Array of records to create */
  tickets: Array<CreateTicket>;
};

export type CreateManyUserBenefitsInput = {
  /** Array of records to create */
  userBenefits: Array<CreateUserBenefit>;
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
  membershipTypeId: Scalars['ID']['input'];
  order: CreateOrder;
  points?: InputMaybe<Scalars['Float']['input']>;
  state?: MembershipState;
  userId: Scalars['ID']['input'];
};

export type CreateMembershipSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: MembershipSubscriptionFilter;
};

export type CreateMembershipType = {
  businessId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  pointsPerTicket: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
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

export type CreateOnePriceCategoryInput = {
  /** The record to create */
  priceCategory: CreatePriceCategory;
};

export type CreateOneRowInput = {
  /** The record to create */
  row: CreateRow;
};

export type CreateOneSeatInput = {
  /** The record to create */
  seat: CreateSeat;
};

export type CreateOneSectionInput = {
  /** The record to create */
  section: CreateSection;
};

export type CreateOneTemplateDiscountInput = {
  /** The record to create */
  templateDiscount: CreateTemplateDiscount;
};

export type CreateOneTemplateInput = {
  /** The record to create */
  template: CreateTemplate;
};

export type CreateOneTicketInput = {
  /** The record to create */
  ticket: CreateTicket;
};

export type CreateOneUserBenefitInput = {
  /** The record to create */
  userBenefit: CreateUserBenefit;
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
  paymentId?: InputMaybe<Scalars['String']['input']>;
  paymentType?: PaymentType;
  total: Scalars['Float']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateOrderSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: OrderSubscriptionFilter;
};

export type CreatePayment = {
  amount: Scalars['Float']['input'];
  currency?: Currency;
  email: Scalars['String']['input'];
  paymentType?: PaymentType;
};

export type CreatePriceCategory = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sectionId: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  templateId: Scalars['ID']['input'];
};

export type CreatePriceCategoryInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sectionId: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreatePriceCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: PriceCategorySubscriptionFilter;
};

export type CreateRow = {
  name: Scalars['String']['input'];
  sectionId: Scalars['String']['input'];
};

export type CreateRowSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: RowSubscriptionFilter;
};

export type CreateSeat = {
  name: Scalars['String']['input'];
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

export type CreateTemplate = {
  businessId: Scalars['ID']['input'];
  category: Category;
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Array<Scalars['String']['input']>>;
  language?: InputMaybe<Language>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  priceCategory: Array<CreatePriceCategoryInput>;
  subtitles?: InputMaybe<Language>;
  type: Type;
  venueId: Scalars['ID']['input'];
};

export type CreateTemplateDiscount = {
  discountId: Scalars['ID']['input'];
  templateId: Scalars['ID']['input'];
};

export type CreateTemplateDiscountSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TemplateDiscountSubscriptionFilter;
};

export type CreateTemplateSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TemplateSubscriptionFilter;
};

export type CreateTicket = {
  businessId: Scalars['ID']['input'];
  discountId?: InputMaybe<Scalars['ID']['input']>;
  eventId: Scalars['ID']['input'];
  price: Scalars['Float']['input'];
  rowId?: InputMaybe<Scalars['ID']['input']>;
  seatId?: InputMaybe<Scalars['ID']['input']>;
  sectionId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  validated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTicketExtra = {
  businessId: Scalars['ID']['input'];
  customEmail?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Scalars['String']['input']>;
  discountId?: InputMaybe<Scalars['ID']['input']>;
  eventId: Scalars['ID']['input'];
  price: Scalars['Float']['input'];
  row?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['ID']['input']>;
  seat?: InputMaybe<Scalars['Float']['input']>;
  seatId?: InputMaybe<Scalars['ID']['input']>;
  section: Scalars['String']['input'];
  sectionId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  validated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateTicketOrder = {
  order: CreateOrder;
  tickets: Array<CreateTicketExtra>;
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

export type CreateUserBenefitSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserBenefitSubscriptionFilter;
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
  hasSeats: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  seatMap?: InputMaybe<Scalars['JSON']['input']>;
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

export type DeleteManyPriceCategoriesInput = {
  /** Filter to find records to delete */
  filter: PriceCategoryDeleteFilter;
};

export type DeleteManyResponse = {
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManyRowsInput = {
  /** Filter to find records to delete */
  filter: RowDeleteFilter;
};

export type DeleteManySeatsInput = {
  /** Filter to find records to delete */
  filter: SeatDeleteFilter;
};

export type DeleteManySectionsInput = {
  /** Filter to find records to delete */
  filter: SectionDeleteFilter;
};

export type DeleteManyTemplateDiscountsInput = {
  /** Filter to find records to delete */
  filter: TemplateDiscountDeleteFilter;
};

export type DeleteManyTemplatesInput = {
  /** Filter to find records to delete */
  filter: TemplateDeleteFilter;
};

export type DeleteManyTicketsInput = {
  /** Filter to find records to delete */
  filter: TicketDeleteFilter;
};

export type DeleteManyUserBenefitsInput = {
  /** Filter to find records to delete */
  filter: UserBenefitDeleteFilter;
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

export type DeleteOneEventSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventSubscriptionFilter;
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

export type DeleteOnePriceCategoryInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOnePriceCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: PriceCategorySubscriptionFilter;
};

export type DeleteOneRowInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneRowSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: RowSubscriptionFilter;
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

export type DeleteOneTemplateDiscountInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTemplateDiscountSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TemplateDiscountSubscriptionFilter;
};

export type DeleteOneTemplateInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTemplateSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TemplateSubscriptionFilter;
};

export type DeleteOneTicketInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTicketSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TicketSubscriptionFilter;
};

export type DeleteOneUserBenefitInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneUserBenefitSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserBenefitSubscriptionFilter;
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
  businessId?: InputMaybe<StringFieldComparison>;
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
  businessId?: InputMaybe<StringFieldComparison>;
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
  | 'businessId'
  | 'created'
  | 'id'
  | 'name'
  | 'percentage'
  | 'updated';

export type DiscountSubscriptionFilter = {
  and?: InputMaybe<Array<DiscountSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountSubscriptionFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type DiscountUpdateFilter = {
  and?: InputMaybe<Array<DiscountUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<DiscountUpdateFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type Event = {
  business: Business;
  created: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  seatMap?: Maybe<Scalars['JSON']['output']>;
  template: Template;
  updated: Scalars['DateTime']['output'];
};

export type EventCheckoutDto = {
  discounts?: Maybe<Array<Discount>>;
  events: Array<Event>;
  priceCategories?: Maybe<PriceCategoryAvailable>;
  tickets?: Maybe<Array<Ticket>>;
  users: Array<User>;
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
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventDeleteFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  seatMap?: Maybe<Scalars['JSON']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type EventFilter = {
  and?: InputMaybe<Array<EventFilter>>;
  business?: InputMaybe<EventFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilter>>;
  template?: InputMaybe<EventFilterTemplateFilter>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
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

export type EventFilterTemplateFilter = {
  and?: InputMaybe<Array<EventFilterTemplateFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventFilterTemplateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type EventSort = {
  direction: SortDirection;
  field: EventSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type EventSortFields =
  | 'businessId'
  | 'created'
  | 'date'
  | 'id'
  | 'name'
  | 'templateId'
  | 'updated';

export type EventSubscriptionFilter = {
  and?: InputMaybe<Array<EventSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventSubscriptionFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type EventTicketSold = {
  capacity: Scalars['Float']['output'];
  eventId: Scalars['ID']['output'];
  sold: Scalars['Float']['output'];
};

export type EventUpdateFilter = {
  and?: InputMaybe<Array<EventUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<EventUpdateFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
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
  membershipType: MembershipType;
  points: Scalars['Float']['output'];
  state: MembershipState;
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
  membershipTypeId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipDeleteFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  state?: InputMaybe<MembershipStateFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type MembershipDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<MembershipState>;
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
  membershipTypeId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  state?: InputMaybe<MembershipStateFilterComparison>;
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
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipFilterMembershipTypeFilter>>;
  pointsPerTicket?: InputMaybe<NumberFieldComparison>;
  price?: InputMaybe<NumberFieldComparison>;
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
  | 'membershipTypeId'
  | 'points'
  | 'state'
  | 'updated'
  | 'userId';

export type MembershipState = 'Active' | 'Renewal';

export type MembershipStateFilterComparison = {
  eq?: InputMaybe<MembershipState>;
  gt?: InputMaybe<MembershipState>;
  gte?: InputMaybe<MembershipState>;
  iLike?: InputMaybe<MembershipState>;
  in?: InputMaybe<Array<MembershipState>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<MembershipState>;
  lt?: InputMaybe<MembershipState>;
  lte?: InputMaybe<MembershipState>;
  neq?: InputMaybe<MembershipState>;
  notILike?: InputMaybe<MembershipState>;
  notIn?: InputMaybe<Array<MembershipState>>;
  notLike?: InputMaybe<MembershipState>;
};

export type MembershipSubscriptionFilter = {
  and?: InputMaybe<Array<MembershipSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  membershipTypeId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipSubscriptionFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  state?: InputMaybe<MembershipStateFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type MembershipType = {
  business: Business;
  created: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pointsPerTicket: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
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
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeDeleteFilter>>;
  pointsPerTicket?: InputMaybe<NumberFieldComparison>;
  price?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipTypeDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pointsPerTicket?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type MembershipTypeFilter = {
  and?: InputMaybe<Array<MembershipTypeFilter>>;
  business?: InputMaybe<MembershipTypeFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeFilter>>;
  pointsPerTicket?: InputMaybe<NumberFieldComparison>;
  price?: InputMaybe<NumberFieldComparison>;
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

export type MembershipTypeSortFields =
  | 'businessId'
  | 'created'
  | 'description'
  | 'id'
  | 'name'
  | 'pointsPerTicket'
  | 'price'
  | 'updated';

export type MembershipTypeSubscriptionFilter = {
  and?: InputMaybe<Array<MembershipTypeSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeSubscriptionFilter>>;
  pointsPerTicket?: InputMaybe<NumberFieldComparison>;
  price?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipTypeUpdateFilter = {
  and?: InputMaybe<Array<MembershipTypeUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipTypeUpdateFilter>>;
  pointsPerTicket?: InputMaybe<NumberFieldComparison>;
  price?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type MembershipUpdateFilter = {
  and?: InputMaybe<Array<MembershipUpdateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  membershipTypeId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<MembershipUpdateFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  state?: InputMaybe<MembershipStateFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type Mutation = {
  anonymizeUser: Scalars['String']['output'];
  createBusiness: Business;
  createEvent: Event;
  createManyBenefits: Array<Benefit>;
  createManyBusinessUsers: Array<BusinessUser>;
  createManyBusinesses: Array<Business>;
  createManyDiscounts: Array<Discount>;
  createManyEvents: Array<Event>;
  createManyMembershipTypes: Array<MembershipType>;
  createManyMemberships: Array<Membership>;
  createManyOrders: Array<Order>;
  createManyPriceCategories: Array<PriceCategory>;
  createManyRows: Array<Row>;
  createManySeats: Array<Seat>;
  createManySections: Array<Section>;
  createManyTemplateDiscounts: Array<TemplateDiscount>;
  createManyTemplates: Array<Template>;
  createManyTickets: Array<Ticket>;
  createManyUserBenefits: Array<UserBenefit>;
  createManyUsers: Array<User>;
  createManyVenues: Array<Venue>;
  createMembership: Membership;
  createOneBenefit: Benefit;
  createOneBusiness: Business;
  createOneBusinessUser: BusinessUser;
  createOneDiscount: Discount;
  createOneEvent: Event;
  createOneMembership: Membership;
  createOneMembershipType: MembershipType;
  createOneOrder: Order;
  createOnePriceCategory: PriceCategory;
  createOneRow: Row;
  createOneSeat: Seat;
  createOneSection: Section;
  createOneTemplate: Template;
  createOneTemplateDiscount: TemplateDiscount;
  createOneTicket: Ticket;
  createOneUser: User;
  createOneUserBenefit: UserBenefit;
  createOneVenue: Venue;
  createTemplate: Template;
  createTickets: Event;
  createVenue: Venue;
  deleteManyBenefits: DeleteManyResponse;
  deleteManyBusinessUsers: DeleteManyResponse;
  deleteManyBusinesses: DeleteManyResponse;
  deleteManyDiscounts: DeleteManyResponse;
  deleteManyEvents: DeleteManyResponse;
  deleteManyMembershipTypes: DeleteManyResponse;
  deleteManyMemberships: DeleteManyResponse;
  deleteManyOrders: DeleteManyResponse;
  deleteManyPriceCategories: DeleteManyResponse;
  deleteManyRows: DeleteManyResponse;
  deleteManySeats: DeleteManyResponse;
  deleteManySections: DeleteManyResponse;
  deleteManyTemplateDiscounts: DeleteManyResponse;
  deleteManyTemplates: DeleteManyResponse;
  deleteManyTickets: DeleteManyResponse;
  deleteManyUserBenefits: DeleteManyResponse;
  deleteManyUsers: DeleteManyResponse;
  deleteManyVenues: DeleteManyResponse;
  deleteOneBenefit: BenefitDeleteResponse;
  deleteOneBusiness: BusinessDeleteResponse;
  deleteOneBusinessUser: BusinessUserDeleteResponse;
  deleteOneDiscount: DiscountDeleteResponse;
  deleteOneEvent: EventDeleteResponse;
  deleteOneMembership: MembershipDeleteResponse;
  deleteOneMembershipType: MembershipTypeDeleteResponse;
  deleteOneOrder: OrderDeleteResponse;
  deleteOnePriceCategory: PriceCategoryDeleteResponse;
  deleteOneRow: RowDeleteResponse;
  deleteOneSeat: SeatDeleteResponse;
  deleteOneSection: SectionDeleteResponse;
  deleteOneTemplate: TemplateDeleteResponse;
  deleteOneTemplateDiscount: TemplateDiscountDeleteResponse;
  deleteOneTicket: TicketDeleteResponse;
  deleteOneUser: UserDeleteResponse;
  deleteOneUserBenefit: UserBenefitDeleteResponse;
  deleteOneVenue: VenueDeleteResponse;
  payment: Payment;
  sendEmail: Scalars['Boolean']['output'];
  updateEvent: Event;
  updateManyBenefits: UpdateManyResponse;
  updateManyBusinessUsers: UpdateManyResponse;
  updateManyBusinesses: UpdateManyResponse;
  updateManyDiscounts: UpdateManyResponse;
  updateManyEvents: UpdateManyResponse;
  updateManyMembershipTypes: UpdateManyResponse;
  updateManyMemberships: UpdateManyResponse;
  updateManyOrders: UpdateManyResponse;
  updateManyPriceCategories: UpdateManyResponse;
  updateManyRows: UpdateManyResponse;
  updateManySeats: UpdateManyResponse;
  updateManySections: UpdateManyResponse;
  updateManyTemplateDiscounts: UpdateManyResponse;
  updateManyTemplates: UpdateManyResponse;
  updateManyTickets: UpdateManyResponse;
  updateManyUserBenefits: UpdateManyResponse;
  updateManyUsers: UpdateManyResponse;
  updateManyVenues: UpdateManyResponse;
  updateOneBenefit: Benefit;
  updateOneBusiness: Business;
  updateOneBusinessUser: BusinessUser;
  updateOneDiscount: Discount;
  updateOneEvent: Event;
  updateOneMembership: Membership;
  updateOneMembershipType: MembershipType;
  updateOneOrder: Order;
  updateOnePriceCategory: PriceCategory;
  updateOneRow: Row;
  updateOneSeat: Seat;
  updateOneSection: Section;
  updateOneTemplate: Template;
  updateOneTemplateDiscount: TemplateDiscount;
  updateOneTicket: Ticket;
  updateOneUser: User;
  updateOneUserBenefit: UserBenefit;
  updateOneVenue: Venue;
  updatePassword: Scalars['String']['output'];
  updateTemplate: Template;
  updateVenue: Venue;
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

export type MutationCreateManyPriceCategoriesArgs = {
  input: CreateManyPriceCategoriesInput;
};

export type MutationCreateManyRowsArgs = {
  input: CreateManyRowsInput;
};

export type MutationCreateManySeatsArgs = {
  input: CreateManySeatsInput;
};

export type MutationCreateManySectionsArgs = {
  input: CreateManySectionsInput;
};

export type MutationCreateManyTemplateDiscountsArgs = {
  input: CreateManyTemplateDiscountsInput;
};

export type MutationCreateManyTemplatesArgs = {
  input: CreateManyTemplatesInput;
};

export type MutationCreateManyTicketsArgs = {
  input: CreateManyTicketsInput;
};

export type MutationCreateManyUserBenefitsArgs = {
  input: CreateManyUserBenefitsInput;
};

export type MutationCreateManyUsersArgs = {
  input: CreateManyUsersInput;
};

export type MutationCreateManyVenuesArgs = {
  input: CreateManyVenuesInput;
};

export type MutationCreateMembershipArgs = {
  input: CreateMembership;
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

export type MutationCreateOneMembershipArgs = {
  input: CreateOneMembershipInput;
};

export type MutationCreateOneMembershipTypeArgs = {
  input: CreateOneMembershipTypeInput;
};

export type MutationCreateOneOrderArgs = {
  input: CreateOneOrderInput;
};

export type MutationCreateOnePriceCategoryArgs = {
  input: CreateOnePriceCategoryInput;
};

export type MutationCreateOneRowArgs = {
  input: CreateOneRowInput;
};

export type MutationCreateOneSeatArgs = {
  input: CreateOneSeatInput;
};

export type MutationCreateOneSectionArgs = {
  input: CreateOneSectionInput;
};

export type MutationCreateOneTemplateArgs = {
  input: CreateOneTemplateInput;
};

export type MutationCreateOneTemplateDiscountArgs = {
  input: CreateOneTemplateDiscountInput;
};

export type MutationCreateOneTicketArgs = {
  input: CreateOneTicketInput;
};

export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};

export type MutationCreateOneUserBenefitArgs = {
  input: CreateOneUserBenefitInput;
};

export type MutationCreateOneVenueArgs = {
  input: CreateOneVenueInput;
};

export type MutationCreateTemplateArgs = {
  input: CreateTemplate;
};

export type MutationCreateTicketsArgs = {
  input: CreateTicketOrder;
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

export type MutationDeleteManyPriceCategoriesArgs = {
  input: DeleteManyPriceCategoriesInput;
};

export type MutationDeleteManyRowsArgs = {
  input: DeleteManyRowsInput;
};

export type MutationDeleteManySeatsArgs = {
  input: DeleteManySeatsInput;
};

export type MutationDeleteManySectionsArgs = {
  input: DeleteManySectionsInput;
};

export type MutationDeleteManyTemplateDiscountsArgs = {
  input: DeleteManyTemplateDiscountsInput;
};

export type MutationDeleteManyTemplatesArgs = {
  input: DeleteManyTemplatesInput;
};

export type MutationDeleteManyTicketsArgs = {
  input: DeleteManyTicketsInput;
};

export type MutationDeleteManyUserBenefitsArgs = {
  input: DeleteManyUserBenefitsInput;
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

export type MutationDeleteOneMembershipArgs = {
  input: DeleteOneMembershipInput;
};

export type MutationDeleteOneMembershipTypeArgs = {
  input: DeleteOneMembershipTypeInput;
};

export type MutationDeleteOneOrderArgs = {
  input: DeleteOneOrderInput;
};

export type MutationDeleteOnePriceCategoryArgs = {
  input: DeleteOnePriceCategoryInput;
};

export type MutationDeleteOneRowArgs = {
  input: DeleteOneRowInput;
};

export type MutationDeleteOneSeatArgs = {
  input: DeleteOneSeatInput;
};

export type MutationDeleteOneSectionArgs = {
  input: DeleteOneSectionInput;
};

export type MutationDeleteOneTemplateArgs = {
  input: DeleteOneTemplateInput;
};

export type MutationDeleteOneTemplateDiscountArgs = {
  input: DeleteOneTemplateDiscountInput;
};

export type MutationDeleteOneTicketArgs = {
  input: DeleteOneTicketInput;
};

export type MutationDeleteOneUserArgs = {
  input: DeleteOneUserInput;
};

export type MutationDeleteOneUserBenefitArgs = {
  input: DeleteOneUserBenefitInput;
};

export type MutationDeleteOneVenueArgs = {
  input: DeleteOneVenueInput;
};

export type MutationPaymentArgs = {
  input: CreatePayment;
};

export type MutationSendEmailArgs = {
  input: BatchUserEmail;
};

export type MutationUpdateEventArgs = {
  input: UpdateEvent;
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

export type MutationUpdateManyPriceCategoriesArgs = {
  input: UpdateManyPriceCategoriesInput;
};

export type MutationUpdateManyRowsArgs = {
  input: UpdateManyRowsInput;
};

export type MutationUpdateManySeatsArgs = {
  input: UpdateManySeatsInput;
};

export type MutationUpdateManySectionsArgs = {
  input: UpdateManySectionsInput;
};

export type MutationUpdateManyTemplateDiscountsArgs = {
  input: UpdateManyTemplateDiscountsInput;
};

export type MutationUpdateManyTemplatesArgs = {
  input: UpdateManyTemplatesInput;
};

export type MutationUpdateManyTicketsArgs = {
  input: UpdateManyTicketsInput;
};

export type MutationUpdateManyUserBenefitsArgs = {
  input: UpdateManyUserBenefitsInput;
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

export type MutationUpdateOneMembershipArgs = {
  input: UpdateOneMembershipInput;
};

export type MutationUpdateOneMembershipTypeArgs = {
  input: UpdateOneMembershipTypeInput;
};

export type MutationUpdateOneOrderArgs = {
  input: UpdateOneOrderInput;
};

export type MutationUpdateOnePriceCategoryArgs = {
  input: UpdateOnePriceCategoryInput;
};

export type MutationUpdateOneRowArgs = {
  input: UpdateOneRowInput;
};

export type MutationUpdateOneSeatArgs = {
  input: UpdateOneSeatInput;
};

export type MutationUpdateOneSectionArgs = {
  input: UpdateOneSectionInput;
};

export type MutationUpdateOneTemplateArgs = {
  input: UpdateOneTemplateInput;
};

export type MutationUpdateOneTemplateDiscountArgs = {
  input: UpdateOneTemplateDiscountInput;
};

export type MutationUpdateOneTicketArgs = {
  input: UpdateOneTicketInput;
};

export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};

export type MutationUpdateOneUserBenefitArgs = {
  input: UpdateOneUserBenefitInput;
};

export type MutationUpdateOneVenueArgs = {
  input: UpdateOneVenueInput;
};

export type MutationUpdatePasswordArgs = {
  input: UpdatePassword;
};

export type MutationUpdateTemplateArgs = {
  input: UpdateTemplate;
};

export type MutationUpdateVenueArgs = {
  input: UpdateVenue;
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
  paymentId?: Maybe<Scalars['String']['output']>;
  paymentType: PaymentType;
  total: Scalars['Float']['output'];
  updated: Scalars['DateTime']['output'];
  user?: Maybe<User>;
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
  paymentId?: InputMaybe<StringFieldComparison>;
  paymentType?: InputMaybe<PaymentTypeFilterComparison>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type OrderDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  paymentId?: Maybe<Scalars['String']['output']>;
  paymentType?: Maybe<PaymentType>;
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
  paymentId?: InputMaybe<StringFieldComparison>;
  paymentType?: InputMaybe<PaymentTypeFilterComparison>;
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

export type OrderGraph = {
  date: Scalars['String']['output'];
  total: Scalars['Float']['output'];
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
  | 'paymentId'
  | 'paymentType'
  | 'total'
  | 'updated'
  | 'userId';

export type OrderSubscriptionFilter = {
  and?: InputMaybe<Array<OrderSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<OrderSubscriptionFilter>>;
  paymentId?: InputMaybe<StringFieldComparison>;
  paymentType?: InputMaybe<PaymentTypeFilterComparison>;
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
  paymentId?: InputMaybe<StringFieldComparison>;
  paymentType?: InputMaybe<PaymentTypeFilterComparison>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type Payment = {
  clientSecret: Scalars['String']['output'];
  paymentId: Scalars['String']['output'];
  publishableKey: Scalars['String']['output'];
};

export type PaymentType = 'Membership' | 'Ticket';

export type PaymentTypeFilterComparison = {
  eq?: InputMaybe<PaymentType>;
  gt?: InputMaybe<PaymentType>;
  gte?: InputMaybe<PaymentType>;
  iLike?: InputMaybe<PaymentType>;
  in?: InputMaybe<Array<PaymentType>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<PaymentType>;
  lt?: InputMaybe<PaymentType>;
  lte?: InputMaybe<PaymentType>;
  neq?: InputMaybe<PaymentType>;
  notILike?: InputMaybe<PaymentType>;
  notIn?: InputMaybe<Array<PaymentType>>;
  notLike?: InputMaybe<PaymentType>;
};

export type PriceCategory = {
  created: Scalars['DateTime']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  section: Section;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  template: Template;
  updated: Scalars['DateTime']['output'];
};

export type PriceCategoryAvailable = {
  counts: Array<Scalars['Float']['output']>;
  nodes: Array<PriceCategory>;
};

export type PriceCategoryConnection = {
  /** Array of nodes. */
  nodes: Array<PriceCategory>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type PriceCategoryDeleteFilter = {
  and?: InputMaybe<Array<PriceCategoryDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PriceCategoryDeleteFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type PriceCategoryDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type PriceCategoryFilter = {
  and?: InputMaybe<Array<PriceCategoryFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PriceCategoryFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  section?: InputMaybe<PriceCategoryFilterSectionFilter>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  template?: InputMaybe<PriceCategoryFilterTemplateFilter>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type PriceCategoryFilterSectionFilter = {
  and?: InputMaybe<Array<PriceCategoryFilterSectionFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PriceCategoryFilterSectionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type PriceCategoryFilterTemplateFilter = {
  and?: InputMaybe<Array<PriceCategoryFilterTemplateFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PriceCategoryFilterTemplateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type PriceCategorySort = {
  direction: SortDirection;
  field: PriceCategorySortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type PriceCategorySortFields =
  | 'created'
  | 'endDate'
  | 'id'
  | 'name'
  | 'price'
  | 'sectionId'
  | 'startDate'
  | 'templateId'
  | 'updated';

export type PriceCategorySubscriptionFilter = {
  and?: InputMaybe<Array<PriceCategorySubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PriceCategorySubscriptionFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type PriceCategoryUpdateFilter = {
  and?: InputMaybe<Array<PriceCategoryUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  endDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<PriceCategoryUpdateFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  startDate?: InputMaybe<DateFieldComparison>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type PublishableKey = {
  publishableKey: Scalars['String']['output'];
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
  events: EventConnection;
  getBusinessMetrics: BusinessMetrics;
  getEventCheckout: EventCheckoutDto;
  getEventPrices: PriceCategoryAvailable;
  getOrderTotals: Array<OrderGraph>;
  getPublishableKey: PublishableKey;
  getTicketsSold: Array<EventTicketSold>;
  getUserBenefits: UserBenefits;
  getUserBusinesses: BusinessConnection;
  getUserTickets: TicketSet;
  membership: Membership;
  membershipType: MembershipType;
  membershipTypes: MembershipTypeConnection;
  memberships: MembershipConnection;
  order: Order;
  orders: OrderConnection;
  priceCategories: PriceCategoryConnection;
  priceCategory: PriceCategory;
  profileInfo: UserProfile;
  row: Row;
  rows: RowConnection;
  seat: Seat;
  seats: SeatConnection;
  section: Section;
  sections: SectionConnection;
  template: Template;
  templateDiscount: TemplateDiscount;
  templateDiscounts: TemplateDiscountConnection;
  templates: TemplateConnection;
  ticket: Ticket;
  ticketAggregate: Array<TicketAggregateResponse>;
  tickets: TicketConnection;
  user: User;
  userBenefit: UserBenefit;
  userBenefits: UserBenefitConnection;
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

export type QueryEventsArgs = {
  filter?: EventFilter;
  paging?: OffsetPaging;
  sorting?: Array<EventSort>;
};

export type QueryGetBusinessMetricsArgs = {
  meta: Scalars['String']['input'];
};

export type QueryGetEventCheckoutArgs = {
  meta: Scalars['String']['input'];
};

export type QueryGetEventPricesArgs = {
  filter?: PriceCategoryFilter;
  meta: Scalars['String']['input'];
  paging?: OffsetPaging;
  sorting?: Array<PriceCategorySort>;
};

export type QueryGetOrderTotalsArgs = {
  meta: Scalars['String']['input'];
};

export type QueryGetTicketsSoldArgs = {
  meta: Scalars['String']['input'];
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

export type QueryPriceCategoriesArgs = {
  filter?: PriceCategoryFilter;
  paging?: OffsetPaging;
  sorting?: Array<PriceCategorySort>;
};

export type QueryPriceCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProfileInfoArgs = {
  filter?: UserFilter;
  meta: Scalars['String']['input'];
  paging?: OffsetPaging;
  sorting?: Array<UserSort>;
};

export type QueryRowArgs = {
  id: Scalars['ID']['input'];
};

export type QueryRowsArgs = {
  filter?: RowFilter;
  paging?: OffsetPaging;
  sorting?: Array<RowSort>;
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

export type QueryTemplateArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTemplateDiscountArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTemplateDiscountsArgs = {
  filter?: TemplateDiscountFilter;
  paging?: OffsetPaging;
  sorting?: Array<TemplateDiscountSort>;
};

export type QueryTemplatesArgs = {
  filter?: TemplateFilter;
  paging?: OffsetPaging;
  sorting?: Array<TemplateSort>;
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

export type QueryUserBenefitArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUserBenefitsArgs = {
  filter?: UserBenefitFilter;
  paging?: OffsetPaging;
  sorting?: Array<UserBenefitSort>;
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

export type Role = 'Admin' | 'Customer';

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

export type Row = {
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  section: Section;
  updated: Scalars['DateTime']['output'];
};

export type RowConnection = {
  /** Array of nodes. */
  nodes: Array<Row>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type RowDeleteFilter = {
  and?: InputMaybe<Array<RowDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RowDeleteFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type RowDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type RowFilter = {
  and?: InputMaybe<Array<RowFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RowFilter>>;
  section?: InputMaybe<RowFilterSectionFilter>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type RowFilterSectionFilter = {
  and?: InputMaybe<Array<RowFilterSectionFilter>>;
  capacity?: InputMaybe<NumberFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RowFilterSectionFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type RowSort = {
  direction: SortDirection;
  field: RowSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type RowSortFields = 'created' | 'id' | 'name' | 'sectionId' | 'updated';

export type RowSubscriptionFilter = {
  and?: InputMaybe<Array<RowSubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RowSubscriptionFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type RowUpdateFilter = {
  and?: InputMaybe<Array<RowUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<RowUpdateFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type Seat = {
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
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
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SeatDeleteFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type SeatDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type SeatFilter = {
  and?: InputMaybe<Array<SeatFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SeatFilter>>;
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
  | 'name'
  | 'sectionId'
  | 'updated';

export type SeatSubscriptionFilter = {
  and?: InputMaybe<Array<SeatSubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SeatSubscriptionFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type SeatUpdateFilter = {
  and?: InputMaybe<Array<SeatUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<SeatUpdateFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type Section = {
  capacity?: Maybe<Scalars['Float']['output']>;
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
  createdMembership: Membership;
  createdMembershipType: MembershipType;
  createdOrder: Order;
  createdPriceCategory: PriceCategory;
  createdRow: Row;
  createdSeat: Seat;
  createdSection: Section;
  createdTemplate: Template;
  createdTemplateDiscount: TemplateDiscount;
  createdTicket: Ticket;
  createdUser: User;
  createdUserBenefit: UserBenefit;
  createdVenue: Venue;
  deletedManyBenefits: DeleteManyResponse;
  deletedManyBusinessUsers: DeleteManyResponse;
  deletedManyBusinesses: DeleteManyResponse;
  deletedManyDiscounts: DeleteManyResponse;
  deletedManyEvents: DeleteManyResponse;
  deletedManyMembershipTypes: DeleteManyResponse;
  deletedManyMemberships: DeleteManyResponse;
  deletedManyOrders: DeleteManyResponse;
  deletedManyPriceCategories: DeleteManyResponse;
  deletedManyRows: DeleteManyResponse;
  deletedManySeats: DeleteManyResponse;
  deletedManySections: DeleteManyResponse;
  deletedManyTemplateDiscounts: DeleteManyResponse;
  deletedManyTemplates: DeleteManyResponse;
  deletedManyTickets: DeleteManyResponse;
  deletedManyUserBenefits: DeleteManyResponse;
  deletedManyUsers: DeleteManyResponse;
  deletedManyVenues: DeleteManyResponse;
  deletedOneBenefit: BenefitDeleteResponse;
  deletedOneBusiness: BusinessDeleteResponse;
  deletedOneBusinessUser: BusinessUserDeleteResponse;
  deletedOneDiscount: DiscountDeleteResponse;
  deletedOneEvent: EventDeleteResponse;
  deletedOneMembership: MembershipDeleteResponse;
  deletedOneMembershipType: MembershipTypeDeleteResponse;
  deletedOneOrder: OrderDeleteResponse;
  deletedOnePriceCategory: PriceCategoryDeleteResponse;
  deletedOneRow: RowDeleteResponse;
  deletedOneSeat: SeatDeleteResponse;
  deletedOneSection: SectionDeleteResponse;
  deletedOneTemplate: TemplateDeleteResponse;
  deletedOneTemplateDiscount: TemplateDiscountDeleteResponse;
  deletedOneTicket: TicketDeleteResponse;
  deletedOneUser: UserDeleteResponse;
  deletedOneUserBenefit: UserBenefitDeleteResponse;
  deletedOneVenue: VenueDeleteResponse;
  updatedManyBenefits: UpdateManyResponse;
  updatedManyBusinessUsers: UpdateManyResponse;
  updatedManyBusinesses: UpdateManyResponse;
  updatedManyDiscounts: UpdateManyResponse;
  updatedManyEvents: UpdateManyResponse;
  updatedManyMembershipTypes: UpdateManyResponse;
  updatedManyMemberships: UpdateManyResponse;
  updatedManyOrders: UpdateManyResponse;
  updatedManyPriceCategories: UpdateManyResponse;
  updatedManyRows: UpdateManyResponse;
  updatedManySeats: UpdateManyResponse;
  updatedManySections: UpdateManyResponse;
  updatedManyTemplateDiscounts: UpdateManyResponse;
  updatedManyTemplates: UpdateManyResponse;
  updatedManyTickets: UpdateManyResponse;
  updatedManyUserBenefits: UpdateManyResponse;
  updatedManyUsers: UpdateManyResponse;
  updatedManyVenues: UpdateManyResponse;
  updatedOneBenefit: Benefit;
  updatedOneBusiness: Business;
  updatedOneBusinessUser: BusinessUser;
  updatedOneDiscount: Discount;
  updatedOneEvent: Event;
  updatedOneMembership: Membership;
  updatedOneMembershipType: MembershipType;
  updatedOneOrder: Order;
  updatedOnePriceCategory: PriceCategory;
  updatedOneRow: Row;
  updatedOneSeat: Seat;
  updatedOneSection: Section;
  updatedOneTemplate: Template;
  updatedOneTemplateDiscount: TemplateDiscount;
  updatedOneTicket: Ticket;
  updatedOneUser: User;
  updatedOneUserBenefit: UserBenefit;
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

export type SubscriptionCreatedMembershipArgs = {
  input?: InputMaybe<CreateMembershipSubscriptionFilterInput>;
};

export type SubscriptionCreatedMembershipTypeArgs = {
  input?: InputMaybe<CreateMembershipTypeSubscriptionFilterInput>;
};

export type SubscriptionCreatedOrderArgs = {
  input?: InputMaybe<CreateOrderSubscriptionFilterInput>;
};

export type SubscriptionCreatedPriceCategoryArgs = {
  input?: InputMaybe<CreatePriceCategorySubscriptionFilterInput>;
};

export type SubscriptionCreatedRowArgs = {
  input?: InputMaybe<CreateRowSubscriptionFilterInput>;
};

export type SubscriptionCreatedSeatArgs = {
  input?: InputMaybe<CreateSeatSubscriptionFilterInput>;
};

export type SubscriptionCreatedSectionArgs = {
  input?: InputMaybe<CreateSectionSubscriptionFilterInput>;
};

export type SubscriptionCreatedTemplateArgs = {
  input?: InputMaybe<CreateTemplateSubscriptionFilterInput>;
};

export type SubscriptionCreatedTemplateDiscountArgs = {
  input?: InputMaybe<CreateTemplateDiscountSubscriptionFilterInput>;
};

export type SubscriptionCreatedTicketArgs = {
  input?: InputMaybe<CreateTicketSubscriptionFilterInput>;
};

export type SubscriptionCreatedUserArgs = {
  input?: InputMaybe<CreateUserSubscriptionFilterInput>;
};

export type SubscriptionCreatedUserBenefitArgs = {
  input?: InputMaybe<CreateUserBenefitSubscriptionFilterInput>;
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

export type SubscriptionDeletedOneMembershipArgs = {
  input?: InputMaybe<DeleteOneMembershipSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneMembershipTypeArgs = {
  input?: InputMaybe<DeleteOneMembershipTypeSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneOrderArgs = {
  input?: InputMaybe<DeleteOneOrderSubscriptionFilterInput>;
};

export type SubscriptionDeletedOnePriceCategoryArgs = {
  input?: InputMaybe<DeleteOnePriceCategorySubscriptionFilterInput>;
};

export type SubscriptionDeletedOneRowArgs = {
  input?: InputMaybe<DeleteOneRowSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneSeatArgs = {
  input?: InputMaybe<DeleteOneSeatSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneSectionArgs = {
  input?: InputMaybe<DeleteOneSectionSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneTemplateArgs = {
  input?: InputMaybe<DeleteOneTemplateSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneTemplateDiscountArgs = {
  input?: InputMaybe<DeleteOneTemplateDiscountSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneTicketArgs = {
  input?: InputMaybe<DeleteOneTicketSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneUserArgs = {
  input?: InputMaybe<DeleteOneUserSubscriptionFilterInput>;
};

export type SubscriptionDeletedOneUserBenefitArgs = {
  input?: InputMaybe<DeleteOneUserBenefitSubscriptionFilterInput>;
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

export type SubscriptionUpdatedOneMembershipArgs = {
  input?: InputMaybe<UpdateOneMembershipSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneMembershipTypeArgs = {
  input?: InputMaybe<UpdateOneMembershipTypeSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneOrderArgs = {
  input?: InputMaybe<UpdateOneOrderSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOnePriceCategoryArgs = {
  input?: InputMaybe<UpdateOnePriceCategorySubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneRowArgs = {
  input?: InputMaybe<UpdateOneRowSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneSeatArgs = {
  input?: InputMaybe<UpdateOneSeatSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneSectionArgs = {
  input?: InputMaybe<UpdateOneSectionSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneTemplateArgs = {
  input?: InputMaybe<UpdateOneTemplateSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneTemplateDiscountArgs = {
  input?: InputMaybe<UpdateOneTemplateDiscountSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneTicketArgs = {
  input?: InputMaybe<UpdateOneTicketSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneUserArgs = {
  input?: InputMaybe<UpdateOneUserSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneUserBenefitArgs = {
  input?: InputMaybe<UpdateOneUserBenefitSubscriptionFilterInput>;
};

export type SubscriptionUpdatedOneVenueArgs = {
  input?: InputMaybe<UpdateOneVenueSubscriptionFilterInput>;
};

export type Template = {
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
  type: Type;
  updated: Scalars['DateTime']['output'];
  venue: Venue;
};

export type TemplateConnection = {
  /** Array of nodes. */
  nodes: Array<Template>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TemplateDeleteFilter = {
  and?: InputMaybe<Array<TemplateDeleteFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateDeleteFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type TemplateDeleteResponse = {
  category?: Maybe<Category>;
  created?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  language?: Maybe<Language>;
  length?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  posterUrl?: Maybe<Scalars['String']['output']>;
  subtitles?: Maybe<Language>;
  type?: Maybe<Type>;
  updated?: Maybe<Scalars['DateTime']['output']>;
};

export type TemplateDiscount = {
  created: Scalars['DateTime']['output'];
  discount: Discount;
  template: Template;
};

export type TemplateDiscountConnection = {
  /** Array of nodes. */
  nodes: Array<TemplateDiscount>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TemplateDiscountDeleteFilter = {
  and?: InputMaybe<Array<TemplateDiscountDeleteFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  discountId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateDiscountDeleteFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
};

export type TemplateDiscountDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
};

export type TemplateDiscountFilter = {
  and?: InputMaybe<Array<TemplateDiscountFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  discount?: InputMaybe<TemplateDiscountFilterDiscountFilter>;
  discountId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateDiscountFilter>>;
  template?: InputMaybe<TemplateDiscountFilterTemplateFilter>;
  templateId?: InputMaybe<StringFieldComparison>;
};

export type TemplateDiscountFilterDiscountFilter = {
  and?: InputMaybe<Array<TemplateDiscountFilterDiscountFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateDiscountFilterDiscountFilter>>;
  percentage?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TemplateDiscountFilterTemplateFilter = {
  and?: InputMaybe<Array<TemplateDiscountFilterTemplateFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateDiscountFilterTemplateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type TemplateDiscountSort = {
  direction: SortDirection;
  field: TemplateDiscountSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type TemplateDiscountSortFields =
  | 'created'
  | 'discountId'
  | 'templateId';

export type TemplateDiscountSubscriptionFilter = {
  and?: InputMaybe<Array<TemplateDiscountSubscriptionFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  discountId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateDiscountSubscriptionFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
};

export type TemplateDiscountUpdateFilter = {
  and?: InputMaybe<Array<TemplateDiscountUpdateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  discountId?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateDiscountUpdateFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
};

export type TemplateFilter = {
  and?: InputMaybe<Array<TemplateFilter>>;
  business?: InputMaybe<TemplateFilterBusinessFilter>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venue?: InputMaybe<TemplateFilterVenueFilter>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type TemplateFilterBusinessFilter = {
  and?: InputMaybe<Array<TemplateFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TemplateFilterVenueFilter = {
  and?: InputMaybe<Array<TemplateFilterVenueFilter>>;
  buildingNumber?: InputMaybe<StringFieldComparison>;
  capacity?: InputMaybe<NumberFieldComparison>;
  city?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  hasSeats?: InputMaybe<BooleanFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateFilterVenueFilter>>;
  street?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TemplateSort = {
  direction: SortDirection;
  field: TemplateSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type TemplateSortFields =
  | 'category'
  | 'created'
  | 'description'
  | 'id'
  | 'language'
  | 'length'
  | 'name'
  | 'subtitles'
  | 'type'
  | 'updated'
  | 'venueId';

export type TemplateSubscriptionFilter = {
  and?: InputMaybe<Array<TemplateSubscriptionFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateSubscriptionFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type TemplateUpdateFilter = {
  and?: InputMaybe<Array<TemplateUpdateFilter>>;
  category?: InputMaybe<CategoryFilterComparison>;
  created?: InputMaybe<DateFieldComparison>;
  description?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  language?: InputMaybe<LanguageFilterComparison>;
  length?: InputMaybe<NumberFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TemplateUpdateFilter>>;
  subtitles?: InputMaybe<LanguageFilterComparison>;
  type?: InputMaybe<TypeFilterComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  venueId?: InputMaybe<StringFieldComparison>;
};

export type Ticket = {
  business: Business;
  created: Scalars['DateTime']['output'];
  customEmail?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Discount>;
  event: Event;
  id: Scalars['ID']['output'];
  order?: Maybe<Order>;
  price: Scalars['Float']['output'];
  row?: Maybe<Row>;
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
  customEmail?: InputMaybe<StringFieldComparison>;
  discount?: InputMaybe<TicketAggregateFilterDiscountAggregateFilter>;
  event?: InputMaybe<TicketAggregateFilterEventAggregateFilter>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketAggregateFilter>>;
  order?: InputMaybe<TicketAggregateFilterOrderAggregateFilter>;
  price?: InputMaybe<NumberFieldComparison>;
  row?: InputMaybe<TicketAggregateFilterRowAggregateFilter>;
  rowId?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<TicketAggregateFilterSeatAggregateFilter>;
  seatId?: InputMaybe<StringFieldComparison>;
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
  businessId?: InputMaybe<StringFieldComparison>;
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
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterEventAggregateFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateFilterOrderAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterOrderAggregateFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterOrderAggregateFilter>>;
  paymentId?: InputMaybe<StringFieldComparison>;
  paymentType?: InputMaybe<PaymentTypeFilterComparison>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type TicketAggregateFilterRowAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterRowAggregateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterRowAggregateFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketAggregateFilterSeatAggregateFilter = {
  and?: InputMaybe<Array<TicketAggregateFilterSeatAggregateFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketAggregateFilterSeatAggregateFilter>>;
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
  customEmail?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  rowId?: Maybe<Scalars['String']['output']>;
  seatId?: Maybe<Scalars['String']['output']>;
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
  customEmail?: Maybe<Scalars['Int']['output']>;
  eventId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  rowId?: Maybe<Scalars['Int']['output']>;
  seatId?: Maybe<Scalars['Int']['output']>;
  sectionId?: Maybe<Scalars['Int']['output']>;
  updated?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  validated?: Maybe<Scalars['Int']['output']>;
};

export type TicketDeleteFilter = {
  and?: InputMaybe<Array<TicketDeleteFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  customEmail?: InputMaybe<StringFieldComparison>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketDeleteFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  rowId?: InputMaybe<StringFieldComparison>;
  seatId?: InputMaybe<StringFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
  validated?: InputMaybe<DateFieldComparison>;
};

export type TicketDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
  customEmail?: Maybe<Scalars['String']['output']>;
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
  customEmail?: InputMaybe<StringFieldComparison>;
  discount?: InputMaybe<TicketFilterDiscountFilter>;
  event?: InputMaybe<TicketFilterEventFilter>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketFilter>>;
  order?: InputMaybe<TicketFilterOrderFilter>;
  price?: InputMaybe<NumberFieldComparison>;
  row?: InputMaybe<TicketFilterRowFilter>;
  rowId?: InputMaybe<StringFieldComparison>;
  seat?: InputMaybe<TicketFilterSeatFilter>;
  seatId?: InputMaybe<StringFieldComparison>;
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
  businessId?: InputMaybe<StringFieldComparison>;
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
  created?: InputMaybe<DateFieldComparison>;
  date?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterEventFilter>>;
  templateId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketFilterOrderFilter = {
  and?: InputMaybe<Array<TicketFilterOrderFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketFilterOrderFilter>>;
  paymentId?: InputMaybe<StringFieldComparison>;
  paymentType?: InputMaybe<PaymentTypeFilterComparison>;
  total?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type TicketFilterRowFilter = {
  and?: InputMaybe<Array<TicketFilterRowFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterRowFilter>>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type TicketFilterSeatFilter = {
  and?: InputMaybe<Array<TicketFilterSeatFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TicketFilterSeatFilter>>;
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
  customEmail?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  rowId?: Maybe<Scalars['String']['output']>;
  seatId?: Maybe<Scalars['String']['output']>;
  sectionId?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  validated?: Maybe<Scalars['DateTime']['output']>;
};

export type TicketMinAggregate = {
  businessId?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  customEmail?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  rowId?: Maybe<Scalars['String']['output']>;
  seatId?: Maybe<Scalars['String']['output']>;
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
  | 'customEmail'
  | 'eventId'
  | 'id'
  | 'price'
  | 'rowId'
  | 'seatId'
  | 'sectionId'
  | 'updated'
  | 'userId'
  | 'validated';

export type TicketSubscriptionFilter = {
  and?: InputMaybe<Array<TicketSubscriptionFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  customEmail?: InputMaybe<StringFieldComparison>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketSubscriptionFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  rowId?: InputMaybe<StringFieldComparison>;
  seatId?: InputMaybe<StringFieldComparison>;
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
  customEmail?: InputMaybe<StringFieldComparison>;
  eventId?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  or?: InputMaybe<Array<TicketUpdateFilter>>;
  price?: InputMaybe<NumberFieldComparison>;
  rowId?: InputMaybe<StringFieldComparison>;
  seatId?: InputMaybe<StringFieldComparison>;
  sectionId?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
  userId?: InputMaybe<StringFieldComparison>;
  validated?: InputMaybe<DateFieldComparison>;
};

export type Type = 'Leaf' | 'Root';

export type TypeFilterComparison = {
  eq?: InputMaybe<Type>;
  gt?: InputMaybe<Type>;
  gte?: InputMaybe<Type>;
  iLike?: InputMaybe<Type>;
  in?: InputMaybe<Array<Type>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Type>;
  lt?: InputMaybe<Type>;
  lte?: InputMaybe<Type>;
  neq?: InputMaybe<Type>;
  notILike?: InputMaybe<Type>;
  notIn?: InputMaybe<Array<Type>>;
  notLike?: InputMaybe<Type>;
};

export type UpdateBenefit = {
  description?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  membershipTypeId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateBusiness = {
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
  name: Scalars['String']['input'];
  percentage: Scalars['Float']['input'];
};

export type UpdateEvent = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  seatMap?: InputMaybe<Scalars['JSON']['input']>;
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

export type UpdateManyPriceCategoriesInput = {
  /** Filter used to find fields to update */
  filter: PriceCategoryUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdatePriceCategory;
};

export type UpdateManyResponse = {
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManyRowsInput = {
  /** Filter used to find fields to update */
  filter: RowUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateRow;
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

export type UpdateManyTemplateDiscountsInput = {
  /** Filter used to find fields to update */
  filter: TemplateDiscountUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTemplateDiscount;
};

export type UpdateManyTemplatesInput = {
  /** Filter used to find fields to update */
  filter: TemplateUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTemplate;
};

export type UpdateManyTicketsInput = {
  /** Filter used to find fields to update */
  filter: TicketUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTicket;
};

export type UpdateManyUserBenefitsInput = {
  /** Filter used to find fields to update */
  filter: UserBenefitUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateUserBenefit;
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
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  membershipTypeId?: InputMaybe<Scalars['ID']['input']>;
  points?: InputMaybe<Scalars['Float']['input']>;
  state?: MembershipState;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateMembershipType = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pointsPerTicket?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
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

export type UpdateOneEventSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: EventSubscriptionFilter;
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

export type UpdateOnePriceCategoryInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdatePriceCategory;
};

export type UpdateOnePriceCategorySubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: PriceCategorySubscriptionFilter;
};

export type UpdateOneRowInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateRow;
};

export type UpdateOneRowSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: RowSubscriptionFilter;
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

export type UpdateOneTemplateDiscountInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTemplateDiscount;
};

export type UpdateOneTemplateDiscountSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TemplateDiscountSubscriptionFilter;
};

export type UpdateOneTemplateInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTemplate;
};

export type UpdateOneTemplateSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: TemplateSubscriptionFilter;
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

export type UpdateOneUserBenefitInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateUserBenefit;
};

export type UpdateOneUserBenefitSubscriptionFilterInput = {
  /** Specify to filter the records returned. */
  filter: UserBenefitSubscriptionFilter;
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
  paymentId?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePassword = {
  password: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdatePriceCategory = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sectionId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  templateId: Scalars['ID']['input'];
};

export type UpdateRow = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSeat = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSection = {
  capacity?: InputMaybe<Scalars['Float']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTemplate = {
  category?: InputMaybe<Category>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['ID']['input'];
  language?: InputMaybe<Language>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  priceCategory?: InputMaybe<Array<UpdatePriceCategory>>;
  subtitles?: InputMaybe<Language>;
  type?: InputMaybe<Type>;
  venueId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTemplateDiscount = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateTicket = {
  customEmail?: InputMaybe<Scalars['String']['input']>;
  discountId?: InputMaybe<Scalars['ID']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  rowId?: InputMaybe<Scalars['ID']['input']>;
  seatId?: InputMaybe<Scalars['ID']['input']>;
  sectionId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  validated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateUser = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  defaultBusinessId?: InputMaybe<Scalars['ID']['input']>;
  deleted?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  placeOfResidence?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserBenefit = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateVenue = {
  buildingNumber?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  sections?: InputMaybe<Array<UpdateVenueSection>>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVenueSection = {
  capacity: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  venueId: Scalars['ID']['input'];
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

export type UserBenefit = {
  benefit: Benefit;
  business: Business;
  created: Scalars['DateTime']['output'];
  user: User;
};

export type UserBenefitConnection = {
  /** Array of nodes. */
  nodes: Array<UserBenefit>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type UserBenefitDeleteFilter = {
  and?: InputMaybe<Array<UserBenefitDeleteFilter>>;
  benefitId?: InputMaybe<StringFieldComparison>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitDeleteFilter>>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefitDeleteResponse = {
  created?: Maybe<Scalars['DateTime']['output']>;
};

export type UserBenefitFilter = {
  and?: InputMaybe<Array<UserBenefitFilter>>;
  benefit?: InputMaybe<UserBenefitFilterBenefitFilter>;
  benefitId?: InputMaybe<StringFieldComparison>;
  business?: InputMaybe<UserBenefitFilterBusinessFilter>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitFilter>>;
  user?: InputMaybe<UserBenefitFilterUserFilter>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefitFilterBenefitFilter = {
  and?: InputMaybe<Array<UserBenefitFilterBenefitFilter>>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  expiryDate?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  membershipTypeId?: InputMaybe<StringFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserBenefitFilterBenefitFilter>>;
  points?: InputMaybe<NumberFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserBenefitFilterBusinessFilter = {
  and?: InputMaybe<Array<UserBenefitFilterBusinessFilter>>;
  created?: InputMaybe<DateFieldComparison>;
  currency?: InputMaybe<CurrencyFilterComparison>;
  id?: InputMaybe<IdFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserBenefitFilterBusinessFilter>>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserBenefitFilterUserFilter = {
  and?: InputMaybe<Array<UserBenefitFilterUserFilter>>;
  avatarUrl?: InputMaybe<StringFieldComparison>;
  birthDate?: InputMaybe<DateFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  defaultBusinessId?: InputMaybe<StringFieldComparison>;
  deleted?: InputMaybe<DateFieldComparison>;
  email?: InputMaybe<StringFieldComparison>;
  firstName?: InputMaybe<StringFieldComparison>;
  id?: InputMaybe<IdFilterComparison>;
  lastName?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<UserBenefitFilterUserFilter>>;
  placeOfResidence?: InputMaybe<StringFieldComparison>;
  updated?: InputMaybe<DateFieldComparison>;
};

export type UserBenefitSort = {
  direction: SortDirection;
  field: UserBenefitSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export type UserBenefitSortFields =
  | 'benefitId'
  | 'businessId'
  | 'created'
  | 'userId';

export type UserBenefitSubscriptionFilter = {
  and?: InputMaybe<Array<UserBenefitSubscriptionFilter>>;
  benefitId?: InputMaybe<StringFieldComparison>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitSubscriptionFilter>>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefitUpdateFilter = {
  and?: InputMaybe<Array<UserBenefitUpdateFilter>>;
  benefitId?: InputMaybe<StringFieldComparison>;
  businessId?: InputMaybe<StringFieldComparison>;
  created?: InputMaybe<DateFieldComparison>;
  or?: InputMaybe<Array<UserBenefitUpdateFilter>>;
  userId?: InputMaybe<StringFieldComparison>;
};

export type UserBenefits = {
  available: Array<Benefit>;
  membership: Scalars['Boolean']['output'];
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
  email: Scalars['String']['output'];
  eventsVisited: Scalars['Float']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  membership?: Maybe<Membership>;
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
  hasSeats: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  seatMap?: Maybe<Scalars['JSON']['output']>;
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
  hasSeats?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  seatMap?: Maybe<Scalars['JSON']['output']>;
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
