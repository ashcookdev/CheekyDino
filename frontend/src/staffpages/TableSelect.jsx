import React, { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, Admin } from '../models';
import { format, addHours } from 'date-fns';
import Till from './Till';
import SessionTill from './SessionTill';
import { motion } from 'framer-motion';



let ipcRenderer = null;
if (window && window.process && window.process.type) {
  ipcRenderer = window.require('electron').ipcRenderer;
}





export default function TableSelect({ availableTables, onSelect, details, handleBack }) {
  const [selectedTables, setSelectedTables] = useState([]);
  const [savedDetails, setDetails] = useState(details);
  const [truee, setTrue] = useState(false);
  const [pay, setPay] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [clean, setCleanTables] = useState([]);


  console.log(clean)
console.log(savedDetails)

  useEffect(() => {
    // Feth admin data
    const fetchAdminData = async () => {
      const adminData = await DataStore.query(Admin);
      const tableData = adminData[0].TableData;
      setTableData(tableData);
    };

    fetchAdminData();
  }, []);

   useEffect(() => {
    // Fetch sessions data
    const fetchSessions = async () => {
      const sessionsData = await DataStore.query(Sessions);
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');

      const tablesToBeCleaned = sessionsData.filter(session => 
        session.Date === awsDate && 
        session.Arrived === true && 
        session.LeftCenter === true &&
        session.CleanTable === true &&
        session.TableCleaned === false
      );
      setCleanTables(tablesToBeCleaned); // Set the cleanTables state
    };

    fetchSessions();
  }, []);


  if (truee === true) {
    return <Till />;
  }

  console.log(savedDetails.Name[0].name);
  console.log(savedDetails);

  const handleTableClick = (table) => {
    setSelectedTable(table);

    if (selectedTables.includes(table)) {
      setSelectedTables(selectedTables.filter((t) => t !== table));
      setDetails(details);
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  };

  const handleConfirmClick = async () => {
    try {
      onSelect(selectedTables);

      //get current date
      const date = new Date();
      const awsDate = format(date, 'yyyy-MM-dd');
      const nowString = format(date, 'HH:mm:ss.SSS');

      const twoHoursLater = addHours(date, 2);

      // format the result as a string
      const twoHoursLaterString = format(twoHoursLater, 'HH:mm:ss.SSS');

      console.log(twoHoursLaterString);
      console.log(nowString);
      console.log(savedDetails.TimeslotFrom);

      const children = parseInt(savedDetails.Children);
      const adults = parseInt(savedDetails.Adults);

      // turn twohourslater into a string and remove :ss.SSS

      const emailTime = format(date, 'HH:mm');
      const emailTime2 = format(twoHoursLater, 'HH:mm');

      const name = savedDetails.Name;

      let data = {
        name: name,
        email: savedDetails.Email,
        telephone: savedDetails.Telephone,
        carReg: savedDetails.CarReg,
        table: selectedTables[0].table,
        time: emailTime,
        time2: emailTime2,
        date: awsDate,
        children: children,
        adults: adults,
        total: savedDetails.Total,
      }


      // send to ipc renderer 

      if (ipcRenderer) {
        ipcRenderer.send('show-data', data );
        console.log('sent data');
 
      }
    





      //save to database
      DataStore.save(
        new Sessions({
          Email: savedDetails.Email,
          Number: savedDetails.Number,
          Date: awsDate,
          Name: savedDetails.Name,
          Children: children,
          Adults: adults,
          Table: selectedTables[0].table,
          TimeslotFrom: savedDetails.TimeSlotFrom,
          TimeslotTo: savedDetails.TimeSlotTo,
          Arrived: true,
          LeftCenter: false,
          TimeArrived: nowString,
          Telephone: savedDetails.Telephone,
          TotalSpent: savedDetails.Total,
          Staff: savedDetails.Staff,
          EntranceFee: savedDetails.Total,
          CarReg: savedDetails.CarReg,
          ChildData : savedDetails.ChildData,
        })
      );

      setPay(true);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  let guests = parseInt(savedDetails.Children) + parseInt(savedDetails.Adults);

  if (pay === true) {
    return (
      <SessionTill order={'2 Hour Session'} total={savedDetails.Total} table={selectedTables[0].table} ChildName={savedDetails.Name} />
    );
  }

  const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-cyan-500', 'bg-purple-700', 'bg-gray-500'];


return (
  <div>
    <div className="flex flex-wrap">
      <motion.button
        onClick={handleBack}
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back
      </motion.button>
      <motion.button
        onClick={handleConfirmClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Confirm
      </motion.button>

      <p className="w-full text-center font-bold">Select A Table</p>
      <p className="w-full text-center font-bold">Party Size: {guests} </p>
      <p className="w-full text-center font-bold">Name: {savedDetails.Name} </p>
      <p className="w-full text-center font-bold">Price: £{savedDetails.Total.toFixed(2)} </p>

      {selectedTable && <p className="w-full text-center font-bold">You have selected table number: {selectedTable.table}</p>}
      <motion.div
        className="grid grid-cols-8 grid-rows-5 gap-4 p-10 border-2 border-gray-500 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
   {tableData.map((table) => {
  const isAvailable = availableTables.some((t) => t.table === table.table);
  const isSelected = selectedTables.some((t) => t.table === table.table);

  const needsCleaning = clean.some(cleanTable => cleanTable.Table === table.table && !cleanTable.TableCleaned); // Check if the table needs cleaning

  let tableRow = table.location.y + 1;
  let tableCols = `${table.location.x + 1} / span 1`;

  if (tableRow === 2 || tableRow === 4) {
    // Reverse the order of tables in rows 2 and 4
    const tablesInRow = tableData.filter((t) => t.location.y === tableRow - 1);
    tablesInRow.reverse();
    tableCols = `${tablesInRow[table.location.x].location.x + 1} / span 1`;
  }

  return (
    <motion.button
      key={table.table}
      className={`p-2 ${table.shape === 'square' ? 'w-12 h-12 mt-5 mb-5' : 'w-10 h-10 rounded-full mt-5 mb-5'} 
      ${isAvailable ? (needsCleaning ? 'bg-purple-500' : 'bg-green-500') : 'bg-red-500'} 
      ${isSelected ? 'ring-2 ring-white' : 'ring-2 ring-transparent'}`}
      style={{ gridColumn: tableCols, gridRow: `${tableRow} / span 1`, border: '2px solid gray-300', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => handleTableClick(table)}
    >
      <span className="text-white">{table.table}</span>
      <span className="text-xs text-gray-500 block mt-5 mb-2">{table.capacity} seats</span>
    </motion.button>
  );
})}
</motion.div>
</div>
</div>
);





}