import { DataStore } from 'aws-amplify';
import { PartyBooking } from './models';
import React, { useState, useEffect } from 'react';
import PartyBookingForm from './partybookingform';

export default function OrderHistory() {
  const [partyBookings, setPartyBookings] = useState([]);
  const [timeRange, setTimeRange] = useState('Hour');
  const [showFuturePartyBookings, setShowFuturePartyBookings] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [partyid, setId] = useState('');



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

  return (
    <>
      <div>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          Time Range
        </label>
        <select
          id="location"
          name="location"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="Hour"
          onChange={e => setTimeRange(e.target.value)}
        >
          <option>Hour</option>
          <option>Current Day</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        <button
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setShowFuturePartyBookings(!showFuturePartyBookings)}
        >
          {showFuturePartyBookings ? 'Hide Future Party Bookings' : 'Show Future Party Bookings'}
        </button>
      </div>

      <div className="flex justify-between gap-x-6 py-5">
        <p>Number of Party Bookings: {numberOfOrders}</p>
        <p>Total Amount: £{totalAmount.toFixed(2)}</p>
        <p>Total Amount (minus VAT): £{totalAmountMinusVAT.toFixed(2)}</p>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
      {partyBookings.map(session => (
  <li key={session.id} className="flex justify-between gap-x-6 py-5">
    {/* Render session details here */}
    <p>Name: {session.ChildName}</p>
    <p>Age: {session.ChildAge}</p>
    <p>Party Type: {session.PartyType}</p>
    <p>Date: {session.PartyDate}</p>
    <p>Time: {session.PartyTime}</p>
    <p>No. of Children: {session.NoOfChildren}</p>
    <p>Total: £{session.Total.toFixed(2)}</p>
    {/* Add a button to show more information */}
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => setShowMoreInformation(true) || setId(session.id)}
    >
      More Information
    </button>
  </li>
))}

      </ul>
    </>
  );
}
