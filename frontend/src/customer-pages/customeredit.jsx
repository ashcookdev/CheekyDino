import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { HomePage } from '../staffpages/models';

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
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {homescreen.map((home) => (
            <div key={home.id}>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {home.TopSectionTitle}
              </h2>
              <img src={home.TopSectionPic} alt={home.TopSectionTitle} />
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">{home.TopSectionWriting}</p>
            </div>
          ))}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
