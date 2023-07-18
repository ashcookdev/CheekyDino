import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

function MyPieChart({ data }) {
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="totalSpent"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
}
export default MyPieChart;