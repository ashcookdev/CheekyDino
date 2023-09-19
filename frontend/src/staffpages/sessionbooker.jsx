import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SessionCalenderTill from './sessioncalendertill';
import StaffTill from './StaffTill';



export default function SessionBook() {
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [childData, setChildData] = useState([{ age: '' }]);
  const [name, setName] = useState('');
  const [staff, setStaff] = useState('');

 
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setNumber] = useState('');  

  console.log(children, adults, date)

  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setChildData(Array.from({ length: value }, () => ({ name: '', age: '' })));
  };

  



  const handleChildAgeChange = (index, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, childAge: value } : data))
    );
  };
  
  const handleExactAgeChange = (index, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, exactAge: value } : data))
    );
  };
  
  const calculatePrice = (childData, adults, children) => {

    let price = 0;
    childData.forEach((data) => {
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
    console.log(adults)
    const additionalAdults = adults - children;

if (additionalAdults > 0) {
  // Add £2.00 for each additional adult beyond the number of children
  price += additionalAdults * 2.0;
}

return price;
  };
  


  const handleSubmit = () => {
    const totalPrice = calculatePrice(childData, adults, children);
    setChildData((prev) => prev.map((data) => ({ ...data, TotalSpent: totalPrice })));
    setSubmitted(true);
  };

  const handleSelectedChange = (e) => {
    const value = e.target.value;
    setStaff(value);
  };

  

  if (submitted) {
    return <SessionCalenderTill children={children} staff={staff} adults={adults} date= {date} childData = {childData} email={email} telephone= {telephone} name={name} />;
  }

  return (
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

          <label htmlFor="children" className="block text-sm font-medium leading-6 text-gray-900">
Adult Name            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              name="name"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="enter customer name"
            ></input>
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
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"

              >

              </input>
            </div>




          <div>
            <label htmlFor="children" className="block text-sm font-medium leading-6 text-gray-900">
              Number of Adults
            </label>
            <input
              onChange={(e) => setAdults(e.target.value)}
              id="children"
              type="number"
              name="children"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="1"
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
              type="number"
              name="children"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="1"
            ></input>
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

    {data.childAge === "2+" && (
      <div>
        <label htmlFor={`exact-age-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
          Exact Age
        </label>
        <input
          onChange={(e) => handleExactAgeChange(index, e.target.value)}
          id={`exact-age-${index}`}
          type="number"
          name={`exact-age-${index}`}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        ></input>
      </div>
    )}
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
          <div
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
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
  );
}
