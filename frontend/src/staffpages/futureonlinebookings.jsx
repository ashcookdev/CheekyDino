import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Sessions } from "../models";
import { format, differenceInMinutes, parse, addMinutes, addDays } from "date-fns";
import { PlusIcon } from '@heroicons/react/20/solid';
import NextDaySession from "./nextdaysession";
import TableSlots from "./tableslots";
import { useNavigate } from "react-router-dom";
import BookingDetails from "./BookingDetails";
import { set } from "lodash";
import MessagesComponent from "./custsendmessage";

export default function FutureOnlineBookings() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [showPasswordInputs, setShowPasswordInputs] = useState({});
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [showComponent, setShowComponent] = useState(false);
    const [date, setDate] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [show, setShow] = useState(false);
    const [truth, setTrue] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const sessionsData = await DataStore.query(Sessions);
            const currentTime = format(new Date(), 'HH:mm');
            const currentTimeMinus30 = format(addMinutes(new Date(), -120), 'HH:mm');
            const today = format(new Date(), 'yyyy-MM-dd');

            let futureBookings = sessionsData.filter(session =>
                session.TimeslotFrom > currentTimeMinus30 &&
                session.Date === today &&
                session.Arrived === false
            );

            futureBookings.sort((a, b) => {
                const timeTillSessionA = differenceInMinutes(parse(a.TimeslotFrom, 'HH:mm', new Date()), new Date());
                const timeTillSessionB = differenceInMinutes(parse(b.TimeslotFrom, 'HH:mm', new Date()), new Date());
                return timeTillSessionA - timeTillSessionB;
            });

            setSessions(futureBookings);
        } catch (error) {
            console.error("Error fetching sessions", error);
        }
    };

    const handleArrivedClick = async (session) => {
      // setState 
      setSelectedSession(session)
      setTrue(true)

  }

  if (truth === true) {
      return <BookingDetails session={selectedSession} />
  }

    const handleDeleteClick = (session, event) => {
        event.preventDefault();
        event.stopPropagation();

        setSelectedSession(session);
        setShowPasswordInputs(prevState => ({ ...prevState, [session.id]: true }));
    };

    const handleConfirmClick = async () => {
        if (enteredPassword === 'password') {
            try {
                await DataStore.delete(selectedSession);
                console.log('Session deleted successfully');
                fetchSessions();
            } catch (error) {
                console.error('Error deleting session', error);
            }
            setShowPasswordInputs(prevState => ({ ...prevState, [selectedSession.id]: false }));
            setEnteredPassword('');
        } else {
window.location.reload();        }
    };

    const handleNextDayClick = () => {
        const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
        setStartDate(tomorrow);
        setShowComponent(true);
    };

    const handleSpace = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        setDate(today);
        setShowNew(true);
    };

    if (showComponent) {
        return <NextDaySession startDate={startDate} />;
    }

    if (showNew) {
        return <TableSlots date={date} />;
    }

    const handleMessageClick = (session, event) => {
        event.preventDefault();
        event.stopPropagation();

        setMessage(session.Email);
        setShowMessage(true);
    }

    if (showMessage) {
        return <MessagesComponent reply={message} />;
    }


    return (
        <div>
            <div className="flex justify-between items-center">
                <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShow(true)}>
                    Show All
                </button>
                {show && <button className="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShow(false)}>
                    Hide All
                </button>}
                <button onClick={handleNextDayClick} type="button" className="rounded-full bg-orange-600 ml-3 mr-3 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button onClick={handleSpace} className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Space</button>
                <button onClick={() => navigate("/branchsettings")} className="bg-indigo-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Session Manager</button>
            </div>

            {sessions.length === 0 && <p className="text-center mt-5 text-lg">No future bookings</p>}

            {show &&
                <ul role="list" className="divide-y divide-gray-100 mt-5">
                    {sessions.map((session) => {
                        const timeTillSession = differenceInMinutes(parse(session.TimeslotFrom, 'HH:mm', new Date()), new Date());
                        const isLate = timeTillSession < 0;
                        return (
                            <li key={session.id} className="flex mt-5 flex-col justify-between gap-y-4 py-5 px-4 rounded-lg bg-blue-100 shadow-lg">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <p className="text-md font-bold leading-6 text-gray-900">{session.Name}</p>
                                        <p className="mt-1 text-md font-semibold leading-5 text-black">{session.Email}</p>
                                        <p className="mt-1 text-md font-semibold leading-5 text-black">{session.Children} Children</p>
                                        <p className="mt-1 text-md font-semibold leading-5 text-black">{session.Adults} Adults</p>
                                        <p className="mt-1 text-md font-semibold leading-5 text-black">{session.Telephone}</p>
                                        <p className="mt-1 text-md font-semibold leading-5 text-black">Booked At Table {session.Table}</p>
                                        <p className="mt-1 text-md font-semibold leading-5 text-black">Total: £ {session.TotalSpent}</p>
                                        {session.ChildData && session.ChildData.length > 0 && (
    <div>
        {session.ChildData.map((child, index) => (
            <p key={index} className="mt-1 text-md font-semibold leading-5 text-black">
                Child Age: {child.childAge}
            </p>
        ))}
    </div>
)}
                                    </div>
                                    <div className={`flex items-center justify-center h-20 w-20 rounded-full ${isLate ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
                                        <span className="text-white">{isLate ? 'Late' : `${timeTillSession} Mins`}</span>
                                    </div>
                                </div>
                                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleArrivedClick(session)}>
                                    Arrived
                                </button>
                               
                                <button className="mt-4 bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate(`/editbooking`)}>
                                    Edit
                                </button>
                                <button className="mt-4 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => handleDeleteClick(session, event)}>
                                    Cancel
                                </button>
                                <button className="mt-4 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => handleMessageClick(session, event)}>
                                    Send Message
                                </button>
                                {showPasswordInputs[session.id] && (
                                    <div>
                                        <input
                                            type="password"
                                            placeholder="Enter password"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={enteredPassword}
                                            onChange={(e) => setEnteredPassword(e.target.value)}
                                        />
                                        <button onClick={handleConfirmClick}>
                                            Confirm
                                        </button>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <p className="text-md leading-5 text-gray-500">
                                        Date: {session.Date}
                                    </p>
                                    <p className="mt-1 text-xl font-bold leading-5 text-black">
                                        Timeslot: {session.TimeslotFrom} - {session.TimeslotTo}
                                    </p>
                                    <p className="mt-1 text-md font-semibold leading-5 text-black">
    Time Booked: {format(new Date(session.createdAt), 'dd-MM-yyyy HH:mm')}
</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
}
