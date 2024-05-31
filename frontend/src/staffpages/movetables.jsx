import React, { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MoveTables() {
  const [sessions, setSessions] = useState([]);
  const [futureSessions, setFutureSessions] = useState([]); // New state for future sessions
  const [cleanTables, setCleanTables] = useState([]); // New state for tables to be cleaned
  const [nav, setNav] = useState(false);
  const [hoveredTable, setHoveredTable] = useState(null);
  const [tableData, setTableData] = useState([]);


  console.log(futureSessions);

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminData = await DataStore.query(Admin);
      const tableData = adminData[0].TableData;
      setTableData(tableData);
    };

    fetchAdminData();
  }, []);

  const handleTableHover = (table) => {
    setHoveredTable(table);
  };

  const handleTableHoverOut = () => {
    setHoveredTable(null);
  };

  const state = useLocation();
  const locationState = state.state.moveTable;

  useEffect(() => {
    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');

      const todaysSessions = sessionsData.filter(session => 
        session.Date === awsDate && 
        session.Arrived === true && 
        session.LeftCenter === false
      );

      const futureSessionsData = sessionsData.filter(session => {
        const sessionStartTime = new Date(`1970-01-01T${session.TimeslotFrom}:00`);
        const sessionEndTime = new Date(`1970-01-01T${session.TimeslotTo}:00`);
        const currentTime = new Date(`1970-01-01T${format(date, 'HH:mm')}:00`);
      
        return session.Date === awsDate && 
          session.Arrived === false && 
          session.LeftCenter === false &&
          currentTime >= sessionStartTime &&
          currentTime <= sessionEndTime;
      });
      

      const cleanTableSessions = sessionsData.filter(session => 
        session.Date === awsDate && 
        session.Arrived === true && 
        session.LeftCenter === true &&
        session.CleanTable === true &&
        session.TableCleaned === false
      );

      setSessions(todaysSessions);
      setFutureSessions(futureSessionsData); // Set the futureSessions state
      setCleanTables(cleanTableSessions); // Set the cleanTables state
    };

    fetchSessions();
  }, []);

  const navigate = useNavigate();

  const handleTableClick = async (table) => {
    const sessionToUpdate = await DataStore.query(Sessions, locationState.id);

    if (sessionToUpdate) {
      await DataStore.save(
        Sessions.copyOf(sessionToUpdate, updated => {
          updated.Table = table;
        })
      );

      navigate('/Tables');
    } else {
      console.error('Session not found');
    }
  };

  const getTableColor = (session) => {
    const currentTime = format(new Date(), 'HH:mm');
    const sessionStartTime = session.TimeslotFrom.split('-')[0].trim();
    const sessionEndTime = session.TimeslotFrom.split('-')[1].trim();

    if (session.CleanTable === true && session.TableCleaned === false) {
      return 'bg-purple-500 animate-pulse';
    } else if (currentTime >= sessionStartTime && currentTime <= sessionEndTime) {
      return 'bg-blue-500';
    } else {
      return 'bg-red-500';
    }
  };

  return (
    <div className='flex'>
      <div className='w-1/2 flex flex-col items-center justify-center bg-gray-100'>
        <h3 className='text-2xl font-bold mb-5'>Details</h3>
        <p> Name: {locationState.name}</p>
        <p> Table: {locationState.number}</p>
        <p> Guests: {locationState.guests}</p>
        <p> TimeSlot: {locationState.TimeslotFrom} to {locationState.TimeSlotTo}</p>
        <p>Arrived: {locationState.timeArrived}</p>
      </div>
    
      <div className='w-1/2'>
        <div className="grid grid-cols-8 grid-rows-5 gap-4 p-10 border border-color-black" style={{ boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
          {tableData.map((table) => {
            const session = sessions.find(session => session.Table === table.table);
            const futureSession = futureSessions.find(session => session.Table === table.table); // Check if the table is in the futureSessions list
            const cleanTable = cleanTables.find(session => session.Table === table.table); // Check if the table is in the cleanTables list

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
                className={`p-2 ${table.shape === 'square' ? 'w-8 h-8 mt-2 mb-2' : 'w-8 h-8 rounded-full mt-2 mb-2'} 
                ${cleanTable ? 'bg-purple-500 animate-pulse' : futureSession ? 'bg-blue-500' : session ? 'bg-red-500' : 'bg-green-500'}`}
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
                    <span className="text-xs text-gray-500 block mt-5 mb-2">
                      {session ? `${session.TimeslotFrom}-${session.TimeslotTo} (${session.Name})` : 'Table available'}
                    </span>
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
