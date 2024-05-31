import React, { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Sessions, CafeOrder } from "../models";
import { isToday } from "date-fns";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import TillPayments from "./TillPayments";
import { useNavigate } from "react-router-dom";

export default function Tabs() {
    const [sessions, setSessions] = useState([]);
    const [selectedSessionId, setSelectedSessionId] = useState("");
    const [cafeOrders, setCafeOrders] = useState([]);
    const [hotItems, setHotItems] = useState([]);
    const [coldItems, setColdItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(true);
    const [aggregatedOrder, setAggregatedOrder] = useState(null);
    const [renderTill, setRenderTill] = useState(false);


    const navigate = useNavigate();

    if (open === false) {
        navigate("/dashboard")
      }

   

 

    useEffect(() => {
        async function getTodaysBookings() {
            const sessions = await DataStore.query(Sessions);
            const todaysBookings = sessions.filter((session) =>
                isToday(new Date(session.Date))
                && session.Arrived === true
                && session.LeftCenter === false
            );
            setSessions(todaysBookings);
        }

        const subscription = DataStore.observe(Sessions).subscribe(() =>
            getTodaysBookings()
        );

        getTodaysBookings();

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        async function fetchCafeOrders() {
            if (selectedSessionId) {
                const cafeOrders = await DataStore.query(CafeOrder);
                const selectedCafeOrders = cafeOrders.filter((order) => order.sessionsID === selectedSessionId && order.Paid === false && order.Tab === true);
                setCafeOrders(selectedCafeOrders);
                console.log(selectedCafeOrders);
        
                const hotItems = [];
                const coldItems = [];
                let total = 0;
        
                selectedCafeOrders.forEach((order) => {
                    if (order.HotItems) {
                        hotItems.push(...order.HotItems);
                    }
                    if (order.DrinkItems) {
                        coldItems.push(...order.DrinkItems);
                    }
                    total += order.Total || 0; // Assuming Total is the total price of the order
                });
        
                setHotItems(hotItems);
                console.log(hotItems);
                setColdItems(coldItems);
                console.log(coldItems);
                setTotal(total);
            }
        }
        
        fetchCafeOrders();
    }, [selectedSessionId]);
    
    const handlePay = async () => {
        // get orders from the selected session 
        const cafeOrders = await DataStore.query(CafeOrder);
        const selectedCafeOrders = cafeOrders.filter((order) => order.sessionsID === selectedSessionId);
    
        // get the selected session
        const selectedSession = sessions.find(session => session.id === selectedSessionId);
    
        // create a new order object that aggregates all the orders
        const orders = selectedCafeOrders.map((order) => {
            return {
              orders: order,
            };
        });

        console.log(orders);
    
        const total = orders.reduce((acc, order) => acc + order.Total, 0);
        const staff = selectedSession.Staff;
        const childName = selectedSession.Name;

        console.log(total);
        console.log(staff);
        console.log(childName);
        console.log(selectedSession.Table);
        console.log(selectedSession.Name);
        console.log(selectedSession.Staff);
        console.log(orders);

        // setRenderTill(true);
    
        // // set the aggregated order in the state
        // setAggregatedOrder({
        //     orders: orders,
        //     total: total,
        //     staff: staff,
        //     childName: childName,
        //     table: selectedSession.Table,
        //     childName: selectedSession.Name,
        //     staff: selectedSession.Staff,
            


            
        }
    

    const handleSessionChange = (e) => {
        setSelectedSessionId(e.target.value);
    };

    if (renderTill) {
        return (
            <TillPayments
            orders={aggregatedOrder.orders}
            total={aggregatedOrder.total}
            table={aggregatedOrder.table}
          
            childName={aggregatedOrder.childName}
            staff = {aggregatedOrder.staff}
            />
        );
        
        
      }

    return (
        <div>
      
        
        <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden bg-contain bg-center bg-gradient-to-t from-indigo-700 via-sky-300 to-purple-600">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    Pay Cafe Orders Tab 
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
                                            <div>
                                                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Select Session
                                                </label>

                                                <select
                                                    onChange={handleSessionChange}
                                                    id="location"
                                                    name="location"
                                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    defaultValue="" // Set default value to an empty string
                                                >
                                                    <option value="" disabled>Select a session</option>
                                                    {sessions.map((session) => (
                                                        <option key={session.id} value={session.id}>{session.Name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="bg-purple-100 m-4 p-4 rounded-lg mt-5 shadow-md">
    <h3 className="font-bold text-lg">Hot Items</h3>
    <ol className="list-decimal list-inside">
        {hotItems.map((item, index) => (
            <li className="text-black text-sm" key={index}>{item} {item.Total}</li>
        ))}
    </ol>
</div>
<div className="bg-purple-100 m-4 p-4 rounded-lg mt-5 shadow-md">
    <h3 className="font-bold text-lg">Other Items</h3>
    <ol className="list-decimal list-inside">
        {coldItems.map((item, index) => (
            <li className="text-black text-sm" key={index}>{item}</li>
        ))}
    </ol>
</div>
<div>
    <h3 className="font-bold text-lg">Total: £{total.toFixed(2)}</h3>
</div>
<button onClick={()=>{
    handlePay(hotItems, coldItems, total)

}
}

className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Pay</button>


                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    </div>
    );
}
