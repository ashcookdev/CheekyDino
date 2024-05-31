import { useState } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { Sessions, ClockIns, Messages, CustomerScreen, Gates } from "../models";
import { useNavigate } from "react-router-dom";
import { CheckBadgeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import {format, parse} from 'date-fns';

export default function MasterClose() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [move, setMove] = useState(false);
    

    const correctPassword = "myPassword"; // replace with your actual password

    const Navigate = useNavigate();

    const handleButtonClick = async () => {
        if (password === correctPassword) {
            const now = new Date();
            const timeString = now.toISOString().split('T')[1].slice(0, -1);
                        const sessions = await DataStore.query(Sessions, Predicates.ALL);
            await Promise.all(
                sessions.map(async (session) => {
                    const updatedSession = Sessions.copyOf(session, updated => {
                        if (!updated.TimeLeft) {
                            updated.TimeLeft = timeString;
                        }
                        updated.LeftCenter = true;
                        updated.CleanTable = true;
                        updated.TableCleaned = true;
                    });
                    await DataStore.save(updatedSession);
                })
            );
            await DataStore.delete(Messages, Predicates.ALL);
           await DataStore.delete(CustomerScreen, Predicates.ALL);
           await DataStore.delete(Gates, Predicates.ALL);



            const clockIns = await DataStore.query(ClockIns, Predicates.ALL);
            await Promise.all(
                clockIns.map(async (clockIn) => {
                    const updatedClockIn = ClockIns.copyOf(clockIn, updated => {
                        updated.ClockOut = timeString;
                        updated.ClockedOut = true;
                    });
                    await DataStore.save(updatedClockIn);
                })

               
                
                
            );
           


// check all all sessions for todays date and if there are any sessions where the customer has not arrived and the session has not been cancelled then set the session to NoShow to true 

           

setCompleted(true);

        } else {
window.location.reload();        }
    };

    if (move === true) {
        window.location.reload();
        Navigate("/dashboard")
    }

    

    if (completed) {
        return (
            <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckBadgeIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Successfully Shutdown, Have a Good Night, See you in the Morning!</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button onClick={() => setMove(true)}
                    type="button"
                    className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    Close

                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }

   


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-transparent">
            <div className="bg-white rounded-lg shadow-lg p-8">
                {showPassword ? (
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-64"
                    />
                ) : null}
                <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
                >
                    {showPassword ? "Hide Password" : "Shut Down"}
                </button>
                {showPassword ? (
                    <button
                        onClick={handleButtonClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg relative overflow-hidden"
                    >
                        Submit
                    </button>
                ) : null}
            </div>
        </div>
    );
}
