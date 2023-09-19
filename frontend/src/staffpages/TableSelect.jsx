import React, { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Sessions } from './models';
import { format, addHours } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Till from './Till';
import { Analytics } from 'aws-amplify';
import SessionTill from './SessionTill';
import { motion } from 'framer-motion';

export default function TableSelect({ availableTables, onSelect, details }) {


    const [selectedTables, setSelectedTables] = useState([]);
    const [savedDetails, setDetails] = useState(details);
    const [truee, setTrue] = useState(false);
    const [pay, setPay] = useState(false);

    if (truee === true) {
        return (<Till/>)
        
    }

    


    console.log(savedDetails.Name[0].name)

    console.log(savedDetails)

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

        const name = savedDetails.Name
        const age = savedDetails.Age.map(item => item.age);

        

    
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
                Age: age,
                TotalSpent: savedDetails.Total,
                Staff: savedDetails.Staff,

    
            })
       

        );  
setPay(true)  }

    let guests = parseInt(savedDetails.Children) + parseInt(savedDetails.Adults)    
    
   if (pay === true) {
    return (
    <SessionTill order= {"2 Hour Session"} total = {savedDetails.Total} table= {selectedTables[0].table} ChildName ={savedDetails.Name} />)  
    
   }

   const colors = [
    
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-purple-700',
    'bg-gray-500',
  ];    

  return (
    <div>
      <div className="flex flex-wrap">
        <p className="w-full text-center font-bold">Select A Table</p>
        <p className="w-full text-center font-bold">Party Size: {guests} </p>
        <p className="w-full text-center font-bold">Name: {savedDetails.Name} </p>
        <p className="w-full text-center font-bold">Price: £{savedDetails.Total.toFixed(2)} </p>
        <motion.div
          className="flex flex-wrap mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {availableTables.map((table) => (
            <motion.button
              key={table.table}
              onClick={() => handleTableClick(table)}
              className={`m-1 text-white ${colors[table.table % colors.length]} ${
                selectedTables.includes(table)
                  ? 'ring-2 ring-white'
                  : 'ring-2 ring-transparent'
              } rounded-full px-4 py-2`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {table.table} ({table.capacity} seats)
              {table.table >= 40 && table.table <= 42 && <div>Party Room</div>}
            </motion.button>
          ))}
        </motion.div>
      </div>
      <motion.button
        onClick={handleConfirmClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Confirm
      </motion.button>
    </div>
  );
};
                    