import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { format } from 'date-fns';
import CustomerTables  from './customertables';
import { CustomerScreen } from './models';



const imagesAndMessages = [
  {
    image: 'https://media.giphy.com/media/Qw4X3FOknVexRVd1j5m/giphy.gif',
    message: 'Order your Food from your table, scan the QR code on your table to get started!'
  },
  {
    image: 'https://media.giphy.com/media/CIUUKp7vsPdy8/giphy.gif',
    message: 'Book your Party with us!, scan the QR code on your table to get started!'
  },
  {
    component: <CustomerTables />
  }
];

const time = format(new Date(), 'HH:mm');


export default function Example() {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showOriginalComponent, setShowOriginalComponent] = useState(true);
  const [numbers, setNumbers] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  console.log(numbers);

  useEffect(() => {
    // subscribe to real-time updates on the CustomerScreen model
    const subscription = DataStore.observeQuery(CustomerScreen)
      .subscribe(snapshot => {
        const { items, isSynced } = snapshot;
        console.log(`[Snapshot] item count: ${items.length}, isSynced: ${isSynced}`);
        // update the message state with the latest message
        setMessage(items[items.length - 1].Message);
        setNumbers(items[items.length - 1].Number);

        

        setShowMessage(true);
      });

    // clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagesAndMessages.length);
      setShowMessage(false);

    }, 30000);
    return () => clearInterval(interval);
  }, []);

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
    
  
  
  const [displayMessage, setDisplayMessage] = useState(null);
  
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
    let newAudioSrc = '';
    if (numbers === 1) {
      newAudioSrc = './announcements/partyGuests.mp3';
    } else if (numbers === 2) {
      newAudioSrc = './audio/file2.mp3';
    } else if (numbers === 3) {
      newAudioSrc = './audio/file3.mp3';
    }
    setAudioSrc(newAudioSrc);
  }, [numbers]);  


  const leavingAudioSrc = './announcements/leaving.mp3';


  return (
    <>
    
      {showOriginalComponent ? (
        <div className="relative bg-orange-500">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <>
                  {showMessage ? (
                    <>
                      <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                        {message}
                      </h1>
                      <audio 
                        autoPlay
                        controls
                        src={audioSrc}
                        className="hidden"

                      />

                    </>
                  ) : (
                    <>
                      <p>Current time: {time}</p>
                      {imagesAndMessages[index].component ? (
                        imagesAndMessages[index].component
                      ) : (
                        <>
                          <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                            {imagesAndMessages[index].message}
                          </h1>
                        </>
                      )}
                    </>
                  )}
                </>
              </div>
            </div>
            {!showMessage && !imagesAndMessages[index].component && (
              <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                <img
                  className="aspect-[3/2] w-full bg-orange-500 object-contain lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                  src={imagesAndMessages[index].image}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative bg-orange-500">
        <h1 className="animate-pulse mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl bg-orange-500">
        {displayMessage}
       
        </h1>

        <div>
        <audio
          autoPlay
          controls
          src={leavingAudioSrc}
          className=""
        />
        </div>
        <div>
        <CustomerTables/>

        </div>

        </div>
      )}
    </>
  );
}  


