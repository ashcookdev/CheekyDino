import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditBooking from "./editbooking";
import SessionBooker from "./sessionbooker";
import StaffCalenderParty from './PartyStaffCalendar';
import { motion } from "framer-motion";

export default function MakeReservation() {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [next, setNext] = useState(false);
    const [drop, setDrop] = useState(false);
    const [partyBooking, setPartyBooking] = useState(false);

    const handleBookNowClick = () => {
        setShowForm(true);
    };

    const handleAddToBookingClick = () => {
        setDrop(true);
    };

    const handleNewPartyBookingClick = () => {
        setPartyBooking(true);
    };

    const handleBookLaterClick = () => {
        setNext(true);
    };

    // Redirect based on state changes
    if (showForm) {
        navigate('/booknow');
        return null; // Prevent rendering while navigating
    }
    if (partyBooking) {
        return <StaffCalenderParty />;
    }
    if (next) {
        navigate('/booklater');
        return null; // Prevent rendering while navigating
    }
    if (drop) {
        navigate('/editbooking');
        return null; // Prevent rendering while navigating
    }

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
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={handleBookNowClick}
                        >
                            Book For Now
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={handleAddToBookingClick}
                        >
                            Add to Booking/Delete Booking
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={handleNewPartyBookingClick}
                        >
                            New Party Booking
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 rounded-lg shadow-md"
                            onClick={handleBookLaterClick}
                        >
                            Book For Later
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
