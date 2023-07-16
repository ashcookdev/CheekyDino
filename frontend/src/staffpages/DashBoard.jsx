import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
    Bars3Icon,
    ClockIcon,
    EllipsisHorizontalIcon,
    PlusSmallIcon,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { DataStore } from 'aws-amplify'
import { CafeOrder } from './models'
import { useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import OrderProgress from './orderprogress'
import PartyProgress from './partyProgress'
import { format, set } from 'date-fns'
import { Sessions } from './models'
import { PartyBooking } from './models'
import { Analytics } from 'aws-amplify'


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

    console.log(occupiedTables)
    console.log(currentGuests)



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
            const occupiedTables = sessions.filter(session => session.TimeslotFrom < currentTime && session.TimeslotTo > currentTime);

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
        }

        fetchTodaysOrders()


    }, [])


    //map through orders and get total amount
    const totalAmount = orders.reduce((total, order) => total + order.Total, 0)

    console.log(totalAmount)

    const stats = [
        { name: 'Orders Today', value: order.length, change: '+4.75%', changeType: 'positive' },
        { name: 'Current Orders', value: "0", },
        { name: 'Tables Occupied', value: occupiedTables.length },
        { name: 'Future Bookings Today', value: futureBookings.length },
        { name: 'Guests in Branch', value: currentGuests, },

        { name: 'Total', value: "£" + totalAmount, change: '+10.18%', changeType: 'negative' },
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


            <main className='bg-custom-image'>
                <div className="relative isolate overflow-hidden pt-16">
                    {/* Secondary navigation */}
                    <header className="pb-4 pt-6 sm:pb-6">
                        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                            <h1 className="text-base font-semibold leading-7 text-gray-900">Dashboard</h1>
                            <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                                {secondaryNavigation.map((item) => (
                                    <a key={item.name} href={item.href} className={item.current ? 'text-indigo-600' : 'text-gray-700'}>
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                        </div>
                    </header>

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
                                Curent Orders
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
            </main>
        </>
    )
}
