import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Staff } from '../models';

export default function StaffForm () {
  const [staff, setStaff] = useState({
    Name: '',
    Email: '',
    TimeEntries: '',
    Role: '',
    HourlyRate: 0,
    StartDate: '',
    Current: false,
    Telephone: '',
    ContractType: '',
    EndDate: '',
    Age: '',
    DOB: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'HourlyRate') {
      setStaff((prevState) => ({ ...prevState, [name]: parseFloat(value) }));
    } else if (name === 'Current') {
      setStaff((prevState) => ({ ...prevState, [name]: Boolean(value) }));
    } else {
      setStaff((prevState) => ({ ...prevState, [name]: value }));
    }
  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const staffToSave = {
      ...staff,
      // ... other properties
      EndDate: staff.Current ? undefined : staff.EndDate,
    };

    await DataStore.save(new Staff(staffToSave));
    
    setStaff({
      Name: '',
      Email: '',
      TimeEntries: '',
      Role: '',
      HourlyRate: 0,
      StartDate: '',
      Current: false,
      Telephone: '',
      ContractType: '',
      EndDate: '',
      Age: '',
      DOB: ''
    });
    window.location.reload();
  };
return (

        
<div className="flex flex-col items-center justify-center min-h-screen py-2">
  <button         className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={() => window.location.reload()}>Back</button>

  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label htmlFor="Name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
    <input
      type="text"
      id="Name"
      name="Name"
      value={staff.Name}
      onChange={handleInputChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="Email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
    <input
      type="email"
      id="Email"
      name="Email"
      value={staff.Email}
      onChange={handleInputChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  
    <div className="mb-4">
        <label htmlFor="Role" className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
        <input
        type="text"
        id="Role"
        name="Role"
        value={staff.Role}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="HourlyRate" className="block text-gray-700 text-sm font-bold mb-2">Hourly Rate:</label>
        <input
        type="number"
        id="HourlyRate"
        name="HourlyRate"
        value={staff.HourlyRate}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="StartDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
        <input
        type="date"
        id="StartDate"
        name="StartDate"
        value={staff.StartDate}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="Current" className="block text-gray-700 text-sm font-bold mb-2">Current:</label>
        <input
        type="checkbox"
        id="Current"
        name="Current"
        value={staff.Current}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="Telephone" className="block text-gray-700 text-sm font-bold mb-2">Telephone:</label>
        <input
        type="text"
        id="Telephone"
        name="Telephone"
        value={staff.Telephone}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="ContractType" className="block text-gray-700 text-sm font-bold mb-2">Contract Type:</label>
        <input
        type="text"
        id="ContractType"
        name="ContractType"
        value={staff.ContractType}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    {staff.Current ? false : ( <div className="mb-4">
        <label htmlFor="EndDate" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
        <input
        type="date"
        id="EndDate"
        name="EndDate"
        value={staff.EndDate}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    )}
   
    <div className="mb-4">
        <label htmlFor="Age" className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
        <input
        type="number"
        id="Age"
        name="Age"
        value={staff.Age}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="DOB" className="block text-gray-700 text-sm font-bold mb-2">DOB:</label>
        <input
        type="date"
        id="DOB"
        name="DOB"
        value={staff.DOB}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    

    <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      Submit
    </button>
    </div>
</form>
</div>
)
}
