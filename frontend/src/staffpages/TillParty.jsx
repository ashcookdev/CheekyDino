import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { PartyGuests, PartyBooking, Messages, Sessions } from '../models';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const TillParty = ({ selectedParty }) => {
  const [partyGuests, setPartyGuests] = useState([]);
  const [clientArrived, setClientArrived] = useState(false);
  const [partyFinished, setPartyFinished] = useState(false);
  const [back, setBack] = useState(false);
  const [partyMumArrived, setPartyMumArrived] = useState(false);


  
  if (back === true) {
window.location.reload()    
  }

  const handleGuestArrival = async (guest) => {
    try {
      await DataStore.save(
        PartyGuests.copyOf(guest, (updated) => {
          updated.Arrived = true;
        })
      );

      fetchPartyGuests();
    } catch (error) {
      console.error(error);
    }
  };


  const HandleClient = async (selectedParty) => {
    try {
      const partyBooking = await DataStore.query(PartyBooking, selectedParty);

      await DataStore.save(
        PartyBooking.copyOf(partyBooking, (updated) => {
          updated.PartyChildMumArrived = new Date().toISOString();
        })

      );

      // get session booking details using email
      const sessionBooking = await DataStore.query(Sessions);
      const session = sessionBooking.filter((session) => partyBooking.Email === session.Email && session.Date === partyBooking.PartyDate);

      console.log(session);

      // update session booking
      await DataStore.save(
        Sessions.copyOf(session, (updated) => {
          updated.Arrived = true;
        })
      );

      console.log(`Party ${partyBooking.ChildName} has arrived`);

      // send message to staff
      await DataStore.save(
        new Messages({
          content: `Party ${partyBooking.ChildName} has arrived. Make sure to check them in and clean the party room.`,
          email: 'Front Desk',
          group: ['Party Host', 'Staff', 'Admin', 'Developer', 'TeamLeader'],
          createdAt: new Date().toISOString()
        })
      );

      setClientArrived(true);
    } catch (error) {
      console.error(error);
    }
  };

  

     


      // get session booking details using email





  const handleMistake = async function (guest) {
    try {
      await DataStore.save(
        PartyGuests.copyOf(guest, (updated) => {
          updated.Arrived = false;
        })
      );

      fetchPartyGuests();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePartyFinish = async () => {
    try {
      const partyBooking = await DataStore.query(PartyBooking, selectedParty);

      let date = new Date();
      let awsTime = format(date, 'hh:mm:ss:SSS');


      await DataStore.save(
        PartyBooking.copyOf(partyBooking, (updated) => {
          updated.PartyChildLeft = awsTime;
          updated.LeftBranch = true;
        })
      );

      await DataStore.save(
        new Messages({
          content: `Party ${partyBooking.ChildName} has left. Make sure to check them out and clean the party room.`,
          email: 'Front Desk',
          group: ['Party Host', 'Staff', 'Admin', 'Developer', 'TeamLeader'],
        })
      );

      console.log(`Party ${partyBooking.ChildName} has left`);

      setPartyFinished(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPartyGuests = async () => {
    try {
      const allGuests = await DataStore.query(PartyGuests);
      const guests = allGuests.filter((guest) => guest.partybookingID === selectedParty);
      setPartyGuests(guests);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPartyBooking = async () => {
      try {
        const partyBooking = await DataStore.query(PartyBooking, selectedParty);
        if (partyBooking.PartyChildMumArrived === null) {
          setClientArrived(false);
        } else {
          setClientArrived(true);
          setPartyMumArrived(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedParty) {
      fetchPartyGuests();
      fetchPartyBooking();
    }
  }, [selectedParty]);

  return (
    <div className="mt-8 flow-root">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
        onClick={() => setBack(true)}
      >
        Back
      </button>

      {!clientArrived && !partyMumArrived && (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            setClientArrived(true);
            HandleClient(selectedParty);
          }}
        >
          Client Arrived
        </button>
      )}

      {clientArrived && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
          onClick={handlePartyFinish}
        >
          Client Left
        </button>
      )}

      {!partyFinished && (
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Guest Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Arrived
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Cancel
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partyGuests.map((guest) => (
                  <tr key={guest.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {guest.ChildName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {!guest.Arrived && (
                        <button
                          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleGuestArrival(guest)}
                        >
                          Arrived
                        </button>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TillParty;
