import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { format, isToday, isWithinInterval, addMinutes, isAfter } from 'date-fns';
import CustomerTables  from './customertables';


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

export default function Example() {
    const [index, setIndex] = useState(0);

    const time = format(new Date(), 'HH:mm');
    

    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((index + 1) % imagesAndMessages.length);
        }, 20000);
        return () => clearInterval(interval);
      }, [index]);

        const [message, setMessage] = useState('');



        console.log(message)

       
          
        
      
          
          
      

        return (
          <div className="relative bg-orange-500">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
              <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                <div className="mx-auto max-w-2xl lg:mx-0">
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
                </div>
              </div>
              {!imagesAndMessages[index].component && (
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
        );
              }