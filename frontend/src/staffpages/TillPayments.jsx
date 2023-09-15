import { DataStore, Predicates } from "aws-amplify";
import { CafeOrder, Sessions } from "./models";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const Receipt = React.forwardRef(({ order, total, table, childName }, ref) => (
  <div ref={ref}>
    {table && <div>Table: {table}</div>}
    {childName && <div>Child: {childName}</div>}
    {order.map((item) => (
      <div>
        {item.Name} £{item.Price.toFixed(2)}
      </div>
    ))}
    <div>Total: £{total.toFixed(2)}</div>
  </div>
));

export default function TillPayment({
  order,
  total,
  table,
  setOrder,
  setTotal,
  childName,
  staff
}) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amountEntered, setAmountEntered] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [prep, setPrep] = useState([]);
  const [change, setChange] = useState(0); // Add state for change


  console.log(orders);
  const navigate = useNavigate();

  const receiptRef = useRef();

  const handleConfirmClick = async () => {
    const currentTime = new Date();
    const options = {
      timeZone: "Europe/London",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      millisecond: "2-digit",
    };

    const awstime = currentTime.toLocaleTimeString("en-GB", options);

    const sessions = await DataStore.query(Sessions, Predicates.ALL);
    const session = sessions.find(
      (s) => s.Table === table && s.Arrived === true && s.LeftCenter === false
    );

    if (!session) {
      alert("Error: No customer at table");
      return;
    }

    // Update the session with the new order and total price
    await DataStore.save(
      Sessions.copyOf(session, (updated) => {
        updated.Orders += 1;
        updated.TotalSpent += total;
      })
    );
    console.log("Session updated");
    const hotItems = orders
      .filter((item) => item.Kitchen)
      .map((item) => item.Name);

    // convert prep time to string
    const prepTime = prep.toString();

    const drinkItems = orders
      .filter((item) => !item.Kitchen)
      .map((item) => item.Name);
    const kitchen = hotItems.length > 0;

    await DataStore.save(
      new CafeOrder({
        HotItems: hotItems,
        DrinkItems: drinkItems,
        CreatedTime: awstime,
        CreatedDate: new Date().toISOString().split("T")[0],
        Total: total,
        Table: table,
        Completed: !kitchen,
        Sessionid: session.id,
        Delieved: !kitchen,
        Kitchen: kitchen,
        HotOrderPrep: prepTime,
        KitchenMenuId: orders.map((item) => item.ID),
        TotalNoVAT: total / 1.2,
        StaffOrderName: staff,
      })
    );

    console.log("Order confirmed" + session.id);
    // Reset the order and total price
    setOrder([]);
    setTotal(0);
    setPaymentMethod(null);
    setAmountEntered(0);
    setIsFlashing(false);
    window.location.reload();
  };

  const handleCashClick = () => {
    setPaymentMethod("cash");
    setOrders(order);
    setAmountEntered("");
    setChange(0);
  };

  const newtotal = order.reduce((acc, item) => acc + item.Price, 0);

  const handleDenominationClick = (amount) => {
    const updatedAmount = parseFloat(amountEntered) + amount;
    setAmountEntered(updatedAmount.toString());
    const newChange = updatedAmount - total;
    setChange(newChange);
  };

  const handleNumberClick = (number) => {
    const updatedAmount = parseFloat(amountEntered + number.toString());
    setAmountEntered(updatedAmount.toString());
    const newChange = updatedAmount - total;
    setChange(newChange);
  };

  const handleDecimalClick = () => {
    if (!amountEntered.includes(".")) {
      setAmountEntered(amountEntered + ".");
    }
  };

  const handleCardClick = () => {
    setPaymentMethod("card");
    setIsFlashing(true);
    setOrders(order);
  };

  useEffect(() => {
    let totalPrepInMinutes = 0;
    order.forEach((item) => {
      const [hours, minutes] = item.Prep.split(":").map(Number);
      totalPrepInMinutes += hours * 60 + minutes;
    });
    const totalHours = Math.floor(totalPrepInMinutes / 60);
    const totalMinutes = totalPrepInMinutes % 60;
    const totalPrep = `${totalHours}:${totalMinutes
      .toString()
      .padStart(2, "0")}`;
    setPrep(totalPrep);
  }, [order]);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="border-r border-gray-300 pr-4">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white p-2 rounded w-full"
        >
          Cancel
        </motion.button>
        <div className="mt-4">
          <ReactToPrint
            trigger={() => (
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                className="bg-purple-500 text-white p-2 rounded w-full mt-5 mb-5"
              >
                Print
              </motion.button>
            )}
            content={() => receiptRef.current}
          />
          <div style={{ display: "none" }}>
            <Receipt
              ref={receiptRef}
              order={order}
              total={total}
              table={table}
              childName={childName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className={`${
              paymentMethod === "cash" ? "bg-green-700" : "bg-green-500"
            } text-white p-2 rounded`}
            onClick={handleCashClick}
          >
            Cash
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            className={`${
              paymentMethod === "card" ? "bg-blue-700" : "bg-blue-500"
            } text-white p-2 rounded`}
            onClick={handleCardClick}
          >
            Card
          </motion.button>
        </div>
        {paymentMethod === "cash" && (
          <div className="flex flex-col gap-2 mt-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              className="bg-purple-200 p-2 rounded"
              onClick={() => handleDenominationClick(5)}
            >
              £5
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              className="bg-cyan-200 p-2 rounded"
              onClick={() => handleDenominationClick(10)}
            >
              £10
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              className="bg-blue-200 p-2 rounded"
              onClick={() => handleDenominationClick(20)}
            >
              £20
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              className="bg-gray-200 p-2 rounded"
              onClick={() => handleDenominationClick(50)}
            >
              £50
            </motion.button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2 border-r border-gray-300 pr-4">
        
        {[...Array(9)].map((_, i) => (
          <motion.button
            key={i + 1}
            variants={buttonVariants}
            whileHover="hover"
            className="bg-blue-200 p-2 rounded"
            onClick={() => handleNumberClick(i + 1)}
          >
            {i + 1}
          </motion.button>
        ))}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          className="bg-yellow-200 p-2 rounded"
          onClick={() => handleNumberClick(0)}
        >
          0
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          className="bg-yellow-200 p-2 rounded"
          onClick={handleDecimalClick}
        >
          .
        </motion.button>
       
      </div>
      <div>
        <ul>
          {table && <li>Table: {table}</li>}
          {childName && <li>Child: {childName}</li>}
          {order.map((item, index) => (
            <li key={index} className="mb-2">
              {item.Name} £{item.Price.toFixed(2)}
            </li>
          ))}
        </ul>
        {order.map((item, index) => (
          <li key={index} className="mb-2">
            {item.Prep}
          </li>
        ))}
        <div>
          <div className="text-right pr-4 mt-4 text-lg font-bold">
            Total: £{total.toFixed(2)}
          </div>
          <div>
          <input
            type="text"
            placeholder="Enter Amount"
            value={amountEntered}
            onChange={(e) => {
              const input = e.target.value.replace(/[^0-9.]/g, ""); // Allow only numeric and decimal point
              setAmountEntered(input);
              const newChange = parseFloat(input) - total;
              setChange(newChange);
            }}
            className="bg-purple-200 p-2 rounded border border-gray-300 item-center"
          />
        </div>
          <div className="text-right pr-4 mt-2 text-lg font-bold">
            Change: £{change.toFixed(2)}
          </div>
        </div>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={handleConfirmClick}
          className="bg-green-500 text-white p-2 rounded w-full mt-4"
        >
          Confirm
        </motion.button>
      </div>
    </div>
  );
}