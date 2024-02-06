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
  BoltIcon,


} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DataStore } from "aws-amplify";
import { Messages } from "../models";
import { useEffect } from "react";
import Modal from "./modal";  // import the modal component
import { Link } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { Switch } from '@headlessui/react'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')


}


const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;



export default function Kitchen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [enabled, setEnabled] = useState(false);

  

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




if (enabled) {
  
}
  
  


  // Add your kitchen stats here


  return (
    <div>
    

    <main className="py-10">
  <div className="bg-white mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="text-white text-center py-6 border border-gray-300 shadow-lg bg-gradient-to-tr from-indigo-800 via-purple-500 to-violet-700 rounded-lg ">
      <h1 className="text-2xl font-medium">Kitchen</h1>
      <p className="mt-2">
        {time} | {date}
      </p>
      <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative mt-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Events</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
      <div className="mt-4"></div>
      <div className='fixed top-0 w-full mx-auto'>
        <Modal show={show} setShow={setShow} message={messages[messages.length - 1]} />
      </div>
    </div>

    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 mt-3">
        <h2 className="text-lg font-medium text-purple-700 text-center">Orders</h2>
        <CafeKitchen />
      </div>
      <div className="w-full md:w-1/2 border-l border-gray-300">
        <h2 className="text-lg font-medium text-purple-700 mt-3 text-center">Party</h2>
        <PartyKitchen />
      </div>
    </div>
  </div>
</main>
    </div>
)}
  