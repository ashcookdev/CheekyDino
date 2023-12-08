import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { HomePage } from '../models';
import './customerfont.css'

export default function HeroSection() {
  const [homescreen, setHomescreen] = useState([]);

  useEffect(() => {
    const fetchHomescreen = async () => {
      const homescreen = await DataStore.query(HomePage);
      setHomescreen(homescreen);
    };
    fetchHomescreen();
  }, []);

  return (
    homescreen.map((home) => (
      <div
        key={home.id}
        className="bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${home.TopSectionPic})` }}
      >
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto text-center">
          <h2 className="text-15xl component-title font-bold tracking-tight text-white sm:text-4xl">{home.TopSectionTitle}</h2>
            <p className="mx-auto component-title w-full mt-6 max-w-xl text-lg leading-8 text-white">{home.TopSectionWriting}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              
            </div>
          </div>
        </div>
      </div>
    ))
  );
  
  
  
  
}
