


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

import OrderBasket from './orderbasket'
import KidsMenu from './kidsmenu'






const products1 = [
  {
    id: 1,
    name: 'Kids Menu',
    href: '/order/kidsmenu',
    price: '',
    description: '',
    imageSrc: 'https://media.giphy.com/media/fQYqqCuTxzmqEG6gDD/giphy.gif',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 2,
    name: 'Focus Card Holder',
    href: '#',
    price: '$64',
    description: 'Walnut',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  },
  {
    id: 3,
    name: 'Focus Carry Pouch',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  // More products...
]
const products2 = [
  {
    id: 7,
    name: 'Electric Kettle',
    href: '#',
    price: '$149',
    description: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-07.jpg',
    imageAlt: 'Close up of long kettle spout pouring boiling water into pour-over coffee mug with frothy coffee.',
  },
  {
    id: 8,
    name: 'Leather Workspace Pad',
    href: '#',
    price: '$165',
    description: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-08.jpg',
    imageAlt:
      'Extra large black leather workspace pad on desk with computer, wooden shelf, desk organizer, and computer peripherals.',
  },
  {
    id: 9,
    name: 'Leather Long Wallet',
    href: '#',
    price: '$118',
    description: 'Natural',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-09.jpg',
    imageAlt:
      'Leather long wallet held open with hand-stitched card dividers, full-length bill pocket, and simple tab closure.',
  },
  // More products...
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TableOrder({ order }) {

 

  const [truth, setTruth] = useState(false)
  const [kidsMenu, setKidsMenu] = useState(false)


  if (truth === true) {
    return <OrderBasket order={order} />;
  }

  if (kidsMenu === true) {
    return <KidsMenu orders= {order} />;
  }


  // 
  return (
    <div className="bg-gray-50">
      <div>
        {/* Mobile menu */}

        <div>
          {/* Mobile filter dialog */}

          <main>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="py-24 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Order From Your Table</h1>

              </div>
              {order.length > 0 && (
                <div className="flex items-center mt-10 mb-10">

                  <button onClick={() => setTruth(true)} className="px-4 py-2 bg-indigo-500 rounded-md">Checkout</button>
                  <div className="relative ml-4">
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span className="absolute top-0 right-0 text-xs bg-red-500 rounded-full px-1 text-white">
                      {order.length}
                    </span>
                  </div>
                </div>
              )}

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
                    <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                      <h3>Kids Menu</h3>
                    </div>
                  </button>
                </div>
              </section>

              <section aria-labelledby="featured-heading" className="relative mt-16 overflow-hidden rounded-lg lg:h-96">
                <div className="absolute inset-0">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/category-page-01-featured-collection.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
                <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
                <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
                  <div>
                    <h2 id="featured-heading" className="text-xl font-bold text-white">
                      Workspace Collection
                    </h2>
                    <p className="mt-1 text-sm text-gray-300">
                      Upgrade your desk with objects that keep you organized and clear-minded.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
                  >
                    View the collection
                  </a>
                </div>
              </section>

              <section aria-labelledby="more-products-heading" className="mt-16 pb-24">
                <h2 id="more-products-heading" className="sr-only">
                  More products
                </h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {products2.map((product) => (
                    <a key={product.id} href={product.href} className="group">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm italic text-gray-500">{product.description}</p>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </main>


        </div>
      </div>
    </div>
  )
}

