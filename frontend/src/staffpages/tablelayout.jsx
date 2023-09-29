import React, { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import tableData from './TableData.json';

function RestaurantLayout() {
  const [sessions, setSessions] = useState([]);
  const [nav, setNav] = useState(false);
  const [hoveredTable, setHoveredTable] = useState(null);

  const handleTableHover = (table) => {
    setHoveredTable(table);
  };
  
  // Add a function to handle hovering out of a table
  const handleTableHoverOut = () => {
    setHoveredTable(null);
  };
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');
      const todaysSessions = sessionsData.filter(session => session.Date === awsDate && session.Arrived === true && session.LeftCenter === false);
      setSessions(todaysSessions);
    }

    fetchSessions();
  }, []);

  if (nav === true) {
    Navigate('/Tables');
  }

  return (
<div className="grid grid-cols-8 grid-rows-5 gap-4 p-10 border border-color-black" style={{ boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>      {tableData.map((table) => {
        const session = sessions.find(session => session.Table === table.table);
        const isAvailable = !session;
        const isEndingSoon = session && (new Date(session.TimeslotTo) - new Date()) <= 600000; // 10 minutes in milliseconds

        let tableRow = table.location.y + 1;
        let tableCols = `${table.location.x + 1} / span 1`;

        if (tableRow === 2 || tableRow === 4) {
          // Reverse the order of tables in rows 2 and 4
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
          className={`p-2 ${table.shape === 'square' ? 'w-12 h-12 mt-5 mb-5' : 'w-10 h-10 rounded-full mt-5 mb-5'} 
          ${isEndingSoon ? 'bg-red-500 animate-pulse' : isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
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