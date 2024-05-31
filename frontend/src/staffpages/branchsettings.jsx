import { useState, useEffect } from "react";
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import {
  BookOpenIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UsersIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { Admin } from "../models";
import { DataStore } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function OpeningTime() {
  const navigate = useNavigate();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [times, setTimes] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: { openingTime: "09:00", closingTime: "17:00" } }), {})
  );
  const [sessionLength, setSessionLength] = useState("02:00");
  const [sessions, setSessions] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sessionLengthDate = new Date(`1970-01-01T${sessionLength}Z`);
    const sessionLengthMinutes = sessionLengthDate.getUTCHours() * 60 + sessionLengthDate.getUTCMinutes();

    const newSessions = {};
    for (const day of daysOfWeek) {
      const openingTimeDate = new Date(`1970-01-01T${times[day].openingTime}Z`);
      const closingTimeDate = new Date(`1970-01-01T${times[day].closingTime}Z`);

      const daySessions = [];
      let currentTime = openingTimeDate;
      while (currentTime < closingTimeDate) {
        const endTime = new Date(currentTime.getTime() + sessionLengthMinutes * 60000);
        if (endTime > closingTimeDate) {
          break;
        }
        daySessions.push({
          start: currentTime.toISOString().substr(11, 5),
          end: endTime.toISOString().substr(11, 5),
        });
        currentTime = new Date(currentTime.getTime() + 30 * 60000); // move to the next session start time
      }

      newSessions[day] = daySessions;
    }

    setSessions(newSessions);
  }, [times, sessionLength]);

  const handleSubmitAsDefault = async () => {
    const defaultSlotsData = daysOfWeek.reduce((acc, day) => {
      acc[day] = JSON.stringify({
        openingTime: times[day].openingTime,
        closingTime: times[day].closingTime,
        sessions: sessions[day],
      });
      return acc;
    }, {});

    defaultSlotsData.sessionLength = sessionLength;

    try {
      const original = await DataStore.query(Admin);

      if (original.length > 0) {
        await DataStore.save(
          Admin.copyOf(original[0], updated => {
            updated.DefaultSlots = JSON.stringify(defaultSlotsData);
          })
        );
        console.log('DefaultSlots data updated successfully');
      } else {
        await DataStore.save(new Admin({ DefaultSlots: JSON.stringify(defaultSlotsData) }));
        console.log('DefaultSlots data saved successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving or updating DefaultSlots data', error);
    }
  };

  const handleChangeForNextWeek = async (day) => {
    try {
      const original = await DataStore.query(Admin);
  
      if (original.length > 0) {
        // Create a new instance of the Admin model with updated data
        const updatedAdmin = Admin.copyOf(original[0], updated => {
          updated[day] = JSON.stringify({
            openingTime: times[day].openingTime,
            closingTime: times[day].closingTime,
            sessions: sessions[day],
          });
        });
  
        await DataStore.save(updatedAdmin);
        console.log(`Changes for ${day} saved successfully for next week`);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(`Error saving changes for ${day} for next week`, error);
    }
  };
  
  const colors = ['bg-red-600 hover:bg-red-700', 'bg-yellow-600 hover:bg-yellow-700', 'bg-green-600 hover:bg-green-700', 'bg-blue-600 hover:bg-blue-700', 'bg-orange-600 hover:bg-indigo-700', 'bg-purple-600 hover:bg-purple-700', 'bg-pink-600 hover:bg-pink-700'];



  
  

  return (
    <div>
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          <button
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {daysOfWeek.map((day, index) => (
            <button
              key={day}
              onClick={() => setCurrentPage(index + 1)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                currentPage === index + 1
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <button
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, daysOfWeek.length))}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div className="flex">
        <div className="w-1/2">
          <button
            onClick={handleSubmitAsDefault}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white ml-5 mb-5 font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Save as Default
          </button>
          {daysOfWeek.map((day, index) => (
  <button
    key={day}
    onClick={() => handleChangeForNextWeek(day)}
    className={`mt-4 ${colors[index % colors.length]} flex justify-between text-white ml-5 mb-5 font-semibold py-2 px-4 rounded-lg shadow-md`}
  >
    Change for {day}
  </button>
))}
        </div>
        <div className="w-1/2">
          {daysOfWeek.map((day, index) => (
            <div key={day} style={{ display: currentPage === index + 1 ? 'block' : 'none' }}>
              <label htmlFor={`${day}-opening-time`} className="block text-sm ml-2 font-medium leading-6 text-gray-900">
                {day} Opening Time
              </label>
              <div className="mt-2">
                <input
                  type="time"
                  name={`${day}-opening-time`}
                  id={`${day}-opening-time`}
                  className="block w-1/2 rounded-md border-0 py-1.5 ml-2 text-gray-900 shadow-sm ring-1 ml-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="09:30"
                  value={times[day].openingTime}
                  onChange={e =>
                    setTimes(prevTimes => ({
                      ...prevTimes,
                      [day]: { ...prevTimes[day], openingTime: e.target.value },
                    }))
                  }
                />
              </div>
              <label htmlFor={`${day}-closing-time`} className="block text-sm font-medium leading-6 ml-2 text-gray-900">
                {day} Closing Time
              </label>
              <div className="mt-2">
                <input
                  type="time"
                  name={`${day}-closing-time`}
                  id={`${day}-closing-time`}
                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ml-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="17:30"
                  value={times[day].closingTime}
                  onChange={e =>
                    setTimes(prevTimes => ({
                      ...prevTimes,
                      [day]: { ...prevTimes[day], closingTime: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          ))}
          <div>
            <label htmlFor="session-length" className="block text-sm font-medium leading-6 text-gray-900">
              Session Length
            </label>
            <div className="mt-2">
              <input
                type="time"
                name="session-length"
                id="session-length"
                className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="02:00"
                value={sessionLength}
                onChange={e => setSessionLength(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          {daysOfWeek.map((day, index) => (
            <div key={day} style={{ display: currentPage === index + 1 ? 'block' : 'none' }}>
              <h2 className="text-2xl font-bold tracking-tight text-purple-900 sm:text-3xl">{day}</h2>
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Session
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Start Time
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      End Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sessions[day].map((session, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.start}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
