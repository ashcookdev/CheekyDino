import { DataStore } from 'aws-amplify';
import { CafeOrder } from './models';
import { format, subHours, startOfDay, startOfWeek, startOfMonth } from 'date-fns';
import React, { useState, useEffect } from 'react';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  
  const [timeRange, setTimeRange] = useState('Hour');




  useEffect(() => {
    async function getOrders() {
        // Get current date and time
        const now = new Date();
      
        // Get one hour ago
        const oneHourAgo = new Date(now);
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
      
        // Get start of today
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
      
        // Get start of this week (assuming Sunday is the first day of the week)
        const thisWeek = new Date(now);
        thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay());
        thisWeek.setHours(0, 0, 0, 0);
      
        // Get start of this month
        const thisMonth = new Date(now);
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);
      
        let startDate;
        switch (timeRange) {
          case 'Hour':
            startDate = oneHourAgo;
            break;
          case 'Current Day':
            startDate = today;
            break;
          case 'This Week':
            startDate = thisWeek;
            break;
          case 'This Month':
            startDate = thisMonth;
            break;
          default:
            startDate = now;
        }
      
        // Find all orders
        const allOrders = await DataStore.query(CafeOrder);
      
        // Filter orders based on selected time range
        const orders = allOrders.filter(
          order => new Date(order.CreatedDate) >= startDate && new Date(order.CreatedDate) <= now
        );
      
        setOrders(orders);
      }
      

    getOrders();

  }, [timeRange]);


  // Add these lines before the return statement
const numberOfOrders = orders.length;
const totalAmount = orders.reduce((acc, order) => acc + order.Total, 0);
const totalAmountMinusVAT = totalAmount / 1.2;

  return (
    <>
      <div>
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          Time Range
        </label>
        <select
          id="location"
          name="location"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="Hour"
          onChange={e => setTimeRange(e.target.value)}
        >
          <option>Hour</option>
          <option>Current Day</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="flex justify-between gap-x-6 py-5">
  <p>Number of Orders: {numberOfOrders}</p>
  <p>Total Amount: £{totalAmount.toFixed(2)}</p>
  <p>Total Amount (minus VAT): £{totalAmountMinusVAT.toFixed(2)}</p>
</div>
  
      <ul role="list" className="divide-y divide-gray-100">
  {orders.map(order => (
    <li key={order.id} className="flex justify-between gap-x-6 py-5">
      {/* Render order details here */}
      <p>Created Time: {order.CreatedTime}</p>
      <p>Created Date: {order.CreatedDate}</p>
      <p>Total: £{order.Total}0</p>
      <p>Drink Items: {order.DrinkItems ? order.DrinkItems.join(', ') : 'N/A'}</p>
      <p>Hot Items: {order.HotItems ? order.HotItems.join(', ') : 'N/A'}</p>
      <p>Table: {order.Table}</p>
      <p>Completed: {order.Completed ? 'Yes' : 'No'}</p>
    </li>
  ))}
</ul>

    </>
    );
}
  