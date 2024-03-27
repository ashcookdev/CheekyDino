import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { format } from 'date-fns';
import { CustomerScreen, Messages, Sessions } from '../models';
import { useNavigate } from 'react-router-dom';
import Weather from './weatherdata';
import { BellIcon } from '@heroicons/react/20/solid';
import CustomerTables from './customertables';
import TableLayout from './tablelayout';
import "./screencss.css";
import '../customer-pages/customerfont.css';

export default function Example() {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [dash, setDash] = useState(false);
  const navigate = useNavigate();

  if (dash) {
    navigate('/dashboard');
  }


  useEffect(() => {
    // set a timer to refresh the page every 2 minutes
    const interval = setInterval(() => {
      window.location.reload();
    }, 120000); // 120000 milliseconds = 2 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // subscribe to real-time updates on the CustomerScreen model
    const subscription = DataStore.observe(CustomerScreen).subscribe(snapshot => {
      const { items } = snapshot;
      if (items.length > 0) {
        const latestMessage = items[items.length - 1];
        if (!latestMessage.delivered) {
          setMessage(latestMessage.Message || '');
          setShowMessage(true);
          // Hide message after 2 minutes
          setTimeout(() => setShowMessage(false), 120000);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');
      const todaysSessions = sessionsData.filter(session => session.Date === awsDate && session.Arrived === true && session.LeftCenter === false);
      setSessions(todaysSessions);
    };

    fetchSessions();
  }, []);

 

  return (
    <>
          <div className="fixed top-0 left-0 w-full h-10 flex items-center px-4 bg-white">
            <div className="text-orange-500 font-bold text-xl mr-auto">
              {format(new Date(), "HH:mm")}
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="text-white font-bold">
                <Weather />
              </div>
            </div>
            <button
              className="text-orange font-bold bg-transparent border border-white rounded-md px-4 py-2 ml-auto"
              onClick={() => setDash(true)}
            >
              Close
            </button>
          </div>

          <div className="flex bg-fixed bg-center bg-no-repeat bg-cover pt-16 bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://media.giphy.com/media/3og0IK7lSFBFRKuBqg/giphy.gif")' }}>
            <div className="w-1/2">
              <div className="overflow-hidden h-full mt-5">
                <div className={`animate-moveUp space-y-4 ${sessions.length > 3 ? "animate-moveUp" : ""}`}>
                  <CustomerTables />
                </div>
              </div>
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex-1 h-screen">
                <div className="h-full mt-5">
                  <TableLayout />
                </div>
              </div>
            </div>
          </div>
          </>
  );
}



