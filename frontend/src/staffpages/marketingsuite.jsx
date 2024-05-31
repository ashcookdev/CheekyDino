import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, Bars3Icon, HomeIcon, CurrencyPoundIcon, QrCodeIcon, ChatBubbleBottomCenterIcon, ChatBubbleLeftRightIcon, BellIcon, BoltIcon, CakeIcon, TableCellsIcon, HeartIcon, SunIcon, StarIcon, PencilIcon, TvIcon, ClockIcon, UsersIcon, ChartPieIcon, CogIcon, KeyIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import {DataStore} from 'aws-amplify';
import { CustomerEnquiries, Sessions } from '../models';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import ChatGPTMarketing from './chatgptmarketing';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function MarketingSuite() {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [updatedNavigation, setUpdatedNavigation] = useState([])
    const [topCustomers, setTopCustomers] = useState([]);
    const [topSpendingCustomers, setTopSpendingCustomers] = useState([]);
    const [orderCounts, setOrderCounts] = useState({ ordered: 0, notOrdered: 0 });
    const [showGptMarketing, setShowGptMarketing] = useState(false);
    const [emails, setEmails] = useState([]);
    const [sliceValue, setSliceValue] = useState(20);
    

    
    //     const fetchSessions = async () => {
    //         const sessions = await DataStore.query(Sessions);
    //         const emailCounts = {};

    //         // Loop through all sessions
    //         for (let session of sessions) {
    //             // Only consider sessions where the email contains '@'
    //             if (session.Email && session.Email.includes('@')) {
    //                 if (emailCounts[session.Email]) {
    //                     emailCounts[session.Email].count += 1;
    //                 } else {
    //                     emailCounts[session.Email] = {
    //                         name: session.Name,
    //                         email: session.Email,
    //                         count: 1
    //                     };
    //                 }
    //             }
    //         }

    //         // Sort the emails by the count and get the top 'sliceValue' number of items
    //         const sortedEmails = Object.values(emailCounts).sort((a, b) => b.count - a.count).slice(0, sliceValue);

    //         setTopCustomers(sortedEmails);
    //     };

    //     fetchSessions();
    // }, [sliceValue]);

    // work out the customers who have spent the most

    const handleSliceChange = (value) => {
        setSliceValue(value);
    };



    



    useEffect(() => {
        const fetchSessions = async () => {
          const sessions = await DataStore.query(Sessions);
          const emailCounts = {};
          const spendingCounts = {};
      
          // Loop through all sessions
          for (let session of sessions) {
            // Only consider sessions where the email contains '@' and EmailSubscription is not false
            if (session.Email && session.Email.includes('@') && session.EmailSubscription !== false) {
              if (emailCounts[session.Email]) {
                emailCounts[session.Email].count += 1;
                spendingCounts[session.Email].totalSpent += session.TotalSpent;
              } else {
                emailCounts[session.Email] = {
                  name: session.Name,
                  email: session.Email,
                  count: 1
                };
                spendingCounts[session.Email] = {
                  name: session.Name,
                  email: session.Email,
                  totalSpent: session.TotalSpent
                };
              }
            }
          }
      
          // Sort the emails by the count and get the top customers based on slice value
          const sortedEmails = Object.values(emailCounts).sort((a, b) => b.count - a.count).slice(0, sliceValue);
          const sortedSpendingEmails = Object.values(spendingCounts).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, sliceValue);
      
          setTopCustomers(sortedEmails);
          setTopSpendingCustomers(sortedSpendingEmails);
        };
      
        fetchSessions();
      }, [sliceValue]);
      

    


    const navigation = [
        { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false},
        { name: 'Till', href: '/till', icon: CurrencyPoundIcon, current: true },
        {name: 'Make a Booking', href: '/reservations', icon: PencilIcon, current: false },
        {name: 'QR Code Scanner', href: '/Barcode', icon: QrCodeIcon, current: false },
      { name: 'Chat', href: '/chat', icon: ChatBubbleBottomCenterIcon, current: false },
      { name: 'Customer Chat', href: '/customerenquiries', icon: ChatBubbleLeftRightIcon, current: false },
      { name: 'Make Announcements', href: '/announcement', icon: BellIcon, current: false },
      { name: 'Control Panel', href: '/controlpanel', icon: BoltIcon, current: false },
      { name: 'Kitchen', href: '/kitchen', icon: CakeIcon , current: false },
      { name: 'Tables', href: '/Tables', icon: TableCellsIcon, current: false },
      { name: 'Popular Items', href: '/tillhistory', icon: HeartIcon, current: false},
      {name: 'Create Event', href: '/createevent', icon: SunIcon, current: false},
      {name: 'HomeCooked Orders', href: '/hcmhistory', icon: StarIcon, current: false },
    
      { name: 'Edit Landing Page', href: '/edithome', icon: PencilIcon, current: false },
      {name: 'Customer Screen', href: '/customerscreen', icon: TvIcon, current: false },
      {name: 'Front Customer Screen', href: '/customerscreenfront', icon: TvIcon, current: false },
    
      
      {name: 'Clock In', href: '/clockin', icon: ClockIcon, current: false },
      {name: 'Staff', href: '/staff', icon: UsersIcon, current: false },
    { name: 'Reports', href: '/finance', icon: ChartPieIcon, current: false },
    {name: 'Settings', href: '/settings', icon: CogIcon, current: false },
    {name: 'Master Close', href: '/masterclose', icon: KeyIcon, current: false },  
    
    ]


    const teams = [{ id: 1, name: 'Orders', href: '/orders', initial: 'O', current: false },
    { id: 3, name: 'Sessions', href: '/sessionhistory', initial: 'T', current: false },
    { id: 4, name: 'Parties', href: '/partyhistory', initial: 'P', current: false },
  ]

  async function getUnrepliedMessagesCount() {

    const unrepliedMessages = await DataStore.query(CustomerEnquiries);
    const filteredMessages = unrepliedMessages.filter(message => message.Replied === false);
  
    console.log(filteredMessages.length)
  
  
    return filteredMessages.length;
  
    
  }
  
  // Call the function and update the navigation
  useEffect(() => {
    getUnrepliedMessagesCount().then(unrepliedCount => {
      const newNavigation = navigation.map(item => {
        if (item.name === 'Customer Chat') {
          return { ...item, name: `Customer Chat (${unrepliedCount})` };
        }
        return item;
        
      });
      setUpdatedNavigation(newNavigation);
    });
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
        const sessions = await DataStore.query(Sessions);
        let ordered = 0;
        let notOrdered = 0;

        // Loop through all sessions
        for (let session of sessions) {
            // Only consider sessions where the email contains '@'
            if (session.Email && session.Email.includes('@')) {
                if (session.Orders > 0) {
                    ordered += 1;
                } else if (session.Orders === 0) {
                    notOrdered += 1;
                }
            }
        }

        setOrderCounts({ ordered, notOrdered });
    };

    fetchSessions();
}, []);




const data = [
    { name: 'Ordered', value: orderCounts.ordered },
    { name: 'Not Ordered', value: orderCounts.notOrdered }
];


const COLORS = ['#0088FE', '#00C49F'];

const handleMarketing = (topCustomers) => {
    console.log(topCustomers);
    // get all emails from topCustomers
    const emails = topCustomers.map(customer => customer.email);

    // send an email to each email in the emails array
   setEmails(emails);

    setShowGptMarketing(true);





}

if (showGptMarketing === true) {
    return <ChatGPTMarketing emails={emails} />
    
}



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
                                src="./versalogo.png"
                                alt="Your Company"
                              />
                            </div>
                            <nav className="flex flex-1 flex-col">
                              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                  <ul role="list" className="-mx-2 space-y-1">
                                  {updatedNavigation.map((item) => (
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
                                  <div className="text-xs font-semibold leading-6 text-purple-500">Your teams</div>
                                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                                    {teams.map((team) => (
                                      <li key={team.name}>
                                        <Link
                                          to={team.href}
                                          className={classNames(
                                            team.current
                                              ? 'bg-purple-500 text-indigo-600'
                                              : 'text-indigo-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                          )}
                                        >
                                          <span
                                            className={classNames(
                                              team.current
                                                ? 'text-indigo-600 border-indigo-600'
                                                : 'text-indigo-600 border-purple-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
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
                          {updatedNavigation.map((item) => (                      <li key={item.name}>
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
               
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <img
        src="versa.gif"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
     

        <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Marketing Centre</h2>
        
      </div>
    </div>
    <div className="relative flex max-w-7xl mx-auto px-6 lg:px-8 mt-10">
    <h2 className=" justify-between mb-5 mt-5 text-2xl font-bold text-gray-900 items-center">Top Customers</h2>
    <button onClick={() => handleMarketing(topCustomers)} className="bg-indigo-500 justify-between ml-10 text-white px-4 py-2 rounded-lg hover:bg-indigo-900">Send Marketing Email</button>

</div>
<div className="relative flex max-w-7xl mx-auto px-6 lg:px-8 mt-10">
<select         className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
 value={sliceValue} onChange={(e) => handleSliceChange(parseInt(e.target.value))}>
                <option value={20}>Show Top 20</option>
                <option value={50}>Show Top 50</option>
                <option value={100}>Show Top 100</option>
                <option value={50000}>Show All</option>
            </select>
</div>


    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 mt-10">
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-3">
    {topCustomers.map((customer, index) => {
        let colorClass = "text-gray-900";
        if (index === 0) colorClass = "text-amber-500";
        else if (index === 1) colorClass = "text-slate-400";
        else if (index === 2) colorClass = "text-amber-700";
        else if (index > 2) colorClass = "text-green-500";

        return (
            <div key={customer.email} className={`relative flex items-center space-x-3 rounded-lg ${colorClass} border border-gray-300 bg-indigo-50 px-6 py-5 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400`}>
                <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-white ${colorClass}`}>
                        <span>{index + 1}</span>
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className={`text-sm font-medium ${colorClass}`}>{customer.name}</p>
                        <p className="truncate text-sm text-black">{customer.email}</p>
                        <p className="truncate text-sm text-black">Visited {customer.count} times</p>
                </div>
                

            </div>
            
        );

    })}
</div>
</div>
<div className="relative flex max-w-7xl mx-auto px-6 lg:px-8 mt-10">
    <h2 className=" justify-between mb-5 mt-5 text-2xl font-bold text-gray-900 items-center">Top Spenders</h2>
    
</div>
<div className="grid grid-cols-3 gap-4 sm:grid-cols-3 mt-20">
    {topSpendingCustomers.map((customer, index) => {
        let colorClass = "text-gray-900";
        if (index === 0) colorClass = "text-amber-500";
        else if (index === 1) colorClass = "text-slate-400";
        else if (index === 2) colorClass = "text-amber-700";
        else if (index > 2) colorClass = "text-green-500";

        return (
            <div key={customer.email} className={`relative flex items-center space-x-3 rounded-lg ${colorClass} border border-gray-300 bg-purple-50 px-6 py-5 shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400`}>
                <div className="flex-shrink-0">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center bg-white ${colorClass}`}>
                        <span>{index + 1}</span>
                    </div>
                </div>
                <div className="min-w-0 flex-1">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className={`text-sm font-medium ${colorClass}`}>{customer.name}</p>
                        <p className="truncate text-sm text-black">{customer.email}</p>
                        <p className="truncate text-sm text-black">Total £{customer.totalSpent.toFixed(2)}</p>
                    </a>
                </div>
            </div>
        );
    })}
</div>
<div className="relative flex max-w-7xl mx-auto px-6 lg:px-8 mt-10">
    <h2 className=" justify-between mb-5 mt-5 text-2xl font-bold text-gray-900 items-center">Orders</h2>


</div>
<div className="grid grid-cols-2 gap-4 sm:grid-cols-2 mt-20">
<div className="border-2 border-gray-300 bg-white bg-opacity-50 p-4">
    <h2 className="text-xl font-bold mb-4">Order Statistics</h2>
    <p className="text-gray-700 mb-4">This pie chart shows the percentage of sessions where an order was made versus where no order was made.</p>
    <PieChart width={400} height={400}>
        <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
        >
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
        </Pie>
        <Tooltip />
    </PieChart>
</div>
</div>
                               


               
        
                    </main>
                    
                    </div>
                   
        
                    
                </>







    )







}
