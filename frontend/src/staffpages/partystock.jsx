import { useState, useEffect } from "react";
import { PartyBooking, PartyGuests, KitchenMenu, StockControl } from "../models";
import { DataStore } from "aws-amplify";
import { startOfDay, addDays, format } from 'date-fns';
import { PieChart, Pie, Cell } from 'recharts';

export default function PartyStock() {
  const [partyBookings, setPartyBookings] = useState([]);
  const [partyGuests, setPartyGuests] = useState([]);
  const [partyFoodItems, setPartyFoodItems] = useState([]);
  const [ingredientTotals, setIngredientTotals] = useState({});
  const [currentStockLevels, setCurrentStockLevels] = useState({});
  const [today, setToday] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(addDays(today, 7));
  const [currentStockPrices, setCurrentStockPrices] = useState({});


  async function fetchPartyBookings() {
    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 7);

setToday(today);
setTomorrow(tomorrow);


    // Query for PartyBooking
    const allPartyBookings = await DataStore.query(PartyBooking);
    const partyBookings = allPartyBookings.filter(
      (booking) =>
        new Date(booking.PartyDate) >= today && new Date(booking.PartyDate) < tomorrow
    );
    setPartyBookings(partyBookings);

    // Query for PartyGuests
    let allPartyGuests = [];
    for (const partyBooking of partyBookings) {
      const guests = await DataStore.query(PartyGuests);
      let filteredGuests = guests.filter((guest) => guest.partybookingID === partyBooking.id);
      allPartyGuests = [...allPartyGuests, ...filteredGuests];
    }
    setPartyGuests(allPartyGuests);

    // Query for KitchenMenu
    const kitchenMenuItems = await DataStore.query(KitchenMenu);
    const partyFoodItems = kitchenMenuItems.filter((item) => item.Category === "Party Food");
    setPartyFoodItems(partyFoodItems);

    // Calculate ingredient totals
    const ingredientTotals = {};
    allPartyGuests.forEach(guest => {
      const matchingMeal = partyFoodItems.find(meal => meal.Name === guest.FoodOption);
      if (matchingMeal) {
        console.log(`Found matching meal for guest ${guest.id}: ${matchingMeal.Name}`);
        const ingredients = matchingMeal.Ingredients;
        ingredients.forEach(ingredient => {
          if (!ingredientTotals[ingredient.name]) {
            ingredientTotals[ingredient.name] = { quantity: 0, weight: 0 };
          }
          ingredientTotals[ingredient.name].quantity += ingredient.quantity;
          ingredientTotals[ingredient.name].weight += ingredient.weight;
        });
      }
    });
    setIngredientTotals(ingredientTotals);

    // Check stock levels
    const stockItems = await DataStore.query(StockControl);
const currentStockLevels = {};
const currentStockPrices = {};
Object.entries(ingredientTotals).forEach(([ingredientName, ingredientTotal]) => {
  const matchingStockItem = stockItems.find(item => item.Name === ingredientName);
  if (matchingStockItem) {
    console.log(`Found matching stock item for ingredient ${ingredientName}: ${matchingStockItem.Name}`);
    currentStockLevels[ingredientName] = matchingStockItem.CurrentStockLevel;
    currentStockPrices[ingredientName] = matchingStockItem.Price;
  }
});
console.log(currentStockPrices
  )
  
setCurrentStockLevels(currentStockLevels);
setCurrentStockPrices(currentStockPrices);
  }

  // find out price of each stock item

  
    const people = [
      {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        email: '@janecooper',
        role: 'Admin',
      },

      
    ]




  useEffect(() => {
    fetchPartyBookings();
  }, []);

  // Define colors for pie chart
  const COLORS = ['#0088FE', '#00C49F'];

// format today and tomorrow 

const formattedToday = format(today, 'dd/MM/yyyy');
const formattedTomorrow = format(tomorrow, 'dd/MM/yyyy');

  return (
    <div className="flex flex-col sm:flex-row">
    <div className="w-full sm:w-1/3">
      <h1 className="text-2xl flex justify-center font-semibold mb-4">Party Stock</h1>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <p className="mr-2">From:</p>
            <p className="font-semibold">{formattedToday}</p>
          </div>
          <div className="flex items-center">
            <p className="mr-2">To:</p>
            <p className="font-semibold">{formattedTomorrow}</p>
          </div>
         
          
        </div>
       
          <p className="mt-3 text-sm text-gray-500">This is based upon your current Stock Levels</p>



  
        {Object.entries(ingredientTotals).map(([ingredientName, ingredientTotal]) => {
          let currentStockLevel;
          if (currentStockLevels[ingredientName]) {
            currentStockLevel = currentStockLevels[ingredientName];
            if (currentStockLevel > (ingredientTotal.quantity || ingredientTotal.weight)) {
              const stockLeft = currentStockLevel - (ingredientTotal.quantity || ingredientTotal.weight);
              const stockUsedPercentage = ((ingredientTotal.quantity || ingredientTotal.weight) / currentStockLevel) * 100;
              const portionsLeft = stockLeft / (ingredientTotal.quantity || ingredientTotal.weight);
                
              return (
                <div key={ingredientName} className="items-center shadow-md rounded-lg p-4 bg-white text-center">
                  <h2 className="text-lg font-semibold">{ingredientName}</h2>
                  
                  
                  <PieChart width={600} height={300}>
                    <Pie dataKey="value" data={[{ name: 'Current Stock Level', value: currentStockLevel }, { name: 'Ingredient Total', value: (ingredientTotal.quantity || ingredientTotal.weight) }]} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
                      {[{ name: 'Current Stock Level', value: currentStockLevel }, { name: 'Ingredient Total', value: (ingredientTotal.quantity || ingredientTotal.weight) }].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#a78bfa', '#d6bcfa'][index % 2]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="mt-4" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: 'purple' }}>
  <p className="mt-1">Stock left: {stockLeft}</p>
  <p>Stock Used: {stockUsedPercentage.toFixed(2)}%</p>
</div>

                  <div className="mt-4 flex justify-between" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', color: 'purple' }}>
                    {[{ name: 'Current Stock Level', value: currentStockLevel }, { name: 'Ingredient Total', value: (ingredientTotal.quantity || ingredientTotal.weight) }].map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center mr-4">
                        <div className={`w-4 h-4 rounded-full mr-2 bg-${['purple-500', 'purple-200'][index % 2]}`} />
                        <span>{entry.name}</span>
                        <span className="ml-2">{entry.value}</span>
                        
                      </div>
                      
                    ))}
                  </div>
                 
                </div>
              );
            }
          }
          return null;
        })}
      </div>
      <div className="w-full sm:w-2/3 p-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Stock Items</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the stock items including their name, price, percentage used, and cost.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Stock Item
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Percentage Used
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {Object.entries(ingredientTotals).map(([ingredientName, ingredientTotal]) => {
                      let currentStockLevel;
                      let stockPrice;
                      let stockUsedPercentage;
                      let cost;
                      if (currentStockLevels[ingredientName]) {
                        currentStockLevel = currentStockLevels[ingredientName];
                        stockPrice = currentStockPrices[ingredientName];
                        stockUsedPercentage = ((ingredientTotal.quantity || ingredientTotal.weight) / currentStockLevel) * 100;
                        cost = (stockUsedPercentage / 100) * stockPrice;
                      }
                      return (
                        <tr key={ingredientName}>
                          <td className={`whitespace-no-wrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 ${stockUsedPercentage && stockUsedPercentage < 50 ? 'bg-red' : 'bg-green'}`}>
                            {ingredientName}
                          </td>
                          <td className={`whitespace-no-wrap px-3 py-4 text-sm text-gray-500 ${stockUsedPercentage && stockUsedPercentage < 50 ? 'bg-red' : 'bg-green'}`}>
                            £{stockPrice}
                          </td>
                          <td className={`whitespace-no-wrap px-3 py-4 text-sm text-gray-500 ${stockUsedPercentage && stockUsedPercentage < 50 ? 'bg-red' : 'bg-green'}`}>
                            {stockUsedPercentage && stockUsedPercentage.toFixed(2)}%
                          </td>
                          <td className={`whitespace-no-wrap px-3 py-4 text-sm text-gray-500 ${stockUsedPercentage && stockUsedPercentage < 50 ? 'bg-red' : 'bg-green'}`}>
                            £{cost && cost.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
  
  
  
    }  
