import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import TableSelect from './TableSelect';
import { format, addHours, set } from 'date-fns';



export default function SessionBook() {
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [availableTables, setAvailableTables] = useState([]);
  const [truee, setTrue] = useState(false)
  const [details, setDetails] = useState({})


  const handleTableSelect = (selectedTables) => {
    // do nothing
  };
  
  if (truee === true) {
    return (
      <TableSelect
        availableTables={availableTables}
        details={details}
        onSelect={handleTableSelect}
      />
    );
  }
  



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

  console.log(children, adults, date)

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNowSubmit = async () => {
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
  
    let availableTablesForTimeslot = tablecapacity.filter(table => {
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
  
    // conditionally recommend tables based on the number of guests
    if (guests === 2) {
      availableTablesForTimeslot = availableTablesForTimeslot.filter(table => table.capacity === 2);
    } else if (guests > 2 && guests <= 4) {
      availableTablesForTimeslot = availableTablesForTimeslot.filter(table => table.capacity === 4);
      let recommendedTables = [];
      let remainingGuests = guests;
      availableTablesForTimeslot.sort((a, b) => b.capacity - a.capacity);
      while (remainingGuests > 0 && availableTablesForTimeslot.length > 0) {
        const table = availableTablesForTimeslot.shift();
        recommendedTables.push(table);
        remainingGuests -= table.capacity;
      }
      availableTablesForTimeslot = recommendedTables;
    }
    setAvailableTables(availableTablesForTimeslot);
    setDetails(
      {
        Name: name,
        Age: age,
        Email: email,
        Number: number,
        Children: children,
        Adults: adults,
        Date: date,
        TimeSlotFrom: nowString,
        TimeSlotTo: twoHoursLaterString,
        Telephone : number,

      }
    )
    console.log(availableTablesForTimeslot)
    setTrue(true)
  }
  






       







    // filter sessions for now or later using TimeSlotTo and TimeSlotFrom and Table 
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Book Your Session
          </h2>
          <div>
          <div>
            
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Childs Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              
            >
             
            </input>
          </div>
          <div>
            
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Childs Age
            </label>
            <input
              onChange={(e) => setAge(e.target.value)}
              id="name"
              type='number'
              name="name"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              
            >
             
            </input>
          </div>
          <div>
            
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type='text'
              name="email"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              
            >
             
            </input>
          </div>
          <div>
            
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Telephone
            </label>
            <input
              onChange={(e) => setNumber(e.target.value)}
              id="number"
              type='text'
              name="number"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              
            >
             
            </input>
          </div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of Children
            </label>
            <select
              onChange={(e) => setChildren(e.target.value)}
              id="children"
              name="children"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="1"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of Adults
            </label>
            <select
              onChange={(e) => setAdults(e.target.value)}
              id="adults"
              name="adults"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="1"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <DatePicker
              id="date"
              selected={date}
              onChange={(date) => setDate(date)}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
                <div>
        
                </div>


          <button
            type="submit"
            onClick={handleNowSubmit}
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Book for Now 
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Book for Later
          </button>
        </div>
      </div>
    </div>
  );
}
