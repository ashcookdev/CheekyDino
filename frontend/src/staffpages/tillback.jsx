import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";


export default function TillBack() {


// get the data from the local storage object

const [order, setOrder] = useState([]);
const [total, setTotal] = useState(0);
const [table, setTable] = useState('');
const [childName, setChildName] = useState('');
const [staff, setStaff] = useState('');






useEffect(() => {
    const data = getData();
    setOrder(data.order);
    setTotal(data.total);
    setTable(data.table);
    setChildName(data.childName);
    setStaff(data.staff);
    // Add other state updates here
  }, []);

  // Function to retrieve data from local storage
  const getData = () => {
    const data = localStorage.getItem('data');
    if (data) {
      return JSON.parse(data);
    }

    return {
      order: [],
      total: 0,
      table: '',
      childName: '',
      staff: '',
    };
    // delete the data from the local storage object
    localStorage.removeItem('data');
    
  };
    
  
  const [party, setPartyBookings] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [scanner, setScanner] = useState(false);
  const [arrival, setArrival] = useState(false);
  const [tablee, setTablee] = useState(false);
  const [session, setSession] = useState(false);
  const [kitchenMenu, setKitchenMenu] = useState([]);
  const [partyNow, setPartyNow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [kitchen, setKitchen] = useState(false);
  const [home, setHome] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [occupiedSessions, setOccupiedSessions] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [showItems, setShowItems] = useState(true);
  const [showTopBar, setShowTopBar] = useState(false);
  const [chat, setChat] = useState(false);
  const [drawer, SetDrawer] = useState(false);
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enabled, setEnabled] = useState(false);





  useEffect(() => {
    fetchSessions().then(setOccupiedSessions);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const subscription = DataStore.observe(Messages).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      setMessages(prevMessages => [...prevMessages, msg.element]);
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


  const categories = [...new Set(kitchenMenu.map((item) => item.Category))];

  
  const [selectedItem, setSelectedItem] = useState(null);
  
  const handleItemClick = async (item) => {
    setSelectedItem(item);
    setShowItems(false);
  setShowCategories(true)
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
        alert("This item is not in stock");
        return;
      }
      // Add the product item to the order
      setOrder((order) => [...order, item]);
      // Update the total price
      setTotal((total) => total + item.Price);
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
          new Date(booking.PartyDate) < tomorrow
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
    return <MakeReservation />
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

  if (chat === true) {
    return <SlideOver />
  }

  if (kitchen === true) {
    navigate ('/kitchen')
  }
  if (confirm === true) {

    if (staff === null) {

window.location.reload();
        }
    
    return (
      <TillPayments order={order} total={total} table={table} childName= {childName} setOrder={setOrder} setTotal={setTotal} staff={staff} />
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
  value={table}
  onChange={handleTableChange}
  className="border rounded-md p-1 mr-2 bg-green-200"
>
  <option value="" disabled selected>Please select table</option>
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
      onClick={() => setHome(true)}
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
        Kitchen
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
          return null; // You can choose to display nothing or handle it differently
        }
      })}
    </ul>
  </motion.div>
)}



            </div>
            </div>
            </div>






        <div className="w-1/3 border-purple-400">

        <div className="border  p-4 mt-2 bg-purple-200 p-4 rounded-lg shadow-md">
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
        <span className="font-medium text-gray-900">Event</span>{' '}
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
