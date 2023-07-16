// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Confectionary, SoftDrinks, HotDrinks, Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking } = initSchema(schema);

export {
  Confectionary,
  SoftDrinks,
  HotDrinks,
  Sessions,
  CafeOrder,
  Messages,
  PartyAdultFood,
  PartyGuests,
  PartyBooking
};