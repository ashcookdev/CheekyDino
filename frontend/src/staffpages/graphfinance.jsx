import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions, PartyBooking } from './models';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import MyPieChart from './piechart';

async function getData(period) {
  const sessions = await DataStore.query(Sessions);
  const partyBookings = await DataStore.query(PartyBooking);
  const data = [...sessions, ...partyBookings].reduce((acc, item) => {
    let date = item.Date || item.PartyDate;
    if (!date) {
      return acc;
    }
    if (period === 'week') {
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
  return Object.values(data).map((item) => ({
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
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="5 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalSpent" stroke="#8884d8" />
        </LineChart>
        <MyPieChart data={data} />

      </div>
    );
  }
 
export default MyLineChart;