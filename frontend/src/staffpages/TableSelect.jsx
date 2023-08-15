import React, { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { format, addHours } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Till from './Till';
import { Analytics } from 'aws-amplify';


export default function TableSelect({ availableTables, onSelect, details }) {


    const [selectedTables, setSelectedTables] = useState([]);
    const [savedDetails, setDetails] = useState(details);
    const [truee, setTrue] = useState(false);

    if (truee === true) {
        return (<Till/>)
        
    }


    console.log(savedDetails.Name[0].name)

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

        const name = savedDetails.Name[0].name;
        const extraNames = savedDetails.Name.slice(1).map(item => item.name);
        const age = savedDetails.Name.map(item => item.age);

        

    
        //save to database
        DataStore.save(
            new Sessions({
                Email: savedDetails.Email,
                Number: savedDetails.Number,
                Date: awsDate,
                Name: name,
                Children: children,
                Adults: adults,
                Table: selectedTables[0].table,
                TimeslotFrom: savedDetails.TimeSlotFrom,
                TimeslotTo: savedDetails.TimeSlotTo,
                Arrived: true,
                LeftCenter: false,
                TimeArrived: nowString,
                Telephone: savedDetails.Telephone,
                ExtraNames: extraNames,
                Age: age,

    
            })
        ).then(() => {
            console.log('Data saved successfully');
            Analytics.record({
                name: 'guestsInBuilding',
                attributes: {
                    guestName: savedDetails.name,
                    branchId: 'Cheeky Dino Maidstone',
                    numberofGuests: children + adults,
                    time: nowString,
                    date: awsDate,
                     // replace with your branch ID
                    // additional attributes here
                }
            });

            setTrue(true)
        }).catch((error) => {
            console.error('Error saving data:', error);
        });
    }

    let guests = parseInt(savedDetails.Children) + parseInt(savedDetails.Adults)      

    return (
        <div>
            <div className="flex flex-wrap">
                <p className="w-full text-center font-bold">Select A Table</p>
                <p className="w-full text-center font-bold">Party Size: {guests} </p>

                {availableTables.map(table => (
                    <button
                        key={table.table}
                        onClick={() => handleTableClick(table)}
                        className={`m-1 ${
                            selectedTables.includes(table)
                                ? 'bg-blue-500 text-white'
                                : [40, 41, 42].includes(table.table)
                                ? 'bg-red-500 text-white'
                                : 'bg-white text-black border border-black'
                        }`}
                    >
                        {table.table} ({table.capacity} seats)
                        {table.table === 40  && <div>Party Room</div>}
                        {table.table === 41  && <div>Party Room</div>}
                        {table.table === 42  && <div>Party Room</div>}


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