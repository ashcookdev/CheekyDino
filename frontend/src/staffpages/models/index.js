// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TimeEntry, Staff, Confectionary, SoftDrinks, HotDrinks, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, TimeEntryStaff } = initSchema(schema);

export {
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