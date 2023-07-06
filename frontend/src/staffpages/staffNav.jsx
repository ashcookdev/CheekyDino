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
import { CalendarDaysIcon, ClipboardDocumentCheckIcon, HomeIcon, PlayCircleIcon, SignalIcon } from '@heroicons/react/20/solid'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'

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
    <Disclosure as="nav"  className="top-0 inset-x-0 bg-opacity-50 backdrop-blur-md shadow"
    style={{ backgroundImage: "url('/bg.png')" }}>
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/"
                className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <HomeIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Home
              </a>            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/Till"
                className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Till
              </a>
              <a
                href="/kitchen"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Kitchen
              </a>
              <a
                href="/chat"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Live Chat
              </a>
              <a
                href="/calender"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <CalendarDaysIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                Calendar
              </a>
              <a
  href="#"
  onClick={handleLogout}
  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
>
  <SignalIcon className="h-5 w-5 mr-1" aria-hidden="true" />
  Log Out
</a>

            </div>
            <Disclosure.Panel className="sm:hidden">
  <div className="pt-2 pb-3 space-y-1">
    <a
      href="/hub"
      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      <HomeIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Home
    </a>
    <a
      href="/Till"
      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      <PlayCircleIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Till
    </a>
    <a
      href="/kitchen"
      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      <ClipboardDocumentCheckIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Kitchen
    </a>
    <a
      href="/chat"
      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Live Chat
    </a>
    <a
      href="/calender"
      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      <CalendarDaysIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Calendar
    </a>
    <a
      href="#"
      onClick={handleLogout}
      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      <SignalIcon className="h-5 w-5 mr-1" aria-hidden="true" />
      Logout
    </a>
  </div>
</Disclosure.Panel>
          </div>
        </div>
        </div>
      </>
    )}
  </Disclosure>

  )
}
