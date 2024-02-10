import { DataStore, Predicates } from "aws-amplify";
import { CafeOrder, Sessions } from "../models";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import KitchenLoader from "./kitchenloader";



const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;


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
  const [isChangeGiven, setIsChangeGiven] = useState(false); // Flag to track if change is given
  const [discount, setDiscount] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Check if ipcRenderer is available before using it
    if (ipcRenderer) {
      ipcRenderer.send('some-electron-event', { data: 'your-data' });

      ipcRenderer.on('electron-response', (event, responseData) => {
        console.log('Received response from Electron:', responseData);
      });
    }
  }, []); // Empty dependency array ensures the effect runs once after the initial render






  console.log(orders);

  const receiptRef = useRef();
  const navigate = useNavigate();




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

    setLoading(true);

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
        KitchenMenuId: orders.map((item) => item.id),
        TotalNoVAT: total / 1.2,
        StaffOrderName: staff,
        sessionsID: session.id,
        SessionEmail: session.Email,
        Notes: comment,
      })
      ).then(() => {
        console.log('Order confirmed' + session.id);
        setTimeout(() => {
 setLoading(false);  // Hide the loading spinner.
      window.location.reload();        }, 3000);
      }).catch((error) => {
        console.error('Error saving data:', error);
      });

     
  };

  const handleCashClick = () => {
    setPaymentMethod("cash");
    setOrders(order);
    setAmountEntered("");
    setChange(0);
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

  const initialTotal = order.reduce((acc, item) => acc + item.Price, 0);


  const newtotal = order.reduce((acc, item) => acc + item.Price, 0);

  const handleDenominationClick = (amount) => {
    const updatedAmount = parseFloat(amountEntered || 0) + amount;
    setAmountEntered(updatedAmount.toString());
    const newChange = updatedAmount - total;
    setChange(newChange);
    setIsFlashing(true)
    if (ipcRenderer ) {
      ipcRenderer.send('cafe-drawer', {orders, newtotal, amountEntered, change});

      ipcRenderer.on('electron-response', (event, responseData) => {
        console.log('Received response from Electron:', responseData);
      });
      
    }


    
  };
  

  const handleNumberClick = (number) => {
    const updatedAmount = parseFloat(amountEntered + number.toString());
    setAmountEntered(updatedAmount.toString());
    const newChange = updatedAmount - total;
    setChange(newChange);
    setIsFlashing(true)

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

  const handleGiveChange = () => {
    // Print the receipt
    if (receiptRef.current) {
      receiptRef.current.print();
    }
    setIsChangeGiven(true);
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

      <div className="border-r border-gray-300 pr-4 mb-3 mt-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white p-2 rounded w-full"
        >
          Cancel
        </motion.button>
       

        <div className="flex flex-col gap-2 mt-3">
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
          {paymentMethod === "card" && (
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
        <div>
        <div>
      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
Order Notes      </label>
      <div className="mt-2">
        <textarea onChange={(e) => setComment(e.target.value)}
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={'No Notes'}
        />
      </div>
    </div>

        </div>
       
      </div>
      <div>
      {loading? <KitchenLoader /> : null}
        <h2 className="text-lg font-bold">Order Summary</h2>

        <ul>
          {table && <li>Table: {table}</li>}
          {childName && <li>Name: {childName}</li>}
          {order.map((item, index) => (
            <li key={index} className="mb-2">
              Product: {item.Name}
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
        <div className="mt-4">
        {isElectron && (
          <div className="flex flex-col gap-2 mt-4">
            <motion.button
              onClick={() => {
                const data = {
                  product: order.map((item) => item.Name),
                  name: childName,
                  method: paymentMethod,
                  table: table,
                  change: change.toFixed(2),
                  price: total.toFixed(2),
                };
              
                ipcRenderer.send('cafe-print', { data });
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
                  product: order.map((item) => item.Name),
                  name: childName,
                  method: paymentMethod,
                  table: table,
                  change: change.toFixed(2),
                  price: total.toFixed(2),
                };
              



                ipcRenderer.send('cafe-print', { data });
              }}
              className="bg-purple-500 text-white p-2 rounded w-full mt-5 mb-5"
              variants={buttonVariants}
              whileHover="hover"
            >
              Print
            </motion.button>
          </div>
        )}
        </div>
        {isFlashing && 

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={handleConfirmClick}
          className="bg-green-500 text-white p-2 rounded w-full mt-4"
        >
          Confirm
        </motion.button>
        }
        
      </div>
    </div>
  );
}