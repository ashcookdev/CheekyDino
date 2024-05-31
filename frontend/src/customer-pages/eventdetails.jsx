import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, CustomerEvent } from '../models';
import { Auth } from 'aws-amplify';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSessions() {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;
      const sessions = await DataStore.query(Sessions, c => c.Email.eq(email));
      const filteredSessions = sessions.filter(event => event.Event === true);

      

      
      setSessions(filteredSessions );
    }
    fetchSessions();
  }, []);

  return (
      <div className="flex flex-col items-center mt-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">
         Event Booking Details
        </h2>
        
    
        {[...sessions].reverse().map((session, index) => (
          <div
            key={session.id}
            className="border p-4 rounded w-full max-w-md mb-4 shadow-lg border-purple-500 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold leading-6 text-white">
                Booking #{sessions.length - index}
              </span>
            </div>
            <div
              className={`p-2 rounded flex justify-center items-center ${
                index === 5 ? "bg-gold" : ""
              }`}
            >
              <QRCode value={session.id} size={Math.min(200, window.innerWidth - 100)} />
            </div>
            <div className="flex flex-col gap-y-1 mt-2 text-center text-white">
              <div>Name: {session.Name}</div>
              <div>Event: {session.EventName}</div>
              <div>Adults: {session.Adults}</div>
              <div>Children: {session.Children}</div>
              <div>Email: {session.Email}</div>
              <div>Table: {session.Table}</div>
              <div>Total: {session.Total}</div>
              
              <div>Date: {session.Date}</div>
            </div>
          </div>
        ))}
      </div>
    );
    
  
          }
          
export default MyComponent;