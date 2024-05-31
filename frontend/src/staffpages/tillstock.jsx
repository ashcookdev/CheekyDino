import { DataStore } from "aws-amplify";
import { KitchenMenu, StockControl } from "../models";

export async function checkStockLevel(kitchenMenuItemId) {
  // Get the KitchenMenu item by ID
  const kitchenMenuItem = await DataStore.query(KitchenMenu, kitchenMenuItemId);

  // Get the IDs of the associated StockControl items
  const stockControlIds = kitchenMenuItem.Ingredients.map(
    (ingredient) => ingredient.id
  );

  // Query the DataStore for all StockControl items
  const allStockControls = await DataStore.query(StockControl);

  // Filter the StockControl items to only include those with IDs in stockControlIds
  const stockControls = allStockControls.filter((stockControl) =>
    stockControlIds.includes(stockControl.ID)
  );

  // Check the stock level of each StockControl item
  for (const stockControl of stockControls) {
    const ingredient = kitchenMenuItem.Ingredients.find(
      (ingredient) => ingredient.id === stockControl.ID
    );

    if (ingredient) {
      const requiredStockLevel =
        ingredient.weight > 0 ? ingredient.weight : ingredient.quantity;
      if (stockControl.StockLevel < requiredStockLevel) {
        return false;
      }
    }
  }

  return true;
}
