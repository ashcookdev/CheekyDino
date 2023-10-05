import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Sessions, Messages } from "./models";

const Receipt = React.forwardRef(
  ({ order, total, table, childName, changeGiven }, ref) => {
    // Calculate the amount paid
    const amountPaid = total + changeGiven;

    return (
      <div ref={ref} className="p-4 border rounded text-left">
  <h1 className="text-2xl font-bold mb-2">Cheeky Dino</h1>
  <div className="mt-4">
    <img
      src="./dino-logo.png"
      alt="Cheeky Dino logo"
      width="128"
      height="128"
    />
    <p className="text-sm mt-2 text-color-black mb-5">Great indoor play centre in Maidstone</p>
    {table && <div className="text-color-black">Table: {table}</div>}
    {childName && <div className="text-color-black"> Name: {childName}</div>}
    <div className="text-color-black">{order}</div>
    <div className="border-t mt-2 pt-2">
      <p className="text-color-black">Total: £{total.toFixed(2)}</p>
    </div>
    <div className="border-t mt-2 pt-2 text-color-black">
      <p className="text-color-black">Change Given: £{changeGiven.toFixed(2)}</p>
    </div>
    <div className="border-t mt-2 pt-2">
      <p className="text-color-black">Amount Paid: £{amountPaid.toFixed(2)}</p>
    </div>
    <div className="border-t mt-2 pt-2 mb-5"></div>
    <QRCode value="https://cheekydino.co.uk" size={128} />
    <p className="text-sm mt-2 text-color-black">https://cheekydino.co.uk</p>
    <p className="text-sm mt-2 text-color-black">01622 670055</p>
  </div>
</div>

    );
  }
);



const TillPayment = ({ order, total: initialTotal, table, ChildName, route }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amountEntered, setAmountEntered] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [total, setTotal] = useState(initialTotal);
  const [changeGiven, setChangeGiven] = useState(0);
  const [input, setInput] = useState("");
  const [cardOptions, setCardOptions] = useState(false);
  const [done, setDone] = useState(false);
  const [discount, setDiscount] = useState(0); // new state for discount percentage

  const navigate = useNavigate();

  const receiptRef = useRef();

  const handleConfirmClick = async () => {
    console.log("Order confirmed");
    const now = new Date();
const timeString = now.toISOString().split('T')[1];

    // Query the database to update the TotalSpent field
    const session = await DataStore.query(Sessions);
    const filter = session.filter(
      (session) =>
        session.Table === table &&
        session.Name === ChildName &&
        session.Arrived === true &&
        session.LeftCenter === false
    );

    // Update the TotalSpent field
    console.log(filter);
    const updateSession = await DataStore.save(
      Sessions.copyOf(filter[0], (updated) => {
        if (route === true) {
          updated.TotalSpent += total;
        } else {
          updated.TotalSpent = total;
        }
      })
    );
    console.log(updateSession);

    const message = new Messages({
      content: `A New Customer called ${ChildName} has Arrived sitting at table ${table} at ${timeString.split(':').slice(0, 2).join(':')}`,
      createdAt: timeString,
      email: 'Front Desk',
      group: ['Developer',
      'Staff',
      'PartyHosts',
      'Admin',
      'SuperUser',
      'TeamLeader',
      'Kitchen',
      'FrontDesk',
      'Cafe',],
      orderID: null,
      sessionID: filter.id,
      
    });
  
    // Save the message to the database
    const savedMessage = await DataStore.save(message);
    console.log(savedMessage);

    setDone(true);
    setTotal(0);
    navigate("/till");
  };

  const handleCashClick = () => {
    setPaymentMethod("cash");
    setAmountEntered(0);
    setChangeGiven(0);
  };

  const handleDenominationClick = (amount) => {
    // Calculate the new amount entered by adding the denomination
    const updatedAmount = parseFloat(amountEntered || 0) + amount;
    setAmountEntered(updatedAmount);
    // Calculate the change
    const newChange = updatedAmount - total;
    setChangeGiven(newChange > 0 ? newChange : 0);
  };

  const handleDecimalClick = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
    }
  };

  const handleNumberClick = (number) => {
    const updatedInput = input + number.toString();
    setInput(updatedInput);
    const updatedAmount = parseFloat(updatedInput);
    setAmountEntered(updatedAmount);
    const newChange = updatedAmount - total;
    setChangeGiven(newChange > 0 ? newChange : 0);
  };

  const handleCardClick = () => {
    setPaymentMethod("card");
    setCardOptions(true);
    setIsFlashing(true);
    setChangeGiven(0);
  };

  const handleDiscountClick = () => {
    // Display input field for password
    const password = prompt("Please enter your password to apply discount:");
    // Verify password
    if (password === "cheekydino") {
      // Set discount state to true
      setDiscount(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };
  const handleDiscountApply = (percentage) => {
    const discountAmount = initialTotal * (percentage / 100);
    setTotal(initialTotal - discountAmount);
    setDiscount(percentage);
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleGiveChange = (receiptRef) => {
    // Print the receipt
    if (receiptRef.current) {
      receiptRef.current.print();
    }
    setChangeGiven(0); // Reset the change given
  };

  if (done === true) {
    navigate('/till');
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="border-r border-gray-300 pr-4 mb-5">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white p-2 rounded w-full"
        >
          Cancel
        </motion.button>
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
          <motion.button
            className={`${
              paymentMethod === "card" ? "bg-blue-700" : "bg-blue-500"
            } text-white p-2 rounded`}
            onClick={handleDiscountClick}
            variants={buttonVariants}
            whileHover="hover"
          >
            Apply Discount
          </motion.button>
            <div>
              {discount ? (
                <div className="flex flex-col gap-2 mt-4">
                  <motion.button
                    className="bg-yellow-200 p-2 rounded"
                    onClick={() => handleDiscountApply(10)}
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    10% Discount
                  </motion.button>
                  <motion.button
                    className="bg-yellow-300 p-2 rounded"
                    onClick={() => handleDiscountApply(20)}
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    20% Discount
                  </motion.button>
                  <motion.button
                    className="bg-yellow-400 p-2 rounded"
                    onClick={() => handleDiscountApply(50)}
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    50% Discount
                  </motion.button>
                </div>
              
              ) : null}
            </div>
          
        </div>
        {paymentMethod === "card" && (
          <div className="flex flex-col gap-2 mt-4">
            <motion.button
              className="bg-blue-200 p-2 rounded"
              onClick={() => handleDenominationClick(5)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £5
            </motion.button>
            <motion.button
              className="bg-blue-300 p-2 rounded"
              onClick={() => handleDenominationClick(10)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £10
            </motion.button>
            <motion.button
              className="bg-blue-400 p-2 rounded"
              onClick={() => handleDenominationClick(20)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £20
            </motion.button>
            <motion.button
              className="bg-blue-500 p-2 rounded"
              onClick={() => handleDenominationClick(50)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £50
            </motion.button>
            <motion.button
              className="bg-blue-500 p-2 rounded"
              onClick={() => handleCardClick()}
              variants={buttonVariants}
              whileHover="hover"
            >
              Full Amount
            </motion.button>
          </div>
        )}

        {paymentMethod === "cash" && (
          <div className="flex flex-col gap-2 mt-4">
            <motion.button
              className="bg-cyan-200 p-2 rounded"
              onClick={() => handleDenominationClick(5)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £5
            </motion.button>
            <motion.button
              className="bg-cyan-300 p-2 rounded"
              onClick={() => handleDenominationClick(10)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £10
            </motion.button>
            <motion.button
              className="bg-cyan-400 p-2 rounded"
              onClick={() => handleDenominationClick(20)}
              variants={buttonVariants}
              whileHover="hover"
            >
              £20
            </motion.button>
            <motion.button
              className="bg-cyan-500 p-2 rounded"
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
            className="bg-purple-200 p-2 rounded"
            onClick={() => handleNumberClick(i + 1)}
            variants={buttonVariants}
            whileHover="hover"
          >
            {i + 1}
          </motion.button>
        ))}
        <motion.button
          className="bg-blue-200 p-2 rounded"
          onClick={() => handleNumberClick(0)}
          variants={buttonVariants}
          whileHover="hover"
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
          <li className="font-bold">Table: {table}</li>
          {route === true ? (
            <li className="font-bold">Adding to Booking on Table: {table}</li>
          ) : null}
          <li className="font-bold">Child: {ChildName}</li>
          <li className="font-bold">Total: £{total.toFixed(2)}</li>
          <li className="font-bold">Discount: {discount}%</li>
          <li className="font-bold">Change Given: £{changeGiven.toFixed(2)}</li>
          <li className="font-bold">Amount Entered: £{amountEntered.toFixed(2)}</li>
          
        </ul>

        <div>
          <input
            type="text"
            placeholder="Enter Amount"
            value={input}
            onChange={(e) => {
              const input = e.target.value.replace(/[^0-9.]/g, "");
              setInput(input);
              const newChange = parseFloat(input) - total;
              setChangeGiven(newChange > 0 ? newChange : 0);
            }}
            className="bg-purple-200 p-2 rounded border border-gray-300 item-center"
          />
          <div className="flex flex-col gap-2 mt-4">
            <ReactToPrint
              trigger={() => (
                <motion.button
                  className="bg-purple-500 text-white p-2 rounded w-full mt-5 mb-5"
                  variants={buttonVariants}
                  whileHover="hover"
                >
                  Print/Give Change
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
                changeGiven={changeGiven}
              />
            </div>
          </div>
        </div>
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
