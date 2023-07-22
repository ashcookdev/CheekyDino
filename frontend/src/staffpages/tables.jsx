import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { isToday, format, differenceInMinutes, parse } from 'date-fns';
import TableData from './TableData.json';
import { CafeOrder } from './models';
import './progress.css'

function OccupiedTables() {
  const [sessions, setSessions] = useState([]);
  const [selectedTable, setSelectedTable] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});


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
          updated.TimeLeft = format(new Date(), 'HH:mm:ss.SSS');
        })
      );
    }
    window.location.reload();
  }




  async function handleMoveTable(table) {
    console.log("handleMoveTable called with table:", table);

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
      (t) => !occupiedTables.includes(t.table)
    );

    // Show the dropdown menu for the selected table
    setSelectedTable({ [table.number]: availableTables });
  }

  async function handleMoveTableConfirm(table, newTableNumber) {
    // Retrieve the records with the matching id
    const records = await DataStore.query(Sessions, table.id);

    if (!records || records.length === 0) {
      console.error("Record not found:", table.id);
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
  }


  useEffect(() => {
    async function getCafeOrders() {
      const cafeOrders = [];
      for (const session of sessions) {
        const allCafeOrders = await DataStore.query(CafeOrder);
        const sessionCafeOrders = allCafeOrders.filter(
          (c) => c.Sessionid === session.id
        );
        cafeOrders.push(...sessionCafeOrders);
      }
      console.log(cafeOrders);
      setOrders(cafeOrders);
    }
    getCafeOrders();
  
    const subscription = DataStore.observe(CafeOrder).subscribe((msg) => {
      getCafeOrders();
    });
  
    return () => subscription.unsubscribe();
  }, [sessions]);
  
  
  

  useEffect(() => {
    const newOrderStatuses = {};
    for (const order of orders) {
      let status = '';
      console.log('order.Delieved:', order.Delieved, 'order.Complete:', order.Completed); // <-- added console log here
      if (order.Delieved === false && order.Completed === false) {
        status = 'Cooking';
      } else if (order.Completed === true && order.Delieved === false) {
        status = 'Take Order to Table';
      } else if (order.Delieved === true && order.Completed === true) {
        status = 'Delivered';
      }
      newOrderStatuses[order.id] = status;
    }
    setOrderStatuses(newOrderStatuses);
    console.log('newOrderStatuses:', newOrderStatuses);
  }, [orders]);
  
const Delivered = async (order) => {
  console.log('Delivered function called');
  console.log('table:', order.id);
  const records = await DataStore.query(CafeOrder, order.id);
  console.log('records:', records);

  const save = await DataStore.save(
    CafeOrder.copyOf(records, (updated) => {
      updated.Delieved = true;
      updated.TimeDelivered = format(new Date(), 'HH:mm');
    })
  );
  console.log('save:', save);

  
   
  window.location.reload();
};






  return (
    <ul>
    {tableInfo.map((table) => (
      <li
        key={table.number}
        className={`p-4 rounded-lg shadow-md ${table.backgroundColor} ${
          table.shouldFlashGold ? "animate-pulse" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <span className="text-lg font-bold">{table.number}</span>
            </div>
          </div>
          <div className="ml-0 sm:ml-4">
            <p className="text-lg font-semibold text-white">
              Table {table.number}
            </p>
            <p className="text-sm font-medium text-white">Name: {table.name}</p>
            <p className="text-sm font-medium text-white">
              Guests: {table.guests}
            </p>
            <p className="text-sm font-medium text-white">
              Orders: {table.orders}
            </p>
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
  
          <div className="ml-auto flex-shrink-0 flex items-center space-x-4 mt-4 sm:mt-0">
          <button
      type="button"
      onClick={() => handleLeftCenter(table)}

      className="inline-flex items-center gap-x-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Left Center
    </button>
    <button
  type="button"
  onClick={() => {    console.log("Move Table button clicked with table:", table);
  handleMoveTable(table)}}
  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  Move Table
</button>

{Object.entries(selectedTable).map(([tableNumber, availableTables]) => (
        <div key={tableNumber}>
          <label htmlFor={`table-${tableNumber}`}>
            Move table {tableNumber} to:
          </label>
          <select
            id={`table-${tableNumber}`}
            onChange={(e) =>
              handleMoveTableConfirm(tableNumber, e.target.value)
            }
          >
            <option value="">Select a table</option>
            {availableTables.map((table) => (
              <option key={table.table} value={table.table}>
                {table.table}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>

          </div>
  
        {orders.map((order, index) => {
          const status = orderStatuses[order.id] || "";
          let progress = 0;
          let color = "bg-green-500";
          if (status === "Cooking") {
            progress = 50;
            color = "bg-purple-800";
          } else if (status === "Take Order to Table") {
            progress = 75;
            color = "bg-purple-900";
          } else if (status === "Delivered") {
            progress = 100;
            color = "bg-green-500";
          }
          return (
            <div
              key={index}
              className="bg-white shadow-md p-4 m-4 rounded-md"
            >
              <h4 className="sr-only">Status</h4>
              <p className="text-sm font-medium text-gray-900">
                Order {index + 1}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {" "}
                Status: {status}
              </p>
              <p className="text-sm font-medium text-gray-900">
                Order{order.length}: {order.HotItems} + {order.ColdItems}
              </p>
              <p className="text-sm font-medium text-gray-900">
                Time Created {order.CreatedTime}
              </p>
              <p className="text-sm font-medium text-gray-900">
                Time Delivered: {order.TimeDelivered}
              </p>
  {status === "Take Order to Table" && (
    
  
  
    <button
    type="button"
    onClick={() => Delivered(order)}
    className="inline-flex items-center gap-x-2 rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Delivered 
  </button>
  )}

              {status !== "Delivered" && (
                <div className="mt-6" aria-hidden="true">
                  <div className="overflow-hidden rounded-full bg-blue-200">
                    <div
                      className={`h-2 rounded-full ${color} animate-pulse transition-all duration-500 ease-in-out progress-bar`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-6 text-sm font-medium text-gray-600">
                    {status}
                  </div>
                
                </div>
              )}
            </div>
          );
        })}
      </li>
     

    ))}
  </ul>
 
  

  
  );
}
export default OccupiedTables;