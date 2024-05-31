import React, { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function RestaurantLayout() {
  const [sessions, setSessions] = useState([]);
  const [futureSessions, setFutureSessions] = useState([]); // New state for future sessions
  const [cleanTables, setCleanTables] = useState([]); // New state for tables to be cleaned
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
    const fetchAdmin = async () => {
      const adminData = await DataStore.query(Admin);
      const tableLayout = adminData[0].TableData;

      setTableData(tableLayout);
    }

    fetchAdmin();
  }, []);

  const Navigate = useNavigate();

    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');
      const time = format(date, 'HH:mm');

      console.log(awsDate);

      const todaysSessions = sessionsData.filter(session => session.Arrived === true && session.LeftCenter === false );
      console.log(todaysSessions);
      setSessions(todaysSessions);

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

      setFutureSessions(futureSessionsData); // Set the futureSessions state

      const tablesToBeCleaned = sessionsData.filter(session => 
        session.Arrived === true && 
        session.LeftCenter === true &&
        session.CleanTable === true &&
        session.TableCleaned === false
      );
      console.log(tablesToBeCleaned);
      setCleanTables(tablesToBeCleaned); // Set the cleanTables state
    }

    console.log(futureSessions);



  useEffect(() => {
    const subscription = DataStore.observe(Sessions).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      fetchSessions();
    });

    fetchSessions();

    return () => subscription.unsubscribe();
  }
  , []);

  if (nav === true) {
    Navigate('/Tables');
  }

  return (
    <div className="grid grid-cols-8 grid-rows-5 gap-4 p-10 border border-color-white" style={{ boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
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
        const sessionTimeslot = session? session.TimeslotFrom : '';
        const sessionTimeslotTo = session? session.TimeslotTo : '';

        return (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={table.table}
            className={`p-2 ${table.shape === 'square' ? 'w-8 h-8 mt-2 mb-2' : 'w-8 h-8 rounded-full mt-2 mb-2'} 
            ${cleanTable ? 'bg-purple-500 animate-pulse' : futureSession ? 'bg-blue-500' : session ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ gridColumn: tableCols, gridRow: `${tableRow} / span 1`, border: '2px solid gray-300', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}
            onClick={() => setNav(true)}
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
  );
}

export default RestaurantLayout;
