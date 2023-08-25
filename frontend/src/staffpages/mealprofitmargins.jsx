import { useEffect, useState } from 'react'
import { CurrencyDollarIcon, TruckIcon } from '@heroicons/react/outline'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { CurrencyPoundIcon } from '@heroicons/react/24/outline'

export default function Example({ selectedItems, mealName }) {
  const [mealNamestate, setMealName] = useState('')
  const [selectedItemsstate, setSelectedItems] = useState([])
  const [price, setPrice] = useState(0)
  const [itemPrices, setItemPrices] = useState([])
  const [itemValues, setItemValues] = useState([])
  const [sellingPrice, setSellingPrice] = useState(0)

  useEffect(() => {
    setMealName(mealName)
    setSelectedItems(selectedItems)
    setItemPrices(selectedItems.map(() => 0))
    setItemValues(selectedItems.map(() => 0))
  }, [selectedItems, mealName])

  const handleSliderChange = (index, value) => {
    // update the individual price for this item
    const newPrice =
      selectedItemsstate[index].Quantity === 0
        ? (value / selectedItemsstate[index].Weight) *
          selectedItemsstate[index].Price // calculate price based on weight
        : (value / selectedItemsstate[index].Quantity) *
          selectedItemsstate[index].Price // calculate price based on quantity
    setItemPrices((prevItemPrices) => {
      const newItemPrices = [...prevItemPrices]
      newItemPrices[index] = newPrice
      return newItemPrices
    })
    // update the individual value for this item
    setItemValues((prevItemValues) => {
      const newItemValues = [...prevItemValues]
      newItemValues[index] = value
      return newItemValues
    })
    // update the total price by summing up all individual prices
    setPrice(itemPrices.reduce((total, price) => total + price, 0))
  }

    const handleSubmit = () => {
        const data = {
            mealName: mealNamestate,
            sellingPrice: sellingPrice,
            items: selectedItemsstate.map((item, index) => ({
            name: item.Name,
            supplier: item.Supplier,
            quantity: item.Quantity === 0 ? itemValues[index] : 0,
            weight: item.Quantity === 0 ? 0 : itemValues[index],
            price: itemPrices[index],
            })),
        }
        console.log(data)
        }
        

  return (
    <div className="w-full p-4">
        <h2 className="text-2xl text-center font-bold mb-4">{mealNamestate}</h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <label htmlFor="selling-price" className="text-sm font-medium text-black">
          Selling Price (Excluding VAT):
        </label>
        <div className="flex items-center mt-2 md:mt-0">
          <CurrencyPoundIcon className="h-5 w-5 text-green-500" />
          <input
            id="selling-price"
            type="number"
            min={0}
            step={0.01}
            onChange={(event) => setSellingPrice(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-black">
          Selling Price (Including VAT):
        </p>
        <p className="text-sm font-medium text-black">£{(sellingPrice * 1.2).toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-black">Profit Margin:</p>
        <p
          className={`font-bold text-sm ${
            sellingPrice - price > 0
              ? "text-green-500"
              : sellingPrice - price === 0
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          £{(sellingPrice - price).toFixed(2)}
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-black">Price (per Portion):</p>
        <p className="text-sm font-medium text-black">£{price.toFixed(2)}</p>
      </div>
  <div className="mt-8 flow-root">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black sm:pl-0">
                Product
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">
                Portion Size
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">
                Weight
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">
                Price
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {selectedItemsstate.map((item, index) => (
              <tr key={item.Name}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black sm:pl-0">
                  {item.Name}
                    <p className="font-italic">{item.Supplier}</p>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{item.Quantity === 0 ? (
                  <>
                    <label htmlFor={`weight-slider-${index}`} className="mt-2 md:mt-0">Weight:</label>
                    <input
                      id={`weight-slider-${index}`}
                      type="range"
                      min={0}
                      max={item.Weight}
                      step={1}
                      onChange={(event) =>
                        handleSliderChange(index, event.target.value)
                      }
                      className="w-full mt-2 md:mt-0 bg-red-500"
                    />
                    <p>Selected Weight: {itemValues[index]}g</p>
                  </>
                ) : (
                  <>
                    <label htmlFor={`quantity-slider-${index}`} className="mt-2 md:mt-0">Quantity:</label>
                    <input
                      id={`quantity-slider-${index}`}
                      type="range"
                      min={0}
                      max={item.Quantity}
                      step={1}
                      onChange={(event) =>
                        handleSliderChange(index, event.target.value)
                      }
                      className="w-full mt-2 md:mt-0"
                    />
                    <p>Selected Quantity: {itemValues[index]}</p>
                  </>
                )}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{item.Weight}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">£{itemPrices[index].toFixed(2)}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit}
       className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Confirm
            </button>
    </div>
  </div>
    </div>

);

     
  
  
  
}


{/* <ul className="flex flex-col items-center">
        {selectedItemsstate.map((item, index) => (
          <li key={item.Name} className="w-full mb-4">
            <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-2 bg-white rounded-md border border-gray-200">
              <div>
                <p className="font-bold text-lg">{item.Name}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <ShoppingBagIcon className="h-4 w-4" />
                  <p className="ml-1">{item.Supplier}</p>
                </div>
              </div>
  
              {item.Quantity === 0 ? (
                <>
                  <label htmlFor={`weight-slider-${index}`} className="mt-2 md:mt-0">Weight:</label>
                  <input
                    id={`weight-slider-${index}`}
                    type="range"
                    min={0}
                    max={item.Weight}
                    step={1}
                    onChange={(event) =>
                      handleSliderChange(index, event.target.value)
                    }
                    className="w-full mt-2 md:mt-0"
                  />
                  <p>Selected Weight: {itemValues[index]}g</p>
                </>
              ) : (
                <>
                  <label htmlFor={`quantity-slider-${index}`} className="mt-2 md:mt-0">Quantity:</label>
                  <input
                    id={`quantity-slider-${index}`}
                    type="range"
                    min={0}
                    max={item.Quantity}
                    step={1}
                    onChange={(event) =>
                      handleSliderChange(index, event.target.value)
                    }
                    className="w-full mt-2 md:mt-0"
                  />
                  <p>Selected Quantity: {itemValues[index]}</p>
                </>
              )}
              <p>Price: £{itemPrices[index].toFixed(2)}</p>
            </div>
          </li>
        ))}
  
        <li className="w-full mb-4">
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Confirm
          </button>
        </li>
      </ul>
    </div> */}