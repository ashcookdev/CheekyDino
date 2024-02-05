import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from '../models';
import OrderDetails from './BookingDetails';
import { useNavigate } from 'react-router-dom';

export default function Qrscanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [back, setBack] = useState(false)

  const navigate = useNavigate();


  if (back === true) {
navigate('/dashboard')    
  }


  let timeoutId = null;

  const getDetails = async (value) => {
    setIsLoading(true);

    try {
      const sessions = await DataStore.query(Sessions);
      let result = sessions.filter(s => s.CustomerbookingID === value);
      
      if (result && result.length > 0) {
        setSession(result[0]);
      } else {
        console.log("No session found with search value:", value);
        alert("No session preBooked for today with this search value", value);
      }
    } catch (error) {
      console.error("Error querying DataStore:", error);
    }

    setIsLoading(false);
  }

  const handleScan = (e) => {
    if (e.target.value) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        getDetails(e.target.value);
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

        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Scan QR Code"
          onChange={handleScan}
          autoFocus
        />

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
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
