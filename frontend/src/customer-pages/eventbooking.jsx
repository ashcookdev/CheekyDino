import React, { useEffect, useState } from 'react';

import { DataStore } from 'aws-amplify';
import { Sessions, Events, CustomerEvent, CafeOrder, Admin } from '../models';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';



export default function SessionBook(events) {
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [childData, setChildData] = useState([{ age: '' }]);
  const [name, setName] = useState("");
  const [staff, setStaff] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [sessions, setSessions] = useState([]);
  const [freeTablesResult, setFreeTablesResult] = useState({ freeTables: 0, recommendedTables: [] });
  const [totalPrice, setTotalPrice] = useState(0);
  

 
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setNumber] = useState(''); 
  const [tableData, setTableData] = useState([]);

  const [event, setEvent] = useState([]);


  useEffect(() => {
    const fetchAdmin = async () => {
      const adminData = await DataStore.query(Admin);
      const tableLayout = adminData[0].TableData;
      setTableData(tableLayout);
    }
    fetchAdmin();
  }, []);




  const fetchEvents = async () => {
    // get the next event from the database
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // get yyyy-mm-dd format
    const fetchedEvents = (await DataStore.query(Events)).filter(event => event.Date >= todayStr);

    setEvent(fetchedEvents.sort((a, b) => new Date(a.Date) - new Date(b.Date))); // sort events by date

    }

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
      if (event.length > 0) {
        const totalPrice = calculatePrice(childData, adults, children, event);
        setTotalPrice(totalPrice);
      }
    }, [adults, children, childData, event]);
    


const navigate = useNavigate();

  

  console.log(children, adults, date)

  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setChildData(Array.from({ length: value }, () => ({ name: '', age: '' })));
  };

  // get email from auth

  useEffect(() => {
    Auth.currentUserInfo().then((user) => {
      setEmail(user.attributes.email);
    });
  }, []);

  



  const handleChildAgeChange = (index, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, childAge: value } : data))
    );
  };
  
  
  const calculatePrice = (childData, adults, children, event) => {
    let price = 0;
    console.log('childData:', childData);
    console.log('adults:', adults);
    console.log('children:', children);
    console.log('event:', event);

    // Assuming event is an array and each event has KidsPrice, Price1, and Price3 properties
    const kidsPrice = event && event[0] ? event[0].KidsPrice : 0; // for 2+
    const price1 = event && event[0] ? event[0].Price1 : 0; // for 1-2 years old
    const price3 = event && event[0] ? event[0].Price3 : 0; // for under 1 year
  
    childData.forEach((data) => {
      if (data.childAge === "Under 1 year") {
        price += price3;
      } else if (data.childAge === "1-2 years old") {
        price += price1;
      } else if (data.childAge === "2+") {
        price += kidsPrice;
      }
      // No price addition for "sibling" as it's assumed to be free
    });
  
    console.log(adults);
    const additionalAdults = adults - children;
  
    if (additionalAdults > 0) {
      // Add £2.00 for each additional adult beyond the number of children
      price += additionalAdults * 2.0;
    }
  
    return price;
  };
  

  const calculateAvailability = async () => {
    console.log('Fetching availability data for date:', date);
    const allBookings = await DataStore.query(CustomerEvent);
    const bookingsForDate = allBookings.filter(booking => booking.Date === date);
  
    console.log('Query result:', bookingsForDate);
    const totalGuests = Number(children) + Number(adults);
  
    const freeTables = tableData.filter(table => {
      if ([40, 41, 42].includes(table.table)) {
        return false;
      }
      const isTableBooked = bookingsForDate.some(booking => booking.Table === table.table);
      return !isTableBooked && table.capacity >= totalGuests;
    });
  
    let recommendedTables = [];
    let remainingGuests = totalGuests;
  
    for (let i = 0; i < freeTables.length && remainingGuests > 0; i++) {
      recommendedTables.push(freeTables[i].table);
      remainingGuests -= freeTables[i].capacity;
    }
  
    const result = {
      freeTables: freeTables.length,
      recommendedTables
    };
  
    setFreeTablesResult(result);
  
    console.log(`Free Tables: ${result.freeTables}, Recommended Tables: ${result.recommendedTables}`);
  };
  




    const handleSubmit = async () => {
      // Fetch availability data and calculate total price
      await calculateAvailability();
      const totalPrice = await calculatePrice(childData, parseInt(adults), parseInt(children));
    
      // Create a new customer event object
      const newCustomerEvent = new CustomerEvent({
        EventName: event[0].Name,
        EventDate: event[0].Date,
        EventTime: `${event[0].StartTime} - ${event[0].EndTime}`,
        CustomerName: name,
        Children: children.toString(),
        Adults: adults.toString(),
        Table: freeTablesResult.recommendedTables.join(', '),
        FoodOptions: { foodOption1: '...', foodOption2: '...' },
        Total: totalPrice,
        Email: email,
        Telephone: telephone,
        FoodOption: true,
        Date: event[0].Date,
      });
    
      // Convert FoodOptions object to an array
      const foodOptionsArray = Object.values(newCustomerEvent.FoodOptions);
    
      // Create a new session object
      const newSession = new Sessions({
        Name: name,
        Email: email,
        Date: event[0].Date,
        TimeslotFrom: event[0].StartTime,
        TimeslotTo: event[0].EndTime,
        Table: Number(freeTablesResult.recommendedTables.join(', ')),
        Telephone: telephone,
        Adults: Number(adults),
        Children: Number(children),
        Arrived: false,
        LeftCenter: false,
        Event: true,
        EventID: event[0].id,
        Total: totalPrice,
        EventName: event[0].Name,
      });
    
      try {
        // Save the new customer event to DataStore
        await DataStore.save(newCustomerEvent);
        console.log('Customer event saved successfully!');
    
        // Save the new session to DataStore
        const savedSession = await DataStore.save(newSession);
        console.log('Session saved successfully!');
    
        // Create a new CafeOrder object with the SessionID
        const newCafeOrder = new CafeOrder({
          CreatedDate: event[0].Date,
          Total: totalPrice,
        
          HotItems: foodOptionsArray,
          Table: Number(freeTablesResult.recommendedTables.join(', ')),
          Completed: false,
          Delieved: false,
          sessionsID: savedSession.id,
          Sessionid: savedSession.id,
          Kitchen:true,
          SessionEmail: email,
          EventID: event[0].id,
          Event: true
        });
    
        // Save the new CafeOrder to DataStore
        await DataStore.save(newCafeOrder);
        console.log('CafeOrder saved successfully!');
    
        // Set timer to 5 seconds and then redirect to the /bookedevents page
        setTimeout(() => {
          navigate('/bookedevents');
        }, 5000);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    
      // Set the submitted state to true
      setSubmitted(true);
    };
    

return (
    <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 border">
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        {event.map((event, index) => (
                            <div key={index} className="relative bg-white">
                                <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl component-title">
                                    {event.Name}
                                </h2>
                                
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 className="component-title text-orange-500 mt-5">{email}</h4>
                        <div>
                            <div className="mt-5">
                              
                                
                            </div>
                            <label htmlFor="children" className="block component-title mt-2 text-sm font-medium leading-6 text-gray-900">
                                Adult Name
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                type="text"
                                name="name"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={name}
                            ></input>
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm component-title mt-2 font-medium leading-6 text-gray-900"
                            >
                                Telephone
                            </label>
                            <input
                                onChange={(e) => setNumber(e.target.value)}
                                id="number"
                                type="text"
                                name="number"
                                value={telephone}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="adults" className="block text-sm component-title mt-2 font-medium leading-6 text-gray-900">
                                Number of Adults
                            </label>
                            <input
                                onChange={(e) => setAdults(e.target.value)}
                                id="adults"
                                type="number"
                                name="adults"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={adults}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="children" className="block text-sm component-title mt-2 font-medium leading-6 text-gray-900">
                                Number of Children
                            </label>
                            <input
                                onChange={handleChildrenChange}
                                id="children"
                                type="number"
                                name="children"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={children}
                            ></input>
                        </div>

                        <div>
                            {childData.map((data, index) => (
                                <div key={index}>
                                    <div>
                                        <label htmlFor={`child-age-${index}`} className="block component-title mt-2 text-sm font-medium leading-6 text-gray-900">
                                            Child's Age
                                        </label>
                                        <select
                                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                            id={`child-age-${index}`}
                                            name={`child-age-${index}`}
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="6 months and under">6 months and under</option>
                                            <option value="Under 1 year">under 1 year</option>
                                            <option value="1-2 years old">1-2 years old</option>
                                            {childData.length > 1 && <option value="sibling">sibling</option>}
                                            <option value="2+">2+</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                       


                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border component-title mt-2 border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-orange-500 md:py-4 md:text-lg md:px-10"
                        >
                            £{totalPrice.toFixed(2)? totalPrice.toFixed(2): 0.00} - Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {event.map((event, index) => (
        <div key={index} className="md:w-1/2 border">
            <img src= {event.Image}  alt="event" className="w-full h-full object-cover" />

        </div>
        ))}
    </div>
);
}
