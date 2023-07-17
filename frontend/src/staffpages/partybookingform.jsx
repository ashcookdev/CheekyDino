import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { PartyBooking } from './models';
import { useNavigate } from 'react-router-dom';
import { PartyGuests } from './models';
import {Staff} from './models';



export default function Booking({partyid}) {
    
    const [fullName, setFullName] = useState('');
    const [partyType, setPartyType] = useState('');
    const [time, setTime] = useState('');
    const [total, setTotal] = useState('');
    const [date, setDate] = useState('');
    const [noOfChildren, setNoOfChildren] = useState('');
    const [foodOptionSelected, setFoodOptionSelected] = useState('');
    const [childAge, setChildAge] = useState('');
    const [id, setId] = useState('');
    const [partyHosts, setPartyHosts] = useState([]);
    const [partyGuests, setPartyGuests] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [selectedHost, setSelectedHost] = useState('');
    const [partyHost, setPartyHost] = useState('');
    const [isSaved, setIsSaved] = useState(false);


    console.log(id);
    console.log(partyType)
    console.log(partyGuests)
    console.log(selectedHost)


    const deposit = total * 0.5;
    console.log(deposit);


    useEffect(() => {
        async function getPartyBooking() {
          // Query the DataStore for a party booking with an ID that matches the partyid prop
          const partyBooking = await DataStore.query(PartyBooking, partyid);

        
          // Update the state variables with information from the party booking
          setFullName(partyBooking.ChildName);
          setPartyType(partyBooking.PartyType);
          setTime(partyBooking.PartyTime);
          setTotal(partyBooking.Total);
          setDate(partyBooking.PartyDate);
          setNoOfChildren(partyBooking.NoOfChildren);
          setFoodOptionSelected(partyBooking.FoodOptionSelected);
          setTime(partyBooking.PartyTime);
          setChildAge(partyBooking.ChildAge);
          setId(partyBooking.id);
        }
      
        getPartyBooking();
      }, []);

      async function showAllGuests() {
        const partyGuests = await DataStore.query(PartyGuests, Predicates.ALL, {
            filter: c => c.partybookingID('eq', partyid)
          });
                  setPartyGuests(partyGuests);
        setShowTable(true);
        // Display the partyGuests in your UI
      }
      
      async function addGuest() {
        // Prompt the user to enter the guest's information
        const childName = prompt('Enter the child name:');
        const foodOption = prompt('Enter the food option:');
        const allergies = prompt('Enter any allergies:');
        const contactInfoEmail = prompt('Enter the contact info email:');
      
        // Create a new PartyGuests object with the entered information
        const newGuest = await DataStore.save(
          new PartyGuests({
            ChildName: childName,
            FoodOption: foodOption,
            Allergies: allergies,
            ContactInfoEmail: contactInfoEmail,
            partybookingID: partyid
          })
        );
      
        // Update the partyGuests state variable to include the new guest
        setPartyGuests([...partyGuests, newGuest]);
      }
      
      async function deleteGuest(id) {
        // Find the guest to delete by ID
        const guestToDelete = partyGuests.find(guest => guest.id === id);
      
        // Delete the guest from the DataStore
        await DataStore.delete(guestToDelete);
      
        // Update the partyGuests state variable to remove the deleted guest
        setPartyGuests(partyGuests.filter(guest => guest.id !== id));
      }
      
      
      useEffect(() => {
        async function getPartyHost() {
const partyhosts = await DataStore.query(Staff, Predicates.ALL, {
    filter: c => c.Role === 'PartyHost'
    });
    console.log(partyhosts);
    setPartyHosts(partyhosts)
  
  }
    getPartyHost();
    }, []);

    const handleButtonClick = hostName => {
      setSelectedHost(hostName);
      handleSave();
    };



    const handleSave = async () => {
      console.log('handleSave called');
      console.log('selectedHost:', selectedHost);
    
      try {
        // Query the DataStore to get the PartyBooking object you want to update
        const partyBooking = await DataStore.query(PartyBooking, partyid);
        console.log('partyBooking:', partyBooking);
    
        if (partyBooking) {
          // Update the PartyHostAssigned field of the PartyBooking object
          await DataStore.save(
            PartyBooking.copyOf(partyBooking, updated => {
              updated.PartyHostAssigned = selectedHost;
            })
          );
          console.log('PartyBooking updated');
          setIsSaved(true);
        } else {
          console.log('PartyBooking not found');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    


      


  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">My Booking</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
      <label htmlFor="PartyHost" className="block text-sm font-medium leading-6 text-gray-900">
  Assign PartyHost
</label>
<div className="mt-2">
  {partyHosts.map(host => (
    <button
      key={host.id}
      type="button"
      onClick={() => handleButtonClick(host.Name)}
      className="mr-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {host.Name}
    </button>
  ))}
</div>
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
          {isSaved && (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-900">Party Host</dt>
    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      {selectedHost}
    </dd>
  </div>
)}
         
          <div className="px-4 py-6">
  <div className="flex justify-between items-center mb-4">
    <div className="text-sm font-medium text-gray-900">Number of Children: {noOfChildren}</div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showAllGuests()}>Show All Guests</button>
  </div>
  {showTable && (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => addGuest()}>Add Guest</button>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600 uppercase tracking-wider">Child Name</th>
            <th className="px-4 py-2 text-left text-gray-600 uppercase tracking-wider">Food Option</th>
            <th className="px-4 py-2 text-left text-gray-600 uppercase tracking-wider">Allergies</th>
            <th className="px-4 py-2 text-left text-gray-600 uppercase tracking-wider">Contact Info</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {partyGuests.map(guest => (
            <tr key={guest.id}>
              <td className="px-4 py-2">{guest.ChildName}</td>
              <td className="px-4 py-2">{guest.FoodOption}</td>
              <td className="px-4 py-2">{guest.Allergies}</td>
              <td className="px-4 py-2">{guest.ContactInfoEmail}</td>
              <td className="px-4 py-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteGuest(guest.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
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
