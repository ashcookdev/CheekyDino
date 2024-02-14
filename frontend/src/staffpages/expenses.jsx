import { DataStore } from "aws-amplify";
import { Staff, ClockIns, StockControl, KitchenMenu, CafeOrder } from "../models";
import { useEffect, useState } from "react";
import { parse, differenceInMinutes } from "date-fns";
import Online from "./online";

export default function Wages() {


  const [totals, setTotals] = useState({
    totalHoursToday: 0,
    totalHoursWeek: 0,
    totalHoursMonth: 0,
    totalWagesToday: 0,
    totalWagesWeek: 0,
    totalWagesMonth: 0,
  });

  useEffect(() => {
    const fetchClockIns = async () => {
      const clockInData = await DataStore.query(ClockIns);

      let totalHoursToday = 0;
      let totalHoursWeek = 0;
      let totalHoursMonth = 0;
      let totalWagesToday = 0;
      let totalWagesWeek = 0;
      let totalWagesMonth = 0;

      clockInData.forEach((clockIn) => {
        const clockInTime = parse(clockIn.ClockIn, "HH:mm:ss.SSS", new Date());
        const now = new Date();
        const hours = differenceInMinutes(now, clockInTime) / 60;

        const today = new Date();
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        if(clockInTime.toDateString() === today.toDateString()) {
          totalHoursToday += hours;
          totalWagesToday += (hours * clockIn.HourlyRate);
        }

        if(clockInTime >= startOfWeek && clockInTime <= today) {
          totalHoursWeek += hours;
          totalWagesWeek += (hours * clockIn.HourlyRate);
        }

        if(clockInTime >= startOfMonth && clockInTime <= today) {
          totalHoursMonth += hours;
          totalWagesMonth += (hours * clockIn.HourlyRate);
        }
      });

      // save how many clock ins there are

    

      setTotals({
        totalHoursToday,
        totalHoursWeek,
        totalHoursMonth,
        totalWagesToday,
        totalWagesWeek,
        totalWagesMonth,
      });
    };

    fetchClockIns();
  }, []);


 


    // get price of all stock sold this week

    // get price of all stock sold this month



  return (
    <div>
      <h3 className="font-bold text-indigo-700 mt-5 mb-5">Wage Bill</h3>
      <Online />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-10">
        <div className="card bg-green-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="block text-gray-700 text-sm font-bold mb-2">Today</h2>
          <p>Total Hours Worked: {totals.totalHoursToday.toFixed(2)}</p>
          <p>Total Wages: £{totals.totalWagesToday.toFixed(2)}</p>
        </div>

        <div className="card bg-indigo-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="block text-gray-700 text-sm font-bold mb-2">This Week</h2>
          <p>Total Hours Worked: {totals.totalHoursWeek.toFixed(2)}</p>
          <p>Total Wages: £{totals.totalWagesWeek.toFixed(2)}</p>
        </div>

        <div className="card bg-purple-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="block text-gray-700 text-sm font-bold mb-2">This Month</h2>
          <p>Total Hours Worked: {totals.totalHoursMonth.toFixed(2)}</p>
          <p>Total Wages: £{totals.totalWagesMonth.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
