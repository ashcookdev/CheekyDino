import React, { useState, useCallback, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { PartyBooking } from '../models';
import { eachDayOfInterval, subMonths, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PartyBook from './PartyBook';

export default function Booking() {
  const [partyType, setPartyType] = useState('T-Rex');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [availability, setAvailability] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysAvailability, setDaysAvailability] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [back, setBack] = useState(false);

  const navigate = useNavigate();

  if (back === true) {
    navigate('/dashboard')
  }



  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);


  const getPartyDetailsForDate = useCallback(async (date) => {
    // Query the DataStore for all records
    const bookings = await DataStore.query(PartyBooking);

    // Filter bookings by PartyDate
    const filteredBookings = bookings.filter((booking) => booking.PartyDate === date);

    // Define the maximum number of appointments per time slot
    const maxAppointments = 1;

    // Define the available time slots based on the selected party type
    let timeSlots;
    if (partyType === 'T-Rex' || partyType === 'Teddy') {
      timeSlots = ['09:30', '10:00', '10:30', '12:00', '12:30'];
    } else if (partyType === 'Character') {
      timeSlots = ['14:30'];
    } else if (partyType === 'Laser') {
      timeSlots = ['17:00'];
    } else if (partyType === 'Private Hire') {
      timeSlots = ['17:00'];
    } else if (partyType === 'Disco') {
      timeSlots = ['14:30'];
    } else if (partyType === 'Football') {
      timeSlots = ['14:30'];
    }


    // Create an array to store the availability information for each time slot
    let availability = [];

    // Check if the selected date is a valid day based on the selected party type
    const dayOfWeek = new Date(date).getDay();
    let isValidDay;
if (partyType === 'T-Rex' || partyType === 'Teddy') {
  isValidDay = dayOfWeek === 6 || dayOfWeek === 0;
} else if (partyType === 'Character' || partyType === 'Disco' || partyType === 'Football') {
  isValidDay = dayOfWeek === 6 || dayOfWeek === 0;
} else if (partyType === 'Laser') {
  isValidDay = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
} else if (partyType === 'Private Hire') {
  isValidDay = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
}


    if (isValidDay) {
      // Loop through each time slot
      timeSlots.forEach((timeSlot) => {
        // Filter bookings by PartyTime
        const bookingsForTimeSlot = filteredBookings.filter(
          (booking) => booking.PartyTime === timeSlot
        );

        // Calculate the number of available appointments for this time slot
        const availableAppointments = maxAppointments - bookingsForTimeSlot.length;

        // Add the availability information for this time slot to the array
        availability.push({
          timeSlot: timeSlot,
          availableAppointments: availableAppointments,
        });
      });
    }

    // Return the availability information for each time slot
    return availability;
  }, [partyType]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle form submission here
    setFormSubmitted(true);
  };

  // Function to handle previous month click
  const handlePrevMonthClick = () => {
    setCurrentDate((current) => subMonths(current, 1));
  };

  // Function to handle next month click
  const handleNextMonthClick = () => {
    setCurrentDate((current) => addMonths(current, 1));
  };

  // Function to handle today click
  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  // Function to handle day click
 // Function to handle day click
const handleDayClick = async (date) => {
  setSelectedDate(date);
  const availability = await getPartyDetailsForDate(date);
  setAvailability(availability);
};


  const getDaysAvailability = useCallback(async () => {
    const daysAvailability = await Promise.all(
      eachDayOfInterval({ start: startDate, end: endDate }).map(async (date) => {
        const availability = await getPartyDetailsForDate(date.toISOString().slice(0, 10));
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
    setDaysAvailability(daysAvailability);
  }, [startDate, endDate, getPartyDetailsForDate]);

  useEffect(() => {
    getDaysAvailability();
  }, [getDaysAvailability]);

  const handleBookAppointment = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  return selectedTimeSlot ? (
    <PartyBook date={selectedDate} timeSlot={selectedTimeSlot} partyType={partyType} />
  ) : formSubmitted ? (
    <div className="flex flex-col items-center">
      <button onClick={() => setBack(true)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button>
<div className="flex justify-center items-center mt-4">
  <button
    onClick={handlePrevMonthClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Prev Month
  </button>
  <button
    onClick={handleNextMonthClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
  >
    Next Month
  </button>
</div>
<div className="mt-4 flex-start">
  {availability.map((timeSlot) => (
    <div key={timeSlot.timeSlot} className="flex  justify-between items-center my-2">
      <span>{timeSlot.timeSlot}</span>
      <button
        onClick={() => handleBookAppointment(timeSlot.timeSlot)}
        className={`py-1 px-3 rounded ${
          timeSlot.availableAppointments > 0 ? 'bg-purple-500' : 'bg-red-500'
        }`}
      >
        {timeSlot.availableAppointments > 0 ? 'Book' : 'Not Available'}
      </button>
    </div>
  ))}
</div>

<div className="grid grid-cols-7 gap-4 mt-4">
  {daysAvailability.map((day) => (
    <div key={day.date} className="flex flex-col items-center">
      <button
        onClick={() => handleDayClick(day.date)}
        className={`w-full text-center py-2 rounded ${
          day.hasAvailableAppointments ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {new Date(day.date).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
        })}
      </button>
      <span className="text-xs mt-1">{day.hasAvailableAppointments ? 'Available' : 'Not Available'}</span>
    </div>
  ))}
</div>
</div>


  ) : (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Party Type</h2>
        <div>
          <select
            onChange={(event) => setPartyType(event.target.value)}
            id="party-type"
            name="party-type"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="T-Rex"
          >
            <option>T-Rex</option>
            <option>Character</option>
            <option>Disco</option>
            <option>Laser</option>
            <option>Football</option>
            <option>Teddy</option>

            <option>Private Hire</option>
          </select>
        </div>
        <button onClick={handleSubmit} type="submit" className="bg-purple-500 mt-5 text-white py-2 px-4 rounded">
          Next
        </button>
      </div>
    </div>
  );
}
