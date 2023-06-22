import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { PartyBooking } from '../../staffpages/models';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { PartyGuests } from '../../staffpages/models';




export default function MyBooking() {
    
    const [fullName, setFullName] = useState('');
    const [partyType, setPartyType] = useState('');
    const [time, setTime] = useState('');
    const [total, setTotal] = useState('');
    const [date, setDate] = useState('');
    const [noOfChildren, setNoOfChildren] = useState('');
    const [foodOptionSelected, setFoodOptionSelected] = useState('');
    const [childAge, setChildAge] = useState('');
    const [id, setId] = useState('');

    console.log(id);
    console.log(partyType)

    const deposit = total * 0.5;
    console.log(deposit);

    const navigate = useNavigate();

    useEffect(() => {
        async function getPartyBooking() {
            const user = await Auth.currentAuthenticatedUser();
            const userId = user.attributes.sub;
            console.log(userId);
            
            const partyBookings = (await DataStore.query(PartyBooking)).filter(booking => booking.partybookingID === userId);
            const partyBooking = partyBookings[0];

          setFullName(partyBooking.ChildName);
          setPartyType(partyBooking.PartyType);
          setTime(partyBooking.PartyTime);
          setTotal(partyBooking.Total);
          setDate(partyBooking.PartyDate);
            setNoOfChildren(partyBooking.NoOfChildren);
            setFoodOptionSelected(partyBooking.FoodOptionSelected);
            setTime(partyBooking.PartyTime);
setChildAge(partyBooking.ChildAge);  
setId(partyBooking.id)      }
        getPartyBooking();
        
      }, []);
      



  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">My Booking</h3>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <button onClick={
            () => {
                navigate('/add-guests', { state: { id, noOfChildren, partyType } });

            }



        } className="rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      > Pay Deposit £{deposit} </button>
            </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <button         className="rounded-full bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

      > Adult Food Choices </button>
        <button onClick={
            () => {
                navigate('/add-guests', { state: { id, noOfChildren } });
            }



        }         className="rounded-full bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

      > Add Guest </button>
          </div>
   
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Child's Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{fullName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Child's Age</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{childAge}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Party Type</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{partyType}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Date </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{date}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Time</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{time}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Number of Children</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{noOfChildren}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Food Choice</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{foodOptionSelected}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Total</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£{total}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Paid</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£0</dd>
          </div>
        </dl>
          
                  
      </div>
    </div>
  )
}
