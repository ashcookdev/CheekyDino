import { HomeCookedCollection } from '../models';
import { DataStore } from 'aws-amplify';
import { useState, useEffect, useRef } from 'react';
import { format, parse, set } from 'date-fns';
import { Messages, StockControl, KitchenMenu } from '../models';
import { RocketLaunchIcon, ChevronRightIcon, CircleStackIcon, CheckCircleIcon, ClockIcon, TicketIcon, CogIcon } from '@heroicons/react/20/solid';
import Countdown from 'react-countdown';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;

// Renderer callback with condition
const renderer = ({ minutes, completed }) => {
  if (completed) {
    // Render a completed state
    return <ClockIcon className='w-12 h-12 animate-pulse text-white' />;
  } else {
    // Render a countdown
    return <span className='text-white'>{minutes} mins </span>;

  }
};

export default function CafeKitchen() {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [snooze, setSnooze] = useState(false);
  const [selected, setSelected] = useState({})
  const allOrdersSelected = selected.length === orders.length;
  const currentDate = new Date();
  const [prevOrderCount, setPrevOrderCount] = useState(0);
  const [printing , setPrinting] = useState(false);
  



  const prevOrdersRef = useRef();

  useEffect(() => {
    prevOrdersRef.current = orders;
  }, [orders]);
  
  const prevOrders = prevOrdersRef.current;


  
// use effect refreshes the page every minute

useEffect(() => {
  const interval = setInterval(() => {
    window.location.reload();
  }, 60000);

  return () => clearInterval(interval);
}
  , []);

  



  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }
    , []);

    async function fetchTodaysOrders() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
      
        const allOrders = await DataStore.query(HomeCookedCollection);
      
        const orders = allOrders.filter((order) => {
            const orderDate = new Date(order.CreatedDate);
            const collectionTimeParts = order.CollectionTime.split(".")[0].split(":"); // Remove milliseconds
            orderDate.setHours(
              parseInt(collectionTimeParts[0]),
              parseInt(collectionTimeParts[1]),
              parseInt(collectionTimeParts[2])
            );
          
            // Calculate the time difference in minutes
            const timeDifference = (orderDate.getTime() - today.getTime()) / (1000 * 60);
          
            // Check if the order is 15 minutes from now or later
            return (
              timeDifference >= 15 &&
              orderDate >= today &&
              orderDate < tomorrow &&
              !order.Completed &&
              !order.Delieved
            );
          });
          
          
        console.log(orders);
      
        setOrders(orders);
      
        if (orders.length > 0 && orders[0].Prepaid === 2) {
          setSnooze(true);
        }
      }
      
      



  useEffect(() => {
    fetchTodaysOrders();
    const subscription = DataStore.observe(HomeCookedCollection).subscribe(msg => {
      if (msg.opType === 'INSERT') {
        fetchTodaysOrders();
      }
    });
  
    return () => subscription.unsubscribe();
  }, []); // Removed orders from the dependency array
  




  async function HandleOrderConfirmed(order) {


    setPrinting(true);

    // Calculate the current time and format it as a string
    const currentTime = new Date();
    const options = { timeZone: "Europe/London", hour12: false };
    const awstime = currentTime
      .toLocaleString("en-GB", options)
      .split(",")[1]
      .trim();
    const formattedTime = awstime.substring(0, 5);

    // Loop through the hot items in the order
    for (const hotItemName of order.HotItems) {
      // Query the DataStore for the associated KitchenMenu item
      const kitchenMenuItem = (await DataStore.query(KitchenMenu)).find(
        (item) => item.Name === hotItemName
      );

      // Check if a KitchenMenu item was found
      if (kitchenMenuItem) {
        // Initialize an array to store the number of portions remaining for each ingredient
        const portionsRemaining = [];

        // Loop through the ingredients of the KitchenMenu item
        for (const ingredient of kitchenMenuItem.Ingredients) {
          // Calculate the required stock level for the ingredient
          const requiredStockLevel =
            ingredient.weight > 0 ? ingredient.weight : ingredient.quantity;

          // Query the DataStore for the associated StockControl item
          const stockControl = await DataStore.query(
            StockControl,
            ingredient.id
          );

          // Check if a StockControl item was found
          if (stockControl) {
            // Update the stock level of the StockControl item
            await DataStore.save(
              StockControl.copyOf(stockControl, (updated) => {
                updated.CurrentStockLevel -= requiredStockLevel;
              })
            );

            // Calculate the number of portions remaining for the ingredient and add it to the array
            portionsRemaining.push(
              Math.floor(stockControl.CurrentStockLevel / requiredStockLevel)
            );
          }
        }

        // Calculate the minimum number of portions remaining among all ingredients
        const minPortionsRemaining = Math.min(...portionsRemaining);

        // Update the stock level of the KitchenMenu item
        await DataStore.save(
          KitchenMenu.copyOf(kitchenMenuItem, (updated) => {
            updated.StockLevel = minPortionsRemaining;
          })
        );
      }
    }


    // Update record in DataStore
    DataStore.save(
      HomeCookedCollection.copyOf(order, (updated) => {
        updated.Completed = true;
        updated.Delieved = false;
      })
    );

    // Update Messages model
    

    

    const data = {
      product: orders.map((item) => item.HotItems),
      name: orders.map((item) => item.Email) ,
      table: "Home Cooked Order",
    };
  
    // Send the data to the kitchen-print channel
    if (isElectron) {
      // Introduce a 3-second delay before sending
      setTimeout(() => {
        ipcRenderer.send('kitchen-print', { data });
        // Set printing to false after sending
        setPrinting(false);
        window.location.reload();
      }, 3000);
    }
  }

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className='text-purple-700 text-center'>Home Cooked Orders: {orders.length}</p>
      {snooze && (
        <button onClick={() => setSnooze(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Snooze
        </button>
      )}
      <ul role="list" className="divide-y divide-gray-100  mt-2 mb-2">
        {orders.map((order, index) => {
          const collectionTime = parse(order.CollectionTime.split('.')[0], 'HH:mm:ss', new Date());
          // add 20 minutes to collection time
          const collectionTimePlus20 = set(collectionTime, { minutes: collectionTime.getMinutes() + 20 });
  
          // Calculate remaining time in minutes
          const remainingTime = (collectionTimePlus20.getTime() - new Date().getTime()) / 1000 / 60;
  
          // get time the order should be ready by
          const readyBy = format(collectionTimePlus20, 'h:mm a');
  
          let backgroundColor = 'bg-purple-100';
          if (order.timerFinished) {
            backgroundColor = 'bg-red-500 animate-pulse';
          } else if (remainingTime <= 20 && remainingTime > 10) {
            backgroundColor = 'bg-green-500';
          }
          else if (remainingTime <= 10 && remainingTime > 5) {
            backgroundColor = 'bg-yellow-500';
          }
          else if (remainingTime <= 5) {
            backgroundColor = 'bg-red-500';
          }
  
          return (
            <li
              key={order.id}
              className={`relative flex justify-between gap-x-6 px-4 py-5 sm:px-6 lg:px-8 ${backgroundColor} rounded-lg mt-2 mb-2 border border-gray-200 shadow-lg `}
            >
              <div className="flex gap-x-4">
                <CheckCircleIcon className="w-6 h-6 animate-pulse text-white" />
                <div className="min-w-0 flex-auto">
                  <img className='h-8 w-8' src='homecooked.png' alt=''/> 
                  {printing && (
                      <CogIcon className="w-10 h-10 animate-spin text-white" /> 
                    )
                    }
                  <ul className="ml-3 font-medium text-white">
                    {order.HotItems.map((item, index) => (
                      <li key={`${item}-${index}`}>
                        <input id={item} name={item} type="checkbox" className='mr-1' />
                        <label htmlFor={item}>{item}</label>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold leading-6 text-white mt-2">
                    {order.Notes ? order.Notes : "No Order Notes"}
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`mailto:${order.email}`} className="relative truncate hover:underline">
                      {order.email}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 mb-1 mt-1">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-white">{order.Email}</p>
                  <p className="mt-1 text-xs leading-5 text-white">
  Collection Time: {format(parse(order.CollectionTime.split('.')[0], 'HH:mm:ss', new Date()), 'h:mm a')}
</p>

                  <p className='text-white text-xs'>Ready By: {readyBy}</p>
                  <Countdown date={collectionTimePlus20} renderer={renderer} />
                  <div>
                    <button
                      type="button"
                      onClick={() => HandleOrderConfirmed(order)}
                      className="inline-flex border border-white items-center gap-x-2 rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  
}