import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { Auth } from 'aws-amplify';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { isToday, isBefore, parse, addMinutes, startOfDay, isAfter } from 'date-fns';

function MyComponent() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    const user = await Auth.currentAuthenticatedUser();
    const email = user.attributes.email;
    const sessions = await DataStore.query(Sessions, c => c.Email.eq(email));
    setSessions(sessions);
  }

  async function deleteSession(sessionId) {
    const sessionToDelete = await DataStore.query(Sessions, sessionId);
    await DataStore.delete(sessionToDelete);
    fetchSessions(); // Refresh the sessions after deletion
  }

  function getSessionStatus(session) {
    const currentDate = startOfDay(new Date());
    const sessionDate = startOfDay(new Date(session.Date));
    const timeslotFrom = parse(session.TimeslotFrom, 'HH:mm', new Date());

    if (isBefore(sessionDate, currentDate) && !session.Arrived && !session.LeftCenter) {
      return 'missed';
    } else if (isToday(sessionDate)) {
      return 'today';
    }
    return 'notToday';
  }

  return (
    <div className="flex flex-col items-center mt-5 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-orange-300 via-orange-400 to-orange-100">
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-4">
        My Bookings
      </h2>
      <div className='flex justify-between'> 
      <button
        onClick={() => {
          navigate("/session");
        }}
        className="px-4 py-2 bg-white text-black mr-5 rounded-md hover:bg-blue-600 mb-5 animate-pulse"
      >
        Book A New Session
      </button>
      <button onClick={() => navigate('/customercontact')} className="px-4 mb-5 py-2 bg-white text-black rounded-md hover:bg-blue-600 mb-5 animate-pulse"
>
            Contact Cheeky Dino
          </button>
</div>
      {[...sessions].reverse().map((session, index) => {
        const status = getSessionStatus(session);
        const color = status === 'today' ? 'bg-red-500' : status === 'missed' ? 'bg-gray-500' : 'bg-green-500';
        return (
          <div
            key={session.id}
            className={`border p-4 rounded w-full max-w-md mb-4 shadow-lg border-purple-500 ${color}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold leading-6 text-purple-500">
                Booking #{sessions.length - index}
              </span>
              <button className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600' onClick={() => deleteSession(session.id)} disabled={!isToday(new Date(session.Date))}>
                Delete Booking
              </button>
            </div>
            <div
              className={`p-2 rounded flex justify-center items-center ${
                index === 5 ? "bg-purple-500" : ""
              }`}
            >
              <div className="border-thick border-purple-500 p-2">
                <QRCode value={session.id} size={Math.min(200, window.innerWidth - 100)} />
              </div>
            </div>
            <div className="flex flex-col gap-y-1 mt-2 text-center text-white">
              <div>Name: {session.Name}</div>
              <div>Adults: {session.Adults}</div>
              <div>Children: {session.Children}</div>
              <div>Email: {session.Email}</div>
              <div>Table: {session.Table}</div>
              <div>Total: £{session.EntranceFee}</div>
              <div>
                Timeslot: {session.TimeslotFrom} - {session.TimeslotTo}
              </div>
              <div>Date: {session.Date}</div>
            </div>
            {status === 'today' && isAfter(new Date(), addMinutes(parse(session.TimeslotFrom, 'HH:mm', new Date()), 30)) && (
              <div className="flex justify-center mt-2">
                <p className="text-white text-sm">Dear {session.Name},

We’ve noticed that you have not arrived for your scheduled session on time. To ensure smooth operations and respect the time of all our clients, we kindly ask you to take immediate action.

Please do the following:

Contact the Center: Inform us whether you still intend to attend your session. Your prompt communication is crucial.
Cancel if Necessary: If you are unable to attend, please cancel your booking as soon as possible to allow others the opportunity to book.
Please Note: Due to the busy nature of our center, arriving late may affect the duration of your session. Depending on the schedule and availability, we may not be able to extend your session to the full two hours. You may be required to adhere to your original allotted end time.</p>


              <button onClick={() => navigate('/customercontact')} className="px-4 mb-5 py-2 bg-white text-black rounded-md hover:bg-blue-600 mb-5 animate-pulse"
>
            Contact Cheeky Dino
          </button>
        
              </div>
            )}
            {status === 'missed' && (
              <div className="flex justify-center mt-2">
                <p className="text-white text-sm">Missed Session Notice

Dear {session.Name},

We’ve noticed that you did not attend your scheduled session and we did not receive prior notification of cancellation or a request to reschedule. We understand that unforeseen circumstances can arise, but in order to manage our bookings effectively, we maintain a policy for such situations.

Policy on Missed Sessions: If a session is missed without contacting us or cancelling the booking, we reserve the right to restrict further online bookings. This measure ensures fair access to our services for all clients.

Next Steps: Please reach out to our center at your earliest convenience to discuss your missed session. We are here to assist you in rebooking and to address any concerns you may have.

Thank you for your understanding.
</p>
              </div>
            )
              
            
            }
          </div>
        );
      })}
    </div>
  );
}

export default MyComponent;
