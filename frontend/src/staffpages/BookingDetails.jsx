import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from '../models';
import { format, addHours } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Modal2 from './modal2';

export default function Arrival({ session }) {
  const [arrival, setArrival] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addGuests, setAddGuests] = useState(false);
  const [adults, setAdults] = useState(session.Adults); // Initialize with session data
  const [children, setChildren] = useState(session.Children); // Initialize with session data
  const [childData, setChildData] = useState([{ age: '' }]);
  const [removeGuests, setRemoveGuests] = useState(false);
  const [totalSpent, setTotalSpent] = useState(session.TotalSpent); // Initialize with session data



  const handleAddGuestsSubmit = () => {
    updateDatastore();
  };

  const updateDatastore = async () => {
    try {
      await DataStore.save(
        Sessions.copyOf(session, (updated) => {
          updated.Adults = adults;
          updated.Children = children;
          updated.TotalSpent = calculateTotalSpent();
        })
      );
    } catch (error) {
      console.error('Error updating session in datastore:', error);
    }
  };

  const calculateTotalSpent = () => {
    const adultExtraCharge = 2.0; // Extra charge for additional adults
    const childPrices = {
      "2+": 9.0, // Price for child over 2
      "1-2": 8.0, // Price for child between 1 and 2
      "under 1": 3.0 // Price for child under 1
    };
    let total = 0;
  
    // Ensure adults and children are numbers
    const numAdults = parseInt(adults);
    const numChildren = parseInt(children);
  
    // Calculate total for adults
    if (!isNaN(numAdults) && !isNaN(numChildren)) {
      if (numAdults > numChildren) {
        const extraAdults = numAdults - numChildren;
        total += extraAdults * adultExtraCharge; // Charge extra for additional adults
      }
    }
  
    // Calculate total for children
    childData.forEach((data) => {
      total += childPrices[data.age] || 0; // Ensure childPrices[data.age] is a valid number
    });
  
    return total;
  };
  
  
  
  
  
  

  const navigate = useNavigate();

  const handleAdultsChange = (value) => {
    setAdults(Math.max(0, value)); // Ensure adults count doesn't go below 0
  };

  const handleChildrenChange = (value) => {
    setChildren(Math.max(0, value)); // Ensure children count doesn't go below 0
    setChildData(Array.from({ length: value }, () => ({ age: '' })));
  };

  const handleChildAgeChange = (index, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, age: value } : data))
    );
  };

  const confirmArrival = async () => {
    const currentTime = new Date();
    const formattedTime = format(currentTime, 'HH:mm');
    const arrivalTime = format(currentTime, 'HH:mm:ss.SSS');
    const twoHoursLater = addHours(currentTime, 2);
    const formattedTwoHoursLater = format(twoHoursLater, 'HH:mm');

    try {
      const allSessions = await DataStore.query(Sessions);
      const conflictingSessions = allSessions.filter(
        (s) =>
          s.Table === session.Table &&
          s.TimeslotFrom < formattedTwoHoursLater &&
          s.TimeslotTo > formattedTime &&
          s.Date === session.Date &&
          s.CustomerbookingID !== session.CustomerbookingID
      );

      if (conflictingSessions.length > 0) {
        setShowModal(true);
      } else {
        await DataStore.save(
          Sessions.copyOf(session, (updated) => {
            updated.Arrived = true;
            updated.TimeArrived = arrivalTime;
            updated.LeftCenter = false;
            updated.TimeslotFrom = formattedTime;
            updated.TimeslotTo = formattedTwoHoursLater;
          })
        );
        setArrival(true);
      }
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  useEffect(() => {
    // Check if any changes have been made to adults, children, or childData
    const changesMade = adults !== session.Adults || children !== session.Children || JSON.stringify(childData) !== JSON.stringify([{ age: '' }]);
  
    // If no changes have been made, set totalSpent to session.TotalSpent
    if (!changesMade) {
      setTotalSpent(session.TotalSpent);
      return; // Exit early to avoid unnecessary calculations
    }
  
    // If changes have been made, calculate the new totalSpent
    setTotalSpent(calculateTotalSpent());
  }, [adults, children, childData]);
  
  

  if (arrival === true) {
    navigate('/prebooktill', {
      state: {
        order: '2 Hour Session',
        total: session.TotalSpent,
        table: session.Table,
        ChildName: session.Name,
      },
    });
  }

  const guests = adults + children;

  if (showModal) {
    return <Modal2 session={session}></Modal2>;
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Session Details</h3>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Number of Guests</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{guests}</dd>
          </div>
          <button
            onClick={() => setAddGuests(true)}
            type="button"
            className="rounded-md mr-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Adjust Guests
          </button>
         

        

          {addGuests && (
            <div>
              <div>
                <label htmlFor="adults" className="block text-sm font-medium text-gray-900">
                  Number of Adults
                </label>
                <div className="flex items-center">
                  <button onClick={() => handleAdultsChange(adults - 1)}> - </button>
                  <input
                    id="adults"
                    type="number"
                    name="adults"
                    min={0}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={adults}
                    readOnly
                  ></input>
                  <button onClick={() => handleAdultsChange(adults + 1)}> + </button>
                </div>
              </div>
              <div>
                <label htmlFor="children" className="block text-sm font-medium text-gray-900">
                  Number of Children
                </label>
                <div className="flex items-center">
                  <button onClick={() => handleChildrenChange(children - 1)}> - </button>
                  <input
                    id="children"
                    type="number"
                    name="children"
                    min={0}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={children}
                    readOnly
                  ></input>
                  <button onClick={() => handleChildrenChange(children + 1)}> + </button>
                </div>
              </div>
              <div>
                {childData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <label htmlFor={`child-age-${index}`} className="block text-sm font-medium text-gray-900">
                      Child's Age- Do Not Select Sibling First
                    </label>
                    <select
                      onChange={(e) => handleChildAgeChange(index, e.target.value)}
                      id={`child-age-${index}`}
                      name={`child-age-${index}`}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="under 1">under 1 year</option>
                      <option value="1-2">1-2 years old</option>
                      {childData.length > 1 && <option value="sibling">sibling</option>}
                      <option value="2+">2+</option>
                    </select>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddGuestsSubmit}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          )}
        </dl>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">Date</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Date}</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">TimeSlot From</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.TimeslotFrom}</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">TimeSlot To</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.TimeslotTo}</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">Email address</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Email}</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">Table</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Table}</dd>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">Child Ages</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
        {session.ChildData && session.ChildData.length > 0 && (
    <div>
        {session.ChildData.map((child, index) => (
            <p key={index} className="mt-1 text-md font-semibold leading-5 text-black">
                Child Age: {child.childAge}
            </p>
        ))}
    </div>
)}
        </dd>
      </div>

      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-900">Total To Pay Now</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£{totalSpent}</dd>
      </div>
      <button
        onClick={confirmArrival}
        type="button"
        className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Confirm Arrival
      </button>
    </div>
  );
}
