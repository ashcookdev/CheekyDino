import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { SoftDrinks, HotDrinks, Confectionary } from './models';


export default function TillProducts () {
  const [KidsMenu, setKidsMenu] = useState([]);

  useEffect(() => {
    const fetchStaffs = async () => {
      const kids = await DataStore.query(SoftDrinks);
      const hot = await DataStore.query(HotDrinks);
        const conf = await DataStore.query(Confectionary);

        let array = kids.concat(hot);
        let array2 = array.concat(conf);

      setKidsMenu(array2);
    };
    fetchStaffs();
  }, []);
  



  
  

  


return (
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Till Products</h1>
        
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
       
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
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {KidsMenu.map((kidsmenu) => (
                <tr key={kidsmenu.Name}>
                
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{kidsmenu.Name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{kidsmenu.Price}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{kidsmenu.Description}</td>
                    <td className="px-3 py-4 text-sm font-medium text-right whitespace-nowrap">
                
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ml-4 text-red-600 hover:text-red-900"
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

    


    