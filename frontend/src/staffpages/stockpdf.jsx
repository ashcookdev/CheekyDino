import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import config from '../openai'; // Adjust the path if necessary
import { CogIcon } from '@heroicons/react/20/solid';
import { DataStore } from 'aws-amplify';
import { StockControl } from '../models';
import { set } from 'lodash';

//  only allow access if running in electron



function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [populate, setPopulate] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

  // Initialize OpenAI with your API key
  const openai = new OpenAI({ dangerouslyAllowBrowser: true,
    apiKey: config.OPENAI_API_KEY,
  });

  


  let ipcRenderer = false;

  console.log(data);
  // Check if code is running in Electron
  if (window && window.process && window.process.type) {
    ipcRenderer = window.require('electron').ipcRenderer;
  }

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on('file-content', async (event, jsonString) => {
        const textContent = JSON.parse(jsonString);
        const lines = textContent.items.map(item => item.str);

        setLoading(true);

  
        // Find the index of the "STD" line
const stockControlSchema =
        {
            "type": "StockControl",
            "@model": {},
            "@auth": {
              "rules": [
                {
                  "allow": "private"
                }
              ]
            },
            "Name": "String",
            "Weight": "Int",
            "Quantity": "Int",
            "Price": "Float",
            "PreVAT": "Float",
            "Supplier": "String",
            "VAT": "Float",
            "CurrentStockLevel": "Int",
            "kitchenmenus": {
              "[KitchenMenu]": {
                "@manyToMany": {
                  "relationName": "KitchenMenuStockControl"
                }
              }
            },
            "Cases": "Int",
            "ProductId": "String",
          }
          

  

  
  
        try {
          openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.'},
              { role: 'user', content: lines.join(' ') + ' ' + JSON.stringify(stockControlSchema) },
              {
                role: 'user',
                content: "Please return each product's information in JSON format using the provided schema fields. please add the product code into 'ProductId' field as on the schema, Please Add Description as 'Name', and Supplier is the name of the Company. If the pack size is more than 1, set 'Quantity' to the pack size and 'Weight' to 0. If the pack size is 1, set 'Weight' to the weight of the item (in grams if it's in kg) and 'Quantity' to 0. 'Cases' should reflect the quantity that has been bought. The 'Current Stock Level' should be updated with either the 'Quantity' or 'Weight', depending on which is applicable. The 'Supplier' is the company. Please start the response with [ and end with ]."
              }
                          ],
          }).then((chatCompletion) => {
            console.log('Response from OpenAI API:', chatCompletion.choices[0].message.content);
            
            setApiResponse(chatCompletion.choices[0].message.content);  // Store the response in the state
            setPopulate(true);
          });
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      });
  
      return () => {
        ipcRenderer.removeAllListeners('file-content');
      };
    }
  }, [ipcRenderer]);
  
  // This is the new useEffect hook that listens for changes in apiResponse

useEffect(() => {
    if (apiResponse) {
      crossReferenceDatabaseAndPopulateTable();
      setPopulate(true);
    }
  }, [apiResponse]);

  const crossReferenceDatabaseAndPopulateTable = async () => {
    // Find the index of the first [ and the last ]
    const startIndex = apiResponse.indexOf('[');
    const endIndex = apiResponse.lastIndexOf(']') + 1;  // +1 to include the ] in the slice
  
    // Slice the apiResponse string from the first [ to the last ]
    const jsonString = apiResponse.slice(startIndex, endIndex);
  
    // Parse the JSON string into a JavaScript object
    const parsedData = JSON.parse(jsonString);
  
    // Fetch all items from the StockControl model
    const allStockItems = await DataStore.query(StockControl);
  
    const newTableData = await Promise.all(parsedData.map(async product => {
      // Filter the stock items that match the ProductId
      const matchingStockItems = allStockItems.filter(item => item.ProductId === product.ProductId);
  
      const existsInDatabase = matchingStockItems.length > 0;
      const databasePrice = existsInDatabase ? matchingStockItems[0].Price : null;
  
      return {
        ...product,
        existsInDatabase,
        databasePrice,
      };
    }));
  
    setTableData(newTableData);
    setPopulate(false);
  };
  

  

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const handleSubmit = () => {
    console.log("submitting file");
    setLoading(true);

    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        if (ipcRenderer) {
          // send the file content to the main process in Electron
          ipcRenderer.send('file-uploaded', event.target.result);
        } else {
          // handle the file content in the browser
          const buffer = new Uint8Array(event.target.result);
          pdfParse(buffer).then(function(data) {
            setData(data.text);
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpdate = async (item) => {  
    if (item.existsInDatabase) {
      console.log(item);
      console.log(item.ProductId);
  
      const itemId = item.ProductId;
      console.log(itemId);  
  
      // Query the stock item from the database
      const originalItems = await DataStore.query(StockControl);
      const filterProduct = originalItems.filter(item => item.ProductId === itemId);
      console.log(filterProduct);
  
      if (filterProduct.length > 0) {
        const updatedItem = await DataStore.save(
          StockControl.copyOf(filterProduct[0], (updated) => {
            updated.Price = item.Price;
            updated.Quantity = item.Quantity;
            updated.Weight = item.Weight;
            updated.Cases = item.Cases;
            updated.CurrentStockLevel = item.Weight !== 0 ? item.Weight : item.Quantity;
          })
        );
  
        const updatedTableData = tableData.map(i => i.ProductId === updatedItem.ProductId ? updatedItem : i);
        setTableData(updatedTableData);
        console.log(updatedItem, "updatedItem");
      } else {
        console.log(`No item found with ProductId: ${itemId}`);
      }
    } else {
      // Create a new stock item
      const newItem = await DataStore.save(new StockControl(item));
      const updatedTableData = tableData.map(i => i.ProductId === item.ProductId ? newItem : i);
      setTableData(updatedTableData);
      console.log(newItem, "newItem");
    }
  }
  
  

  return (

<div className="bg-white px-6 py-24 sm:py-32 lg:px-8">

    <div className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-fuchsia-400 via-blue-100 to-purple-300 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-5">AI Assisted Invoice Reading</h2>
        {populate && <p className="text-2xl animate-pulse text-indigo-500">Populating table</p>}
        {loading && <p className="text-2xl animate-pulse text-indigo-500">AI Generating</p>}
        

        <div className='flex justify-center gap-2'>

        <input 
      type="file" 
      accept=".pdf" 
      onChange={handleFileChange} 
      className="hidden" 
      id="file-upload"
    />
    <label htmlFor="file-upload" className="inline-flex items-center gap-x-2 rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Select PDF
    </label>
    <button onClick={handleSubmit}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
Generate        <CogIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </button>
    {fileName && <p className="text-gray-700">Selected file: {fileName}</p>}


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
Code</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Description</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Supplier</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Database Price</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Invoice Price</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Quantity</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Weight</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Cases</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
VAT</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Exists in Database</th>
<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {tableData.map((item, index) => (
        <tr key={index} className={item.existsInDatabase ? 'bg-green-100' : 'bg-blue-100'}>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.ProductId}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Supplier}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{item.databasePrice}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{item.Price}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Quantity}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Weight}g</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Cases}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.VAT}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.existsInDatabase ? 'Yes' : 'No'}</td>
           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <button onClick={() => handleUpdate(item)} className="bg-indigo-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
              {item.existsInDatabase ? 'Update' : 'Add Stock Item'}
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

export default App;
