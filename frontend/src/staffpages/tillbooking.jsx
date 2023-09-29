import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { DataStore } from 'aws-amplify';
import { Sessions, Staff } from './models';
import TableSelect from './TableSelect';
import { format, addHours, set } from 'date-fns';
import tableData from './TableData.json';
import SessionBooker from './sessionbooker';
import StaffCalenderParty from './PartyStaffCalendar';
import StaffTill from './StaffTill';



export default function SessionBook() {
  const [children, setChildren] = useState(1);
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





  const [childData, setChildData] = useState(
    Array.from({ length: children }, () => ({ namechildAge: '', exactAge: '' }))
  );

  const handleBack = () => {
    setName(previousName);
    setEmail(previousEmail);
    setNumber(previousNumber);
    setChildren(previousChildren);
    setAdults(previousAdults);
    setDate(previousDate);
    setAge(previousAge);
    setStaff(previousStaff);
    setTrue(false);


  }


  
console.log(childData)

  const handleTableSelect = (selectedTables) => {
    // do nothing
  };


  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setChildData(Array.from({ length: value }, () => ({ age: '' })));
    setPreviousChildren(value);
  };

  

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

  
  console.log(children, adults, date)

  

  const handleNowSubmit = async () => {
    const ChildName = name;
  
    const calculatePrice = (childData, adults, children) => {
      let price = 0;
      childData.forEach((data) => {
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
        const { TimeslotFrom, TimeslotTo, Table } = booking;
        return (
          TimeslotFrom < twoHoursLaterString &&
          TimeslotTo > nowString &&
          Table === table.table
        );
      });
      return !isBooked;
    });
  
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
      Total: calculatePrice(childData, adults, children),
      Staff: staff
    });
  
    console.log(availableTablesForTimeslot);
    setTrue(true);
  };

  
    
  const handleChildAgeChange = (index, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, childAge: value } : data))
    );
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

  

  // filter sessions for now or later using TimeSlotTo and TimeSlotFrom and Table 
  return (
    <div className="flex">
  <div className="w-1/2 border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            <div className="mt-6">
              <StaffTill onSelectChange={handleSelectedChange}/>  
            </div>

            <label
                htmlFor="Email"
                className="block text-lg font-large leading-6 text-gray-900"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)|| setPreviousEmail(e.target.value)}
                id="email"
                type='text'
                name="email"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"

              >

              </input>
            <div className='mt-3'>
            {sessions.length > 0 && (
  <select onChange={(e) => setSelectedSession(e.target.value)}>
  <option disabled selected value="">Select a session</option>
  {sessions.map((session, index) => (
    <option key={index} value={session.id}>
      {session.Name} - {session.Adults} Adults, {session.Children} Children - {session.Date}
    </option>
  ))}
</select>

)}
  <p>Selected session: {selectedSession}</p>


  <button
    onClick={AutoFill}
    className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  >
    AutoFill
  </button>
</div>
            <div>

            <label htmlFor="children" className="block text-lg font-large leading-6 text-gray-900">
Adult Name            </label>
            <input
              onChange={(e) => setName(e.target.value)|| setPreviousName(e.target.value)}
              id="name"
              type="text"
              name="name"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={name}
              ></input>
          </div>
            


            </div>
            <div>
          
              <label
                htmlFor="phone"
                className="block text-large font-large leading-6 text-gray-900"
              >
                Telephone
              </label>
              <input
                onChange={(e) => setNumber(e.target.value)|| setPreviousNumber(e.target.value)}
                id="number"
                type='text'
                name="number"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
value={number}
              >

              </input>
            </div>




          <div>
            <label htmlFor="children" className="block text-large font-large leading-6 text-gray-900">
              Number of Adults
            </label>
            <input
              onChange={(e) => setAdults(e.target.value)|| setPreviousAdults(e.target.value)}
              id="adults"
              type="number"
              name="adults"
              min={0}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
value={adults}            >

            </input>
          </div>

          <div>
            <label htmlFor="children" className="block text-large font-large leading-6 text-gray-900">
              Number of Children
            </label>
            <input
              onChange={handleChildrenChange}
              id="children"
              type="number"
              name="children"
              min={0}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
value={children}            ></input>
          </div>

          <div>



          {childData.map((data, index) => (
  <div key={index}>
    <div>
      <label htmlFor={`child-age-${index}`} className="block text-large font-large leading-6 text-gray-900">
        Child's Age- Do Not Select Sibling First
      </label>
      <select
        onChange={(e) => handleChildAgeChange(index, e.target.value)}
        id={`child-age-${index}`}
        name={`child-age-${index}`}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="6 months and under">6 months and under</option>
        <option value="Under 1 year">under 1 year</option>
        <option value="1-2 years old">1-2 years old</option>
        {childData.length > 1 && <option value="sibling">sibling</option>}
        <option value="2+">2+</option>
      </select>
    </div>
  </div>
))}
          </div>
         
          <button
            type="submit"
            onClick={handleNowSubmit}
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Book
          </button>
          </div>

        </div>
        <div className="w-1/2 border">
  {truee === true && (
    <TableSelect
      availableTables={availableTables}
      details={details}
      onSelect={handleTableSelect}
      handleBack={handleBack}
    />
  )}
</div>

</div>


              
    
     



          
    
  );
}
