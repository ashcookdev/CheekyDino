// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Gates, StockControl, ClockIn, Teddys, Holiday, HomePage, CustomerScreen, KitchenMenu, TimeEntry, Staff, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, KitchenMenuStockControl, KitchenMenuCafeOrder, TimeEntryStaff } = initSchema(schema);

export {
  Gates,
  StockControl,
  ClockIn,
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
  KitchenMenuStockControl,
  KitchenMenuCafeOrder,
  TimeEntryStaff
};