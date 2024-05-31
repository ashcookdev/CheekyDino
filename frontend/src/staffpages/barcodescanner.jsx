import React, { useState, useEffect, useRef } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from '../models';
import OrderDetails from './BookingDetails';
import { useNavigate } from 'react-router-dom';
import { CogIcon } from '@heroicons/react/20/solid';

export default function Qrscanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [noSession, setNoSession] = useState(false);

  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);


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
        s.CustomerbookingID.includes(value)  // Check if Arrived is false
      );

      if (filteredSessions.length > 0) {
        setSession(filteredSessions[0]);
      } else {
        console.log("No session found for today with this search value:", value);
        setNoSession(true);
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
        {noSession && <div className="text-red-500 text-center">No session found for today with this search value</div>}
        <button 
          type="button"
          className="inline-flex mb-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none mr-5"
          onClick={() => navigate('/dashboard')}
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
          ref={inputRef}
          type="text"
          className="form-control form-control-lg"
          placeholder="Scan QR Code"
          onChange={handleScan}
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
