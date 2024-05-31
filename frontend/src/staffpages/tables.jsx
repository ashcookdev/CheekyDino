import { useState, useEffect, useRef } from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { Sessions } from '../models';
import { isToday, format, differenceInMinutes, parse, parseISO } from 'date-fns';
import { CafeOrder } from '../models';
import './progress.css'
import { useNavigate } from 'react-router-dom';
import { Messages } from '../models'; // Import the Messages model
import { ArrowDownIcon, CogIcon } from '@heroicons/react/20/solid';
import { get, set } from 'lodash';
import FutureOnlineBookings from './futureonlinebookings';
import TablesCleaned from './tablescleaned';
import TableLayout from './tablelayout';
import TableStats from './tablestats';
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dialog } from '@headlessui/react'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')

}


// check if the app is running in electron

// check if the app is running in electron

// let ipcRenderer = null;

// if (window.require) {
//   ipcRenderer = window.require('electron').ipcRenderer;
// }

// if (ipcRenderer) {
//   console.log('Running in electron');
// } else {
//   console.log('Running in browser');



// Define the function outside of useEffect






function OccupiedTables() {
  const [sessions, setSessions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [moveTable, setMoveTable] = useState([]);
  const [moveState, setMoveState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [till, setTill] = useState(null);
  const [moreGuests, setMoreGuests] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [ordersTable, setOrdersTable] = useState([]);
  const [reload, setReload] = useState(false);
  const [mistake, setMistake] = useState([]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(true)


  const cancelButtonRef = useRef(null)


  // use effect to get mainWindow.webContents.send to call the getTodaysBookings function

  

  let ipcRenderer = null;
  if (window.require) {
    ipcRenderer = window.require('electron').ipcRenderer;
  }
  
//   setInterval(async () => {
//     try {
//         const response = await axios.post('https://4hf63t8se0.execute-api.eu-west-2.amazonaws.com/default/livesessionupdates');
        
//         // Log the entire response
//         console.log(response);

//         const data = response.data;

//         // Check if there's a new update
//         if (data && data.message === 'DynamoDB table has been updated') {
//             console.log('New update');
//             getTodaysBookings();
//         } else {
//             console.log('No new updates');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }, 30000);  // Poll every 15 seconds







  const navigate = useNavigate();

  useEffect(() => {
    if (moveState) {
      const state = { moveTable };
      navigate('/movetable', { state });
    }
  }, [moveState, moveTable, navigate]);
  console.log('moveTable:', moveTable);


  useEffect(() => {
    if (moreGuests) {
      const state = { till };
      navigate('/addguestbookings', { state });
    }
  }, [moreGuests, till, navigate]);


// Define the function outside of useEffect
const getTodaysBookings = async () => {
  try {
    const sessions = await DataStore.query(Sessions);
    const today = format(new Date(), 'yyyy-MM-dd');

    // Filter the sessions array to only include sessions for today
    const todaysBookings = sessions.filter(
      (session) => session.Date === today && session.Arrived === true && session.LeftCenter === false
    );

    const mistakeBookings = sessions.filter(
      (session) => session.Date === today && session.Arrived === true && session.LeftCenter === true)

      setMistake(mistakeBookings)

    // Update sessions state directly within useEffect
    setSessions(todaysBookings);
  } catch (error) {
    console.error('Error getting today\'s bookings:', error);
  }
};




useEffect(() => {
  const subscription = DataStore.observe(Sessions).subscribe(msg => {
    if (msg.opType === 'UPDATED' || msg.opType === 'CREATED') {
      // Update for both insertions (CREATED) and updates (UPDATED)
      getTodaysBookings();
    }
  });

  (async () => {
    await getTodaysBookings(); // Fetch initial data
  })();

  return () => subscription.unsubscribe();
}, [reload]);







  // Filter the sessions array to only include occupied tables


  // Map the occupiedTables array to create a new array with the desired information for each table
  const tableInfo = sessions.map((table) => {
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
      sessionSpend: table.EntranceFee,
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
    

    


    setLoading(true);

    // get all records from the Sessions model and then if its before today and Arrived and LeftCenter are false, set as NoShow === true

   

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

// get todays date using date-fns

  
    // Update the LeftCenter field for the matching record
    await DataStore.save(
      Sessions.copyOf(record, (updated) => {
        updated.LeftCenter = true;
        updated.TimeLeft = format(new Date(), 'HH:mm:ss.SSS');
        updated.CleanTable = true;
        updated.TableCleaned = false;
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

// set a timer to setLoading(false) after 3 seconds and reload the page

setTimeout(() => {
  setLoading(false);
getTodaysBookings();
}, 3000);
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

    const asyncFunction = async () => {
      // get cafe orders 
      const cafeOrders = await DataStore.query(CafeOrder);
    
      // filter for all orders that have not been delivered
      const undeliveredOrders = cafeOrders.filter((order) => order.Delieved === false && order.Completed === true);
    
      console.log('undeliveredOrders:', undeliveredOrders);
    
      // get the current time
      const currentTime = new Date();
    
      // iterate over each undelivered order
      for (const order of undeliveredOrders) {
        // parse the updatedAt date
        const updatedAt = parseISO(order.updatedAt);
    
        // get the difference between the current time and the updatedAt time
        const difference = differenceInMinutes(currentTime, updatedAt);
    
        // if the difference is greater than 10 minutes, set the order to Delivered
        if (difference > 10) {
          const save = await DataStore.save(
            CafeOrder.copyOf(order, (updated) => {
              updated.Delieved = true;
              updated.TimeDelivered = format(new Date(), 'HH:mm');
            })
          );
          console.log('save:', save);
        }
      }
    };
    


    asyncFunction();


  
    return () => subscription.unsubscribe();
  }, [sessions]);



    // get current time and format to 


    const handleSelection = async (selectedOption) => {
      try {
        setSelected(selectedOption); // Update selected state
        // Fetch the record from AWS Datastore based on selectedOption.id and perform necessary operations
        const recordToUpdate = await DataStore.query(Sessions, selectedOption.id);
        // Update the record with new info
        // For example:
        await DataStore.save(Sessions.copyOf(recordToUpdate, (updated) => {
          updated.LeftCenter = false; 
          updated.TimeLeft = null;
        }));
        getTodaysBookings();
      } catch (error) {
        console.error('Error updating record:', error);
      }
    };
  
  

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
    setReload(true);
  };
  

  

console.log(tableInfo.id)


const sortedTableInfo = [...tableInfo].sort((a, b) => {
  // Convert timeArrived strings to Date objects for comparison
  const dateA = new Date(`1970-01-01T${a.timeArrived}:00`);
  const dateB = new Date(`1970-01-01T${b.timeArrived}:00`);
  
  // Compare the Date objects
  return dateA - dateB;
});

async function handleOrders(event, table) {
  // Prevent event propagation
  event.stopPropagation();

  console.log(table)
  try {
    // Only fetch orders if they haven't been fetched yet
    if (!openOrders[table.id]) {
      const cafe = await DataStore.query(CafeOrder);
      // Filter orders based on the session ID of the provided table
      const sessionCafe = cafe.filter((c) => c.Sessionid === table.id);
      console.log(sessionCafe);
      setOrdersTable(sessionCafe);
      // Set openOrders for this table to true
      setOpenOrders(prevState => ({ ...prevState, [table.id]: true }));
    }
  } catch (error) {
    console.error('Error handling orders:', error);
  }
}


  return (
    <div className= "mt-5">

     

    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
       <TableStats />
        <div className="mt-5 mb-5">
        <TableLayout />
        </div>
      </div>
    </div>
    <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-blue-600 sm:truncate sm:text-3xl sm:tracking-tight text-center">
          Future Sessions
        </h2>
      </div>
      <div className="mt-5 mb-5">
      <FutureOnlineBookings />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-red-600 sm:truncate sm:text-3xl sm:tracking-tight text-center">
          Turn Around Tables
        </h2>
      </div>
      <div className="mt-5 mb-5">
      <TablesCleaned /> 
      </div>

      <div className="md:flex md:items-center md:justify-between mb-5">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-green-700 sm:truncate sm:text-3xl sm:tracking-tight text-center">
          Occupied Tables
        </h2>
        <Listbox value={selected} onChange={handleSelection}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Bring Back</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">Table: {selected.Table}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {mistake.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person.Table}- {person.Name}- {person.TimeLeft}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
      </div>

     

     
    </div>
    <ul className='mt-5 mb-5'>
    
      
      
      
    {sortedTableInfo.map((table) => (
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
              Entrance Fee: £{table.sessionSpend}
            </p>
            <button 
  onMouseEnter={(event)=> {handleOrders(event, table)}} 
  onMouseLeave={()=> {setOpenOrders(prevState => ({ ...prevState, [table.id]: false }))}}
  className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
  </button>


{openOrders[table.id] && (
  <div className="flex w-96 bg-white shadow-md p-4 rounded-md">
    <ul>
      {ordersTable.map((order, index) => (
        <li key={index} className="mt-4">
          
          <h4 className="text-md font-semibold text-gray-900">
            Order {index + 1}
          </h4>

          

          <p className="text-sm font-medium text-gray-900">
            Hot Items: {order.HotItems.join(', ')}
          </p>
          <p className="text-sm font-medium text-gray-900">
            Drink Items: {order.DrinkItems.join(', ')}
          </p>
          <p className="text-sm font-medium text-gray-900">
            Total Spent: £{order.Total}
          </p>

          </li>
        ))}
      </ul>
    </div>
  )}


<p className="text-sm font-medium text-white">
              Time Slot: {table.TimeslotFrom} - {table.TimeSlotTo}
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
  <CogIcon className="h-20 w-20 text-white animate-spin " aria-hidden="true" />
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
    <button
      type="button"
      onClick={() => setMoreGuests(true) || setTill(table)} 
      className="inline-flex items-center gap-x-2 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      Add Guests
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
      <div key={index} className="bg-white shadow-md p-4 m-4 rounded-md">
        <h4 className="sr-only">Status</h4>
        <p className="text-sm font-medium text-gray-900">Order {index + 1}</p>
        <p className="text-sm font-medium text-gray-900">Status: {status}</p>
        <ol className="text-sm font-medium text-gray-900">
          <li>
            <strong>Hot Items:</strong>
            <ul>
              {order.HotItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </li>
          <li>
            <strong>Drink Items:</strong>
            <ul>
              {order.DrinkItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </li>
        </ol>
        <p className="text-sm font-italic text-red-500">
          Order Notes: {order.Notes}
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