import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { format } from 'date-fns';
import ConsumerAnalytics from './consumeranayltics';
import { useNavigate } from 'react-router-dom';
import Marketing from './marketing';
import SessionBlowout from './sessionblowout';

export default function OrderHistory() {
  const [allSessions, setAllSessions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState([]);
  const [back, setBack] = useState(false);
  const [unattend, setUnattend] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchSessions() {
      const fetchedSessions = await DataStore.query(Sessions);
      setAllSessions(fetchedSessions);
    }
    
    fetchSessions();
  }, []);

  const handleFilter = () => {
    const filteredSessions = allSessions.filter(session => {
      const sessionDate = session.Date;
    
      // Check if the session date falls within the selected date range
      return (
        (!startDate || sessionDate >= startDate) &&
        (!endDate || sessionDate <= endDate)
      );
    });

    // sort the sessions by date
    filteredSessions.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    
    setSessions(filteredSessions);
  };

  const handleEditClick = (session) => {
    setOpen(true);
    setSession(session);
  };

  if (open === true) {
    return (<ConsumerAnalytics email={session.Email} />);
  }

  if (unattend === true) {
    return (<SessionBlowout />);
  }
  

  const handleSearch = () => {
    // get search query
    const search = searchQuery;
  
    // filter sessions by search query
    const filteredSessions = allSessions.filter(session => {
      if (session) {
        const name = session.Name;
        const email = session.Email;
        const telephone = session.Telephone;
  
        return (name && name.includes(search)) || (email && email.includes(search)) || (telephone && telephone.includes(search));
      }
      return false;
    });
  
    // sort the sessions by date
    filteredSessions.sort((a, b) => new Date(b.Date) - new Date(a.Date));
  
    // check if filteredSessions is empty
    if (filteredSessions.length === 0) {
      setSessions(['No results found']);
    } else {
      setSessions(filteredSessions);
    }
  };
  
  

 

        



  const numberOfOrders = sessions.length;

  if (back === true) {
    navigate('/dashboard', { replace: true });
  }

  return (
    <>
      <div className="flex flex-col items-start sm:items-center sm:flex-row sm:justify-between">
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0" onClick={() => setBack(true)}>Back</button>
        <Marketing />
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2 block w-60 rounded-md border-gray-300 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button className="inline-flex items-center gap-x-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSearch}>Search</button>

        <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(format(new Date(e.target.value), 'yyyy-MM-dd'))}
          className="mt-2 block w-48 rounded-md border-gray-300 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(format(new Date(e.target.value), 'yyyy-MM-dd'))}
          className="mt-2 block w-48 rounded-md border-gray-300 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
                <button         className="inline-flex items-center gap-x-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={handleFilter}>Submit</button>

      </div>
<button className='mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0' onClick={() => setUnattend(true)}>No Show Customers </button>

      <div className="flex flex-col items-start sm:flex-row sm:justify-between gap-x-6 py-5">
        <p className='text-sm'>Number of Sessions: {numberOfOrders}</p>
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
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Child Ages
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
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
  {session.ChildData && session.ChildData.length > 0 ? (
    session.ChildData.map((child, index) => (
      <p key={index}>
        {child.childAge}
      </p>
    ))
  ) : (
    <p>No data</p>
  )}
</td>

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
