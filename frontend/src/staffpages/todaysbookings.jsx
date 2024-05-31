import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import {format} from 'date-fns';
import SessionHistory from './sessionhistory';

//{ date, children, adults, childData }

export default function SessionCalender() {


  const [freeTablesPerTimeslot, setFreeTablesPerTimeslot] = useState([]);
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState(date.toISOString().substr(0, 10));
  const [totalGuests, setTotalGuests] = useState(0);
  const [session, setSession] = useState(false);
  const [totalGuestsPerTimeslot, setTotalGuestsPerTimeslot] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [timeslots, setTimeslots] = useState([]);


useEffect(() => {
  const fetchAdminData = async () => {
    const adminData = await DataStore.query(Admin);
    const tableData = adminData[0].TableData;
    setTableData(tableData);

    // get current date
    const date = new Date();
    const awsDate = format(date, 'yyyy-MM-dd');
    // get the day of the week
    const day = format(date, 'EEEE');

    console.log(day)

    // search Admin for the day of the week
    const dayData = adminData[0][day];

    console.log(dayData.sessions)

    setTimeslots(dayData.sessions);



  };

  fetchAdminData();

}, []);



  console.log(freeTablesPerTimeslot)

  useEffect(() => {
    const FetchAvailability = async () => {
      let date = format(new Date(), 'yyyy-MM-dd');
      
      console.log('Fetching availability data for date:', date);
      const bookings = await DataStore.query(Sessions, c => c.Date.eq(date));
      console.log('Query result:', bookings);

       // Calculate total number of guests
  const totalGuests = bookings.reduce((acc, booking) => {
    const {Adults, Children} = booking;
    acc += Adults + Children;
    return acc;
  }, 0);

  // Update state with total number of guests
  setTotalGuests(totalGuests);
    
      // Calculate free tables per timeslot
      const freeTablesPerTimeslot = timeslots.map(timeslot => {
        let occupiedTablesCount = bookings.reduce((acc, booking) => {
          const {TimeslotFrom, TimeslotTo, Table, ExtraTables} = booking;
          let value = ExtraTables;
          if (ExtraTables === null) {
            value = 0;
          } else if (typeof value === 'number') {
            value = 1;
          }
          // use timeslot to show how many tables are available
          if (
            TimeslotFrom < timeslot.end &&
            TimeslotTo > timeslot.start

          ) {
            acc += 1;
            if (ExtraTables) {
              acc += value ;
            }
          }
          return acc;
        }, 0);
    
        let freeTablesCount = tableData.length - occupiedTablesCount;
    
        return {
          timeslot,
          freeTables: freeTablesCount,
        };
      });
    
      setFreeTablesPerTimeslot(freeTablesPerTimeslot);

      
    
      // Log free tables per timeslot
      freeTablesPerTimeslot.forEach(item => {
        console.log(`Timeslot: ${item.timeslot.start} - ${item.timeslot.end}, Free Tables: ${item.freeTables}`);
      });
    };

    const FetchGuests = async () => {
    let date = format(new Date(), 'yyyy-MM-dd');
  
    console.log('Fetching availability data for date:', date);
    const bookings = await DataStore.query(Sessions, c => c.Date.eq(date));
    console.log('Query result:', bookings);
    
    const totalGuestsPerTimeslot = timeslots.map(timeslot => {
      let totalGuests = bookings.reduce((acc, booking) => {
        const {TimeslotFrom, TimeslotTo, Adults, Children} = booking;
        // use timeslot to show how many guests are present
        if (
          TimeslotFrom < timeslot.end &&
          TimeslotTo > timeslot.start
        ) {
          acc += Adults + Children;
        }
        return acc;
      }, 0);
  
      return {
        timeslot,
        totalGuests,
      };
    });
  
    // Update state with total guests per timeslot
    setTotalGuestsPerTimeslot(totalGuestsPerTimeslot);
  
    // Log total guests per timeslot
    totalGuestsPerTimeslot.forEach(item => {
      console.log(`Timeslot: ${item.timeslot.start} - ${item.timeslot.end}, Total Guests: ${item.totalGuests}`);
    });
  };
  
    
    
    
  FetchGuests();
    FetchAvailability();
    FetchGuests();
  }, [date, timeslots, tableData])

  
  
    if (session === true) {
      return (<SessionHistory />)
    }

  
  

  const totalCapacity = tableData.reduce((acc, table) => acc + table.capacity, 0);


  return (
    <>
       <div className="md:flex md:items-center md:justify-between mt-10">
       <button 
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
      onClick={() => {
       window.location.reload();}

      }
    >
      Back
    </button>
       <button onClick={() => setSession(true)}
                  type="button"
                  className="mt-8 w-1/8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                  Show Details
                  </button>
      
    </div>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
     
        {freeTablesPerTimeslot.map((item, index) => (
          <li key={item.timeslot.start} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className={`text-sm font-semibold leading-6 ${item.freeTables > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.timeslot.start} - {item.timeslot.end}
                </p>
                <p className="text-sm font-semibold leading-6 text-gray-900 mt-1">
                  Occupied Tables: {item.freeTables}/{tableData.length}
                </p>
                <p className="text-sm font-italic leading-6 text-gray-900 mt-1">
                  Including Party Tables 36,37,38
                </p>
                <p className="text-sm font-semibold leading-6 text-gray-900 mt-1">
                 Total Guests: {totalGuestsPerTimeslot[index].totalGuests}/{totalCapacity}
                </p>
                <div className="relative mt-2">
                  <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${(1 - item.freeTables / tableData.length) * 100}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.freeTables > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                  </div>
                
                  
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}  
      



// now we need to filter the timeslots based on the availability data








  
    // Handle timeslot selection
    
  
    