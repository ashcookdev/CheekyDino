import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { HomePage, Admin } from '../models';
import './customerfont.css';

export default function HeroSection() {
  const [homescreen, setHomescreen] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchHomescreen = async () => {
      const homescreenData = await DataStore.query(HomePage);
      setHomescreen(homescreenData);
    };

    const fetchAdminData = async () => {
      const adminData = await DataStore.query(Admin);
      console.log(adminData);
      setAdmin(adminData);
    }
    fetchHomescreen();
    fetchAdminData();
  }, []);


  const backgroundImage = "https://img.freepik.com/free-vector/game-landscape-with-tropical-plants_105738-749.jpg";


 return (
  <div>
    {homescreen.map((home) => (
  <div key={home.id}>
        {/* First Section */}
        {home.TopSectionPic && (
          <div
            className="bg-cover bg-center w-full"
            style={{ backgroundImage: `url(${home.TopSectionPic})` }}
          >
            <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="mx-auto text-center">
                <h2 className="text-15xl component-title font-bold tracking-tight text-white sm:text-4xl">{home.TopSectionTitle}</h2>
                <p className="mx-auto component-title w-full mt-6 max-w-xl text-lg leading-8 text-white">{home.TopSectionWriting}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {/* Additional content for the first section */}
                </div>
              </div>
            </div>
          </div>
        )}

        {admin.map((adminData) => {
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          return (
            <div className="flex flex-col bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
              <div className="w-full px-6 py-24 sm:px-6 sm:py-32 lg:px-8 bg-purple-50 bg-opacity-50">
                <div className="mx-auto text-center">
                  <h2 className="text-15xl component-title font-bold tracking-tight text-black sm:text-4xl">Opening Times</h2>
                  <div className="mt-10 flex flex-col items-center justify-center gap-y-6 md:flex-row md:flex-wrap md:gap-x-6">
                    {/* Additional content for the second section */}
                    {days.map(day => {
  const dayData = adminData[day];
  return (
    <div key={dayData.id} className="flex justify-between w-full border p-4 rounded-lg mt-4 md:mt-0">
                          <h3 className="font-bold component-title">{day}</h3>
                          <div>
                            <p className='font-bold component-title'>Opening: {dayData.openingTime}am</p>
                            <p className='font-bold component-title'>Closing: {dayData.closingTime}pm</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {home.EventPic && (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img className="w-full h-auto" src={home.EventPic} alt="Event" />
            </div>
            <div className="w-full md:w-1/2 px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
              <div className="mx-auto text-center">
                <h2 className="text-15xl component-title font-bold tracking-tight text-black sm:text-4xl">{home.EventTitle}</h2>
                <p className="mx-auto component-title w-full mt-6 max-w-xl text-lg leading-8 text-black">{home.EventWriting}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {/* Additional content for the second section */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
  )}