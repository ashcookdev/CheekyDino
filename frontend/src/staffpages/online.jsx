import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { ClockIns} from "../models";
import { Link } from 'react-router-dom';


export default function Online() {
  const [clockedInStaff, setClockedInStaff] = useState([]);

  
  

  useEffect(() => {
    const fetchClockedInStaff = async () => {

      const clockInRecords = await DataStore.query(ClockIns);
    
      // Get today's date in 'yyyy-mm-dd' format
      const today = new Date().toISOString().split('T')[0];
    
      const clockedInToday = clockInRecords.filter(
        (c) =>
          c.Date === today &&
          c.ClockedIn === true &&
          c.ClockedOut === false
      );
    
      setClockedInStaff(clockedInToday);
    };
    

    fetchClockedInStaff();

    const subscription = DataStore.observe(ClockIns).subscribe(() => {
      fetchClockedInStaff();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const staffImg = "/versa.gif";

  const calculateElapsedTime = (breakStart) => {
    if (!breakStart) {
      return 0;
    }
  
    const now = new Date();
    const [hours, minutes, seconds, milliseconds] = breakStart.split(/[:.]/); // Split the time string
    const breakStartTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds, milliseconds);
  
    const elapsedMilliseconds = now - breakStartTime;
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    return elapsedMinutes;
  };
  
  

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {clockedInStaff.map((staff) => (
        <div
          key={staff.id}
          className={`relative flex items-center space-x-3 rounded-lg border ${
            staff.Break ? "border-red-500" : "border-green-300"
          } bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400`}
        >
          <div className="flex-shrink-0 relative">
            {staff.Break && (
              <span className="absolute bg-red-500 bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-400 animate-pulse"></span>
            )}
           
          </div>
          <div className="min-w-0 flex-1">
            <Link to = "/chat" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">
                {staff.StaffId}
              </p>
              <p className="text-sm text-gray-500 truncate">
                Department: {staff.StaffRole}
              </p>
              <p className="truncate text-sm text-gray-500">
                Arrived: {staff.ClockIn.split(':').slice(0, 2).join(':')}

              </p>
              <p className="text-lg text-green-500 animate-pulse">
                  Current Task : {staff.StaffRole}
                </p>
              {staff.Break && (
                <p className="text-sm text-gray-500">
                  Elapsed Break Time: {calculateElapsedTime(staff.BreakStart.split(':').slice(0,2).join(':'))}
                </p>
               

              )}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
