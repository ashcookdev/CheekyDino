import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { format, isValid } from 'date-fns';
import ConsumerAnalytics from './consumeranayltics';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory({ startDate }) {
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSessions() {
      try {
        const fetchedSessions = await DataStore.query(Sessions);
        const filteredSessions = fetchedSessions.filter(session => {
            return session.Date === startDate;
          });
          
        setSessions(filteredSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    }

    if (startDate) {
      fetchSessions();
    }
  }, [startDate]);

  const handleEditClick = (session) => {
    setOpen(true);
    setSession(session);
  };

  if (open === true) {
    return (<ConsumerAnalytics email={session.Email} />);
  }

  return (
    <>
   
     

      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
        
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
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Arrived
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Left Center
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sessions.map((session, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Telephone}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Date}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.TimeslotFrom} to {session.TimeslotTo}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Table}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{session.TotalSpent.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Adults}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Children}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Arrived ? 'Yes' : 'No'}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.LeftCenter ? 'Yes' : 'No'}</td>
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
    </>
  );
}
