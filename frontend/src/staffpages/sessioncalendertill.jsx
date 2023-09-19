import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { useNavigate } from 'react-router-dom';
import tableData from './TableData.json';
import { format } from 'date-fns';
import emailjs from '@emailjs/browser';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';



//

export default function SessionCalender({ date, children, adults, childData, email, telephone, name, staff }) {

  const navigate = useNavigate();

  const [freeTablesPerTimeslot, setFreeTablesPerTimeslot] = useState([]);

  

  console.log(childData)
  console.log(name)

  //get email from auth


  
console.log(childData[0].name)


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

  // need to get the date from the session booker page
  // need to get the number of children from the session booker page
  // need to get the number of adults from the session booker page
  // need to get the child data from the session booker page



    // Fetch availability data
      

    

    

useEffect(() => {
  const FetchAvailability = async () => {
    console.log('Fetching availability data for date:', date);
    const bookings = await DataStore.query(Sessions, c => c.Date.eq(date));
    console.log('Query result:', bookings);
    const guests = children + adults;

    // Calculate free tables per timeslot
   // Calculate free tables per timeslot
const freeTablesPerTimeslot = timeslots.map(timeslot => {
  let freeTables = tableData.filter(table => {
    // Exclude tables 40, 41, and 42
    if ([40, 41, 42].includes(table.table)) {
      return false;
    }
    const isBooked = bookings.some(booking => {
      const {TimeslotFrom, TimeslotTo, Table} = booking;
      // use timeslot to show how many tables are available
      return (
        TimeslotFrom < timeslot.end &&
        TimeslotTo > timeslot.start &&
        Table === table.table
      );
    });
    return !isBooked;
  });

  // Sort free tables by capacity in descending order
  freeTables.sort((a, b) => b.capacity - a.capacity);

  // Recommend multiple tables if needed
  let recommendedTables = [];
  let guestsLeft = guests;
  for (let i = 0; i < freeTables.length && guestsLeft > 0; i++) {
    recommendedTables.push(freeTables[i].table);
    guestsLeft -= freeTables[i].capacity;
  }

  return {
    timeslot,
    freeTables: freeTables.length,
    recommendedTables
  };
});


    setFreeTablesPerTimeslot(freeTablesPerTimeslot);

    // Log free tables and recommended tables per timeslot
    freeTablesPerTimeslot.forEach(item => {
      console.log(`Timeslot: ${item.timeslot.start} - ${item.timeslot.end}, Free Tables: ${item.freeTables}, Recommended Tables: ${item.recommendedTables}`);
    });
  };

  FetchAvailability();
}, []);

    // Handle booking
    async function handleBook(item) {
      const createUniqueID = () => {
        return Math.random().toString(36).substr(2, 9);
      };
    
      const bookingID = createUniqueID();
    
      // Generate QR code data URL
      const qrCodeDataUrl = await QRCode.toDataURL(bookingID);
    
      // Initialize EmailJS
      emailjs.init('IRmucExHqH7rKSEBW');
    
      const templateParams = {
        to_name: name,
        to_email: email,
        message: `Thank you for booking with us. Your booking details are as follows: Date: ${date} Time: ${item.timeslot.start} - ${item.timeslot.end} Table: ${item.recommendedTables[0]}. Please show this QR code to a member of staff when you arrive.`,  qrCodeDataUrl
      };
    
      emailjs.send('bookingscheekydino', 'bookings', templateParams)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        })
        .catch((err) => {
          console.log('FAILED...', err);
        });
    
      // Save booking information to DataStore
      DataStore.save(
        new Sessions({
          id: bookingID,
          Name: name,
          Date: date,
          TimeslotFrom: item.timeslot.start,
          TimeslotTo: item.timeslot.end,
          Table: item.recommendedTables[0],
          Email: email,
          Adults: Number(adults),
          Children: Number(children),
          Arrived: false,
          LeftCenter: false,
          ExtraTables: item.recommendedTables.length > 1 ? item.recommendedTables[1] : null,      
          Prepaid: false,
          Age: childData.map(item => item.ChildAge),
          Telephone: telephone,
          TotalSpent: childData.reduce((acc, item) => acc + parseFloat(item.TotalSpent), 0),
          Staff: staff,
        })
      );
    
      // Redirect to /sessionbooking page
      window.location.reload()
    }

    
  // Display available timeslots with "Book" button
    // Display available timeslots with "Book" button
    return (
      <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-lg font-semibold leading-6 text-gray-900">{date}</p>
        <p className="text-center font-bold">Select A Table</p>
        <p className="text-center font-bold">Party Size: {adults + children} </p>
        <p className="text-center font-bold">Name: {name} </p>
        {childData.map((item) => (
          <p className="text-center font-bold">Total Spent:£ {item.TotalSpent.toFixed(2)} </p>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {freeTablesPerTimeslot.map(item => (
            <motion.div key={item.timeslot.start} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className={`text-sm font-semibold leading-6 ${item.freeTables > 0 ? 'text-green-600' : 'text-red-600'}`}>{item.timeslot.start} - {item.timeslot.end}</p>
              <div className="relative mt-2">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div style={{ width: `${(1 - item.freeTables / tableData.length) * 100}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.freeTables > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
              <button onClick={() => handleBook(item)} className="mt-4 w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-600">Book</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
       
      



// now we need to filter the timeslots based on the availability data








  
    // Handle timeslot selection
    
  
    