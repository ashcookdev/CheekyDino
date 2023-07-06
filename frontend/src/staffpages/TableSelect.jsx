import React, { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { format, addHours } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Till from './Till';


export default function TableSelect({ availableTables, onSelect, details }) {


    const [selectedTables, setSelectedTables] = useState([]);
    const [savedDetails, setDetails] = useState(details);
    const [truee, setTrue] = useState(false);

    if (truee === true) {
        return (<Till/>)
        
    }


    console.log(details)

    const handleTableClick = (table) => {


        
        if (selectedTables.includes(table)) {
            setSelectedTables(selectedTables.filter(t => t !== table));
            setDetails(details)
        } else {
            setSelectedTables([...selectedTables, table]);
        }
    };


    const handleConfirmClick = () => {
        onSelect(selectedTables);
        //get current date 
        const date = new Date();
        const awsDate = format(date, 'yyyy-MM-dd');
        const nowString = format(date, 'HH:mm:ss.SSS');
    
        const twoHoursLater = addHours(date, 2);
    
        // format the result as a string
        const twoHoursLaterString = format(twoHoursLater, 'HH:mm:ss.SSS');
    
        console.log(twoHoursLaterString);
        console.log(nowString);
        console.log(savedDetails.TimeslotFrom )

        const children = parseInt(savedDetails.Children)
        const adults = parseInt(savedDetails.Adults)
    
        //save to database
        DataStore.save(
            new Sessions({
                Email: savedDetails.Email,
                Number: savedDetails.Number,
                Date: awsDate,
                Name: savedDetails.Name,
                Age: savedDetails.Age,
                Children: children,
                Adults: adults,
                Table: selectedTables[0].table,
                TimeslotFrom: savedDetails.TimeSlotFrom,
                TimeslotTo: savedDetails.TimeSlotTo,
                Arrived: true,
                TimeArrived: nowString,
                Telephone: savedDetails.Telephone,
    
            })
        ).then(() => {
            console.log('Data saved successfully');
            setTrue(true)
        }).catch((error) => {
            console.error('Error saving data:', error);
        });
    }
      

    return (
        <div>
            <div className="flex flex-wrap">
                {availableTables.map(table => (
                    <button
                        key={table.table}
                        onClick={() => handleTableClick(table)}
                        className={`m-1 ${
                            selectedTables.includes(table)
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-black border border-black'
                        }`}
                    >
                        {table.table} ({table.capacity} seats)
                    </button>
                ))}
            </div>
            <button
                onClick={handleConfirmClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Confirm
            </button>
        </div>
    );
}
