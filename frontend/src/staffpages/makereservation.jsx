import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditBooking from "./editbooking";
import SessionBooker from "./sessionbooker";
import StaffCalenderParty from './PartyStaffCalendar';

export default function MakeReservation() {

    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [next, setNext] = useState(false);
    const [drop, setDrop] = useState(false);
    const [partyBooking, setPartyBooking] = useState(false);

    if (showForm === true) {
        navigate ('/booknow')
    }
        
    

    if (partyBooking === true) {
        return (
          <StaffCalenderParty />
        )
      }

      if (next === true) {
navigate('/booklater')         
      }


      if (drop === true) {
        navigate('/editbooking')
      }
      



return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Make A Reservation
          </h2>
          <div>
<button            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
 onClick = {()=> setShowForm(true)}>Book For Now</button>

<button onClick={() => {setDrop(true)}}            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
 >Add to Booking/Delete Booking</button>
 

       
<button            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
 onClick = {()=> setPartyBooking(true)}>New Party Booking</button>

            <button onClick={() => {setNext(true)}}            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
 >Book For Later</button>

 </div>
        </div>
        </div>
        </div>
        
        )}


