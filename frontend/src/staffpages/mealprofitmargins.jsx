

import { useEffect, useState } from 'react';
import { CurrencyDollarIcon, TruckIcon } from '@heroicons/react/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { CurrencyPoundIcon } from '@heroicons/react/24/outline';
import { DataStore } from 'aws-amplify';
import { KitchenMenu } from '../models';

export default function Example({ selectedItems, mealName, category, img, description, time }) {
  const [mealNamestate, setMealName] = useState('');
  const [selectedItemsstate, setSelectedItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [itemPrices, setItemPrices] = useState([]);
  const [itemValues, setItemValues] = useState([]);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [categorystate, setCategory] = useState('');
  const [imgstate, setImg] = useState('');
  const [descriptionstate, setDescription] = useState('');
    const [portions, setPortionAmount] = useState(0);
    const [prep, setPrep] = useState(0);
    const [kitchen, setKitchen] = useState(true);




  useEffect(() => {
    setMealName(mealName);
    setSelectedItems(selectedItems);
    setCategory(category);
    setImg(img);
    setDescription(description);
    setPrep(time);
    setItemPrices(selectedItems.map(() => 0));
    setItemValues(selectedItems.map(() => 0));
  }, [selectedItems, mealName]);

  const handleSliderChange = (index, value) => {
    // update the individual price for this item
    const newPrice =
      selectedItemsstate[index].Quantity === 0
        ? (value / selectedItemsstate[index].Weight) *
          selectedItemsstate[index].Price // calculate price based on weight
        : (value / selectedItemsstate[index].Quantity) *
          selectedItemsstate[index].Price; // calculate price based on quantity
    setItemPrices((prevItemPrices) => {
      const newItemPrices = [...prevItemPrices];
      newItemPrices[index] = newPrice;
      setPrice(newItemPrices.reduce((total, price) => total + price, 0));
      return newItemPrices;
    });
    // update the individual value for this item
    setItemValues((prevItemValues) => {
      const newItemValues = [...prevItemValues];
      newItemValues[index] = value;
      return newItemValues;
    });
  
    if (selectedItemsstate.length === 1) {
      // Handle the case when there's only one item in the array
      // Calculate the portions in stock differently here
      const item = selectedItemsstate[0];
      const calculatedPortions = item.Quantity === 0
        ? Math.floor(item.Weight / value)
        : Math.floor(item.Quantity / value);
      
      setPortionAmount(calculatedPortions);
    } else {
      // Calculate the number of portions in stock for multiple items
      const lowestPortionAmount = Math.min(
        ...selectedItemsstate.map((item, index) =>
          item.Quantity === 0
            ? item.Weight === 0
              ? 0
              : Math.floor(item.Weight / itemValues[index])
            : Math.floor(item.Quantity / itemValues[index])
        )
      );

          setPortionAmount(lowestPortionAmount * 2);}}


  const handleKitchenChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const kitchen = e.target.value;
    if (kitchen === "true") {
      setKitchen(true);
    } else {
      setKitchen(false);
    }


  };



  
  
  const handleSubmit = async () => {
    // calculate the profit margin
    const profitMargin = sellingPrice - price;
    // calculate the number of portions in stock

    // assuming sellingPrice is defined somewhere above
    const formattedSellingPrice = Number(sellingPrice);
const newSellingPrice = formattedSellingPrice * 1.2;


// save the meal to the database
const meal = await DataStore.save(
  new KitchenMenu({
    Name: mealNamestate,
    Price: newSellingPrice,
    PriceNoVAT: Number(formattedSellingPrice),
    Category: categorystate,
    imageSrc: imgstate,
    StockLevel: portions,
    Kitchen: kitchen,
    Description: descriptionstate,
    ProfitMargin: profitMargin,
    Prep: prep,
    Ingredients: JSON.stringify(
      selectedItemsstate.map((item, index) => ({
        id: item.id,
        name: item.Name,
        weight: item.Quantity === 0 ? parseFloat(itemValues[index]) : 0,
        quantity: item.Quantity === 0 ? 0 : parseFloat(itemValues[index]),
        price: parseFloat(itemPrices[index]),
        supplier: item.Supplier,
        matchCode: item.MatchCode,
        
      }))
    ),
  })
);
window.location.reload();
  }


  
  


  return (
    <div className="w-full p-4">
        <h2 className="text-2xl text-center font-bold mb-4">{mealNamestate}</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <label htmlFor="selling-price" className="text-sm font-medium text-black">
          Selling Price (Excluding VAT):
        </label>
        <div className="flex items-center mt-2 md:mt-0">
          <CurrencyPoundIcon className="h-5 w-5 text-green-500" />
          <input
            id="selling-price"
            type="number"
            min={0}
            step={0.01}
            onChange={(event) => setSellingPrice(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-black">
          Selling Price (Including VAT):
        </p>
        <p className="text-sm font-medium text-black">£{(sellingPrice * 1.2).toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-black">Profit Margin:</p>
        <p
          className={`font-bold text-sm ${
            sellingPrice - price > 0
              ? "text-green-500"
              : sellingPrice - price === 0
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          £{(sellingPrice - price).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-black">Price (per Portion):</p>
        <p className="text-sm font-medium text-black">£{price.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
  <p className="text-sm font-medium text-black">Portions In Stock:</p>
  <p className="text-sm font-medium text-black">{portions}</p>
  <div>
      <label htmlFor="Kitchen" className="block text-sm font-medium leading-6 text-gray-900">
        Kitchen Product
      </label>
      <select
      onChange={handleKitchenChange}
      id="kitchen"
      name="kitchen"
      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      value={kitchen.toString()}
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
    </div>
</div>

  <div className="mt-8 flow-root">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black sm:pl-0">
                Product
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">
                Portion Size
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">
                Weight
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">
                Price
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">
      Portions
    </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {selectedItemsstate.map((item, index) => (
              <tr key={item.Name}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-0">
                  {item.Name}
                    <p className="font-italic">{item.Supplier}</p>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{item.Quantity === 0 ? (
                  <>
                    <label htmlFor={`weight-slider-${index}`} className="mt-2 md:mt-0">Weight:</label>
                    <input
                      id={`weight-slider-${index}`}
                      type="range"
                      min={0}
                      max={item.Weight}
                      step={0}
                      onChange={(event) =>
                        handleSliderChange(index, event.target.value)
                      }
                      className="w-full mt-2 md:mt-0 bg-red-500"
                    />
                    <p>Selected Weight: {itemValues[index]}g</p>
                  </>
                ) : (
                  <>
                    <label htmlFor={`quantity-slider-${index}`} className="mt-2 md:mt-0">Quantity:</label>
                    <input
                      id={`quantity-slider-${index}`}
                      type="range"
                      min={1}
                      max={item.Quantity}
                      step={1}
                      onChange={(event) =>
                        handleSliderChange(index, event.target.value)
                      }
                      className="w-full mt-2 md:mt-0"
                    />
                    <p>Selected Quantity: {itemValues[index]}</p>
                  </>
                )}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{item.Weight}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">£{itemPrices[index].toFixed(2)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">
  {item.Quantity === 0
    ? item.Weight === 0
      ? 0
      : (  item.Weight / itemValues[index]).toFixed(2)
    : ( item.Quantity / itemValues[index]).toFixed(2)}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit}
       className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Next
            </button>
    </div>
  </div>
    </div>

);

     
  
  
  
}


