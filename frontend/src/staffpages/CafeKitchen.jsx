import {CafeOrder} from './models';
import { DataStore } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { format, parse, set } from 'date-fns';
import { Messages, PartyBooking, StockControl, KitchenMenu } from './models';
import { RocketLaunchIcon, ChevronRightIcon, CircleStackIcon, CheckCircleIcon} from '@heroicons/react/20/solid';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }

export default function CafeKitchen() {

    //get all orders for today
    const [orders, setOrders] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [snooze, setSnooze] = useState(false);
    
    const [selected, setSelected] = useState({})
    const allOrdersSelected = selected.length === orders.length;
    const currentDate = new Date();
    
    console.log(orders)

    
    setInterval(() => {
      window.location.reload();
  }, 60000);
  



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
    
      const allOrders = await DataStore.query(CafeOrder);
      
      


      const orders = allOrders.filter(
        (order) =>
          new Date(order.CreatedDate) >= today &&
          new Date(order.CreatedDate) < tomorrow &&
          !order.Completed &&
          order.Kitchen
      );
      setOrders(orders);

      if (orders.Prep === 2) {
        setSnooze(true);
      }
    }

    
    
    

    useEffect(() => {
        fetchTodaysOrders();
        const subscription = DataStore.observe(CafeOrder).subscribe(() =>
        
            fetchTodaysOrders()
            

            //play sound

        );
        
        
        return () => subscription.unsubscribe();
    }
    , []);

    async function HandleOrderConfirmed(order) {
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
        CafeOrder.copyOf(order, (updated) => {
          updated.Completed = true;
          updated.Delieved = false;
        })
      );
    
      // Update Messages model
      DataStore.save(
        new Messages({
          // Set the fields of the new message
          content: `Table ${order.Table} order has been made, at ${formattedTime} can staff please collect the order`,
          email: "Kitchen",
          createdAt: awstime,
          sessionID: order.Sessionid,
          orderID: order.id,
          group: ["Staff", "Kitchen", "Team Leader", "Admin", "Developer"],
        })
      );
    }
    
    

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className='text-white'>Number of Orders: {orders.length}</p>
              {snooze && (
                <button onClick={() => setSnooze(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Snooze
                </button>
              )}
            <ul role="list" className="divide-y divide-gray-100">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-800 sm:px-6 lg:px-8"
                >
                  <div className="flex gap-x-4">
                  <CheckCircleIcon className="w-6 h-6 animate-pulse text-green-500" />

                    <div className="min-w-0 flex-auto">
                        <h3 className="text-lg font-medium leading-6 text-white">
                        Table:{order.Table}
                        </h3>


                    <ul className="ml-3 font-medium text-white">
  {order.HotItems.map((item, index) => (
    <li key={`${item}-${index}`}>
      <input id={item} name={item} type="checkbox" />
      <label htmlFor={item}>{item}</label>
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
              ))}
            </ul>
          </div>
        
          )
        }




   