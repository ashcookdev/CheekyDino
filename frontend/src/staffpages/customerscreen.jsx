import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { format } from 'date-fns';
import CustomerTables from './customertables';
import { CustomerScreen } from '../models';
import "./screencss.css"
import { Sessions, Messages } from '../models';
import TableLayout from './tablelayout';
import { useNavigate } from 'react-router-dom';
import Weather from './weatherdata';
import { BellIcon } from '@heroicons/react/20/solid';
import '../customer-pages/customerfont.css'





export default function Example() {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showOriginalComponent, setShowOriginalComponent] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [dash, setDash] = useState(false);

const [announce , setAnnounce] = useState('')

  const navigate = useNavigate();

  if (dash === true) {
    navigate('/dashboard')
  }
    
  useEffect(() => {
    // set a timer to refresh the page every 2 minutes
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  



  


  useEffect(() => {
    // subscribe to real-time updates on the CustomerScreen model
    const subscription = DataStore.observeQuery(CustomerScreen)
      .subscribe(snapshot => {
        const { items, isSynced } = snapshot;
        // update the message state with the latest message
        if (items.length > 0) {
          setMessage(items[items.length - 1]?.Message || '');
          setNumbers(items[items.length - 1]?.Number || '');
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 120000); // hide message after 2 minutes
        }
      });
  
    // clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  


    // clean up the subscription when the component unmounts


  

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = format(new Date(), 'HH:mm');
      if (timesToDisplay[currentTime] && messageCount < 2) {
        setDisplayMessage(timesToDisplay[currentTime]);
        setShowOriginalComponent(false);
        setMessageCount(prev => prev + 1);
        setTimeout(() => setShowOriginalComponent(true), 300000); // show original component after 5 minutes
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [messageCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = format(new Date(), 'HH:mm');
      if (timesToDisplay[currentTime]) {
        setDisplayMessage(timesToDisplay[currentTime]);
        setShowOriginalComponent(false);
        setTimeout(() => setShowOriginalComponent(true), 300000); // show original component after 5 minutes
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nowFalse = setInterval(() => {
      setFalse(false)
    }, 60000);
    return () => clearInterval(nowFalse);
  }, []);

 
  useEffect(() => {
    // get current sessions 
    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');
      const todaysSessions = sessionsData.filter(session => session.Date === awsDate && session.Arrived === true && session.LeftCenter === false);

      setSessions(todaysSessions);
    }

    const fetchMessages = async () => {
      const messages = await DataStore.query(Messages);
      const filter = messages.filter(message => message.FoodReady === true && message.delivered === false);

      setAnnounce(filter);
    }



    fetchMessages();
    


    fetchSessions();

  }, [announce]);



  return (
    <>
     <div>
  {announce.length > 0 ? (
    announce.map(announcement => (
      <div className="flex flex-col items-center justify-center h-screen text-white mt-10 ml-10 animate-pulse font-bold text-3xl border-4 border-orange-500 rounded-lg bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcms0ZjljOWFxcHR5YmhzMW5qYjdnMnllanp3aWp4dmQyenNrOXVyeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKHW5ygEPHUNrb1SM/giphy.gif")' }}>
       <BellIcon className="h-24 w-24 border-4 border-orange-500 rounded-full p-2 component-title" aria-hidden="true" />
          {announcement.content}
    </div>
    ))
 

        ) : (
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
                className="text-white font-bold bg-transparent border border-white rounded-md px-4 py-2 ml-auto"
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
              {showOriginalComponent && (
                <div className="w-1/2 flex flex-col">
                  <div className="flex-1 h-screen">
                    {showMessage && message ? (
                      <>
                        <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                          {message}
                        </h1>
                      </>
                    ) : (
                      <>
                        <div className="h-full mt-5">
                          <TableLayout />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
  
}
