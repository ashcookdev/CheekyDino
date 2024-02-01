import { DataStore } from "aws-amplify"
import { StockControl } from "../models"
import { useEffect, useState } from "react"

export default function ShoppingList() {
    const [stockControls, setStockControls] = useState([])

    useEffect(() => {
        fetchStockControls()
    }, [])

    async function fetchStockControls() {
        const stockControlData = await DataStore.query(StockControl)
        const shoppingList = stockControlData.filter(item => {
            let threshold;
            if (item.Weight) {
                threshold = item.Weight * 0.25;
                return item.CurrentStockLevel <= threshold;
            } else if (item.Quantity) {
                threshold = item.Quantity * 0.25;
                return item.CurrentStockLevel <= threshold;
            }
            return false;
        })
        setStockControls(shoppingList)
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Shopping List</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the items that are 25% or less in stock.
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                        Select
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Product
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Supplier
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Current Level
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {stockControls.map((item) => (
                                    <tr key={item.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                            {item.Name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Supplier}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.CurrentStockLevel}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">£{item.Price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
