import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { Auth } from 'aws-amplify';
import QRCode from 'react-qr-code';

function MyComponent() {
  const [sessions, setSessions] = useState([]);

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
      {sessions.map(session => (
        <div key={session.id} className="border p-4 rounded">
          <QRCode value={session.id} />
          <div>Name: {session.Name}</div>
          <div>Age: {session.Age}</div>
            <div>Adults: {session.Adults}</div>
            <div>Children: {session.Children}</div>
            <div>Email: {session.Email}</div>
            <div>Table: {session.Table}</div>

          <div>Timeslot: {session.TimeslotFrom} - {session.TimeslotTo}</div>
          <div>Date: {session.Date}</div>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;


