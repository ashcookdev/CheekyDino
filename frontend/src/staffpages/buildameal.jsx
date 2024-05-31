import { useState } from 'react';
import {StockControl} from "../models"   
import { DataStore } from 'aws-amplify'
import { useNavigate
 } from 'react-router-dom';

export default function EnterStock() {
  const [selectedPlan, setSelectedPlan] = useState(null);
    const [vat, setVat] = useState(0);
    const [weight, setWeight] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState('');
    const [supplier, setSupplier] = useState('');
    const [productID, setProductID] = useState('');
    const [usedBy, setUsedBy] = useState('');
    const [match, setMatch] = useState('');

    const navigate = useNavigate();

  const plans = [
    { id: 'Weight', name: 'Weight', description: 'Full weight -  In Grams' },
    { id: 'Quantity', name: 'Quantity', description: 'How many Items in a pack' },
  ];

  const prevat = (vat / 1.15).toFixed(2);    


  const handleSubmit = async (event) => {

    const newPrice = parseFloat(vat);
    const beforeVAT = parseFloat(prevat);

    const difference = vat - prevat;

    const newWeight = parseInt(weight);
    const newQuantity = parseInt(quantity);

    event.preventDefault();
    const stock = await DataStore.save(
      new StockControl({
        Name: product,
        Supplier: supplier,
        Price: newPrice,
        Weight: newWeight,
        Quantity: newQuantity,
        PreVAT: beforeVAT,
        VAT: difference,
        CurrentStockLevel: newQuantity === 0 ? newWeight : newQuantity,
        ProductId: productID,
        UsedBy: usedBy,
        MatchCode: match,


      })
    );
    console.log(stock);
navigate("/stockcontrol")
window.location.reload();
  }



  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div>
        <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
          Product
        </label>
        <div className="mt-2">
          <input onChange={(e) => setProduct(e.target.value)}
            type="text"
            name="product"
            id="product"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="eg. Chips"
            aria-describedby="Chips"
          />
        </div>
        <div>
        <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
          Supplier
        </label>
        <div className="mt-2">
          <input onChange={(e) => setSupplier(e.target.value)}
            type="text"
            name="product"
            id="product"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="eg. Chips"
            aria-describedby="Chips"
          />
        </div>
        <fieldset>
          <legend className="sr-only">Plan</legend>
          <div className="space-y-5">
            {plans.map((plan) => (
              <div key={plan.id} className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id={plan.id}
                    aria-describedby={`${plan.id}-description`}
                    name="plan"
                    type="radio"
                    onChange={() => setSelectedPlan(plan.id)}
                    defaultChecked={plan.id === 'small'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor={plan.id} className="font-medium text-gray-900">
                    {plan.name}
                  </label>{' '}
                  <span id={`${plan.id}-description`} className="text-gray-500">
                    {plan.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        {selectedPlan === 'Weight' && (
          <div className="mt-2">
            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
              Weight (in grams)
            </label>
            <input onChange={(e) => setWeight(e.target.value)}
              type="number"
              name="weight"
              id="weight"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              aria-describedby=""
            />
          </div>
        )}
        {selectedPlan === 'Quantity' && (
          <div className="mt-2">
            <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
              Quantity (number of items in a pack)
            </label>
            <input onChange={(e) => setQuantity(e.target.value)}
              type="number"
              name="quantity"
              id="quantity"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              aria-describedby=""
            />
          </div>
        )}
      </div>
      
    <div className="mt-2">
          <label htmlFor="pricePreVAT" className="block text-sm font-medium leading-6 text-gray-900">
            Price with VAT
          </label>
          <input onChange={(e) => setVat(e.target.value)}
            type="number"
            name="pricePreVAT"
            id="pricePreVAT"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=""  
            aria-describedby=""
            />

    </div>
    <div className="mt-2">
          <label htmlFor="pricePreVAT" className="block text-sm font-medium leading-6 text-gray-900">
            Supplier Product Id
          </label>
          <input onChange={(e) => setProductID(e.target.value)}
            type="text"
            name="ProductId"
            id="ProductId"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=""  
            aria-describedby=""
            />

    </div>
    <div className="mt-2">
          <label htmlFor="pricePreVAT" className="block text-sm font-medium leading-6 text-gray-900">
           Used By
          </label>
          <input onChange={(e) => setUsedBy(e.target.value)}
            type="date"
            name="date"
            id="date"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=""  
            aria-describedby=""
            />

    </div>
    <div className="mt-2">
          <label htmlFor="MatchID" className="block text-sm font-medium leading-6 text-gray-900">
           Match ID
          </label>
          <input onChange={(e) => setMatch(e.target.value)}
            type="text"
            name="matchid"
            id="match"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=""  
            aria-describedby=""
            />

    </div>


    <div className= "mt-2">
        <p>Price before VAT: £{prevat}</p>
    </div>
    <button onClick={handleSubmit} type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Next</button>

    </div>
    </div>

  );
}
