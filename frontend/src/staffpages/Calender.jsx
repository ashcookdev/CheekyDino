import { Fragment, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { addMonths, subMonths } from 'date-fns'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, startOfWeek, endOfWeek } from 'date-fns'
import { useState } from 'react'
import { DataStore, Predicates } from 'aws-amplify'
import { PartyBooking } from '../models'
// ...

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StaffCalender() {


  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const [currentDate, setCurrentDate] = useState(new Date())
  console.log(currentDate);

  const [selectedPartyDetails, setSelectedPartyDetails] = useState(null);
    const [details, setDetails] = useState("");
    const [click, setClick] = useState("");

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  

  //
  const handleDayClick = async date => {
    // Retrieve the party details for the selected date from your DataStore
    const partyDetails = await getPartyDetailsForDate(date);

    // Update the state with the retrieved party details
    setSelectedPartyDetails(partyDetails);
  };

  // Function to retrieve party details for a given date from your DataStore
  const getPartyDetailsForDate = async date => {
    // Query the DataStore for all records
    const bookings = await DataStore.query(PartyBooking);

    // Filter bookings by PartyDate
    const filteredBookings = bookings.filter(booking => booking.PartyDate === date);

    // Sort filtered bookings by PartyTime in ascending order
    const sortedBookings = filteredBookings.sort((a, b) => a.PartyTime.localeCompare(b.PartyTime));

    // Return sorted bookings
    return sortedBookings;
  };

  const days = eachDayOfInterval({ start: startDate, end: endDate }).map(date => ({
    date: date.toISOString().slice(0, 10),
    isCurrentMonth: true,
    isToday: date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10),
  }))

  console.log(days);
  console.log(endDate);


  // Function to handle previous month click
  const handlePrevMonthClick = () => {
    setCurrentDate(current => subMonths(current, 1));
  };

  // Function to handle next month click
  const handleNextMonthClick = () => {
    setCurrentDate(current => addMonths(current, 1));
  };

  // Function to handle today click
  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate }).map(date => ({
    date: date.toISOString().slice(0, 10),
    dayOfWeek: format(date, 'E'),
  }))
  


  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
        <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime={format(currentDate, 'yyyy-MM-dd')} className="sm:hidden">
              {format(currentDate, 'MMM d, yyyy')}
            </time>
            <time dateTime={format(currentDate, 'yyyy-MM-dd')} className="hidden sm:inline">
              {format(currentDate, 'MMMM d, yyyy')}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">{format(currentDate, 'EEEE')}</p>        </div>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <div
              className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-gray-300"
              aria-hidden="true"
            />
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous day</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next day</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Day view
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Go to today
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Day view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Week view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Month view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Year view
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div>
      {selectedPartyDetails && selectedPartyDetails.map(party => (
          <div key={party.id} className="p-4 border rounded-lg mb-4">
            <h2 className="text-lg font-bold">{party.ChildName}</h2>
            <p className='font-semibold'>{party.PartyType} Party</p>
            <p className='font-semibold'>Guests: {party.NoOfChildren}</p>
            <p>Date: {party.PartyDate}</p>
            <p>Time: {party.PartyTime} - {party.PartyFinish}</p>
            <p>Cost: £{party.Total}</p>
            <button
        type="button" onClick={function partyInfo(event) {
            event.preventDefault();
            event.stopPropagation();
            setDetails(party)
            setClick("click")
            console.log(party)    

        }}
        className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
More Information      </button>
          </div>
        ))}
      </div>


      



            <div ref={containerOffset} className="flex flex-auto flex-col min-h-0">
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
          <div className="flex items-center text-center text-gray-900">
            <button onClick={handlePrevMonthClick}
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">{format(currentDate, 'MMMM yyyy')}</div>            
            <button onClick={handleNextMonthClick}
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
              key={day.date}
              onClick={() => handleDayClick(day.date)}

              type="button"
              className={classNames(
                'py-1.5 hover:bg-gray-100 focus:z-10',
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                (day.isSelected || day.isToday) && 'font-semibold',
                day.isSelected && 'text-white',
                !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                day.isToday && !day.isSelected && 'text-indigo-600',
                dayIdx === 0 && 'rounded-tl-lg',
                dayIdx === 6 && 'rounded-tr-lg',
                dayIdx === days.length - 7 && 'rounded-bl-lg',
                dayIdx === days.length - 1 && 'rounded-br-lg'
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                  day.isSelected && day.isToday && 'bg-indigo-600',
                  day.isSelected && !day.isToday && 'bg-gray-900'
                )}
              >
                {day.date.split('-').pop().replace(/^0/, '')}
              </time>
            </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    )
    }
