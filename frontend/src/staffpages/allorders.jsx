import { DataStore } from 'aws-amplify';
import { CafeOrder } from '../models';
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

  // Calculate most popular items
  const getMostPopularItems = (items) => {
    const itemCounts = {};
    items.forEach(item => {
      if (item) {
        item.forEach(i => {
          if (itemCounts[i]) {
            itemCounts[i]++;
          } else {
            itemCounts[i] = 1;
          }
        });
      }
    });
    const sortedItems = Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a]);
    return sortedItems.slice(0, 3);
  };

  const mostPopularDrinkItems = getMostPopularItems(orders.map(order => order.DrinkItems));
  const mostPopularHotItems = getMostPopularItems(orders.map(order => order.HotItems));

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
      <div className="flex justify-between gap-x-6 py-5 text-sm">
        <p>Number of Orders: {numberOfOrders}</p>
        <p>Total Amount: £{totalAmount.toFixed(2)}</p>
        <p>Total Amount (minus VAT): £{totalAmountMinusVAT.toFixed(2)}</p>
        
      </div>
      <div>
      <p className='text-sm font-bold text-purple-900'>Most Popular Drink Items: {mostPopularDrinkItems.join(', ')}</p>
        <p className='text-sm font-bold text-purple-900'>Most Popular Hot Items: {mostPopularHotItems.join(', ')}</p>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Till Item
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Amount Sold
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                


                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.CreatedTime}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.CreatedDate}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.Total}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.DrinkItems ? order.DrinkItems.join(', ') : 'N/A'}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.HotItems ? order.HotItems.join(', ') : 'N/A'}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.Table}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.SessionEmail}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {order.id}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}