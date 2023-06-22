import { Fragment, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { addMonths, set, subMonths } from 'date-fns'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, startOfWeek, endOfWeek } from 'date-fns'
import { useState } from 'react'
import { DataStore, Predicates } from 'aws-amplify'
import { PartyBooking } from '../../staffpages/models'
import { useNavigate } from 'react-router-dom'// ...
import { useCallback } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemedCalender() {

const details = [{
  name: "T-Rex",
  price: 145,
  description: "T-Rex Party",
}]

  


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
        partyid: details,

      },
    });
  };
  


  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
        <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime={format(currentDate, 'yyyy-MM-dd')} className="sm:hidden">
              {format(currentDate, 'MMM d, yyyy')}
            </time>
            <time dateTime={format(currentDate, 'yyyy-MM-dd')} className="hidden sm:inline">
              {format(currentDate, 'MMMM d, yyyy')}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">{format(currentDate, 'EEEE')}</p>        </div>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <div
              className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
              aria-hidden="true"
            />
          </div>
          </div>


           
      </header>
      <div className="flex flex-auto">
      <div className='hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block'>
{selectedPartyDetails && (
  <div className="p-4 border rounded-lg mb-4">
    
    <h2 className="text-lg font-bold">{selectedDate}</h2>
    {selectedPartyDetails.map(timeSlot => (
      // Only display a card if there are available appointments for this time slot
      timeSlot.availableAppointments > 0 && (
        <div key={timeSlot.timeSlot}>
          <h3>{timeSlot.timeSlot}</h3>
          <p>Available Party Time: {timeSlot.availableAppointments}</p>
          <button         className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
 onClick={() => handleBookAppointment(timeSlot.timeSlot)}>
            Book appointment
          </button>
        </div>
      )
    ))}
  </div>
)}
</div>
</div>



      



            <div ref={containerOffset} className="flex flex-auto flex-col min-h-0">
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
          <div className="flex items-center text-center text-gray-900">
            <button onClick={handlePrevMonthClick}
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">{format(currentDate, 'MMMM yyyy')}</div>            
            <button onClick={handleNextMonthClick}
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {daysAvailability.map((day, dayIdx) => (  <button
    key={day.date}
    onClick={() => handleDayClick(day.date)}
    type="button"
    className={classNames(
      'py-1.5 hover:bg-gray-100 focus:z-10',
      day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
      (day.isSelected || day.isToday) && 'font-bold',
      day.isSelected && 'text-white',
      !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
      !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
      day.isToday && !day.isSelected && 'bg-white-500', // Add this line to change the background color of today's date to blue
      day.isToday && !day.isSelected && 'text-white animate-pulse',
      day.hasAvailableAppointments && 'bg-green-500',
      !day.hasAvailableAppointments && 'bg-red-500', // Add this line to change the background color to red if there are no available appointments
      day.isPast && 'bg-red-500',
      dayIdx === 0 && 'rounded-tl-lg',
      dayIdx === 6 && 'rounded-tr-lg',
      dayIdx === days.length - 7 && 'rounded-bl-lg',
      dayIdx === days.length - 1 && 'rounded-br-lg'
    )}
  >
    <time
      dateTime={day.date}
      className={classNames(
        'mx-auto flex flex-col items-center justify-center rounded-full',
        day.isSelected && day.isToday && 'bg-indigo-600',
        day.isSelected && !day.isToday && 'bg-gray-900'
      )}
    >
      <span className="text-xs font-semibold">{format(new Date(day.date), 'E')}</span>
      <span className="mt-1 text-sm">{day.date.split('-').pop().replace(/^0/, '')}</span>
    </time>
  </button>
))}

          </div>
        </div>
      </div>
    </div>

    )
    }



    //const maxAppointments = 1;
  
    // Define the available time slots
    // const timeSlots = ['09:30', '10:00', '10:30', '12:00', '12:30'];
  