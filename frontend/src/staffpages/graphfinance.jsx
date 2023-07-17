import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify'; // import DataStore from your data store library
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import {
  startOfHour,
  subHours,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear
} from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Sessions, PartyBooking } from './models'; // import the model


const MyComponent = () => {
  const [totals, setTotals] = useState({});
  const [timeRange, setTimeRange] = useState('hour');
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    // Define time range variables
    const timeZone = 'Europe/London';
    const now = new Date();
    const zonedNow = utcToZonedTime(now, timeZone);
    const oneHourAgo = zonedTimeToUtc(subHours(startOfHour(zonedNow), 1), timeZone);
    const today = zonedTimeToUtc(startOfDay(zonedNow), timeZone);
    const thisWeek = zonedTimeToUtc(startOfWeek(zonedNow), timeZone);
    const thisMonth = zonedTimeToUtc(startOfMonth(zonedNow), timeZone);
    const thisYear = zonedTimeToUtc(startOfYear(zonedNow), timeZone);

    async function getData() {
      try {
        const allSessions = await DataStore.query(Sessions);
        const allPartyBookings = await DataStore.query(PartyBooking);

        // Filter sessions and party bookings based on time range
        const filterData = (data, dateKey) => ({
          hour: data.filter(item => new Date(item[dateKey]) >= oneHourAgo && new Date(item[dateKey]) <= now),
          day: data.filter(item => new Date(item[dateKey]) >= today && new Date(item[dateKey]) <= now),
          week: data.filter(item => new Date(item[dateKey]) >= thisWeek && new Date(item[dateKey]) <= now),
          month: data.filter(item => new Date(item[dateKey]) >= thisMonth && new Date(item[dateKey]) <= now),
          year: data.filter(item => new Date(item[dateKey]) >= thisYear && new Date(item[dateKey]) <= now)
        });

        const sessions = filterData(allSessions, 'Date');
        const partyBookings = filterData(allPartyBookings, 'PartyDate');

        // Calculate totals for sessions and party bookings
        const calculateTotals = (data, totalKey) => ({
          hour: data.hour.reduce((total, item) => total + item[totalKey], 0),
          day: data.day.reduce((total, item) => total + item[totalKey], 0),
          week: data.week.reduce((total, item) => total + item[totalKey], 0),
          month: data.month.reduce((total, item) => total + item[totalKey], 0),
          year: data.year.reduce((total, item) => total + item[totalKey], 0)
        });

        const totalSessions = calculateTotals(sessions, 'TotalSpent');
        const totalPartyBookings = calculateTotals(partyBookings, 'Total');

        // Combine session and party booking totals
        const totals = {
          hour: (totalSessions.hour || 0) + (totalPartyBookings.hour || 0),
          day: (totalSessions.day || 0) + (totalPartyBookings.day || 0),
          week: (totalSessions.week || 0) + (totalPartyBookings.week || 0),
          month: (totalSessions.month || 0) + (totalPartyBookings.month || 0),
          year: (totalSessions.year || 0) + (totalPartyBookings.year || 0)
        };

        // Update state with calculated totals
        setTotals(totals);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }

    getData();
  }, []);

  
const data = Object.entries(totals).map(([key, value]) => ({
  date: key,
  total: value
}));


  // Calculate line chart data


  return (
    <div className="p-4 rounded-md border border-gray-300 shadow-md">
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${timeRange === 'hour' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
          onClick={() => setTimeRange('hour')}
        >
          Per Hour
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${timeRange === 'day' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
          onClick={() => setTimeRange('day')}
        >
          Per Day
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${timeRange === 'week' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
          onClick={() => setTimeRange('week')}
        >
          Per Week
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${timeRange === 'month' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
          onClick={() => setTimeRange('month')}
        >
          Per Month
        </button>
        <button
          className={`px-4 py-2 rounded-md focus:outline-none ${timeRange === 'year' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
            }`}
          onClick={() => setTimeRange('year')}
        >
          Per Year
        </button>
      </div>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default MyComponent;
