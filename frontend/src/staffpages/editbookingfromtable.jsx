import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { format } from 'date-fns';
import SessionTill from './SessionTill';
import EditCalenderTill from './editcalandertill';
import { useLocation } from 'react-router-dom';


export default function EditBooking() {
    const [sessionData, setSessionData] = useState([]);
    const [childData, setChildData] = useState([]);
    const [numAdults, setNumAdults] = useState(0);
    const [pass, setPass] = useState(false);
    const [total, setTotal] = useState(0);
    const [tillInfo, setTillInfo] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [newDate, setNewDate] = useState(false);
    const [showDateInput, setShowDateInput] = useState(false);
    const [showAdultChildInput, setShowAdultChildInput] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);

   
const location = useLocation();
const selectedSession = location.state.till;

console.log(selectedSession)

useEffect(() => {
  if (selectedSession) {
    fetchSessionData(selectedSession);
  }
}, [selectedSession]);

const fetchSessionData = async (selectedSession) => {
  try {
    let session = await DataStore.query(Sessions);
    session = session.filter(s => s.id === selectedSession.id);
    setSessionData(session[0]);
  } catch (error) {
    console.error('Error fetching session data:', error);
  }
};

    const handleChildrenChange = (event) => {
        const numChildren = event.target.value;
        setChildData(Array.from({ length: numChildren }, () => ({ childAge: '', exactAge: '' })));
    };

    const handleChildAgeChange = (index, value) => {
        const newData = [...childData];
        newData[index].childAge = value;
        setChildData(newData);
    };

    const handleDelete = async () => {
        try {
            await DataStore.delete(Sessions, sessionData.id);
            setPass(true);
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    const calculatePrice = (childData, adults, children) => {
        let price = 0;
        if (childData) {
            childData.forEach((data) => {
                if (data && data.childAge) {
                    if (data.childAge === "Under 1 year") {
                        price += 3.0;
                    } else if (data.childAge === "1-2 years old") {
                        price += 8.0;
                    } else if (data.childAge === "2+") {
                        price += 9.0;
                    } else if (data.childAge === "sibling") {
                        price += 0;
                    }
                }
            });
        }
        const additionalAdults = adults - children;
        if (additionalAdults > 0) {
            price += additionalAdults * 2.0;
        }
        return price;
    };

    const handleConfirm = async () => {
        const newTotal = calculatePrice(childData, numAdults);
        console.log(`Total price: £${newTotal.toFixed(2)}`);
        const updatedSession = Sessions.copyOf(sessionData, updated => {
            updated.TotalSpent += newTotal;
            updated.Children += childData.length;
            updated.Adults += numAdults;
        });

        try {
            await DataStore.save(updatedSession);
            console.log('Session updated successfully');
            setPass(true);
            setTotal(newTotal);
        } catch (error) {
            console.error('Error updating session:', error);
        }
        setTillInfo(updatedSession);
    };


    const handleDate = () => {
        setShowDateInput(true);
    };

    const handleAdultChildChange = () => {
        setShowAdultChildInput(true);
        setShowConfirmButton(true);
    };

    const handleDateInputChange = (event) => {
        setSearchDate(event.target.value);
    };

    const handleDateSubmit = () => {
        setShowDateInput(false);
        setNewDate(true);
    };

    const handleAdultChildSubmit = () => {
        setShowAdultChildInput(false);

        // Logic to update adults and children
    };

    if (pass) {
        return (
            <SessionTill order={"2 Hour Session"} total={total} table={sessionData.Table} ChildName={sessionData.Name} route={true} />
        );
    }

    if (newDate) {
        return (
            <EditCalenderTill
                children={sessionData.Children}
                staff={sessionData.Staff}
                adults={sessionData.Adults}
                date={sessionData.Date}
                childData={childData}
                email={sessionData.Email}
                telephone={sessionData.Telephone}
                name={sessionData.Name}
                total={sessionData.TotalSpent}
                sessionID={sessionData.id}
            />
        );
    }

    return (
        <div className='mt-5'>
            {sessionData && (
                <div className='mx-auto p-6 mt-8 border-2 border-gray-300 shadow-lg rounded-md max-w-screen-lg bg-purple-100'>
                    <p className='mt-2'>Date: {sessionData.Date}</p>
                    <p>Name: {sessionData.Name}</p>
                    <p>Adults: {sessionData.Adults}</p>
                    <p>Children: {sessionData.Children}</p>
                    <p>Table: {sessionData.Table}</p>
                    <p>Total spent: £{sessionData.TotalSpent}</p>
                    <div className="flex flex-wrap justify-between mt-4">
                        <button className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDelete}>Delete</button>
                        <button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDate}>Change Date</button>
                        <button className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleAdultChildChange}>Change Adults/Children</button>
                        {showConfirmButton && (
                            <button className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 animate-pulse focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleConfirm}>Confirm</button>
                        )}
                    </div>
                </div>
            )}

            {showDateInput && (
                <div className='mt-5'>
                    <input
                        type="date"
                        value={searchDate}
                        onChange={handleDateInputChange}
                    />
                    <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleDateSubmit}>Submit</button>
                </div>
            )}
            {showAdultChildInput && (
                <div className='mt-5'>
                    <input
                        type="number"
                        placeholder="Number of adults"
                        onChange={event => setNumAdults(parseInt(event.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Number of children"
                        onChange={handleChildrenChange}
                    />

                    {childData.map((child, index) => (
                        <div key={index}>
                            <select
                                value={child.childAge}
                                onChange={event => handleChildAgeChange(index, event.target.value)}
                            >
                                <option value="">Select Age</option>
                                <option value="Under 1 year">Under 1 year</option>
                                <option value="1-2 years old">1-2 years old</option>
                                <option value="2+">2+</option>
                                <option value="sibling">Sibling</option>
                            </select>
                        </div>
                    ))}
                    <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleAdultChildSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
}

