import KitchenStats from "./KitchenStats";
import CafeKitchen from "./CafeKitchen";
import PartyKitchen from "./PartyKitchen";
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
  TvIcon,
  CogIcon,
  KeyIcon,
  LightBulbIcon,
  CakeIcon,


} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DataStore } from "aws-amplify";
import { Messages } from "./models";
import { useEffect } from "react";
import Modal from "./modal";  // import the modal component


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Kitchen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const subscription = DataStore.observe(Messages).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      setMessages(prevMessages => [...prevMessages, msg.element]);
      console.log(messages)
      setShow(true);
      setTimeout(() => setShow(false), 30000); // hide after 30 seconds
    });
  
    return () => subscription.unsubscribe();
  }, []);

  const now = new Date();

  // Format the time and date using date-fns
  const time = format(now, "h:mm a");
  const date = format(now, "EEEE, MMMM do, yyyy");





  
  const teams = [{ id: 1, name: 'Orders', href: '/orders', initial: 'O', current: false },
  { id: 2, name: 'Sessions', href: '/sessionhistory', initial: 'T', current: false },
  { id: 3, name: 'Parties', href: '/partyhistory', initial: 'P', current: false },]


  const navigation = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Till', href: '/till', icon: CurrencyPoundIcon, current: true },
    {name: 'Make a Booking', href: '/reservations', icon: FolderIcon, current: false },
  { name: 'Chat', href: '/chat', icon: ChatBubbleBottomCenterIcon, current: false },
  { name: 'Kitchen', href: '/kitchen', icon: CakeIcon , current: false },
  { name: 'Tables', href: '/Tables', icon: TableCellsIcon, current: false },
  { name: 'Edit Landing Page', href: '/edithome', icon: PencilIcon, current: false },
  {name: 'Customer Screen', href: '/customerscreen', icon: TvIcon, current: false },
  {name: 'Clock In', href: '/clockin', icon: ClockIcon, current: false },
  {name: 'Staff', href: '/staff', icon: UsersIcon, current: false },
{ name: 'Reports', href: '/finance', icon: ChartPieIcon, current: false },
{name: 'Settings', href: '/settings', icon: CogIcon, current: false },
{name: 'Master Close', href: '/masterclose', icon: KeyIcon, current: false },  
  { name: 'Training', href: '/training', icon: LightBulbIcon, current: false },

]



  // Add your kitchen stats here


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
                        src="./verse.gif"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
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
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
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
                                </a>
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
  <img className="h-12 w-auto mr-4" src="./versa.gif" alt="Your Company" />
</div>

            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
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
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
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
                        </a>
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
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Kitchen</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="./verse.gif"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
  <div
    className="bg-black mx-auto max-w-7xl sm:px-6 lg:px-8"
    style={{ backgroundImage: `url(/background.gif)` }}
  >
    <div className="text-white py-6">
      <h1 className="text-2xl font-medium">Kitchen</h1>
      <p className="mt-2">
        {time} | {date}
      </p>
      <div className="mt-4"></div>
      <div className='fixed top-0 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto'>
  <Modal show={show} setShow={setShow} message={messages[messages.length - 1]} />
</div>
    </div>

    <div className="flex flex-col md:flex-row">
    
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <h2 className="text-lg font-medium text-white">Orders</h2>
        <CafeKitchen />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-medium text-white">Party</h2>
        <PartyKitchen />
      </div>
    </div>
  </div>
</main>;


      </div>
  );
}






  