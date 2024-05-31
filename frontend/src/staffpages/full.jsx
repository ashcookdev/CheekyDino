import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import tableData from './TableData.json';
import { format, addHours } from 'date-fns';

export default function SessionCalender() {
  const [currentTimeslotFreeTables, setCurrentTimeslotFreeTables] = useState(0);

  useEffect(() => {
    const fetchAvailability = async () => {
      const today = new Date();
      // format the current time
      const nowString = format(today, 'HH:mm');
      const dateString = today.toISOString().split('T')[0];
      const twoHoursLater = addHours(today, 2);
      // format the result as a string
      const twoHoursLaterString = format(twoHoursLater, 'HH:mm');

      // get all sessions for today's date
      const bookings = await DataStore.query(Sessions, c => c.Date.eq(dateString));

      let availableTablesForTimeslot = tableData.filter(table => {
        // check if table is already booked
        const isBooked = bookings.some(booking => {
          const { TimeslotFrom, TimeslotTo, Table, LeftCenter, Arrived } = booking;
          return (
            TimeslotFrom < twoHoursLaterString &&
            TimeslotTo > nowString &&
            Table === table.table
            
          );
        });
        return !isBooked;
      });

      setCurrentTimeslotFreeTables(availableTablesForTimeslot.length);
    };

    fetchAvailability();
  }, []);

  return (
    <div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-lg font-semibold leading-6 text-gray-900">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        <p className="text-lg font-semibold leading-6 text-gray-900">Current timeslot free tables: {currentTimeslotFreeTables}</p>
       
        
    </div>
  );
}
