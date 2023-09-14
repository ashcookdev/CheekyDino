// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { StockControl, ClockIn, Teddys, Holiday, HomePage, CustomerScreen, KitchenMenu, TimeEntry, Staff, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, KitchenMenuStockControl, TimeEntryStaff } = initSchema(schema);

export {
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
  TimeEntryStaff
};