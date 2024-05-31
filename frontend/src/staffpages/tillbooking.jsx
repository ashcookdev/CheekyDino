import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import TableSelect from './TableSelect';
import { format, addHours, set } from 'date-fns';
import SessionBooker from './sessionbooker';
import StaffCalenderParty from './PartyStaffCalendar';
import StaffTill from './StaffTill';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Full from './full';
import { subMinutes } from 'date-fns';



// check if running in electron environment

let ipcRenderer = null;
if (window && window.process && window.process.type) {
  ipcRenderer = window.require('electron').ipcRenderer;
}





export default function SessionBook() {
  const [children, setChildren] = useState(0);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [availableTables, setAvailableTables] = useState([]);
  const [truee, setTrue] = useState(false)
  const [details, setDetails] = useState({})
  const [staff, setStaff] = useState("")
  const [previousName, setPreviousName] = useState(name);
  const [previousEmail, setPreviousEmail] = useState(email);
  const [previousNumber, setPreviousNumber] = useState(number);
  const [previousChildren, setPreviousChildren] = useState(children);
  const [previousAdults, setPreviousAdults] = useState(adults);
  const [previousDate, setPreviousDate] = useState(date);
  const [previousAge, setPreviousAge] = useState(age);
  const [previousStaff, setPreviousStaff] = useState(staff);
  const [sessions, setSessions] = useState([]);
const [selectedSession, setSelectedSession] = useState(null);
const [menu, setMenu] = useState(false);
const [alert, setAlert] = useState(false);
const [tableData, setTableData] = useState([]);
const [registration, setRegistration] = useState("");
const [previousRegistration, setPreviousRegistration] = useState(registration);

useEffect(() => {
  // Define the event handler
  const messageHandler = (event, data) => { // data is the second argument
    console.log('Message from server: ', data);
    
    // data should already be an object, no need to parse

    // Check the field and update the corresponding state variable
    switch (data.field) {
      case 'name':
        setName(data.value);
        break;
      case 'email':
        setEmail(data.value);
        break;
      case 'telephone':
        setNumber(data.value);
        break;
      case 'carReg':
        setRegistration(data.value);
        break;
      default:
        console.log(`Unknown field: ${data.field}`);
    }
  };

  // Listen for 'websocket-message' events
  ipcRenderer.on('websocket-message', messageHandler);

  // Clean up the event listener when the component is unmounted
  return () => {
    ipcRenderer.removeListener('websocket-message', messageHandler);
  };
}, []); // The empty array ensures this useEffect hook only runs once after the first render




console.log(email)


  const navigate = useNavigate();

 
  


useEffect(() => {
  const fetchAdminData = async () => {
    const adminData = await DataStore.query(Admin);

    setTableData(adminData[0].TableData);

  }

  fetchAdminData();

}, []);


const [childData, setChildData] = useState(Array.from({ length: 1 }, () => ({ childAge: '' }))); // Initialize with 1 child



  console.log(childData)


  const handleBack = () => {
    setName(previousName);
    setEmail(previousEmail);
    setNumber(previousNumber);
    setChildren(0);
    setAdults(0);
    setDate(previousDate);
    setAge(previousAge);
    setStaff(previousStaff);
    setTrue(false);
    setRegistration(previousRegistration)

    setChildData(Array.from({ length: 0 }, () => ({ childAge: '' }))); // Set to 0 children



  }



  
console.log(childData)

  const handleTableSelect = (selectedTables) => {
    // do nothing
  };


  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setPreviousChildren(value);

    // Reset childData and childAges when children change
    setChildData(Array.from({ length: 0 }, () => ({ childAge: '' }))); // Reset childData
  };
  

  useEffect(() => {
    // Update childData when the number of children or adults changes
    setChildData(
      Array.from({ length: children }, () => ({ childAge: '' }))
    );
  }, [children, adults]); // Trigger the effect when children or adults change
  
  
  console.log(children, adults, date)

  
  const handleNowSubmit = async () => {
    const ChildName = name;
  
    const calculatePrice = (childData, adults, children) => {
      let price = 0;
      childData.forEach((data) => {
        console.log(`Calculating price for child with age ${data.childAge}`); // Add this line

        if (data.childAge === "Under 1 year") {
          price += 3.0;
        } else if (data.childAge === "1-2 years old") {
          price += 8.0;
        } else if (data.childAge === "2+") {
          price += 9.0;
        } else if (data.childAge === "sibling") {
          price += 0;
        }
      });
      // Add an extra £2.00 for every adult if there are more adults than children
      console.log(adults)
      const additionalAdults = adults - children;
  
      if (additionalAdults > 0) {
        // Add £2.00 for each additional adult beyond the number of children
        price += additionalAdults * 2.0;
      }
  
      return price;
    };
  
    // get todays date
    const today = new Date();
    // format the current time
    const nowString = format(today, 'HH:mm');
  
    const dateString = today.toISOString().split('T')[0];
  
    const twoHoursLater = addHours(today, 2);

    // get the time 10 mins before the current time

    const tenMinsBefore = subMinutes(nowString, 10);




  
    // format the result as a string
    const twoHoursLaterString = format(twoHoursLater, 'HH:mm');
  
    console.log(twoHoursLaterString);
    console.log(nowString);
  
    // get all sessions for todays date
    const bookings = await DataStore.query(Sessions, c => c.Date.eq(dateString));
    console.log(bookings);

  
    // calculate total number of guests
    const guests = children + adults;

    let availableTablesForTimeslot = tableData.filter(table => {
      // check if table is already booked
      const isBooked = bookings.some(booking => {
        const { TimeslotFrom, TimeslotTo, Table, LeftCenter } = booking;
        const bookingStartTime = new Date(`1970-01-01T${TimeslotFrom}:00`);
        const tenMinsBeforeBooking = subMinutes(bookingStartTime, 10); // 10 minutes before the booking start time
        const currentTime = new Date();
    
        return (
          currentTime >= tenMinsBeforeBooking &&
          TimeslotTo > format(currentTime, 'HH:mm') &&
          Table === table.table && LeftCenter === false
        );
      });
      console.log(isBooked);
      return !isBooked;
    });
    
    console.log(availableTablesForTimeslot);

    const totalPrice = calculatePrice(childData, adults, children);
    
    // Check if the total price is not 0.00 before proceeding
    if (totalPrice !== 0.00) {
      setAvailableTables(availableTablesForTimeslot);
      setDetails({
        Name: ChildName,
        Email: email,
        Number: number,
        Children: children,
        Adults: adults,
        Date: date,
        TimeSlotFrom: nowString,
        TimeSlotTo: twoHoursLaterString,
        Telephone: number,
        Total: totalPrice,
        Staff: staff,
        CarReg: registration,
        ChildData: childData,
      });
  
      console.log(availableTablesForTimeslot);
      setTrue(true);
    } else {
      setAlert(true)
    }
  };
  
  
    
  const handleChildAgeChange = (index, value) => {
    console.log(`Child ${index} age changed to ${value}`);
  
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, childAge: value } : data))
    );
  
    // Log the updated childData state
    console.log(childData);
  };
  

  const handleSelectedChange = (value) => {
    console.log(value.StaffId)
    setStaff(value.StaffId)
  }





  useEffect(() => {
    const getSession = async () => {
      const models = await DataStore.query(Sessions);
      const filteredSessions = models.filter(session => session.Email === email);
      setSessions(filteredSessions);
    }
  
    getSession();
  }, [email]); // re-run the effect when `email` changes
  

  const AutoFill = () => {
    const session = sessions.find(session => session.id === selectedSession);
    if (session) {
      setName(session.Name);
      console.log(session.Name)
setNumber(session.Number);

      setChildren(session.Children);
      setChildData(Array.from({ length: session.Children }, () => ({ age: '' })));

      console.log(session.Children)
      setAdults(session.Adults);
      console.log(session.Adults)
    }

  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  



  

  // filter sessions for now or later using TimeSlotTo and TimeSlotFrom and Table 
  return (
    <div className="flex bg-white">
      {alert === true && (
         <div className="rounded-md bg-yellow-50 p-4">
         <div className="flex">
           <div className="flex-shrink-0">
             <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
           </div>
           <div className="ml-3">
             <h3 className="text-sm font-medium text-yellow-800">Price Cannot Be £0.00</h3>
             <div className="mt-2 text-sm text-yellow-700">
             <button onClick={() => setAlert(false)|| setChildren(0)}
        type="button"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
Okay      </button>             </div>
           </div>
         </div>
       </div>
       )}
     

      <div className="w-1/2 p-6 border">
        <Full/>
      <motion.button
        onClick={()=> navigate('/dashboard')}
        className=" top-4 left-4 p-2 border rounded-md bg-red-500 text-white hover:bg-red-900"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back
      </motion.button>
        <div className="mb-2">
          <StaffTill onSelectChange={handleSelectedChange} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value) || setPreviousEmail(e.target.value)}
            id="email"
            type="text"
            name="email"
            autoComplete='on'
            value={email}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></input>
        </div>

        <div className="mt-1">
          {sessions.length > 0 && (
            <select
              onChange={(e) => setSelectedSession(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option disabled defaultValue="">
                Select a session
              </option>
              {sessions.map((session, index) => (
                <option key={index} value={session.id}>
                  {session.Name} - {session.Adults} Adults, {session.Children} Children - {session.Date}
                </option>
              ))}
            </select>
          )}
          <p className="mt-1 text-sm text-gray-900 font-medium">Selected session: {selectedSession}</p>

          <motion.button
  onClick={AutoFill}
  className="mt-1 w-full inline-flex items-center justify-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-2 md:text-base md:px-4 shadow-md"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  AutoFill
</motion.button>

        </div>
  
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
          Adult Name
        </label>
        <input
          onChange={(e) => setName(e.target.value) || setPreviousName(e.target.value)}
          id="name"
          type="text"
          name="name"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          defaultValue={name}
          autoComplete='on'
        ></input>
      </div>
  
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-900">
          Telephone
        </label>
        <input
          onChange={(e) => setNumber(e.target.value) || setPreviousNumber(e.target.value)}
          id="number"
          type="text"
          name="number"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={number}
          autoComplete='on'
        ></input>
      </div>
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-900">
          Car Registration
        </label>
        <input
          onChange={(e) => setRegistration(e.target.value) || setPreviousRegistration(e.target.value)}
          id="reg"
          type="text"
          name="number"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={registration}
          autoComplete='on'
        ></input>
      </div>
  
      <div>
        <label htmlFor="adults" className="block text-sm font-medium text-gray-900">
          Number of Adults
        </label>
        <input
          onChange={(e) => setAdults(e.target.value) || setPreviousAdults(e.target.value)}
          id="adults"
          type="number"
          name="adults"
          min={0}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={adults}
          autoComplete='on'
        ></input>
      </div>
  
      <div>
        <label htmlFor="children" className="block text-sm font-medium text-gray-900">
          Number of Children
        </label>
        <input
            onChange={handleChildrenChange}
            id="children"
            type="number"
            name="children"
            min={0}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={children}
            autoComplete="on"
          />
      </div>
  
      <div>
        {childData.map((data, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`child-age-${index}`} className="block text-sm font-medium text-gray-900">
              Child's Age- Do Not Select Sibling First
            </label>
            <select
              onChange={(e) => handleChildAgeChange(index, e.target.value)}
              id={`child-age-${index}`}
              name={`child-age-${index}`}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                      <option value="">Select an age</option>

              <option value="Under 1 year">Under 1 year</option>
              <option value="1-2 years old">1-2 years old</option>
              {childData.length > 1 && <option value="sibling">sibling</option>}
              <option value="2+">2+</option>
            </select>
          </div>
        ))}
      </div>
  
      <div className="space-y-2">
          <motion.button
            type="submit"
            onClick={handleNowSubmit}
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book
          </motion.button>
        </div>
    </div>
  
    <motion.div 
  className="w-1/2 p-6 border"
  initial="hidden"
  animate="visible"
  variants={variants}
>
  {truee === true && (
    <TableSelect
      availableTables={availableTables}
      details={details}
      onSelect={handleTableSelect}
      handleBack={handleBack}
    />
  )}
</motion.div>
  </div>
  

              
    
     



          
    
  );
}
