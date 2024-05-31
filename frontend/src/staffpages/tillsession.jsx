import { DataStore } from "aws-amplify";
import { Sessions } from "../models";
import { useEffect, useState } from "react";
import Till from "./Till";


export default function Session() {
  const [sessions, setSessions] = useState([]);
    const [truth, setTruth] = useState(false);



  console.log(sessions);

  async function fetchSessions() {
    const sessions = await DataStore.query(Sessions);
    setSessions(sessions);
  }

  async function updateLeftCenter(session) {
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const departureTime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();
  
        await DataStore.save(
      Sessions.copyOf(session, updated => {
        updated.LeftCenter = true;
        updated.TimeLeft = departureTime;
      })
    );
 setTruth(true);
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  if (truth === true) {
    return (
        <Till />
    )
    }

  const filteredSessions = sessions.filter(
    session => session.Arrived === true && session.LeftCenter === null
    
  );
console.log(filteredSessions)

  const sessionElements = filteredSessions.map(session => (
    <tr key={session.id}>
      <td className="border px-4 py-2">{session.Name}</td>
      <td className="border px-4 py-2">{session.Table}</td>
      <td className="border px-4 py-2">{session.TimeslotFrom}</td>
      <td className="border px-4 py-2">{session.TimeslotTo}</td>
      <td className="border px-4 py-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => updateLeftCenter(session)}
        >
          Left
        </button>
      </td>
    </tr>
  ));
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sessions</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Table</th>
            <th className="px-4 py-2">Timeslot From</th>
            <th className="px-4 py-2">Timeslot To</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>{sessionElements}</tbody>
      </table>
    </div>
  );
  
}
