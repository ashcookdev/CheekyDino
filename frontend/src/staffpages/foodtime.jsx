import { DataStore } from "aws-amplify";
import { CafeOrder } from "../models";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

export default function EstFoodTime() {
    const [estimatedTime, setEstimatedTime] = useState(0);

    useEffect(() => {
        fetchCafeOrders();

        // subscribe to new orders
        const subscription = DataStore.observe(CafeOrder).subscribe(msg => {
            fetchCafeOrders();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchCafeOrders = async () => {
        const today = format(new Date(), 'yyyy-MM-dd');

        try {
            const cafeOrders = await DataStore.query(CafeOrder);
    
            const filteredOrders = cafeOrders.filter(order => 
                order.Delieved === false &&
                order.Completed === true &&
                order.Kitchen === true &&
                order.Date === today
            );

            console.log("Filtered orders", filteredOrders.length);

            let time = 10;

            if (filteredOrders.length === 0) {
                time = 10;
                console.log("Time is 5 minutes");
            } else if (filteredOrders.length >= 1 && filteredOrders.length <= 2) {
                time = 15;
                console.log("Time is 10 minutes");
            } else if (filteredOrders.length >= 3 && filteredOrders.length <= 4) {
                time = 20;
                console.log("Time is 15 minutes");
            } else if (filteredOrders.length >= 5 && filteredOrders.length <= 6) {
                time = 20;
                console.log("Time is 20 minutes");
            } else if (filteredOrders.length > 6) {
                time = 30 + (filteredOrders.length - 6) * 5;
                console.log("Time is greater than 20 minutes");
            }

            console.log("Estimated time", time);

            setEstimatedTime(time);
        } catch (error) {
            console.error("Error fetching cafe orders", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`text-xl font-bold text-center animate-pulse ${getCircleColor(estimatedTime)}`}>
                Food Waiting Time: {estimatedTime} mins
            </div>
        </div>
    );
}

function getCircleColor(time) {
    if (time > 20) {
        return "text-red-500"; // Red color for over 20 mins
    } else if (time >= 10 && time <= 15) {
        return "text-green-500"; // Yellow color for 10-20 mins
    
    }
}
