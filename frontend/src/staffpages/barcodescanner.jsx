import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from './models';
import OrderDetails from './BookingDetails';

export default function Qrscanner() {
  const [scan, setScan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  let timeoutId = null;

  const getDetails = async (value) => {
    setIsLoading(true);
    try {
      const result = await DataStore.query(Sessions, value);
      if (result) {
        setSession(result);
      } else {
        console.log("No session found with ID:", value);
        alert("No session found with ID:", value);
      }
    } catch (error) {
      console.error("Error querying DataStore:", error);
    }
    setIsLoading(false);
  }
  
  const handleScan = (e) => {
    // Clear any previous timeouts
    clearTimeout(timeoutId);
    // Call getDetails after a delay of 2 seconds
    timeoutId = setTimeout(() => {
      getDetails(e.target.value);
    }, 3000);
  }
  

  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Scan QR Code"
              onChange={handleScan}
              autoFocus
              
            />
            {session && <OrderDetails session={session} />}
          </>
        )}
      </div>
      
    </>
  );
}
