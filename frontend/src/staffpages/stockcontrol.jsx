import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { StockControl, KitchenMenu } from './models';
import { useNavigate } from 'react-router-dom';
import MealProfitMargins from './mealprofitmargins';

export default function Buildameal() {



  const navigate = useNavigate();

  const [stock, setStock] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [mealName, setMealName] = useState("");
  const [next, setNext] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [menu, setMenu] = useState([]);
  const [add, setAdd] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");


  const getStock = async () => {




    const stock = await DataStore.query(StockControl);
    console.log(stock);
    setStock(stock);
  }

  const getMenu = async () => {
    const menu = await DataStore.query(KitchenMenu);
    console.log(menu);
    setMenu(menu);
  }


  useEffect(() => {
    getStock();
    getMenu();
  }, []);

  function handleButtonClick() {
    setShowInput(true);
  }

  function handleInputChange(event) {
    setMealName(event.target.value);
  }

  function handleSelectItem(item) {
    setSelectedItems([...selectedItems, item]);
  }


function handleCategoryChange(event) {
  setCategory(event.target.value);
}

function handleDescriptionChange(event) {
  setDescription(event.target.value);
}

function handleImgChange(event) {
  setImg(event.target.value);
}




  


  function handleConfirm() {
    setConfirm(true);
  }


  if (add === true) {
    navigate("/buildameal")
  }

  if (confirm === true) {
    return (
      <MealProfitMargins selectedItems={selectedItems} mealName={mealName} description= {description} category= {category} img= {img}/>
    )
  }
  

  return (
    <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
      {/* Left sidebar & main wrapper */}
      <div className="flex-1 xl:flex">
        <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
          {/* Left column area */}
          <button
            onClick={handleButtonClick}
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none items-center justify-center w-full"
          >
            Build A Meal
          </button>
          {showInput && (
            <div className='mt-5'>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-center text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input onChange={handleInputChange}
                  type="name"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Burger and Chips"
                />
              </div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-center text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <input onChange={handleCategoryChange}
                  type="text"
                  name="category"
                  id="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="eg. Kids Meal"
                />
              </div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-center text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <input onChange={handleDescriptionChange}
                  type="text"
                  name="description"
                  id="description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Burger and Chips"
                />
              </div>
              
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-center text-gray-900">
                Image URL
              </label>
              <div className="mt-2">
                <input onChange={handleImgChange}
                  type="text"
                  name="image"
                  id="image"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="https://www.google.com/"
                />
              </div>
              <button onClick={() => setNext(true)}
                type="button"
                className="relative mt-5 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none items-center justify-center w-full"
                >
                Next
              </button>
              
            </div>
            
          )}
         {selectedItems.length > 0 && (
            <>
              <h3 className="mt-3 text-lg leading-6 font-medium text-gray-900">
                Selected Items
              </h3>
              <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
                {selectedItems.map((item) => (
                  <li key={item.Name}>{item.Name}</li>
                ))}
              </ul>
              <button onClick={handleConfirm}
  type="button"
  className="relative inline-flex mt-3 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
>
  Confirm
</button>
</>
)}

            



</div>


        <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
          {/* Main content */}
          
        <h2 className="text-lg font-medium text-gray-900 text-center mt-10">Stock Items</h2>
        <button onClick={()=> setAdd(true)} className='relative inline-flex mt-3 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none'>Add Item</button>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-3">
  {stock.map((stock) => (
    <div
      key={stock.Name}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="flex-shrink-0"></div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-md font-medium text-gray-900">
            {stock.Name}
          </p>
          <p className="text-sm text-gray-500 font-italic truncate">
            {stock.Supplier}
          </p>
          {stock.Quantity === 0 ? (
            <p className="text-sm text-gray-500 truncate">
              {stock.Weight}g
            </p>
          ) : stock.Weight === 0 ? (
            <p className="text-sm text-gray-500 truncate">
              {stock.Quantity} per Pack
            </p>
          ) : null}
          <p className="truncate text-sm text-red-500">
            Price £{stock.Price}
          </p>
<p className="truncate text-sm text-blue-500">
 Pre VAT £{stock.PreVAT}
</p>



        </a>
      </div>
      {next && (
        <button
          onClick={() => handleSelectItem(stock)}
          type="button"
          className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
        >
          Select
        </button>
      )}
    </div>
  ))}
</div>

</div>
</div>

<div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
  {/* Right column area */}
  <h2 className="text-lg font-medium text-gray-900 text-center">Menu Items</h2>
<div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {menu.map((stock) => (
    <div
      key={stock.Name}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-indigo-100 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="flex-shrink-0"></div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">
            {stock.Name}
          </p>
          
          <p className="truncate text-sm text-red-500">
            Price £{stock.Price}
          </p>




        </a>
      </div>          </div>
  ))}
  
  </div>
  </div>
  </div>
  </div>
  );
}
