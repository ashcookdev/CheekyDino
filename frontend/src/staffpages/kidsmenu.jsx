/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/20/solid'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
import {KidsMenu} from './models'
import {Extras} from './models'
import OrderBasket from './orderbasket'
import { ShoppingBagIcon } from '@heroicons/react/outline'
import Order from './order'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Kids({orders}) {


    const [kidsMenu, setKidsMenu] = useState([])
    const [extras, setExtras] = useState([])
    const [order, setOrder] = useState([])
    const [extra, setExtra] = useState([])
    const [truth, setTruth] = useState(false)
    const [mainMenu, setMainMenu] = useState(false)

    console.log(order)
    console.log(extra)

    // push orders prop into order array but only if it is not empty

    useEffect(() => {
  if (orders) {
    setOrder((prev) => [...prev, orders]);
  }
}, [orders]);




    

console.log(orders)
    



    const fetchKidsMenu = async () => {
        const kidsMenu = await DataStore.query(KidsMenu)
        setKidsMenu(kidsMenu)
    }

    const fetchExtras = async () => {
        const extras = await DataStore.query(Extras)
        setExtras(extras)
    }

    useEffect(() => {
        fetchExtras()}, []) 

    useEffect(() => {
        fetchKidsMenu()}, [])

        const handleExtrasChange = (index, extra) => {
            setExtra((prev) => {
              const newState = [...prev];
              if (newState.includes(extra)) {
                newState.splice(newState.indexOf(extra), 1);
              } else {
                newState.push(extra);
              }
              return newState;
            });
          };
          
          

          const handleSubmit = (product) => {
            setOrder((prev) => [
              ...prev,
              {
                product: product.Name,
                price: product.Price,
                extras: extra,
                imageSrc: product.imageSrc,
              },
            ]);
            setExtra([]);
          };
          
          
      
          if (truth === true) {
            return <OrderBasket order={order} />;
          }
      
          if (mainMenu === true) {
            return <Order order={order} />;
            }

            
        //map over the kidsMenu array and display the data
        //use the same format as the products array above

        //use the same format as the products array above

        

            
        
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        {order.length > 0 && (
  <div className="flex items-center mt-10 mb-10">
    <button onClick={()=> setMainMenu(true)} className="px-4 py-2 mr-4 bg-green-500 rounded-md">
      Order More
    </button>
    <button onClick={()=> setTruth(true)} className="px-4 py-2 bg-indigo-500 rounded-md">Checkout</button>
    <div className="relative ml-4">
      <ShoppingCartIcon className="h-6 w-6" />
      <span className="absolute top-0 right-0 text-xs bg-red-500 rounded-full px-1 text-white">
        {order.length}
      </span>
    </div>
  </div>
)}

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {kidsMenu.map((product) => (
            <div key={product.id} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                {product.Name}

                  <p className="mt-1 text-sm italic text-gray-500">{product.Description}</p>

                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-center">
                    



                  </div>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">£{product.Price}.00</p>
            
              </div>
              {extras.map((extra, index) => (
  <div key={extra.id} className="flex items-center">
    <input
      onChange={(e) =>
        handleExtrasChange(index, { name: extra.Name, price: extra.Price })
      }
      type="checkbox"
      name={extra.Name}
      id={extra.Name}
      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
    />
    <label
      htmlFor={extra.Name}
      className="ml-3 block text-sm font-medium text-gray-700"
    >
      {extra.Name} - £{extra.Price}
    </label>
  </div>
))}

                    <button
  onClick={(e) => handleSubmit(product)}
  type="submit"
  className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
>
  Add to Order
</button>

            </div>
            
          ))}
          
        </div>
        
      </div>
    </div>
  )
}
