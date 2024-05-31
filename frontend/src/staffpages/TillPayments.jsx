import { DataStore, Predicates } from "aws-amplify";
import { CafeOrder, Sessions, KitchenMenu } from "../models";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import KitchenLoader from "./kitchenloader";
import { XCircleIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';
import TillPayments from "./TillPayments";
import { checkStockLevel } from "./tillstock";
import { set } from "date-fns";
import { find } from "lodash";







function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}





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
  const [kitchenMenu, setKitchenMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [back, setBack] = useState(false);
  const [showItems, setShowItems] = useState(true); // Track whether to show items or extras
  const [showCategories, setShowCategories] = useState(true); // Track whether to show categories or items
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item
  const [enabled, setEnabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [tab, setTab] = useState(false);
  const [commentBlock, setCommentBlock] = useState([]);
  const [notesString, setNotesString] = useState('');

  
  const handleNotes = (item) => {
    // If the item is not a string, convert it to a string
    if (typeof item !== 'string') {
      item = String(item);
    }
    setNotesString(prevNotesString => prevNotesString ? prevNotesString + ', ' + JSON.stringify(item) : JSON.stringify(item));
  };

  const colors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];




  const handleProductClick = async (item) => {
    // Check if the item is a non-stock product (Ingredients === null)
    if (item.Ingredients === null) {
      // For non-stock products, add them to the order directly
      setOrder((order) => [...order, item]);
      setTotal((total) => total + item.Price);
    } else {
      // For regular products, perform stock checking logic
      const inStock = await checkStockLevel(item.id);
      if (!inStock) {
        console.log("This item is not in stock");
        return;
      }
      // Add the product item to the order
      setOrder((order) => [...order, item]);
      // Update the total price
      setTotal((total) => total + item.Price);
    }

    // Check if .Extras are null, then showItems(true)
    if (!item.Extras) {
      setShowItems(true);
    }
  };






  async function fetchKitchenMeal() {
    const kitchensMenu = await DataStore.query(KitchenMenu);
    setKitchenMenu(kitchensMenu);
    // 
    setData(kitchensMenu);

  }


  async function findIngredients() {
    try {
        // Get hot items from the order
        const hotItems = order
            .filter((item) => item.Kitchen)
            .map((item) => item.Name);

        // Initialize an array to store all ingredients
        const allIngredientNames = [];

        // Loop through each hot item
        for (const hotItem of hotItems) {
            // Find the item in the kitchen menu
            const dataset = await DataStore.query(KitchenMenu);

            const kitchenItem = dataset.find(item => item.Name === hotItem);

            // If item is found, add its ingredients to allIngredientNames
            if (kitchenItem) {
                const ingredients = kitchenItem.Ingredients;
                ingredients.forEach(ingredient => {
                    if (ingredient.name) {
                        allIngredientNames.push(ingredient.name);
                    }
                });
            }
        }

        // push butter and no butter into the array
        allIngredientNames.push('Butter');

        // Update the state with the extracted ingredient names
        setCommentBlock(allIngredientNames);
    } catch (error) {
        console.error('Error finding ingredients:', error);
    }
}






   

  useEffect(() => {
    fetchKitchenMeal();
    findIngredients();
    
  }, []);



  const categories = [...new Set(kitchenMenu.map((item) => item.Category))];








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
  
    const hotItems = orders
    .filter((item) => item.Kitchen)
    .map((item) => item.Name);

  const drinkItems = orders
    .filter((item) => !item.Kitchen)
    .map((item) => item.Name);

  // Check if both hotItems and drinkItems arrays are empty
  if (hotItems.length === 0 && drinkItems.length === 0) {
    alert("Error: Please add at least one hot item or drink item to the order");
    setLoading(false);
    return;
  }

  // convert prep time to string
  const prepTime = prep.toString();

  const kitchen = hotItems.length > 0;

  await DataStore.save(
    Sessions.copyOf(session, updated => {
      updated.Orders += 1;
      updated.TotalSpent += total;
    })
  );

  
    if (tab === true) {
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
          Tab: true,
          Paid: false,
          paymentMethod: paymentMethod,
        })
      )
        .then(() => {
          console.log("Order confirmed" + session.id);
          setTimeout(() => {
            setLoading(false); // Hide the loading spinner.
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    } else {

// save in Session order + 1 and add to total 




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
          Notes: comment + ("") + notesString,
          Tab: false,
          Paid: true,
          paymentMethod: paymentMethod,
        })
      )
        .then(() => {
          console.log("Order confirmed" + session.id);
          setTimeout(() => {
            setLoading(false); // Hide the loading spinner.
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };
  
  const handleCashClick = () => {
    setPaymentMethod("cash");
    setOrders(order);
    setAmountEntered("");
    setChange(0);
    // openCashDrawer

    
  };

  const handleDiscountClick = () => {
    // Display input field for password
    setDiscount(true);
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
    if (ipcRenderer) {
      ipcRenderer.send('cafe-drawer', { orders, newtotal, amountEntered, change });

      ipcRenderer.on('electron-response', (event, responseData) => {
        console.log('Received response from Electron:', responseData);
      });

    }



  };

  const handleItemClick = async (item) => {
    setSelectedItem(item);
    setShowItems(false);
    setShowCategories(false)
    // Pass the selected item to the handleProductClick function
    await handleProductClick(item);
  };

  // Function to handle clicking on an extra
  const handleExtraClick = (extra) => {
    // Add the clicked extra to the current order
    setOrder([...order, extra]);
  };

  // Function to handle clicking on a product (item or extra)



  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategories(false); // Set showCategories to false to hide the categories
    setShowItems(true); // Ensure showItems is set to true to display items

    // Filter the kitchenMenu based on the selected category
    const filteredItems = kitchenMenu.filter((item) => item.Category === category);
    setData(filteredItems); // Update the data state with the filtered items
  };






  const filteredData = data.filter((item) => item.Category === selectedCategory);



  const handleNumberClick = (number) => {
    const updatedAmount = parseFloat(amountEntered + number.toString());
    setAmountEntered(updatedAmount.toString());
    const newChange = updatedAmount - total;
    setChange(newChange);
    setIsFlashing(true)
    if (paymentMethod === "cash" && updatedAmount >= total) {
ipcRenderer.send('cafe-drawer', { orders, newtotal, amountEntered, change });
  
        ipcRenderer.on('electron-response', (event, responseData) => {
          console.log('Received response from Electron:', responseData);
        });
        
        
    }

  };

  const handleDecimalClick = () => {
    if (!amountEntered.includes(".")) {
      setAmountEntered(amountEntered + ".");
      ipcRenderer.send('cafe-drawer', { orders, newtotal, amountEntered, change });

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

  console.log(data);

  const handleBackClick = () => {
    // If currently showing extras, switch back to showing items
    if (!showItems) {
      setShowItems(true);
    } else {
      // Handle any other functionality you need when clicking the Back button
      setBack(true);
    }
  };



  const handleDeleteClick = (index) => {
    const updatedOrder = [...order];
    const deletedItem = updatedOrder.splice(index, 1)[0];
    setOrder(updatedOrder);
    setTotal(total - deletedItem.Price);
  }

  const handleConfirm = async (order, total) => {
    setOrder(order);
    setTotal(total);
    setConfirm(true);
  };



  if (confirm === true) {



    return (
      <TillPayments order={order} total={total} table={table} childName={childName} setOrder={setOrder} setTotal={setTotal} staff={staff} />
    );
  }


  const handleBackNowClick = () => {
    setShowItems(false);
    setShowCategories(true);
  }





  const handleTabOrderConfirmation = () => {
    setTab(true);
    setIsFlashing(true);
  }




    // add the notes to the order









  return (

    <div>
 {back ? (
         <div className="flex flex-col lg:flex-row justify-between">
  <div className="w-full lg:w-2/3">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mt-4 border-b-2 border-gray-200 pb-4">
        {showCategories && (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {categories
      .slice() // Create a shallow copy of the array to avoid modifying the original
      .sort((a, b) => a.localeCompare(b)) // Sort the categories alphabetically
      .map((category, index) => {
        const allowedCategories = ['Event', 'Hot Drinks', 'Kids Drinks', 'Cold Drinks', 'Snacks'];

        if (!enabled || (enabled && allowedCategories.includes(category))) {
          return (
            <motion.button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`${
                colors[index % colors.length]
              } text-white font-bold h-20 w-30 py-2 px-4  shadow-md`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {category}
            </motion.button>
          );
        }

        return null;
      })}
  </div>
)}



{showItems && (
  <div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {filteredData
        .sort((a, b) => a.Name.localeCompare(b.Name)) // Sort alphabetically based on the Name property
        .map((item, index) => {
          let stockColor;
          if (item.StockLevel < 5) {
            stockColor = 'bg-red-500';
          } else if (item.StockLevel >= 5 && item.StockLevel <= 10) {
            stockColor = 'bg-yellow-500';
          } else {
            stockColor = colors[index % colors.length];
          }

          return (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`text-white font-bold h-20 w-30 py-2 px-4  shadow-md  ${stockColor}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.Name} - £{item.Price.toFixed(2)} - Stock: {item.StockLevel}
            </motion.button>
          );
        })}
    </div>
    <button onClick={handleBackNowClick} className="rounded-full bg-red-600 mt-5 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

      Back
    </button>
  </div>
)}

    {selectedItem && selectedItem.Extras && (
  <motion.div
    className="mt-10 mr-3 ml-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="font-bold">Extras:</h3>
    <ul>
      {selectedItem.Extras.map((extra, index) => {
        const kitchenItem = kitchenMenu.find(item => item.Name === extra.name);

        // Check if the kitchenItem exists and has a valid price
        if (kitchenItem && extra.price !== undefined) {
          // Create a modified copy of kitchenItem with the desired price
          const modifiedKitchenItem = {
            ...kitchenItem,
            Price: extra.price, // Replace with the desired price
          };

          return (
            <motion.button
              onClick={() => handleProductClick(modifiedKitchenItem)}
              key={index}
              className={`text-blue-500 font-bold py-2 px-4 rounded-full shadow-md mt-2 mr-2`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {extra.name} - £{extra.price} - Stock: {kitchenItem.StockLevel ? kitchenItem.StockLevel : 'N/A'}
            </motion.button>
          );
        } else {
          // Handle the case where kitchenItem or extra.price is undefined
          return null // You can choose to display nothing or handle it differently
        }
          
        
      })}
       <button onClick={handleBackNowClick} className="rounded-full bg-red-600 mt-5 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

Back
</button>
    </ul>
  </motion.div>
)}



            </div>
            </div>
            </div>






        <div className="w-1/3 border-purple-400">

        <div className="border  p-4 mt-2 bg-purple-200 p-4 rounded-lg shadow-md">
        <Switch.Group as="div" className="flex items-center mb-2 mt-2">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">Event</span>{' '}
      </Switch.Label>
    </Switch.Group>
        <p className="font-bold">Table:{table}</p>
              <p className="font-bold"> Name:{childName}</p>
              <p className="font-bold"> Staff:{staff}</p>
              </div>
          <div className="mt-4 border-b-4 border-gray-200 pb-4">
            <h2 className="font-bold text-lg mb-4">Order:</h2>
            <div className="border bg-blue-200 p-4 rounded-lg shadow-md">
              <motion.button
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
             
               onClick={() => {
              window.location.reload();
              }}
             className="bg-red-500 text-white p-1 rounded">Cancel</motion.button>

              <ul>
             
                {order.map((item, index) => (
                  <li key={index} className="flex mt-3 justify-between items-center font-bold mb-5">
                    <div>
                      {item.Name} £{item.Price.toFixed(2)}
                    </div>
                    <motion.button
      className="bg-red-500 text-white p-1 rounded"
      onClick={() => handleDeleteClick(index)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <XCircleIcon className="w-5 h-5" />
    </motion.button>

                  </li>
                ))}
              </ul>
              <p className="mt-3 mb-3 font-bold">Total: £{total.toFixed(2)}</p>
              <motion.button                 onClick={() => handleConfirm(order, total)}

        className="w-16 h-10 mt-3 mb-3 bg-purple-600 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-1 mb-1 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Confirm
      </motion.button>
              
            </div>
          </div>
        </div>
      </div>
      ) : (


    
    <div className="grid grid-cols-3 gap-4 p-4">

      <div className="border-r border-gray-300 pr-4 mb-3 mt-3">
      <motion.button
      onClick={handleBackClick}
          variants={buttonVariants}
          whileHover="hover"
          className="bg-purple-500 animate-pulse text-white p-2 rounded w-full mt-5 mb-5" 
        >
          Update Order
        </motion.button>

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
          {/* <motion.button
            className= "bg-orange-500 text-white p-2 rounded"
            onClick={handleTabOrderConfirmation}
            variants={buttonVariants}
            whileHover="hover"
          >
            Add To Tab
          </motion.button> */}
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

        <ul className="text-bold text-purple-900">
          {table && <li>Table: {table}</li>}
          {childName && <li>Name: {childName}</li>}
          {order.map((item, index) => (
            <li key={index} className="mb-2">
             {item.Name}
            </li>
          ))}
        </ul>
        <div>
        <h2>Notes:</h2>
        <p>{notesString}</p>
      </div>
        
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
        {isFlashing && (
  <motion.button
    variants={buttonVariants}
    whileHover="hover"
    onClick={handleConfirmClick}
    className="bg-green-500 text-white p-2 rounded w-full mt-4"
  >
    {tab ? 'Save Tab' : 'Confirm Order'}
  </motion.button>
)}

        
      </div>
      <p className="text-center text-sm text-gray-500 mt-4"> Add a Note to the order</p>
      
      {commentBlock.map((item, index) => (
        
      
          
        
        <button onClick={() => handleNotes("No"+ ("")+ item)} key={index} className="bg-orange-500 text-white p-1 rounded animate-pulse">
        No {item}</button>
      ))}
      
    </div>
    
    
    
      )}
      </div>
    
  );
}