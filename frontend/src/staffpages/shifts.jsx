import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Staff, TimeEntry } from './models';
import {
    format,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    addWeeks,
    } from 'date-fns';
    import { Auth } from 'aws-amplify'

   const ShiftBooking = () => {


// find out the current user's group if Developer or Admin then render a new button

const [userGroups, setUserGroups] = useState([])

useEffect(() => {
    async function getUserGroups() {
        const user = await Auth.currentAuthenticatedUser()
        const groups = user.signInUserSession.accessToken.payload['cognito:groups']
        setUserGroups(groups)
    }
    getUserGroups()
}, [])








  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekDates = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    const fetchStaff = async () => {
      const staffData = await DataStore.query(Staff);
      setStaff(staffData);
      const timeEntries = await DataStore.query(TimeEntry);
      const shiftsData = staffData.reduce((acc, curr) => {
        acc[curr.id] = {
          mon: { start: '', end: '' },
          tue: { start: '', end: '' },
          wed: { start: '', end: '' },
          thu: { start: '', end: '' },
          fri: { start: '', end: '' },
          sat: { start: '', end: '' },
          sun: { start: '', end: '' },
        };
        const staffTimeEntry = timeEntries.find(
          (te) => te.StaffID === curr.Name && te.WeekNumber === format(weekStart, 'w')
        );
        if (staffTimeEntry) {
          staffTimeEntry.Dates.forEach((date, index) => {
            const day = format(new Date(date), 'iii').toLowerCase();
            acc[curr.id][day] = {
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
  }, [weekStart]);
  
  const handleNextWeek = () => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  };

  
  
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Shift Booking</h1>
        <h2 className="text-lg">
          Week {format(weekStart, 'w')}: {format(weekStart, 'MMM do')} -{' '}
          {format(weekEnd, 'MMM do, yyyy')}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Staff</th>
              {weekDates.map((date) => (
                <th key={date} className="border border-gray-300 px-4 py-2">
                  {format(date, 'EEE do')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {staffMember.Name}
                </td>
                {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                  <td key={day} className="border border-gray-300 px-4 py-2">
                    <div>{shifts[staffMember.id]?.[day]?.start || '-'}</div>
                    <div>{shifts[staffMember.id]?.[day]?.end || '-'}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button
          onClick={handleNextWeek}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};


        export default ShiftBooking;