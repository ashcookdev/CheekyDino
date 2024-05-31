import { DataStore } from "aws-amplify";
import { Sessions } from "../models";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { id } from "date-fns/locale";

export default function SessionBlowout() {

    /// get todays date
    const date = new Date();

    const [futureSessions, setFutureSessions] = useState([]);


    const awsDate = format(date, 'yyyy-MM-dd');

    // get all sessions that are before the current date and .Arrived is false 
    const fetchSessions = async () => {
        const sessions = await DataStore.query(Sessions);
    
        // Create an object to store user booking and missed session counts
        let userStats = {};
    
        sessions.forEach(session => {
            const sessionDate = format(new Date(session.Date), 'yyyy-MM-dd');
    
            // Check if the session is in the past and the user has not arrived
            if (sessionDate < awsDate && session.Arrived === false && session.LeftCenter === false) {
                // If the user's email is not in the userStats object, add it
                if (!userStats[session.Email]) {
                    userStats[session.Email] = { 
                        timesBooked: 0, 
                        timesMissed: 0, 
                        Name: session.Name, 
                        Email: session.Email, 
                        Date: session.Date, 
                        TimeslotFrom: session.TimeslotFrom, 
                        id: session.id
                    };
                }
    
                // Increment the user's booking count
                userStats[session.Email].timesBooked++;
    
                // Increment the user's missed session count
                userStats[session.Email].timesMissed++;
            }
        });
    
        // Convert the userStats object into an array of user data
        const futureSessionsData = Object.keys(userStats).map(email => ({
            email,
            ...userStats[email]
        }));
    
        setFutureSessions(futureSessionsData);
    };
    
    

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleAllowBooking = async (id) => {
        const session = await DataStore.query(Sessions, id);

        await DataStore.save(Sessions.copyOf(session, updated => {
            updated.Arrived = true;
            updated.LeftCenter = true;
            updated.CleanTable = true;
            updated.TableCleaned = true;
        }

        ));
        fetchSessions();
    }



    
      
        return (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all customers that have not arrived for their session.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                        >
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Email
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date of Session
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Time of Session
                        </th>
                       
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Times Booked
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Times Missed
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                            Allow Online Booking
                        </th>

                        

                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {futureSessions.map((session) => (
                                                <tr key={session.Email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                            {session.Name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Email}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.Date}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.TimeslotFrom}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.timesBooked}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.timesMissed}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <button onClick= {() => {
                                    handleAllowBooking(session.id);
                                }
                                }

                                
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Allow
                                </button>

                            </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
    }


      