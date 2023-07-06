import { DataStore } from 'aws-amplify';
import { CafeOrder, Sessions, PartyBooking } from './models';
import React, { useState, useEffect } from 'react';
import { formatISO } from 'date-fns';

export default function Financials() {
    const [cafeOrders, setCafeOrders] = useState({ hour: [], day: [], week: [], month: [] });
    const [sessions, setSessions] = useState({ hour: [], day: [], week: [], month: [] });
    const [partyBookings, setPartyBookings] = useState({ hour: [], day: [], week: [], month: [] });
    

  useEffect(() => {
    async function getData() {
      // Get current date and time
      const now = new Date();

      // Get one hour ago
      const oneHourAgo = new Date(now);
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      // Get start of today
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);

      // Get start of this week (assuming Sunday is the first day of the week)
      const thisWeek = new Date(now);
      thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay());
      thisWeek.setHours(0, 0, 0, 0);

      // Get start of this month
      const thisMonth = new Date(now);
      thisMonth.setDate(1);
      thisMonth.setHours(0, 0, 0, 0);

      // Find all cafe orders
      const allCafeOrders = await DataStore.query(CafeOrder);

      // Filter cafe orders based on time range
      const cafeOrdersThisHour = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= oneHourAgo && new Date(order.CreatedDate) <= now
      );
      const cafeOrdersToday = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= today && new Date(order.CreatedDate) <= now
      );
      const cafeOrdersThisWeek = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= thisWeek && new Date(order.CreatedDate) <= now
      );
      const cafeOrdersThisMonth = allCafeOrders.filter(
        order => new Date(order.CreatedDate) >= thisMonth && new Date(order.CreatedDate) <= now
      );

      setCafeOrders({
        hour: cafeOrdersThisHour,
        day: cafeOrdersToday,
        week: cafeOrdersThisWeek,
        month: cafeOrdersThisMonth,
      });

      // Find all sessions
      const allSessions = await DataStore.query(Sessions);

      // Filter sessions based on time range
      const sessionsThisHour = allSessions.filter(
        session => new Date(session.Date) >= oneHourAgo && new Date(session.Date) <= now
      );
      const sessionsToday = allSessions.filter(
        session => new Date(session.Date) >= today && new Date(session.Date) <= now
      );
      const sessionsThisWeek = allSessions.filter(
        session => new Date(session.Date) >= thisWeek && new Date(session.Date) <= now
      );
      const sessionsThisMonth = allSessions.filter(
        session => new Date(session.Date) >= thisMonth && new Date(session.Date) <= now
      );

      setSessions({
        hour: sessionsThisHour,
        day: sessionsToday,
        week: sessionsThisWeek,
        month: sessionsThisMonth,
      });

      // Find all party bookings
      const allPartyBookings = await DataStore.query(PartyBooking);

      // Filter party bookings based on time range
      const partyBookingsThisHour = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= oneHourAgo && new Date(booking.PartyDate) <= now
      );
      const partyBookingsToday = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= today && new Date(booking.PartyDate) <= now
      );

        const partyBookingsThisWeek = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= thisWeek && new Date(booking.PartyDate) <= now
        );
        const partyBookingsThisMonth = allPartyBookings.filter(
        booking => new Date(booking.PartyDate) >= thisMonth && new Date(booking.PartyDate) <= now
        );
         setPartyBookings
        ({
        hour: partyBookingsThisHour,
        day: partyBookingsToday,
        week: partyBookingsThisWeek,
        month: partyBookingsThisMonth,
        });
    }

    getData();
    }, []);

    function downloadData() {
        // Create CSV data
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Time Range,Cafe Orders,Sessions,Party Bookings\n';
        csvContent += `Past Hour,£${cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
        csvContent += `Current Day,£${cafeOrders.day.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.day.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.day.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
        csvContent += `This Week,£${cafeOrders.week.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.week.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.week.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
        csvContent += `This Month,£${cafeOrders.month.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.month.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.month.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;  
        csvContent += `Total,£${cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0).toFixed(2)},£${sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)},£${partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}\n`;
        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `financials-${formatISO(new Date())}.csv`);
        document.body.appendChild(link);
        link.click();
    }

    return (
        <>
<table className="table-auto border border-collapse w-full text-left">
  <thead>
    <tr className="bg-gray-100">
      <th className="border px-4 py-2">Time Range</th>
      <th className="border px-4 py-2">Cafe Orders</th>
      <th className="border px-4 py-2">Sessions</th>
      <th className="border px-4 py-2">Party Bookings</th>
      <th className="border px-4 py-2">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border px-4 py-2">Past Hour</td>
      <td className="border px-4 py-2">£{cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{(cafeOrders.hour.reduce((acc, order) => acc + order.Total, 0) +
        sessions.hour.reduce((acc, session) => acc + session.TotalSpent, 0) +
        partyBookings.hour.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
      </td>
    </tr>
    <tr>
      <td className="border px-4 py-2">Current Day</td>
      <td className="border px-4 py-2">£{cafeOrders.day.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{sessions.day.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{partyBookings.day.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{(cafeOrders.day.reduce((acc, order) => acc + order.Total, 0) +
        sessions.day.reduce((acc, session) => acc + session.TotalSpent, 0) +
        partyBookings.day.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
      </td>
    </tr>
    <tr>
      <td className="border px-4 py-2">This Week</td>
      <td className="border px-4 py-2">£{cafeOrders.week.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{sessions.week.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{partyBookings.week.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
      <td className="border px-4 py-2">£{(cafeOrders.week.reduce((acc, order) => acc + order.Total, 0) +
        sessions.week.reduce((acc, session) => acc + session.TotalSpent, 0) +
        partyBookings.week.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
        </td>
    </tr>
    <tr>
        <td className="border px-4 py-2">This Month</td>
        <td className="border px-4 py-2">£{cafeOrders.month.reduce((acc, order) => acc + order.Total, 0).toFixed(2)}</td>
        <td className="border px-4 py-2">£{sessions.month.reduce((acc, session) => acc + session.TotalSpent, 0).toFixed(2)}</td>
        <td className="border px-4 py-2">£{partyBookings.month.reduce((acc, booking) => acc + booking.Total, 0).toFixed(2)}</td>
        <td className="border px-4 py-2">£{(cafeOrders.month.reduce((acc, order) => acc + order.Total, 0) +
        sessions.month.reduce((acc, session) => acc + session.TotalSpent, 0) +
        partyBookings.month.reduce((acc, booking) => acc + booking.Total, 0)).toFixed(2)}
        </td>
    </tr>
    
    </tbody>
</table>

      
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={downloadData}
          >
            Download Data
          </button>
        </>
      );
    }      

    