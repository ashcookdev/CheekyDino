import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



//

export default function SessionCalender({ date, children, adults, childData, email, telephone, name, staff, price }) {

  const navigate = useNavigate();

  const [freeTablesPerTimeslot, setFreeTablesPerTimeslot] = useState([]);

  

    console.log(childData[0].TotalSpent.toFixed(2))
  console.log(name)

  //get email from auth


  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);



  


  

  // need to get the date from the session booker page
  // need to get the number of children from the session booker page
  // need to get the number of adults from the session booker page
  // need to get the child data from the session booker page



    // Fetch availability data
      

    

    

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
    
    // Handle booking
    async function handleBook(item) {
      // Add a state for the loader
    
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
    
      // Set loading to true before the fetch
      setLoading(true);
    
      const response = await fetch('https://ebaedr0fmd.execute-api.eu-west-2.amazonaws.com/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
    
      // Set loading to false after the fetch

      const childDataJSON = JSON.stringify(childData);

    
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
          ChildData: childDataJSON,

          Arrived: false,
          LeftCenter: false,
          ExtraTables: item.recommendedTables.length > 2 ? item.recommendedTables[1].table : null,
          Prepaid: false,
          Age: childData.map(item => item.ChildAge),
          Telephone: telephone,
          TotalSpent:Number(price),
          CustomerbookingID: bookingID,
          Staff: staff,
          EntranceFee:Number(price)
        })
      );
    
      if (response.ok) {
        const data = await response.json();
        console.log(data);
    
        // set a timer to redirect to the till page
        setTimeout(() => {
          setCompleted(true);
          setLoading(false);

        }, 3000); // 2000ms = 2 seconds
      } else {
        console.error('There was an error!', response.status);
      }
    }



    if (completed === true) {
      navigate('/till')
    }


    
  // Display available timeslots with "Book" button
    // Display available timeslots with "Book" button
    return (
      <div>
      {loading && <p>Loading...</p>
    }

      <motion.div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-lg font-semibold leading-6 text-gray-900">{date}</p>
        <p className="text-center font-bold">Select A Timeslot</p>
        <p className="text-center font-bold">Party Size: {Number(adults) + Number(children)} </p>
        <p className="text-center font-bold">Name: {name} </p>
        <p className="text-center font-bold">Total Spent: £{price.toFixed(2)}</p>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {freeTablesPerTimeslot.map(item => (
            <motion.div key={item.timeslot.start} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className={`text-sm font-semibold leading-6 ${item.freeTables > 0 ? 'text-green-600' : 'text-red-600'}`}>{item.timeslot.start} - {item.timeslot.end}</p>
              <div className="relative mt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold leading-6 text-gray-900">Free Tables</p>
                  <p className="text-sm font-semibold leading-6 text-gray-900">{item.freeTables}</p>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div style={{ width: `${(1 - item.freeTables / tableData.length) * 100}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.freeTables > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>
              <button onClick={() => handleBook(item)} className="mt-4 w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-blue-600">Book</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    );
  }
       
      



// now we need to filter the timeslots based on the availability data








  
    // Handle timeslot selection
    
  
    