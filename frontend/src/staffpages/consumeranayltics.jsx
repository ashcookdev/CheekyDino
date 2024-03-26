import { Sessions, CafeOrder } from '../models';
import { DataStore } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsumerAnalytics({ email }) {
    const [sessions, setSessions] = useState([]);
    const [cafeOrders, setCafeOrders] = useState([]);
    const [back, setBack] = useState(false);

    const navigate = useNavigate();

    if (back === true) {
        navigate('/dashboard', { replace: true });
    }


    useEffect(() => {
        async function fetchData() {
            const getAllSessions = await DataStore.query(Sessions);
            const filterSession = getAllSessions.filter(
                (c) =>
                    c.Email === email
            );
            setSessions(filterSession);

            const getAllCafeOrders = await DataStore.query(CafeOrder);
            const filterCafeOrders = getAllCafeOrders.filter(
                (c) =>
                    c.SessionEmail === email
            );
            setCafeOrders(filterCafeOrders);
        }

        fetchData();
    }, [email]);

    if (!cafeOrders) {
        return null;
    }

    // extract the required information from the returned data and display it in the component
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Customer Information</h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{sessions[0]?.Name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{sessions[0]?.Email}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Number of Sessions</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{sessions.length}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Number of Orders</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cafeOrders.length}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Favourite Hot Items</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cafeOrders.map(o => o.HotItems).flat().join(', ')}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Favourite Drink Items</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cafeOrders.map(o => o.DrinkItems).flat().join(', ')}</dd>
                    </div>
                </dl>
            </div>
            <button onClick={()=> {setBack(true)}} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Back
            </button>

        </div>
    );
}