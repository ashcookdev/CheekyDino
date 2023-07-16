import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import React, { useState, useEffect } from 'react';
import BarGraph from './graph';

export default function OrderHistory() {
  const [sessions, setSessions] = useState([]);
  const [timeRange, setTimeRange] = useState('Hour');
  const [showFutureSessions, setShowFutureSessions] = useState(false);

  useEffect(() => {
    async function getSessions() {
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

      // Find all sessions
      const allSessions = await DataStore.query(Sessions);

      // Filter sessions based on selected time range and showFutureSessions state
      let sessions;
      if (showFutureSessions) {
        sessions = allSessions.filter(session => new Date(session.Date) >= now);
      } else {
        sessions = allSessions.filter(
          session => new Date(session.Date) >= startDate && new Date(session.Date) <= now
        );
      }

      setSessions(sessions);
    }

    getSessions();
  }, [timeRange, showFutureSessions]);


  const numberOfOrders = sessions.length;
const totalAmount = sessions.reduce((acc, order) => acc + order.TotalSpent, 0);
const totalAmountMinusVAT = totalAmount * 0.8;


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
          onClick={() => setShowFutureSessions(!showFutureSessions)}
        >
          {showFutureSessions ? 'Hide Future Sessions' : 'Show Future Sessions'}
        </button>
      </div>

      <div className="flex justify-between gap-x-6 py-5">
  <p>Number of Sessions: {numberOfOrders}</p>
  <p>Total Amount: £{totalAmount.toFixed(2)}</p>
  <p>Total Amount (minus VAT): £{totalAmountMinusVAT.toFixed(2)}</p>
</div>

      <ul role="list" className="divide-y divide-gray-100">
        {sessions.map(session => (
          <li key={session.id} className="flex justify-between gap-x-6 py-5">
            {/* Render session details here */}
            <p>Name: {session.Name}</p>
            <p>Email: {session.Email}</p>
            <p> From: {session.TimeslotFrom}</p>
            <p> To: {session.TimeslotTo}</p>
            <p>Date: {session.Date}</p>
            <p>Table: {session.Table}</p>
            <p>Total Spent: £{session.TotalSpent}</p>
            <p>Adults: {session.Adults}</p>
            <p>Children: {session.Children}</p>
            <p>Telephone: {session.Telephone}</p>
          </li>
        ))}
      </ul>
      <div className="p-4 rounded-md border border-gray-300 shadow-md mt-20">
  <BarGraph />
</div>

    </>
  );
}
