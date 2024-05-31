import { DataStore } from 'aws-amplify';
import { PartyBooking } from '../models';
import React, { useState, useEffect } from 'react';
import PartyBookingForm from './partybookingform';
import NewPartyBookingForm from './PartyStaffCalendar';
import CustMessages from './custsendmessage';

export default function OrderHistory() {
  const [partyBookings, setPartyBookings] = useState([]);
  const [timeRange, setTimeRange] = useState('Hour');
  const [showFuturePartyBookings, setShowFuturePartyBookings] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [partyid, setId] = useState('');
  const [newBookings, setNewBookings] = useState(false);
  const [message, setMessage] = useState(false);




  useEffect(() => {
    async function getPartyBookings() {
      // Get current date and time
      const now = new Date();

      // Get one hour ago
      const oneHourAgo = new Date(now);
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      // Get start of today
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);

      // Get start of this week (assuming Sunday is the first day of the week)
      const thisWeek = new Date(now);
      thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay());
      thisWeek.setHours(0, 0, 0, 0);

      // Get start of this month
      const thisMonth = new Date(now);
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      let startDate;
      switch (timeRange) {
        case 'Hour':
          startDate = oneHourAgo;
          break;
        case 'Current Day':
          startDate = today;
          break;
        case 'This Week':
          startDate = thisWeek;
          break;
        case 'This Month':
          startDate = thisMonth;
          break;
        default:
          startDate = now;
      }

      // Find all party bookings
      const allPartyBookings = await DataStore.query(PartyBooking);

      // Filter party bookings based on selected time range and showFuturePartyBookings state
      let filteredPartyBookings;
      if (showFuturePartyBookings) {
        filteredPartyBookings = allPartyBookings.filter(session => new Date(session.PartyDate) >= now);
      } else {
        filteredPartyBookings = allPartyBookings.filter(
          session => new Date(session.PartyDate) >= startDate && new Date(session.PartyDate) <= now
        );
      }

      setPartyBookings(filteredPartyBookings);
    }

    getPartyBookings();
  }, [timeRange, showFuturePartyBookings]);

  const numberOfOrders = partyBookings.length;
  const totalAmount = partyBookings.reduce((acc, order) => acc + order.Total, 0);
  const totalAmountMinusVAT = totalAmount * 0.8;


  if (showMoreInformation === true) {
    return (
<PartyBookingForm partyid={partyid} />)
    
  }

  if (newBookings === true) {
    return (
<NewPartyBookingForm/>)

    
  }

  if (message === true) {
    return (
<CustMessages reply={partyid}/>)
  }

  return (
    <>
    <div className="flex flex-col items-start sm:items-center sm:flex-row sm:justify-between">
      <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
        Time Range
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:w-auto"
        defaultValue="Hour"
        onChange={e => setTimeRange(e.target.value)}
      >
        <option>Hour</option>
        <option>Current Day</option>
        <option>This Week</option>
        <option>This Month</option>
      </select>
      <button
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0"
        onClick={() => setShowFuturePartyBookings(!showFuturePartyBookings)}
      >
        {showFuturePartyBookings ? 'Hide Future Party Bookings' : 'Show Future Party Bookings'}
      </button>
    </div>
  
    
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Party Bookings</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the party bookings in your account including their name, age, party type, date, time, number of children, and total cost.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button onClick={()=> setNewBookings(true)}
            type="button"
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Booking
          </button>
        </div>
        
        
      </div>
      <div className="flex flex-col items-start sm:flex-row sm:justify-between gap-x-6 py-5">
      <p>Number of Party Bookings: {numberOfOrders}</p>
      <p>Total Amount: £{totalAmount.toFixed(2)}</p>
      <p>Total Amount (minus VAT): £{totalAmountMinusVAT.toFixed(2)}</p>
    </div>
  
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Age
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Party Type
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    No. of Children
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Send Message</span>
                  </th>
                  
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">More Information</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partyBookings.map(session => (
                  <tr key={session.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {session.ChildName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.ChildAge}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.PartyType}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.PartyDate}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.PartyTime}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Telephone}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.NoOfChildren}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{session.Total.toFixed(2)}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setMessage(true) || setId(session.Email)}
                      >
                       Send Message
                      </button>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setShowMoreInformation(true) || setId(session.id)}
                      >
                        More Information
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>
    </div>
  </>
  
  );
}


