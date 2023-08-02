// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Extras, Breakfast, KidsMenu, TimeEntry, Staff, Confectionary, SoftDrinks, HotDrinks, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, TimeEntryStaff } = initSchema(schema);

export {
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