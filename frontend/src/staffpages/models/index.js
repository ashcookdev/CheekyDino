// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DailyFinancials, StockControl, ClockIn, Teddys, Holiday, HomePage, CustomerScreen, Extras, Breakfast, KitchenMenu, TimeEntry, Staff, Confectionary, SoftDrinks, HotDrinks, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, TimeEntryStaff } = initSchema(schema);

export {
  DailyFinancials,
  StockControl,
  ClockIn,
  Teddys,
  Holiday,
  HomePage,
  CustomerScreen,
  Extras,
  Breakfast,
  KitchenMenu,
  TimeEntry,
  Staff,
  Confectionary,
  SoftDrinks,
  HotDrinks,
  Sessions,
  CafeOrder,
  Messages,
  PartyAdultFood,
  PartyGuests,
  PartyBooking,
  TimeEntryStaff
};