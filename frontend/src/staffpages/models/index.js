// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Sessions, CafeOrder, Messages, PartyAdultFood, PartyGuests, PartyBooking } = initSchema(schema);

export {
  Sessions,
  CafeOrder,
  Messages,
  PartyAdultFood,
  PartyGuests,
  PartyBooking
};