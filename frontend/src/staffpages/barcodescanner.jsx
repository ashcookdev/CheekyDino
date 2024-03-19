import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from '../models';
import OrderDetails from './BookingDetails';
import { useNavigate } from 'react-router-dom';
import { CogIcon } from '@heroicons/react/20/solid';

export default function Qrscanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [back, setBack] = useState(false);

  const navigate = useNavigate();

  if (back) {
    navigate('/dashboard');
  }

  let timeoutId = null;

  const getDetails = async (value) => {
    setIsLoading(true);

    try {
      // Get current date
      const today = new Date().toISOString().slice(0, 10);
      // Query sessions
      const sessions = await DataStore.query(Sessions);
      // Filter sessions based on conditions
      const filteredSessions = sessions.filter(s =>
        s.CustomerbookingID.includes(value) && // Check if CustomerbookingID contains the value
        s.Date === today && // Check if the Date is today
        s.Arrived === false // Check if Arrived is false
      );

      if (filteredSessions.length > 0) {
        setSession(filteredSessions[0]);
      } else {
        console.log("No session found for today with this search value:", value);
        alert("No session preBooked for today with this search value", value);
      }
    } catch (error) {
      console.error("Error querying DataStore:", error);
    }

    setIsLoading(false);
  }

  const handleScan = (e) => {
    const { value } = e.target;
    if (value) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        getDetails(value);
      }, 3000);
    } else {
      console.log("No value to search for");
    }
  }

  return (
    <>
      <div>
        <button 
          type="button"
          className="inline-flex mb-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none mr-5"
          onClick={() => setBack(true)}
        >
          Back
        </button>
        <button 
          type="button"
          className="inline mr-5 -flex mb-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-red-700 focus:outline-none"
          onClick={() => navigate('/entry')}
        >
          Manual Entry
        </button>

        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Scan QR Code"
          onChange={handleScan}
          autoFocus
        />

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-900">
            </div>
          </div>
        ) : (
          <>
            {session && <OrderDetails session={session} />}
          </>
        )}
      </div>
    </>
  );
}
