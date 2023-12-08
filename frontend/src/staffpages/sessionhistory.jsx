import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import React, { useState, useEffect } from 'react';
import BarGraph from './graph';
import { set } from 'date-fns';
import ConsumerAnalytics from './consumeranayltics';

export default function OrderHistory() {
  const [sessions, setSessions] = useState([]);
  const [timeRange, setTimeRange] = useState('Hour');
  const [showFutureSessions, setShowFutureSessions] = useState(false);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState([]);

  useEffect(() => {
    async function getSessions() {
      // Get current date and time
      const now = new Date();

      // Get start of this year
      const thisYear = new Date(now.getFullYear(), 0, 1);

      let startDate;
      switch (timeRange) {
        case 'Hour':
          startDate = new Date(now);
          startDate.setHours(startDate.getHours() - 1);
          break;
        case 'Current Day':
          startDate = new Date(now);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'This Week':
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - startDate.getDay());
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'This Month':
          startDate = new Date(now);
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'This Year':
          startDate = thisYear;
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

  const handleEditClick = (session) => {


    setOpen(true);
    setSession(session)
  }

  if (open === true) {
    return (<ConsumerAnalytics email={session.Email} />)
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
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option>Hour</option>
          <option>Current Day</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
        <button
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0"
          onClick={() => setShowFutureSessions(!showFutureSessions)}
        >
          {showFutureSessions ? 'Hide Future Sessions' : 'Show Future Sessions'}
        </button>
      </div>

      <div className="flex flex-col items-start sm:flex-row sm:justify-between gap-x-6 py-5">
        <p className='text-sm'>Number of Sessions: {numberOfOrders}</p>
        <p className='text-sm'>Total Amount: £{totalAmount.toFixed(2)}</p>
        <p className='text-sm text-color-blue-500'>Total Amount (minus VAT): £{totalAmountMinusVAT.toFixed(2)}</p>
      </div>

      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Telephone
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Timeslot
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Table
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Total Spent
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Adults
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Children
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sessions.map((session) => (
                <tr key={session.Email}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Telephone}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Date}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.TimeslotFrom} to {session.TimeslotTo}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Table}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{session.TotalSpent}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Adults}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Children}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                    <button className="text-indigo-600 hover:text-indigo-900" onClick={(event) => handleEditClick(session)}>
                      More<span className="sr-only">, {session.Name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 rounded-md border border-gray-300 shadow-md mt-20">
        <BarGraph />
      </div>
    </>
  );
}