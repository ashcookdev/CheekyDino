import { DataStore } from "aws-amplify";
import { Sessions } from "../models";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useLocation } from "react-router-dom";




import { Disclosure } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/20/solid'

const subtotal = '$108.00'
const discount = { code: 'CHEAPSKATE', amount: '$16.00' }
const taxes = '$9.92'
const shipping = '$8.00'

  // More products...


export default function paymentSession() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [processing, setProcessing] = useState(false);





    // getCustomerEmail 

    useEffect(() => {
        Auth.currentUserInfo().then((user) => {
            setEmail(user.attributes.email);
        }
        );
    }, []);


    // get the info from location state

    const location = useLocation();
    const { childData, item, date, children, adults, telephone, staff } = location.state;


    console.log(childData)
    console.log(name)
    console.log(date)
    console.log(children)
    console.log(adults)
    console.log(telephone)
    console.log(staff)
    console.log(item)


    const totalPrice = childData.reduce((acc, curr) => acc + curr.TotalSpent, 0);

    const total = totalPrice

    const products = [{
        id: 1,
        name: " - " + "2 Hour Play Session",
        date: "  " + date,
        timeslot: " " +  item.timeslot.start + " - " + item.timeslot.end,
        href: '#',
        price: total,
       

    


    }]

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setProcessing(true);    
    
      const request = {
            "merchantID": "260859",
            "action": "SALE",
            "type": 1,
            "transactionUnique": "123456",
            "countryCode": 826,
            "currencyCode": 826,
            "amount": total,
            "cardNumber": cardNumber,
            "cardExpiryMonth": expirationDate.split("/")[0],
            "cardExpiryYear": expirationDate.split("/")[1],
            "cardCVV": cvc,
            "customerName": name,
            "customerEmail": email,
            "customerAddress": address,
            "customerPostCode": postalCode,
            "customerPhone": telephone
        };

    
        const response = await fetch('https://g1r5ykosw4.execute-api.eu-west-2.amazonaws.com/Production/pay', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Add this line
    },
    body: JSON.stringify(request),
});

    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            // If the response was ok, you can retrieve the data here
            const data = await response.json();
            console.log(data);
            if (data.responseCode === "0") {
                setProcessing(false);

                // Save the session to the database
               




                navigate('/confirmation', { replace: true });
            } else {
                alert("Payment failed");
                setProcessing(false);
            }

        }
    }
    



  return (
    <>
  
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section aria-labelledby="order-heading" className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
          <Disclosure as="div" className="mx-auto max-w-lg">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between">
                  <h2 id="order-heading" className="text-lg font-medium text-gray-900">
                    Your Order
                  </h2>
                  <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                    {open ? <span>Hide full summary</span> : <span>Show full summary</span>}
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel>
                  <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                    {products.map((product) => (
                      <li key={product.id} className="flex space-x-6 py-6">
                        
                        <div className="flex flex-col justify-between space-y-4">
                          <div className="space-y-1 text-sm font-medium">
                            <h3 className="text-gray-900">{product.name}</h3>
                            <p className="text-gray-900">£{product.price.toFixed(2)}</p>
                           
                          </div>
                          <div className="flex space-x-4">
                            <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              Edit
                            </button>
                            <div className="flex border-l border-gray-300 pl-4">
                              <button
                                type="button"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                

                    
                </Disclosure.Panel>

                <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                    
                  <span className="text-base">Total</span>
                  <span className="text-base">£{total.toFixed(2)}</span>
                </p>
              </>
            )}
          </Disclosure>
        </section>

        {/* Order summary */}
        <section aria-labelledby="summary-heading" className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul role="list" className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6">
            {products.map((product) => (
              <li key={product.id} className="flex space-x-6 py-6">
                
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-sm font-medium">
                    <h3 className="text-gray-900 font-bold">Product: {product.name}</h3>
                    <p className="text-gray-900">Date:{product.date}</p>
                    <p className="text-gray-900">Timeslot:{product.timeslot}</p>
                    <p className="text-gray-900">£{product.price.toFixed(2)}</p>
                  
                  </div>
                  <div className="flex space-x-4">
                    <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Edit
                    </button>
                    <div className="flex border-l border-gray-300 pl-4">
                      <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            

            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
             
              <div className="flex justify-between">
                
                
              </div>
              
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt>Total</dt>
                <dd className="text-base">                  <span className="text-base">£{total.toFixed(2)}</span>
</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Checkout form */}
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <h2 id="payment-heading" className="sr-only">
            Payment Details
          </h2>

          <div className="mx-auto max-w-lg lg:pt-16">
           

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
              </div>
            </div>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-x-4 gap-y-6">
               

                <div className="col-span-full">
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setName(e.target.value)}
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setCardNumber(e.target.value)}
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9">
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setExpirationDate(e.target.value)}
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setCvc(e.target.value)}
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setAddress(e.target.value)}
                
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setCity(e.target.value)}
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    County
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setRegion(e.target.value)}
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                    onChange={(e) => setPostalCode(e.target.value)}
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>


              <button
                type="submit"
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Pay £{total.toFixed(2)}
              </button>

              <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
                <LockClosedIcon className="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Payment details stored in plain text
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}





