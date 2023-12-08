import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { HomePage } from '../models';
import './customerfont.css'

export default function HeroSection() {
  const [homescreen, setHomescreen] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const fetchHomescreen = async () => {
      const homescreen = await DataStore.query(HomePage);
      setHomescreen(homescreen);
    };
    fetchHomescreen();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((currentEventIndex + 1) % 3);
    }, 15000);
    return () => clearInterval(interval);
  }, [currentEventIndex]);

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      {homescreen.map((home) => (
        <div key={home.id}>
          <div className={`flex flex-col md:flex-row w-full ${currentEventIndex === 0 ? '' : 'hidden'}`}>
            <div className="w-full md:w-1/2 p-6">
              <h2 className="text-4xl component-title font-bold tracking-tight text-green-500">{home.EventTitle}</h2>
              <p className="mt-6 text-lg leading-8 text-black component-title">{home.EventWriting}</p>
            </div>
            <div
              className="w-full md:w-1/2 bg-contain bg-center"
              style={{ backgroundImage: `url(${home.EventPic})` }}
            />
          </div>
          <div className={`flex flex-col md:flex-row w-full ${currentEventIndex === 1 ? '' : 'hidden'}`}>
            <div className="w-full md:w-1/2 p-6">
              <h2 className="text-4xl component-title font-bold tracking-tight text-black">{home.EventTwoTitle}</h2>
              <p className="mt-6 text-lg leading-8 text-black">{home.EventTwoWriting}</p>
            </div>
            <div
              className="w-full md:w-1/2 bg-contain bg-center"
              style={{ backgroundImage: `url(${home.EventTwoPic})` }}
            />
          </div>
          <div className={`flex flex-col md:flex-row w-full ${currentEventIndex === 2 ? '' : 'hidden'}`}>
            <div className="w-full md:w-1/2 p-6">
              <h2 className="text-4xl component-title font-bold tracking-tight text-orange-500">{home.EventThreeTitle}</h2>
              <p className="mt-6 text-lg leading-8 text-black">{home.EventThreeWriting}</p>
            </div>
            <div
              className="w-full md:w-1/2 bg-contain bg-center"
              style={{ backgroundImage: `url(${home.EventThreePic})` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
      }  
