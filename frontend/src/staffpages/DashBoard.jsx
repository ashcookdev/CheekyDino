import { Fragment, useState } from 'react'
import { DataStore } from 'aws-amplify'
import { CafeOrder } from './models'
import { useEffect } from 'react'
import OrderProgress from './orderprogress'
import PartyProgress from './partyProgress'
import { format, set } from 'date-fns'
import { Sessions } from './models'
import { PartyBooking } from './models'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import TodaysBookings from './todaysbookings'


const secondaryNavigation = [
    { name: 'Tables', href: '/Tables', current: true },
    { name: 'Orders', href: '/orders', current: false },
    { name: 'Sessions', href: '/sessionhistory', current: false },
    { name: 'Parties', href: '/partyhistory', current: false },
    { name: 'Finance', href: '/finance', current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {

    //get all orders for today from database  

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState([])
    const [currentTime, setCurrentTime] = useState(0);
    const [occupiedTables, setOccupiedTables] = useState([])
    const [currentGuests, setCurrentGuests] = useState(0)
    const [futureBookings, setFutureBookings] = useState([])
    const [currentorder, setCurrent] = useState([])

    console.log(currentorder)

    console.log(occupiedTables)
    console.log(currentGuests)

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const teams = [{ id: 1, name: 'Orders', href: '/orders', initial: 'O', current: false },
    { id: 2, name: 'Sessions', href: '/sessionhistory', initial: 'T', current: false },
    { id: 3, name: 'Parties', href: '/partyhistory', initial: 'P', current: false },]


const navigation = [
    { name: 'Till', href: '/till', icon: HomeIcon, current: true },
  { name: 'Chat', href: '/chat', icon: UsersIcon, current: false },
  { name: 'Kitchen', href: '/kitchen', icon: FolderIcon, current: false },
  { name: 'Tables', href: '/Tables', icon: CalendarIcon, current: false },
  { name: 'Tasks', href: '/Tasks', icon: CalendarIcon, current: false },
{ name: 'Reports', href: '/finance', icon: ChartPieIcon, current: false },
]



    const currentDate = new Date();
    const formattedDate = format(currentDate, 'MMMM dd, yyyy');
    const formattedTime = format(currentDate, 'h:mm:ss a');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchSessions() {
            const date = new Date();
            const dateString = date.toISOString().split('T')[0];
            const currentTime = format(currentDate, 'h:mm:ss a');

            // Fetch all sessions for the current date
            const sessions = await DataStore.query(Sessions, c => c.Date.eq(dateString));

            // Filter sessions to find those that are currently occupied
            const occupiedTables = sessions.filter(session => session.TimeslotFrom < currentTime && session.TimeslotTo > currentTime && session.Arrived === true);

            // Calculate the total number of current guests
            const currentGuests = occupiedTables.reduce((total, session) => total + session.Adults + session.Children, 0);

            // Filter sessions to find those that are booked for the future
            const futureBookings = sessions.filter(session => session.TimeslotFrom > currentTime);

            // Update state with the calculated values
            setOccupiedTables(occupiedTables);
            setCurrentGuests(currentGuests);
            setFutureBookings(futureBookings);
        }

        fetchSessions();

        const subscription = DataStore.observe(Sessions).subscribe(() => fetchSessions());
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        async function fetchOrders() {
            const orders = await DataStore.query(CafeOrder)
            setOrders(orders)
        }

        fetchOrders()

        const subscription = DataStore.observe(CafeOrder).subscribe(() => fetchOrders())
        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        async function fetchTodaysOrders() {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            const allOrders = await DataStore.query(CafeOrder)
            const orders = allOrders.filter(
                (order) =>
                    new Date(order.CreatedDate) >= today && new Date(order.CreatedDate) < tomorrow
            )
            setOrder(orders)

            const order = allOrders.filter(currentorder => currentorder.Completed === false && currentorder.Delieved === false )
            setCurrent(order) 
        }

        fetchTodaysOrders()


    }, [])


    //map through orders and get total amount
    const totalAmount = orders.reduce((total, order) => total + order.Total, 0)

    console.log(totalAmount)

    const stats = [
        { name: 'Orders Today', value: order.length },
        { name: 'Current Orders', value: currentorder.length, },
        { name: 'Tables Occupied', value: occupiedTables.length },
        { name: 'Future Bookings Today', value: futureBookings.length },
        { name: 'Guests in Branch', value: currentGuests, },

        { name: 'Total', value: "£" + totalAmount },
    ]


    const [steps, setSteps] = useState([
        { name: 'Order', status: 'complete' },
        { name: 'Prepare', status: 'complete' },
        { name: 'Deliver', status: 'current' },
        { name: 'Review', status: 'upcoming' },
    ])

    useEffect(() => {
        const subscription = DataStore.observe(CafeOrder).subscribe((msg) => {
            // Update the steps based on the new data
            if (msg.model === CafeOrder && msg.opType === 'UPDATE' && msg.element.Completed === false) {
                setSteps([
                    { name: 'Order', status: 'complete' },
                    { name: 'Prepare', status: 'current' },
                    { name: 'Deliver', status: 'upcoming' },
                    { name: 'Review', status: 'upcoming' },
                ])
            } else {
                setSteps([
                    { name: 'Order', status: 'complete' },
                    { name: 'Prepare', status: 'complete' },
                    { name: 'Deliver', status: 'current' },
                    { name: 'Review', status: 'upcoming' },
                ])
            }
        })

        return () => subscription.unsubscribe()
    }, [])


    //current tables occupied & future bookings today and how many guests in branch

    return (
        <>
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
                        src="./versa.gif"
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
              <img
                className="h-8 w-auto"
                src="./versa.gif"
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
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
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
          <div className="px-4 sm:px-6 lg:px-8"><main className='bg-custom-image'>
                <div className="relative isolate overflow-hidden pt-16">
                    {/* Secondary navigation */}
                   

                    {/* Stats */}
                    <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                        <p> {formattedTime} | {formattedDate} </p>
                        <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                            {stats.map((stat, statIdx) => (
                                <div
                                    key={stat.name}
                                    className={classNames(
                                        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                                        'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8'
                                    )}
                                >
                                    <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                                    <dd
                                        className={classNames(
                                            stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                                            'text-xs font-medium'
                                        )}
                                    >
                                        {stat.change}
                                    </dd>
                                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div
                        className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                            style={{
                                clipPath:
                                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                            }}
                        />
                    </div>
                </div>
                <div className="space-y-16 py-16 xl:space-y-20">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                                Todays Bookings
                            </h2>
                        </div>
                        <div className="mt-6 overflow-hidden border-t border-gray-100">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                    <TodaysBookings />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                                        
                <div className="space-y-16 py-16 xl:space-y-20">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                                Current Orders
                            </h2>
                        </div>
                        <div className="mt-6 overflow-hidden border-t border-gray-100">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                    <OrderProgress steps={steps} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent client list*/}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Parties</h2>
                                <a href="#" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    View all<span className="sr-only">, clients</span>
                                </a>
                            </div>
                            <PartyProgress />
                        </div>
                    </div>
                </div>
            </main></div>
        </main>
      </div>

            
        </>
    )
}

