import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { format } from 'date-fns';
import { Sessions } from '../models';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Query the DataStore and process the data
      const sessions = await DataStore.query(Sessions);

      const filteredSessions = sessions.filter(
        session => session.Arrived === true
        //   session.Arrived === true &&
        //   session.Date &&
        //   new Date(session.Date) >= oneWeekAgo
      );

      console.log(filteredSessions);
      // Group sessions by date and sum the number of children
      const groupedData = filteredSessions.reduce((acc, session) => {
        const date = format(new Date(session.Date), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = { date, children: 0 };
        }
        acc[date].children += session.Children;
        return acc;
      }, {});

      // Convert groupedData object to an array
// Convert groupedData object to an array
let combinedData = Object.values(groupedData);

// Sort combinedData by date
combinedData = combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

// Set the data state variable to the sorted combinedData array
setData(combinedData);

      // Set the data state variable to the combinedData array
      console.log(combinedData);
    }

    fetchData();
  }, []);

  return (
    <div className="p-4 rounded-md border border-gray-300 shadow-md">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="date" tickFormatter={tick => format(new Date(tick), 'dd-MM-yy')} />
        <YAxis tickFormatter={tick => `${tick}`} />
        <Tooltip />
        <Line type="monotone" dataKey="children" stroke="#8884d8" dot={{ fill: '#8884d8' }} />
      </LineChart>
    </div>
  );
}

export default App;
