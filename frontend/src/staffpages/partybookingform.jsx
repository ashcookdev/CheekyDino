import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { PartyBooking } from '../models';
import { useNavigate } from 'react-router-dom';
import { PartyGuests } from '../models';
import {Staff} from '../models';




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
    const [showInputs, setShowInputs] = useState(false);
    const [childName, setChildName] = useState('');
    const [foodOption, setFoodOption] = useState('');
    const [allergies, setAllergies] = useState('');
    const [contactInfoEmail, setContactInfoEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [reload, setReload] = useState(false);
    const [amountPaid, setAmountPaid] = useState('');


    console.log(id);
    console.log(partyType)
    console.log(partyGuests)
    console.log(selectedHost)


    const deposit = total * 0.5;
    console.log(deposit);

    const navigate = useNavigate();


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
          setAmountPaid(partyBooking.AmountPaid);
        }
      
        getPartyBooking();
      }, [reload]);

      async function showAllGuests() {
        try {
            // Query the DataStore for all PartyGuests associated with the current party booking ID
            const partyGuests = await DataStore.query(PartyGuests);
            const filteredGuests = partyGuests.filter(guest => guest.partybookingID === partyid);
            // Update the partyGuests state variable to include only the guests associated with the current party booking
            setPartyGuests(filteredGuests);
            setShowTable(true);
        } catch (error) {
            console.error('Error fetching party guests:', error);
        }
    }
    
     
      async function deleteGuest(id) {
        try {
            // Find the guest index to delete by ID
            const guestIndexToDelete = partyGuests.findIndex(guest => guest.id === id);
            
            // If guest with given ID is not found, return
            if (guestIndexToDelete === -1) {
                console.error(`Guest with ID ${id} not found.`);
                return;
            }
    
            // Delete the guest from the DataStore
            await DataStore.delete(PartyGuests, id);
    
            // Update the partyGuests state variable to remove the deleted guest
            setPartyGuests(prevGuests => {
                const updatedGuests = [...prevGuests];
                updatedGuests.splice(guestIndexToDelete, 1);
                return updatedGuests;
            });
            showAllGuests();
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
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

    const addGuest = () => {
      setShowInputs(true);
  
      // Create a new PartyGuests object with the entered information
      const newGuest = {
          ChildName: childName,
          FoodOption: foodOption,
          Allergies: allergies,
          ContactInfoEmail: contactInfoEmail,
          partybookingID: partyid,
          Arrived: false
      };
  
      // Update the partyGuests state variable using the functional form of setState
      setPartyGuests(prevGuests => [...prevGuests, newGuest]);
  
      // Reset input fields
      setChildName('');
      setFoodOption('');
      setAllergies('');
      setContactInfoEmail('');
      
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
    

    
  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    

    // query the DataStore for the party booking object

    const partyBooking = await DataStore.query(PartyBooking, partyid);

    // update the Paid field of the party booking object

    await DataStore.save(
      PartyBooking.copyOf(partyBooking, updated => {
        updated.AmountPaid = amount
      })
    );


    console.log('Amount entered:', amount);
    setAmount('');
    setReload(true);
  }

const amountLeft = total - Number(amountPaid);
      


  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">My Booking</h3>
      </div>
      <button onClick={() => {window.location.reload()}} className="bg-green-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Back to Bookings</button>
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
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Party Guests</h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the guests in your party including their name, food option, allergies, and contact information.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          onClick={() => addGuest()}
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Guest
        </button>
      </div>
    </div>
    {showInputs && (
                <div>
                    <input
                        type="text"
                        placeholder="Child name"
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Food option"
                        value={foodOption}
                        onChange={(e) => setFoodOption(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Allergies"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Contact info email"
                        value={contactInfoEmail}
                        onChange={(e) => setContactInfoEmail(e.target.value)}
                    />
                    <button         className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
 onClick={addGuest}>Save</button>
                </div>
            )}      
    
    
    
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Child Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Food Option
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Allergies
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Contact Info Email
                </th>
                {partyType === "Teddy" && (
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Teddy
                </th>
              )}
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {partyGuests.map(guest => (
              <tr key={guest.id}>
                <td className="whitespace-no-wrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{guest.ChildName}</td>
                <td className="whitespace-no-wrap px-3 py-4 text-sm text-gray-500">{guest.FoodOption}</td>
                <td className="whitespace-no-wrap px-3 py-4 text-sm text-gray-500">{guest.Allergies}</td>
                <td className="whitespace-no-wrap px-3 py-4 text-sm text-gray-500">{guest.ContactInfoEmail}</td>
                {partyType === "Teddy Party" && (
                  <td className="whitespace-no-wrap px-3 py-4 text-sm text-gray-500">{guest.TeddyTasticBear}</td>
                )}
                <td className="relative whitespace-no-wrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteGuest(guest.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
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
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£{amountPaid}</dd>
            <dt className="text-sm font-medium text-gray-900">Amount Left</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£{amountLeft}</dd>
            

            <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter amount"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={amount}
        onChange={handleInputChange}
      />
      <button type="submit" className="mt-1 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
        Submit Payment Amount
      </button>
    </form>
          </div>
        </dl>
          
                  
      </div>
    </div>
  )
}
