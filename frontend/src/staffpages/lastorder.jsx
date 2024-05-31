import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DataStore } from 'aws-amplify'
import { CafeOrder } from '../models'
import { format } from 'date-fns'

import { useEffect } from 'react'

const isElectron = window && window.process && window.process.type;
const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;




export default function LastOrder() {
  const [open, setOpen] = useState(true)

    const [lastOrder, setLastOrder] = useState(null)
    const [ticket, setTicket] = useState(false)


    if (open === false) {
        window.location.reload();
      }



  // find the last order placed by the customer

  const fetchLastOrder = async () => {
    // use createdAt to find the last order
    const orders = await DataStore.query(CafeOrder);
    const lastOrder = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    setLastOrder(lastOrder);
}


    useEffect(() => {
        fetchLastOrder();
    }
    , []);

if (ticket === true ) {
    // Print the ticket
    console.log('Printing ticket...');

    const data = {
      product: lastOrder.DrinkItems.concat(lastOrder.HotItems).join(', '),
      name: lastOrder.childName,
      method: "For Staff Use",
      table: lastOrder.Table,
      change: lastOrder.Change,
      price: lastOrder.Total,


    };


    // Send a message to the Electron main process to print the ticket
    ipcRenderer.send('cafe-print', { data });

    // Reset the ticket state
    setTicket(false);
  
}

useEffect(() => {
  // Check if ipcRenderer is available before using it
  if (ipcRenderer) {
    ipcRenderer.send('some-electron-event', { data: 'your-data' });

    ipcRenderer.on('electron-response', (event, responseData) => {
      console.log('Received response from Electron:', responseData);
    });
  }
}, []); // Empty dependency array ensures the effect runs once after the initial render




  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-contain bg-center bg-gradient-to-t from-indigo-700 via-sky-300 to-purple-600">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Last Order
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
  {lastOrder && (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-900"><strong className="font-bold">Created Time:</strong> {lastOrder.CreatedTime}</p>
      <p className="text-sm font-medium text-gray-900"><strong className="font-bold">Created Date:</strong> {lastOrder.CreatedDate}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Total:</strong> £{lastOrder.Total.toFixed(2)}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Drink Items:</strong> {lastOrder.DrinkItems.join(', ')}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Hot Items:</strong> {lastOrder.HotItems.join(', ')}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Table:</strong> {lastOrder.Table}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Completed:</strong> {lastOrder.Completed ? 'Yes' : 'No'}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Delivered:</strong> {lastOrder.Delieved ? 'Yes' : 'No'}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Notes:</strong> {lastOrder.Notes}</p>
      <p className='text-sm font-medium text-gray-900'><strong>Kitchen:</strong> {lastOrder.Kitchen ? 'Yes' : 'No'}</p>

      <button onClick={() => {setTicket(true)}} className="bg-indigo-600 text-white hover:bg-green-500 px-4 py-2 rounded-md mt-4">Print Ticket</button>

    </div>
  )}
</div>





                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
