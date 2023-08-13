// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Holiday, HomePage, CustomerScreen, Extras, Breakfast, KidsMenu, TimeEntry, Staff, Confectionary, SoftDrinks, HotDrinks, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, TimeEntryStaff } = initSchema(schema);

export {
  Holiday,
  HomePage,
  CustomerScreen,
  Extras,
  Breakfast,
  KidsMenu,
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