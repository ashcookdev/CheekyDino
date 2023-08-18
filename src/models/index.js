// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ClockIn, Teddys, Holiday, HomePage, CustomerScreen, Extras, Breakfast, KidsMenu, TimeEntry, Staff, Confectionary, SoftDrinks, HotDrinks, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking, StaffClockIn, TimeEntryClockIn, TimeEntryHoliday, StaffHoliday, TimeEntryStaff } = initSchema(schema);

export {
  ClockIn,
  Teddys,
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
  StaffClockIn,
  TimeEntryClockIn,
  TimeEntryHoliday,
  StaffHoliday,
  TimeEntryStaff
};