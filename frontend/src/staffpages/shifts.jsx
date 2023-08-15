import React, { useState, useEffect } from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { Staff, TimeEntry } from './models';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addWeeks,
  isSameDay,
} from 'date-fns';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Tasks from './Task';
import Holiday from './holiday';

const ShiftBooking = () => {
  const navigate = useNavigate();

  // find out the current user's group if Developer or Admin then render a new button

  const [userGroups, setUserGroups] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clockedIn, setClockIn] = useState(false);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [booking, setBooking] = useState(false);
  const [holiday, setHoliday] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDates = eachDayOfInterval({ start: monthStart, end: monthEnd });

  useEffect(() => {
    async function getUserGroups() {
      const user = await Auth.currentAuthenticatedUser();
      const groups =
        user.signInUserSession.accessToken.payload['cognito:groups'];
      setUserGroups(groups);
    }
    getUserGroups();
  }, []);

  // if the user is a developer or admin then render the button

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
            clockIn: '',
            clockOut: '',
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
              clockIn:
                staffTimeEntry.ClockIn && staffTimeEntry.ClockIn[index]
                  ? format(new Date(staffTimeEntry.ClockIn[index]), 'p')
                  : '',
              clockOut:
                staffTimeEntry.ClockOut && staffTimeEntry.ClockOut[index]
                  ? format(new Date(staffTimeEntry.ClockOut[index]), 'p')
                  : '',
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


const today = new Date();

const currentDay = format(today, 'dd-MM-yyyy');


if (booking === true) {
  return (
    navigate('/staff/shiftbooking')
  )
}

if (holiday === true) {
  return (
    <Holiday email ={userEmail}/>
  )
}

const handleClockIn = async (staffId, date) => {
  const timeEntry = await DataStore.query(TimeEntry, Predicates.ALL, {
    filter: (c) =>
      c.StaffID('eq', staffId).Month('eq', format(monthStart, 'M')),
  });
  
  //update the current datastore entry with the clock in time
  if (timeEntry.length > 0) {
    const clockInIndex = timeEntry[0].Dates.findIndex((d) => d === date);
    if (clockInIndex > -1) {
      const clockIn = new Date();
      const clockInTime = format(clockIn, 'p');
      const updatedTimeEntry = await DataStore.save(
        TimeEntry.copyOf(timeEntry[0], (updated) => {
          updated.ClockIn[clockInIndex] = clockIn;
        })
        
      );
console.log(updatedTimeEntry);

      
      const updatedShifts = { ...shifts };
      updatedShifts[staffId][date].clockIn = clockInTime;
      setShifts(updatedShifts);
    }
  }
};

const handleClockOut = async (staffId, date) => {
  const timeEntry = await DataStore.query(TimeEntry, (c) =>
    c.StaffID('eq', staffId).Month('eq', format(monthStart, 'M'))
  );
  //update the current datastore entry with the clock in time
  if (timeEntry.length > 0) {
    const clockOutIndex = timeEntry[0].Dates.findIndex((d) => d === date);
    if (clockOutIndex > -1) {
      const clockOut = new Date();
      const clockOutTime = format(clockOut, 'p');
      const updatedTimeEntry = await DataStore.save(
        TimeEntry.copyOf(timeEntry[0], (updated) => {
          updated.ClockOut[clockOutIndex] = clockOut;
        })
      );
      const updatedShifts = { ...shifts };
      updatedShifts[staffId][date].clockOut = clockOutTime;
      setShifts(updatedShifts);
    }
  }
};



return (
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-bold leading-6 text-center text-gray-900">Shifts</h1>
        <p className="mt-2 text-sm text-gray-700">
Todays Date: {currentDay}        </p>
      </div>
      {userGroups.includes('Admin') || userGroups.includes('Developer') ? (
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-between ml-5">
        <button onClick={() => setBooking(true)}
          type="button"
          className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Book Shifts
        </button>

      </div>

    ) : null}
    <button onClick={()=> setHoliday(true)} type='button'className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {staff.map((staffMember) => (
                  <tr key={staffMember.id}>
                    <td className="whitespacenowrap py-4 pl-4 pr-3 text-sm font-bold text-purple-900 sm:pl-6">
  {staffMember.Name}
</td>


{weeks[currentWeekIndex].map((date) => {
  const dateString = format(date, 'yyyy-MM-dd');
  return (
    <td key={dateString} className="whitespace-nowrap px-3 py-4 text-sm text-bold text-black">
      Start: {shifts[staffMember.id]?.[dateString]?.start || ''}
      <br />
      End: {shifts[staffMember.id]?.[dateString]?.end || ''}
      <br />
      Clock In: {shifts[staffMember.id]?.[dateString]?.clockIn || ''}
      <br />
      Clock Out: {shifts[staffMember.id]?.[dateString]?.clockOut || ''}
      <br />
      {isSameDay(date, today) && (
        <>
          <button
            onClick={() => handleClockIn(staffMember.id, dateString)}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Clock In
          </button>
          <button
            onClick={() => handleClockOut(staffMember.id, dateString)}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Clock Out
          </button>
        </>
      )}
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



};

export default ShiftBooking;
