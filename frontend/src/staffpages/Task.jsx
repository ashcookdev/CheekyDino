import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
} from 'date-fns';
import { Staff, TimeEntry } from '../staffpages/models';
import { useNavigate } from 'react-router-dom';

const ShiftBooking = () => {
  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
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

  const handleSave = async () => {
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
          WeekNumber: format(monthStart, 'w'),
        })
      );
    }
    console.log('Saved!');
    navigate ('/staff')
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

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        Current Month:{' '}
        {format(monthStart, 'MMM yyyy')}
      </div>
      <div className="overflow-x-auto">
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
