import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { Staff, TimeEntry, Holiday } from '../models';
import { useNavigate } from 'react-router-dom';
import NewStaff from './staffdetails';

const ShiftBooking = () => {
  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holiday, setHoliday] = useState([]);
  const [newStaff, setNewStaff] = useState(false);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDates = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      const staffData = await DataStore.query(Staff);
      setStaff(staffData);
      setShifts(
        staffData.reduce((acc, curr) => {
          acc[curr.id] = monthDates.reduce((acc2, curr2) => {
            const date = format(curr2, 'yyyy-MM-dd');
            acc2[date] = { start: '', end: '' };
            return acc2;
          }, {});
          return acc;
        }, {})
      );
    };
    fetchStaff();
  }, []);

  const handleInputChange = (e, staffId, date) => {
    const { name, value } = e.target;
    setShifts((prevShifts) => ({
      ...prevShifts,
      [staffId]: {
        ...prevShifts[staffId],
        [date]: {
          ...prevShifts[staffId][date],
          [name]: value,
        },
      },
    }));
  };

  const calculateTotalHours = () => {
    const hours = {};
    for (const staffId in shifts) {
      hours[staffId] = {};
      for (const date in shifts[staffId]) {
        const shift = shifts[staffId][date];
        if (shift.start && shift.end) {
          const start = new Date(`1970-01-01T${shift.start}Z`);
          const end = new Date(`1970-01-01T${shift.end}Z`);
          hours[staffId][date] = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }
      }
    }
    return hours;
  };
      

  const handleSave = async () => {
    const hours = calculateTotalHours();
    for (const staffId in shifts) {
      const shiftStarts = [];
      const shiftEnds = [];
      const dates = [];
      for (const date in shifts[staffId]) {
        const shift = shifts[staffId][date];
        if (shift.start && shift.end) {
          shiftStarts.push(shift.start);
          shiftEnds.push(shift.end);
          dates.push(date);
        }
      }
      await DataStore.save(
        new TimeEntry({
          StaffID: staff.find((s) => s.id === staffId).Email,
          ShiftStart: shiftStarts,
          ShiftFinish: shiftEnds,
          Dates: dates,
          Month: format(monthStart, 'M'),
          Hours: Object.values(hours[staffId]).reduce((a, b) => a + b, 0),
        })
      );
    }
    console.log('Saved!');
    navigate('/staff');
  };
  
  
  // Group dates by week
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

  // Determine current week and day
  const today = new Date();
  const currentWeekIndex = weeks.findIndex((week) =>
    week.some((date) => format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'))
  );
  const currentDay = format(today, 'EEE do');


  useEffect(() => {
    const fetchHoliday = async () => {
      const holidayData = await DataStore.query(Holiday);
      // only return holiday for current month
      const holidays = holidayData.filter((h) => h.Month === format(monthStart, 'M'));

      setHoliday(holidays);
    };
    fetchHoliday();
  }, []);

  if (newStaff === true) {
    return <NewStaff />;
    
  }


  return (
    <div className="flex flex-col items-center">
      <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Book In Your Shifts For The Month 
          <br />
        </h2>
        <div className="mt-10 flex items-center gap-x-6">
        <button
            className="mr-2 px-2 py-1 border border-gray-300 rounded-md bg-blue-700 text-white"
            onClick={() => setNewStaff(true)}
          >
            Edit Staff Details
          </button>
        </div>
      </div>
    </div>
      <div className="mb-4 text-bold">
        Current Month:{' '}
        {format(monthStart, 'MMMM yyyy')}
      </div>
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center mb-2">
         
          </div>
          </div>




         



      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {holiday.map((person) => (
        <div
          key={person.email}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
          </div>
          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <h5> Holiday Request</h5>
              <p className="text-sm font-medium text-gray-900">{person.Name}</p>
              <p className="truncate text-sm text-gray-500">{person.StartDate}</p>
              <p className="truncate text-sm text-gray-500">{person.EndDate}</p>
              <p className="truncate text-sm text-gray-500">{person.Description}</p>



            </a>
          </div>
        </div>
      ))}
    </div>        
      <div className="overflow-x-auto mt-5">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Staff</th>
              {weeks.map((week, index) => (
                <th
                  key={index}
                  className={`border border-gray-300 px-4 py-2 ${
                    index === currentWeekIndex ? 'bg-green-100' : ''
                  }`}
                >
                  Week {index + 1}
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
                {weeks.map((week, index) => (
                  <td key={index} className="border border-gray-300 px-4 py-2">
                    {week.map((date) => {
                      const dateString = format(date, 'yyyy-MM-dd');
                      return (
                        <div
                          key={dateString}
                          className={`${
                            format(date, 'EEE do') === currentDay ? 'bg-yellow-100' : ''
                          }`}
                        >
                          {format(date, 'EEE do')}
                          <br />
                          <input
                            type="time"
                            name="start"
                            value={shifts[staffMember.id]?.[dateString]?.start || ''}
                            onChange={(e) =>
                              handleInputChange(e, staffMember.id, dateString)
                            }
                            className="border rounded-md p-1"
                          />
                          <input
                            type="time"
                            name="end"
                            value={shifts[staffMember.id]?.[dateString]?.end || ''}
                            onChange={(e) =>
                              handleInputChange(e, staffMember.id, dateString)
                            }
                            className="border rounded-md p-1"
                          />
                        </div>
                      );
                    })}
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
};

export default ShiftBooking;
