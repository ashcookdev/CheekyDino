import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { PartyGuests, PartyBooking, Messages } from './models';

const TillParty = ({ selectedParty }) => {
  const [partyGuests, setPartyGuests] = useState([]);
  const [clientArrived, setClientArrived] = useState(false);
  const [partyFinished, setPartyFinished] = useState(false);

  const handleGuestArrival = async (guest) => {
    try {
      // Format the current time according to the Europe/London time zone
      const currentTime = new Date();
      const options = { timeZone: 'Europe/London', hour12: false };
      const arrivalTime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();
  
      // Update the guest's arrival status
      await DataStore.save(
        PartyGuests.copyOf(guest, (updated) => {
          updated.Arrived = true;
          // updated.ArrivalTime = arrivalTime;
        })
      );
  
      // Retrieve the PartyBooking object that corresponds to the selected party
      const partyBook = await DataStore.query(PartyBooking, selectedParty);
  
      // Update Current Guests in PartyBooking record
      await DataStore.save(
        PartyBooking.copyOf(partyBook, (updated) => {
          updated.CurrentGuests = partyBook.CurrentGuests + 1;
        })
      );
  
      // Record the event with Amplify Analytics
     
    } catch (error) {
      console.error(error);
    }
  };
  

  async function HandleClient(selectedParty) {
    // Query the PartyBooking object with the specified ID
    const partyBooking = await DataStore.query(PartyBooking, selectedParty);

    // Format the current time according to the Europe/London time zone
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const arrivalTime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();

    // Update the PartyChildMumArrived property of the PartyBooking object
    await DataStore.save(
      PartyBooking.copyOf(partyBooking, (updated) => {
        updated.PartyChildMumArrived = arrivalTime;
      })
    );

    // Send a message to the ChatDashboard component
    await DataStore.save(
      new Messages({
        content: `Party ${partyBooking.ChildName} has arrived make sure to check them in and prepare the party room`,
        email: 'Front Desk',
        group: ['Party Host', 'Staff', 'Admin', 'Developer', 'TeamLeader'],
        createdAt: arrivalTime
      })
    );

    console.log(`Party ${partyBooking.ChildName} has arrived`);
  }

  const handleMistake = async function (guest) {
    await DataStore.save(
      PartyGuests.copyOf(guest, (updated) => {
        updated.Arrived = false;
        updated.ArrivalTime = null;
      })
    );
    setPartyGuests(partyGuests.filter((g) => g.id !== guest.id));
  };

 const handlePartyFinish = async function (selectedParty) {
    // Query the PartyBooking object with the specified ID
    const partyBooking = await DataStore.query(PartyBooking, selectedParty);

    // Format the current time according to the Europe/London time zone
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const departureTime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();

    // Update the PartyChildLeft property of the PartyBooking object
    await DataStore.save(
        PartyBooking.copyOf(partyBooking, (updated) => {
            updated.PartyChildLeft = departureTime;
        })
    );

    // Send a message to the ChatDashboard component
    await DataStore.save(
        new Messages({
            content: `Party ${partyBooking.ChildName} has left make sure to check them out and clean the party room`,
            email: 'Front Desk',
            group: ['Party Host', 'Staff', 'Admin', 'Developer', 'TeamLeader'],
            createdAt: departureTime
        })
    );
    console.log(`Party ${partyBooking.ChildName} has left`);
};

useEffect(() => {
    const fetchPartyGuests = async () => {
        const allGuests = await DataStore.query(PartyGuests);
        const guests = allGuests.filter(guest => guest.partybookingID === selectedParty);
        
      setPartyGuests(guests);
    };
  
    if (selectedParty) {
      fetchPartyGuests();
    }
  }, [selectedParty]);
  
  

// create a table to display the party guests and have buttons to mark them as arrived and left
return (
    <div>
        <table className="w-full text-left border-collapse">
  <thead>
    <tr>
      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Guest Name</th>
      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Arrived</th>
      <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Cancel</th>
    </tr>
  </thead>
  <tbody>
    {partyGuests.map((guest) => (
      <tr key={guest.id} className="hover:bg-grey-lighter">
        <td className="py-4 px-6 border-b border-grey-light">{guest.ChildName}</td>
        <td className="py-4 px-6 border-b border-grey-light">
          {!guest.Arrived && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleGuestArrival(guest)}
            >
              Arrived
            </button>
          )}
        </td>
        <td className="py-4 px-6 border-b border-grey-light">
          {guest.Arrived && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleMistake(guest)}
            >
              Cancel
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

{!clientArrived && (
  <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
    onClick={() => {
      HandleClient(selectedParty);
      setClientArrived(true);
    }}
  >
    Client Arrived
  </button>
)}
<button
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
  onClick={async () => {
    await handlePartyFinish(selectedParty);
    setPartyFinished(true);
  }}
>
  Party Finished
</button>

    </div>  

);
};
      
export default TillParty;