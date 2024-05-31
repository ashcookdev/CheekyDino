import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { isToday, format, differenceInMinutes, parse } from 'date-fns';
import TableData from './TableData.json';
import { CafeOrder } from '../models';
import './progress.css'

function OccupiedTables() {
  const [sessions, setSessions] = useState([]);
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

    const subscription = DataStore.observe(Sessions).subscribe(() =>
      getTodaysBookings()
    );

    getTodaysBookings();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 120000);
    return () => clearInterval(interval);
  }, [sessions]);

  const occupiedTables = sessions.filter(
    (session) => session.Arrived === true && session.LeftCenter === false
  );

  const tableInfo = occupiedTables.map((table) => {
    const timeslotFromDate = parse(table.TimeslotFrom, 'HH:mm', new Date());
    const timeslotToDate = parse(table.TimeslotTo, 'HH:mm', new Date());
    const timeArrived = parse(table.TimeArrived, 'HH:mm:ss.SSS', new Date());
    const timeRemaining = differenceInMinutes(timeslotToDate, new Date());
    let backgroundColor;
    if (timeRemaining > 60) {
      backgroundColor = 'bg-green-500';
    } else if (timeRemaining > 30) {
      backgroundColor = 'bg-gradient-to-r from-green-500 via-yellow-500 to-red-500';
    } else if (timeRemaining > 10) {
      backgroundColor = 'bg-gradient-to-r from-yellow-500 to-red-500';
    } else {
      backgroundColor = 'bg-red-500';
    }
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
      setOrders(cafeOrders);
    }
    getCafeOrders();

    const subscription = DataStore.observe(CafeOrder).subscribe(() => {
      getCafeOrders();
    });

    return () => subscription.unsubscribe();
  }, [sessions]);

  useEffect(() => {
    const newOrderStatuses = {};
    for (const order of orders) {
      let status = '';
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
  }, [orders]);


  const sortedTableInfo = [...tableInfo].sort((a, b) => {
    // Convert timeArrived strings to Date objects for comparison
    const dateA = new Date(`1970-01-01T${a.timeArrived}:00`);
    const dateB = new Date(`1970-01-01T${b.timeArrived}:00`);
    
    // Compare the Date objects
    return dateA - dateB;
  });

  return (
    <ul>
      {sortedTableInfo.map((table) => (
        <li
          key={table.number}
          className={`p-4 rounded-lg shadow-md mt-5 ${table.backgroundColor} ${
            table.shouldFlashGold ? 'animate-pulse ' : ''
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
              <h3 className="text-lg font-medium text-white">
                Booked for {table.timeslot}
              </h3>
              <h3 className="text-lg font-medium text-white">
                Time Arrived: {table.timeArrived}
              </h3>
              <h3 className="text-lg font-medium text-white">
                Time Remaining: {table.timeRemaining} minutes
              </h3>
            </div>
            {orders
              .filter(
                (order) =>
                  order.Table === table.number && order.Delieved === false
              )
              .map((order, index) => {
                const status = orderStatuses[order.id] || '';
                return (
                  <div
                    key={index}
                    className="bg-white shadow-md p-4 m-4 rounded-md flex items-center"
                  >
                    <h4 className="sr-only">Status</h4>
                    <p className="text-sm font-medium text-gray-900">
                      Order {index + 1}
                    </p>
                    {/* Only show the status if it's not "Cooking" */}
                    {status !== 'Cooking' && (
                      <p className="text-sm font-medium text-gray-900">
                        Status: {status}
                      </p>
                    )}
                    {status === 'Cooking' && (
                      <img
                        src="Cooking.gif"
                        alt="Cooking GIF"
                        className="w-10 h-10 ml-auto"
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </li>
      ))}
    </ul>
  );
  
}

export default OccupiedTables;
