


import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Tab, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
  XMarkIcon,

} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Auth } from 'aws-amplify';
import { DataStore, Predicates } from 'aws-amplify';
import { Sessions, CafeOrder } from './models';
import { useEffect } from 'react';
import CustomerOrderProgress from './customerorderprogress'; 
import '../customer-pages/customerfont.css'
import { CheckIcon } from '@heroicons/react/20/solid'



import OrderBasket from './orderbasket'
import KidsMenu from './kidsmenu'
import { set } from 'date-fns';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TableOrder({ order }) {

  
  setInterval(() => {
    window.location.reload();

    
  }, 60000);



  const [truth, setTruth] = useState(false)
  const [kidsMenu, setKidsMenu] = useState(false)
  

console.log(order)

  
  if (truth === true) {
    return <OrderBasket order={order} />;
  }

  if (kidsMenu === true) {
    return <KidsMenu orders= {order} />;
  }

  return (
    <div className="bg-gray-50">
      <div>
        {/* Mobile menu */}

        <div>
          {/* Mobile filter dialog */}

          <main>
          <CustomerOrderProgress/>

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="py-24 text-center">
                <h1 className="text-4xl font-bold component-title tracking-tight text-gray-900">Order From Your Table</h1>

              </div>
              

              <section aria-labelledby="products-heading" className="mt-8">
                <h2 id="products-heading" className="sr-only">
                  Menu
                </h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">

                  <button onClick={()=> setKidsMenu(true)} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                      <img
                        src="https://media.giphy.com/media/fQYqqCuTxzmqEG6gDD/giphy.gif"
                        alt="Person using a pen to cross a task off a productivity paper card."
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-base font-medium component-title text-gray-900">
                      <h3>Kids Menu</h3>
                    </div>
                  </button>
                </div>
              </section>

             
              
            </div>
          </main>


        </div>
      </div>
    </div>
  )
}

