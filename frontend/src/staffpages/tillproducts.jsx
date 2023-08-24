import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { SoftDrinks, HotDrinks, Confectionary, KitchenMenu } from './models';

export default function TillProducts() {
  const [menu, setKidsMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Cold Drinks');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    Name: '',
    Price: '',
    Description: '',
  });

  console.log(selectedCategory)
  console.log(editingProduct)

  useEffect(() => {
    const fetchStaffs = async () => {
      const coldDrinks = await DataStore.query(SoftDrinks);
      const hotDrinks = await DataStore.query(HotDrinks);
      const confectionary = await DataStore.query(Confectionary);
      const kidsMenu = await DataStore.query(KitchenMenu);
      setKidsMenu({
        'Cold Drinks': coldDrinks,
        'Hot Drinks': hotDrinks,
        'Confectionary': confectionary,
        'Kids Menu': kidsMenu,
      });
    };

    fetchStaffs();
  }, []);

  function handleUpdate(product) {
    setEditingProduct({
      ...product,
      model: selectedCategory,
    });
  }
  
  async function handleDelete(product) {
    await DataStore.delete(product);
  }

  function handleNameChange(newName) {
    setEditingProduct((prevEditingProduct) => ({
      ...prevEditingProduct,
      Name: newName,
    }));
  }

  function handlePriceChange(newPrice) {
    setEditingProduct((prevEditingProduct) => ({
      ...prevEditingProduct,
      Price: newPrice,
    }));
  }

  function handleDescriptionChange(newDescription) {
    setEditingProduct((prevEditingProduct) => ({
      ...prevEditingProduct,
      Description: newDescription,
      
    }));
  }

  const categoryToModel = {
    'Cold Drinks': SoftDrinks,
    'Hot Drinks': HotDrinks,
    "Confectionary": Confectionary,
    'Kids Menu': KitchenMenu,
  };
  
  async function handleSubmit() {
    const Model = categoryToModel[selectedCategory];
  
    await DataStore.save(
      Model.copyOf(editingProduct, (updated) => {
        updated.name = editingProduct.Name;
        updated.price = editingProduct.Price;
        updated.description = editingProduct.Description;
      })
    );
    setEditingProduct(null);
  }
  

  async function handleAddNew() {
    const Model =
      selectedCategory === 'Cold Drinks'
        ? SoftDrinks
        : selectedCategory === 'Hot Drinks'
        ? HotDrinks
        : selectedCategory === 'Confectionary'
        ? Confectionary
        : KitchenMenu;

    await DataStore.save(
      new Model({
        name: newProduct.Name,
        price: newProduct.Price,
        description: newProduct.Description,
      })
    );
    setNewProduct({ Name: '', Price: '', Description: '' });
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Till Products
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Products
            </label>
            <select
              id="location"
              name="location"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="Cold Drinks"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>Cold Drinks</option>
              <option>Hot Drinks</option>
              <option>Confectionary</option>
              <option>Kids Menu</option>
              <option>Breakfast Menu</option>
            </select>
          </div>
        </div>
      </div>
      {editingProduct && (
        <>
          <h2>Edit Product</h2>
          <label>Name:</label>
          <input
            type="text"
            value={editingProduct.Name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <br />
          <label>Price:</label>
          <input
            type="text"
            value={editingProduct.Price}
            onChange={(e) => handlePriceChange(e.target.value)}
          />
          <br />
          <label>Description:</label>
          <input
            type="text"
            value={editingProduct.Description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
      <h2>Add New Product</h2>
      <label>Name:</label>
      <input
        type="text"
        value={newProduct.Name}
        onChange={(e) =>
          setNewProduct((prevNewProduct) => ({
            ...prevNewProduct,
            Name: e.target.value,
          }))
        }
      />
      <br />
      <label>Price:</label>
      <input
        type="text"
        value={newProduct.Price}
        onChange={(e) =>
          setNewProduct((prevNewProduct) => ({
            ...prevNewProduct,
            Price: e.target.value,
          }))
        }
      />
      <br />
      <label>Description:</label>
      <input
        type="text"
        value={newProduct.Description}
        onChange={(e) =>
          setNewProduct((prevNewProduct) => ({
            ...prevNewProduct,
            Description: e.target.value,
          }))
        }
      />
      <br />
      <button onClick={handleAddNew}>Add New</button>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {menu[selectedCategory] &&
                  menu[selectedCategory].map((product) => (
                    <tr key={product.Name}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.Name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        £{product.Price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.Description}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          type="button"
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleUpdate(product)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="ml-4 text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(product)}
                        >
                          Delete
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
