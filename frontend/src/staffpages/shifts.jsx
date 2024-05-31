import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { Staff, TimeEntry, ClockIn } from '../models';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Auth } from 'aws-amplify';
import Holiday from './holiday';
import { ClockIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import OnlineStaff from './online';
import StaffActions from './staffactions';

const ShiftBooking = () => {


  const navigate = useNavigate();

  const [userGroups, setUserGroups] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [holiday, setHoliday] = useState(false);
  const [clockedInStaff, setClockedInStaff] = useState(false);
  const [breakTime, setBreak] = useState(false);
  const [app, setApp] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDates = eachDayOfInterval({ start: monthStart, end: monthEnd });


  
  
  

  

  useEffect(() => {
    async function getUserEmail() {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;
      setUserEmail(email);
    }
    getUserEmail();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      const staffData = await DataStore.query(Staff);
      setStaff(staffData);
      const timeEntries = await DataStore.query(TimeEntry);
      const shiftsData = staffData.reduce((acc, curr) => {
        acc[curr.id] = {};
        monthDates.forEach((date) => {
          acc[curr.id][format(date, 'yyyy-MM-dd')] = {
            start: '',
            end: '',
          };
        });
        const staffTimeEntry = timeEntries.find(
          (te) =>
            te.StaffID === curr.Email && te.Month === format(monthStart, 'M')
        );
        if (staffTimeEntry) {
          staffTimeEntry.Dates.forEach((date, index) => {
            acc[curr.id][date] = {
              start: staffTimeEntry.ShiftStart[index],
              end: staffTimeEntry.ShiftFinish[index],
            };
          });
        }
        return acc;
      }, {});
      setShifts(shiftsData);
    };
    fetchStaff();
  }, [monthDates, monthStart]);

  const weeks = [];
  let currentWeek = [];
  monthDates.forEach((date) => {
    currentWeek.push(date);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const [totalHours, setTotalHours] = useState({});
  

  useEffect(() => {
    const fetchTotalHours = async () => {
      const timeEntries = await DataStore.query(TimeEntry);
      const hours = staff.reduce((acc, curr) => {
        acc[curr.id] = weeks.map((week) => {
          let weekHours = 0;
          week.forEach((date) => {
            const dateString = format(date, 'yyyy-MM-dd');
            const timeEntry = timeEntries.find(
              (te) =>
                te.StaffID === curr.Email &&
                te.Month === format(monthStart, 'M') &&
                te.Dates.includes(dateString)
            );
            if (timeEntry) {
              const dateIndex = timeEntry.Dates.findIndex((d) => d === dateString);
              if (timeEntry.ShiftStart[dateIndex] && timeEntry.ShiftFinish[dateIndex]) {
                const start = new Date(`1970-01-01T${timeEntry.ShiftStart[dateIndex]}Z`);
                const end = new Date(`1970-01-01T${timeEntry.ShiftFinish[dateIndex]}Z`);
                weekHours += (end.getTime() - start.getTime()) / (1000 * 60 * 60);
              }
            }
          });
          return weekHours;
        });
        return acc;
      }, {});
      setTotalHours(hours);
    };
    fetchTotalHours();
  }, [staff, weeks, monthStart]);


  
  if (app === true) {
    return navigate('/applications');
  }



  const today = new Date();

  const currentDay = format(today, 'dd-MM-yyyy');



  if (holiday === true) {
    return <Holiday email={userEmail} />;
  }




  
  

  return (
    <div className="flex flex-col">
    
      <div>
    

<OnlineStaff />
</div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-bold leading-6 text-center text-gray-900">Shifts</h1>
          <p className="mt-2 text-sm text-gray-700">Todays Date: {currentDay}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-between mr-5">
          <button
            onClick={() => setApp(true)}
            type="button"
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Job Applications
          </button>
        </div>


       
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-between mr-5">
            <button
onClick={() => {
  navigate('/staff/shiftbooking');
}}              type="button"
              className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Book Shifts
            </button>
          </div>
        <button
          onClick={() => setHoliday(true)}
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Request Holiday
        </button>
        
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
  <div className="flex justify-between mb-4">
    <button
      onClick={() => setCurrentWeekIndex((i) => Math.max(i - 1, 0))}
      disabled={currentWeekIndex === 0}
      type="button"
      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Previous
    </button>
    <button
      onClick={() => setCurrentWeekIndex((i) => Math.min(i + 1, weeks.length - 1))}
      disabled={currentWeekIndex === weeks.length - 1}
      type="button"
      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Next
    </button>
  </div>
  <table className="min-w-full divide-y divide-gray-300">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"></th>
        {weeks[currentWeekIndex].map((date) => (
          <th
            key={date}
            scope="col"
            className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${
              isSameDay(date, today) ? 'bg-purple-100' : ''
            }`}
          >
            {format(date, 'EEE do')}
            {totalHours[date] && (
              <span className="block text-xs text-gray-500">{totalHours[date]} hours</span>
            )}

          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
      {staff.map((staffMember) => (
        <tr key={staffMember.id}>
          <td className="whitespace-no-wrap py-4 pl-4 pr-3 text-sm font-bold text-purple-900 sm:pl-6">
            {staffMember.Name}
          </td>
          {weeks[currentWeekIndex].map((date) => {
            const dateString = format(date, 'yyyy-MM-dd');
            return (
              <td key={dateString} className="whitespace-no-wrap px-3 py-4 text-sm text-bold text-black">
                Start: {shifts[staffMember.id]?.[dateString]?.start || ''}
                <br />
                End: {shifts[staffMember.id]?.[dateString]?.end || ''}
                <br />
                

              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShiftBooking;