import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import { Messages, PartyBooking, CafeOrder } from '../models';
import { Auth } from 'aws-amplify';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
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
  TableCellsIcon,
  PencilIcon,
  ArrowLeftIcon, 
  ClockIcon,
  CogIcon,
  TvIcon, LightBulbIcon, CakeIcon, KeyIcon, BoltIcon, 




} from '@heroicons/react/24/solid'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Online from './online';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/solid';


const templates = ['Party Host to Front Desk', 'Party Finished Clean Upstairs', 'Table (number) Food is Ready'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function App() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [selectedGroups, setSelectedGroups] = React.useState([]);
  const [shouldFlash, setShouldFlash] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const date = new Date();
  const formattedDate = format(date, 'hh:mm');


  
  useEffect(() => {

    const interval = setInterval(() => {
        window.location.reload();
    }
        , 120000);
    return () => clearInterval(interval);
}, []);




  React.useEffect(() => {
    fetchMessages();
    const subscription = DataStore.observe(Messages).subscribe(() =>
    
      fetchMessages()
      
    );
    
    Auth.currentAuthenticatedUser().then((user) =>
      setUserEmail(user.attributes.email)
    );
    return () => subscription.unsubscribe();
  }, []);

  async function fetchMessages() {
    const messagesData = await DataStore.query(Messages);
    

    setMessages(messagesData);

  }
  

  async function handleAddMessage() {
    const user = await Auth.currentAuthenticatedUser();
    const { email, username } = user.attributes;
    const createdAt = new Date().toISOString().split('T')[1];
    await DataStore.save(
      new Messages({
        content: inputValue,
        email,
        group: [...selectedGroups, 'TeamLeader', 'Admin','Developer'], // always include TeamLeader and Admin groups
        createdAt
      })
    );
    setInputValue('');
    if (selectedGroups.includes('Kitchen')) {
      setShouldFlash(true);
    }
  }

  

  async function handleDelivery(message) {

    if (message.sessionID) {
      // update the CafeOrder DataStore
      const cafeOrders = await DataStore.query(CafeOrder);
      const cafeOrder = cafeOrders.find((c) => c.Sessionid === message.sessionID);
      console.log(cafeOrder);
      if (cafeOrder) {
        await DataStore.save(
          CafeOrder.copyOf(cafeOrder, (updated) => {
            updated.Delieved = true;
            updated.TimeDelivered = formattedDate;

          })
        );
        console.log(cafeOrder);
      }
    } else if (message.partyID) {
      // update the PartyBooking DataStore
      const partyBookings = await DataStore.query(PartyBooking);
      const partyBooking = partyBookings.find((p) => p.id === message.partyID);
      if (partyBooking) {
        await DataStore.save(
          PartyBooking.copyOf(partyBooking, (updated) => {
            updated.PartyFoodDelivered = true;
          })
        );
      }
    }
  
    // update the message's delivered property
    await DataStore.save(
      Messages.copyOf(message, (updated) => {
        updated.delivered = true;
      })
    );
  
    setShouldFlash(false);
  }
  
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

    

  const groups = ['Kitchen', 'PartyHost','Staff'];









  const now = new Date();

  // Format the time and date using date-fns
  const time = format(now, "h:mm a");


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
              className="h-8 w-8 rounded-full bg-gray-50"
              src="versa.gif"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
        <div className="p-4" style={{ fontFamily: "sans-serif" }}>
  <div className="mb-4 text-lg font-bold">Logged in as: {userEmail}</div>
  <div className="mb-4">
   <h5> Online Staff </h5>
   <div className='mt-5 mb-5'>
    <Online/>
   </div>
  </div>
      
  <select
    multiple
    value={selectedGroups}
    onChange={(e) =>
      setSelectedGroups(
        Array.from(e.target.selectedOptions, (option) => option.value)
      )
    }
    className="border p-2 rounded-lg mb-4"
  >
    {groups.map((group) => (
      <option key={group} value={group}>
        {group}
      </option>
    ))}
  </select>

  <div
    className={`border p-4 mb-4 h-64 overflow-y-scroll shadow-md rounded-lg ${
      shouldFlash ? "animate-pulse" : ""
    }`}
  >
    {messages.map((message) => (
      <div
        key={message.id}
        className={`p-2 rounded-lg mb-2 ${
          message.email === userEmail
            ? "bg-purple-500 text-white"
            : "bg-blue-200"
        }`}
      >
        <div className="font-bold">{message.email}</div>
        {message.content}
        {message.email === "Kitchen" && (
          <>
            {message.delivered ? (
              <div className="flex items-center">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                <span className="ml-2">{userEmail}</span>
              </div>
            ) : (
              <button
                className={`p-2 mt-2 rounded-lg ${
                  message.sessionID
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => handleDelivery(message)}
              >
                Delivered
              </button>
            )}
          </>
        )}
      </div>
    ))}
  </div>
  <input
    className="border p-2 mr-2 w-full rounded-lg"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
  />
  <button
    className="bg-blue-500 text-white p-2 mr-2 rounded-lg w-full mt-2"
    onClick={handleAddMessage}
  >
    Add Message
  </button>
  <div className="flex mt-2">
    {templates.map((template) => (
      <button
        key={template}
        className="bg-gray-200 text-black p-2 mr-2 rounded-lg"
        onClick={() => setInputValue(template)}
      >
        {template}
      </button>
    ))}
  </div>
</div>

</main>

</div>

  );
}

export default withAuthenticator(App);





  