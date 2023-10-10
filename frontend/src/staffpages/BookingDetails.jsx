import React, { useState } from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from './models';
import { Analytics } from 'aws-amplify';
import Till from './Till';
import { format, addHours } from 'date-fns';
import SessionTill from './SessionTill'
import { useNavigate } from 'react-router-dom';
import Modal2 from './modal2';


export default function Arrival({ session}) {

  const [arrival, setArrival] = useState(false);
  const [sessions, setSession] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate();

  if (arrival === true) {
    navigate('/prebooktill', { 
      state: { 
        order: '2 Hour Session', 
        total: sessions.TotalSpent, 
        table: sessions.Table, 
        ChildName: sessions.Name 
      } 
    });
  }
  



const guests = session.Adults + session.Children;




const confirmArrival = async () => {
  const currentTime = new Date();
  const formattedTime = format(currentTime, 'HH:mm');
  const arrivalTime = format(currentTime, 'HH:mm:ss.SSS')  
  const twoHoursLater = addHours(currentTime, 2);
  const formattedTwoHoursLater = format(twoHoursLater, 'HH:mm');

  // Fetch all sessions from DataStore
  const allSessions = await DataStore.query(Sessions);
  
  // Filter sessions that have the same table and overlap with current session's timeslot
  const conflictingSessions = allSessions.filter(s => 
    s.Table === session.Table && 
    s.TimeslotFrom < formattedTwoHoursLater && 
    s.TimeslotTo > formattedTime &&
    s.id !== session.id
  );
  
  // If there are other conflicting sessions
  if (conflictingSessions.length > 0) {
    setShowModal(true);
    // Code to send text goes here
  } else {
    try {
      await DataStore.save(
        Sessions.copyOf(session, updated => {
          updated.Arrived = true;
          updated.TimeArrived = arrivalTime;
          updated.LeftCenter = false;
          updated.TimeslotFrom = formattedTime;
          updated.TimeslotTo = formattedTwoHoursLater;
        })
      );

      setArrival(true);
      setSession(session);
      
    } catch (error) {
      console.error("Error saving session:", error);
    }
  }
}

// ...

if (showModal) {
  return (
    <Modal2 session ={session}>
    
    </Modal2>
  );
}


      



  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Session Details</h3>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Number of Guests</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{guests}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Date</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Date}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">TimeSlot From</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.TimeslotFrom}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">TimeSlot To</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.TimeslotTo}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Table</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.Table}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Total To Pay Now</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">£{session.TotalSpent}</dd>
          </div>
        </dl>
      </div>
      <button onClick={confirmArrival}
        type="button"
        className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Confirm Arrival
      </button>
    </div>
          
          
                  
                 
  )
}
