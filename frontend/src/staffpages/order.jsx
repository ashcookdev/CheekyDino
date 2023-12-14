import React, { useState, useEffect } from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { KitchenMenu, CafeOrder, Sessions } from '../models';
import CustomerProgress from './customerorderprogress';
import { Auth } from 'aws-amplify';
const { format } = require('date-fns');



export default function Menu() {


// reload page every 1 min 

useEffect(() => {
  const interval = setInterval(() => {
    window.location.reload();
  }, 60000);
  return () => clearInterval(interval);
}, []);






  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [session, setSession] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // get email from user
    const getUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;
      // get session id
      const models = await DataStore.query(Sessions);
      const filteredModels = models.filter(
        (c) =>
          c.Email === email &&
          c.Arrived === true &&
          c.LeftCenter === false &&
          c.Date === new Date().toISOString().slice(0, 10)
      );
    setSession(filteredModels)

    };

    getUser();
  }
  , []);


  useEffect(() => {
    const fetchCategories = async () => {
      const items = await DataStore.query(KitchenMenu);
      const uniqueCategories = [...new Set(items.map((item) => item.Category))];
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  const fetchMenuItemsByCategory = async (category) => {
    try {
      const items = await DataStore.query(KitchenMenu, Predicates.ALL);
      const filteredItems = items.filter((item) => item.Category === category);
      setMenuItems(filteredItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchMenuItemsByCategory(category);
  };

  const handleOrder = (product) => {
    const newOrder = {
      product: product.Name,
      price: product.Price,
      category: product.Category,
      quantity: 1,
      kitchen: product.Kitchen,
      prepTime: product.PrepTime,
      productID: product.id,
      
    };

    setSelectedProducts((prevProducts) => [...prevProducts, newOrder]);
  };

  const handleCheckout = async (e) => {

console.log(session)
// save total into session 
// save created time into session using date-fns format

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


const totalCost = selectedProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

// if kitchen is true, save order into cafeorder
const hotItems = selectedProducts
      .filter((item) => item.kitchen)
      .map((item) => item.product);

    // convert prep time to string

    const drinkItems = selectedProducts
      .filter((item) => !item.kitchen)
      .map((item) => item.product);

    const kitchen = hotItems.length > 0;

    const prepTime = hotItems.reduce((acc, curr) => acc + curr.prepTime, 0);

    const se = selectedProducts.map((item) => item.productID);




  const original = await DataStore.query(Sessions, session[0].id);
  await DataStore.save(
    Sessions.copyOf(original, (updated) => {
      updated.Total = selectedProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      updated.Orders = (updated.Orders || 0) + 1;
    })
  );

await DataStore.save(

    new CafeOrder({
      HotItems: hotItems,
        DrinkItems: drinkItems,
        CreatedTime: awstime,
        CreatedDate: new Date().toISOString().split("T")[0],
        Total: totalCost,
        Table: session[0].Table,
        Completed: false,
        Sessionid: session[0].id,
        Delieved: false,
        Kitchen: true,
        KitchenMenuId: se.map((item) => item.id),
        TotalNoVAT: totalCost / 1.2,
        sessionsID: session[0].id,
        SessionEmail: session[0].Email,
        Notes: text,

    })
  );

console.log("order saved")
window.location.reload();
  };




   


  const handleQuantityChange = (index, quantity) => {
    const newProducts = [...selectedProducts];
    newProducts[index].quantity = parseInt(quantity, 10) || 1; // Ensure quantity is a valid number, default to 1 if not
    setSelectedProducts(newProducts);
  };


  


  return (
    <div className="bg-white">
      {selectedProducts.length > 0 && (
        <div className="bg-orange-100 p-2 md:p-4 lg:p-6 xl:p-8 rounded-md mb-8">
          <h3 className="text-lg font-semibold mb-2">Selected Items:</h3>
          <ul className="list-disc pl-4 md:pl-6 lg:pl-8 xl:pl-10">
            {selectedProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{product.product} - £{product.price.toFixed(2)}</span>
                <input 
                  type="number" 
                  min="1" 
                  defaultValue="1" 
                  onChange={(e) => handleQuantityChange(index, e.target.value)} 
                  className="ml-4 w-20"
                />
              </li>
            ))}
            <textarea onChange={(e) => setText(e.target.value)} className="mt-2 w-full h-24 p-2 border border-gray-300 rounded-md" placeholder="Add a note to your order..."></textarea>


        <p className="mt-2 text-lg font-semibold">Total: £{selectedProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}</p>
          </ul>
          <button onClick={handleCheckout} className="mt-2 px-2 py-1 md:mt-4 md:px-4 md:py-2 lg:mt-6 lg:px-6 lg:py-3 xl:mt-8 xl:px-8 xl:py-4 bg-indigo-500 text-white rounded-md">
            Checkout
          </button>
        </div>
      )}
    

<div className="mx-auto max-w-7xl overflow-hidden px-2 sm:px-6 md:px-8 lg:px-10 xl:px-12">
  <CustomerProgress/>
  <h2 className="sr-only">Products</h2>
  <div className="flex items-center mt-10 mb-10">
    {categories.length > 0 && (
      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex flex-col space-y-2 sm:flex-row sm:space-x-8 sm:space-y-0" aria-label="Tabs">
            {categories.map((category) => (
              <a
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`${
                  selectedCategory === category
                    ? 'border-orange-500 text-orange-600 component-title'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 component-title'
                } whitespace-normal sm:whitespace-nowrap border-b-2 py-2 px-1 sm:py-4 sm:px-1 text-sm font-medium cursor-pointer`}
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
      </div>
    )}
  </div>


        {selectedCategory && (
          <ul role="list" className="divide-y divide-gray-100">
            {menuItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-x-2 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 xl:gap-x-12 py-2 sm:py-5 md:py-6 lg:py-7 xl:py-8">
                <div className="flex min-w-0 gap-x-2 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-x-10">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-5 sm:leading-6 text-gray-900">{item.Name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.Description}</p>
                  </div>
                </div>
                <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button onClick={() => handleOrder(item)} className="px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 bg-orange-500 rounded-md">
                    Order
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

