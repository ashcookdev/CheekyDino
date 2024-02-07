import { CurrencyPoundIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { DataStore } from 'aws-amplify'
import {Events} from '../models'
import { UserIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react'


export default function EventAnalytics() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            const events = await DataStore.query(Events);
            setEvents(events);
        }
        fetchEvents();
    }, []);





  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-purple-100 shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{event.Name}</h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {event.StartTime} - {event.EndTime}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">{event.Date}</p>
            </div>
            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={event.Image} alt="" />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                
                  <CurrencyPoundIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  {event.Total}
              </div>
              <div className="-ml-px flex w-0 flex-1">
               
                
                  <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  {event.TickesSold}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
