import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerTimeEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TimeEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Staff?: (TimeEntryStaff | null)[] | null;
  readonly StaffID?: string | null;
  readonly ClockInTime?: string | null;
  readonly ClockOutTime?: string | null;
  readonly Hours?: number | null;
  readonly Date?: string | null;
  readonly ShiftStart?: string | null;
  readonly ShiftFinish?: string | null;
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
  readonly ClockInTime?: string | null;
  readonly ClockOutTime?: string | null;
  readonly Hours?: number | null;
  readonly Date?: string | null;
  readonly ShiftStart?: string | null;
  readonly ShiftFinish?: string | null;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Staff = LazyLoading extends LazyLoadingDisabled ? EagerStaff : LazyStaff

export declare const Staff: (new (init: ModelInit<Staff>) => Staff) & {
  copyOf(source: Staff, mutator: (draft: MutableModel<Staff>) => MutableModel<Staff> | void): Staff;
}

type EagerConfectionary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Confectionary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Muffin?: number | null;
  readonly CakeSlice?: number | null;
  readonly Cookies?: number | null;
  readonly Buttons?: number | null;
  readonly Quavers?: number | null;
  readonly Pombears?: number | null;
  readonly Jazzles?: number | null;
  readonly Pringles?: number | null;
  readonly Raisins?: number | null;
  readonly SweetCone?: number | null;
  readonly Crisps60p?: number | null;
  readonly Crisps35p?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyConfectionary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Confectionary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Muffin?: number | null;
  readonly CakeSlice?: number | null;
  readonly Cookies?: number | null;
  readonly Buttons?: number | null;
  readonly Quavers?: number | null;
  readonly Pombears?: number | null;
  readonly Jazzles?: number | null;
  readonly Pringles?: number | null;
  readonly Raisins?: number | null;
  readonly SweetCone?: number | null;
  readonly Crisps60p?: number | null;
  readonly Crisps35p?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Confectionary = LazyLoading extends LazyLoadingDisabled ? EagerConfectionary : LazyConfectionary

export declare const Confectionary: (new (init: ModelInit<Confectionary>) => Confectionary) & {
  copyOf(source: Confectionary, mutator: (draft: MutableModel<Confectionary>) => MutableModel<Confectionary> | void): Confectionary;
}

type EagerSoftDrinks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SoftDrinks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FantaLemonBottle?: number | null;
  readonly FantaTwistBottle?: number | null;
  readonly FantaOrangeBottle?: number | null;
  readonly FantaOrangeZeroBottle?: number | null;
  readonly CokeBottle?: number | null;
  readonly DietCokeBottle?: number | null;
  readonly CokeZeroBottle?: number | null;
  readonly Sprite?: number | null;
  readonly AppleJuiceCarton?: number | null;
  readonly OrangeJuiceCarton?: number | null;
  readonly JugOfSquash?: number | null;
  readonly Slushy?: number | null;
  readonly FruitShoot?: number | null;
  readonly Water?: number | null;
  readonly NinjuApple?: number | null;
  readonly NinjuTropical?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySoftDrinks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SoftDrinks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly FantaLemonBottle?: number | null;
  readonly FantaTwistBottle?: number | null;
  readonly FantaOrangeBottle?: number | null;
  readonly FantaOrangeZeroBottle?: number | null;
  readonly CokeBottle?: number | null;
  readonly DietCokeBottle?: number | null;
  readonly CokeZeroBottle?: number | null;
  readonly Sprite?: number | null;
  readonly AppleJuiceCarton?: number | null;
  readonly OrangeJuiceCarton?: number | null;
  readonly JugOfSquash?: number | null;
  readonly Slushy?: number | null;
  readonly FruitShoot?: number | null;
  readonly Water?: number | null;
  readonly NinjuApple?: number | null;
  readonly NinjuTropical?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SoftDrinks = LazyLoading extends LazyLoadingDisabled ? EagerSoftDrinks : LazySoftDrinks

export declare const SoftDrinks: (new (init: ModelInit<SoftDrinks>) => SoftDrinks) & {
  copyOf(source: SoftDrinks, mutator: (draft: MutableModel<SoftDrinks>) => MutableModel<SoftDrinks> | void): SoftDrinks;
}

type EagerHotDrinks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HotDrinks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Tea?: number | null;
  readonly SpecialTea?: number | null;
  readonly HotChocolate?: number | null;
  readonly Cappaccino?: number | null;
  readonly Decaff?: number | null;
  readonly HotChocolateCreamMarshmellow?: number | null;
  readonly Latte?: number | null;
  readonly Mocha?: number | null;
  readonly AmericanoWhite?: number | null;
  readonly AmericanoBlack?: number | null;
  readonly Expresso?: number | null;
  readonly DoubleExpresso?: number | null;
  readonly FlatWhite?: number | null;
  readonly Syrup?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHotDrinks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HotDrinks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Tea?: number | null;
  readonly SpecialTea?: number | null;
  readonly HotChocolate?: number | null;
  readonly Cappaccino?: number | null;
  readonly Decaff?: number | null;
  readonly HotChocolateCreamMarshmellow?: number | null;
  readonly Latte?: number | null;
  readonly Mocha?: number | null;
  readonly AmericanoWhite?: number | null;
  readonly AmericanoBlack?: number | null;
  readonly Expresso?: number | null;
  readonly DoubleExpresso?: number | null;
  readonly FlatWhite?: number | null;
  readonly Syrup?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HotDrinks = LazyLoading extends LazyLoadingDisabled ? EagerHotDrinks : LazyHotDrinks

export declare const HotDrinks: (new (init: ModelInit<HotDrinks>) => HotDrinks) & {
  copyOf(source: HotDrinks, mutator: (draft: MutableModel<HotDrinks>) => MutableModel<HotDrinks> | void): HotDrinks;
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
  readonly sessionsID?: string | null;
  readonly Sessionid?: string | null;
  readonly TimeDelivered?: string | null;
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
  readonly sessionsID?: string | null;
  readonly Sessionid?: string | null;
  readonly TimeDelivered?: string | null;
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
  readonly ChickenNugget?: number | null;
  readonly CocktailSausage?: number | null;
  readonly OnionRings?: number | null;
  readonly FishFingers?: number | null;
  readonly MozzarellaSticks?: number | null;
  readonly GarlicBread?: number | null;
  readonly GarlicMushrooms?: number | null;
  readonly TraySandwiches?: number | null;
  readonly PepperoniPizza?: number | null;
  readonly MargheritaPizza?: number | null;
  readonly BBQChickenPizza?: number | null;
  readonly VegPizza?: number | null;
  readonly AdultFoodComplete?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPartyAdultFood = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PartyAdultFood, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChickenNugget?: number | null;
  readonly CocktailSausage?: number | null;
  readonly OnionRings?: number | null;
  readonly FishFingers?: number | null;
  readonly MozzarellaSticks?: number | null;
  readonly GarlicBread?: number | null;
  readonly GarlicMushrooms?: number | null;
  readonly TraySandwiches?: number | null;
  readonly PepperoniPizza?: number | null;
  readonly MargheritaPizza?: number | null;
  readonly BBQChickenPizza?: number | null;
  readonly VegPizza?: number | null;
  readonly AdultFoodComplete?: boolean | null;
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
  readonly AdultHotFoodQty?: number | null;
  readonly AdultColdFoodQty?: number | null;
  readonly PartyAdultFood?: PartyAdultFood | null;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly partyBookingPartyAdultFoodId?: string | null;
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
  readonly AdultHotFoodQty?: number | null;
  readonly AdultColdFoodQty?: number | null;
  readonly PartyAdultFood: AsyncItem<PartyAdultFood | undefined>;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly partyBookingPartyAdultFoodId?: string | null;
}

export declare type PartyBooking = LazyLoading extends LazyLoadingDisabled ? EagerPartyBooking : LazyPartyBooking

export declare const PartyBooking: (new (init: ModelInit<PartyBooking>) => PartyBooking) & {
  copyOf(source: PartyBooking, mutator: (draft: MutableModel<PartyBooking>) => MutableModel<PartyBooking> | void): PartyBooking;
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