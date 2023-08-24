import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SessionCalenderTill from './sessioncalendertill';



export default function SessionBook() {
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [childData, setChildData] = useState([{ name: '', age: '' }]);
 
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setNumber] = useState('');  

  console.log(children, adults, date)

  const handleChildrenChange = (e) => {
    const value = e.target.value;
    setChildren(value);
    setChildData(Array.from({ length: value }, () => ({ name: '', age: '' })));
  };

  const handleChildDataChange = (index, key, value) => {
    setChildData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, [key]: value } : data))
    );
  };


  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return <SessionCalenderTill children={children} adults={adults} date= {date} childData = {childData} email={email} telephone= {telephone} />;
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

{childData.map((data, index) => (
<div key={index}>
  <label htmlFor={`name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
    Adult's Name
  </label>
  <input
    onChange={(e) => handleChildDataChange(index, 'name', e.target.value)}
    id={`name-${index}`}
    name={`name-${index}`}
    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
  ></input>

  <label htmlFor={`age-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
    Child's Age
  </label>
  <input
    onChange={(e) => handleChildDataChange(index, 'age', e.target.value)}
    id={`age-${index}`}
    type="number"
    name={`age-${index}`}
    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
  ></input>
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
>

</input>
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
