import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { ClockIn } from '../models';
import { CSVLink } from 'react-csv';

function ClockInTable() {
    const [clockIns, setClockIns] = useState([]);
  
    useEffect(() => {
      fetchClockIns();
      const subscription = DataStore.observe(ClockIn).subscribe(() => fetchClockIns());
      return () => subscription.unsubscribe();
    }, []);
  
    async function fetchClockIns() {
      const clockIns = await DataStore.query(ClockIn);
      setClockIns(clockIns);
    }
  

    function DownloadButton({ clockIns }) {
      const headers = [
        { label: "Name", key: "name" },
        { label: "Date", key: "date" },
        { label: "Clock In", key: "clockIn" },
        { label: "Clock Out", key: "clockOut" },
        { label: "Break Start", key: "breakStart" },
        { label: "Break End", key: "breakEnd" },
        { label: "Staff Hours", key: "staffHours" },
        { label: "Staff Break", key: "staffBreak" }
      ];
    
      return (
        <CSVLink data={clockIns} headers={headers}>
          Download CSV
        </CSVLink>
      );
    }
  
  

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button onClick={DownloadButton}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Download
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
  <thead>
    <tr>
      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 mr-3">
        Name
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Date
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Clock In
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Clock Out
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Break Start
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Break End
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Staff Hours
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Staff Break
      </th>

      
    </tr>
  </thead>
              <tbody className="divide-y divide-gray-200">
                {clockIns.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.StaffId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Date}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.ClockIn}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.ClockOut}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.BreakStart}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.BreakEnd}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.StaffHours}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.StaffBreak}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClockInTable;