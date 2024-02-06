import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { DataStore } from 'aws-amplify';
import { Events, KitchenMenu } from '../models'; // Update the import path based on your project structure
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableData from './TableData.json';




export default function EventForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [tables, setTables] = useState('');
    const [price, setKidsPrice] = useState('');
    const [image, setImage] = useState('');
    const [food, setFood] = useState('Yes');
    const [kitchenMenu, setKitchenMenu] = useState([]);
    const [tableData, setTableData] = useState("");
    const [timeFinish, setTimeFinish] = useState('');
    const [adultPrice, setAdultPrice] = useState('');
    const [price1, setPrice1] = useState('');
    const [price2, setPrice2] = useState('');

    useEffect(() => {
        const fetchKitchenMenu = async () => {
            const kitchenMenuData = await DataStore.query(KitchenMenu);
            console.log(kitchenMenuData);
            setKitchenMenu(kitchenMenuData);    
        };

        fetchKitchenMenu();
    }, []);


useEffect(() => {
    // get json data from TableData.json

    const fetchTableData = async () => {
        const tableData = TableData;
        console.log(tableData);
        // find out how many tables are in the json file

        const tableCount = tableData.length;
        console.log(tableCount);
        // loop through capacity and add them together
        let totalCapacity = 0;
        tableData.forEach((table) => {
            totalCapacity += table.capacity;
        });
        console.log(totalCapacity);
        // set the state for the tableData

        setTableData({tables:tableCount, capacity:totalCapacity});
    };

    fetchTableData();

}, []);









  // Add state for other fields based on your schema
  const handleSubmit = async (event) => {
    event.preventDefault();

    // convert time to aws format if needed

    // i want to take the last 4 letters from the image and replace them with raw=1

    try {
        let modifiedImage;
        if (image && typeof image === 'string') {
            modifiedImage = image.slice(0, -4) + 'raw=1';
        } else {
            throw new Error('image is not defined or not a string');
        }

      await DataStore.save(
        new Events({
          Name: name,
          Description: description,
            Date: date,
            StartTime: time,
            FinishTime:  timeFinish,
            Tables: Number(tables),
            KidsPrice: Number(price),
            AdultPrice: adultPrice,
            Price1: price1,
            Price2: Number(price2),
            Image: modifiedImage,
          // Add other fields based on your schema
        })
      );

      // Redirect to the "/events" page after saving
      navigate('/events');
    } catch (error) {
      console.error('Error saving event:', error);
      // Handle error, e.g., show an error message to the user
    }
  };



return (
            <form onSubmit={handleSubmit}>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Events</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Add information about the event.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="event-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Event Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="event-name"
                                    id="event-name"
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-full">
                                                        <label htmlFor="event-description" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Event Description
                                                        </label>
                                                        <div className="mt-2">
                                                            <textarea
                                                                id="event-description"
                                                                name="event-description"
                                                                rows={3}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                value={description}
                                                                onChange={(e) => setDescription(e.target.value)}
                                                            />
                                                        </div>
                                                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the event.</p>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="event-date" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Event Date
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setDate(e.target.value)}
                                                            value={date}
                                                                type="date"
                                                                name="event-date"
                                                                id="event-date"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-span-full">
                                                        <label htmlFor="event-time" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Event Start
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setTime(e.target.value)}
                                                            value={time}
                                                                type="time"
                                                                name="event-time"
                                                                id="event-time"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Set the time for the event.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="event-time" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Event Finish
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setTimeFinish(e.target.value)}
                                                            value={timeFinish}
                                                                type="time"
                                                                name="event-time"
                                                                id="event-time"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Set the time for the event.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="tables" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Tables Max - {tableData.tables} Capacity: {tableData.capacity}
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setTables(e.target.value)}
                                                            value={tables}
                                                                type="number"
                                                                name="tables"
                                                                id="tables"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Set the number of tables for the event.</p>
                                                        </div>
                                                            {tables && (
                                                                <div className="mt-3 text-sm leading-6 text-gray-600">
                                                                    <p>Tables: {tables}</p>
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Kids Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setKidsPrice(e.target.value)}
                                                            value={price}
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Set the price for the event.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Adult Price
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setAdultPrice(e.target.value)}
                                                            value={adultPrice}
                                                                type="number"
                                                                name="adultsprice"
                                                                id="price"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Set the price for the event.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Price 2
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setPrice1(e.target.value)}
                                                            value={price1}
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Set the price for the event.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Price 3
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setPrice2(e.target.value)}
                                                            value={price2}
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Set the price for the event.</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-full">
                                                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                            Image URL
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                            onChange={(e) => setImage(e.target.value)}
                                                            value={image}
                                                                type="text"
                                                                name="image"
                                                                id="image"
                                                                autoComplete="off"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Add the image URL for the event.</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                  <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Food
                                  </label>
                                  <select onChange={(e) => setFood(e.target.value)}
                                    id="food"
                                    name="food"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue="Yes"
                                  >
                                    <option>Yes</option>
                                    <option>No</option>
                                  </select>
                                </div>
                                                        </div>
                                                    </div>
                                                    Kids Food Options

                                                    {food === 'Yes' && (
                                                        kitchenMenu
                                                            .filter(item => item.Category === 'Event')
                                                            .map((item, index) => (

                                                                <div key={index} className="col-span-full">
                                                                    <label htmlFor="kitchen-menu" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                                                        {item.Name}
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <input onChange={(e) => setKitchenMenu(e.target.value)}
                                                                            type="checkbox"
                                                                            name="kitchen-menu"
                                                                            id="kitchen-menu"
                                                                            autoComplete="off"
                                                                            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                        />
                                                                        
                                                                    </div>
                                                                </div>
                                                            ))
                                                    )}
                                             

                                        

                                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    );
                                }
