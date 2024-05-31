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
  const [time, setTime] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedCases, setSelectedCases] = useState(1);
  const [price, setPrice] = useState(0);


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
  
  const newWeightOrQuantity = cases * (stock.Weight > 0 ? stock.Weight : stock.Quantity);

  //passInt to convert string to number
   
    console.log(newWeightOrQuantity);

    const newPrice = parseFloat(price)
    const newPreVAT = newPrice / 1.2
    const preVAT = parseFloat(newPreVAT)
    console.log(preVAT);
    console.log(newPreVAT);
    

  // update the weight or quantity of the stock item


  // update the price of the stock item
  DataStore.save(
    StockControl.copyOf(selectedStock, (updated) => {
      updated.Price = newPrice;
      updated.PreVAT = preVAT;

      updated.CurrentStockLevel = newWeightOrQuantity;
      updated.Cases = cases;
      

    })
  );
  console.log('Price updated');
  setSelectedStock(null);
  setNext(false);
  window.location.reload();
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
Add Your Extras          </button>
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
          <p className="truncate text-sm text-gray-500">
            Stock Level: {stock.CurrentStockLevel}
          </p>
          <p className="truncate text-sm text-red-500">
            Price £{stock.Price}
          </p>
<p className="truncate text-sm text-blue-500">
 Pre VAT £{stock.PreVAT}
</p>
  
<button onClick={() => EditStock(stock)}
  type="button"
  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
>
  Edit
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
