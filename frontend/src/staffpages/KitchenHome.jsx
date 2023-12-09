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



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')


}


const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;



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
    if (ipcRenderer) {
      ipcRenderer.send('play-sound');
    }
    setTimeout(() => setShow(false), 30000); // hide after 30 seconds
  });

  return () => subscription.unsubscribe();
}, []);


  const now = new Date();

  // Format the time and date using date-fns
  const time = format(now, "h:mm a");
  const date = format(now, "EEEE, MMMM do, yyyy");





  
  


  // Add your kitchen stats here


  return (
    <div>
    

    <main className="py-10">
  <div
    className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-800 via-purple-700 to-sky-300 mx-auto max-w-7xl sm:px-6 lg:px-8"
  >
    <div className="text-white py-6">
    <button className="rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" onClick={() => {ipcRenderer.send('play-sound');
        }
      }>Play</button>
      <h1 className="text-2xl font-medium">Kitchen</h1>
      <p className="mt-2">
        {time} | {date}
      </p>
      <div className="mt-4"></div>
      <div className='fixed top-0 w-full mx-auto'>
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
</main>

      </div>
  );
}






  