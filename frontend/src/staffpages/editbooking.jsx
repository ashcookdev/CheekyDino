import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { format } from 'date-fns';
import SessionTill from './SessionTill';

export default function EditBooking() {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [childData, setChildData] = useState([]);
    const [numAdults, setNumAdults] = useState(0);
    const [pass, setPass] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchSessions = async () => {
            const sessionsData = await DataStore.query(Sessions);
            const date = new Date();
            const awsDate = format(date, 'yyyy-MM-dd');
            const todaysSessions = sessionsData.filter(session => session.Date === awsDate && session.Arrived === true && session.LeftCenter === false);
            setSessions(todaysSessions);
        };
        fetchSessions();
    }, []);

    const handleSelect = (event) => {
        setSelectedSession(event.target.value);
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

    const handleExactAgeChange = (index, value) => {
        const newData = [...childData];
        newData[index].exactAge = value;
        setChildData(newData);
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
        // add the total to the session and the extra children and adults
        const session = sessions.find(session => session.Name === selectedSession);
        const updatedSession = Sessions.copyOf(session, updated => {
            updated.TotalSpent += newTotal; // Add to existing total
            updated.Children += childData.length; // Add to existing children count
            updated.Adults += numAdults; // Add to existing adults count
        });
    
        try {
            await DataStore.save(updatedSession);
            console.log('Session updated successfully');
            setPass(true);
            setTotal(newTotal); // Update the total state variable
        } catch (error) {
            console.error('Error updating session:', error);
        }
    };
    
    
if (pass === true) {
    return (
        <SessionTill order= {"2 Hour Session"} total = {total} table= {selectedSession.Table} ChildName ={selectedSession.Name} />)
}

    
    

    return (
        <div className='mt-5'>
            <select onChange={handleSelect}>
                <option>Select a session</option>
                {sessions.map((session, index) => (
                    <option key={index} value={session.Name}>
                        {session.Name} - {session.TimeslotFrom} to {session.TimeslotTo}
                    </option>
                ))}
            </select>
            {selectedSession && (
                <div>
                    <p>Selected session: {selectedSession}</p>
                    <p>Number of children: {sessions.find(session => session.Name === selectedSession).Children}</p>
                    <p>Number of adults: {sessions.find(session => session.Name === selectedSession).Adults}</p>
                    <p>Table: {sessions.find(session => session.Name === selectedSession).Table}</p>
                    <p>Total: £{sessions.find(session => session.Name === selectedSession).TotalSpent.toFixed(2)} </p>
                    <div>
                        <label htmlFor="children" className="block text-sm font-medium leading-6 text-gray-900">
                            Extra Children
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChildrenChange}
                                type="number"
                                name="children"
                                id="children"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="1"
                                aria-describedby="children"
                            />
                        </div>
                        <label htmlFor="children" className="block text-sm font-medium leading-6 text-gray-900">
                            Extra Adults
                        </label>
                        <div className="mt-2">
                            <input 
                                type="number"
                                name="adults"
                                id="adults"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="1"
                                aria-describedby="adults"
                            />
                        </div>
                        {childData.map((data, index) => (
                            <div key={index}>
                                <div>
                                    <label htmlFor={`child-age-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                        Child's Age
                                    </label>
                                    <select
                                        onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                        id={`child-age-${index}`}
                                        name={`child-age-${index}`}
                                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="6 months and under">6 months and under</option>
                                        <option value="Under 1 year">under 1 year</option>
                                        <option value="1-2 years old">1-2 years old</option>
                                        <option value="sibling">sibling</option>
                                        <option value="2+">2+</option>
                                    </select>
                                </div>

                                {data.childAge === "2+" && (
                                    <div>
                                        <label htmlFor={`exact-age-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                            Exact Age
                                        </label>
                                        <input
                                            onChange={(e) => handleExactAgeChange(index, e.target.value)}
                                            id={`exact-age-${index}`}
                                            type="number"
                                            name={`exact-age-${index}`}
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        ></input>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                <button className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleConfirm} >
Confirm                </button>


            
                </div>
            )}
        </div>
    );
}
