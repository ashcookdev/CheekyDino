import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from '../models';
import OrderDetails from './BookingDetails';
import { useNavigate } from 'react-router-dom';
import { CogIcon } from '@heroicons/react/20/solid';
import {format} from 'date-fns';
export default function Qrscanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionsToday, setSessionsToday] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null); // Changed to store session ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessionsToday();
  }, []);

  const fetchSessionsToday = async () => {
      setIsLoading(true);
      try {
        const today = format(new Date(), 'yyyy-MM-dd');
        
        const sessions = await DataStore.query(Sessions);
        const ordersToday = sessions.filter(session => session.Date === today && session.Arrived === false);

        // sort by Arrival Time in ascending order

        ordersToday.sort((a, b) => {
          if (a.TimeArrived < b.TimeArrived) {
            return -1;
          }
          if (a.TimeArrived > b.TimeArrived) {
            return 1;
          }
          return 0;
        }
        );
        



  
        setSessionsToday(ordersToday);
      } catch (error) {
        console.error("Error querying DataStore:", error);
        // Handle error
      }
      setIsLoading(false);
    };
 
   

  const handleConfirm = () => {
    if (selectedSessionId) {
      const selectedSession = sessionsToday.find(session => session.id === selectedSessionId);
      setSession(selectedSession);
    } else {
      window.location.reload();
    }
  };

  const handleSessionChange = (e) => {
    setSelectedSessionId(e.target.value);
  };

  return (
    <>
      <div>
        <button 
          type="button"
          className="inline-flex mb-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none mr-5"
          onClick={() => navigate('/dashboard')}
        >
          Back
        </button>

        <select
          id="sessionSelect"
          name="sessionSelect"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={handleSessionChange}
        >
          <option value="">Select a session</option>
          {sessionsToday.map(session => (
            <option key={session.id} value={session.id}> {/* Changed value to session.id */}
              {session.Name} - {session.TimeslotFrom}- {session.TimeslotTo}
            </option>
          ))}
        </select>

        <button 
          type="button"
          className="inline-flex mb-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none mr-5"
          onClick={handleConfirm}
        >
          Confirm
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
              <CogIcon className="h-16 w-16" />
            </div>
          </div>
        ) : (
          session && <OrderDetails session={session} /> 
        )}
      </div>
    </>
  );
}
