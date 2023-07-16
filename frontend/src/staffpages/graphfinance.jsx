import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { format } from 'date-fns';
import { Sessions, PartyBooking } from './models';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      // Get current date and time
      const now = new Date();

      // Get start of this month
      const thisMonth = new Date(now);
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      // Find all sessions
      const allSessions = await DataStore.query(Sessions);

      // Filter sessions based on time range
      const sessionsThisMonth = allSessions.filter(
        session => new Date(session.Date) >= thisMonth && new Date(session.Date) <= now
      );

      // Group sessions by date and sum the total spent
      const sessionsGroupedByDate = sessionsThisMonth.reduce((acc, session) => {
        const date = format(new Date(session.Date), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = { date, sessionsTotal: 0 };
        }
        acc[date].sessionsTotal += session.TotalSpent;
        return acc;
      }, {});

      // Find all party bookings
      const allPartyBookings = await DataStore.query(PartyBooking);

      // Filter party bookings based on time range
      const partyBookingsThisMonth = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= thisMonth && new Date(booking.PartyDate) <= now
      );

      // Group party bookings by date and sum the total spent
      const partyBookingsGroupedByDate = partyBookingsThisMonth.reduce((acc, booking) => {
        const date = format(new Date(booking.PartyDate), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = { date, partyBookingsTotal: 0 };
        }
        acc[date].partyBookingsTotal += booking.TotalSpent;
        return acc;
      }, {});

      // Combine grouped data into a single array
      const combinedData = Object.values({
        ...sessionsGroupedByDate,
        ...partyBookingsGroupedByDate,
      });

      // Set the data state variable to the combinedData array
      setData(combinedData);
    }

    getData();
  }, []);

  return (
    <div className="p-4 rounded-md border border-gray-300 shadow-md">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="date" tickFormatter={tick => format(new Date(tick), 'dd-MM-yyyy')} />
        <YAxis tickFormatter={tick => `£${tick}`} />
        <Tooltip formatter={value => `£${value}`} />
        <Line type="monotone" dataKey="sessionsTotal" stroke="#8884d8" name="Sessions Total" dot={{ fill: '#8884d8' }} />
        <Line type="monotone" dataKey="partyBookingsTotal" stroke="#82ca9d" name="Party Bookings Total" dot={{ fill: '#82ca9d' }} />
      </LineChart>
    </div>
  );
}

export default App;
