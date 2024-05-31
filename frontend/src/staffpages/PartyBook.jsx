import React, { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { PartyBooking, Sessions } from '../models';
import { useNavigate } from 'react-router-dom';
import { format, addHours, parse } from 'date-fns';
import { Auth } from 'aws-amplify';

export default function NewComponent({ date, timeSlot, partyType }) {
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [character, setCharacter] = useState('Elsa');
    const [foodChoice, setFoodChoice] = useState('No Food');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const user = await Auth.currentAuthenticatedUser();
    const sub = user.attributes.sub;

    event.preventDefault();
    const selectedTimeSlotFood = addHours(parse(timeSlot, 'HH:mm', new Date()), 1.5);
  
    // add 2.5 hours to selected time slot
    const selectedTimeSlotWithOffset = addHours(parse(timeSlot, 'HH:mm', new Date()), 2.5);
  
    const bookings = await DataStore.query(Sessions, (c) => c.Date.eq(date));
    const occupiedTables = bookings.filter(
      (booking) => booking.TimeslotFrom < selectedTimeSlotWithOffset && booking.TimeslotTo > timeSlot
    );
    let recommendedTable;
    if (occupiedTables.some((booking) => booking.Table === 40)) {
      if (!occupiedTables.some((booking) => booking.Table === 41)) {
        recommendedTable = 41;
      } else if (!occupiedTables.some((booking) => booking.Table === 42)) {
        recommendedTable = 42;
      } else {
        // All party tables are occupied
        recommendedTable = null;
      }
    } else {
      recommendedTable = 40;
    }
    console.log(recommendedTable);
  
    let basePrice;
    let childPrice;
    if (partyType === 'Laser') {
      basePrice = 190;
      childPrice = 19.95;
    } else if (partyType === 'T-Rex') {
      basePrice = 145;
      childPrice = 14.50;
    } else if (partyType === 'Character') {
      basePrice = 290;
      childPrice = 19.95;
    } else if (partyType === 'Teddy') {
      basePrice = 215;
      childPrice = 19.95;
    } else if (partyType === 'Football') {
      basePrice = 290;
      childPrice = 19.95;
    } else if (partyType === 'Disco') {
      basePrice = 290;
      childPrice = 19.95;
    }
  
    let totalPrice = basePrice;
  
    if (numberOfChildren > 10) {
      totalPrice += (numberOfChildren - 10) * childPrice;
    }

    const ageNumber = parseInt(age);
    const children = parseInt(numberOfChildren);
  
    
  // Save the booking information to the DataStore
  await DataStore.save(
  new PartyBooking({
  PartyDate: date,
  PartyTime: timeSlot,
  PartyType: partyType,
  NoOfChildren: children,
  PartyFinish : format(selectedTimeSlotWithOffset, 'HH:mm'),
  Email: email,
  Telephone: telephone,
  PartyFoodTime: format(selectedTimeSlotFood, 'HH:mm'),
  ChildName: name,
  TotalPrice: totalPrice,
  ChildAge: ageNumber,
  Character: partyType === 'Character' ? character : null,
  Total:totalPrice,
  FoodOptionSelected: foodChoice,
  partybookingID: sub

  })
  );
  const sessionBook = await DataStore.save(
  new Sessions({
  Name: name,
  Email: email,
  Telephone: telephone,
  Date: date,
  TimeslotFrom: timeSlot,
  TimeslotTo: format(selectedTimeSlotWithOffset, 'HH:mm'),
  Table : recommendedTable ,
  Orders: 0,
  TotalSpent: 0,
  Adults: 0,
  Children: children,
  Arrived: false,
  LeftCenter: false,
  ExtraTables: 0,
  Prepaid: false,
  })
  );
  window.location.reload();
  // Navigate to the /partyhistory page
  navigate('/partyhistory');
  };
  

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 border-2 ">
      <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-blue-700">
        Back to Dashboard
      </button>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Booking Details</h2>
        <p className="mt-4 text-gray-600">
          Date: {date} - Time Slot: {timeSlot} - Party Type: {partyType}
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="number-of-children" className="block text-sm font-medium text-gray-700">
                Number of Children
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="number-of-children"
                  name="number-of-children"
                  value={numberOfChildren}
                  onChange={(event) => setNumberOfChildren(event.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                Telephone
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={telephone}
                  onChange={(event) => setTelephone(event.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
                <label htmlFor="character" className="block text-sm font-medium text-gray-700">
                  Food Choice
                </label>
                <div className="mt-1">
                  <select
                    id="foodChoice"
                    name="foodChoice"
                    value={foodChoice}
                    onChange={(event) => setFoodChoice(event.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>Hot Food</option>
                    <option>Cold Food</option>
                    <option>Pizza Buffet</option>
                  </select>
                </div>
              
        
          </div>
            {partyType === 'Character' && (
              <div>
                <label htmlFor="character" className="block text-sm font-medium text-gray-700">
                  Character
                </label>
                <div className="mt-1">
                  <select
                    id="character"
                    name="character"
                    value={character}
                    onChange={(event) => setCharacter(event.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option>Elsa</option>
                    <option>Spiderman</option>
                    <option>Batman</option>
                    <option>Belle</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
