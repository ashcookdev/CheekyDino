/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { DataStore } from 'aws-amplify'
import {CafeOrder} from './models'
import {Sessions} from './models'
import {Auth} from 'aws-amplify'
import CustomerOrderProgress from './customerorderprogress'
import { format, utcToZonedTime } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';




export default function Checkout({order}) {

  const navigate = useNavigate();



  console.log(order)

  const [orders, setOrder] = useState([])
  const [sessions, setSessions] = useState([])
  const [completed, setCompleted] = useState(false)
  const [orderId, setSessionId] = useState(null)


  useEffect(() => {
    setOrder(order)
    
  }, [order]);

  console.log(orders);
orders.forEach((order, index) => {
  console.log(`Order ${index}:`, order);
});


// get email from user

const [email, setEmail] = useState('')

useEffect(() => {
  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
    setEmail(user.attributes.email)
  }
  getUser()
}, [])

console.log(email)

// get session email and use to search for session, also Arrived = true, and LeftCenter = false and todays date

useEffect(() => {
  const fetchSessions = async () => {
    const models = await DataStore.query(Sessions);
    const filteredModels = models.filter(
      (c) =>
        c.Email === email &&
        c.Arrived === true &&
        c.LeftCenter === false 
    );
    setSessions(filteredModels);
  };
  fetchSessions();
}, [email]);


const totalCost = orders.reduce(
  (total, order) =>
    total +
    order.price * (order.quantity || 1) +
    order.extras.reduce((extraTotal, extra) => extraTotal + extra.price * (order.quantity || 1), 0),
  0
);
const formattedTotalCost = totalCost.toFixed(2);


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Submitting order:', orders);

  // Get the session you want to update
const session = sessions[0];

// Update the session with the new order information
const updatedSession = await DataStore.save(
  Sessions.copyOf(session, (updated) => {
    updated.Orders += 1;
    updated.TotalSpent += totalCost;
  })
);

// Update the state with the updated session

// Create a new CafeOrder with the order information
const currentTime = new Date();
      const options = {
        timeZone: 'Europe/London',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        millisecond: '2-digit',
      };

      const createdTime = currentTime.toLocaleTimeString('en-GB', options);

const hotItems = orders.flatMap((order) => [
  order.product,
  ...order.extras.map((extra) => extra.name),
]);


const newCafeOrder = await DataStore.save(
  new CafeOrder({
    CreatedTime: createdTime,
    CreatedDate: new Date().toISOString().split('T')[0],
    Total: totalCost,
    Table: session.Table,
    Sessionid: session.id,
    SessionEmail: session.Email,
Kitchen: true,
HotItems: hotItems,
Completed: false,
Delieved: false


  })
);

setCompleted(true);
setSessionId(updatedSession.id);
};


if (completed === true) {
window.location.reload();
  return (navigate('/Order'));
  
}


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Table Order
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {orders.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.product}
                            </a>
                            
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          {product.size ? (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.extras[0].name}</p>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">£{product.price}.00</p>
                        <ul>
    
  </ul>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:pr-9">
  <label htmlFor={`quantity-${productIdx}`} className="sr-only">
    Quantity, {product.name}
  </label>
  


                        
                        
                        
            
                        <select
  id={`quantity-${productIdx}`}
  name={`quantity-${productIdx}`}
  className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
  onChange={(event) => {
    console.log('Quantity changed:', event.target.value);
    const newQuantity = parseInt(event.target.value);
    setOrder((prevOrders) =>
      prevOrders.map((order, index) =>
        index === productIdx ? { ...order, quantity: newQuantity } : order
      )
    );
  }}
>
  <option value={1}>1</option>
  <option value={2}>2</option>
  <option value={3}>3</option>
  <option value={4}>4</option>
  <option value={5}>5</option>
  <option value={6}>6</option>
  <option value={7}>7</option>
  <option value={8}>8</option>
  </select>


                        <div className="absolute right-0 top-0">
                        <button
  type="button"
  className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
  onClick={() => {
    setOrder((prevOrders) => prevOrders.filter((order, index) => index !== productIdx));
  }}
>
  <span className="sr-only">Remove</span>
  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
</button>

                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                     

                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">£{Number(formattedTotalCost)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                </dt>
              </div>
              
              
            </dl>

            <div className="mt-6">
              <button onClick= {handleSubmit}
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Order
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
