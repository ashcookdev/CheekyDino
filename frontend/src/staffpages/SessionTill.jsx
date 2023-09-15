import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

const Receipt = React.forwardRef(({ order, total, table, childName }, ref) => (
  <div ref={ref} className="p-4 border rounded">
    <h1 className="text-2xl font-bold mb-2">Cheeky Dino</h1>
    {table && <div>Table: {table}</div>}
    {childName && <div>Child: {childName}</div>}
    <div>{order}</div>
    <div className="border-t mt-2 pt-2">
      Total: £{total.toFixed(2)}
    </div>
    <div className="mt-4 text-center">
      <QRCode value="https://yourwebsite.com/order" size={128} />
      <p className="text-sm mt-2">Order from your table</p>
      <p className="text-sm">Log in using the QR code</p>
    </div>
  </div>
));

const TillPayment = ({ order, total: initialTotal, table, ChildName }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amountEntered, setAmountEntered] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [total, setTotal] = useState(initialTotal);
  const [changeGiven, setChangeGiven] = useState(0); // Change Given

  const receiptRef = useRef();

  const handleConfirmClick = async () => {
    console.log("Order confirmed");

    // Print the receipt

    // Reset the order and total price
    window.location.reload();
  };

  const handleCashClick = () => {
    setPaymentMethod("cash");
    setAmountEntered(0);
    setChangeGiven(0); // Reset change given
  };

  const handleDenominationClick = (amount) => {
    const newAmountEntered = amountEntered + amount;
    setAmountEntered(newAmountEntered);

    const newChangeGiven = newAmountEntered - total;
    setChangeGiven(newChangeGiven > 0 ? newChangeGiven : 0); // Change given should not be negative

    // Print the receipt
    if (receiptRef.current) {
      receiptRef.current.print();
    }
  };

  const handleNumberClick = (number) => {
    setAmountEntered((amountEntered * 10 + number) / 100);
  };

  const handleCardClick = () => {
    setPaymentMethod("card");
    setIsFlashing(true);
    setChangeGiven(0); // Reset change given
  };

  const handleTillDrawer = () => {
    fetch("/open-till")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          <motion.button
            onClick={handleTillDrawer}
            className="bg-gray-200 p-2 rounded w-full"
          >
            Open Till
          </motion.button>

          <ReactToPrint
            trigger={() => (
              <motion.button
                className="bg-purple-500 text-white p-2 rounded w-full mt-5 mb-5"
                variants={buttonVariants}
                whileHover="hover"
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
              childName={ChildName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            className={`${
              paymentMethod === "cash" ? "bg-green-700" : "bg-green-500"
            } text-white p-2 rounded`}
            onClick={handleCashClick}
            variants={buttonVariants}
            whileHover="hover"
          >
            Cash
          </motion.button>
          <motion.button
            className={`${
              paymentMethod === "card" ? "bg-blue-700" : "bg-blue-500"
            } text-white p-2 rounded`}
            onClick={handleCardClick}
            variants={buttonVariants}
            whileHover="hover"
          >
            Card
          </motion.button>
        </div>
        {paymentMethod === "cash" && (
          <div className="flex flex-col gap-2 mt-4">
            <motion.button
              className="bg-gray-200 p-2 rounded"
              onClick={() => handleDenominationClick(5)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £5
            </motion.button>
            <motion.button
              className="bg-gray-200 p-2 rounded"
              onClick={() => handleDenominationClick(10)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £10
            </motion.button>
            <motion.button
              className="bg-gray-200 p-2 rounded"
              onClick={() => handleDenominationClick(20)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £20
            </motion.button>
            <motion.button
              className="bg-gray-200 p-2 rounded"
              onClick={() => handleDenominationClick(50)}
              variants={buttonVariants}
              whileHover="hover"
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
            className="bg-gray-200 p-2 rounded"
            onClick={() => handleNumberClick(i + 1)}
            variants={buttonVariants}
            whileHover="hover"
          >
            {i + 1}
          </motion.button>
        ))}
        <motion.button
          className="bg-gray-200 p-2 rounded"
          onClick={() => handleNumberClick(0)}
          variants={buttonVariants}
          whileHover="hover"
        >
          0
        </motion.button>
      </div>
      <div>
        <ul>
          <li>Table: {table}</li>
          <li>Child: {ChildName}</li>
          <li>Total: £{total.toFixed(2)}</li>
          <li>Change Given: £{changeGiven.toFixed(2)}</li>
        </ul>
        <motion.button
          onClick={handleConfirmClick}
          className="bg-green-500 text-white p-2 rounded w-full"
          variants={buttonVariants}
          whileHover="hover"
        >
          Confirm
        </motion.button>
      </div>
    </div>
  );
};

export default TillPayment;
