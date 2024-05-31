import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { DataStore } from "aws-amplify";
import { HomeCookedCollection } from "../models";
import { useNavigate } from "react-router-dom";
import { formatISO, startOfToday, isToday, format, parse } from 'date-fns';

const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;

export default function TillPayment({

}) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [amountEntered, setAmountEntered] = useState(0);
    const [isFlashing, setIsFlashing] = useState(false);
    const [prep, setPrep] = useState([]);
    const [change, setChange] = useState(0);
    const [isChangeGiven, setIsChangeGiven] = useState(false);
    const [discount, setDiscount] = useState(false);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState([]);


  const receiptRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders from the database
    const fetchOrders = async () => {
      const today = formatISO(startOfToday(), { representation: 'date' });
      const orders = await DataStore.query(HomeCookedCollection);
      const todaysOrders = orders.filter(order => isToday(new Date(order.CreatedDate)) && order.Delieved === false);
      setOrders(todaysOrders);
    };
    fetchOrders();
  }, [selectedOrder]); // Add selectedOrder as a dependency to trigger the effect when it changes
  

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
    setLoading(true);

    const updatedOrder = await DataStore.save(
        HomeCookedCollection.copyOf(selectedOrder[0], updated => {
            updated.Delieved = true;

        }
    ));

    setLoading(false);

// time out for 3 seconds 

    setTimeout(() => {
        window.location.reload();
    }, 3000);
    


    // Update the session with the new order and total price
    // Additional logic if needed
  };

  const handleCashClick = () => {
    setPaymentMethod("cash");
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
      window.location.reload();
    }
  };

  const handleDiscountApply = (percentage) => {
    const discountAmount = total * (percentage / 100);
    setTotal(total - discountAmount);
    setDiscount(percentage);
  };

  const handleDenominationClick = (amount) => {
    const updatedAmount = parseFloat(amountEntered || 0) + amount;
    setAmountEntered(updatedAmount.toString());
    const newChange = updatedAmount - total;
    setChange(newChange);
    setIsFlashing(true);

    if (ipcRenderer) {
      ipcRenderer.send('cafe-drawer', { orders, newtotal: total, amountEntered, change });

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
    setIsFlashing(true);
  };

  const handleDecimalClick = () => {
    if (!amountEntered.includes(".")) {
      setAmountEntered(amountEntered + ".");
    }
  };

  const handleCardClick = () => {
    setPaymentMethod("card");
    setIsFlashing(true);
  };

  const handleGiveChange = () => {
    // Print the receipt
    if (receiptRef.current) {
      receiptRef.current.print();
    }
    setIsChangeGiven(true);
  };

  const handleOrderClick = (event, order) => {
    event.preventDefault(); // This should now work
  
    setSelectedOrder([order]);
    setOrder(order);
    setTotal(order.Total);
    setComment('');
    setAmountEntered('');
    setChange(0);
  
    console.log(order);
  };
  

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  console.log(selectedOrder);


  return (
<div>


    
    
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
  <h2 className="text-lg font-bold">Todays Collections</h2>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
    {orders.map((order) => (
      <motion.div
      onClick={(event) => handleOrderClick(event, order)}
      key={order.Email}
        className="relative flex items-center space-x-3 rounded-lg border border-green-50 bg-gray-50 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={"homecooked.png"} alt="" />
        </div>
        <div className="min-w-0 flex-1">
          <a href="#" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{order.Email}</p>
            <p className="text-sm font-medium text-gray-900">
              {format(parse(order.CollectionTime.split('.')[0], 'HH:mm:ss', new Date()), 'h:mm a')}
            </p>
            <p className="truncate text-sm text-gray-500">£{order.Total.toFixed(2)}</p>
          </a>
        </div>
      </motion.div>
    ))}
  </div>
<div className="border-l border-gray-300 pl-4">

{selectedOrder ? (
  <>
    {selectedOrder.map((order, index) => (
      <div key={index}>
        <ol>
          {order.HotItems.map((hotItem, itemIndex) => (
            <li key={itemIndex} className="mb-2">
              {hotItem}
            </li>
          ))}
        </ol>
      </div>
    ))}

    <div>
      <div className="text-right pr-4 mt-4 text-lg font-bold">
        Total: £{order.Total ? order.Total.toFixed(2) : 'N/A'}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Amount"
          value={amountEntered}
          onChange={(e) => {
            const input = e.target.value.replace(/[^0-9.]/g, ""); // Allow only numeric and decimal point
            setAmountEntered(input);
            const newChange = parseFloat(input) - (order.Total || 0);
            setChange(newChange);
          }}
          className="bg-purple-200 p-2 rounded border border-gray-300 item-center"
        />
      </div>
      <div className="text-right pr-4 mt-2 text-lg font-bold">
        Change: £{change.toFixed(2)}
      </div>
    </div>
  </>
) : (
          <div>
            <div className="text-right pr-4 mt-4 text-lg font-bold">
                <p>No Order Selected</p>
             
          </div>
            </div>
        )}
  
   
    
  <div className="mt-4">
    {isElectron && (
      <div className="flex flex-col gap-2 mt-4">
        <motion.button
          onClick={() => {
            const data = {
              product: selectedOrder.map((item) => item.Name),
              name: selectedOrder.map((item) => item.Email),
              method: paymentMethod,
              table: "Home Cooked Maidstone",
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
                product: selectedOrder.map((item) => item.Name),
                name: selectedOrder.map((item) => item.HotItems),
                method: paymentMethod,
                table: "Home Cooked Maidstone",
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
      Confirm Order
    </motion.button>
  }
</div>
</div>
</div>
</div>

        
  );
}