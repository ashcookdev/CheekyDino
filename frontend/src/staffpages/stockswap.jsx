import { DataStore } from "aws-amplify";
import { StockControl, KitchenMenu } from "../models";
import { useState, useEffect } from "react";
import { FolderIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function Example() {
  const [stockControl, setStockControl] = useState([]);
  const [kitchenMenu, setKitchenMenu] = useState([]);
  const [newPrices, setNewPrices] = useState(Array(kitchenMenu.length).fill(0));
    const [selectedAlternatives, setSelectedAlternatives] = useState(Array(kitchenMenu.length).fill(null));



  useEffect(() => {
    const fetchStockControl = async () => {
      const stockControlData = await DataStore.query(StockControl);
      setStockControl(stockControlData);
    };
  
    const fetchKitchenMenu = async () => {
      const kitchenMenuData = await DataStore.query(KitchenMenu);
      setKitchenMenu(kitchenMenuData);
      // Update newPrices here
      setNewPrices(Array(kitchenMenuData.length).fill(0));
    };
  
    fetchKitchenMenu();
    fetchStockControl();
  }, []);
  

  const getAlternatives = (matchCode) => {
    return stockControl.filter((item) => item.MatchCode === matchCode);
  };

    

  const handleSelectChange = (e, ingredient, index) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedId = e.target.value;
    console.log(selectedId);
  
    // find in stockControl the item with the id of selectedId
    const selectedStock = stockControl.find((item) => item.id === selectedId);
    console.log(selectedStock);
  
    // find out from selectedStock if it is weight or quantity
    const stockWeightorQuantity = selectedStock.Weight > 0 ? selectedStock.Weight : selectedStock.Quantity;
    console.log(stockWeightorQuantity);
  
    // find out from ingredient if it is weight or quantity
    const ingredientWeightorQuantity = ingredient.weight > 0 ? ingredient.weight : ingredient.quantity;
    console.log(ingredientWeightorQuantity);
  
    // now we have both, we can work out the new price
    const newPrice = (selectedStock.Price / stockWeightorQuantity) * ingredientWeightorQuantity;
  
    // update the new price in the newPrices array
    const updatedPrices = [...newPrices];
    updatedPrices[index] = newPrice;
    setNewPrices(updatedPrices);
  
    // update the selected alternative in the selectedAlternatives array
    const updatedAlternatives = [...selectedAlternatives];
    updatedAlternatives[index] = selectedStock;
    setSelectedAlternatives(updatedAlternatives);
  };
  

  const handleSave = (menu) => {
    console.log(menu);
  
    // get the ingredients from the menu
    const ingredients = menu.Ingredients;
    console.log(ingredients);
    console.log(newPrices);
  
    // get the new prices
    const updatedIngredients = ingredients.map((ingredient, index) => {
      const updatedIngredient = {...ingredient};
      updatedIngredient.price = newPrices[index];
      
      // update the supplier and name with the selected alternative
      const selectedAlternative = selectedAlternatives[index];
      if (selectedAlternative) {
        updatedIngredient.supplier = selectedAlternative.Supplier;
        updatedIngredient.name = selectedAlternative.Name;
      }
  
      return updatedIngredient;
    });
  
    console.log(updatedIngredients);

    // update KitchenMenu with the updatedIngredients

    const saveData = async () => {
        const original = await DataStore.query(KitchenMenu, menu.id);

        await DataStore.save(
            KitchenMenu.copyOf(original, (updated) => {
                updated.Ingredients = JSON.stringify(updatedIngredients);
            })
        );
    };

    saveData();




     
    // Now you can save updatedIngredients to your backend or local storage
    
    // set time out to reload page
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  

    const handleCancel = () => {
        window.location.reload();
    }


  
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="border-b border-gray-200 pb-5 mt-5 flex">
      <h3 className="text-base font-semibold leading-6 text-purple-800 items-center">Stock Comparison</h3>
    </div>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1">
      {kitchenMenu.map((menu, index) => (
        <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-purple-100 shadow mt-5">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{menu.Name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {menu.Category}
                </span>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  £{menu.Price.toFixed(2)}
                </span>
                <button onClick={()=>{handleSave(menu)}}

        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <FolderIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Save Changes
      </button>
      <button onClick={handleCancel}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <XMarkIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Cancel
      </button>



              </div>
              <table className="table-auto">
                <thead>
                  <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Name</th>


<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Supplier</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"> Alternatives
</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Weight or Quantity</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Profit Margin</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
New Profit Margin</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Difference</th>

                    </tr>
                </thead>

                 
                <tbody className="divide-y divide-gray-200">
                {menu.Ingredients && menu.Ingredients.map((ingredient, i) => {
  const alternatives = getAlternatives(ingredient.matchCode);
  return (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{ingredient.name}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{ingredient.supplier}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <select className="dropdown" onChange={(e) => handleSelectChange(e, ingredient, i)}>
                            <option value="">Select</option>
                            {alternatives.map((alt, j) => (
                              <option key={j} value={alt.id}>
                                {alt.Name} -
                                {alt.Supplier}
                                
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {ingredient.weight > 0 ? ingredient.weight : ingredient.quantity}
                        </td>

                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{ingredient.price.toFixed(2)}</td>

                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
  {newPrices[i] ? newPrices[i].toFixed(2) : ingredient.price.toFixed(2)}
</td>
<td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0 ${ingredient.price - newPrices[i] < 0 ? 'text-red-500' : 'text-green-500'}`}>
  {(ingredient.price - newPrices[i]).toFixed(2)}
</td>

                       
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
}
