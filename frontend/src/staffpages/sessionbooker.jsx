import React, { useEffect, useState } from 'react';
import SessionCalenderTill from './sessioncalendertill';
import StaffTill from './StaffTill';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../models';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SessionBook() {
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [childData, setChildData] = useState([{ age: '' }]);
  const [name, setName] = useState('');
  const [staff, setStaff] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [sessions, setSessions] = useState([]);
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setNumber] = useState('');
  const [price, setPrice] = useState(0);
  const [menu, setMenu] = useState(false);
  const [previousChildren, setPreviousChildren] = useState(1);


  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu(true);
  };

  if (menu === true) {
    navigate('/dashboard');
    
  }



  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setPreviousChildren(value);
  
    // Reset childData with default values based on the new number of children
    setChildData(Array.from({ length: value }, () => ({ age: '' })));
  };
  
  
  

   
  const handleChildAgeChange = (index, value) => {
    console.log(`Child ${index} age changed to ${value}`);
  
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, childAge: value } : data))
    );
  
    // Log the updated childData state
    console.log(childData);
  };

  const handleSubmit = () => {
    const calculatePrice = (childData, adults, children) => {
      let price = 0;
      childData.forEach((data) => {
        console.log(`Calculating price for child with age ${data.childAge}`); // Add this line
  
        if (data.childAge === "Under 1 year") {
          price += 3.0;
        } else if (data.childAge === "1-2 years old") {
          price += 8.0;
        } else if (data.childAge === "2+") {
          price += 9.0;
        } else if (data.childAge === "sibling") {
          price += 0;
        }
      });
  
      // Add an extra £2.00 for every adult if there are more adults than children
      const additionalAdults = adults - children;
  
      if (additionalAdults > 0) {
        // Add £2.00 for each additional adult beyond the number of children
        price += additionalAdults * 2.0;
      }
  
      return price;
    };
  
    const totalPrice = calculatePrice(childData, parseInt(adults), parseInt(children));
    setPrice(totalPrice); // Set the total price state
    setChildData((prev) => prev.map((data) => ({ ...data, TotalSpent: totalPrice })));
    setSubmitted(true);
  };
  





  const handleSelectedChange = (value) => {
    setStaff(value.StaffId);
  };

  useEffect(() => {
    const getSession = async () => {
      const models = await DataStore.query(Sessions);
      const filteredSessions = models.filter((session) => session.Email === email);
      setSessions(filteredSessions);
    };
    getSession();
  }, [email]);

  const AutoFill = () => {
    const session = sessions.find((session) => session.id === selectedSession);
    if (session) {
      setName(session.Name);
      setNumber(session.Number);
      setChildren(session.Children);
      setChildData(Array.from({ length: session.Children }, () => ({ age: '' })));
      setAdults(session.Adults);
    }
  };
    

  



  

  return (
    <div className="flex bg-white">
     

    <div className="w-1/2 p-6 border">
    <motion.button
      onClick={handleMenu}
      className=" top-4 left-4 p-2 border rounded-md bg-red-500 text-white hover:bg-red-900"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Back
    </motion.button>
      <div className="mb-2">
        <StaffTill onSelectChange={handleSelectedChange} />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          name="email"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></input>
      </div>

      <div className="mt-1">
        {sessions.length > 0 && (
          <select
            onChange={(e) => setSelectedSession(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option disabled defaultValue="">
              Select a session
            </option>
            {sessions.map((session, index) => (
              <option key={index} value={session.id}>
                {session.Name} - {session.Adults} Adults, {session.Children} Children - {session.Date}
              </option>
            ))}
          </select>
        )}
        <p className="mt-1 text-sm text-gray-900 font-medium">Selected session: {selectedSession}</p>

        <motion.button
onClick={AutoFill}
className="mt-1 w-full inline-flex items-center justify-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-2 md:text-base md:px-4 shadow-md"
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
>
AutoFill
</motion.button>

      </div>

    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-900">
        Adult Name
      </label>
      <input
        onChange={(e) => setName(e.target.value)}
        id="name"
        type="text"
        name="name"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        defaultValue={name}
      ></input>
    </div>

    <div>
      <label htmlFor="number" className="block text-sm font-medium text-gray-900">
        Telephone
      </label>
      <input
        onChange={(e) => setNumber(e.target.value)}
        id="number"
        type="text"
        name="number"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={telephone}
      ></input>
    </div>

    <div>
      <label htmlFor="adults" className="block text-sm font-medium text-gray-900">
        Number of Adults
      </label>
      <input
        onChange={(e) => setAdults(e.target.value)}
        id="adults"
        type="number"
        name="adults"
        min={0}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={adults}
      ></input>
    </div>

    <div>
      <label htmlFor="children" className="block text-sm font-medium text-gray-900">
        Number of Children
      </label>
      <input
        onChange={handleChildrenChange}
        id="children"
        type="number"
        name="children"
        min={0}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={children}
      ></input>
    </div>

    <div>
    {childData.map((data, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`child-age-${index}`} className="block text-sm font-medium text-gray-900">
              Child's Age- Do Not Select Sibling First
            </label>
            <select
              onChange={(e) => handleChildAgeChange(index, e.target.value)}
              id={`child-age-${index}`}
              name={`child-age-${index}`}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                      <option value="">Select an age</option>

              <option value="Under 1 year">Under 1 year</option>
              <option value="1-2 years old">1-2 years old</option>
              {childData.length > 1 && <option value="sibling">sibling</option>}
              <option value="2+">2+</option>
            </select>
          </div>
        ))}
    </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
              Date
            </label>
            <input
              onChange={(e) => setDate(e.target.value)}
              id="date"
              type="date"
              name="date"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></input>
          </div>
         
<button
type="submit"
onClick={handleSubmit}
className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
>
Book
</button>
</div>





    <div className="w-1/2 border">
  {submitted && (
    <SessionCalenderTill children={children} staff={staff} adults={adults} date={date} childData={childData} email={email} telephone={telephone} name={name} price={price} />
  )}
</div>
    </div>
    
  );
}
