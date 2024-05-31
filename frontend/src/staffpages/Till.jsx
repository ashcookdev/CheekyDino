import React, { useState, useEffect, Fragment, useRef } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { PartyBooking } from '../models';
import BarCodeScanner from "./barcodescanner";
import { Sessions } from "../models";

import { Messages, KitchenMenu,  } from "../models";
import TillParty from "./TillParty";
import TillPayments from "./TillPayments";
import { useNavigate } from "react-router-dom";
import Timeslot from "./todaysbookings";
import { checkStockLevel } from "./tillstock";
import { motion } from 'framer-motion';
import StaffTill from "./StaffTill";
import { ChatBubbleBottomCenterIcon, InboxIcon, XCircleIcon } from "@heroicons/react/24/solid";
import MakeReservation from "./makereservation";
import SlideOver from "./slideover";
import ControlPanel from "./ControlPanel";
import Modal from "./modal";  // import the modal component
import { Switch } from '@headlessui/react'
import HomeCookedTill from "./homecookedtill";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Tabs from "./tabs";
import { set } from "lodash";
import LastOrder from "./lastorder";
import { isToday, format, differenceInMinutes, parse } from 'date-fns';
import EstFoodTime from "./estfoodtime";







const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;





export default function Till() {

  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [table, setTable] = useState("");
  const [party, setPartyBookings] = useState([]);

  const [selectedParty, setSelectedParty] = useState(null);

  const [scanner, setScanner] = useState(false);
  const [arrival, setArrival] = useState(false);
  const [tablee, setTablee] = useState(false);
  const [session, setSession] = useState(false);
  const [childName, setChildName] = useState("");

const [kitchenMenu, setKitchenMenu] = useState([]);
const [partyNow, setPartyNow] = useState(false);
const [confirm, setConfirm] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [kitchen, setKitchen] = useState(false);
const [home, setHome] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(null);
const [staff, setStaff] = useState(null);
const [occupiedSessions, setOccupiedSessions] = useState([]);
const [showCategories, setShowCategories] = useState(true);
const [showItems, setShowItems] = useState(true);
const [showTopBar, setShowTopBar] = useState(false);
const [chat, setChat] = useState(false);
const [drawer, SetDrawer] = useState(false);
const [show, setShow] = useState(false);
const [messages, setMessages] = useState([]);
const [enabled, setEnabled] = useState(false)
const [open, setOpen] = useState(true)
const [reload, setReload] = useState(false)
const [tab, setTab] = useState(false)
const [searchQuery, setSearchQuery] = useState("");
const [filteredItems, setFilteredItems] = useState([]);
const [lastOrder, setLastOrder] = useState(false);
const [dialog, setDialog] = useState(false);





const cancelButtonRef = useRef(null)


if (reload) {
  window.location.reload();
}

useEffect(() => {
  fetchSessions().then(setOccupiedSessions);
}, []);



const navigate = useNavigate();

console.log(order)




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



  async function fetchKitchenMeal() {
    const kitchensMenu = await DataStore.query(KitchenMenu);
    setKitchenMenu(kitchensMenu);

    
  }
  
  useEffect(() => {
    fetchKitchenMeal();
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);
  
    // If the search term is empty, set filtered items to an empty array
    // Otherwise, filter the kitchenMenu based on the search term
    const filteredItems = searchTerm === ""
      ? [] // Empty array when search term is empty
      : kitchenMenu.filter((item) =>
          item.Name.toLowerCase().includes(searchTerm)
        );
  
    // Set filtered items and show categories accordingly
    setFilteredItems(filteredItems);
    setShowCategories(searchTerm === "");
};

const handleClearSearch = () => {
    setSearchQuery(""); // Clear the search query
    setFilteredItems([]); // Reset filtered items
    setShowCategories(true); // Show categories
};

  


  const categories = [...new Set(kitchenMenu.map((item) => item.Category))];

  
  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleItemClick = async (item) => {
    setSelectedItem(item);
    setShowItems(false);
  setShowCategories(false)
setShowTopBar(true)
    // Pass the selected item to the handleProductClick function
    await handleProductClick(item);
  };


  const filteredData = kitchenMenu.filter(
    (item) => item.Category === selectedCategory
  );

    const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  setShowItems(true);
  setShowTopBar(true)
  };
  
  //get all party bookings for today
  

  



  const handleProductClick = async (item) => {
    // Check if the item is a non-stock product (Ingredients === null)
    if (item.Ingredients === null) {
      // For non-stock products, add them to the order directly
      setOrder((order) => [...order, item]);
      setTotal((total) => total + item.Price);
    } else {
      // For regular products, perform stock checking logic
      const inStock = await checkStockLevel(item.id);
      if (!inStock) {
        console.log("This item is not in stock");
        return;
      }
      // Add the product item to the order
      setOrder((order) => [...order, item]);
      // Update the total price
      setTotal((total) => total + item.Price);
    }
  
    // Check if .Extras are null, then showItems(true)
    if (!item.Extras) {
      setShowItems(true);
    }
  };
  
  

  const handleDeleteClick = async (index) => {
    // Remove the item from the order
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);

    // Update the total price
    const newTotal = total - order[index].Price;
    setTotal(newTotal);
  };

  const handleConfirm = async (order, total) => {
    setOrder(order);
    setTotal(total);
    setConfirm(true);
  };


  useEffect(() => {
    async function fetchTodaysPartyBookings() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const allPartyBookings = await DataStore.query(PartyBooking);
      const partyBookings = allPartyBookings.filter(
        (booking) =>

          new Date(booking.PartyDate) >= today &&
          new Date(booking.PartyDate) < tomorrow && booking.LeftBranch === null
      );
      setPartyBookings(partyBookings);
    }

    fetchTodaysPartyBookings();

    const subscription = DataStore.observe(PartyBooking).subscribe(() =>
      fetchTodaysPartyBookings()
    );
    return () => subscription.unsubscribe();
  }, []);


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

  
  

  if (scanner === true) {
    return (<BarCodeScanner />);

  }

  if (arrival === true) {
   navigate('/reservations');
  }

  if (tablee === true) {
    navigate ('/Tables');
  }

  if (session === true) {
    return <HomeCookedTill/>
  }

  if (partyNow === true) {
    return <TillParty selectedParty = {selectedParty} />

 

  }

  if (tab === true) {
    return <Tabs />
  }
  

  if (chat === true) {
    return <SlideOver />
  }

  if (lastOrder === true) {
    return <LastOrder />
  }


  if (kitchen === true) {
    navigate ('/kitchen')
  }

  if (confirm === true) {
    console.log(table); // Log the value of table
    
    if (!table) { // Check if table is falsy (null, undefined, empty string, etc.)
      return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Please Select A Customer Table Before Confirming An Order
                      </Dialog.Title>
                      <div className="mt-2">
                        
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                      onClick={() => setReload(true)}
                    >
                      Okay
                    </button>
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      );
    }
  
    // If childName is not null, return the TillPayments component
    return (
      <TillPayments order={order} total={total} table={table} childName={childName} setOrder={setOrder} setTotal={setTotal} staff={staff} />
    );
  }
  
  
  
  
  

  if (home === true) {
    navigate('/dashboard');
  }
    
  const fetchSessions = async () => {
    const allSessions = await DataStore.query(Sessions);
    return allSessions.filter(
      (s) => s.Arrived === true && s.LeftCenter === false
    );
  };

  const handleTableChange = async (e) => {
    const tableNumber = parseInt(e.target.value);
  
    setTable(tableNumber);
  
    // Search the local datastore for all sessions
    const allSessions = await DataStore.query(Sessions);
  
    // Filter the sessions by table number, arrived status, and left center status
    const sessions = allSessions.filter(
      (s) => s.Table === tableNumber && s.Arrived === true && s.LeftCenter === false
    );
  
    // Get current date and time using date-fns 
    const now = new Date();
    const currentTime = format(now, 'HH:mm');
  
    // Loop over the sessions
    for (let session of sessions) {
      const timeslotFromDate = parse(session.TimeslotFrom, 'HH:mm', new Date());
      const timeslotToDate = parse(session.TimeslotTo, 'HH:mm', new Date());
  
      // Find out if the current time is within the 30 mins within TimeslotTo
      const isWithinTimeslot = differenceInMinutes(timeslotToDate, now) <= 30;
  
      // If the current time is within the 30 mins of the TimeslotTo, show a message
      if (isWithinTimeslot) {
        setDialog(true);
        setEnabled(true);
        setTimeout(() => {
          setDialog(false);
        }, 3000); // 3000 milliseconds = 3 seconds
        break; // Exit the loop as soon as we find a session within the timeslot
      }
      
    }
  
    // Update the state with the child name from the first session
    if (sessions.length > 0) {
      setChildName(sessions[0].Name);
    } else {
      setChildName("");
    }
  };

  


  const colors = [
    
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-purple-700',
    'bg-gray-500',
  ];
  
  const handleSelectedChange = (selectedStaff) => {
    console.log('Selected staff member:', selectedStaff);
    setStaff(selectedStaff.StaffId)

    // You can add your own logic here to handle the change in the selected staff member
  };

  const handleBackClick = () => {
    setShowItems(false);
    setShowCategories(true);
  setShowTopBar(true)
  }




  


  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className='fixed top-0 w-full mx-auto'>
        <Modal show={show} setShow={setShow} message={messages[messages.length - 1]} />
        





      </div>

      {!showTopBar && (
    <div className="mt-2 border-b border-gray-200 pb-2 flex flex-col sm:flex-row items-center">
 <motion.button
  className="w-8 h-8 bg-purple-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center rounded-full"
  onClick={() => setChat(true)}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  <ChatBubbleBottomCenterIcon className="h-6 w-6" />
</motion.button>

    <StaffTill onSelectChange={handleSelectedChange} />

    <label htmlFor="table" className="block font-bold text-xs mr-2 ml-3">
  Table:
</label>
<select
  id="table"
  value={table} // Use the value prop to specify the currently selected option
  onChange={handleTableChange}
  className={`border rounded-md p-1 mr-2 bg-green-200 transform transition-transform duration-500 ${!table && 'animate-pulse scale-110'}`}
>
  <option value="" disabled>Please select table</option>
  {occupiedSessions.map((session) => (
    <option key={session.Table} value={session.Table}>
      {`Table: ${session.Table} - Adult Name: ${session.Name}`}
    </option>
  ))}
</select>








      <div className="flex-grow justify-start flex flex-wrap">
        {party.map((partyBooking) => (
          <button
          className="mt-2 items-center animate-pulse block w-1/5 ml-1 rounded-md border-0 py-1.5 pl-2 pr-10 text-gray-900 ring-1 ring-inset ring-purple-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"            
          key={partyBooking.id}
            onClick={() =>
              setSelectedParty(partyBooking.id) || setPartyNow(true)
            }
          >
            {partyBooking.ChildName} {partyBooking.PartyTime} Party
          </button>
        ))}
      </div>
      <motion.button
  className="w-16 h-16 bg-purple-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
  onClick={() => setSession(true)}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  <img src="homecooked.png" alt="your-alt-text" />
</motion.button>

    <motion.button
      className="w-16 h-16 bg-pink-500 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
      onClick={() => navigate('/dashboard')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Home
    </motion.button>
    <div className="flex">
      <motion.button
        className="w-16 h-16 bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        onClick={() => setScanner(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Scan QR Code
      </motion.button>
      <motion.button
        className="w-16 h-16 bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        onClick={() => setArrival(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Make Booking
      </motion.button>
      <motion.button
        className="w-16 h-16 bg-red-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        onClick={() => setTablee(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Tables
      </motion.button>
      

      <motion.button
        className="w-16 h-16 bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        onClick={() => setKitchen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <EstFoodTime />
      </motion.button>
      <motion.button
  className="w-16 h-16 bg-yellow-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
  onClick={() => SetDrawer(true)}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Controls
</motion.button>




{drawer && (
 <ControlPanel />
)}
</div>


    </div>
  )}

  





     
  <div className="flex flex-col lg:flex-row justify-between">
  <div className="w-full lg:w-2/3">
  <div className=" flex flex-start mt-2 mb-4">
  <div className="flex">
    <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search items..."
        className="block w-1/2 rounded-md border-0 py-1.5 px-3 text-purple-900 shadow-sm ring-1 ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
    {searchQuery && (
        <button
            onClick={handleClearSearch}
            className="ml-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
            Clear
        </button>
    )}
</div>

       <button onClick={()=>{
      setLastOrder(true)
    }
    } className="rounded-full flex ml-5 bg-green-600 mt-5 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Last Order
    </button>
    <div>
        {dialog && (
          <div className="rounded-md bg-red-50 p-4 animate-pulse">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Cannot Serve Food As TimeSlot is 30 mins till End</h3>
                
              </div>
            </div>
          </div>

        )}
        </div>
       
      </div>
      {/* Display filtered items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <motion.button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`text-white font-bold h-20 w-30 py-2 px-4  shadow-md bg-purple-500`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {item.Name} - £{item.Price.toFixed(2)} - Stock: {item.StockLevel}
          </motion.button>
        ))}
      </div>
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mt-4 border-b-2 border-gray-200 pb-4">
        {showCategories && (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {categories
      .slice() // Create a shallow copy of the array to avoid modifying the original
      .sort((a, b) => a.localeCompare(b)) // Sort the categories alphabetically
      .map((category, index) => {
        const allowedCategories = ['Event', 'Hot Drinks', 'Kids Drinks', 'Cold Drinks', 'Snacks'];

        if (!enabled || (enabled && allowedCategories.includes(category))) {
          return (
            <motion.button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`${
                colors[index % colors.length]
              } text-white font-bold h-20 w-30 py-2 px-4  shadow-md`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {category}
            </motion.button>
          );
        }

        return null;
      })}
  </div>
)}



{showItems && (
  <div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {filteredData
        .sort((a, b) => a.Name.localeCompare(b.Name)) // Sort alphabetically based on the Name property
        .map((item, index) => {
          let stockColor;
          if (item.StockLevel < 5) {
            stockColor = 'bg-red-500';
          } else if (item.StockLevel >= 5 && item.StockLevel <= 10) {
            stockColor = 'bg-yellow-500';
          } else {
            stockColor = colors[index % colors.length];
          }

          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`text-white font-bold h-20 w-30 py-2 px-4  shadow-md  ${stockColor}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.Name} - £{item.Price.toFixed(2)} - Stock: {item.StockLevel}
            </motion.button>
          );
        })}
    </div>
    <button onClick={handleBackClick} className="rounded-full bg-red-600 mt-5 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

      Back
    </button>
  </div>
)}

    {selectedItem && selectedItem.Extras && (
  <motion.div
    className="mt-10 mr-3 ml-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="font-bold">Extras:</h3>
    <ul>
      {selectedItem.Extras.map((extra, index) => {
        const kitchenItem = kitchenMenu.find(item => item.Name === extra.name);

        // Check if the kitchenItem exists and has a valid price
        if (kitchenItem && extra.price !== undefined) {
          // Create a modified copy of kitchenItem with the desired price
          const modifiedKitchenItem = {
            ...kitchenItem,
            Price: extra.price, // Replace with the desired price
          };

          return (
            <motion.button
              onClick={() => handleProductClick(modifiedKitchenItem)}
              key={index}
              className={`text-blue-500 font-bold py-2 px-4 rounded-full shadow-md mt-2 mr-2`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {extra.name} - £{extra.price} - Stock: {kitchenItem.StockLevel ? kitchenItem.StockLevel : 'N/A'}
            </motion.button>
          );
        } else {
          // Handle the case where kitchenItem or extra.price is undefined
          return null // You can choose to display nothing or handle it differently
        }
          
        
      })}
       <button onClick={handleBackClick} className="rounded-full bg-red-600 mt-5 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

Back
</button>
    </ul>
  </motion.div>
)}



            </div>
            </div>
            </div>






        <div className="w-1/3 border-purple-400">

        <div className="border  p-4 mt-2 bg-purple-200 p-4 rounded-lg shadow-md">
        {/* <button onClick={() => setTab(true)} className="rounded-full flex bg-blue-600 mt-5 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Tabs
    </button> */}

        <Switch.Group as="div" className="flex items-center mb-2 mt-2">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">Over Ride</span>{' '}
      </Switch.Label>
    </Switch.Group>
    

   

        <p className="font-bold">Table:{table}</p>
              <p className="font-bold"> Name:{childName}</p>
              <p className="font-bold"> Staff:{staff}</p>
              </div>
          <div className="mt-4 border-b-4 border-gray-200 pb-4">
            <h2 className="font-bold text-lg mb-4">Order:</h2>
            <div className="border bg-blue-200 p-4 rounded-lg shadow-md">
              <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
             
               onClick={() => {
              window.location.reload();
              }}
             className="bg-red-500 text-white p-1 rounded">Cancel</motion.button>

              <ul>
             
                {order.map((item, index) => (
                  <li key={index} className="flex mt-3 justify-between items-center font-bold mb-5">
                    <div>
                      {item.Name} £{item.Price.toFixed(2)}
                    </div>
                    <motion.button
      className="bg-red-500 text-white p-1 rounded"
      onClick={() => handleDeleteClick(index)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <XCircleIcon className="w-5 h-5" />
    </motion.button>

                  </li>
                ))}
              </ul>
              <p className="mt-3 mb-3 font-bold">Total: £{total.toFixed(2)}</p>
              <motion.button                 onClick={() => handleConfirm(order, total)}

        className="w-16 h-10 mt-3 mb-3 bg-purple-600 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Confirm
      </motion.button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
      );
}