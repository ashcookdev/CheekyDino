import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { CafeOrder } from "./models";
import { format, parse } from "date-fns";
import { PartyBooking } from './models';
import { PartyGuests } from './models';
import { Messages } from './models';
import BarCodeScanner from "./barcodescanner";
import TillBooking from "./tillbooking";
import { Sessions } from "./models";
import Tables from "./tables";
import { Analytics } from 'aws-amplify';



export default function Till() {
  const [showSoftDrinks, setShowSoftDrinks] = useState(false);
  const [showHotFood, setShowHotFood] = useState(false);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [table, setTable] = useState(1);
  const [party, setPartyBookings] = useState([]);
  const [partyGuests, setPartyGuests] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy");
  const formattedTime = format(currentTime, "h:mm:ss a");
  const [showGuestList, setShowGuestList] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const [clientArrived, setClientArrived] = useState(false);
  const [partyFinished, setPartyFinished] = useState(false);
  const [scanner, setScanner] = useState(false);
  const [arrival, setArrival] = useState(false);
  const [tablee, setTablee] = useState(false);


  


  console.log(party)
  console.log(partyGuests)
  // Replace this with your actual data store
  const Products = {
    Hotdog: {
      price: 5.50
    },
    Cheeseburger: {
      price: 6.50
    }
  };

  //get all party bookings for today

  
      


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const handleProductClick = async (product) => {
    // Add the product item to the order
    setOrder(order => [...order, { name: product, price: Products[product].price }]);
    setTotal(total => total + Products[product].price);

    Analytics.record({
      name: 'Product Added',
      attributes: { product: product },
      productPrice: Products[product].price
    });

  };

  const handleConfirmClick = async () => {
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const awstime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();
    const formattedTime = awstime.substring(0, 5);
    // Save all the items in the order to the data store
    await DataStore.save(
      new CafeOrder({
        HotItems: order.map(item => item.name),
        CreatedTime: formattedTime,
        CreatedDate: new Date().toISOString().split('T')[0],
        Total: total,
        Table: table,
        Completed: false
      })
    );
    console.log("Order confirmed");

    // Reset the order and total price
    setOrder([]);
    setTotal(0);
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



  async function fetchPartyGuests(partybookingID) {
    const allPartyGuests = await DataStore.query(PartyGuests);
    const partyGuests = allPartyGuests.filter(
      (guest) => guest.partybookingID === partybookingID
    );
    setPartyGuests(partyGuests);
  }

  // ...

  useEffect(() => {
    if (party.length > 0) {
      fetchPartyGuests(party[0].id);
    }
  }, [party]);


  console.log("Selected party:", selectedParty);





  const handleGuestArrival = async (guest) => {
    // Format the current time according to the Europe/London time zone
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const arrivalTime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();
  
    // Update the guest's arrival status
    await DataStore.save(
      PartyGuests.copyOf(guest, (updated) => {
        updated.Arrived = true;
        updated.ArrivalTime = arrivalTime;
      })
    );
  
    // Retrieve the PartyBooking object that corresponds to the selected party
    const partyBook = await DataStore.query(PartyBooking, selectedParty);
  
    // Update Current Guests in PartyBooking record
    await DataStore.save(
      PartyBooking.copyOf(partyBook, (updated) => {
        updated.CurrentGuests = partyBook.CurrentGuests + 1;
      })
    );
  
    // Record the event with Amplify Analytics
    Analytics.record({
      name: 'guestsInBuilding',
      attributes: {
        guestName: guest.ChildName,
        branchId: 'Cheeky Dino Maidstone',
        numberofGuests: 1,
        time: arrivalTime,
        date: currentTime// replace with your branch ID
        // additional attributes here
      }
    });
  };
  


  const HandleLeft = async function HandleLeft(selectedParty) {
    // Query the PartyBooking object with the specified ID
    const partyBooking = await DataStore.query(PartyBooking, selectedParty);
  
    // Format the current time according to the Europe/London time zone
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const departureTime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();
  
    // Update the PartyChildLeft property of the PartyBooking object
    await DataStore.save(
      PartyBooking.copyOf(partyBooking, (updated) => {
        updated.PartyChildLeft = departureTime;
      })
    );
  
    // Send a message to the ChatDashboard component
    await DataStore.save(
      new Messages({
        content: `Party ${partyBooking.ChildName} has left make sure to check them out and clean the party room`,
        email: 'Front Desk',
        group: ['Party Host', 'Staff', 'Admin', 'Developer', 'TeamLeader'],
        createdAt: departureTime
      })
    );
    console.log(`Party ${partyBooking.ChildName} has left`);
  }



  async function HandleClient(selectedParty) {
    // Query the PartyBooking object with the specified ID
    const partyBooking = await DataStore.query(PartyBooking, selectedParty);
  
    // Format the current time according to the Europe/London time zone
    const currentTime = new Date();
    const options = { timeZone: 'Europe/London', hour12: false };
    const arrivalTime = currentTime.toLocaleString('en-GB', options).split(',')[1].trim();
  
    // Update the PartyChildMumArrived property of the PartyBooking object
    await DataStore.save(
      PartyBooking.copyOf(partyBooking, (updated) => {
        updated.PartyChildMumArrived = arrivalTime;
      })
    );
  
    // Send a message to the ChatDashboard component
    await DataStore.save(
      new Messages({
        content: `Party ${partyBooking.ChildName} has arrived make sure to check them in and prepare the party room`,
        email: 'Front Desk',
        group: ['Party Host', 'Staff', 'Admin', 'Developer', 'TeamLeader'],
        createdAt: arrivalTime
      })
    );
  
    console.log(`Party ${partyBooking.ChildName} has arrived`);
  }
  

  if (scanner === true) {
    return (<BarCodeScanner />);
    
  }

  if (arrival === true) {
return <TillBooking/>  }

if (tablee === true) {
  return <Tables/>  }






  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mt-4 border-b-2 border-gray-200 pb-4 flex items-center">
        <label htmlFor="table" className="block font-bold text-lg mr-4">Table:</label>
        <input
          id="table"
          type="number"
          value={table}
          onChange={e => setTable(parseInt(e.target.value))}
          className="border rounded-md p-2 mr-4"
        />
        <div className="flex-grow">
          {party.map(partyBooking => (
            <button className="w-20 h-20 bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2 mb-2 flex items-center justify-center animate-pulse"
              key={partyBooking.id} onClick={() => setSelectedParty(partyBooking.id)}>
              {partyBooking.ChildName} {partyBooking.PartyTime} Party
            </button>
          ))}
        </div>
      </div>
      <div className="flex">
      <button className="w-20 h-20 bg-green-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2 mb-2 flex items-center justify-center "
onClick={() => setScanner(true)} >
Scan QR Code
        </button>
        <button className="w-20 h-20 bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2 mb-2 flex items-center justify-center "
onClick={() => setArrival(true)} >
New Arrival
        </button>
        <button className="w-20 h-20 bg-red-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2 mb-2 flex items-center justify-center "
onClick={() => setTablee(true)} >
Tables
        </button>



      </div>
  
      {selectedParty && (
  <div className="mt-4 border-b-2 border-gray-200 pb-4">
    <ul className="flex">
      {!clientArrived && (
        <li className="mb-2 mr-2">
          <button className="rounded-full bg-green-600 px-2.5 py-1 text-sm font-semibold text-white shadow-md hover:bg-green-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-green-600 border border-green-800"
            onClick={() => {
              HandleClient(selectedParty);
              setClientArrived(true);
            }}>
            Client Arrived </button>
        </li>
      )}
      <li className="mb-2">
        <button className="rounded-full bg-red-600 px-2.5 py-1 text-sm font-semibold text-white shadow-md hover:bg-red-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-red-600 border border-red-800"
          onClick={() => {
            HandleLeft(selectedParty);
            setPartyFinished(true);
          }}>
          Party Finished </button>
      </li>
    </ul>
    {partyGuests
      .filter(guest => guest.partybookingID === selectedParty && guest.Arrived === false)
      .map(guest => (
        <li key={guest.id} className="mb-2">
          <label>
            <input type="checkbox" onChange={() => handleGuestArrival(guest)} />
            {guest.ChildName}
          </label>
        </li>
      ))}
    {!partyFinished && (
      <button
        className="rounded-full bg-blue-600 px-2.5 py-1 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:ring-blue-600 mt-4 border border-blue-800"
        onClick={() => setSelectedParty(true)}
      >
        Confirm
      </button>
    )}
  </div>
)}





      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mt-4 border-b-2 border-gray-200 pb-4">
          <h2 className="font-bold text-lg mb-4">Menu:</h2>
          <div className="grid grid-cols-4 gap-4">
            <button
              className="w-full h-full bg-gray-200 rounded-md p-2"
              onClick={() => setShowSoftDrinks(true)}
            >
              <img
                className="w-full h-full object-cover rounded-md"
                src="<URL of Soft Drinks image>"
                alt="Soft Drinks"
              />
            </button>
            <button className="w-full h-full bg-gray-200 rounded-md p-2">
              <img
                className="w-full h-full object-cover rounded-md"
                src="<URL of Hot Drinks image>"
                alt="Hot Drinks"
              />
            </button>
            <button className="w-full h-full bg-gray-200 rounded-md p-2">
              <img
                className="w-full h-full object-cover rounded-md"
                src="<URL of Sweets/Cakes image>"
                alt="Sweets/Cakes"
              />
            </button>
            <button
              className="w-full h-full bg-gray-200 rounded-md p-2"
              onClick={() => setShowHotFood(true)}
            >
              <img
                className="w-full h-full object-cover rounded-md"
                src="<URL of Hot Food image>"
                alt="Hot Food"
              />
            </button>
          </div>
        </div>
        {showSoftDrinks && (
          <div className="mt-4 border-b-2 border-gray-200 pb-4">
            <h3 className="font-bold text-lg mb-4">Soft Drinks:</h3>
            <div className="grid grid-cols-4 gap-4">
              <button className="w-full h-full bg-gray-200 rounded-md">Coke</button>
              <button className="w-full h-full bg-gray-200 rounded-md">Pepsi</button>
              <button className="w-full h-full bg-gray-200 rounded-md">Sprite</button>
              <button className="w-full h-full bg-gray-200 rounded-md">Fanta</button>
            </div>
          </div>
        )}
        {showHotFood && (
          <div className="mt-4 border-b-2 border-gray-200 pb-4">
            <h3 className="font-bold text-lg mb-4">Hot Food:</h3>
            <div className="grid grid-cols-4 gap-4">
              {/* Loop through the Products object and generate buttons for each product here */}
              {Object.keys(Products).map(product => (
                <button
                  key={product}
                  className="w-full h-full bg-gray-200 rounded-md"
                  onClick={() => handleProductClick(product)}
                >
                  {product} (£{Products[product].price})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Display the ordered items and total price here */}
        <div className="mt-4 border-b-2 border-gray-200 pb-4">
          <h2 className="font-bold text-lg mb-4">Order:</h2>
          <ul>
            {order.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name} (£{item.price})
              </li>
            ))}
          </ul>
          <p>Total: £{total}</p>
        </div>

        {/* Add a confirm button here */}
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
