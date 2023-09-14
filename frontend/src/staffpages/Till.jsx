import React, { useState, useEffect } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { format, parse, set } from "date-fns";
import { PartyBooking } from './models';
import { PartyGuests } from './models';
import BarCodeScanner from "./barcodescanner";
import TillBooking from "./tillbooking";
import { Sessions } from "./models";
import Tables from "./tables";
import { Analytics } from 'aws-amplify';
import TillSession from "./tillsession";
import { HotDrinks, SoftDrinks, Confectionary, KitchenMenu, Extras } from "./models";
import TillParty from "./TillParty";
import TillPayments from "./TillPayments";
import { useNavigate } from "react-router-dom";
import Kitchen from "./KitchenHome";
import Timeslot from "./todaysbookings";
import Home from "./DashBoard";
import { checkStockLevel } from "./tillstock";
import { motion } from 'framer-motion';
import StaffTill from "./StaffTill";





export default function Till() {
  const [showSoftDrinks, setShowSoftDrinks] = useState(false);
  const [showHotFood, setShowHotFood] = useState(false);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [table, setTable] = useState(1);
  const [party, setPartyBookings] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

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
useEffect(() => {
  fetchSessions().then(setOccupiedSessions);
}, []);



const navigate = useNavigate();

console.log(order)





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

    // Pass the selected item to the handleProductClick function
    await handleProductClick(item);
  };


  const filteredData = kitchenMenu.filter(
    (item) => item.Category === selectedCategory
  );

    const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };
  
  //get all party bookings for today
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const handleProductClick = async (item) => {
    // Check the stock level of the product
    const inStock = await checkStockLevel(item.id);
    if (!inStock) {
      alert("This item is not in stock");
      return;
    }
  
    // Add the product item to the order
    setOrder((order) => [...order, item]);
  
    // Update the total price
    setTotal((total) => total + item.Price);
    // add all prep times together for kitchen orders
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



  

  
  

  if (scanner === true) {
    return (<BarCodeScanner />);

  }

  if (arrival === true) {
    return <TillBooking />
  }

  if (tablee === true) {
    navigate ('/Tables')
  }

  if (session === true) {
    return <Timeslot/>
  }

  if (partyNow === true) {
    return <TillParty selectedParty = {selectedParty} />

 

  }

  if (kitchen === true) {
    return <Kitchen />
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
    return <Home />
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

  const handleExtrasClick = async (extra) => { 
    // Add the extra item to the order
    // setOrder((order) => [...order, extra]);
  
    // // Update the total price
    // setTotal((total) => total + extra.price);
    console.log(extra)
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

    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 fixed inset-0 overflow-hidden">
    <div className="mt-2 border-b border-gray-200 pb-2 flex flex-col sm:flex-row items-center">
      <div className="flex justify-between"></div>
    <StaffTill onSelectChange={handleSelectedChange} />

    <label htmlFor="table" className="block font-bold text-xs mr-2 ml-3 animate-pulse">
  Table:
</label>
<select
  id="table"
  value={table}
  onChange={handleTableChange}
  className="border rounded-md p-1 mr-2 bg-green-500 "
>
  {occupiedSessions.map((session) => (
    <option key={session.Table} value={session.Table}>
      Table:{session.Table} - Adult Name: {session.Name}
    </option>
  ))}
</select>

      <div className="flex-grow justify-start flex flex-wrap">
        {party.map((partyBooking) => (
          <button
            className="w-full sm:w-auto h-16 bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center animate-pulse"
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
        className="w-16 h-16 bg-purple-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        onClick={() => setSession(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Sessions
      </motion.button>
      <motion.button
        className="w-16 h-16 bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        onClick={() => setKitchen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Kitchen
      </motion.button>
    </div>
  </div>

     
  <div className="flex flex-col lg:flex-row justify-between">
  <div className="w-full lg:w-2/3">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mt-4 border-b-2 border-gray-200 pb-4">
        <h2 className="font-bold text-lg mb-4">Menu:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`${
                colors[index % colors.length]
              } text-white font-bold py-2 px-4 rounded-full shadow-md`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      {selectedCategory && (
        <div className="mt-10 mr-5 ml-5">
          {filteredData.map((item,index) => {
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
                className={`text-white font-bold py-2 px-4 rounded-full shadow-md mt-2 mr-2 ${stockColor}`}
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
    <h3>Extras:</h3>
    <ul>
      {selectedItem.Extras.map((extra, index) => {
        const kitchenItem = kitchenMenu.find(item => item.Name === extra.name);
        return (
          <motion.button
          onClick={() => handleProductClick(kitchenItem)}
          key={index}
            className={`text-blue-500 font-bold py-2 px-4 rounded-full shadow-md mt-2 mr-2`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {extra.name} - £{extra.price.toFixed(2)} - Stock: {kitchenMenu ? kitchenItem.StockLevel : 'N/A'}
          </motion.button>
        );
      })}
    </ul>
  </motion.div>
)}


            </div>
            </div>
            </div>






        <div className="w-1/3 border-purple-400">
          <div className="mt-4 border-b-4 border-gray-200 pb-4">
            <h2 className="font-bold text-lg mb-4">Order:</h2>
            <div className="border border-gray-400 p-4">
              <ul>
                {order.map((item, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <div>
                      {item.Name} £{item.Price.toFixed(2)}
                    </div>
                    <button
                      className="bg-red-500 text-white p-1 rounded"
                      onClick={() => handleDeleteClick(index)}
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
              <p>Total: £{total.toFixed(2)}</p>
              <motion.button                 onClick={() => handleConfirm(order, total)}

        className="w-16 h-10 bg-purple-600 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
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
