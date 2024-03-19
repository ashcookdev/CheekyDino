import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { HomeCookedCollection } from '../models';

export default function HomeCookedStats() {
    const [todayCollection, setTodayCollection] = useState([]);
    const [totalOrdersToday, setTotalOrdersToday] = useState(0);
    const [futureOrdersToday, setFutureOrdersToday] = useState([]);

    const fetchHomeCookedCollection = async () => {
        const homeCookedCollection = await DataStore.query(HomeCookedCollection);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const ordersToday = homeCookedCollection.filter((order) => {
            const orderDate = new Date(order.CreatedDate);
            return orderDate >= today && orderDate < tomorrow;
        });

        const futureOrdersToday = ordersToday.filter((order) => {
            const collectionTime = new Date(order.CollectionTime);
            return collectionTime > new Date();
        });

        const totalAmount = ordersToday.reduce((acc, order) => {
            return acc + (order.Total || 0); // Ensure that if Total is 0, it doesn't affect the totalAmount
        }, 0);

        setTodayCollection(ordersToday);
        setTotalOrdersToday(totalAmount);
        setFutureOrdersToday(futureOrdersToday);
    };

    useEffect(() => {
        fetchHomeCookedCollection();
    }, []);

    const stats = [
        { id: 1, name: 'Orders Today', stat: todayCollection.length, icon: 'homecooked.png' },
        { id: 2, name: 'Total Amount', stat: "£" + totalOrdersToday.toFixed(2), icon: 'homecooked.png' },
        { id: 3, name: 'Future Orders', stat: futureOrdersToday.length, icon: 'homecooked.png' },
    ];

    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                    >
                        <dt>
                            <div className="absolute rounded-md bg-red-500 p-3">
                                <img src={item.icon} className="h-6 w-6 text-white" aria-hidden="true" alt={item.name} />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        View all<span className="sr-only"> {item.name} stats</span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
