import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { DataStore } from 'aws-amplify';
import { StockControl } from './models';
import { motion } from 'framer-motion';

export default function StockPieChart() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function fetchStock() {
      const stockItems = await DataStore.query(StockControl);
      setStock(stockItems);
    }

    fetchStock();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-3">
      {stock.map((stockItem) => {
        const total = stockItem.Quantity || stockItem.Weight;
        const used = total - stockItem.CurrentStockLevel;
        const percentageUsed = (used / total) * 100;
        const data = [
          { name: 'Used', value: used },
          { name: 'Remaining', value: stockItem.CurrentStockLevel },
        ];
        return (
          <motion.a
            href="/stockcontrol"
            key={stockItem.Name}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-purple-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}          >
            <div className="flex-shrink-0"></div>
            <div className="min-w-0 flex-1">
              <p className="text-md font-medium text-gray-900">{stockItem.Name}</p>
              <p className="text-sm font-italic text-gray-900">Supplier: {stockItem.Supplier}</p>
              <PieChart width={200} height={200}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#a78bfa', '#d6bcfa'][index % 2]} />
                  ))}
                </Pie>
              </PieChart>
              <p className="text-sm font-medium text-gray-900">Percentage Used: {percentageUsed.toFixed(2)}%</p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
