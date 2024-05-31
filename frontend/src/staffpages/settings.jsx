import { useState } from 'react'
import { Dialog, Switch } from '@headlessui/react'
import { Bars3Icon, CakeIcon } from '@heroicons/react/20/solid'
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {Staff} from "../models"
import { DataStore, Predicates } from 'aws-amplify'
import { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'
import { QueueListIcon, SignalIcon } from '@heroicons/react/24/solid'









function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
    const [staff, setStaff] = useState([])
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
          // find the user email from the auth
          const user = await Auth.currentAuthenticatedUser();
          // query the staff table using the email
          const email = user.attributes.email;
      
          const staff = await DataStore.query(Staff);
          const filteredStaffs = staff.filter((staff) => staff.Email === email);

          setStaff(filteredStaffs);
        };
        fetchStaff();
      }, []);

      useEffect(() => {
        const fetchUserGroups = async () => {
          const user = await Auth.currentAuthenticatedUser();
          const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
          setUserGroups(groups);
        };
        fetchUserGroups();
      }, []);

      const secondaryNavigation = [

       
        ...(userGroups.includes('Developer') || userGroups.includes('Admin')
          ? [
            { name: 'Admin', href: '/branchsettings', icon: UserCircleIcon, current: true },
          { name: 'Stock Control ', href: '/stockcontrol', icon: CubeIcon, current: false },
          { name: 'Party Stock', href: '/partystock', icon: BellIcon, current: false},
          {name: 'Till Products', href: '/tillproducts', icon: Bars3Icon, current: false},
          { name: 'Stock Swap', href: '/stockswap', icon: SignalIcon, current: false },
          {name: 'Shopping List', href: '/shoppinglist', icon: QueueListIcon, current: false},

          { name: 'Add Stock Items ', href: '/buildameal', icon: CakeIcon, current: false },
          { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },]


          : []),
      ];

  return (
    <>
      

      <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-indigo-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-indigo-600' : 'text-indigo-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
              </p>

              {staff.map((staff) => (
                

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{staff.Name}</div>
                    
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{staff.Email}</div>
                   
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">DOB</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{staff.DOB}</div>
                   
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Telephone</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{staff.Telephone}</div>
                   
                  </dd>
                </div>
                
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Role</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{staff.Role}</div>
                   
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Start Date</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{staff.StartDate}</div>
                    
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Contract Type</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{staff.ContractType}</div>
                    
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Hourly Rate</dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">£{staff.HourlyRate}</div>
                   
                  </dd>
                </div>
                
              </dl>
                ))}
                
            </div>
            <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Request Change
                    </button>
              


            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">Bank accounts</h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">Connect bank accounts to your account.</p>

              <ul role="list" className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">Sort Code</div>
                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Update
                  </button>
                </li>
                <li className="flex justify-between gap-x-6 py-6">
                  <div className="font-medium text-gray-900">Account Number</div>
                  <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Update
                  </button>
                </li>
              </ul>

              <div className="flex border-t border-gray-100 pt-6">
                <button type="button" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  <span aria-hidden="true">+</span>Request Change
                </button>
              </div>
            </div>

           

           
          </div>
        </main>
      </div>
    </>
  )
}
