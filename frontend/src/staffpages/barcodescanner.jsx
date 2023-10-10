import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from './models';
import OrderDetails from './BookingDetails';

export default function Qrscanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  let timeoutId = null;
  const getDetails = async () => {
    setIsLoading(true);
    const today = new Date().toISOString().slice(0, 10);
  
    try {
      const sessions = await DataStore.query(Sessions);
      let result;
      if (searchType === 'email') {
        result = sessions.filter(s => s.Email.toLowerCase() === searchValue.toLowerCase() && s.Date === today && s.Arrived === false && s.LeftCenter === false);
      } else if (searchType === 'name') {
        result = sessions.filter(s => s.Name.toLowerCase() === searchValue.toLowerCase() && s.Date === today && s.Arrived === false && s.LeftCenter === false);
     
      } else {
        console.log("Invalid search type:", searchType);
        alert("Invalid search type:", searchType);
      }
      if (result && result.length > 0) {
        setSession(result[0]);
      } else {
        console.log("No session found with search value:", searchValue);
        alert("No session preBooked for today with this search value", searchValue);
      }
    } catch (error) {
      console.error("Error querying DataStore:", error);
    }
    setIsLoading(false);
  }
  

  const handleScan = (e) => {
    // Clear any previous timeouts
    clearTimeout(timeoutId);
    // Call getDetails after a delay of 3 seconds
    timeoutId = setTimeout(() => {
      setSearchType('id');
      setSearchValue(e.target.value);
      getDetails();
    }, 3000);
  }

  return (
    <>
      <div>
        <button 
          type="button"
          className="inline-flex mb-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none mr-5"
          onClick={() => {
            window.location.assign("/dashboard");          }}
        >
          Back
        </button>

        <div className="flex mb-5">
          <button 
            type="button"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${searchType === 'email' ? 'bg-indigo-700' : 'bg-green-600'} hover:bg-indigo-900 focus:outline-none mr-5`}
            onClick={() => {
              setSearchType('email');
            }}
          >
            Search by Email
          </button>
          <button 
            type="button"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${searchType === 'name' ? 'bg-green-700' : 'bg-green-600'} hover:bg-green-700 focus:outline-none mr-5`}
            onClick={() => {
              setSearchType('name');
            }}
          >
            Search by Name
          </button>
        </div>

        {searchType && (
          <div className="flex">
            <input
              type="text"
              className="form-control form-control-lg mr-5"
              placeholder={`Enter ${searchType}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
            />
            <button 
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none mr-5"
              onClick={getDetails}
            >
              Search
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {session && <OrderDetails session={session} />}
            {!searchType && (
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Scan QR Code"
                onChange={handleScan}
                autoFocus
              />
            )}
          </>
        )}
      </div>
    </>
  );
}