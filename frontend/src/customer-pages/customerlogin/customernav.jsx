import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from '../../models';
import '../customerfont.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CustomerNav() {


  const navigate = useNavigate();
  
  const [Arrived, setArrived] = useState(false);
  const [LeftCenter, setLeftCenter] = useState(false);


  useEffect(() => {
    async function getArrived() {
      // Get the current authenticated user's information
      const user = await Auth.currentAuthenticatedUser();
      // Get the user's email from their Cognito details
      const email = user.attributes.email;
      // Get today's date in the format expected by the AWSDate scalar type (YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0];
      // Query the Sessions model for all sessions
      const sessions = await DataStore.query(Sessions);
      // Filter the sessions array to only include sessions with a matching Email field and a matching Date field
      const filteredSessions = sessions.filter(
        (session) => session.Email === email && session.Date === today
      );
      if (filteredSessions.length > 0) {
        setArrived(filteredSessions[0].Arrived);
        setLeftCenter(filteredSessions[0].LeftCenter);
      }
      
    }
    getArrived();
  }, []);

  const navigation = [
    {name: 'Home', href: '/', current: false},
    { name: 'Session Bookings', href: '/sessionbookings', current: false },
    { name: 'Party Booking', href: '/my-booking', current: true },
    { name: 'Payments', href: '/payments', current: false },
    { name: 'Events', href: '/bookedevents', current: false },
    { name: 'Contact', href: '/customercontact', current: false },
    // Add a new option that only appears when Arrived is true and LeftCenter is false
    Arrived && !LeftCenter && { name: 'Order', href: '/Order', current: false },
  ].filter(Boolean);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate('/')
      window.location.reload();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-orange-400 hover:bg-orange-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="data:image/jpeg;base64,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"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="data:image/jpeg;base64,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"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                       <Link
                       key={item.name}
                       to={item.href}
                       className={classNames(
                         item.current ? 'bg-white text-orange-500 component-title' : 'text-orange-500 component-title hover:bg-orange-500 hover:text-white',
                         'rounded-md px-3 py-2 text-sm font-medium'
                       )}
                       aria-current={item.current ? 'page' : undefined}
                     >
                       {item.name}
                     </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button onClick={handleSignOut}
                  type="button"
                  className="rounded-full bg-orange-200 p-1 text-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-100"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-orange-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-100">

                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="./versa.gif"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? 'bg-orange-100' : '',
                              'block w-full text-left px-4 py-2 text-sm text-orange-700'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-100 text-orange-500 component-title' : 'text-orange-300 component-title hover:bg-orange-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
