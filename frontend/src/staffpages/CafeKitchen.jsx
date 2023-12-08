import { CafeOrder } from '../models';
import { DataStore } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { format, parse, differenceInSeconds } from 'date-fns';
import { Messages, StockControl, KitchenMenu } from '../models';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

export default function CafeKitchen() {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [snooze, setSnooze] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const allOrders = await DataStore.query(CafeOrder);

      const filteredOrders = allOrders.filter(
        (order) =>
          new Date(order.CreatedDate) >= today &&
          new Date(order.CreatedDate) < tomorrow &&
          !order.Completed &&
          order.Kitchen
      );
      setOrders(filteredOrders);

      if (filteredOrders.Prep === 2) {
        setSnooze(true);
      }
    };

    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);

    fetchOrders();

    const subscription = DataStore.observe(CafeOrder).subscribe(() => {
      fetchOrders();
      // play sound
    });

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, []);

  const HandleOrderConfirmed = async (order) => {
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const awstime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();
    const formattedTime = awstime.substring(0, 5);

    // ... (rest of the function remains unchanged)

    DataStore.save(
      new Messages({
        content: `Table ${order.Table} order has been made, at ${formattedTime} can staff please collect the order`,
        email: 'Kitchen',
        createdAt: awstime,
        sessionID: order.Sessionid,
        orderID: order.id,
        group: ['Staff', 'Kitchen', 'Team Leader', 'Admin', 'Developer'],
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-white">Number of Orders: {orders.length}</p>
      {snooze && (
        <button onClick={() => setSnooze(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Snooze
        </button>
      )}
      <ul role="list" className="divide-y divide-gray-100 border border-gray-200 shadow-sm mt-2 mb-2 rounded-md">
        {orders.map((order) => {
          const createdAt = new Date(order.CreatedDate);
          const timeDifference = differenceInSeconds(currentTime, createdAt);
          const timeLeft = Math.max(0, 20 * 60 - timeDifference);

          return (
            <li
            
              key={order.id}
              className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6 lg:px-8"
              style={{
                background: `linear-gradient(to right, 
                              ${timeLeft <= 600 ? '#00FF00' : // Green for the first 10 mins
                               timeLeft <= 900 ? '#FFFF00' : // Yellow for the next 5 mins
                               timeLeft <= 1200 ? '#FFA500' : // Orange for the next 5 mins
                               '#FF0000' // Red for the last 5 mins and beyond
                              })`,
                transition: 'background 1s linear',
              }}
              
            >
            <div className="flex gap-x-4">
              <CheckCircleIcon className="w-6 h-6 animate-pulse text-white" />
              <div className="min-w-0 flex-auto">
                <h3 className="text-lg font-medium leading-6 text-white">Table:{order.Table}</h3>
                <p className="text-sm leading-6 text-white">
                  Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </p>
                        

                        <ul role="list" className="divide-y divide-gray-100">
  {orders.map((order) => (
    <li
      key={order.id}
      className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6 lg:px-8  rounded-lg mb-4"
    > 
    <p className='text-white'>{order.HotItemPrep}</p>
      <div className="flex gap-x-4">
       
        <div className="min-w-0 flex-auto">
         

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
    </li>
  ))}
</ul>


                      <p className="text-sm font-semibold leading-6 text-white">
                       
                      </p>
                      <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        <a href={`mailto:${order.email}`} className="relative truncate hover:underline">
                          {order.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{order.role}</p>
                        <p className="mt-1 text-xs leading-5 text-white">
                          Order Time:       {format(parse(order.CreatedTime, 'HH:mm:ss', new Date()), 'h:mm a')}


                        </p>
                        <div>
                        <button
  type="button"
  onClick={() => HandleOrderConfirmed(order)}
  className="inline-flex items-center gap-x-2 rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
  Ready <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
</button>


                        </div>
                    </div>
                    </div>

                 
                </li>
              );
            }
          )}
            </ul>
          </div>
        
          )
        }




   