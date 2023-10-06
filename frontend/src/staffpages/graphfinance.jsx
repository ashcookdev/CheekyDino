import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, PartyBooking } from './models';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format } from 'date-fns';

async function getData(period) {
  const sessions = await DataStore.query(Sessions);
  const partyBookings = await DataStore.query(PartyBooking);
  let data = [...sessions, ...partyBookings].reduce((acc, item) => {
    let date = item.Date || item.PartyDate;
    let timeslotFrom = item.TimeslotFrom;
    let timeslotTo = item.TimeslotTo;
    let partyTime = item.PartyTime;

    if (!date) {
      return acc;
    }
    if (period === 'day') {
      const dateStr = format(new Date(date), 'yyyy-MM-dd');
      if (timeslotFrom && timeslotTo) {
        timeslotFrom = format(new Date(`${dateStr}T${timeslotFrom}:00`), 'HH');
        timeslotTo = format(new Date(`${dateStr}T${timeslotTo}:00`), 'HH');
      }
      if (partyTime) {
        partyTime = format(new Date(`${dateStr}T${partyTime}:00`), 'HH');
      }
      date = `${format(new Date(date), 'dd.MM.yyyy')} ${timeslotFrom}-${timeslotTo || partyTime}`;
    } else if (period === 'week') {
      date = getWeek(date);
    } else if (period === 'month') {
      date = getMonth(date);
    } else if (period === 'year') {
      date = getYear(date);
    }
    if (!acc[date]) {
      acc[date] = { date, sessionsTotalSpent: 0, partyBookingsTotalSpent: 0 };
    }
    if (item.TotalSpent) {
      acc[date].sessionsTotalSpent += item.TotalSpent;
    } else if (item.Total) {
      acc[date].partyBookingsTotalSpent += item.Total;
    }
    return acc;
  }, {});

  // Convert groupedData object to an array
  data = Object.values(data);

  // Sort data by date
  data.sort((a, b) => new Date(a.date.split(' ')[0]) - new Date(b.date.split(' ')[0]));

  return data.map((item) => ({
    ...item,
    totalSpent: item.sessionsTotalSpent + item.partyBookingsTotalSpent,
  }));
}


function getWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return `${d.getFullYear()}-W${1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)}`;
}

function getMonth(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}

function getYear(date) {
  const d = new Date(date);
  return `${d.getFullYear()}`;
}

function MyLineChart() {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('day');

  
    useEffect(() => {
      getData(period).then(setData);
    }, [period]);
  
    return (
      <div className="p-4 bg-white rounded shadow">
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 rounded-l ${period === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setPeriod('day')}
          >
            Day
          </button>
          <button
            className={`px-4 py-2 ${period === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setPeriod('week')}
          >
            Week
          </button>
          <button
            className={`px-4 py-2 ${period === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
          <button
            className={`px-4 py-2 rounded-r ${period === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setPeriod('year')}
          >
            Year
          </button>
        </div>
        <div className='mt-5'>
          <div className="w-full overflow-x-auto">
            <LineChart
              width={800} // Set a default width, can be adjusted based on design
              height={300}
              data={data}
              margin={{ right: 20 }} // Adjust margin to prevent cutoff of labels
            >
              <CartesianGrid strokeDasharray="5 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sessionsTotalSpent" stroke="#ff0000" /> {/* Sessions in red */}
              <Line type="monotone" dataKey="partyBookingsTotalSpent" stroke="#0000ff" /> {/* PartyBookings in blue */}
              <Line type="monotone" dataKey="totalSpent" stroke="#008000" /> {/* Total in green */}
            </LineChart>
          </div>
        </div>
      </div>
    );
  }
 
export default MyLineChart;
