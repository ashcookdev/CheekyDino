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
  const [hotDrinks, setHotDrinks] = useState([]);
  const [showHotDrinks, setShowHotDrinks] = useState(false);
  const [childName, setChildName] = useState("");
  const [coldDrinks, setColdDrinks] = useState([]);
  const [confectionary, setConfectionary] = useState([]);
  const [showConfectionary, setShowConfectionary] = useState(false);
  const [ShowKidsMeal, setShowKidsMeal] = useState(false); 

const [kitchenMenu, setKitchenMenu] = useState([]);
const [partyNow, setPartyNow] = useState(false);
const [confirm, setConfirm] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [extras, setExtras] = useState([]);
const [ShowExtras, setShowExtras] = useState(false);
const [kitchen, setKitchen] = useState(false);
const [home, setHome] = useState(false);



const navigate = useNavigate();

console.log(order)

async function getExtras() {
  const allExtras = await DataStore.query(Extras);
  setExtras(allExtras);
}

useEffect(() => {
  getExtras();
}, []);




  async function fetchKitchenMeal() {
    const kitchensMenu = await DataStore.query(KitchenMenu);
    setKitchenMenu(kitchensMenu);

    
  }
  
  useEffect(() => {
    fetchKitchenMeal();
  }, []);

  //get all party bookings for today
  async function fetchHotDrinks() {
    const allHotDrinks = await DataStore.query(HotDrinks);
    setHotDrinks(allHotDrinks);
  }


  useEffect(() => {
    fetchHotDrinks();
  }
    , []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const handleProductClick = async (product) => {
    // Add the product item to the order
    setOrder(order => [...order, product]);

    // Update the total price
    setTotal(total => total + product.Price);
    // add all prep times together for kitchen orders
    
    


}

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



  async function fetchColdDrinks() {
    const allColdDrinks = await DataStore.query(SoftDrinks);
    setColdDrinks(allColdDrinks);
  }

  useEffect(() => {
    fetchColdDrinks();
  }, []);

  async function fetchConfectionary() {
    const allConfectionary = await DataStore.query(Confectionary);
    setConfectionary(allConfectionary);
  }

  useEffect(() => {
    fetchConfectionary();
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
    return (
      <TillPayments order={order} total={total} table={table} childName= {childName} setOrder={setOrder} setTotal={setTotal} />
    );
  }

  if (home === true) {
    return <Home />
  }
    


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

  
  



  return (

    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 fixed inset-0 overflow-hidden">
    <div className="mt-2 border-b border-gray-200 pb-2 flex items-center">
  <label htmlFor="table" className="block font-bold text-xs mr-2">
    Table:
  </label>
  <input
    id="table"
    type="number"
    value={table}
    onChange={handleTableChange}
    className="border rounded-md p-1 mr-2"
  />
  {childName && <p>Child Name: {childName}</p>}
  <div className="flex-grow justify-start flex flex-wrap">
    {party.map((partyBooking) => (
      <button
        className="w-20 h-16 bg-indigo-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center animate-pulse"
        key={partyBooking.id}
        onClick={() =>
          setSelectedParty(partyBooking.id) || setPartyNow(true)
        }
      >
        {partyBooking.ChildName} {partyBooking.PartyTime} Party
      </button>
    ))}
  </div>
  <button
    className="w-16 h-16 bg-pink-500 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
    onClick={() => setHome(true)}
  >
    Home
  </button>
  <div className="flex">
    <button
      className="w-16 h-16 bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
      onClick={() => setScanner(true)}
    >
      Scan QR Code
    </button>
    <button
      className="w-16 h-16 bg-blue-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
      onClick={() => setArrival(true)}
    >
      Make Booking
    </button>
    <button
      className="w-16 h-16 bg-red-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
      onClick={() => setTablee(true)}
    >
      Tables
    </button>
    <button
      className="w-16 h-16 bg-purple-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
      onClick={() => setSession(true)}
    >
      Sessions
    </button>
    <button
      className="w-16 h-16 bg-green-600 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
      onClick={() => setKitchen(true)}
    >
      Kitchen
    </button>
  </div>
</div>


     
    <div className="flex justify-between">
  <div className="w-2/3">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mt-4 border-b-2 border-gray-200 pb-4">
        <h2 className="font-bold text-lg mb-4">Menu:</h2>
        <div className="grid grid-cols-4 gap-4">
          <button
            className="w-full h-full bg-red-500 rounded-md p-2"
            onClick={() =>
              setShowSoftDrinks(true) ||
              setShowHotDrinks(false) ||
              setShowHotFood(false) ||
              setShowKidsMeal(false)||
              setShowConfectionary(false)||
              setShowExtras(false)

            }
          >
           Soft Drinks
          </button>
          <button
            className="w-full h-full bg-blue-500 rounded-md p-2"
            onClick={() =>
              setShowHotDrinks(true) ||
              setShowSoftDrinks(false) ||
              setShowHotFood(false) ||
              setShowKidsMeal(false)||
              setShowConfectionary(false)||
              setShowExtras(false)

            }
          >
          Hot Drinks
          </button>
          <button
            className="w-full h-full bg-orange-500 rounded-md p-2"
            onClick={() =>
              setShowKidsMeal(true) ||
              setShowHotDrinks(false) ||
              setShowSoftDrinks(false) ||
              setShowHotFood(false)||
              setShowConfectionary(false)

            }
          >
           Kitchen Food
          </button>

          <button
            className="w-full h-full bg-green-500 rounded-md p-2"
            onClick={() =>
              setShowConfectionary(true) ||
              setShowSoftDrinks(false) ||
              setShowHotDrinks(false) ||
              setShowHotFood(false) ||
              setShowKidsMeal(false)||
              setShowKidsMeal(false)||
              setShowExtras(false)
            }
          >
            Confectionary
            
          </button>
          <button
            className="w-full h-full bg-yellow-500 rounded-md p-2"
            onClick={() =>
              setShowHotFood(true) ||
              setShowSoftDrinks(false) ||
              setShowHotDrinks(false) ||
              setShowConfectionary(false)||
              setShowExtras(false)
            }
          >
            Hot Food
          </button>
        </div>
      </div>
    
            {showSoftDrinks && (
              <div className="mt-4 border-b-2 border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-4">Soft Drinks:</h3>
                <div className="grid grid-cols-4 gap-4">
                  {coldDrinks.map(product => (
                    <button
                      key={product.id}

                      className="w-full h-full bg-blue-200 rounded-md"
                      onClick={() => handleProductClick(product, "Drink Item")}
                    >
                      {product.Name} £{product.Price}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {showHotDrinks && (
              <div className="mt-4 border-b-2 border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-4">Hot Drinks:</h3>
                <div className="grid grid-cols-4 gap-4">
                  {/* Loop through the hotDrinks object and generate buttons for each drink here */}
                  {hotDrinks.map(product => (
                    <button
                      key={product.id}

                      className="w-full h-full bg-green-200 rounded-md"
                      onClick={() => handleProductClick(product, "Drink Item")}
                    >
                      {product.Name} (£{product.Price})
                    </button>
                  ))}
                </div>
              </div>
            )}
            {showConfectionary && (
              <div className="mt-4 border-b-2 border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-4">Sweets & Cakes:</h3>
                <div className="grid grid-cols-4 gap-4">
                  {/* Loop through the hotDrinks object and generate buttons for each drink here */}
                  {confectionary.map(product => (
                    <button
                      key={product.id}

                      className="w-full h-full bg-green-200 rounded-md"
                      onClick={() => handleProductClick(product, "Drink Item")}
                    >
                      {product.Name} (£{product.Price})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          {ShowKidsMeal && (
            <div className="mt-4 border-b-2 border-gray-200 pb-4">
              <h3 className="font-bold text-lg mb-4">Kids Menu:</h3>
              <div className="grid grid-cols-4 gap-4">
                {/* Loop through the hotDrinks object and generate buttons for each drink here */}
                {kitchenMenu.map(product => (
                  <button
                  key={product.id}
                  className="w-full h-full bg-green-200 rounded-md"
                  onClick={() => {
                    handleProductClick(product);
                    setShowKidsMeal(false);
                    setShowExtras(true);
                  }}
                >
                  {product.Name} (£{product.Price})
                </button>
                ))}
              </div>
            </div>)}
            {ShowExtras && (
              <div className="mt-4 border-b-2 border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-4">Extras:</h3>
                <div className="grid grid-cols-4 gap-4">
                  {/* Loop through the hotDrinks object and generate buttons for each drink here */}
                  {extras.map(product => (
                    <button
                      key={product.id}

                      className="w-full h-full bg-green-200 rounded-md"
                      onClick={() => handleProductClick(product, "Hot Items" )}
                    >
                      {product.Name} (£{product.Price})
                    </button>
                  ))}
                </div>
              </div>)}




              
            
        </div>



        <div className="w-1/3 border-gray-400">
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
              <button
                className="bg-purple-500 text-white p-2 rounded mt-4"
                onClick={() => handleConfirm(order, total)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      );
}
