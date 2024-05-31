import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Sessions, Messages } from "../models";
import { useLocation } from "react-router-dom";


const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;





const Prebooktill = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amountEntered, setAmountEntered] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [changeGiven, setChangeGiven] = useState(0);
  const [input, setInput] = useState("");
  const [cardOptions, setCardOptions] = useState(false);
  const [done, setDone] = useState(false);
  const [discount, setDiscount] = useState(0); // new state for discount percentage

  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;

  const order = state.order;
    const table = state.table;
    const ChildName = state.ChildName;
    const initialTotal = state.total;

    const [total, setTotal] = useState(state ? state.total : 0);


    console.log(state);

    useEffect(() => {
      // Check if ipcRenderer is available before using it
      if (ipcRenderer) {
        ipcRenderer.send('some-electron-event', { data: 'your-data' });
  
        ipcRenderer.on('electron-response', (event, responseData) => {
          console.log('Received response from Electron:', responseData);
        });
      }
    }, []); // Empty dependency array ensures the effect runs once after the initial render
  



  const handleConfirmClick = async () => {
    ipcRenderer.send("entrance");

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
       
          updated.TotalSpent = total;
    
      })
    );
    console.log(updateSession);

    const message = new Messages({
      content: `A New Customer called ${ChildName} has Arrived sitting at table ${table} at ${timeString}`,
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

    if (ipcRenderer) {
      ipcRenderer.send('open-drawer', { amount });
    } else {
      console.error('ipcRenderer is not available.');
    }
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
    if (ipcRenderer) {
      ipcRenderer.send('open-drawer', { initialTotal });
    } else {
      console.error('ipcRenderer is not available.');
    }
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
          <div className="flex flex-col gap-2 mt-4">
            <motion.button
              onClick={() => {
                const data = {
                  product: '2 Hour Play Session',
                  name: ChildName,
                  method: paymentMethod,
                  table: table,
                  change: changeGiven.toFixed(2),
                  price: total.toFixed(2),
                };
              
                ipcRenderer.send('print-receipt', { data });
              }}
              className="bg-purple-500 text-white p-2 rounded w-full mt-5 mb-5"
              variants={buttonVariants}
              whileHover="hover"
            >
              Print/Give Change
            </motion.button>
            <motion.button
              onClick={() => {

                const data = {
                  product: '2 Hour Play Session',
                  name: ChildName,
                  method: paymentMethod,
                  table: table,
                  change: changeGiven.toFixed(2),
                  price: total.toFixed(2),
                };
              



                ipcRenderer.send('print-receipt', { data });
              }}
              className="bg-purple-500 text-white p-2 rounded w-full mt-5 mb-5"
              variants={buttonVariants}
              whileHover="hover"
            >
              Print
            </motion.button>
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


export default Prebooktill;
