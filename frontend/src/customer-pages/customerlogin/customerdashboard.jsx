import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {DataStore} from '@aws-amplify/datastore';
import { PartyBooking, Sessions } from '../../staffpages/models';
import PartyGuests  from './PartyGuests'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { parse, format, addHours } from 'date-fns';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


export default function CustomerDashboard() {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [noOfChildren, setNoOfChildren] = useState('');
  const [foodOptionSelected, setFoodOptionSelected] = useState('');
const [telephone, setTelephone] = useState('');
    const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.attributes.sub;
    const email = user.attributes.email;
console.log(userId);
// add 2.5 hours to selected time slot
    const selectedTimeSlotWithOffset = addHours(parse(selectedTimeSlot, 'HH:mm', new Date()), 2.5);
    console.log(selectedTimeSlotWithOffset);
    const selectedTimeSlotFood = addHours(parse(selectedTimeSlot, 'HH:mm', new Date()), 1.5);

    
    

    const basePrice = 290;
    const childPrice = 19;
    let totalPrice = basePrice;
  
    if (noOfChildren > 10) {
      totalPrice += (noOfChildren - 15) * childPrice;
    }
  
    try {
      const newBooking = await DataStore.save(
        new PartyBooking({
          Email : email,
          Telephone: telephone,
          ChildName: childName,
          ChildAge: childAge,
          NoOfChildren: noOfChildren,
          FoodOptionSelected: foodOptionSelected,
          PartyDate: selectedDate,
          PartyTime: selectedTimeSlot,
          PartyType: partyid[0].name,
          Total: totalPrice,
          partybookingID: userId,
          PartyFoodComplete: false,
          PartyFinish : format(selectedTimeSlotWithOffset, 'HH:mm'),
          PartyFoodTimeDue: format(selectedTimeSlotFood, 'HH:mm'),

        })
      );

      const sessionBook = await DataStore.save(
        new Sessions({
          Name: childName,
          Email: email,
          Telephone: telephone,
          Date: selectedDate,
          TimeslotFrom: selectedTimeSlot,
          TimeslotTo: format(selectedTimeSlotWithOffset, 'HH:mm'),
          Table : 40,
          Orders: 0,
          TotalSpent: 0,
          Adults: 0,
          Children: noOfChildren,
          Arrived: false,
          LeftCenter: false,
          ExtraTables: 0,
          Prepaid: false,
        })
      );

          


      console.log('New booking added:', newBooking);
        navigate('/my-booking', { state: { selectedDate, selectedTimeSlot, partyid } });
window.location.reload();

    } catch (error) {
      console.error('Error adding new booking:', error);
    }
  }
 

  
    const location = useLocation();
    const { selectedDate, selectedTimeSlot, partyid } = location.state;

    console.log(selectedDate);
    console.log(selectedTimeSlot);
    console.log(partyid);


    const backgroundImage= 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzZhYTBkZjVxbjlrd3dqb3IzeGJ2eHN3NWlkMHd2cGtqc3JwM3R3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4njbG9gEe2c5j2RIWD/giphy.gif';

    return (
      <div
        className="bg-cover bg-center py-24 sm:py-32"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Booking
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Continue with your booking
            </p>
            {selectedDate && (
              <p>Date: {selectedDate}</p>
            )}
            {selectedTimeSlot && (
              <p>Time Slot: {selectedTimeSlot}</p>
            )}
            {partyid && (
              <p>Party Type: {partyid[0].name}</p>
            )}
            {partyid && (
              <p>Price: {partyid[0].price}</p>
            )}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
             
              <input type="text"
              value = {telephone}
              onChange = {(e) => setTelephone(e.target.value)}
              placeholder = "Telephone"
              className = "w-full px-4 py-2 border border-gray-300 rounded-md"
              />


              
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Child Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={childAge}
                onChange={(e) => setChildAge(Number(e.target.value))}
                placeholder="Child Age"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
    
              <input
                type="number"
                value={noOfChildren}
                onChange={(e) => setNoOfChildren(Number(e.target.value))}
                placeholder="Number of Children"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <select
                value={foodOptionSelected}
                onChange={(e) => setFoodOptionSelected(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Food Option</option>
                <option value="Hot">Hot Food</option>
                <option value="Cold">Cold Food</option>
                <option value="Pizza">Pizza Buffet</option>

              </select>
    
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    );
            }