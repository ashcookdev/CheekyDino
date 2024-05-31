import React, { useState } from 'react';

export default function NonStockProductForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    Name: '',
    Price: '',
    Category: '',
    Description: '',
    Prep: '',
    Kitchen: 'false',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit function with the form data
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="Price"
          value={formData.Price}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="Category"
          value={formData.Category}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Prep Time (in minutes)</label>
        <input
          type="time"
          name="Prep"
          value={formData.Prep}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Kitchen</label>
        <select
          name="Kitchen"
          value={formData.Kitchen}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
