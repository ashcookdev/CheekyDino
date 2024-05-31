import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, PartyBooking } from '../models';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format, subDays, addDays } from 'date-fns';

async function getData(period) {
  const sessions = await DataStore.query(Sessions);
  const partyBookings = await DataStore.query(PartyBooking);

  let data = [];
  let currentDate = new Date();

  if (period === 'week') {
    for (let i = 0; i < 7; i++) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const filteredSessions = sessions.filter(item => format(new Date(item.Date), 'yyyy-MM-dd') === dateStr);
      const filteredPartyBookings = partyBookings.filter(item => format(new Date(item.PartyDate), 'yyyy-MM-dd') === dateStr);
      const totalSpent = filteredSessions.reduce((acc, item) => acc + (item.TotalSpent || 0), 0) +
                        filteredPartyBookings.reduce((acc, item) => acc + (item.Total || 0), 0);
      data.push({ date: dateStr, totalSpent });
      currentDate = subDays(currentDate, 1);
    }
  } else if (period === 'month') {
    for (let i = 0; i < 4; i++) {
      const endDate = format(currentDate, 'yyyy-MM-dd');
      currentDate = subDays(currentDate, 6);
      const startDate = format(currentDate, 'yyyy-MM-dd');
      const filteredSessions = sessions.filter(item => format(new Date(item.Date), 'yyyy-MM-dd') >= startDate && format(new Date(item.Date), 'yyyy-MM-dd') <= endDate);
      const filteredPartyBookings = partyBookings.filter(item => format(new Date(item.PartyDate), 'yyyy-MM-dd') >= startDate && format(new Date(item.PartyDate), 'yyyy-MM-dd') <= endDate);
      const totalSpent = filteredSessions.reduce((acc, item) => acc + (item.TotalSpent || 0), 0) +
                        filteredPartyBookings.reduce((acc, item) => acc + (item.Total || 0), 0);
      data.push({ date: `${startDate} - ${endDate}`, totalSpent });
      currentDate = subDays(currentDate, 1);
    }
  }

  return data.reverse();
}

function MyLineChart() {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('week');

  useEffect(() => {
    getData(period).then(setData);
  }, [period]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex mb-4">
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
            <Line type="monotone" dataKey="totalSpent" stroke="#ff0000" /> {/* Total spend */}
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default MyLineChart;
