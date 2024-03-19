
  import { useEffect, useState } from 'react'
    import { DataStore } from 'aws-amplify'
    import { HomeCookedCollection } from '../models'
    import HomeCookedFinance from './homecookedfinance'
    import HomeCookedHistory from './homecookedhistory'





  
  export default function ListOrders() {

    const [homeCookedCollection, setHomeCookedCollection] = useState([]);


    const fetchHomeCookedCollection = async () => {
        const homeCookedCollection = await DataStore.query(HomeCookedCollection);
        setHomeCookedCollection(homeCookedCollection);
    }

useEffect(() => {
    fetchHomeCookedCollection();
}
, []);





    return (
      <div className="px-4 sm:px-6 lg:px-8 mt-10">
        

        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">  Home Cooked Business Center</h1>
           
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <img className="h-24 w-24 rounded-full" src='homecooked.png' alt="Avatar" />


           
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Order
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Collection Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Completed
                    </th>


                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {homeCookedCollection.map((item, index) => (
                    <tr key={index}>
                      
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <ol>
                      {item.HotItems.map((hotItem, hotIndex) => (
                        <li key={hotIndex}>{hotItem}</li>
                      ))}
                    </ol>
                  </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{item.Total.toFixed(2)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.CollectionTime}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.CreatedDate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Completed}</td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {index}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <HomeCookedFinance />

        <HomeCookedHistory />
      </div>
    )
  }
  