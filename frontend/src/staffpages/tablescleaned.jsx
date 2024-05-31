import { DataStore } from "aws-amplify";
import { Messages, Sessions } from "../models";
import React, { useState, useEffect } from "react";
import { format, differenceInMinutes, parse } from "date-fns";
import { differenceInSeconds } from "date-fns";

export default function CleanTable() {
  const [sessions, setSessions] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = DataStore.observe(Sessions).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      fetchSessions();
    });
  
    fetchSessions();
  
    // Cleanup function
    return () => subscription.unsubscribe();
  }, []);
  

  const fetchSessions = async () => {
    try {
      const sessionsData = await DataStore.query(Sessions);
      const today = format(new Date(), 'yyyy-MM-dd');
      let futureBookings = sessionsData.filter(session =>
        session.Date === today &&
        session.LeftCenter === true &&
        session.Arrived === true &&
        session.CleanTable === true &&
        session.TableCleaned === false
      );
      setSessions(futureBookings);
    } catch (error) {
      console.error("Error fetching sessions", error);
    }
  };

  const handleCleanedClick = async (session, event) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    try {
      await DataStore.save(
        Sessions.copyOf(session, updated => {
          updated.CleanTable = true;
          updated.TableCleaned = true;
        })
      );


      fetchSessions();
      console.log("Session updated successfully");
      // set a timer to setLoading(false) after 3 seconds
      setTimeout(() => {
        setLoading(false);
        fetchSessions();
      }, 3000);
    } catch (error) {
      console.error("Error updating session", error);
    }
  };
  const getRemainingTime = (timeLeft) => {
    const currentTime = new Date();
    const [hours, minutes, seconds] = timeLeft.split(':').map(Number);
    const milliseconds = seconds * 1000;
    const secondsLeft = hours * 3600 + minutes * 60 + Math.floor(milliseconds / 1000);
  
    // Get the current time in seconds
    const currentSeconds = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
  
    // Calculate the difference in seconds
    let differenceSec = secondsLeft - currentSeconds;
  
    // Subtract 5 minutes (in seconds)
    differenceSec -= 5 * 60;
  
    // Add 6 minutes (in seconds) to the initial time
    differenceSec += 6 * 60;
  
    // Convert back to minutes and return
    const remainingMinutes = Math.floor(differenceSec / 60);
    return remainingMinutes;
  };
  
  
  

  const getTimerColor = (timeLeft) => {
    const remainingTime = getRemainingTime(timeLeft);
    if (remainingTime <= 2) {
      return 'bg-purple-500 animate-pulse';
    } else if (remainingTime <= 3) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  };

  return (
    <div>
      <div className="flex justify-start items-center">
       
      </div>

      {sessions.length === 0 && <p className="text-center mt-5 text-lg">No Tables To Clean</p>}

  <div className="grid grid-cols-3 gap-4 mt-5">
    {sessions.map((session) => {
      return (
        <div key={session.id} className={`flex flex-col justify-between gap-y-4 py-5 px-4 rounded-lg ${getTimerColor(session.TimeLeft)} shadow-lg`}>
          <div className="flex justify-between items-start">
            {
            loading ? (
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white">
                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW1td3QyZzZuNTNrZWI2N2I1NzZ2aGoxbW14eXdiYzRxY3E3Y2RydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gjNtQ7q4Gd6hcbvQoj/giphy.gif" alt="loading" />
              </div>
            ) : null

            }
            <div className="flex flex-col">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white">
                <p className="text-black font-bold text-xl">{session.Table}</p>
              </div>
            </div>
            <button className="mt-4 bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" onClick={() => handleCleanedClick(session, event)}>
              Cleaned
            </button>
          </div>
          <p className="text-center text-white">Time Left: {getRemainingTime(session.TimeLeft)} minutes</p>
        </div>
      )
    })}
  </div>


    </div>
  );
}
