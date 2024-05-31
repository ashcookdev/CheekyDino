import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';
import NewStaff from './starterform';

export default function StaffTable () {
  const [staffs, setStaffs] = useState([]);
  const [newStaff, setNewStaff] = useState(false);

  useEffect(() => {
    const fetchStaffs = async () => {
      const staffs = await DataStore.query(Staff);
      setStaffs(staffs);
    };
    fetchStaffs();
  }, []);

  const handleEdit = (id) => {
    // Handle editing the staff record with the given id
  };

  const handleDelete = async (id) => {
    // Query for the Staff record by id
    const staff = await DataStore.query(Staff, id);
    if (staff) {
      // Delete the Staff record
      await DataStore.delete(staff);
      // Update the local state to remove the deleted staff from the table
      setStaffs((prevStaffs) => prevStaffs.filter((s) => s.id !== id));
    }
  };

  if (newStaff === true) {
    return <NewStaff/>;
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
        <button onClick={() => setNewStaff(true)}
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add user
        </button>
      </div>
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
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Telephone
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Hourly Rate
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Contract Type
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Age
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  DOB
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Current
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Start Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  End Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staffs.map((person) => (
                <tr key={person.Email}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {person.Name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Telephone}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Role}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.HourlyRate}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.ContractType}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Age}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Dob}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.Current}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.StartDate}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.EndDate}</td>
                  <td className="whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleEdit(person.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ml-4 text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(person.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      </div>     );                 
}

    