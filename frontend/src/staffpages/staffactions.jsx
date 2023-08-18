

import React, { useState, useEffect } from 'react';
import { DataStore, Auth } from 'aws-amplify';
import { ClockIn } from './models';
import { ClockIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid';


export default function StaffActions() {

    const [clockedInStaff, setClockedInStaff] = useState([]);
    const [breakTime, setBreak] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchClockIn = async () => {
          const mail = await Auth.currentAuthenticatedUser();
          const userEmail = mail.attributes.email;
          setEmail(userEmail);
          const today = new Date();
          // get timezone offset
          
          const dateOnly = today.toISOString().split('T')[0];
          const clockIn = await DataStore.query(ClockIn);
          const filterClockIn = clockIn.filter(
            (c) =>
              c.StaffId === userEmail &&
              c.Date === dateOnly &&
              c.ClockedIn === true &&
              c.ClockedOut === false
          );
          console.log(filterClockIn);
          setClockedInStaff(filterClockIn.length > 0); // Update clockedIn state
        };
        fetchClockIn();
      }, []);
      

const handleClockIn = async () => {

    const mail = await Auth.currentAuthenticatedUser();
    const userEmail = mail.attributes.email;
    // get cognito user pool name
    const userPool = await Auth.currentUserPoolUser();
    const userPoolName = userPool.pool.username;
    // get cognito user pool role
    const userPoolRole = userPool.signInUserSession.accessToken.payload[
      'cognito:groups'
    ][0];

   

    const dateTime = new Date();
    // get timezone offset
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
        .toISOString()
        .split('T')[1]
        .split('Z')[0];
    const dateOnly = dateTime.toISOString().split('T')[0];



console.log(timeOnly);
    // Save the ClockIn time and StaffId in the DataStore
    await DataStore.save(
      new ClockIn({
        ClockIn: timeOnly,
        ClockedIn: true,
        StaffId: userEmail,
        Date: dateOnly,
        ClockedIn: true,
        ClockedOut: false,
        StaffRole: userPoolRole,
        StaffName: userPoolName,

        
      })
    );

    // Update the clockedIn state
    console.log('clocked in');
    setClockedInStaff(true);
  };

  
  const handleClockOut = async () => {

    console.log('working');
    const mail = await Auth.currentAuthenticatedUser();
    const userEmail = mail.attributes.email;
    // get cognito user pool name
    

   

    const dateTime = new Date();
    // get timezone offset
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
        .toISOString()
        .split('T')[1]
        .split('Z')[0];
    const dateOnly = dateTime.toISOString().split('T')[0];



console.log(timeOnly);
const clockIn = await DataStore.query(ClockIn);
const filterClockIn = clockIn.filter(
  (c) =>
    c.StaffId === userEmail &&
    c.Date === dateOnly &&
    c.ClockedIn === true &&
    c.ClockedOut === false
);

console.log(filterClockIn);
    // Save the ClockIn time and StaffId in the DataStore
  
    // Update the ClockOut time and ClockedOut status in the DataStore
    await DataStore.save(
      ClockIn.copyOf(filterClockIn[0], (updated) => {
        updated.ClockOut = timeOnly;
        updated.ClockedOut = true;
      })
    );
console.log('clocked out');
window.location.reload();
    // Update the clockedIn state
    setClockedInStaff(false);
  };


  const handleBreakStart = async () => {
    const mail = await Auth.currentAuthenticatedUser();
    const userEmail = mail.attributes.email;
    const dateTime = new Date();
    // get timezone offset
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
        .toISOString()
        .split('T')[1]
        .split('Z')[0];



    const dateOnly = dateTime.toISOString().split('T')[0];

    console.log(timeOnly);

    const clockIn = await DataStore.query(ClockIn);
    const filterClockIn = clockIn.filter(
      (c) =>
        c.StaffId === userEmail &&
        c.Date === dateOnly &&
        c.ClockedIn === true &&
        c.ClockedOut === false
    );
  
    // Update the BreakStart time and BreakStarted status in the DataStore
    await DataStore.save(
      ClockIn.copyOf(filterClockIn[0], (updated) => {
        updated.BreakStart = timeOnly;
        updated.Break = true;
      })
    );
  
    // Update the clockedIn state
    console.log('break started');
    setBreak(true);
  };
  
  const handleBreakEnd = async () => {
    const mail = await Auth.currentAuthenticatedUser();
    const userEmail = mail.attributes.email;
    
    const dateTime = new Date();
    // get timezone offset
    const timezoneOffset = dateTime.getTimezoneOffset() * 60000;
    const timeOnly = new Date(dateTime - timezoneOffset)
        .toISOString()
        .split('T')[1]
        .split('Z')[0];
        const dateOnly = dateTime.toISOString().split('T')[0];

    const clockIn = await DataStore.query(ClockIn);
    const filterClockIn = clockIn.filter(
      (c) =>
        c.StaffId === userEmail &&
        c.Date === dateOnly &&
        c.ClockedIn === true &&
        c.Break === true
    );
    console.log(filterClockIn);
    await DataStore.save(
      ClockIn.copyOf(filterClockIn[0], (updated) => {
        updated.BreakEnd = timeOnly;
        updated.Break = false;
      })
    );
    console.log('break ended');
    setBreak(false);
  };



   return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-5">
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        <p className="text-gray-700 mb-2">
            {email}
            </p>
        <div className="flex flex-col sm:flex-row justify-evenly py-4 sm:mr-2">
          {clockedInStaff ? (
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mb-2 sm:mb-0"
              onClick={handleClockOut}
            >
              <ClockIcon className="h-5 w-5 mr-2" /> Clock Out
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md mb-2 sm:mb-0"
              onClick={handleClockIn}
            >
              <ClockIcon className="h-5 w-5 mr-2" /> Clock In
            </button>
          )}
          {!breakTime ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
              onClick={handleBreakStart}
            >
              <SunIcon className="h-5 w-5 mr-2" /> Break
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
              onClick={handleBreakEnd}
            >
              <MoonIcon className="h-5 w-5 mr-2" /> Back From Break
            </button>
          )}
        </div>
      </div>
    </div>
    );
    };