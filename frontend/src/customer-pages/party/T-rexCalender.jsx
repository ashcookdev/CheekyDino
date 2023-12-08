import { Fragment, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { addMonths, set, subMonths } from 'date-fns'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, startOfWeek, endOfWeek } from 'date-fns'
import { useState } from 'react'
import { DataStore, Predicates } from 'aws-amplify'
import { PartyBooking } from '../../models'
import { useNavigate } from 'react-router-dom'// ...
import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import '../customerfont.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemedCalender() {

  const details = [{
      name: "T-Rex",
     price: 145,
     description: "T-Rex Party",
    }]


  function getDetails() {
    setDetails(details);
  }


  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [partyid, setDetails] = useState();

  console.log(currentDate);

  const [selectedPartyDetails, setSelectedPartyDetails] = useState(null);
  const [click, setClick] = useState("");
  const [selectedTime, setSelectedTimeSlot] = useState("");
  const [daysAvailability, setDaysAvailability] = useState([]);

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);


  const navigate = useNavigate();

  //
  const handleDayClick = async date => {
    // Set the selected date
    setSelectedDate(date);

    // Retrieve the availability information for the selected date from your DataStore
    const availability = await getPartyDetailsForDate(date);

    // Update the state with the retrieved availability information
    setSelectedPartyDetails(availability);
  };


  // Function to retrieve party details for a given date from your DataStore
  const getPartyDetailsForDate = useCallback(async date => {
    // Query the DataStore for all records
    const bookings = await DataStore.query(PartyBooking);

    // Filter bookings by PartyDate
    const filteredBookings = bookings.filter(booking => booking.PartyDate === date);

    // Define the maximum number of appointments per time slot
    const maxAppointments = 1;

    // Define the available time slots
    const timeSlots = ['09:30', '10:00', '10:30', '12:00', '12:30'];

    // Create an array to store the availability information for each time slot
    let availability = [];

    // Check if the selected date is a Saturday or Sunday
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      // Loop through each time slot
      timeSlots.forEach(timeSlot => {
        // Filter bookings by PartyTime
        const bookingsForTimeSlot = filteredBookings.filter(booking => booking.PartyTime === timeSlot);

        // Calculate the number of available appointments for this time slot
        const availableAppointments = maxAppointments - bookingsForTimeSlot.length;

        // Add the availability information for this time slot to the array
        availability.push({
          timeSlot: timeSlot,
          availableAppointments: availableAppointments
        });
      });
    }

    // Return the availability information for each time slot
    return availability;
  }, []);



  const days = eachDayOfInterval({ start: startDate, end: endDate }).map(date => ({
    date: date.toISOString().slice(0, 10),
    isCurrentMonth: true,
    isToday: date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10),
  }))

  console.log(days);
  console.log(endDate);


  // Function to handle previous month click
  const handlePrevMonthClick = () => {
    setCurrentDate(current => subMonths(current, 1));
  };

  // Function to handle next month click
  const handleNextMonthClick = () => {
    setCurrentDate(current => addMonths(current, 1));
  };

  // Function to handle today click
  const handleTodayClick = () => {
    setCurrentDate(new Date());

  };



  useEffect(() => {
    console.log('selectedDate changed:', selectedDate);
    getDetails();
  }, [selectedDate]);


  const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate }).map(date => ({
    date: date.toISOString().slice(0, 10),
    dayOfWeek: format(date, 'E'),
  }))

  const getDaysAvailability = useCallback(async () => {
    const daysAvailability = await Promise.all(
      eachDayOfInterval({ start: startDate, end: endDate }).map(async (date) => {
        const availability = await getPartyDetailsForDate(date.toISOString().slice(0, 10));
        console.log('useCallback', date, availability); // Log the availability information for this date
        const hasAvailableAppointments = availability.some(
          (timeSlot) => timeSlot.availableAppointments > 0
        );
        const isPast = date < new Date();
        return {
          date: date.toISOString().slice(0, 10),
          isCurrentMonth: true,
          isToday: date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10),
          hasAvailableAppointments,
          isPast,
        };
      })
    );
    console.log('useEffect called'); // Log a message whenever the useEffect hook is called
    setDaysAvailability(daysAvailability);
  }, [startDate, endDate]);

  useEffect(() => {
    console.log('useEffect called'); // Log a message whenever the useEffect hook is called
    getDaysAvailability();
  }, [getDaysAvailability]);



  const handleBookAppointment = async timeSlot => {
    // Navigate to the Register page and pass the selected date, time slot, and party details as props
    navigate('/register', {
      state: {
        selectedDate,
        selectedTimeSlot: timeSlot,
        partyid: partyid,
      },
    });
  };

let imageURL = "https://media.giphy.com/media/4njbG9gEe2c5j2RIWD/giphy.gif"

  return (
    <div className="flex flex-col h-full">
      <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 component-title text-orange-500 text-center sm:truncate sm:text-3xl sm:tracking-tight">
          Pick Your Time
        </h2>
      </div>
      
    </div>
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
  <div className="flex items-center">
    <button
      onClick={handlePrevMonthClick}
      type="button"
      className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
    >
      <span className="sr-only">Previous month</span>
      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
  <h1 className="text-base font-semibold leading-6 text-center justify-center text-gray-900 ml-4">
    <time dateTime={format(currentDate, "yyyy-MM-dd")} className="sm:hidden">
      {format(currentDate, "MMMM d, yyyy")}
    </time>
    <time dateTime={format(currentDate, "yyyy-MM-dd")} className="hidden sm:inline">
      {format(currentDate, "MMMM d, yyyy")}
    </time>
  </h1> 
  <div className="flex items-center">
    <button
      onClick={handleNextMonthClick}
      type="button"
      className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
    >
      <span className="sr-only">Next month</span>
      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</header>
<section   className="bg-cover bg-center min-h-screen"

          style={{ backgroundImage: `url(${imageURL})` }}>
    
<div className="flex flex-auto justify-center">
        <div className="w-full max-w-md px-8 py-10 md:block">
          {selectedPartyDetails && (
            <div className="p-4 border rounded-lg mb-4 shadow-md">
              <h2 className="text-lg font-semi-bold text-center component-title mb-4">
                Date: {format(new Date(selectedDate), "dd/MM/yyyy")}
              </h2>
              {selectedPartyDetails.map((timeSlot) =>
                timeSlot.availableAppointments > 0 ? (
                  <div key={timeSlot.timeSlot} className="mb-4 p-4 border rounded-lg shadow-sm">
                    <h3 className="text-center component-title mb-2">Time: {timeSlot.timeSlot}</h3>
                    {partyid.map((party) => (
                      <div key={party.id} className="mb-2">
                        <p className="text-center component-title mb-1">Party: {party.name}</p>
                        <p className="text-center component-title mb-1">Price: £{party.price}</p>
                      </div>
                    ))}
                    <button
                      className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring focus-visible:ring-indigo-600 block mx-auto"
                      onClick={() => handleBookAppointment(timeSlot.timeSlot)}
                    >
                      Book Party
                    </button>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
  
          <div className="justify-center">
            <div className="flex flex-wrap justify-center">
              {daysAvailability.map((day) => {
                if (day.hasAvailableAppointments) {
                  return (
                    <button
                      key={day.date}
                      onClick={() => handleDayClick(day.date)}
                      className="m-2 px-4 py-2 bg-blue-500 text-white component-title rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                       {format(new Date(day.date), "EEEE, MMMM do, yyyy")}

                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </section>
          </div>


      
    );
    
              


  
              }

  




    //const maxAppointments = 1;
  
    // Define the available time slots
    // const timeSlots = ['09:30', '10:00', '10:30', '12:00', '12:30'];
  //    const timeSlots = ['09:30', '10:00', '10:30', '12:00', '12:30'];
  //

  
