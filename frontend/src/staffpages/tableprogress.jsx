import React, { useState, useEffect } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { CafeOrder } from "./models";

export default function TableProgress({ sessionid }) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchOrders();
    const subscription = DataStore.observe(CafeOrder).subscribe(() =>
      fetchOrders()
    );
    return () => subscription.unsubscribe();
  }, []);

  async function fetchOrders() {
    const allOrders = await DataStore.query(
      CafeOrder,
      Predicates.ALL,
      {
        filter: (c) => c.sessionsID("eq", sessionid),
        sort: (s) => s.CreatedTime("asc"),
      }
    );
    const orders = allOrders.filter((order) => !order.Delivered);
    setOrders(orders);

    // Calculate the total amount spent for this table
    const totalAmount = orders.reduce((acc, order) => acc + order.Total, 0);
    setTotal(totalAmount);
  }

  // Calculate the progress of the orders
  const progress = orders.reduce((acc, order) => {
    if (order.Delivered) {
      return 0;
    } else if (order.Completed) {
      return 0.75;
    } else if (order.Preparing) {
      return 0.375;
    } else {
      return acc;
    }
  }, 0);

  let statusText = "Preparing Cafe Orders...";
  if (progress === 0) {
    statusText = "No Orders";
  } else if (progress === 0.375) {
    statusText = "Preparing Cafe Orders...";
  } else if (progress === 0.75) {
    statusText = "Delivering to Table";
  }

  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <p className="text-sm font-medium text-gray-900">{statusText}</p>
      <div className="mt-6" aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-indigo-600"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
          <div className="text-indigo-600">Order Taken</div>
          <div className="text-center text-indigo-600">Preparation</div>
          <div className="text-center">Completed</div>
        </div>
      </div>
      {/* Display the details of each order */}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h5>Table: {order.Table}</h5>
            <p>Drink Items: {order.DrinkItems ? order.DrinkItems.join(", ") : "None"}</p>
            <p>Hot Items: {order.HotItems ? order.HotItems.join(", ") : "None"}</p>
          </li>
        ))}
      </ul>

      {/* Display the total amount spent for this table */}
      <p>Total: {total}</p>
    </div>
  );
}
