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
import { Messages, CafeOrder } from "../models";
import { useEffect } from "react";
import Modal from "./modal";  // import the modal component
import { Link } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { Switch } from '@headlessui/react'
import HomeCookedKitchen from "./homecookedkitchen";
import DashChat from './dashchat'





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
  const [filteredOrders, setFilteredOrders] = useState([]);

  

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


  useEffect(() => {
    const fetchCafeOrders = async () => {
      const cafeOrders = await DataStore.query(CafeOrder);
  
      // use Date fns to filter the orders by date
      const today = new Date();
  
      // format the date to match the date in the database
      const formattedDate = format(today, "yyyy-MM-dd");
  
      const cafeOrderFilter = cafeOrders.filter(order => {
        // Check if the order date matches today's date and Kitchen is true
        const isOrderFromToday = order.CreatedDate === formattedDate;
        const isKitchenOrder = order.Kitchen === true;
  
        return isOrderFromToday && isKitchenOrder;
      });
  
      setFilteredOrders(cafeOrderFilter); // Set the state
    }
  
    fetchCafeOrders();
  }, []);


  
  


  // Add your kitchen stats here


  return (
    <div>
    

    <main className="py-10">
  <div className="bg-white mx-auto max-w-7xl sm:px-6 lg:px-8">
  <div className="flex flex-col md:flex-row justify-between items-center text-white text-center py-6 border border-gray-300 shadow-lg bg-gradient-to-tr from-indigo-800 via-purple-500 to-violet-700 rounded-lg">
  {/* Left side: Kitchen time and date */}
  <div className="md:text-left mb-4 md:mb-0">
    <h1 className="ml-10 text-2xl font-medium">Kitchen</h1>
    <p className="mt-2 ml-10">
      {time} | {date}
    </p>
    <p className="mt-2 font-bold ml-10">
      {filteredOrders.length} Kitchen Orders Today
    </p>
  </div>
  
  {/* Right side: Component */}
  <div className="md:w-1/2 mx-auto">
    <Modal show={show} setShow={setShow} message={messages[messages.length - 1]} />
    <DashChat/>
  </div>
</div>

    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 mt-3">
        <h2 className="text-lg font-medium text-purple-700 text-center">Orders</h2>
        <HomeCookedKitchen />
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
  