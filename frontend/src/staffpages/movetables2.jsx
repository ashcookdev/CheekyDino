import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import { format, addHours } from 'date-fns';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { id } from 'date-fns/locale';
import { useState, useEffect } from 'react';


function MoveTables() {
  const [sessions, setSessions] = useState([]);
  const [nav, setNav] = useState(false);
  const [hoveredTable, setHoveredTable] = useState(null);
  const [tableData, setTableData] = useState([]);



  const handleTableHover = (table) => {
    setHoveredTable(table);
  };

  const handleTableHoverOut = () => {
    setHoveredTable(null);
  };


  useEffect(() => {
    // Feth admin data
    const fetchAdminData = async () => {
      const adminData = await DataStore.query(Admin);
      const tableData = adminData[0].TableData;
      setTableData(tableData);
    };

    fetchAdminData();
  }, []);
    

  const state = useLocation();
const locationState = state.state.state;

  console.log(locationState);

  useEffect(() => {
    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');
      const futureSessions = sessionsData.filter(session => session.Date > awsDate && session.Arrived === true && session.LeftCenter === false);
      const currentSessions = sessionsData.filter(session => session.Date === awsDate && session.Arrived === true && session.LeftCenter === false);
      setSessions([...futureSessions, ...currentSessions]);
    };

    fetchSessions();
  }, []);


  const navigate = useNavigate();

  const handleTableClick = async (table) => {
    // Fetch the session with the given id from locationState
    const sessionToUpdate = await DataStore.query(Sessions, locationState.id);
    const currentTime = new Date();
  const formattedTime = format(currentTime, 'HH:mm');
  const arrivalTime = format(currentTime, 'HH:mm:ss.SSS')  
  const twoHoursLater = addHours(currentTime, 2);
  const formattedTwoHoursLater = format(twoHoursLater, 'HH:mm');


    // Check if the session exists
    if (sessionToUpdate) {
      // Update the session's table number in the DataStore
      await DataStore.save(
        Sessions.copyOf(sessionToUpdate, updated => {
          updated.Table = table;
          updated.Arrived = true;
            updated.TimeslotFrom = formattedTime;
            updated.TimeslotTo = formattedTwoHoursLater;
            updated.TimeArrived = arrivalTime;
            updated.LeftCenter = false;

        })
      );

      // Navigate back to /Tables
      navigate('/prebooktill2', { 
        state: { 
          order: '2 Hour Session', 
          total: locationState.TotalSpent, 
          table: locationState.Table,  
          ChildName: locationState.Name,
          id: locationState.id,
        } 
      });    } else {
      console.error('Session not found');
    }
  };
  

  return (
      <div className='flex'>
        <div className='w-1/2 flex flex-col items-center justify-center bg-gray-100'>
          <h3 className='text-2xl font-bold mb-5'>Details</h3>
          <p> Name: {locationState.Name}</p>
          <p> Table: {locationState.Table}</p>
          <p> TimeSlot: {locationState.TimeslotFrom} to {locationState.TimeslotTo}</p>
          <p> Guests: {Number(locationState.Children) + Number(locationState.Adults) }</p>
        </div>
    
        <div className='w-1/2'>
    <div className="grid grid-cols-8 grid-rows-5 gap-4 p-10 border border-color-black" style={{ boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
      {tableData.map((table) => {
        const session = sessions.find(session => session.Table === table.table);
        const isAvailable = !session;
        const isEndingSoon = session && (new Date(session.TimeslotTo) - new Date()) <= 600000; // 10 minutes in milliseconds
        const isFutureSession = session && session.Date > format(new Date(), 'yyyy-MM-dd');

        let tableRow = table.location.y + 1;
        let tableCols = `${table.location.x + 1} / span 1`;

        if (tableRow === 2 || tableRow === 4) {
          const tablesInRow = tableData.filter(t => t.location.y === tableRow - 1);
          tablesInRow.reverse();
          tableCols = `${tablesInRow[table.location.x].location.x + 1} / span 1`;
        }

        const sessionName = session ? session.Name : '';
        const sessionTimeslot = session ? session.TimeslotFrom : '';
        const sessionTimeslotTo = session ? session.TimeslotTo : '';
        const sessionEmail = session ? session.Email : '';

        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={table.table}
            className={`p-2 ${table.shape === 'square' ? 'w-12 h-12 mt-5 mb-5' : 'w-10 h-10 rounded-full mt-5 mb-5'} 
            ${isEndingSoon ? 'bg-red-500 animate-pulse' : isAvailable ? (isFutureSession ? 'bg-blue-500' : 'bg-green-500') : 'bg-red-500'}`}
            style={{ gridColumn: tableCols, gridRow: `${tableRow} / span 1`, border: '2px solid gray-300', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}
            onClick={() => handleTableClick(table.table)}
            onMouseEnter={() => handleTableHover(table.table)}
            onMouseLeave={() => handleTableHoverOut()}
          >
            <div className="table-info">
              <span className="text-white">{table.table}</span>
            </div>
            <div className="timeslot-info">
              {hoveredTable === table.table && (
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 block mt-5 mb-2">Capacity: {table.capacity}</span>
                  <span className="text-xs text-gray-500 block mb-2">TimeSlot: {sessionTimeslot} to {sessionTimeslotTo}</span>
              
                </div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  </div>
  </div>

  );
}

export default MoveTables;
