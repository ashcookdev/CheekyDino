import { DataStore } from "aws-amplify";
import { KitchenMenu } from "../models";

export async function StockControlEdit(stock, newWeightOrQuantity, newPrice) {
  // Query the DataStore for all KitchenMenuItems
  const kitchenMenuItems = await DataStore.query(KitchenMenu);

  // Find the matching ingredients
  const matchingIngredients = [];
  for (const item of kitchenMenuItems) {
    for (const ingredient of item.Ingredients) {
      if (ingredient.id === stock.id) {
        matchingIngredients.push({ item, ingredient });
      }
    }
  }

  // Calculate the number of portions and price per portion for each matching ingredient
  for (const { item, ingredient } of matchingIngredients) {
    const weightOrQuantity = ingredient.weight || ingredient.quantity;
    const price = ingredient.price;

    // Calculate the number of portions
    const portions = newWeightOrQuantity / weightOrQuantity;

    // Calculate the price per portion
    const pricePerPortion = newPrice / portions;

    console.log(`Number of Portions: ${portions}`);
    console.log(`Price per Portion: ${pricePerPortion}`);

    // Update the price of the matching ingredient
    const updatedItem = await DataStore.save(
      KitchenMenu.copyOf(item, updated => {
        updated.Ingredients = updated.Ingredients.map(ing => {
          if (ing.id === ingredient.id) {
            return { ...ing, price: pricePerPortion };
          } else {
            return ing;
          }
        });
      })
    );

    console.log('Updated item:', updatedItem);
  }
}
