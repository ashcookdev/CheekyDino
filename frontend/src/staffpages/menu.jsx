import React, { useState, useEffect } from 'react';
import { DataStore, Predicates } from 'aws-amplify';
import { KitchenMenu } from '../models';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const items = await DataStore.query(KitchenMenu);
      const uniqueCategories = [...new Set(items.map((item) => item.Category))];
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  const fetchMenuItemsByCategory = async (category) => {
    try {
      const items = await DataStore.query(KitchenMenu, Predicates.ALL);
      const filteredItems = items.filter((item) => item.Category === category);
      setMenuItems(filteredItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchMenuItemsByCategory(category);
  };

  const handleOrder = (product) => {
    const newOrder = {
      product: product.Name,
      price: product.Price,
      category: product.Category,
    };

    setSelectedProducts((prevProducts) => [...prevProducts, newOrder]);
  };

  const handleCheckout = () => {
    // Handle checkout logic here
    console.log('Checkout button clicked!');
  };


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="flex items-center mt-10 mb-10">
          {categories.length > 0 && (
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {categories.map((category) => (
                    <a
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`${
                        selectedCategory === category
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer`}
                    >
                      {category}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
        {selectedProducts.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md mb-8">
            <h3 className="text-lg font-semibold mb-2">Selected Items:</h3>
            <ul className="list-disc pl-6">
              {selectedProducts.map((product, index) => (
                <li key={index}>{product.product} - £{product.price.toFixed(2)}</li>
              ))}
            </ul>
            <button onClick={handleCheckout} className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md">
              Checkout
            </button>
          </div>
        )}

        {selectedCategory && (
          <ul role="list" className="divide-y divide-gray-100">
            {menuItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.Name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.Description}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button onClick={() => handleOrder(item)} className="px-4 py-2 bg-green-500 rounded-md">
                    Order
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

       
      </div>
    </div>
  );
}
