import { useState, useEffect } from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { Sessions } from '../models';
import { isToday, format, differenceInMinutes, parse } from 'date-fns';
import { CafeOrder } from '../models';
import './progress.css'
import { useNavigate } from 'react-router-dom';
import { Messages } from '../models'; // Import the Messages model
import { CogIcon } from '@heroicons/react/20/solid';






function OccupiedTables() {
  const [sessions, setSessions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [moveTable, setMoveTable] = useState([]);
  const [moveState, setMoveState] = useState(false);
  const [loading, setLoading] = useState(false);


  
  useEffect(() => {

    const interval = setInterval(() => {
        window.location.reload();
    }
        , 120000);
    return () => clearInterval(interval);
}, []);



  let ipcRenderer = null;
  if (window.require) {
    ipcRenderer = window.require('electron').ipcRenderer;
  }
  

  const navigate = useNavigate();

  useEffect(() => {
    if (moveState) {
      const state = { moveTable };
      navigate('/movetable', { state });
    }
  }, [moveState, moveTable, navigate]);
  console.log('moveTable:', moveTable);


  useEffect(() => {
    async function getTodaysBookings() {
      const today = new Date();
      const sessions = await DataStore.query(Sessions);
      console.log(sessions);
      const todaysBookings = sessions.filter((session) => {
        const sessionDate = new Date(session.Date);
        return sessionDate.toISOString().slice(0, 10) === today.toISOString().slice(0, 10);
      });
      console.log(todaysBookings);
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

  console.log('occupiedTables:', occupiedTables);

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
      id: table.id,
      number: table.Table,
      name: table.Name,
      guests: table.Adults + table.Children,
      orders: table.Orders,
      totalSpent: table.TotalSpent,
      TimeslotFrom: `${format(timeslotFromDate, 'HH:mm')}`,
      TimeSlotTo: `${format(timeslotToDate, 'HH:mm')}`,
      timeslot: `${format(timeslotFromDate, 'HH:mm')}
       - ${format(
        timeslotToDate,
        'HH:mm'
      )}`,
      timeArrived: format(timeArrived, 'HH:mm'),
      timeRemaining,
      backgroundColor,
      shouldFlashGold,
    };
  });


  async function handleLeftCenter(event, table) {
    event.preventDefault();

    // if electron is running, send a message to the main process to exit the app
    


    

  
    // Retrieve all records
    const records = await DataStore.query(Sessions, Predicates.ALL);
  
    // Find the record with the matching table number, Arrived === true, and LeftCenter === false
    const record = records.find(
      (c) =>
        c.Table === table.number && c.Arrived === true && c.LeftCenter === false
    );
  
    if (!record) {
      console.error('Record not found:', table.number);
      return;
    }

    //find all cafe orders
    const allCafeOrders = await DataStore.query(CafeOrder);
    const sessionCafeOrders = allCafeOrders.filter(
      (c) => c.Sessionid === record.id
    );
    console.log(sessionCafeOrders);

    

  
    // Update the LeftCenter field for the matching record
    await DataStore.save(
      Sessions.copyOf(record, (updated) => {
        updated.LeftCenter = true;
        updated.TimeLeft = format(new Date(), 'HH:mm:ss.SSS');
      })
    );
  
    // Save a new message in the Messages model
    await DataStore.save(
      new Messages({
        content: `Table ${table.number} has left the center, please clean the table.`,
        createdAt: format(new Date(), 'HH:mm:ss.SSS'),
        group: ['Staff', 'Team Leader', 'Admin', 'Developer'],
        email: 'Front Desk',
        sessionID: record.id,
        
      })
    );

    const emailData = {
      email: record.Email,
      name: record.Name,
      date: record.Date,
      timeslot: `${record.TimeslotFrom} - ${record.TimeslotTo}`,
      table: record.Table,
      telephone: record.Telephone,
      adults: record.Adults,
      children: record.Children,
      bookingID: record.id,
      total: record.TotalSpent,
hotItems: sessionCafeOrders.map((item) => item.HotItems),
drinks: sessionCafeOrders.map((item) => item.DrinkItems),
orders: sessionCafeOrders.map((item) => item.length),

  }

  fetch('https://qx2adew2ha.execute-api.eu-west-2.amazonaws.com/LeftCenter', {
      method : 'POST',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('There was an error!', error));
  
    window.location.reload();
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
    setLoading(true);
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
    
    // find message that matches the order id and set FoodDelivered to true and FoodReady to true
    const message = await DataStore.query(Messages);
    const messageToSave = message.filter((message) => message.orderID === order.id);
    console.log(order.id)
    console.log(messageToSave)
    console.log('message:', message);
    const saveMessage = await DataStore.save(
      Messages.copyOf(messageToSave[0], (updated) => {
        updated.delivered = true;
        updated.FoodReady = true;
      })
    );
    console.log('saveMessage:', saveMessage);
  
    console.log('save:', save);
  
    // Set loading to false after data has been added to the DataStore
    setLoading(false);
  };
  

  

console.log(tableInfo.id)





  return (
    <div className= "mt-5">
      <div className="md:flex md:items-center md:justify-between mb-5">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center">
          Occupied Tables
        </h2>
      </div>
  


     
    </div>
    <ul className='mt-5 mb-5'>
    {tableInfo.map((table) => (
      <li
        key={table.number}
        className={`p-4 rounded-lg mt-5 shadow-md ${table.backgroundColor} ${
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
            <p className="text-lg font-semibold text-white">
            </p>
            <p className="text-sm font-medium text-white">Name: {table.name}</p>
            <p className="text-sm font-medium text-white">
              Guests: {table.guests}
            </p>
            <p className="text-sm font-medium text-white">
              Orders: {table.orders}
            </p>
            <p className="text-sm font-medium text-white">
              Total Spent: £{table.totalSpent.toFixed(2)  }
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
          {loading && (
// Add a loading spinner
<div className="ml-auto flex-shrink-0 flex items-center space-x-4 mt-4 sm:mt-0">
  <CogIcon className="h-5 w-5 animate-spin" aria-hidden="true" />
</div>
)}
  
          <div className="ml-auto flex-shrink-0 flex items-center space-x-4 mt-4 sm:mt-0">
          <button
      type="button"
 onClick={(event) => {
    console.log('table:', table);
    handleLeftCenter(event, table);
  }}
      className="inline-flex items-center gap-x-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Left Center
    </button>
<button
      type="button"
      onClick={() => setMoveTable(table)|| setMoveState(true)}
      className='inline-flex items-center gap-x-2 rounded-md bg-purple-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    >
      Move Table
    </button>


   



</div>



          </div>
  
         {orders
      .filter((order) => order.Table === table.number && order.Delieved === false)
      .map((order, index) => {
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
                Order{order.length}: {order.HotItems} + {order.DrinkItems}
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
    className="inline-flex items-center gap-x-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
</div>
  
 
  

  
  );
}
export default OccupiedTables;