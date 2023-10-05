import React, { useState, useEffect } from 'react';
import { DataStore, Auth } from 'aws-amplify';
import { ClockIn, Staff } from './models';
import { ClockIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import ClockInData from './clockindata';

export default function StaffActions() {
  const [staffList, setStaffList] = useState([]);
  const [clock, setClock] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      const staff = await DataStore.query(Staff);
      const clockInDataAll = await DataStore.query(ClockIn);
  
      const staffData = await Promise.all(staff.map(async (staffMember) => {
        const userEmail = staffMember.Email;
        const dateTime = new Date();
        const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
        const dateOnly = new Date(dateTime - timezoneOffset).toISOString().split('T')[0];
  
        const clockInData = clockInDataAll.filter(c => c.StaffId === userEmail && c.Date === dateOnly);
  
        return {
          ...staffMember,
          isClockedIn: clockInData.length > 0 && clockInData[0].ClockedIn && !clockInData[0].ClockedOut,
          isOnBreak: clockInData.length > 0 && clockInData[0].Break,
        };
      }));
  
      setStaffList(staffData);
    };
  
    fetchStaff();
  }, []);
  

  // Rest of your logic here...
  const handleClockInOut = async (staff) => {
    const userEmail = staff.Email;
    const dateTime = new Date();
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
      .toISOString()
      .split('T')[1]
      .split('Z')[0];
    const dateOnly = dateTime.toISOString().split('T')[0];
  
    const clockInDataAll = await DataStore.query(ClockIn);
    const clockInData = clockInDataAll.filter(c => c.StaffId === userEmail && c.Date === dateOnly);
  
    if (clockInData.length > 0 && clockInData[0].ClockedIn && !clockInData[0].ClockedOut) {
      // If the staff member is already clocked in but not clocked out, update the ClockOut time and ClockedOut status
      // work out how long the shift was

      const clockIn = new Date(`${dateOnly}T${clockInData[0].ClockIn}`);
      const clockOut = new Date(`${dateOnly}T${timeOnly}`);

      const shiftLength = (clockOut - clockIn) / 60000;


      await DataStore.save(
        ClockIn.copyOf(clockInData[0], updated => {
          updated.ClockOut = timeOnly;
          updated.ClockedOut = true;
          updated.StaffHours = parseFloat(shiftLength);
        })
      );
      console.log(`${staff.Name} clocked out`);
      window.location.reload();
    } else {
      // If the staff member is not clocked in, save a new ClockIn entry
      await DataStore.save(
        new ClockIn({
          ClockIn: timeOnly,
          ClockedIn: true,
          StaffId: userEmail,
          Date: dateOnly,
        })
      );
      console.log(`${staff.Name} clocked in`);
      
    }
  };
  
  const handleBreakStartEnd = async (staff) => {
    const userEmail = staff.Email;
    const dateTime = new Date();
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
      .toISOString()
      .split('T')[1]
      .split('Z')[0];
    const dateOnly = dateTime.toISOString().split('T')[0];
  
    const clockInDataAll = await DataStore.query(ClockIn);
    const clockInData = clockInDataAll.filter(c => c.StaffId === userEmail && c.Date === dateOnly);
  
    if (clockInData.length > 0 && clockInData[0].Break) {
      // If the staff member is on break, update the BreakEnd time and Break status
      // work out how long the break was
      const breakStart = new Date(`${dateOnly}T${clockInData[0].BreakStart}`);
      const breakEnd = new Date(`${dateOnly}T${timeOnly}`);
      const breakLength = (breakEnd - breakStart) / 60000;

      await DataStore.save(
        ClockIn.copyOf(clockInData[0], updated => {
          updated.BreakEnd = timeOnly;
          updated.Break = false;
          updated.StaffBreak = parseFloat(breakLength);
        })
      );
      console.log(`${staff.Name} ended break`);
      window.location.reload();
    } else {
      // If the staff member is not on break, update the BreakStart time and Break status
      await DataStore.save(
        ClockIn.copyOf(clockInData[0], updated => {
          updated.BreakStart = timeOnly;
          updated.Break = true;
        })
      );
      console.log(`${staff.Name} started break`);
      window.location.reload();
    }
  };
  
  if (clock === true) {
    return (
      <ClockInData/>
    );
  }

  return (

<div className="px-4 sm:px-6 lg:px-8">
<div className="sm:flex sm:items-center">
<div className="sm:flex-auto">
  <h1 className="text-base font-semibold leading-6 text-gray-900">Staff</h1>
  
</div>
<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
  <button onClick={()=> setClock(true)}
    type="button"
    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
Data  </button>
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
            ClockIn/Out
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Break
          </th>
          
          
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
      {staffList.map((staff) => (
          <tr key={staff.Name}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
              {staff.Name}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staff.Name}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> <button
                    className={`bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md ${staff.isClockedIn ? 'bg-red-500' : 'bg-blue-500'}`}
                    onClick={() => handleClockInOut(staff)}
                  >
                    {staff.isClockedIn ? <ClockIcon className="h-5 w-5 mr-2" /> : <MoonIcon className="h-5 w-5 mr-2" />}
                    {staff.isClockedIn ? 'Clock Out' : 'Clock In'}
                  </button></td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> <button
                    className={`bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md ${staff.isOnBreak ? 'bg-green-500' : 'bg-blue-500'}`}
                    onClick={() => handleBreakStartEnd(staff)}
                  >
                    {staff.isOnBreak ? <MoonIcon className="h-5 w-5 mr-2" /> : <SunIcon className="h-5 w-5 mr-2" />}
                    {staff.isOnBreak ? 'Back From Break' : 'Start Break'}
                  </button></td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
</div>
  );
}