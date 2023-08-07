import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Staff, TimeEntry } from './models';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';

const ShiftBooking = () => {
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
      setShifts(
        staffData.reduce((acc, curr) => {
          acc[curr.id] = {
            mon: { start: '', end: '' },
            tue: { start: '', end: '' },
            wed: { start: '', end: '' },
            thu: { start: '', end: '' },
            fri: { start: '', end: '' },
            sat: { start: '', end: '' },
            sun: { start: '', end: '' },
          };
          return acc;
        }, {})
      );
    };
    fetchStaff();
  }, []);

  const handleInputChange = (e, staffId, day) => {
    const { name, value } = e.target;
    setShifts((prevShifts) => ({
      ...prevShifts,
      [staffId]: {
        ...prevShifts[staffId],
        [day]: {
          ...prevShifts[staffId][day],
          [name]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    for (const staffId in shifts) {
      const shiftStarts = [];
      const shiftEnds = [];
      const dates = [];
      for (const day in shifts[staffId]) {
        const shift = shifts[staffId][day];
        if (shift.start && shift.end) {
          shiftStarts.push(shift.start);
          shiftEnds.push(shift.end);
          const dateIndex = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(day);
          const date = weekDates[dateIndex];
          dates.push(format(date, 'yyyy-MM-dd'));
        }
      }
      await DataStore.save(
        new TimeEntry({
          StaffID: staff.find((s) => s.id === staffId).Name,
          ShiftStart: shiftStarts,
          ShiftFinish: shiftEnds,
          Dates: dates,
          WeekNumber: format(weekStart, 'w'),
        })
      );
    }
  };
  
  

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        Current Week: {format(weekStart, 'MMM do')} -{' '}
        {format(weekEnd, 'MMM do, yyyy')}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300">
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
                    <input
                      type="time"
                      name="start"
                      value={shifts[staffMember.id]?.[day]?.start || ''}
                      onChange={(e) =>
                        handleInputChange(e, staffMember.id, day)
                      }
                      className="border rounded-md p-1"
                    />
                    <input
                      type="time"
                      name="end"
                      value={shifts[staffMember.id]?.[day]?.end || ''}
                      onChange={(e) =>
                        handleInputChange(e, staffMember.id, day)
                      }
                      className="border rounded-md p-1"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Save
      </button>
    </div>
  );
                    }  
export default ShiftBooking;
