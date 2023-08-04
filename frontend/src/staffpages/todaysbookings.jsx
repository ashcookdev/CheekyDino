import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import tableData from './TableData.json';
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

  const timeslots = [

    { start: '09:30', end: '11:30' },
    { start: '10:00', end: '12:00' },
    { start: '10:30', end: '12:30' },
    { start: '11:00', end: '13:00' },
    { start: '11:30', end: '13:30' },
    { start: '12:00', end: '14:00' },
    { start: '12:30', end: '14:30' },
    { start: '13:00', end: '15:00' },
    { start: '13:30', end: '15:30' },
    { start: '14:00', end: '16:00' },
    { start: '14:30', end: '16:30' },
    { start: '15:00', end: '17:00' },
    { start: '15:30', end: '17:30' },
  ];

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
  }, [date])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputDate);

    let date = format(new Date(inputDate), 'yyyy-MM-dd');

      console.log('Fetching availability data for date:', date);
      const bookings = await DataStore.query(Sessions, c => c.Date.eq(date));
      console.log('Query result:', bookings);
  
      // Calculate free tables per timeslot
      const freeTablesPerTimeslot = timeslots.map(timeslot => {
        let freeTables = tableData.filter(table => {
          const isBooked = bookings.some(booking => {
            const {TimeslotFrom, TimeslotTo, Table} = booking;
            console.log('Booking:', booking);
            // use timeslot to show how many tables are available
            return (
              TimeslotFrom < timeslot.end &&
              TimeslotTo > timeslot.start &&
              Table === table.table
            );
          });
          return !isBooked;
        });
  
        return {
          timeslot,
          freeTables: freeTables.length,
        };
      });
  
      setFreeTablesPerTimeslot(freeTablesPerTimeslot);
  
      // Log free tables per timeslot
      freeTablesPerTimeslot.forEach(item => {
        console.log(`Timeslot: ${item.timeslot.start} - ${item.timeslot.end}, Free Tables: ${item.freeTables}`);
      });
    };
  
    if (session === true) {
      return (<SessionHistory />)
    }

  
  

  const totalCapacity = tableData.reduce((acc, table) => acc + table.capacity, 0);


  return (
    <>
       <div className="md:flex md:items-center md:justify-between mt-10">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center">
          Select a Date
        </h2>
        <form onSubmit={handleSubmit} className="flex justify-center mt-4">
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
      <button onClick={() => setSession(true)}
                  type="button"
                  className="mt-8 w-1/2 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                  Show All
                  </button>
    </div>
      <ul role="list" className="divide-y divide-gray-100 mt-4">
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
    
  
    