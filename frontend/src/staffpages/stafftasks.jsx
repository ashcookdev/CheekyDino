import {
    AcademicCapIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    ClockIcon,
    ReceiptRefundIcon,
    UsersIcon,
  } from '@heroicons/react/24/outline';
  import { useState, useEffect } from 'react';
  import { DataStore } from 'aws-amplify';
  import { ClockIns, Messages } from '../models';
  import { format } from 'date-fns';
  
  const actions = [
    {
      title: 'Front Desk',
      icon: ClockIcon,
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
    },
    {
      title: 'Cafe Till',
      icon: CheckBadgeIcon,
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
    },
    {
      title: 'Clean Tables',
      icon: UsersIcon,
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
    },
    {
      title: 'Party Host',
      icon: BanknotesIcon,
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50',
    },
    {
      title: 'Clean and Hoover Upstairs',
      icon: ReceiptRefundIcon,
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50',
    },
    {
      title: 'Training',
      icon: AcademicCapIcon,
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
    },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  export default function StaffTask() {
    const [clockIns, setClockIns] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
      const fetchClockIns = async () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const clockIns = await DataStore.query(ClockIns);
        const todaysClockIns = clockIns.filter(clockIn => clockIn.Date === today && clockIn.ClockedIn === true && clockIn.ClockedOut === false);
        setClockIns(todaysClockIns);
      };
  
      fetchClockIns();
    }, [reload]);
  
    const handleStaffAssignment = async (actionTitle, staffId) => {
        // Save the assigned task to the ClockIn Datastore
        try {
          const existingClockIn = clockIns.find(clockIn => clockIn.StaffId === staffId);
          if (existingClockIn) {
            await DataStore.save(
              ClockIns.copyOf(existingClockIn, updated => {
                updated.StaffRole = actionTitle;
              })
            );
      
            let date = new Date();
            let awsTime = format(date, 'hh:mm:ss:SSS');
      
            // Save a new message to the Messages Datastore
            const newMessage = new Messages({
              content: `${staffId} have been assigned to ${actionTitle}`,
              email: "Front Desk",
              group: ['Staff', 'Admin', 'Developer', 'TeamLeader'],
              createdAt: awsTime,
            });
            await DataStore.save(newMessage);
      
            console.log("Assigned task updated:", existingClockIn);
            setReload(true)
          } else {
            console.error("ClockIn object not found for staff:", staffId);
          }
        } catch (error) {
          console.error("Error updating assigned task:", error);
        }
      };
      
      
  
    return (
      <div className="divide-y divide-gray-200 rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  'inline-flex rounded-lg p-3 ring-4 ring-white'
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <span className="focus:outline-none">{action.title}</span>
              </h3>
              <div className="mt-2">
              <select
          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          onChange={e => handleStaffAssignment(action.title, e.target.value)}
        >
          <option value="">Select Staff</option>
          {clockIns.map(clockIn => (
            <option key={clockIn.StaffId} value={clockIn.StaffId}>{clockIn.StaffId}</option>
          ))}
        </select>
              </div>
              {clockIns.map((clockIn, index) => {
    if (clockIn.StaffRole === action.title) {
        return (
            <p key={index} className="mt-3 text-sm text-gray-500">
                {clockIn.StaffId} is assigned to {clockIn.StaffRole}
            </p>
        );
    } else {
        return null; // If the condition isn't met, return null or another default value
    }
})}


             
            </div>
            <span
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    );
  }
  