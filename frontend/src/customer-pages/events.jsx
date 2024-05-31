import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { Events } from "../models";
import { format } from 'date-fns';
import './customerfont.css';
import { useNavigate } from 'react-router-dom'


export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [book , setBook] = useState(false);

    const Navigate = useNavigate();

    if(book){
        Navigate('/eventregister',{state: events});
    }


    const fetchEvents = async () => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // get yyyy-mm-dd format
        const fetchedEvents = (await DataStore.query(Events)).filter(event => event.Date >= todayStr);
        setEvents(fetchedEvents.sort((a, b) => new Date(a.Date) - new Date(b.Date))); // sort events by date
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return format(date, 'EEEE, MMMM do, yyyy');
    }

    const handleBookNow = (event) => {
        // Set the 'book' state to true and navigate to '/eventregister' with the 'events' state
        setBook(true);
        Navigate('/eventregister', { state: { events: event } });
      };



    return (
        <div className="mt-5">
            
            {events.map((event, index) => (
      <div key={index} className="relative bg-black">
        <div className="relative h-80 overflow-hidden bg-black md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            className="h-full w-full object-contain"
            src={event.Image}
            alt=""
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#776FFF" />
                <stop offset={1} stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl component-title">{event.Name}</h1>
            <h3 className="mt-2 font-bold  text-white component-title">£{event.KidsPrice}.00 Per Child</h3>
            <p className="mt-2 font-bold  text-white component-title">{formatDate(event.Date)}</p>
            <p className="mt-2 font-bold text-white component-title">{event.StartTime}- {event.EndTime}</p>


            <p className="mt-6 text-base leading-7 text-gray-300">
             {event.Description}
            </p>
            <div className="mt-8">
            <button
              onClick={() => handleBookNow(event)}
              className="inline-flex rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-orange-500 shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book Now
            </button>
            </div>
          </div>
        </div>
      </div>
    ))}
        </div>
    )
  }
  