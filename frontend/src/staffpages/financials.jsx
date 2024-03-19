import { DataStore } from 'aws-amplify';
import { CafeOrder, Sessions, PartyBooking, Staff, ClockIn, TimeEntry } from '../models';
import React, { useState, useEffect } from 'react';
import { formatISO } from 'date-fns';
import GraphFinance from './graphfinance';
import { format } from "date-fns";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CurrencyPoundIcon,
  ChatBubbleBottomCenterIcon,
  ArrowLeftIcon,
  TableCellsIcon,
  PencilIcon,
  ClockIcon,
  CakeIcon,
  TvIcon,
  CogIcon,
  KeyIcon,
  LightBulbIcon,
  HeartIcon,
  CheckIcon,
  BoltIcon,
  UserIcon,
  UserCircleIcon,
  UsersCircleIcon,
  FingerPrintIcon,
  UserGroupIcon,
  
  

} from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Stats from './stats';
import { Link } from 'react-router-dom'
import Expenses from './expenses';
import EventAnalytics from './eventanalytics';




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Financials() {
  const [cafeOrders, setCafeOrders] = useState({ hour: [], day: [], week: [], month: [] });
  const [sessions, setSessions] = useState({ hour: [], day: [], week: [], month: [] });
  const [partyBookings, setPartyBookings] = useState({ hour: [], day: [], week: [], month: [] });
  const [totalThisHour, setTotalThisHour] = useState(0);
const [totalToday, setTotalToday] = useState(0);
const [totalThisWeek, setTotalThisWeek] = useState(0);
const [totalThisMonth, setTotalThisMonth] = useState(0);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [staff, setStaff] = useState([]);

console.log(staff);


console.log(totalThisHour);
console.log(totalToday);
console.log(totalThisWeek);

const now = new Date();

// Format the time and date using date-fns
const time = format(now, "h:mm a");
const date = format(now, "EEEE, MMMM do, yyyy");






const teams = [{ id: 1, name: 'Orders', href: '/orders', initial: 'O', current: false },
{ id: 2, name: 'Sessions', href: '/sessionhistory', initial: 'T', current: false },
{ id: 3, name: 'Parties', href: '/partyhistory', initial: 'P', current: false },]



const navigation = [
  { name: 'Till', href: '/till', icon: CurrencyPoundIcon, current: true },
  {name: 'Make a Booking', href: '/reservations', icon: PencilIcon, current: false },
  {name: 'Pre-Bookings', href: '/Barcode', icon: CalendarIcon, current: false },
{ name: 'Chat', href: '/chat', icon: ChatBubbleBottomCenterIcon, current: false },
{ name: 'Control Panel', href: '/controlpanel', icon: BoltIcon, current: false },
{ name: 'Kitchen', href: '/kitchen', icon: CakeIcon , current: false },
{ name: 'Tables', href: '#section4', icon: TableCellsIcon, current: false },
{ name: 'Popular Items', href: '/tillhistory', icon: HeartIcon, current: false},

{ name: 'Used By Stock', href: '/usedby', icon: CheckIcon, current: false },
{ name: 'Edit Landing Page', href: '/edithome', icon: PencilIcon, current: false },
{name: 'Customer Screen', href: '/customerscreen', icon: TvIcon, current: false },
{name: 'Front Customer Screen', href: '/customerscreenfront', icon: TvIcon, current: false },


{name: 'Clock In', href: '/clockin', icon: ClockIcon, current: false },
{name: 'Staff', href: '/staff', icon: UsersIcon, current: false },
{ name: 'Reports', href: '/finance', icon: ChartPieIcon, current: false },
{name: 'Settings', href: '/settings', icon: CogIcon, current: false },
{name: 'Master Close', href: '/masterclose', icon: KeyIcon, current: false },  

]


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

      // Find all cafe orders
      const allCafeOrders = await DataStore.query(CafeOrder);

      // Filter cafe orders based on time range
      const cafeOrdersThisHour = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= oneHourAgo && new Date(order.CreatedDate) <= now
      );
      const cafeOrdersToday = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= today && new Date(order.CreatedDate) <= now
      );
      const cafeOrdersThisWeek = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= thisWeek && new Date(order.CreatedDate) <= now
      );
      const cafeOrdersThisMonth = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= thisMonth && new Date(order.CreatedDate) <= now
      );

      setCafeOrders({
        hour: cafeOrdersThisHour,
        day: cafeOrdersToday,
        week: cafeOrdersThisWeek,
        month: cafeOrdersThisMonth,
      });

      // Find all sessions
      const allSessions = await DataStore.query(Sessions);

      // Filter sessions based on time range
      const sessionsThisHour = allSessions.filter(
        session => new Date(session.Date) >= oneHourAgo && new Date(session.Date) <= now
      );
      const sessionsToday = allSessions.filter(
        session => new Date(session.Date) >= today && new Date(session.Date) <= now
      );
      const sessionsThisWeek = allSessions.filter(
        session => new Date(session.Date) >= thisWeek && new Date(session.Date) <= now
      );
      const sessionsThisMonth = allSessions.filter(
        session => new Date(session.Date) >= thisMonth && new Date(session.Date) <= now
      );

      setSessions({
        hour: sessionsThisHour,
        day: sessionsToday,
        week: sessionsThisWeek,
        month: sessionsThisMonth,
      });

      // Find all party bookings
      const allPartyBookings = await DataStore.query(PartyBooking);

      // Filter party bookings based on time range
      const partyBookingsThisHour = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= oneHourAgo && new Date(booking.PartyDate) <= now
      );
      const partyBookingsToday = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= today && new Date(booking.PartyDate) <= now
      );

      const partyBookingsThisWeek = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= thisWeek && new Date(booking.PartyDate) <= now
      );
      const partyBookingsThisMonth = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= thisMonth && new Date(booking.PartyDate) <= now
      );
     // Calculate totals for cafe orders
// Calculate totals for sessions
// Calculate totals for sessions
const totalSessionsThisHour = sessions.hour.reduce((total, session) => total + session.TotalSpent, 0);
const totalSessionsToday = sessions.day.reduce((total, session) => total + session.TotalSpent, 0);
const totalSessionsThisWeek = sessions.week.reduce((total, session) => total + session.TotalSpent, 0);
const totalSessionsThisMonth = sessions.month.reduce((total, session) => total + session.TotalSpent, 0);

// Calculate totals for party bookings
const totalPartyBookingsThisHour = partyBookings.hour.reduce((total, booking) => total + booking.Total, 0);
const totalPartyBookingsToday = partyBookings.day.reduce((total, booking) => total + booking.Total, 0);
const totalPartyBookingsThisWeek = partyBookings.week.reduce((total, booking) => total + booking.Total, 0);
const totalPartyBookingsThisMonth = partyBookings.month.reduce((total, booking) => total + booking.Total, 0);

// Update state variables with calculated totals
setTotalThisHour(totalSessionsThisHour + totalPartyBookingsThisHour);
setTotalToday(totalSessionsToday + totalPartyBookingsToday);
setTotalThisWeek(totalSessionsThisWeek + totalPartyBookingsThisWeek);
setTotalThisMonth(totalSessionsThisMonth + totalPartyBookingsThisMonth);


      setPartyBookings
        ({
          hour: partyBookingsThisHour,
          day: partyBookingsToday,
          week: partyBookingsThisWeek,
          month: partyBookingsThisMonth,
        });

     // Find all staff

      
}



    getData();
  }, []);

  function downloadData() {
    // Create CSV data
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Time Range,Cafe Orders,Sessions,Party Bookings\n';
    csvContent += `Past Hour,£${cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
    csvContent += `Current Day,£${cafeOrders.day.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.day.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.day.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
    csvContent += `This Week,£${cafeOrders.week.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.week.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.week.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
    csvContent += `This Month,£${cafeOrders.month.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.month.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.month.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
    csvContent += `Total,£${cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `financials-${formatISO(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
  }


return (
    <div>
       <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="./versalogo.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-50 text-indigo-600'
                                    
                                      : 'text-indigo-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <Link
                                  to={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-indigo-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? 'text-indigo-600 border-indigo-600'
                                        : 'text-indigo-600 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-20 w-auto"
                src="versalogo.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-indigo-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-indigo-600' : 'text-indigo-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <Link
                          to={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">  <div className="flex items-center">
      <div
        id="scroll-container"
        className="flex overflow-x-scroll hide-scroll-bar"
        style={{ width: '80%' }}
      >
       
      </div>
    </div></div>
          
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-16 rounded-full bg-gray-50"
              src="versalogo.png"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <Stats />
          <div className="flex mb-3 mt-3 items-center justify-between px-4 sm:px-6 lg:px-8">
          <EventAnalytics />
          </div>
        <>
        <div className="mt-8 flow-root">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-between items-center">
            
            <div className="mt-4 ml-8 flex-shrink-0">
             
            </div>
          </div>        
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr className="bg-purple-100">
            <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
>Time Range</th>
            <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
>Cafe Orders</th>
            <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
>Sessions</th>
            <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
> Party Bookings</th>


            <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
>Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">Past Hour</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{(cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0) +
              sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0) +
              partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">Current Day</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{cafeOrders.day.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{sessions.day.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{partyBookings.day.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{(cafeOrders.day.reduce((acc, order) => acc + order.Total, 0) +
              sessions.day.reduce((acc, session) => acc + session.TotalSpent, 0) +
              partyBookings.day.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">This Week</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{cafeOrders.week.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{sessions.week.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{partyBookings.week.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{(cafeOrders.week.reduce((acc, order) => acc + order.Total, 0) +
              sessions.week.reduce((acc, session) => acc + session.TotalSpent, 0) +
              partyBookings.week.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">This Month</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{cafeOrders.month.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{sessions.month.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{partyBookings.month.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{(cafeOrders.month.reduce((acc, order) => acc + order.Total, 0) +
              sessions.month.reduce((acc, session) => acc + session.TotalSpent, 0) +
              partyBookings.month.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
            </td>
          </tr>

        </tbody>
      </table>
      </div>
      </div>
      <Expenses />
      


      <button
        className="mt-10 mb-10 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={downloadData}
      >
        Download Data
      </button>
      <GraphFinance/>
    </>

        </main>

      </div>
  );
}






  