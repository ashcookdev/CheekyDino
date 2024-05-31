import React, { useState, useEffect } from 'react';
import { DataStore, Auth } from 'aws-amplify';
import { ClockIns, Staff, Messages } from '../models';
import { ClockIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import ClockInData from './clockindata';
import { set } from 'date-fns';
import { format } from 'date-fns';
import Modal from './modal';
import { useNavigate } from 'react-router-dom';

export default function StaffActions() {
  const [staffList, setStaffList] = useState([]);
  const [clock, setClock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const subscription = DataStore.observe(Messages).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      setMessages(prevMessages => [...prevMessages, msg.element]);
      console.log(messages)
      setShow(true);
      setTimeout(() => setShow(false), 30000); // hide after 30 seconds
    });
  
    return () => subscription.unsubscribe();
  }, [clock]);


  useEffect(() => {
    const fetchStaff = async () => {
      const staff = await DataStore.query(Staff);
      const clockInDataAll = await DataStore.query(ClockIns);
  
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
    console.log(staff); // This will log the staff member that was clicked on
    setIsLoading(true); // Start loading

    const userEmail = staff.Email;
    const dateTime = new Date();
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
      .toISOString()
      .split('T')[1]
      .split('Z')[0];
    const dateOnly = dateTime.toISOString().split('T')[0];
  
    const clockInDataAll = await DataStore.query(ClockIns);
    const clockInData = clockInDataAll.filter(c => c.StaffId === userEmail && c.Date === dateOnly);
  
    if (clockInData.length > 0 && clockInData[0].ClockedIn && !clockInData[0].ClockedOut) {
      // If the staff member is already clocked in but not clocked out, update the ClockOut time and ClockedOut status
      // work out how long the shift was
  
      const clockIn = new Date(`${dateOnly}T${clockInData[0].ClockIns}`);
      const clockOut = new Date(`${dateOnly}T${timeOnly}`);
  
      const shiftLength = (clockOut - clockIn) / 60000;
      const totalpay = shiftLength * staff.HourlyRate;
  
      await DataStore.save(
        ClockIns.copyOf(clockInData[0], updated => {
          updated.ClockOut = timeOnly;
          updated.ClockedOut = true;
          updated.ClockedIn = false;
          updated.HoursWorked = parseFloat(shiftLength);
          updated.TotalPay = parseFloat(totalpay);
        })
      );
  
      // Add a new message to indicate that the staff member has clocked out
      await DataStore.save(
        new Messages({
          content: `${staff.Name} clocked out`,
          email: staff.Email,
          createdAt: format(new Date(), 'HH:mm:ss.SSS'),
          group: ['Staff', 'Team Leader', 'Admin', 'Developer']
          
          // Add any other necessary fields here...
        })
      );
  
      console.log(`${staff.Name} clocked out`);
navigate("/clockin")    } else {
      // If the staff member is not clocked in, save a new ClockIn entry
      await DataStore.save(
        new ClockIns({
          ClockIn: timeOnly,
          ClockedIn: true,
          ClockedOut: false,
          HourlyRate: staff.HourlyRate,
          StaffId: userEmail,
          Date: dateOnly,
        })
      );
  
      // Add a new message to indicate that the staff member has clocked in
      await DataStore.save(
        new Messages({
          content: `${staff.Name} clocked in`,
          email: staff.Email,
          createdAt: format(new Date(), 'HH:mm:ss.SSS'),
          group: ['Staff', 'Team Leader', 'Admin', 'Developer']

          // Add any other necessary fields here...
        })
      );
  
      console.log(`${staff.Name} clocked in`);
    }
    setIsLoading(false);
navigate('/clockin');
  };
  
  
  const handleBreakStartEnd = async (staff) => {
    setIsLoading(true); // Start loading
    const userEmail = staff.Email;
    const dateTime = new Date();
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
      .toISOString()
      .split('T')[1]
      .split('Z')[0];
    const dateOnly = dateTime.toISOString().split('T')[0];
  
    const clockInDataAll = await DataStore.query(ClockIns);
    const clockInData = clockInDataAll.filter(c => c.StaffId === userEmail && c.Date === dateOnly);
  
    if (clockInData.length > 0 && clockInData[0].Break) {
      // If the staff member is on break, update the BreakEnd time and Break status
      // work out how long the break was
      const breakStart = new Date(`${dateOnly}T${clockInData[0].BreakStart}`);
      const breakEnd = new Date(`${dateOnly}T${timeOnly}`);
      const breakLength = (breakEnd - breakStart) / 60000;
  
      await DataStore.save(
        ClockIns.copyOf(clockInData[0], updated => {
          updated.BreakEnd = timeOnly;
          updated.Break = false;
          
          updated.StaffBreak = parseFloat(breakLength);
        })
      );
  
      // Add a new message to indicate that the staff member has ended their break
      await DataStore.save(
        new Messages({
          content: `${staff.Name} ended break`,
          email: staff.Email,
          createdAt: format(new Date(), 'HH:mm:ss.SSS'),
          group: ['Staff', 'Team Leader', 'Admin', 'Developer']
          // Add any other necessary fields here...
        })
      );
  
      console.log(`${staff.Name} ended break`);
      window.location.reload();
    } else {
      // If the staff member is not on break, update the BreakStart time and Break status
      await DataStore.save(
        ClockIns.copyOf(clockInData[0], updated => {
          updated.BreakStart = timeOnly;
          updated.Break = true;
        })
      );
  
      // Add a new message to indicate that the staff member has started their break
      await DataStore.save(
        new Messages({
          content: `${staff.Name} started break`,
          email: staff.Email,
          createdAt: format(new Date(), 'HH:mm:ss.SSS'),
          group: ['Staff', 'Team Leader', 'Admin', 'Developer']
          // Add any other necessary fields here...
        })
      );
  
      console.log(`${staff.Name} started break`);
      window.location.reload();
    }
    setIsLoading(false);
    navigate("/clockin") // Set loading to false after all operations have completed

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
<div className='fixed top-0 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto'>
  <Modal show={show} setShow={setShow} message={messages[messages.length - 1]} />
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
{isLoading ? (
         <div className="flex items-center space-x-2">
        <img
          src="/versa.gif"
          alt=""
          className="w-12 h-12 object-cover rounded-full animate-spin" // Adjust the size with w-12 and h-12, add animate-spin for spinning animation
        />
        <p>Loading</p>
      </div>
    
      ) : (

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
)}
</div>
</div>
  );
}