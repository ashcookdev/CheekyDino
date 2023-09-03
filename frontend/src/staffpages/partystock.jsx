import { useState, useEffect } from "react";
import { PartyBooking, PartyGuests, KitchenMenu, StockControl } from "./models";
import { DataStore } from "aws-amplify";
import { startOfDay, addDays } from 'date-fns';
import { PieChart, Pie, Cell } from 'recharts';

export default function PartyStock() {
  const [partyBookings, setPartyBookings] = useState([]);
  const [partyGuests, setPartyGuests] = useState([]);
  const [partyFoodItems, setPartyFoodItems] = useState([]);
  const [ingredientTotals, setIngredientTotals] = useState({});
  const [currentStockLevels, setCurrentStockLevels] = useState({});

  async function fetchPartyBookings() {
    const today = startOfDay(new Date());
    const tomorrow = addDays(today, 7);

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
    Object.entries(ingredientTotals).forEach(([ingredientName, ingredientTotal]) => {
      const matchingStockItem = stockItems.find(item => item.Name === ingredientName);
      if (matchingStockItem) {
        console.log(`Found matching stock item for ingredient ${ingredientName}: ${matchingStockItem.Name}`);
        currentStockLevels[ingredientName] = matchingStockItem.CurrentStockLevel;
      }
    });
    setCurrentStockLevels(currentStockLevels);
  }

  useEffect(() => {
    fetchPartyBookings();
  }, []);

  // Define colors for pie chart
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <>
      {Object.entries(ingredientTotals).map(([ingredientName, ingredientTotal]) => {
        let currentStockLevel;
        if (currentStockLevels[ingredientName]) {
          currentStockLevel = currentStockLevels[ingredientName];
          if (currentStockLevel > (ingredientTotal.quantity || ingredientTotal.weight)) {
            return (
              <div key={ingredientName}>
                <h2>{ingredientName}</h2>
                <PieChart width={400} height={400}>
                  <Pie dataKey="value" data={[{ name: 'Current Stock Level', value: currentStockLevel }, { name: 'Ingredient Total', value: (ingredientTotal.quantity || ingredientTotal.weight) }]} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
                    {[{ name: 'Current Stock Level', value: currentStockLevel }, { name: 'Ingredient Total', value: (ingredientTotal.quantity || ingredientTotal.weight) }].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            );
          }
        }
        return null;
      })}
    </>
  );
}
