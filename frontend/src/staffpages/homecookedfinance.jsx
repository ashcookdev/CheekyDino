import { DataStore } from 'aws-amplify';
import { HomeCookedCollection } from '../models'; // Import HomeCookedCollection model
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import GraphFinance from './graphfinance';
import { Link } from 'react-router-dom';
import { CurrencyPoundIcon, ChartPieIcon, ClockIcon, CakeIcon, TvIcon, CogIcon, KeyIcon, HeartIcon, CheckIcon, BoltIcon, UsersIcon, PencilIcon, ChatBubbleBottomCenterIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import Stats from './stats';
import Expenses from './expenses';
import EventAnalytics from './eventanalytics';
import HomeCookedStats from './homecookedstats';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HomeCookedFinancials() {
  const [homeCookedCollections, setHomeCookedCollections] = useState({ hour: [], day: [], week: [], month: [] });
  const [totalThisHour, setTotalThisHour] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [totalThisWeek, setTotalThisWeek] = useState(0);
  const [totalThisMonth, setTotalThisMonth] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function getData() {
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

      // Find all home cooked collections
      const allCollections = await DataStore.query(HomeCookedCollection);

      // Filter collections based on time range
      const collectionsThisHour = allCollections.filter(
        collection => new Date(collection.CreatedDate) >= oneHourAgo && new Date(collection.CreatedDate) <= now
      );
      const collectionsToday = allCollections.filter(
        collection => new Date(collection.CreatedDate) >= today && new Date(collection.CreatedDate) <= now
      );
      const collectionsThisWeek = allCollections.filter(
        collection => new Date(collection.CreatedDate) >= thisWeek && new Date(collection.CreatedDate) <= now
      );
      const collectionsThisMonth = allCollections.filter(
        collection => new Date(collection.CreatedDate) >= thisMonth && new Date(collection.CreatedDate) <= now
      );

      setHomeCookedCollections({
        hour: collectionsThisHour,
        day: collectionsToday,
        week: collectionsThisWeek,
        month: collectionsThisMonth,
      });

      // Calculate totals
      const totalThisHour = collectionsThisHour.reduce((total, collection) => total + collection.Total, 0);
      const totalToday = collectionsToday.reduce((total, collection) => total + collection.Total, 0);
      const totalThisWeek = collectionsThisWeek.reduce((total, collection) => total + collection.Total, 0);
      const totalThisMonth = collectionsThisMonth.reduce((total, collection) => total + collection.Total, 0);

      setTotalThisHour(totalThisHour);
      setTotalToday(totalToday);
      setTotalThisWeek(totalThisWeek);
      setTotalThisMonth(totalThisMonth);
    }

    getData();
  }, []);

  function downloadData() {
    // Create CSV data
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Time Range,Home Cooked Collections\n';
    csvContent += `Past Hour,£${totalThisHour.toFixed(2)}\n`;
    csvContent += `Current Day,£${totalToday.toFixed(2)}\n`;
    csvContent += `This Week,£${totalThisWeek.toFixed(2)}\n`;
    csvContent += `This Month,£${totalThisMonth.toFixed(2)}\n`;

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `financials-${format(new Date(), 'yyyyMMddHHmmss')}.csv`);
    document.body.appendChild(link);
    link.click();
  }


return (
    <div>
      

        <main>
        <HomeCookedStats />
        <div className="flex mb-3 mt-3 items-center justify-between px-4 sm:px-6 lg:px-8">
        </div>
        <>
          {/* Render table for financial data */}
          <div className="mt-8 flow-root">
            <div className="-mt-4 -ml-8 flex flex-wrap justify-between items-center">
              {/* Code for additional components remains unchanged */}
            </div>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr className="bg-purple-100">
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Time Range</th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Home Cooked Collections</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">Past Hour</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{totalThisHour.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">Current Day</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{totalToday.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">This Week</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{totalThisWeek.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">This Month</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{totalThisMonth.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      </main>
      </div>
  );
}






  