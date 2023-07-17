import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {Auth} from 'aws-amplify'
import { useState, useEffect } from 'react'
import { DataStore, Predicates } from 'aws-amplify'
import { PartyBooking } from './models'
import { Staff } from './models'
import PartyBookingForm from './partybookingform'

  

export default function Tasks() {
    const [staff, setStaff] = useState([])
    const [partys, setBookings] = useState([])
    const [info, setInfo] = useState('')
    const [next, setNext] = useState(false)

// get auth user

console.log(staff)
console.log(partys)



    useEffect(() => {
        async function getStaffAndBookings() {
          // Get authenticated user
          const user = await Auth.currentAuthenticatedUser()
          // Get email from authenticated user
          const email = user.attributes.email
          // Get staff member with matching email
          const staff = await DataStore.query(Staff, Predicates.ALL, {
            filter: c => c.email("eq", email)
          })
          setStaff(staff)
          // Get bookings where PartyHostAssigned matches staff member's name
          const bookings = await DataStore.query(PartyBooking, Predicates.ALL, {
            filter: c => c.PartyHostAssigned("eq", staff[0].name)
          })
          setBookings(bookings)
        }
        getStaffAndBookings()
      }, [])

if (next === true) {
    return (
        <PartyBookingForm partyid={info} />
    )

}



  return (
    
    <ul role="list" className="divide-y divide-gray-100">
        <h5 className="text-lg font-medium text-gray-900">Tasks</h5>
        {staff.map((staff) => (
            <li
            key={staff.id}
            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
            >
            <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
            {staff.Name}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
            {staff.Email}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
            {staff.Role}
            </p>
            </div>
            </div>
            </li>
        ))}
        
       



        {partys
        .slice()
        .sort((a, b) => new Date(a.PartyDate) - new Date(b.PartyDate))
        .map(party => (
      <li
        key={party.id}
        className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
      >
        <div className="flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {party.PartyType}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              Child Name: {party.ChildName}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              Child Age: {party.ChildAge}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              Party Date: {party.PartyDate}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              Party Time: {party.PartyTime}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              Party Finish: {party.PartyFinish}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              No. of Children: {party.NoOfChildren}
            </p>
          </div>
          <button onClick={()=> {setInfo(party.id)|| setNext(true)}} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            More Information
            </button>

        </div>
      </li>
    ))}
  </ul>
  
  )
}
