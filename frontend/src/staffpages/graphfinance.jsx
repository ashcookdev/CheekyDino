import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

function Financials({ totalThisHour, totalToday, totalThisWeek, totalThisMonth }) {
  const [timeRange, setTimeRange] = useState('hour');
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    // Update chart data based on selected time range
    switch (timeRange) {
      case 'hour':
        setLineChartData([
          { date: '1 hour ago', total: totalThisHour },
        ]);
        break;
      case 'day':
        setLineChartData([
          { date: 'Today', total: totalToday },
        ]);
        break;
      case 'week':
        setLineChartData([
          { date: 'This week', total: totalThisWeek },
        ]);
        break;
      case 'month':
        setLineChartData([
          { date: 'This month', total: totalThisMonth },
        ]);
        break;
    }
  }, [timeRange, totalThisHour, totalToday, totalThisWeek, totalThisMonth]);

  return (
    <div className="p-4 rounded-md border border-gray-300 shadow-md">
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${
            timeRange === 'hour' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
          }`}
          onClick={() => setTimeRange('hour')}
        >
          Per Hour
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${
            timeRange === 'day' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
          }`}
          onClick={() => setTimeRange('day')}
        >
          Per Day
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${
            timeRange === 'week' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
          }`}
          onClick={() => setTimeRange('week')}
        >
          Per Week
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${
            timeRange === 'month' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
          }`}
          onClick={() => setTimeRange('month')}
        >
          Per Month
        </button>
      </div>
      <LineChart width={500} height={300} data={lineChartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default Financials;
