import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { isToday, format, differenceInMinutes, parse } from 'date-fns';
import TableData from './TableData.json';
import CafeOrderProgress from './CafeOrderProgress';

function OccupiedTables() {
  const [sessions, setSessions] = useState([]);
  const [selectedTable, setSelectedTable] = useState({});



  useEffect(() => {
    async function getTodaysBookings() {
      const sessions = await DataStore.query(Sessions);
      const todaysBookings = sessions.filter((session) =>
        isToday(new Date(session.Date))
      );
      setSessions(todaysBookings);
    }
  
    // observe the table for changes
    const subscription = DataStore.observe(Sessions).subscribe(() =>
      getTodaysBookings()
    );
  
    getTodaysBookings();
  
    return () => subscription.unsubscribe();
  }, []);
  


  

  // Filter the sessions array to only include occupied tables
  const occupiedTables = sessions.filter(
    (session) => session.Arrived === true && session.LeftCenter === false
  );

  // Map the occupiedTables array to create a new array with the desired information for each table
  const tableInfo = occupiedTables.map((table) => {
    // Parse the TimeslotFrom, TimeslotTo, and TimeArrived values into Date objects
    const timeslotFromDate = parse(table.TimeslotFrom, 'HH:mm', new Date());
    const timeslotToDate = parse(table.TimeslotTo, 'HH:mm', new Date());
    const timeArrived = parse(table.TimeArrived, 'HH:mm:ss.SSS', new Date());

    // Calculate the time remaining in minutes
    const timeRemaining = differenceInMinutes(timeslotToDate, new Date());

    // Determine the background color based on the time remaining
    let backgroundColor;
    if (timeRemaining > 60) {
      backgroundColor = 'bg-green-500';
    } else if (timeRemaining > 30) {
      backgroundColor =
        'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500';
    } else if (timeRemaining > 10) {
      backgroundColor = 'bg-gradient-to-r from-yellow-500 to-red-500';
    } else {
      backgroundColor = 'bg-red-500';
    }

    // Determine if the table should flash gold
    const shouldFlashGold = timeRemaining <= 10;

    return {
      number: table.Table,
      name: table.Name,
      guests: table.Adults + table.Children,
      orders: table.Orders,
      totalSpent: table.TotalSpent,
      timeslot: `${format(timeslotFromDate, 'HH:mm')} - ${format(
        timeslotToDate,
        'HH:mm'
      )}`,
      timeArrived: format(timeArrived, 'HH:mm'),
      timeRemaining,
      backgroundColor,
      shouldFlashGold,
    };
  });

  async function handleLeftCenter(table) {
    // Retrieve the records with the matching id
    const records = await DataStore.query(Sessions, table.id);
  
    if (!records || records.length === 0) {
      console.error('Record not found:', table.id);
      return;
    }
  
    // Update the LeftCenter field for all matching records
    for (const record of records) {
      await DataStore.save(
        Sessions.copyOf(record, (updated) => {
          updated.LeftCenter = true;
        })
      );
    }
    window.location.reload();
  }
  
  
  
  
  async function handleMoveTable(table) {
    // Get all sessions
    const sessions = await DataStore.query(Sessions);

    // Filter the sessions array to only include sessions with the same time frame as the given table
    const matchingSessions = sessions.filter(
      (session) =>
        session.TimeslotFrom === table.TimeslotFrom &&
        session.TimeslotTo === table.TimeslotTo
    );

    // Get all occupied tables
    const occupiedTables = matchingSessions.map((session) => session.Table);

    // Get all available tables
    const availableTables = TableData.filter(
      (t) => !occupiedTables.includes(t.number)
    );

    // Show the dropdown menu for the selected table
    setSelectedTable({ [table.Table]: availableTables });
  }


  async function handleMoveTableConfirm(table, newTableNumber) {
    // Retrieve the records with the matching id
    const records = await DataStore.query(Sessions, table.id);
  
    if (!records || records.length === 0) {
      console.error('Record not found:', table.id);
      return;
    }
  
    // Update the Table field for all matching records
    for (const record of records) {
      await DataStore.save(
        Sessions.copyOf(record, (updated) => {
          updated.Table = parseInt(newTableNumber);
        })
      );
    }
  
    // Hide the dropdown menu
    setSelectedTable({});
    window.location.reload()
  }
  
  

  return (
    <ul>
      {tableInfo.map((table) => (
        <li
          key={table.number}
          className={`p-4 rounded-lg shadow-md ${table.backgroundColor} ${table.shouldFlashGold ? 'animate-pulse' : ''
            }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-lg font-bold">{table.number}</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold text-white">Table {table.number}</p>
              <p className="text-sm font-medium text-white">Name: {table.name}</p>
              <p className="text-sm font-medium text-white">Guests: {table.guests}</p>
              <p className="text-sm font-medium text-white">Orders: {table.orders}</p>
              <p className="text-sm font-medium text-white">
                Total Spent: £{table.totalSpent}
              </p>
              <p className="text-sm font-medium text-white">
                Booked for {table.timeslot}
              </p>
              <p className="text-sm font-medium text-white">
                Time Arrived: {table.timeArrived}
              </p>
              <p className="text-sm font-medium text-white">
                Time Remaining: {table.timeRemaining} minutes
              </p>
            </div>
            <div className="ml-auto flex-shrink-0 flex items-center space-x-4">
              <CafeOrderProgress cafeOrderId={table.id}  />
            </div>
            <div className="ml-auto flex-shrink-0 flex items-center space-x-4">
              <button
                type="button"
                onClick={() => handleLeftCenter(table)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Left Center
              </button>
              {!selectedTable[table.Table] ? (
                <button
                  type="button"
                  onClick={() => handleMoveTable(table)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Move Table
                </button>
              ) : (
                <>
                  <select
  value={selectedTable[table.Table]}
  onChange={(e) =>
    handleMoveTableConfirm(table, e.target.value)
  }
  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
>
  <option value="">Select a table</option>
  {selectedTable[table.Table].map((t) => (
    <option key={t.table} value={t.table}>
      Table {t.table} ({t.capacity} seats)
    </option>
  ))}
</select>

                  <button
                    type="button"
                    onClick={() => setSelectedTable({})}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default OccupiedTables;