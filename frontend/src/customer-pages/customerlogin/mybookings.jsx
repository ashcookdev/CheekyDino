import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { PartyBooking } from '../../models';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { PartyGuests } from '../../models';
import '../customerfont.css'
import AdultFoodOptions from './AdultFoodOptions';




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
    const [adultFood, setAdultFood] = useState(false);
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');


    console.log(id);
    console.log(partyType)
    console.log(email)

    const deposit = total * 0.5;
    
let formattedNum = deposit.toFixed(2);
console.log(formattedNum); // "3.14"

    console.log(deposit);

    const navigate = useNavigate();

    useEffect(() => {
        async function getPartyBooking() {
            const user = await Auth.currentAuthenticatedUser();
            const userId = user.attributes.sub;
            console.log(userId);
            
            const partyBookings = (await DataStore.query(PartyBooking)).filter(booking => booking.partybookingID === userId);
            const partyBooking = partyBookings[0];

            console.log(partyBooking.Telephone);

            setEmail(partyBooking.Email);
            setTelephone(partyBooking.Telephone)

          setFullName(partyBooking.ChildName);
          setPartyType(partyBooking.PartyType);
          setTime(partyBooking.PartyTime);
          setTotal(partyBooking.Total);
          setDate(partyBooking.PartyDate);
            setNoOfChildren(partyBooking.NoOfChildren);
            setFoodOptionSelected(partyBooking.FoodOptionSelected);
            setTime(partyBooking.PartyTime);
setChildAge(partyBooking.ChildAge);  
setId(partyBooking.id)
setAdultFood(partyBooking.PartyAdultFoodChoices.join(', '));      
setTelephone(partyBooking.Telephone);}
        getPartyBooking();
        
      }, []);
      
      if (adultFood === true) {
        return (
          <AdultFoodOptions selectedParty={id} />
        )
        
      }



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden shadow sm:rounded-lg">
    <div className="w-full max-w-md px-4 py-6 sm:px-6">
      <h3 className="text-base font-semibold leading-7 text-gray-900 text-center component-title">
        My Booking
      </h3>
    </div>
    <div className="w-full max-w-md px-4 py-6 sm:px-6 flex justify-center space-x-4">
      <button
      
        className="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Pay Deposit £{formattedNum}
      </button>
      <button onClick={() => setAdultFood(true)}
        className="rounded-full bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Adult Food Choices
      </button>
      

        


        
      <button onClick={() => {
          navigate('/add-guests', { state: { id, noOfChildren, partyType } });
        }}
        
        className="rounded-full bg-green-500 px-2.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Guest
      </button>
    </div>

   
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Child's Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{fullName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Child's Age</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{childAge}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Telephone</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{telephone}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Party Type</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{partyType}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Date </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{date}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Time</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{time}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Number of Children</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{noOfChildren}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-90 component-title">Food Choice</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{foodOptionSelected}</dd>
           </div>
           <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
  <dt className="text-sm font-medium text-gray-900 component-title">Adult Food Choices</dt>
  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
    {adultFood ? adultFood : 'No adult food choices selected'}
  </dd>
</div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Total</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£{total}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900 component-title">Paid</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£0</dd>
          </div>

        </dl>
          
                  
      </div>
    </div>
  )
}
