import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditBooking from "./editbooking";
import SessionBooker from "./sessionbooker";
import StaffCalenderParty from './PartyStaffCalendar';
import { motion } from "framer-motion";


let ipcRenderer = null;
if (window && window.process && window.process.type) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

export default function MakeReservation() {
    const navigate = useNavigate();
   

   



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white py-24 sm:py-32 text-center">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
                        Make A Reservation
                    </h2>
                    <div>
                    <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={()=> navigate('/dashboard')}
                        >
                            Back
                        </motion.button>


                        <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
  onClick={() => {
    navigate('/booknow');
    if (ipcRenderer) {
      ipcRenderer.send('show-form');
    }
  }}
>
  Book For Now
</motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={()=> navigate('/editbooking')}
                        >
                            Add to Booking/Delete Booking
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={()=> navigate('/partybooking')}
                        >
                            New Party Booking
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={()=> navigate('/booklater')}
                        >
                            Book For Later
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
