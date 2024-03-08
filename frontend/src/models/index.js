// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { BeautyInPlay, HomeCookedCollection, Events, CustomerEvent, Gates, StockControl, ClockIns, Teddys, Holiday, HomePage, CustomerScreen, KitchenMenu, TimeEntry, Staff, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, EventsCustomerEvent, KitchenMenuStockControl, KitchenMenuCafeOrder, TimeEntryStaff } = initSchema(schema);

export {
  BeautyInPlay,
  HomeCookedCollection,
  Events,
  CustomerEvent,
  Gates,
  StockControl,
  ClockIns,
  Teddys,
  Holiday,
  HomePage,
  CustomerScreen,
  KitchenMenu,
  TimeEntry,
  Staff,
  Sessions,
  CafeOrder,
  Messages,
  PartyAdultFood,
  PartyGuests,
  PartyBooking,
  EventsCustomerEvent,
  KitchenMenuStockControl,
  KitchenMenuCafeOrder,
  TimeEntryStaff
};