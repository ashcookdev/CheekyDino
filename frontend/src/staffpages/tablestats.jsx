import { useState, useEffect } from "react";
import {Sessions, CafeOrder} from "../models";
import { DataStore } from "aws-amplify";
import { format } from "date-fns";









export default function TableStats() {




    const [sessionStat, setSessionStat] = useState(0);
    const [currentTablesStat, setCurrentTablesStat] = useState(0);
    const [cleanTablesStat, setCleanTablesStat] = useState(0);
    const [orderLength, setOrderLength] = useState(0);




    
  useEffect(() => {


    async function getOrders() {

    const today = new Date();
    // format the date to match the date in the database
    const formattedDate = format(today, 'yyyy-MM-dd');


    const allCafeOrders = await DataStore.query(CafeOrder);


const statFilter = allCafeOrders.filter((order) => order.CreatedDate === formattedDate);

setOrderLength(statFilter.length);

    }

    // get number of sessions for today

    async function getSessions() {
      const today = new Date();
      // format the date to match the date in the database
      const formattedDate = format(today, 'yyyy-MM-dd');

      const allSessions = await DataStore.query(Sessions);

      const statFilter = allSessions.filter((session) => session.Date === formattedDate);

const cleanTables = allSessions.filter((session) => session.Arrived === true && session.LeftCenter === true && session.CleanTable === true && session.TableCleaned === false);

setCleanTablesStat(cleanTables.length);
      // get current tables that are occupied

      const occupiedTables = allSessions.filter(
        (session) => session.Arrived === true && session.LeftCenter === false
      );

      setCurrentTablesStat(occupiedTables.length);


      setSessionStat(statFilter.length);

    }


    getOrders();
    getSessions();


  }, []);


    const stats = [
        { name: 'Sessions', value: sessionStat },
        { name: 'Current Tables', value: currentTablesStat },
        { name: 'Clean Tables', value: cleanTablesStat },
        { name: 'Orders', value: orderLength },
        ];


      



    return (
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-sm font-medium leading-6 text-purple-600">{stat.name}</p>
              <p className="mt-2 flex items-baseline gap-x-2 bg-white">
                <span className="text-4xl font-semibold tracking-tight text-purple-600">{stat.value}</span>
              </p>
            </div>
          ))}
        </div>

    );

}