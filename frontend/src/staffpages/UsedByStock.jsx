import { DataStore } from "aws-amplify";
import { StockControl } from "../models";
import { useState, useEffect } from "react";
import { isToday, isTomorrow, isWithinInterval, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function UsedByStock() {
    const [stock, setStock] = useState([]);
    const [rectify, setRectify] = useState(false);

    const navigate = useNavigate();

    if (rectify === true) {
        navigate("/stockcontrol");
        window.location.reload();
    }

    useEffect(() => {
        fetchStock();
    }, []);

    async function fetchStock() {
        const stockData = await DataStore.query(StockControl);
        const filteredStock = stockData.filter(stock => stock.UsedBy);

        const today = new Date();
        const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

        const filteredStock2 = filteredStock.filter(stock => {
            const stockDate = parseISO(stock.UsedBy);
            return isWithinInterval(stockDate, { start: today, end: dayAfterTomorrow });
        });

        console.log(filteredStock2);
        setStock(filteredStock2);
    }

    // if stock is empty, display a message

    if (stock.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-semibold text-gray-900">No stock to display</h1>
            </div>
        );
    }

    // send a message to Messages datastore to alert staff that stock is out of date today or tomorrow

    

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stock.map((item, index) => (
                <div
                    key={index}
                    className={`${
                        isToday(parseISO(item.UsedBy))
                            ? "bg-red-500"
                            : isTomorrow(parseISO(item.UsedBy))
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                    } relative flex items-center space-x-3 rounded-lg border border-gray-300 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400`}
                >
                    <div className="flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.Name}</p>
                            <p className="truncate text-sm text-black">{item.Supplier}</p>
                            <p className="truncate text-sm text-black">
                                Weight/Quantity: {item.Quantity !== 0 ? item.Quantity : item.Weight}
                            </p>
                            <p className="truncate text-sm text-black">Used By Date:{item.UsedBy}</p>
                    </div>
                    <button onClick={() => {
                        setRectify(true);
                    }}
                        type="button"
                        className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Rectify
                    </button>
                </div>
            ))}
        </div>
    );
                }    
