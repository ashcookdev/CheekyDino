import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

// ...

export default function SessionCalender({ date, children, adults, name, age }) {

  const navigate = useNavigate();

  const [timeSlotAvailability, setTimeSlotAvailability] = useState([]);

  //get email from auth

  const [email, setEmail] = useState("");

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      setEmail(user.attributes.email);
    });
  }, []);



  console.log(timeSlotAvailability)

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

  const tablecapacity = [
    { table: 1, capacity: 2 },
    { table: 2, capacity: 2 },
    { table: 3, capacity: 2 },
    { table: 4, capacity: 2 },
    { table: 5, capacity: 2 },
    { table: 6, capacity: 2 },
    { table: 7, capacity: 2 },
    { table: 8, capacity: 2 },
    { table: 9, capacity: 2 },
    { table: 10, capacity: 2 },
    { table: 11, capacity: 4 },
    { table: 12, capacity: 4 },
    { table: 13, capacity: 4 },
    { table: 14, capacity: 4 },
    { table: 15, capacity: 4 },
    { table: 16, capacity: 4 },
    { table: 17, capacity: 4 },
    { table: 18, capacity: 4 },
    { table: 19, capacity: 4 },
    { table: 20, capacity: 4 },
    { table: 21, capacity: 4 },
    { table: 22, capacity: 4 },
    { table: 23, capacity: 4 },
    { table: 24, capacity: 4 },
    { table: 25, capacity: 4 },
    { table: 26, capacity: 4 },
    { table: 27, capacity: 4 },
    { table: 28, capacity: 4 },
    { table: 29, capacity: 4 },
    { table: 30, capacity: 4 },
    { table: 31, capacity: 4 },
  ];

  const [bookings, setBookings] = useState([]);
  const [availableCapacity, setAvailableCapacity] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);

  console.log(availableCapacity)
  console.log(availableTables)

  console.log(bookings)

    const GetBookingsForDate = async () => {
      const dateObject = new Date(date);
      const dateFormatted = dateObject.toISOString().split('T')[0];
    
      const bookings = await DataStore.query(Sessions, c => c.Date.eq(dateFormatted));
      console.log(bookings);
    
      // Update the bookings state variable
      setBookings(bookings);
    
      const tables = Array.from({ length: 35 }, (_, i) => i + 1);
    
      const timeslotAvailability = timeslots.map(timeslot => {
        const availableTablesForTimeslot = tables.filter(table => {
          return !bookings.some(booking => {
            const { TimeslotFrom, TimeslotTo, Table } = booking;
            return (
              TimeslotFrom < timeslot.end &&
              TimeslotTo > timeslot.start &&
              Table === table
            );
          });
        });
    
        return {
          ...timeslot,
          availableTables: availableTablesForTimeslot
        };
      });
    
setTimeSlotAvailability(timeslotAvailability);}

useEffect(() => {
    GetBookingsForDate();
  }, [date]);

  const handleConfirm = async timeslot => {
    // Find available table with enough capacity
    const availability = timeSlotAvailability.find(
      slot => slot.start === timeslot.start
    );
    const availableTables = availability ? availability.availableTables : [];
  
    // Calculate the total number of guests
    const totalGuests = parseInt(adults) + parseInt(children);
  
    // Assign tables based on the total number of guests
    let tables;
    if (totalGuests < 5 && totalGuests > 3) {
      // Assign a table with a capacity of 4
      const table = availableTables.find(table => {
        return tablecapacity.find(
          tableCapacity => tableCapacity.table === table && tableCapacity.capacity === 4
        );
      });
      tables = [table];
    } else if (totalGuests > 5) {
      // Assign multiple tables to accommodate all guests
      let remainingGuests = totalGuests;
      tables = [];
      for (const table of availableTables) {
        if (remainingGuests <= 0) break;
        const capacity = tablecapacity.find(
          tableCapacity => tableCapacity.table === table
        ).capacity;
        tables.push(table);
        remainingGuests -= capacity;
      }
    } else if (totalGuests === 2) {
      // Assign a table with a capacity of 2
      const table = availableTables.find(table => {
        return tablecapacity.find(
          tableCapacity => tableCapacity.table === table && tableCapacity.capacity === 2
        );
      });
      tables = [table];
    }
  
    // Save new booking to DataStore
    if (tables && tables.length > 0) {
      const dateObject = new Date(date);
      const dateFormatted = dateObject.toISOString().split('T')[0];
  
      try {
        for (const table of tables) {
          const newBooking = await DataStore.save(
            new Sessions({
              Name: name,
              Email: email,
              TimeslotFrom: timeslot.start,
              TimeslotTo: timeslot.end,
              Date: dateFormatted,
              Table: table,
              Adults: parseInt(adults),
              Children: parseInt(children),
              Age: age,
              Arrived: true,
            })
          );
          console.log(newBooking);
          navigate('/sessionbookings');

        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('No tables available');
      navigate('/session');
    }
  };
  

  return (
    <div className="flex flex-col space-y-4">
      {timeslots.map(timeslot => {
        const availability = timeSlotAvailability.find(
          slot => slot.start === timeslot.start
        );
        const availableTables = availability ? availability.availableTables : [];
        if (availableTables.length === 0) return null;
        return (
          <div
            key={timeslot.start}
            className="flex items-center justify-between p-4 bg-white rounded shadow"
          >
            <h3 className="text-lg font-medium">
              {timeslot.start} - {timeslot.end}
            </h3>
            <button
              onClick={() => handleConfirm(timeslot)}
              className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Confirm
            </button>
          </div>
        );
      })}
    </div>
  );
    }  