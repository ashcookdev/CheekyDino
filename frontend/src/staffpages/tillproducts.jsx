import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { KitchenMenu } from '../models';
import NonStockProductForm from './nonstockproductform';

export default function Example() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [Name, setProductName] = useState('');
  const [Description, setDescription] = useState('');
  const [Kitchen, setKitchen] = useState(false);
  const [Prep, setHandlePrep] = useState('');
  const [Category, setCategory] = useState('');
  const [Stock, setStock] = useState(false);
  const [searchQuery, setSearch] = useState('');
  
  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );


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

  
  
  const handleUpdatePrice = async () => {

const awspreptime = Prep + ':00';



    try {
      const updatedProduct = KitchenMenu.copyOf(editProduct, (updated) => {
        updated.Price = parseFloat(newPrice);
        const updatedProfitMargin = calculateProfitMargin(updated);
        updated.ProfitMargin = isNaN(updatedProfitMargin) ? null : updatedProfitMargin;
        updated.Name = Name;
        updated.Description = Description;
        updated.Kitchen = Kitchen;
        updated.Prep = Prep;
        updated.Category = Category;
        updated.StockLevel = Number(Stock);

      });
  
      await DataStore.save(updatedProduct);
  
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  
  const handleEdit = (product) => {
    setEditProduct(product);
  }
  
  const handleDeleteExtras = async (product) => {
    try {
      const updatedProduct = KitchenMenu.copyOf(product, (updated) => {
        updated.Extras = [];
      });
      await DataStore.save(updatedProduct);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting extras:', error);
    }
  };


  
  

  const calculateProfitMargin = (newPrice) => {
    // Check if Price and ProfitMargin are defined
    if (editProduct && typeof editProduct.Price !== 'undefined' && typeof editProduct.ProfitMargin !== 'undefined') {
      // Calculate profit margin based on the new price and the original profit margin
      const originalPrice = editProduct.Price;
      const originalProfitMargin = editProduct.ProfitMargin;
      const profit = newPrice - originalPrice;
      const updatedProfitMargin = ((profit / newPrice) * 100).toFixed(2);
      return updatedProfitMargin;
    }
    // Return null if Price or ProfitMargin is undefined
    return null;
  };
  

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5">
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
      <label className="block text-gray-700 font-medium">Name:</label>
      <input
        type="text"
        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
        value={Name}
        onChange={(e) => setProductName(e.target.value)}
      />
    </div>
    <div className="mt-2">
      <label className="block text-gray-700 font-medium">Price: {editProduct.Price}</label>
      <input
        type="number"
        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
    </div>
    <div className="mt-2">
      <label className="block text-gray-700 font-medium">Description: {editProduct.Description}</label>
      <textarea
        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
   
    <div className="mt-2">
      <label className="block text-gray-700 font-medium">Kitchen: {editProduct.Kitchen}</label>
      <input
        type="checkbox"
        className="mt-1"
        checked={Kitchen}
        onChange={(e) => setKitchen(e.target.checked)}
      />
    </div>
    
    <div className="mt-2">
      <label className="block text-gray-700 font-medium">Prep: {editProduct.Prep}</label>
      <input
        type="time"
        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
        value={Prep}
        onChange={(e) => setHandlePrep(e.target.value)}
      />
    </div>
{/* ... Previous code ... */}



<div className="mt-2">
  <label className="block text-gray-700 font-medium">Category:</label>
  <input
    type="text"
    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
    value={Category}
    onChange={(e) => setCategory(e.target.value)}
  />
</div>


<div className="mt-2">
  <label className="block text-gray-700 font-medium">Current Stock Level: {editProduct.StockLevel}</label>
  <input
  type='number'
    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
    value={Stock}
    onChange={(e) => setStock(e.target.value)}
  />
</div>

    <div className="mt-4 space-x-2">
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-700"
        onClick={handleUpdatePrice}
      >
        Update
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
      <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
        <input onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          value={searchQuery}
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
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
Difference                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Profit Margin
                  </th>
<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Margin Percentage

                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock Level
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
Category                  </th>

                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ingredients
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Extras
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
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.Name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{product.Price.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
  {product.ProfitMargin !== null ? `£${product.ProfitMargin.toFixed(2)}` : ''}
</td>
<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
  £{(() => {
    if (product.Price && product.ProfitMargin) {
      const result = product.Price.toFixed(2) - product.ProfitMargin.toFixed(2);
      return (result === 0 || result === null) ? null : result.toFixed(2);
    }
    return null;
  })()}
</td>


<td className="whitespace-nowrap px-3 py-4 text-sm text-green-500">
  {product.Price !== null ? `${((product.ProfitMargin / product.Price) * 100).toFixed(1)}%` : ''}
</td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.StockLevel}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.Category}</td>
                    <td className="whitespace-nowrap px-3 py-4 text;o-sm text-gray-500">
  {product.Ingredients ? (
    product.Ingredients.map((ingredient, index) => (
      <div key={index}>
        {ingredient.name}: {ingredient.weight}g or Quantity: {ingredient.quantity}: Price £{ingredient.price.toFixed(2)}
      </div>
    ))
  ) : (
    ''
  )}
</td>
<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
  {product.Extras ? (
    product.Extras.map((extra, index) => (
      <div key={index}>
        Name: {extra.name}, Price: £{extra.price}
      </div>
    ))
  ) : (
    ''
  )}
  <button
    onClick={() => handleDeleteExtras(product)}
    className="mt-2 text-red-600 hover:text-red-900"
  >
    Delete Extras
  </button>
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
