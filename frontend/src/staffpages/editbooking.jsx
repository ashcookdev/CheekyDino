import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { format } from 'date-fns';
import SessionTill from './SessionTill';
import EditCalenderTill from './editcalandertill';

export default function EditBooking() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
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

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        const sessionsData = await DataStore.query(Sessions);
        setSessions(sessionsData);
    };

    const handleSelect = (event) => {
        setSelectedSession(event.target.value);
    };

    const handleSearchInputChange = (event) => {
        setSearchDate(event.target.value);
    };

    const handleSearch = () => {
        const filteredSessions = sessions.filter(session => {
            const sessionDate = format(new Date(session.Date), 'yyyy-MM-dd');
            return sessionDate === searchDate;
        });
        setSessions(filteredSessions);
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
        const sessionToDelete = sessions.find(session => session.Name === selectedSession);

        try {
            await DataStore.delete(sessionToDelete);
            window.location.reload();
            setSessions(sessions.filter(session => session.Name !== selectedSession));
            setSelectedSession(null);
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
        const session = sessions.find(session => session.Name === selectedSession);
        const updatedSession = Sessions.copyOf(session, updated => {
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

    if (pass === true) {
        console.log(total);
        console.log(selectedSession.Table);
        console.log(tillInfo);
        return (
            <SessionTill order={"2 Hour Session"} total={total} table={tillInfo.Table} ChildName={tillInfo.Name} route={true} />
        );
    }

    if (newDate === true) {
        const children = sessions.find(session => session.Name === selectedSession).Children;
        const staff = sessions.find(session => session.Name === selectedSession).Staff;
        const adults = sessions.find(session => session.Name === selectedSession).Adults;
        const date = sessions.find(session => session.Name === selectedSession).Date;
        const email = sessions.find(session => session.Name === selectedSession).Email;
        const telephone = sessions.find(session => session.Name === selectedSession).Telephone;
        const name = sessions.find(session => session.Name === selectedSession).Name;
        const price = sessions.find(session => session.Name === selectedSession).TotalSpent;
        const sessionID = sessions.find(session => session.Name === selectedSession).id;

        

        return <EditCalenderTill children={children} staff={staff} adults={adults} date={date} childData={childData} email={email} telephone={telephone} name={name} total={price} sessionID={sessionID} />;
    }

    const ageOptions = [
        { label: "Under 1 year", value: "Under 1 year" },
        { label: "1-2 years old", value: "1-2 years old" },
        { label: "2+", value: "2+" },
        { label: "Sibling", value: "sibling" },
    ];

    return (
        <div className='mt-5'>
            
            <input
                type="date"
                value={searchDate}
                onChange={handleSearchInputChange}
            />
            <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSearch}>Search</button>
            <select onChange={handleSelect}>
                <option>Select a session</option>
                {sessions.map((session, index) => (
                    <option key={index} value={session.Name}>
                        {session.Name} - {session.TimeslotFrom} to {session.TimeslotTo}
                    </option>
                ))}
            </select>
            {selectedSession && (
    <div className='mx-auto p-6 mt-8 border-2 border-gray-300 shadow-lg rounded-md max-w-screen-lg bg-purple-100'>
        <p className='font-bold'>Selected session: {selectedSession}</p>
        <p className='mt-2'>Date: {sessions.find(session => session.Name === selectedSession).Date}</p>
        <p>Adults: {sessions.find(session => session.Name === selectedSession).Adults}</p>
        <p>Children: {sessions.find(session => session.Name === selectedSession).Children}</p>
        <p>Table: {sessions.find(session => session.Name === selectedSession).Table}</p>
        <p>Total spent: £{sessions.find(session => session.Name === selectedSession).TotalSpent}</p>
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
            {ageOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
))}
                    <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleAdultChildSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
}

