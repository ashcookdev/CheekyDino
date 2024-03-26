import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { StockControl, KitchenMenu } from '../models';
import { useNavigate } from 'react-router-dom';
import MealProfitMargins from './mealprofitmargins';
import { StockControlEdit } from './stockcontroledit';
import UsedByStock from './UsedByStock';
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
  const [time, setTime] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedCases, setSelectedCases] = useState(1);
  const [price, setPrice] = useState(0);
  const [menuExtra, setMenuExtra] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [extraPrices, setExtraPrices] = useState({});
  const [menuSearch, setMenuSearch] = useState("");
  const [used, setUsed] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isElectron, setIsElectron] = useState(false);


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

function AddExtras(menu) {
  setMenuExtra(menu);
  console.log(selectedItems);}



function handleTimeChange(event) {
  setTime(event.target.value);
}

const EditStock = (stock) => {

setSelectedStock(stock)  
console.log(stock);
}

function handleConfirmation(stock) {


  // Calculate the new weight or quantity based on the selected value of the cases dropdown
  
  const cases = parseInt(selectedCases);

  console.log(stock.Weight)
  console.log(price)
  
  const newWeightOrQuantity = cases * (stock.Weight > 0 ? stock.Weight : stock.Quantity + stock.CurrentStockLevel);

  


  //passInt to convert string to number
   
    console.log(newWeightOrQuantity);



    const newPrice = parseFloat(price)
    const newPreVAT = newPrice / 1.2
    const preVAT = parseFloat(newPreVAT)
    console.log(preVAT);
    console.log(newPreVAT);

    StockControlEdit(stock, newWeightOrQuantity, newPrice, preVAT, cases);


   

  

    

  // update the weight or quantity of the stock item


  // update the price of the stock item
  DataStore.save(
    StockControl.copyOf(selectedStock, (updated) => {
      updated.NewPrice = newPrice;
   updated.NewPreVAT = preVAT;
   updated.UsedBy = used;

     updated.CurrentStockLevel = newWeightOrQuantity;
      updated.Cases = cases;
      

})
  );
  console.log('Price updated');
  setSelectedStock(null);
  setNext(false);
}

function handleExtrasConfirm() {
  DataStore.save(
    KitchenMenu.copyOf(menuExtra, (updated) => {
      updated.Extras = selectedExtras.map((extra) => ({
        name: extra,
        price: extraPrices[extra],
      }));
    })
  );

  console.log('Extras updated');
  setMenuExtra(null);
}





function handleSelectExtras(event) {
  const selectedItem = event.target.value;
  setSelectedExtras((prevSelectedItems) => [...prevSelectedItems, selectedItem]);
}



  function handleConfirm() {
    setConfirm(true);
  }

  


  if (add === true) {
    navigate("/buildameal")
  }

  if (confirm === true) {
    return (
      <MealProfitMargins selectedItems={selectedItems} mealName={mealName} description= {description} category= {category} img= {img} time= {time}/>
    )
  }
  
  const filteredStock = stock.filter(stock => stock.Name.toLowerCase().includes(searchTerm.toLowerCase()));

  function handlePriceChange(event, extra) {
    setExtraPrices((prices) => ({
      ...prices,
      [extra]: parseFloat(event.target.value),
    }));
  }

  function handleDelete(stock) {
    DataStore.delete(stock);
    console.log('Stock deleted');
    window.location.reload();
  }

  const filteredMenu = menu.filter(menu => menu.Name.toLowerCase().includes(menuSearch.toLowerCase()));
  
  
  function handleSelectExtras(event) {
    const selectedExtra = event.target.value;
    setSelectedExtras((prevSelectedExtras) => [...prevSelectedExtras, selectedExtra]);
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
            Build A Product
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
              
              
              <label htmlFor="time" className="block text-sm font-medium leading-6 text-center text-gray-900">
Estimated Prep Time              </label>
              <div className="mt-2">
              <input
  onChange={handleTimeChange}
  type="text"
  name="time"
  id="time"
  pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]" // Specify a pattern for HH:MM format
  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  placeholder="Prep Time (HH:MM)"
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
        {isElectron && (
  <button
    onClick={() => navigate("/stockpdf")}
    type="button"
    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
  >
    Upload Stock Invoice
  </button>
)}


          {/* Main content */}
        <h2 className="text-lg font-medium text-gray-900 text-center mt-10">Stock Items</h2>
        <button onClick={()=> setAdd(true)} className='relative inline-flex mt-3 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none'>Add Item</button>
        <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
      <input
  type="text"
  name="search"
  id="search"
  className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  onChange={event => setSearchTerm(event.target.value)}
/>

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-3">
  {filteredStock.map((stock, index) => (
    <div
      key={index}
      className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 ${stock.Weight > 0 ? (stock.CurrentStockLevel > 500 ? 'bg-green-100' : 'bg-red-100') : (stock.Quantity > 0 ? (stock.CurrentStockLevel > 50 ? 'bg-green-100' : 'bg-red-100') : '')}`}
      >    
      <div className="flex-shrink-0"></div>
      

      <div className="min-w-0 flex-1">
          <p className="text-md font-medium text-gray-900">
            {stock.Name}
          </p>
          <p className="text-sm font-italic text-gray-900">
            Cases:{stock.Cases}
          </p>
          <p className="text-sm text-gray-500 font-italic truncate">
            Supplier: {stock.Supplier}
          </p>
          <p className="truncate text-sm text-gray-500">
            Match Code: {stock.MatchCode}
          </p>
          <p className="truncate text-sm text-blue-500">
            ID:{stock.ProductId}
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
          <p className="truncate text-sm text-gray-500">
            Stock Level: {stock.CurrentStockLevel}
          </p>
          <p className="truncate text-sm text-red-500">
            Used By: {stock.UsedBy}
          </p>
          <p className="truncate text-sm text-red-500">
            Price £{stock.Price}
          </p>

  
<button onClick={() => EditStock(stock)}
  type="button"
  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-green-700 focus:outline-none"
>
  Edit
</button>
<button onClick={() => handleDelete(stock)}
      type="button"
      className="relative inline-flex mr-3 ml-3 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
    >
      Delete
    </button>
{selectedStock === stock && (
  <>
   <div>
      <label htmlFor="cases" className="block text-sm font-medium leading-6 text-gray-900">
Cases      </label>
      <select
        id="cases"
        name="cases"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="cases"
        onChange={(event) => setSelectedCases(event.target.value)}

      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        

      </select>
    </div>
    <p className="text-sm mt-2 text-gray-500 truncate">
  Cases: {selectedCases * (stock.Weight > 0 ? stock.Weight : stock.Quantity)}
</p>
<div>
      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
        Price
      </label>
      <div className="mt-2">
        <input onChange={(event) => setPrice(event.target.value)}
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="£0.00"
        />
      </div>
      <div>
      <label htmlFor="UsedBy" className="block text-sm font-medium leading-6 text-gray-900">
        Used By
      </label>
      <div className="mt-2">
        <input onChange={(event) => setUsed(event.target.value)}
          type="date"
          name="date"
          id="date"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          
        />
      </div>
      </div>
    </div>
    <div>
    <button onClick={() => handleConfirmation(stock)}
  type="button"
  className="relative inline-flex mt-3 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
>
  Confirm
</button>

      
      
    </div>
  </>
)}



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
<div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 mb-5">
<div className="grid grid-cols-1 gap-4 sm:grid-cols-1">

      <div className="relative mt-2 flex items-center">
      <input
  type="text"
  name="search"
  id="search"
  className="block w-full rounded-md mb-5 mt-5 border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  onChange={event => setMenuSearch(event.target.value)}
/>

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
 {filteredMenu.map((menuItem) => (
            <div
              key={menuItem.Name}
              className="relative flex items-center space-x-3 mt-3 rounded-lg border border-gray-300 bg-indigo-100 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
      <div className="flex-shrink-0"></div>
      <div className="min-w-0 flex-1">
        <span className=" inset-0" aria-hidden="true" />
        <p className="text-sm font-medium text-gray-900">{menuItem.Name}</p>
        <p className="text-sm text-gray-500 truncate">{menuItem.Category}</p>
        <p className=" text-sm text-gray-500">{menuItem.Kitchen}</p>
        <p className=" text-sm text-red-500">Price £{menuItem.Price.toFixed(2)}</p>

        <button
                  onClick={() => AddExtras(menuItem)}
                  type="button"
                  className="relative inline-flex mt-3 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                >
                  Add Extras
                </button>
        <div>
          {menuExtra === menuItem && (
            // select menu items to add to the menu
            <div>
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                Add Products
              </label>
              <select  onChange={handleSelectExtras}
                id="extras"
                name="extras"

                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="extras"
              >
                {menu.map((menuItem) => (
                  <option key={menuItem.Name}>{menuItem.Name}</option>
                ))}
              </select>
              <div>
  

 
                
               
              {selectedExtras.map((extra) => (
  <div key={extra} className='mt-3'>
    <li>{extra}</li>
    <input
  onChange={(event) => handlePriceChange(event, extra)}
  value={extraPrices[extra] || '0.00'}
  type="number"
  step="0.01"
  placeholder="Enter price"
  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
/>

  </div>
))}

      <button className="relative inline-flex mt-3 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
 onClick={handleExtrasConfirm}>Confirm</button>
            </div>
        
        </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
</div>
</div>
  
  

  );
}
