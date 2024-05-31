import { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Sessions, Admin } from "../models";
import { format } from "date-fns";
import { set } from "lodash";
import { useNavigate } from "react-router-dom";

export default function ClosingTime() {

    const navigate = useNavigate();

// get todays date and day of the week

    const [futureSessions, setFutureSessions] = useState([]);
    const [openingTime, setOpeningTime] = useState('');

    const date = new Date();
    const day = format(date, 'EEEE');
    const awsDate = format(date, 'yyyy-MM-dd');

    // get all sessions in the future for today

    const fetchSessions = async () => {
        const sessionsData = await DataStore.query(Sessions);
        const futureSessionsData = sessionsData.filter(session => {
            const sessionStartTime = new Date(`1970-01-01T${session.TimeslotFrom}:00`);
            const sessionEndTime = new Date(`1970-01-01T${session.TimeslotTo}:00`);
            const currentTime = new Date(`1970-01-01T${format(date, 'HH:mm')}:00`);

            return session.Date === awsDate &&
                session.Arrived === false &&
                session.LeftCenter === false &&
                currentTime >= sessionStartTime &&
                currentTime <= sessionEndTime;
        });

        setFutureSessions(futureSessionsData);

    };

    // get all sessions in the future for today

    const fetchAdminData = async () => {
        // search the admin table for the open and closing time for today

        const adminData = await DataStore.query(Admin);
        // search for the day of the week in the admin table
        const openingTime = adminData[0][day];

        // set the opening time for today
        setOpeningTime(openingTime);

    }

   useEffect(() => {
        fetchSessions();
        fetchAdminData();
    }, []);


    return (
        <div className="flex justify-between mt-2 mb-2">
            <h2 className="font-bold text-black">Today is {day}</h2>
            <h2 className="font-bold text-black">Opening Time: {openingTime.openingTime}</h2>
            <h2 className="font-bold text-black">Closing Time: {openingTime.closingTime}</h2>

        </div>
        // create an input for opening and closing time
        // create a button to update the opening and closing time

        
    )
}















