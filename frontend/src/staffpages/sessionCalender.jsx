import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import emailjs from '@emailjs/browser';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import { set } from 'lodash';




//

export default function SessionCalender({ date, children, adults, childData, email, telephone, name, staff, price }) {

  const navigate = useNavigate();

  const [freeTablesPerTimeslot, setFreeTablesPerTimeslot] = useState([]);

  
  let dateObj = new Date(date);

  let formattedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;

  console.log(childData)
  console.log(name)

  //get email from auth


  const [completed, setCompleted] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);


  
console.log(childData[0].name)


  // const timeslots = [

  //   { start: '09:30', end: '11:30' },
  //   { start: '10:00', end: '12:00' },
  //   { start: '10:30', end: '12:30' },
  //   { start: '11:00', end: '13:00' },
  //   { start: '11:30', end: '13:30' },
  //   { start: '12:00', end: '14:00' },
  //   { start: '12:30', end: '14:30' },
  //   { start: '13:00', end: '15:00' },
  //   { start: '13:30', end: '15:30' },
  //   { start: '14:00', end: '16:00' },
  //   { start: '14:30', end: '16:30' },
  //   { start: '15:00', end: '17:00' },
  //   { start: '15:30', end: '17:30' },
  // ];

  // need to get the date from the session booker page
  // need to get the number of children from the session booker page
  // need to get the number of adults from the session booker page
  // need to get the child data from the session booker page



    // Fetch availability data
      
// const handlePayment = async (item) => {

//   // create a Id for the booking 

//   const createUniqueID = () => {
//     return Math.random().toString(36).substr(2, 9);
//   };

//   const bookingID = createUniqueID();

//   // create a qr code for the booking


  

//   const data = {

//     id: bookingID,
//     email: email,
//     name: name,
//     date: date,
//     timeslot: `${item.timeslot.start} - ${item.timeslot.end}`,
//     table: item.recommendedTables[0],
//     telephone: telephone,
//     adults: adults,
//     children: children,
//     childData: childData,
//     totalSpent: childData[0].TotalSpent.toFixed(2),
//     staff: staff,
//   }


//   const paymentData = {
//     price: childData[0].TotalSpent.toFixed(2),
//     id: bookingID,
//     productName: "2 Hour Session" + " " + formattedDate + " " + item.timeslot.start + " - " + item.timeslot.end,
//   }
  
//   const response = await fetch('https://386f2wtkpf.execute-api.eu-west-2.amazonaws.com/test/payment', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(paymentData),
//   });

//   const responseData = await response.json();

//   let payment = responseData.body;
//   payment += '<script type="text/javascript">document.forms[0].submit();</script>';

//   setPaymentForm(payment); // Update the paymentForm state variable
//   setIsPayment(true); // Update the isPayment state variable
// }

// const [paymentForm, setPaymentForm] = useState(null);
// const [isPayment, setIsPayment] = useState(false);

// Define timeslotsObject as a state variable
const [timeslotsObject, setTimeslotsObject] = useState(null);

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



    
    // Handle booking
    async function handleBook(item) {


setLoading(true)


      const createUniqueID = () => {
        return Math.random().toString(36).substr(2, 9);
      };
    
      const bookingID = createUniqueID();

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
        totalSpent: price,
        childData: childData,
      
      }

      const response = await fetch('https://ebaedr0fmd.execute-api.eu-west-2.amazonaws.com/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    });

    // turn child data into a json object

    const childDataJSON = JSON.stringify(childData);

    console.log(childDataJSON)

    
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
          CustomerbookingID: bookingID,
          ExtraTables: item.recommendedTables.length > 2 ? item.recommendedTables[1].table : null,
          Prepaid: false,
ChildData: childData,          
Telephone: telephone,
          TotalSpent: price,
          Staff: staff,
          EntranceFee: price,
        })
      );
    
      // Redirect to /sessionbooking page
setCompleted(true) 
setLoading(false)   }

    if (completed === true) {
      navigate('/sessionbookings')

    }

    let totalSpent = childData[0].TotalSpent;

    
  // Display available timeslots with "Book" button
    // Display available timeslots with "Book" button
    return (
      // isPayment ? (
      //   <iframe srcDoc={paymentForm} style={{width: '100%', height: '600px'}}></iframe> // Render the iframe if isPayment is true
      // ) : (
      <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* {paymentForm && <iframe srcDoc={paymentForm} style={{width: '100%', height: '600px'}}></iframe>} Render the iframe conditionally */}
<button onClick={() => window.location.reload} className="mt-4 w-1/2 mb-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600">Back</button>

        <p className="text-lg font-semibold leading-6 text-gray-900 component-title">{formattedDate}</p>
        <p className="text-center font-bold component-title">Select A Timeslot</p>
        <p className="text-center font-bold component-title mt-2">Party Size: {Number(adults) + Number(children)} </p>
        <p className="text-center font-bold component-title mt-2">Name: {name} </p>
          <p className="text-center font-bold component-title mt-2">Total Spent:£ {price.toFixed(2)} </p>
      
          {loading ? (
  <div>
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjlsdXN0eXFpemR2NzByOTVtMzZsMHNxZnAxMmRrZDV5OWEyYm5meCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WiIuC6fAOoXD2/giphy.gif" alt="loading" />





  </div> // Replace this with your loading screen
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {freeTablesPerTimeslot.map((item, index) => (
      <motion.div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        <p className={`text-sm font-semibold leading-6 ${item.freeTables > 0 ? 'text-green-600' : 'text-red-600'}`}>{item.timeslot.start} - {item.timeslot.end}</p>
        <div className="relative mt-2">
          <div className="flex items-center justify-between">
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div style={{ width: `${(1 - item.freeTables / tableData.length) * 100}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.freeTables > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        </div>
        <button onClick={() => handleBook(item)} className="mt-4 w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-600">Pay Later</button>
        {/* <button onClick={() => handlePayment(item)} className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600">Pay Now</button> */}
      </motion.div>
    ))}
  </div>
)}




         </motion.div>
       )
     //);
   }
       
      



// now we need to filter the timeslots based on the availability data








  
    // Handle timeslot selection
    
  
    