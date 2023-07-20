import { useState, useEffect } from "react";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Sessions } from "./models";
import {CafeOrder, Messages} from "./models";
import { format, formatDistanceToNow, parse } from "date-fns";
import { MoveTableDropdown } from "./MoveTableDropdown";
import TableProgress from "./tableprogress.jsx";

function Table({
  number,
  isBooked,
  timeslot,
  remainingTime,
  onConfirmClick,
  name,
  guests,
  orders,
  total,
  sessionid,
  onMoveClick, // add this line
  


}) {
  const [isLast10Minutes, setIsLast10Minutes] = useState(false);
  const [cafeOrders, setCafeOrders] = useState([]);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [progressBarText, setProgressBarText] = useState('');
  const [session, setSession] = useState([]);

  console.log("sessionid:", sessionid);

  useEffect(() => {
    setSession(sessionid);
  }, [sessionid]);


  useEffect(() => {
    if (isLast10Minutes) {
      // Save a message to your AWS DataStore with the table number and sessionID
      DataStore.save(
        new Messages({
          content: `Can you please remind customer on table ${number} to leave premises and clean table for next customer`,
          sessionID: sessionid
        })
      );
    }
  }, [isLast10Minutes, number, sessionid]);

  useEffect(() => {
    if (isBooked) {
      const remainingTimeInMinutes = parseInt(remainingTime.split(" ")[0]);
      if (remainingTimeInMinutes <= 10) {
        setIsLast10Minutes(true);
      } else {
        setIsLast10Minutes(false);
      }
    }
  }, [isBooked, remainingTime]);

  useEffect(() => {
    fetchTodaysOrders();
    const subscription = DataStore.observe(CafeOrder).subscribe(() => {
      console.log("CafeOrder change detected");
      fetchTodaysOrders();
    });
    return () => subscription.unsubscribe();
  }, []);
  


  async function fetchTodaysOrders() {
    console.log("session:" + session)
    console.log("fetchTodaysOrders called");
    const orders = await DataStore.query(CafeOrder);
    console.log("DataStore.query:", orders);
  
    orders.forEach(order => {
      console.log("Sessionid:", order.Sessionid);
      console.log("Completed:", order.Completed);
      console.log("Delieved:", order.Delieved);
    });
  
    if (sessionid) {
      const filteredOrders = orders.filter(
        c => c.Sessionid === session && !c.Completed && !c.Delieved
      );
      console.log("filteredOrders:", filteredOrders);
      setCafeOrders(filteredOrders);
    } else {
      setCafeOrders([]);
    }
  }
  
  

  useEffect(() => {
    // Find the CafeOrder object that matches the table's sessionid
    const order = cafeOrders.find(c => c.Sessionid === sessionid);
    console.log("order:", order);
  
    // Update the progress bar based on the properties of the order
    if (order) {
      if (!order.Completed && !order.Delieved) {
        setProgressBarWidth(50);
        setProgressBarText('Cooking');
      } else if (order.Completed && !order.Delieved) {
        setProgressBarWidth(75);
        setProgressBarText('Sent to Table');
      } else if (order.Completed && order.Delieved) {
        setProgressBarWidth(0);
        setProgressBarText('');
      }
    } else {
      // If there is no matching order, hide the progress bar
      setProgressBarWidth(0);
      setProgressBarText('');
    }
  
    console.log("progressBarWidth:", progressBarWidth);
    console.log("progressBarText:", progressBarText);
  }, [cafeOrders, sessionid]);
  
  
  return (
    <li
      className={`relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 ${
        isLast10Minutes ? 'bg-yellow-500 animate-pulse' : ''
      }`}
    >
      <div className="flex gap-x-4">
        <div
          className={`h-12 w-12 flex-none rounded-full flex items-center justify-center ${
            isBooked ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          <span className="text-white font-bold text-lg">{number}</span>
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Table {number}
          </p>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Name: {name}
          </p>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Guests: {guests}
          </p>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Orders: {orders}
          </p>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Total Spent:£{total}
          </p>

          {isBooked && (
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              Booked for {timeslot}
            </p>
          )}
        </div>
      </div>
      <div>
        <h4 className="sr-only">Status</h4>
        {progressBarWidth > 0 && (
          <>
            <p className="text-sm font-medium text-gray-900">Current Orders</p>
            <div className="mt-6" aria-hidden="true">
              <div className="overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-indigo-600"
                  style={{ width: `${progressBarWidth}%` }}
                />
              </div>
              <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                <div>{progressBarText}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
}


function Tables({ sessions }) {

  const [freeTables, setFreeTables] = useState(null);
  const [truthy, setTruthy] = useState(false);
  const [tableNumber, setSelectedTable] = useState(null);
  const [order, setOrder] = useState([]);




  const tablecapacity = [
    { table: 1, capacity: 2 },
    { table: 2, capacity: 2 },
    { table: 3, capacity: 2 },
    { table: 4, capacity: 2 },
    { table: 5, capacity: 2 },
    { table: 6, capacity: 2 },
    { table: 7, capacity: 2 },
    { table: 8, capacity: 2 },
    { table: 9, capacity: 2 },
    { table: 10, capacity: 2 },
    { table: 11, capacity: 4 },
    { table: 12, capacity: 4 },
    { table: 13, capacity: 4 },
    { table: 14, capacity: 4 },
    { table: 15, capacity: 4 },
    { table: 16, capacity: 4 },
    { table: 17, capacity: 4 },
    { table: 18, capacity: 4 },
    { table: 19, capacity: 4 },
    { table: 20, capacity: 4 },
    { table: 21, capacity: 4 },
    { table: 22, capacity: 4 },
    { table: 23, capacity: 4 },
    { table: 24, capacity: 4 },
    { table: 25, capacity: 4 },
    { table: 26, capacity: 4 },
    { table: 27, capacity: 4 },
    { table: 28, capacity: 4 },
    { table: 29, capacity: 4 },
    { table: 30, capacity: 4 },
    { table: 31, capacity: 4 },
    { table: 32, capacity: 4 },
    { table: 33, capacity: 4 },
    { table: 34, capacity: 4 },
    { table: 35, capacity: 4 },

  ];



  // Create an array of objects to represent the availability and booking information of each table
  const [tables, setTables] = useState(
    new Array(35).fill(null).map((_, i) => ({
      number: i + 1,
      isBooked: false,
      timeslot: null,
      remainingTime: null,
    }))
  );

  useEffect(() => {
    const updatedTables = [...tables];
    sessions.forEach((session) => {
      const tableNumber = session.Table;
      if (tableNumber >= 1 && tableNumber <= 35) {
        const timeslotArrive = parse(session.TimeslotFrom, "HH:mm", new Date());
        const timeslotFinish = parse(session.TimeslotTo, "HH:mm", new Date());
        const timeslot = `${format(timeslotArrive, "HH:mm")}-${format(
          timeslotFinish,
          "HH:mm"
        )}`;
        const remainingTime = formatDistanceToNow(timeslotFinish);
        updatedTables[tableNumber - 1] = {
          ...updatedTables[tableNumber - 1],
          isBooked: true,
          timeslot,
          remainingTime,
        };
      }
    });
    setTables(updatedTables);
  }, [sessions]);
  

  
    

  // ...

  function handleMoveClick(tableNumber) {
    // Find the session for the table that was clicked
    const session = sessions.find((session) => session.Table === tableNumber);
    if (!session) {
        alert('Error: Cannot perform function');
        return;
    }
    // Get the end time of the session's timeslot
    const timeslotFinish = parse(session.TimeslotTo, "HH:mm", new Date());
    // Find the tables that are not booked or that have a timeslot that ends before the end of the clicked table's timeslot
    const freeTables = tables.filter(
      (table) =>
        !table.isBooked ||
        (table.isBooked &&
          parse(table.timeslot.split("-")[1], "HH:mm", new Date()) < timeslotFinish)
    );
    // Find the number of guests for the table that was clicked
    const guests = session.Adults + session.Children;
    // Filter the freeTables array to only include tables that have enough capacity
    const freeTablesWithCapacity = freeTables.filter(
      (table) => tablecapacity.find((t) => t.table === table.number).capacity >= guests
    );
    setFreeTables(freeTablesWithCapacity);
    setTruthy(true);
    console.log(freeTablesWithCapacity);
    setSelectedTable(tableNumber);
}


  if (truthy === true) {
    const session = sessions.find((session) => session.Table === tableNumber);

    return (
      <div>
        {/* ... */}
        {freeTables && <MoveTableDropdown freeTables={freeTables} session={session} />}
        {/* ... */}
      </div>
    );

  }


  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {tables.map((table) => {
        // Find the session for this table
        const session = sessions.find((session) => session.Table === table.number);
        // Get the name and number of guests from the session
        const name = session ? session.Name : null;
        const guests = session ? session.Adults + session.Children : null;
        const orders = session ? session.Orders : null;
        const total = session ? session.TotalSpent : null;
        const sessionid = session ? session.id : null;
        return (
          <Table
            key={table.number}
            number={table.number}
            isBooked={table.isBooked}
            timeslot={table.timeslot}
            remainingTime={table.remainingTime}
            onMoveClick={handleMoveClick} // add this line
            name={name}
            guests={guests}
            orders={orders}
            total={total}
            sessionid={sessionid}
          />

        );
      })}

    </ul>
  );
}




export default function Example() {
  const [sessions, setSessions] = useState([]);




  useEffect(() => {
    async function getSessionsForCurrentTime() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const currentTime = format(new Date(), "HH:mm");
      console.log(currentTime);

      const sessions = await DataStore.query(Sessions);
      console.log(sessions);
      console.log(sessions[0].TimeslotFrom);
      const todaysSessions = sessions.filter(
        session =>
          new Date(session.Date) >= today &&
          new Date(session.Date) < tomorrow &&
          session.TimeslotFrom <= currentTime &&
          session.TimeslotTo >= currentTime &&
          !(session.LeftCenter === true && session.Arrived === true)
      );
      
console.log(todaysSessions);
      setSessions(todaysSessions);
    }

    getSessionsForCurrentTime();
  }, []);

  return <Tables sessions={sessions} />;
}
