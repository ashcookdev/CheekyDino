import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import tableData from './TableData.json';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function SessionCalender({ date }) {
  const [freeTables, setFreeTables] = useState({});

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

  useEffect(() => {
    const fetchAvailability = async () => {
      console.log('Fetching availability data for date:', date);
      const allBookings = await DataStore.query(Sessions);
      const bookingsForDate = allBookings.filter(booking => booking.Date === date);
      console.log('Query result:', bookingsForDate);

      const freeTablesData = {};

      timeslots.forEach(timeslot => {
        const totalGuests = { '2': 0, '4+': 0 };

        let freeTables = tableData.filter(table => ![40, 41, 42].includes(table.table));
        freeTables = freeTables.filter(table => {
          const isTableBooked = bookingsForDate.some(booking => {
            return (
              booking.TimeslotFrom < timeslot.end &&
              booking.TimeslotTo > timeslot.start &&
              booking.Table === table.table
            );
          });
          return !isTableBooked;
        });

        freeTables.forEach(table => {
          if (table.capacity === 2) {
            totalGuests['2']++;
          } else if (table.capacity >= 4) {
            totalGuests['4+']++;
          }
        });

        freeTablesData[timeslot.start] = totalGuests;
      });

      setFreeTables(freeTablesData);
    };

    fetchAvailability();
  }, [date]);

  const getTableColor = (numFreeTables) => {
    if (numFreeTables > 10) {
      return 'bg-green-500';
    } else if (numFreeTables >= 5 && numFreeTables <= 10) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  return (
    <div>
        <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=> window.location.reload()}>
Back        </button>

      <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-lg font-semibold leading-6 text-gray-900">{format(new Date(date), 'EEEE, MMMM d, yyyy')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {timeslots.map(timeslot => (
            <motion.div key={timeslot.start} className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${getTableColor(freeTables[timeslot.start]?.['2'] || 0)}`}>
              <p className="text-sm font-semibold leading-6">{timeslot.start} - {timeslot.end}</p>
              <div className="mt-2">
                <p className="text-sm font-semibold leading-6">Free Tables for 2: {freeTables[timeslot.start]?.['2'] || 0}</p>
                <p className="text-sm font-semibold leading-6">Free Tables for 4+: {freeTables[timeslot.start]?.['4+'] || 0}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
