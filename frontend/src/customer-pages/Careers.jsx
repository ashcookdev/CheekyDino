import React from 'react'
import './customerfont.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'


import { LifebuoyIcon, NewspaperIcon, PhoneIcon, UserIcon } from '@heroicons/react/20/solid'

 
  
  export default function Careers() {


    const [apply, setApply] = useState(false)

    const navigate = useNavigate()



    if (apply === true) {
      navigate('/jobs/apply')
    }





    


    return (
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl flex items-center">Join Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
            Are you looking for a fun and rewarding career? Do you love working with kids and making them smile? If yes, then you might be the perfect fit for Cheeky Dino Play Centre! We are always looking for enthusiastic, hard-working, and dedicated individuals to join our team. If you are interested in applying for a position at Cheeky Dino Play Centre, below are our current openings, we look forward to hearing from you.
            </p>

              
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-1 lg:gap-8">
  <div className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
    <div className="text-base leading-7">
      <h3 className="font-semibold text-white">Cafe and Party Hosts</h3>
      <p className="mt-2 text-gray-300">
        {/* Party Host Section */}
        <strong>Party Host:</strong> As a party host, you will be responsible for creating a fun and memorable experience for children and their guests at our playcenter. You will greet the party guests, lead them to their designated area, and assist them with any needs or requests. You will also set up and decorate the party area, serve food and drinks, and facilitate games and activities.
        <br /><br />
        <strong>Qualifications and Skills:</strong>
        <ul className="list-disc ml-6">
          <li>A high school diploma or equivalent</li>
          <li>Previous experience in working with children or hosting events</li>
          <li>A friendly, energetic, and outgoing personality</li>
          <li>Ability to handle multiple tasks and work under pressure</li>
          <li>Creativity and problem-solving skills</li>
          <li>A passion for making children happy and entertained</li>
          <li>A valid DBS check</li>
        </ul>

        {/* Cafe Worker Section */}
        <br /><br />
        <strong>Cafe Worker:</strong> As a cafe worker, you will be responsible for providing customers with an enjoyable dining experience. You will take orders, prepare food and drinks, and serve these items to patrons at their tables. You will also maintain a clean and hygienic environment by washing dishes, clearing tables, and sanitizing surfaces.
        <br /><br />
        <strong>Qualifications and Skills:</strong>
        <ul className="list-disc ml-6">
          <li>Previous experience in a cafe or similar establishment</li>
          <li>Basic knowledge of food safety and hygiene standards</li>
          <li>Ability to operate a cash register and handle cash or card transactions</li>
          <li>Excellent customer service and communication skills</li>
          <li>Ability to work well in a fast-paced and team-oriented environment</li>
          <li>Flexibility to work various shifts, including weekends and holidays</li>
        </ul>
      </p>
      {/* Button at the bottom */}
      <button onClick={()=> setApply(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Apply Now
      </button>
    </div>
  </div>
</div>
<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-1 lg:gap-8">
  <div className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
    <div className="text-base leading-7">
      <h3 className="font-semibold text-white">Cook Wanted</h3>
      <p className="mt-2 text-gray-300">
        We are looking for a cook who can join our team and prepare delicious meals for our customers.
      </p>

      <h4 className="font-semibold text-white mt-4">Responsibilities:</h4>
      <ul className="list-disc ml-6 text-gray-300">
        <li>Cook pizzas, burgers, and other dishes according to recipes and customer orders</li>
        <li>Ensure food quality and safety standards are met</li>
        <li>Maintain a clean and tidy kitchen area and equipment</li>
        <li>Work efficiently and effectively in a high-pressure environment</li>
        <li>Collaborate with other staff members and managers</li>
      </ul>

      <h4 className="font-semibold text-white mt-4">Requirements:</h4>
      <ul className="list-disc ml-6 text-gray-300">
        <li>Experience as a cook or similar role in a restaurant or catering service</li>
        <li>Level 2 hygiene qualification or equivalent (preferred)</li>
        <li>Ability to work early mornings, late nights, and weekends</li>
        <li>Flexibility and adaptability to changing needs and demands</li>
        <li>Passion for food and customer satisfaction</li>
      </ul>
      <button onClick={()=> setApply(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Apply Now</button>

    </div>
  </div>
</div>

        </div>
      </div>
    )
  }
  
  