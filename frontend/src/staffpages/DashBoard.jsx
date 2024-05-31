import { Fragment, useState, useRef } from 'react'
import { DataStore } from 'aws-amplify'
import { CustomerEnquiries } from '../models'
import { useEffect } from 'react'
import OrderProgress from './orderprogress'
import PartyProgress from './partyProgress'
import { format, set } from 'date-fns'
import { Sessions } from '../models'
import { PartyBooking } from '../models'
import { Dialog, Menu, Transition } from '@headlessui/react'
import Online from './online'
import Stats from './stats'
import PartyStock from './partystock'
import CafeKitchen from './CafeKitchen'
import DashChat from './dashchat'
import Finances from './financials'
import Tables from './tables'
import TableLayout from './tablelayout'
import { Messages } from '../models'

import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  FolderIcon,
  HomeIcon,
  KeyIcon,
  MicrophoneIcon,
  UserCircleIcon,
  UserPlusIcon,
  UsersIcon,
  XMarkIcon,
  CheckIcon,
  SunIcon,
  WifiIcon,
  FunnelIcon,
  SwatchIcon,
  ViewGridIcon,
  
  
  
} from '@heroicons/react/24/outline'
import TodaysBookings from './todaysbookings'
import Announcements from './Announcement'
import { ArrowLeftIcon, BoltIcon, CakeIcon, ChatBubbleBottomCenterIcon, ClockIcon, CloudIcon, CogIcon, CurrencyPoundIcon, HeartIcon, LightBulbIcon,PencilIcon, PhoneIcon, PowerIcon, QrCodeIcon, StarIcon, TableCellsIcon, TvIcon, LinkIcon

} from '@heroicons/react/20/solid'
import Modal from './modal'
import { Link } from 'react-router-dom'
import UsedByStock from './UsedByStock'
import TillProducts from './tillproducts'
import Weather from './weatherdata'
import HomeCookedStats from './homecookedstats'
import JobApplicationBanner from './applicationbanner'
import InterviewTodayBanner from './interviewtodaybanner'
import { BellIcon } from '@heroicons/react/24/solid'
import FutureOnlineBookings from './futureonlinebookings'
import ClosingTime from './closingtime'


const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;











function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {

    //get all orders for today from database  

    const navigation = [
      { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false},
      { name: 'Till', href: '/till', icon: CurrencyPoundIcon, current: true },
      {name: 'Make a Booking', href: '/reservations', icon: PencilIcon, current: false },
      {name: 'QR Code Scanner', href: '/Barcode', icon: QrCodeIcon, current: false },
    { name: 'Chat', href: '/chat', icon: ChatBubbleBottomCenterIcon, current: false },
    { name: 'Customer Chat', href: '/customerenquiries', icon: ChatBubbleLeftRightIcon, current: false },
    { name: 'Task Manager', href: '/taskmanager', icon: BellIcon, current: false },
    { name: 'Make Announcements', href: '/announcement', icon: CheckIcon, current: false },
    { name: 'Control Panel', href: '/controlpanel', icon: BoltIcon, current: false },
    { name: 'Kitchen', href: '/kitchen', icon: CakeIcon , current: false },
    { name: 'Tables', href: '/Tables', icon: TableCellsIcon, current: false },
    { name: 'Popular Items', href: '/tillhistory', icon: HeartIcon, current: false},
    {name: 'Create Event', href: '/createevent', icon: SunIcon, current: false},
    {name: 'HomeCooked Orders', href: '/hcmhistory', icon: StarIcon, current: false },
    {name: 'Front Desk Customer Screen', href: '/secondscreen', icon: LinkIcon, current: false },
  
    { name: 'Edit Landing Page', href: '/edithome', icon: PencilIcon, current: false },
    {name: 'Customer Screen', href: '/customerscreen', icon: TvIcon, current: false },
    {name: 'Front Customer Screen', href: '/customerscreenfront', icon: TvIcon, current: false },
  
    
    {name: 'Clock In', href: '/clockin', icon: ClockIcon, current: false },
    {name: 'Staff', href: '/staff', icon: UsersIcon, current: false },
    {name: 'Marketing', href: '/marketingsuite', icon: LightBulbIcon, current: false },
  { name: 'Reports', href: '/finance', icon: ChartPieIcon, current: false },
  {name: 'Settings', href: '/settings', icon: CogIcon, current: false },
  {name: 'Master Close', href: '/masterclose', icon: KeyIcon, current: false },  
  
  ]

    // reload page every 2 minutes

  useEffect(() => {
    const interval = setInterval(() => {
        window.location.reload();
    }, 300000);

    // Clear the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(interval);
}, []);


    
    

const [currentTime, setCurrentTime] = useState(new Date());
const [messages, setMessages] = useState([])
const [show, setShow] = useState(false)
const [updatedNavigation, setUpdatedNavigation] = useState(navigation);


const scrollToRef = useRef(null);


useEffect(() => {
  const subscription = DataStore.observe(Messages).subscribe(msg => {
    console.log(msg.model, msg.opType, msg.element);
    setMessages([msg.element]); // Only keep the last message
    console.log(messages)
    setShow(true);
    setTimeout(() => setShow(false), 30000); // hide after 30 seconds

    // if (isElectron) {
    //   ipcRenderer.send('play-sound', 'message.mp3');
    // }
  });

  return () => subscription.unsubscribe();
}, []);




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







    const [sidebarOpen, setSidebarOpen] = useState(false)

    const teams = [{ id: 1, name: 'Orders', href: '/orders', initial: 'O', current: false },
    { id: 3, name: 'Sessions', href: '/sessionhistory', initial: 'T', current: false },
    { id: 4, name: 'Parties', href: '/partyhistory', initial: 'P', current: false },
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

   

    const [scrollPosition, setScrollPosition] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
      setTouchEndX(e.changedTouches[0].clientX);
    };

    const scrollContainer = document.getElementById('scroll-container');
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (touchStartX !== 0 && touchEndX !== 0) {
      if (touchStartX > touchEndX + 5) {
        handleScroll('right');
      } else if (touchStartX < touchEndX - 5) {
        handleScroll('left');
      }
    }
  }, [touchStartX, touchEndX]);

  const handleScroll = (direction) => {
    const scrollContainer = document.getElementById('scroll-container');
    if (direction === 'left') {
      setScrollPosition(scrollPosition - 100);
      scrollContainer.scrollLeft -= 100;
    } else {
      setScrollPosition(scrollPosition + 100);
      scrollContainer.scrollLeft += 100;
    }
  };

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
        <div className='fixed top-0 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto'>
  <Modal show={show} setShow={setShow} message={messages[messages.length - 1]} />
  <JobApplicationBanner/>
  <InterviewTodayBanner/>
</div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            

            <p className="text-2xl font-semibold text-gray-900">{formattedTime}</p>
            <Weather />
            <button onClick={
              // force reload of page
              () => {
                window.location.reload();
              }

            }
        type="button"
        className="rounded-full bg-red-600 p-2 text-white shadow-sm mr-5 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PowerIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button className='text-purple-500' onClick={() => scrollToRef.current.scrollIntoView({ behavior: 'smooth' })}>
        View Tasks
      </button>



            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          


            
          
                   

                    {/* Stats */}
                    <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5" id='section1'>
                      <ClosingTime/>
                      
<Stats/>      
<div className='mt-3'>
<HomeCookedStats/> </div>                    
 
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
                        
                <div className="space-y-16 py-16 xl:space-y-20">
                    <div>
                        <div ref={scrollToRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                                 Online Staff 
                            </h2>
                            
                        </div>
                        
                        <div className="mt-6 overflow-hidden border-t border-gray-100" id='section6'>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                    <Online/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="space-y-16 py-16 xl:space-y-20">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                                 Chat
                            </h2>
                            
                        </div>
                        <div className="mt-6 overflow-hidden border-t border-gray-100" id='section5'>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                    <DashChat/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                  
                    </div>
                                           
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Tables</h2>
                                <a href="#" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                </a>
                            </div>
<Tables/>                        </div>
                    </div>
                </div>
                

               
                <div className="space-y-16 py-16 xl:space-y-20">
                    <div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >
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
                    
                    <div className="space-y-16 py-16 xl:space-y-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"     style={{ backgroundImage: `url(/background.gif)` }}
>
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold leading-7 text-white">Cafe Kitchen</h2>
                                <Link to = "/kitchen" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                </Link>
                            </div>
                            <CafeKitchen />
                        </div>
                    </div>
                </div>
                    <div className="space-y-16 py-16 xl:space-y-20" id='section3'>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Parties</h2>
                                <Link to = "/partybookings" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    View all<span className="sr-only">, clients</span>
                                </Link>
                            </div>
                            <PartyProgress />
                        </div>
                    </div>
                </div>
                </div>
               
               
               

            </main></div>
           

            
        </>
    )
}

