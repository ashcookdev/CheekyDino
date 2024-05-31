import { Sessions, Admin } from '../models';
import { useNavigate } from 'react-router-dom';
import tableData from './TableData.json';
import { format } from 'date-fns';
import emailjs from '@emailjs/browser';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';


export default function SessionCalender({ date, children, adults, email, telephone, name, staff, total, sessionID }) {
  const navigate = useNavigate();

  const [freeTablesPerTimeslot, setFreeTablesPerTimeslot] = useState([]);
  const [price, setPrice] = useState(0);

  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [timeslotsObject, setTimeslotsObject] = useState(null);
  const [tableData, setTableData] = useState(null);



  useEffect(() => {
    const fetchAvailability = async () => {
      console.log('Fetching availability data for date:', date);
  
      // find out what day the date is
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayIndex = new Date(date).getDay();
      const dayName = daysOfWeek[dayIndex];
      console.log(dayName);
  
      // Search DataStore for the dayName
      const adminData = await DataStore.query(Admin);
      const timeslots = adminData[0][dayName]; // assuming there's only one Admin object
      console.log('Admin data for the day:', timeslots);
  
      // Get tableData from the Admin model and update the state
      setTableData(adminData[0].TableData);
  
      // Set timeslotsObject state
      setTimeslotsObject(timeslots);
    };
  
    fetchAvailability();
  }, []);

  useEffect(() => {
    if (tableData && timeslotsObject) {
      const processTableData = async () => {
        const timeslotsArray = timeslotsObject.sessions;
        const allBookings = await DataStore.query(Sessions);
        const bookingsForDate = allBookings.filter(booking => booking.Date === date);
  
        console.log('Query result:', bookingsForDate);
        const totalGuests = Number(children) + Number(adults);
  
        const freeTablesPerTimeslot = timeslotsArray.map(timeslot => {
          let freeTables = tableData.filter(table => {
            if ([40, 41, 42].includes(table.table)) {
              return false;
            }
            const isTableBooked = bookingsForDate.some(booking => {
              return (
                booking.TimeslotFrom < timeslot.end &&
                booking.TimeslotTo > timeslot.start &&
                booking.Table === table.table
              );
            });
            return !isTableBooked;
          });
  
          let tablesMatchingCapacity = freeTables.filter(table => table.capacity === totalGuests);
  
          if (tablesMatchingCapacity.length === 0) {
            freeTables.sort((a, b) => b.capacity - a.capacity);
          } else {
            freeTables = tablesMatchingCapacity;
          }
  
          let recommendedTables = [];
          let remainingGuests = totalGuests;
          for (let i = 0; i < freeTables.length && remainingGuests > 0; i++) {
            recommendedTables.push(freeTables[i].table);
            remainingGuests -= freeTables[i].capacity;
          }
  
          return {
            timeslot,
            freeTables: freeTables.length,
            recommendedTables
          };
        });
  
        setFreeTablesPerTimeslot(freeTablesPerTimeslot);
  
        freeTablesPerTimeslot.forEach(item => {
          console.log(`Timeslot: ${item.timeslot.start} - ${item.timeslot.end}, Free Tables: ${item.freeTables}, Recommended Tables: ${item.recommendedTables}`);
        });
      };
  
      processTableData();
    }
  }, [tableData, timeslotsObject]);
  

  async function handleBook(item) {
    setLoading(true);
  
    const createUniqueID = () => {
      return Math.random().toString(36).substr(2, 9);
    };
  
    const bookingID = createUniqueID();
  
    const existingBooking = await DataStore.query(Sessions, sessionID);
  
    const emailData = {
      email: email,
      name: name,
      date: date,
      timeslot: `${item.timeslot.start} - ${item.timeslot.end}`,
      table: item.recommendedTables[0],
      telephone: telephone,
      adults: adults,
      children: children,
      bookingID: bookingID,
      totalSpent: total.toFixed(2),
      childData: "Amended Booking",
    }
  
    const response = await fetch('https://ebaedr0fmd.execute-api.eu-west-2.amazonaws.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
  
    // Create a new instance of the model with the updated properties
    const updatedBooking = Sessions.copyOf(existingBooking, updated => {
      updated.TimeslotFrom = item.timeslot.start;
      updated.TimeslotTo = item.timeslot.end;
      updated.Date = date;
    });
  
    await DataStore.save(updatedBooking);
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
  
      setTimeout(() => {
        setCompleted(true);
        setLoading(false);
      }, 3000);
    } else {
      console.error('There was an error!', response.status);
    }
  }
  
  

  if (completed === true) {
    navigate('/till')
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-lg font-semibold leading-6 text-gray-900">{date}</p>
        <p className="text-center font-bold">Select A Timeslot</p>
        <p className="text-center font-bold">Party Size: {Number(adults) + Number(children)} </p>
        <p className="text-center font-bold">Name: {name} </p>
        <p className="text-center font-bold">Total Spent: £{total.toFixed(2)}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freeTablesPerTimeslot.map(item => (
                <div
                key={item.timeslot.start}
                className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                >
                <p className="text-center font-bold">{item.timeslot.start} - {item.timeslot.end}</p>
                <p className="text-center">Free Tables: {item.freeTables}</p>
                <p className="text-center">Recommended Table: {item.recommendedTables.join(', ')}</p>
                <button
                    className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                    onClick={() => handleBook(item)}
                >
                    Book
                </button>
                </div>
            ))}
        </div>
        </motion.div>
    </div>
    );
}

