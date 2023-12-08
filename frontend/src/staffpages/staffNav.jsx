import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Auth } from 'aws-amplify'
import { useState, useEffect } from 'react'
import {
  CashIcon,
  ChatAlt2Icon,
  CalendarIcon,
  ClipboardListIcon,
} from '@heroicons/react/outline';
import { CalendarDaysIcon, ClipboardDocumentCheckIcon, CurrencyDollarIcon, HomeIcon, PlayCircleIcon, SignalIcon } from '@heroicons/react/20/solid'
import { ChatBubbleBottomCenterTextIcon, CogIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
  
}

export default function StaffNav() {
  const [userGroups, setUserGroups] = useState([])

  useEffect(() => {
    async function getUserGroups() {
      const user = await Auth.currentAuthenticatedUser()
      const groups = user.signInUserSession.accessToken.payload['cognito:groups']
      setUserGroups(groups)
    }
    getUserGroups()
  }, [])
  
  


function handleLogout() {
    // logout from cognito
    Auth.signOut()
}

return (
  <Disclosure as="nav" className="bg-white shadow">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                  className="block h-8 w-auto lg:hidden rounded-full"
                  src="./versa.gif"
                  alt="Your Company"
                />
                <img
                  className="hidden h-8 w-auto lg:block rounded-full"
                  src="./versa.gif"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
  <Link
    to="/dashboard"
    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-purple-900"
  >
    <HomeIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    Home
  </Link>
  <Link
    to="/till"
    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-purple-900 hover:border-gray-300 hover:text-gray-700"
  >
    <CurrencyDollarIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    Till
  </Link>
  <Link
    to="/kitchen"
    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-purple-900 hover:border-gray-300 hover:text-gray-700"
  >
    <SignalIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    Kitchen
  </Link>
  <Link
    to="/chat"
    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-purple-900 hover:border-gray-300 hover:text-gray-700"
  >
    <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    Chat
  </Link>
  <Link
    to="/staff"
    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-purple-900 hover:border-gray-300 hover:text-gray-700"
  >
    <CalendarDaysIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    Staff
  </Link>
  <Link
    to="/settings"
    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-purple-900 hover:border-gray-300 hover:text-gray-700"
  >
    <CogIcon className="h-5 w-5 mr-1" aria-hidden="true" />
    Settings
  </Link>
</div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="versa.gif"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              
                   
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={handleLogout}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
  <div className="space-y-1 pb-4 pt-2">
    <Link
      to="/dashboard"
      className="flex items-center block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
    >
      <HomeIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Home
    </Link>
    <Link
      to="/till"
      className="flex items-center block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
    >
      <CurrencyDollarIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Till
    </Link>
    <Link
      to="/Kitchen"
      className="flex items-center block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
    >
      <SignalIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Kitchen
    </Link>
    <Link
      to="/chat"
      className="flex items-center block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
    >
      <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Chat
    </Link>
    <Link
      to="/staff"
      className="flex items-center block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
    >
      <CalendarDaysIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Staff
    </Link>
  </div>
</Disclosure.Panel>
      </>
    )}
  </Disclosure>
)
}