import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { KitchenMenu } from './models';
import NonStockProductForm from './nonstockproductform';

export default function Example() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productList = await DataStore.query(KitchenMenu);
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await DataStore.delete(KitchenMenu, productId);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddNonStockProduct = async (formData) => {
    try {
      await DataStore.save(
        new KitchenMenu({
          ...formData,
          Price: parseFloat(formData.Price),
          Kitchen: false
        })
      );
      setShowForm(false);
      fetchProducts();
      window.location.reload();
    } catch (error) {
      console.error('Error creating non-stock product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setNewPrice(product.Price.toString());
  };

  const handleUpdatePrice = async () => {
    try {
      const updatedProduct = KitchenMenu.copyOf(editProduct, (updated) => {
        updated.Price = parseFloat(newPrice);
        const updatedProfitMargin = calculateProfitMargin(updated);
        updated.ProfitMargin = isNaN(updatedProfitMargin) ? null : updatedProfitMargin;
      });
  
      await DataStore.save(updatedProduct);
  
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };
  
  
  

  const calculateProfitMargin = (newPrice) => {
    // Calculate profit margin based on the new price and the original profit margin
    const originalPrice = editProduct.Price;
    const originalProfitMargin = editProduct.ProfitMargin;
    const profit = newPrice - originalPrice;
    const updatedProfitMargin = ((profit / newPrice) * 100).toFixed(2);
    return updatedProfitMargin;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products including their name, price, profit margin, stock level, ingredients, and kitchen status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {showForm ? 'Close Form' : 'Add Non Stock product'}
          </button>
        </div>
      </div>
      {editProduct && (
        <div className="mt-4 p-4 border rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Edit {editProduct.Name}</h2>
          <div className="mt-2">
            <label className="block text-gray-700 font-medium">New Price:</label>
            <input
              type="number"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <div className="mt-4 space-x-2">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-700"
              onClick={handleUpdatePrice}
            >
              Update Price
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-400"
              onClick={() => setEditProduct(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showForm && <NonStockProductForm onSubmit={handleAddNonStockProduct} />}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Profit Margin
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock Level
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ingredients
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Kitchen
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.Name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.Price}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
  {product.ProfitMargin !== null ? `${product.ProfitMargin.toFixed(2)}%` : ''}
</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.StockLevel}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
  {product.Ingredients ? (
    product.Ingredients.map((ingredient, index) => (
      <div key={index}>
        {ingredient.name}: {ingredient.weight}g or Quantity: {ingredient.quantity}
      </div>
    ))
  ) : (
    ''
  )}
</td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.Kitchen ? 'Yes' : 'No'}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-purple-600 hover:text-indigo-900"
                      >
                        Edit <span className="sr-only">, {product.Name}</span>
                      </button>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-indigo-900">
                        Delete <span className="sr-only">, {product.Name}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
