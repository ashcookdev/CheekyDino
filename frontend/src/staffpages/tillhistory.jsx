import { DataStore } from 'aws-amplify';
import { CafeOrder, KitchenMenu, StockControl } from '../models';
import { format, subHours, startOfDay, startOfWeek, startOfMonth } from 'date-fns';
import React, { useState, useEffect } from 'react';

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [timeRange, setTimeRange] = useState('Hour');
    const [menuItems, setMenuItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [popular, setPopular] = useState('');
    const [leastPopular, setLeastPopular] = useState('');

    useEffect(() => {
        async function getStock() {
            const stock = await DataStore.query(StockControl);

            const supplierCount = {};
            stock.forEach(item => {
                if (supplierCount[item.Supplier]) {
                    supplierCount[item.Supplier]++;
                } else {
                    supplierCount[item.Supplier] = 1;
                }
            });

            const mostPopularSupplier = Object.keys(supplierCount).sort((a, b) => supplierCount[b] - supplierCount[a])[0];
            setPopular(mostPopularSupplier);

            const leastPopularSupplier = Object.keys(supplierCount).sort((a, b) => supplierCount[a] - supplierCount[b])[0];
            setLeastPopular(leastPopularSupplier);

            console.log(stock);
        }

        getStock();
    }, []);

    useEffect(() => {
        async function getOrders() {
            const now = new Date();

            let startDate;
            switch (timeRange) {
                case 'Hour':
                    startDate = subHours(now, 1);
                    break;
                case 'Current Day':
                    startDate = startOfDay(now);
                    break;
                case 'This Week':
                    startDate = startOfWeek(now);
                    break;
                case 'This Month':
                    startDate = startOfMonth(now);
                    break;
                default:
                    startDate = now;
            }

            const allOrders = await DataStore.query(CafeOrder);
            const filteredOrders = allOrders.filter(
                order => new Date(order.CreatedDate) >= startDate && new Date(order.CreatedDate) <= now
            );

            setOrders(filteredOrders);
        }

        async function getMenuItems() {
            const menuItems = await DataStore.query(KitchenMenu);
            setMenuItems(menuItems);
        }

        getOrders();
        getMenuItems();
    }, [timeRange]);

    const numberOfOrders = orders.length;
    const totalAmount = orders.reduce((acc, order) => acc + order.Total, 0);
    const totalAmountMinusVAT = totalAmount / 1.2;

    const getMostPopularItems = (items) => {
        const itemCounts = {};
        items.forEach(item => {
            if (item) {
                item.forEach(i => {
                    if (itemCounts[i]) {
                        itemCounts[i]++;
                    } else {
                        itemCounts[i] = 1;
                    }
                });
            }
        });
        const sortedItems = Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a]);
        return sortedItems.slice(0, 3);
    };

    const mostPopularDrinkItems = getMostPopularItems(orders.map(order => order.DrinkItems));
    const mostPopularHotItems = getMostPopularItems(orders.map(order => order.HotItems));

    const itemCounts = {};
    orders.forEach(order => {
        const items = [...order.HotItems, ...order.DrinkItems];
        items.forEach(item => {
            if (itemCounts[item]) {
                itemCounts[item]++;
            } else {
                itemCounts[item] = 1;
            }
        });
    });

    const filteredMenuItems = menuItems.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort menu items by the number of times they were sold
    filteredMenuItems.sort((a, b) => {
        const countA = itemCounts[a.Name] || 0;
        const countB = itemCounts[b.Name] || 0;
        if (sortOrder === 'asc') {
            return countA - countB;
        } else {
            return countB - countA;
        }
    });

    return (
        <>
            <div>
                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                    Time Range
                </label>
                <select
                    id="location"
                    name="location"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue="Hour"
                    onChange={e => setTimeRange(e.target.value)}
                >
                    <option>Hour</option>
                    <option>Current Day</option>
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
            </div>
            <div className="flex justify-between gap-x-6 py-5 text-sm">
                <p>Number of Orders: {numberOfOrders}</p>
                <p>Total Amount: £{totalAmount.toFixed(2)}</p>
                <p>Total Amount (minus VAT): £{totalAmountMinusVAT.toFixed(2)}</p>
            </div>
            <div>
                <p className='text-sm font-bold text-purple-900'>Most Popular Drink Items: {mostPopularDrinkItems.join(', ')}</p>
                
                <p className='text-sm font-bold text-purple-900'>Most Popular Hot Items: {mostPopularHotItems.join(', ')}</p>
                <p className='text-sm font-bold text-green-500'>Most Popular Supplier: {popular}</p>
                <p className='text-sm font-bold text-red-500'>Least Popular Supplier: {leastPopular}</p>
            </div>
            <div className="mt-8">
                <div className="flex justify-between">
                    <div className="relative w-full max-w-md">
                        <input
                            type="search"
                            className="block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 sm:text-sm"
                            placeholder="Search menu items"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.25 1.5C4.59315 1.5 1.5 4.59315 1.5 8.25C1.5 11.9069 4.59315 15 8.25 15C9.93206 15 11.4483 14.3725 12.6017 13.3988L16.8536 17.6464C17.0488 17.8417 17.3653 17.8417 17.5607 17.6464C17.756 17.4512 17.756 17.1347 17.5607 16.9393L13.3088 12.6912C14.3725 11.4483 15 9.93206 15 8.25C15 4.59315 11.9069 1.5 8.25 1.5ZM3.5 8.25C3.5 5.51472 5.51472 3.5 8.25 3.5C10.9853 3.5 13 5.51472 13 8.25C13 10.9853 10.9853 13 8.25 13C5.51472 13 3.5 10.9853 3.5 8.25Z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <button
                            className="ml-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? 'Lowest to Highest' : 'Highest to Lowest'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Item
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Amount Sold
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Total Revenue
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Total Profit Margin
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredMenuItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {item.Name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{itemCounts[item.Name] || 0}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
    £{((itemCounts[item.Name] || 0) * item.Price).toFixed(2)}
</td>
<td className="whitespace-nowrap px-3 py-4 text-sm text-green-500">
    £{((itemCounts[item.Name] || 0) * item.ProfitMargin).toFixed(2)}
</td>



                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
