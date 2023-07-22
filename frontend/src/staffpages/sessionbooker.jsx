import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import SessionCalender from './sessionCalender';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'



export default function SessionBook() {
  const [children, setChildren] = useState(1);
  const [adults, setAdults] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  

  console.log(children, adults, date)

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return <SessionCalender children={children} adults={adults} date= {date} name= {name} age= {age} />;
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
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Childs Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              
            >
             
            </input>
          </div>
          <div>
            
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Childs Age
            </label>
            <input
              onChange={(e) => setAge(e.target.value)}
              id="name"
              type='number'
              name="name"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              
            >
             
            </input>
          </div>
            
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of Children
            </label>
            <select
              onChange={(e) => setChildren(e.target.value)}
              id="children"
              name="children"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="1"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of Adults
            </label>
            <select
              onChange={(e) => setAdults(e.target.value)}
              id="adults"
              name="adults"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="1"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <DatePicker
              id="date"
              selected={date}
              onChange={(date) => setDate(date)}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
