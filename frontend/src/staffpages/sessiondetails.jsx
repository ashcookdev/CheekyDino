import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
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
      setSessions(sessions);
    }
    fetchSessions();
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">
        My Bookings
      </h2>
      <button onClick={()=> {navigate ("/session")}} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-blue-600">Book Again</button>

      {sessions.map((session, index) => (
        <div key={session.id} className="border p-4 rounded w-full max-w-md mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold leading-6 text-gray-900">Booking #{index + 1}</span>
          </div>
          <div className={`p-2 rounded ${index === 5 ? 'bg-gold' : ''}`}>
            <QRCode value={session.id} />
          </div>
          <div className="flex flex-col gap-y-1 mt-2">
            <div>Name: {session.Name}</div>
            <div>Age: {session.Age}</div>
            <div>Adults: {session.Adults}</div>
            <div>Children: {session.Children}</div>
            <div>Email: {session.Email}</div>
            <div>Table: {session.Table}</div>
            <div>Timeslot: {session.TimeslotFrom} - {session.TimeslotTo}</div>
            <div>Date: {session.Date}</div>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default MyComponent;


