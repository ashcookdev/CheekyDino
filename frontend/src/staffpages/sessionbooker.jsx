import React, { useEffect, useState } from 'react';
import SessionCalenderTill from './sessioncalendertill';
import StaffTill from './StaffTill';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';

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

  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setChildData(Array.from({ length: value }, () => ({ age: '' })));
  };

  const handleChildAgeChange = (index, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, age: value } : data))
    );
  };

  const handleSubmit = () => {
    const totalPrice = calculatePrice(childData, parseInt(adults), parseInt(children));
    setChildData((prev) => prev.map((data) => ({ ...data, TotalSpent: totalPrice })));
    setSubmitted(true);
  };

  const calculatePrice = (childData, adults, children) => {
    let price = 0;
    childData.forEach((data) => {
      if (data.age === 'under 1 year') {
        price += 3.0;
      } else if (data.age === '1-2 years old') {
        price += 8.0;
      } else if (data.age === '2+') {
        price += 9.0;
      } else if (data.age === 'sibling') {
        price += 0;
      }
    });
    const additionalAdults = adults - children;
    if (additionalAdults > 0) {
      price += additionalAdults * 2.0;
    }
    return price;
    setPrice(price);
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
        <div className="flex">
    <div className="w-1/2 border">
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Book Your Session
          </h2>
          <div>
          <div>
            <div>
            <StaffTill onSelectChange={handleSelectedChange}/>  
            </div>
            <label
                htmlFor="Email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type='text'
                name="email"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"

              >

              </input>
              <div className='mt-3'>
            {sessions.length > 0 && (
  <select value={selectedSession} onChange={(e) => setSelectedSession(e.target.value)}>
  <option disabled value="">Select a session</option>
  {sessions.map((session, index) => (
    <option key={index} value={session.id}>
      {session.Name} - {session.Adults} Adults, {session.Children} Children - {session.Date}
    </option>
  ))}
</select>


)}
  <p>Selected session: {selectedSession}</p>


  <button
    onClick={AutoFill}
    className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  >
    AutoFill
  </button>
</div>
          <label htmlFor="children" className="block text-sm font-medium leading-6 text-gray-900">
Adult Name            </label>
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
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telephone
              </label>
              <input
                onChange={(e) => setNumber(e.target.value)}
                id="number"
                type='text'
                name="number"
                value={telephone}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"

              >

              </input>
            </div>




          <div>
            <label htmlFor="adults" className="block text-sm font-medium leading-6 text-gray-900">
              Number of Adults
            </label>
            <input
              onChange={(e) => setAdults(e.target.value)}
              id="adults"
              name="adults"
              type="number"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={adults}

            >
            </input>
          </div>

          <div>
            <label htmlFor="children" className="block text-sm font-medium leading-6 text-gray-900">
              Number of Children
            </label>
            <input
              onChange={handleChildrenChange}
              id="children"
              name="children"
              type="number"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
value={children}            ></input>
          </div>
          <div>
           
          <div>



{childData.map((data, index) => (
  <div key={index}>
    <div>
      <label htmlFor={`child-age-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
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
        <option value="sibling">sibling</option>
        <option value="2+">2+</option>
      </select>
    </div>

   
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
</div>
</div>






      </div>
    </div>
   

    </div>
    <div className="w-1/2 border">
  {submitted && (
    <SessionCalenderTill children={children} staff={staff} adults={adults} date={date} childData={childData} email={email} telephone={telephone} name={name} price={price} />
  )}
</div>
    </div>
    
  );
}
