import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { format } from 'date-fns';
import CustomerTables from './customertables';
import { CustomerScreen } from './models';
import "./screencss.css"
import { Sessions } from './models';
import TableLayout from './tablelayout';

export default function Example() {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showOriginalComponent, setShowOriginalComponent] = useState(true);
  const [numbers, setNumbers] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [nowFalse, setFalse] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [displayMessage, setDisplayMessage] = useState('');
  const [sessions, setSessions] = useState([]);

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


  const timesToDisplay = {
    '09:30': 'Can Everyone Booked in from 9:30 to 11:30. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '10:00': 'Can Everyone Booked in from 9:30 to 11:30. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '10:30': 'Can Everyone Booked in from 9:30 to 11:30. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '11:00': 'Can Everyone Booked in from 9:30 to 11:30. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '11:30': 'Can Everyone Booked in from 9:30 to 11:30. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '12:00': 'Can Everyone Booked in from 12:00 to 14:00. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '12:30': 'Can Everyone Booked in from 12:00 to 14:00. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '13:00': 'Can Everyone Booked in from 12:00 to 14:00. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '13:30': 'Can Everyone Booked in from 12:00 to 14:00. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '14:00': 'Can Everyone Booked in from 14:00 to 16:00. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '14:30': 'Can Everyone Booked in from 14:30 to 16:30. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '15:00': 'Can Everyone Booked in from 15:00 to 17:00. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
    '16:34': 'Can Everyone Booked in from 15:30 to 17:30. Please Make Your Way Out Of The Center, We Hope You Enjoyed Your Time With Us!',
  };

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
    let newAudioSrc = '';
    if (numbers === 1) {
      newAudioSrc = './announcements/partyGuests.mp3';
    } else if (numbers === 2) {
      newAudioSrc = './announcements/leaving.mp3';
    } else if (numbers === 3) {
      newAudioSrc = './audio/file3.mp3';
    }
    setAudioSrc(newAudioSrc);
  }, [numbers]);

  useEffect(() => {
    // get current sessions 
    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');
      const todaysSessions = sessionsData.filter(session => session.Date === awsDate && session.Arrived === true && session.LeftCenter === false);

      setSessions(todaysSessions);
    }

    fetchSessions();
  }, []);

  const shouldMoveDown = sessions.length > 3;

  return (
    <>
<div
        className="flex bg-fixed bg-center bg-no-repeat bg-cover"
      >        <div className="w-1/2">
          <div className="overflow-hidden h-full">
          <h1 className='flex font-bold items-center'> {format(new Date(), 'HH:mm')}</h1>

            <div className={`customer-tables ${shouldMoveDown ? 'move-down' : ''}`}>
              <CustomerTables />
            </div>
          </div>
        </div>
        {showOriginalComponent && (
          <div className="w-1/2 flex flex-col">
            <div className="flex-1">
            {showMessage && message ? (
                <>
                  <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                    {message}
                  </h1>
                  <audio autoPlay controls src={audioSrc} className="hidden" />
                </>
              ) : (
                <>
                  <TableLayout />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}