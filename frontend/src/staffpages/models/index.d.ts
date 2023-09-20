import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerStockControl = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StockControl, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Weight?: number | null;
  readonly Quantity?: number | null;
  readonly Price?: number | null;
  readonly PreVAT?: number | null;
  readonly Supplier?: string | null;
  readonly VAT?: number | null;
  readonly CurrentStockLevel?: number | null;
  readonly kitchenmenus?: (KitchenMenuStockControl | null)[] | null;
  readonly Cases?: number | null;
  readonly ProductId?: string | null;
  readonly NewPrice?: number | null;
  readonly NewVAT?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStockControl = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StockControl, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Weight?: number | null;
  readonly Quantity?: number | null;
  readonly Price?: number | null;
  readonly PreVAT?: number | null;
  readonly Supplier?: string | null;
  readonly VAT?: number | null;
  readonly CurrentStockLevel?: number | null;
  readonly kitchenmenus: AsyncCollection<KitchenMenuStockControl>;
  readonly Cases?: number | null;
  readonly ProductId?: string | null;
  readonly NewPrice?: number | null;
  readonly NewVAT?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StockControl = LazyLoading extends LazyLoadingDisabled ? EagerStockControl : LazyStockControl

export declare const StockControl: (new (init: ModelInit<StockControl>) => StockControl) & {
  copyOf(source: StockControl, mutator: (draft: MutableModel<StockControl>) => MutableModel<StockControl> | void): StockControl;
}

type EagerClockIn = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ClockIn, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ClockIn?: string | null;
  readonly ClockOut?: string | null;
  readonly Sick?: boolean | null;
  readonly Holiday?: string | null;
  readonly StaffId?: string | null;
  readonly TimeEntryId?: string | null;
  readonly Date?: string | null;
  readonly ClockedIn?: boolean | null;
  readonly ClockedOut?: boolean | null;
  readonly StaffName?: string | null;
  readonly StaffRole?: string | null;
  readonly Break?: boolean | null;
  readonly BreakStart?: string | null;
  readonly BreakEnd?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClockIn = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ClockIn, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ClockIn?: string | null;
  readonly ClockOut?: string | null;
  readonly Sick?: boolean | null;
  readonly Holiday?: string | null;
  readonly StaffId?: string | null;
  readonly TimeEntryId?: string | null;
  readonly Date?: string | null;
  readonly ClockedIn?: boolean | null;
  readonly ClockedOut?: boolean | null;
  readonly StaffName?: string | null;
  readonly StaffRole?: string | null;
  readonly Break?: boolean | null;
  readonly BreakStart?: string | null;
  readonly BreakEnd?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ClockIn = LazyLoading extends LazyLoadingDisabled ? EagerClockIn : LazyClockIn

export declare const ClockIn: (new (init: ModelInit<ClockIn>) => ClockIn) & {
  copyOf(source: ClockIn, mutator: (draft: MutableModel<ClockIn>) => MutableModel<ClockIn> | void): ClockIn;
}

type EagerTeddys = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teddys, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly ImgSrc?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeddys = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teddys, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly ImgSrc?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Teddys = LazyLoading extends LazyLoadingDisabled ? EagerTeddys : LazyTeddys

export declare const Teddys: (new (init: ModelInit<Teddys>) => Teddys) & {
  copyOf(source: Teddys, mutator: (draft: MutableModel<Teddys>) => MutableModel<Teddys> | void): Teddys;
}

type EagerHoliday = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Holiday, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly StartDate?: string | null;
  readonly Description?: string | null;
  readonly EndDate?: string | null;
  readonly Approved?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHoliday = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Holiday, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly StartDate?: string | null;
  readonly Description?: string | null;
  readonly EndDate?: string | null;
  readonly Approved?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Holiday = LazyLoading extends LazyLoadingDisabled ? EagerHoliday : LazyHoliday

export declare const Holiday: (new (init: ModelInit<Holiday>) => Holiday) & {
  copyOf(source: Holiday, mutator: (draft: MutableModel<Holiday>) => MutableModel<Holiday> | void): Holiday;
}

type EagerHomePage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HomePage, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly TopSectionTitle?: string | null;
  readonly TopSectionPic?: string | null;
  readonly TopSectionWriting?: string | null;
  readonly EventTitle?: string | null;
  readonly EventPic?: string | null;
  readonly EventWriting?: string | null;
  readonly EventTwoTitle?: string | null;
  readonly EventTwoPic?: string | null;
  readonly EventTwoWriting?: string | null;
  readonly EventThreeTitle?: string | null;
  readonly EventThreePic?: string | null;
  readonly EventThreeWriting?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHomePage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HomePage, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly TopSectionTitle?: string | null;
  readonly TopSectionPic?: string | null;
  readonly TopSectionWriting?: string | null;
  readonly EventTitle?: string | null;
  readonly EventPic?: string | null;
  readonly EventWriting?: string | null;
  readonly EventTwoTitle?: string | null;
  readonly EventTwoPic?: string | null;
  readonly EventTwoWriting?: string | null;
  readonly EventThreeTitle?: string | null;
  readonly EventThreePic?: string | null;
  readonly EventThreeWriting?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HomePage = LazyLoading extends LazyLoadingDisabled ? EagerHomePage : LazyHomePage

export declare const HomePage: (new (init: ModelInit<HomePage>) => HomePage) & {
  copyOf(source: HomePage, mutator: (draft: MutableModel<HomePage>) => MutableModel<HomePage> | void): HomePage;
}

type EagerCustomerScreen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CustomerScreen, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Message?: string | null;
  readonly Show?: boolean | null;
  readonly Number?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomerScreen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CustomerScreen, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Message?: string | null;
  readonly Show?: boolean | null;
  readonly Number?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CustomerScreen = LazyLoading extends LazyLoadingDisabled ? EagerCustomerScreen : LazyCustomerScreen

export declare const CustomerScreen: (new (init: ModelInit<CustomerScreen>) => CustomerScreen) & {
  copyOf(source: CustomerScreen, mutator: (draft: MutableModel<CustomerScreen>) => MutableModel<CustomerScreen> | void): CustomerScreen;
}

type EagerKitchenMenu = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitchenMenu, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Price?: number | null;
  readonly Description?: string | null;
  readonly Notes?: string | null;
  readonly Kitchen?: boolean | null;
  readonly imageSrc?: string | null;
  readonly Prep?: string | null;
  readonly Ingredients?: string | null;
  readonly Snooze?: boolean | null;
  readonly Extras?: string | null;
  readonly Category?: string | null;
  readonly ProfitMargin?: number | null;
  readonly PriceNoVAT?: number | null;
  readonly InStock?: boolean | null;
  readonly StockLevel?: number | null;
  readonly StockControls?: (KitchenMenuStockControl | null)[] | null;
  readonly CafeOrders?: (KitchenMenuCafeOrder | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKitchenMenu = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitchenMenu, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Price?: number | null;
  readonly Description?: string | null;
  readonly Notes?: string | null;
  readonly Kitchen?: boolean | null;
  readonly imageSrc?: string | null;
  readonly Prep?: string | null;
  readonly Ingredients?: string | null;
  readonly Snooze?: boolean | null;
  readonly Extras?: string | null;
  readonly Category?: string | null;
  readonly ProfitMargin?: number | null;
  readonly PriceNoVAT?: number | null;
  readonly InStock?: boolean | null;
  readonly StockLevel?: number | null;
  readonly StockControls: AsyncCollection<KitchenMenuStockControl>;
  readonly CafeOrders: AsyncCollection<KitchenMenuCafeOrder>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type KitchenMenu = LazyLoading extends LazyLoadingDisabled ? EagerKitchenMenu : LazyKitchenMenu

export declare const KitchenMenu: (new (init: ModelInit<KitchenMenu>) => KitchenMenu) & {
  copyOf(source: KitchenMenu, mutator: (draft: MutableModel<KitchenMenu>) => MutableModel<KitchenMenu> | void): KitchenMenu;
}

type EagerTimeEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Staff?: (TimeEntryStaff | null)[] | null;
  readonly StaffID?: string | null;
  readonly Hours?: number | null;
  readonly Dates?: (string | null)[] | null;
  readonly ShiftStart?: (string | null)[] | null;
  readonly ShiftFinish?: (string | null)[] | null;
  readonly Month?: string | null;
  readonly StaffName?: string | null;
  readonly Holiday?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Staff: AsyncCollection<TimeEntryStaff>;
  readonly StaffID?: string | null;
  readonly Hours?: number | null;
  readonly Dates?: (string | null)[] | null;
  readonly ShiftStart?: (string | null)[] | null;
  readonly ShiftFinish?: (string | null)[] | null;
  readonly Month?: string | null;
  readonly StaffName?: string | null;
  readonly Holiday?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeEntry = LazyLoading extends LazyLoadingDisabled ? EagerTimeEntry : LazyTimeEntry

export declare const TimeEntry: (new (init: ModelInit<TimeEntry>) => TimeEntry) & {
  copyOf(source: TimeEntry, mutator: (draft: MutableModel<TimeEntry>) => MutableModel<TimeEntry> | void): TimeEntry;
}

type EagerStaff = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Staff, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Email?: string | null;
  readonly TimeEntries?: string | null;
  readonly timeentriess?: (TimeEntryStaff | null)[] | null;
  readonly Role?: string | null;
  readonly HourlyRate?: number | null;
  readonly StartDate?: string | null;
  readonly Current?: boolean | null;
  readonly Telephone?: string | null;
  readonly ContractType?: string | null;
  readonly EndDate?: string | null;
  readonly Age?: string | null;
  readonly DOB?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStaff = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Staff, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Email?: string | null;
  readonly TimeEntries?: string | null;
  readonly timeentriess: AsyncCollection<TimeEntryStaff>;
  readonly Role?: string | null;
  readonly HourlyRate?: number | null;
  readonly StartDate?: string | null;
  readonly Current?: boolean | null;
  readonly Telephone?: string | null;
  readonly ContractType?: string | null;
  readonly EndDate?: string | null;
  readonly Age?: string | null;
  readonly DOB?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Staff = LazyLoading extends LazyLoadingDisabled ? EagerStaff : LazyStaff

export declare const Staff: (new (init: ModelInit<Staff>) => Staff) & {
  copyOf(source: Staff, mutator: (draft: MutableModel<Staff>) => MutableModel<Staff> | void): Staff;
}

type EagerSessions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Sessions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Email?: string | null;
  readonly TimeslotFrom?: string | null;
  readonly TimeslotTo?: string | null;
  readonly TimeLeft?: string | null;
  readonly TimeArrived?: string | null;
  readonly Date?: string | null;
  readonly Table?: number | null;
  readonly Orders?: number | null;
  readonly Prepaid?: boolean | null;
  readonly TotalSpent?: number | null;
  readonly Adults?: number | null;
  readonly Children?: number | null;
  readonly Arrived?: boolean | null;
  readonly LeftCenter?: boolean | null;
  readonly ExtraTables?: number | null;
  readonly Telephone?: string | null;
  readonly CafeOrders?: (CafeOrder | null)[] | null;
  readonly orderid?: (string | null)[] | null;
  readonly Age?: (string | null)[] | null;
  readonly StaffOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySessions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Sessions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly Email?: string | null;
  readonly TimeslotFrom?: string | null;
  readonly TimeslotTo?: string | null;
  readonly TimeLeft?: string | null;
  readonly TimeArrived?: string | null;
  readonly Date?: string | null;
  readonly Table?: number | null;
  readonly Orders?: number | null;
  readonly Prepaid?: boolean | null;
  readonly TotalSpent?: number | null;
  readonly Adults?: number | null;
  readonly Children?: number | null;
  readonly Arrived?: boolean | null;
  readonly LeftCenter?: boolean | null;
  readonly ExtraTables?: number | null;
  readonly Telephone?: string | null;
  readonly CafeOrders: AsyncCollection<CafeOrder>;
  readonly orderid?: (string | null)[] | null;
  readonly Age?: (string | null)[] | null;
  readonly StaffOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Sessions = LazyLoading extends LazyLoadingDisabled ? EagerSessions : LazySessions

export declare const Sessions: (new (init: ModelInit<Sessions>) => Sessions) & {
  copyOf(source: Sessions, mutator: (draft: MutableModel<Sessions>) => MutableModel<Sessions> | void): Sessions;
}

type EagerCafeOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CafeOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly CreatedTime?: string | null;
  readonly CreatedDate?: string | null;
  readonly Total?: number | null;
  readonly DrinkItems?: (string | null)[] | null;
  readonly HotItems?: (string | null)[] | null;
  readonly Table?: number | null;
  readonly Completed?: boolean | null;
  readonly Delieved?: boolean | null;
  readonly sessionsID: string;
  readonly Sessionid?: string | null;
  readonly TimeDelivered?: string | null;
  readonly Notes?: string | null;
  readonly Kitchen?: boolean | null;
  readonly HotOrderPrep?: string | null;
  readonly TotalNoVAT?: number | null;
  readonly KitchenMenuId?: (string | null)[] | null;
  readonly ChefName?: string | null;
  readonly StaffOrderName?: string | null;
  readonly kitchenmenus?: (KitchenMenuCafeOrder | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCafeOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CafeOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly CreatedTime?: string | null;
  readonly CreatedDate?: string | null;
  readonly Total?: number | null;
  readonly DrinkItems?: (string | null)[] | null;
  readonly HotItems?: (string | null)[] | null;
  readonly Table?: number | null;
  readonly Completed?: boolean | null;
  readonly Delieved?: boolean | null;
  readonly sessionsID: string;
  readonly Sessionid?: string | null;
  readonly TimeDelivered?: string | null;
  readonly Notes?: string | null;
  readonly Kitchen?: boolean | null;
  readonly HotOrderPrep?: string | null;
  readonly TotalNoVAT?: number | null;
  readonly KitchenMenuId?: (string | null)[] | null;
  readonly ChefName?: string | null;
  readonly StaffOrderName?: string | null;
  readonly kitchenmenus: AsyncCollection<KitchenMenuCafeOrder>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CafeOrder = LazyLoading extends LazyLoadingDisabled ? EagerCafeOrder : LazyCafeOrder

export declare const CafeOrder: (new (init: ModelInit<CafeOrder>) => CafeOrder) & {
  copyOf(source: CafeOrder, mutator: (draft: MutableModel<CafeOrder>) => MutableModel<CafeOrder> | void): CafeOrder;
}

type EagerMessages = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Messages, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly createdAt?: string | null;
  readonly email?: string | null;
  readonly group?: (string | null)[] | null;
  readonly orderID?: string | null;
  readonly sessionID?: string | null;
  readonly partyID?: string | null;
  readonly delivered?: boolean | null;
  readonly updatedAt?: string | null;
}

type LazyMessages = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Messages, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly createdAt?: string | null;
  readonly email?: string | null;
  readonly group?: (string | null)[] | null;
  readonly orderID?: string | null;
  readonly sessionID?: string | null;
  readonly partyID?: string | null;
  readonly delivered?: boolean | null;
  readonly updatedAt?: string | null;
}

export declare type Messages = LazyLoading extends LazyLoadingDisabled ? EagerMessages : LazyMessages

export declare const Messages: (new (init: ModelInit<Messages>) => Messages) & {
  copyOf(source: Messages, mutator: (draft: MutableModel<Messages>) => MutableModel<Messages> | void): Messages;
}

type EagerPartyAdultFood = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PartyAdultFood, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPartyAdultFood = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PartyAdultFood, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PartyAdultFood = LazyLoading extends LazyLoadingDisabled ? EagerPartyAdultFood : LazyPartyAdultFood

export declare const PartyAdultFood: (new (init: ModelInit<PartyAdultFood>) => PartyAdultFood) & {
  copyOf(source: PartyAdultFood, mutator: (draft: MutableModel<PartyAdultFood>) => MutableModel<PartyAdultFood> | void): PartyAdultFood;
}

type EagerPartyGuests = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PartyGuests, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChildName?: string | null;
  readonly FoodOption: string;
  readonly Allergies?: string | null;
  readonly ContactInfoEmail?: string | null;
  readonly partybookingID: string;
  readonly ArrivalTime?: string | null;
  readonly SweetConeColour?: string | null;
  readonly TeddyTasticBear?: string | null;
  readonly Completed?: boolean | null;
  readonly Arrived?: boolean | null;
  readonly ImgSrc?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPartyGuests = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PartyGuests, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChildName?: string | null;
  readonly FoodOption: string;
  readonly Allergies?: string | null;
  readonly ContactInfoEmail?: string | null;
  readonly partybookingID: string;
  readonly ArrivalTime?: string | null;
  readonly SweetConeColour?: string | null;
  readonly TeddyTasticBear?: string | null;
  readonly Completed?: boolean | null;
  readonly Arrived?: boolean | null;
  readonly ImgSrc?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PartyGuests = LazyLoading extends LazyLoadingDisabled ? EagerPartyGuests : LazyPartyGuests

export declare const PartyGuests: (new (init: ModelInit<PartyGuests>) => PartyGuests) & {
  copyOf(source: PartyGuests, mutator: (draft: MutableModel<PartyGuests>) => MutableModel<PartyGuests> | void): PartyGuests;
}

type EagerPartyBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PartyBooking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly PartyType: string;
  readonly ChildName: string;
  readonly ChildAge: number;
  readonly PartyDate: string;
  readonly PartyTime: string;
  readonly NoOfChildren: number;
  readonly ThirdPartyContactedDate?: boolean | null;
  readonly FoodOptionSelected?: string | null;
  readonly Total: number;
  readonly PartyGuests?: (PartyGuests | null)[] | null;
  readonly SweetConesSelected?: boolean | null;
  readonly CharacterSelected?: string | null;
  readonly BearVoiceRecorders?: boolean | null;
  readonly PartyFoodPrepared?: string | null;
  readonly PartyHostAssigned?: string | null;
  readonly PartyChildMumArrived?: string | null;
  readonly PartyFoodTimeDue?: string | null;
  readonly PartyFinish?: string | null;
  readonly partybookingID?: string | null;
  readonly PartyFoodComplete?: boolean | null;
  readonly LeftBranch?: boolean | null;
  readonly CurrentGuests?: number | null;
  readonly LeftBranchTime?: string | null;
  readonly Table?: number | null;
  readonly PartyFoodDelivered?: boolean | null;
  readonly AmountPaid?: string | null;
  readonly PartyAdultFoodChoices?: (string | null)[] | null;
  readonly Email?: string | null;
  readonly Telephone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPartyBooking = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PartyBooking, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly PartyType: string;
  readonly ChildName: string;
  readonly ChildAge: number;
  readonly PartyDate: string;
  readonly PartyTime: string;
  readonly NoOfChildren: number;
  readonly ThirdPartyContactedDate?: boolean | null;
  readonly FoodOptionSelected?: string | null;
  readonly Total: number;
  readonly PartyGuests: AsyncCollection<PartyGuests>;
  readonly SweetConesSelected?: boolean | null;
  readonly CharacterSelected?: string | null;
  readonly BearVoiceRecorders?: boolean | null;
  readonly PartyFoodPrepared?: string | null;
  readonly PartyHostAssigned?: string | null;
  readonly PartyChildMumArrived?: string | null;
  readonly PartyFoodTimeDue?: string | null;
  readonly PartyFinish?: string | null;
  readonly partybookingID?: string | null;
  readonly PartyFoodComplete?: boolean | null;
  readonly LeftBranch?: boolean | null;
  readonly CurrentGuests?: number | null;
  readonly LeftBranchTime?: string | null;
  readonly Table?: number | null;
  readonly PartyFoodDelivered?: boolean | null;
  readonly AmountPaid?: string | null;
  readonly PartyAdultFoodChoices?: (string | null)[] | null;
  readonly Email?: string | null;
  readonly Telephone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PartyBooking = LazyLoading extends LazyLoadingDisabled ? EagerPartyBooking : LazyPartyBooking

export declare const PartyBooking: (new (init: ModelInit<PartyBooking>) => PartyBooking) & {
  copyOf(source: PartyBooking, mutator: (draft: MutableModel<PartyBooking>) => MutableModel<PartyBooking> | void): PartyBooking;
}

type EagerKitchenMenuStockControl = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitchenMenuStockControl, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly stockControlId?: string | null;
  readonly kitchenMenuId?: string | null;
  readonly stockControl: StockControl;
  readonly kitchenMenu: KitchenMenu;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKitchenMenuStockControl = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitchenMenuStockControl, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly stockControlId?: string | null;
  readonly kitchenMenuId?: string | null;
  readonly stockControl: AsyncItem<StockControl>;
  readonly kitchenMenu: AsyncItem<KitchenMenu>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type KitchenMenuStockControl = LazyLoading extends LazyLoadingDisabled ? EagerKitchenMenuStockControl : LazyKitchenMenuStockControl

export declare const KitchenMenuStockControl: (new (init: ModelInit<KitchenMenuStockControl>) => KitchenMenuStockControl) & {
  copyOf(source: KitchenMenuStockControl, mutator: (draft: MutableModel<KitchenMenuStockControl>) => MutableModel<KitchenMenuStockControl> | void): KitchenMenuStockControl;
}

type EagerKitchenMenuCafeOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitchenMenuCafeOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly kitchenMenuId?: string | null;
  readonly cafeOrderId?: string | null;
  readonly kitchenMenu: KitchenMenu;
  readonly cafeOrder: CafeOrder;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyKitchenMenuCafeOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<KitchenMenuCafeOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly kitchenMenuId?: string | null;
  readonly cafeOrderId?: string | null;
  readonly kitchenMenu: AsyncItem<KitchenMenu>;
  readonly cafeOrder: AsyncItem<CafeOrder>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type KitchenMenuCafeOrder = LazyLoading extends LazyLoadingDisabled ? EagerKitchenMenuCafeOrder : LazyKitchenMenuCafeOrder

export declare const KitchenMenuCafeOrder: (new (init: ModelInit<KitchenMenuCafeOrder>) => KitchenMenuCafeOrder) & {
  copyOf(source: KitchenMenuCafeOrder, mutator: (draft: MutableModel<KitchenMenuCafeOrder>) => MutableModel<KitchenMenuCafeOrder> | void): KitchenMenuCafeOrder;
}

type EagerTimeEntryStaff = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeEntryStaff, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeEntryId?: string | null;
  readonly staffId?: string | null;
  readonly timeEntry: TimeEntry;
  readonly staff: Staff;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimeEntryStaff = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeEntryStaff, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeEntryId?: string | null;
  readonly staffId?: string | null;
  readonly timeEntry: AsyncItem<TimeEntry>;
  readonly staff: AsyncItem<Staff>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TimeEntryStaff = LazyLoading extends LazyLoadingDisabled ? EagerTimeEntryStaff : LazyTimeEntryStaff

export declare const TimeEntryStaff: (new (init: ModelInit<TimeEntryStaff>) => TimeEntryStaff) & {
  copyOf(source: TimeEntryStaff, mutator: (draft: MutableModel<TimeEntryStaff>) => MutableModel<TimeEntryStaff> | void): TimeEntryStaff;
}