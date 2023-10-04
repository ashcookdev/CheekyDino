import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Sessions } from "./models";
import tableData from './TableData.json';

// Function to check if two timeslots overlap
const isOverlap = (slot1, slot2) => {
    return slot1.TimeslotFrom < slot2.TimeslotTo && slot1.TimeslotTo > slot2.TimeslotFrom;
}

// Function to move a session to a new table
// Function to move a session to a new table
const moveToNewTable = async (session, newTable) => {
    const updatedSession = Sessions.copyOf(session, updated => {
        updated.Table = Number(newTable);
    });
    await DataStore.save(updatedSession);
}


export default function MoveTables({ guests, tableNumber, timeslotFrom, timeslotTo }) {
    // get all sessions from the database
    const [sessions, setSessions] = useState([]);
    const [newTable, setNewTable] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [availableTables, setAvailableTables] = useState([]);

    useEffect(() => {
        const getSession = async () => {
            const models = await DataStore.query(Sessions);
            setSessions(models);
        }

        getSession();
    }, []);

    useEffect(() => {
        const fetchAvailableTables = async () => {
            const tables = await getAvailableTables();
            setAvailableTables(tables);
        }

        fetchAvailableTables();
    }, [sessions, guests, timeslotFrom, timeslotTo]);

    const getAvailableTables = async () => {
        const availableTables = tableData.filter(table => {
            // Check if the table has enough capacity
            if (table.capacity < guests) {
                console.log(`Table ${table.table} is too small`);
                return false;
            }
            // Get all sessions for this table
            const tableSessions = sessions.filter(session => session.Table === table.table);
            // Check if any session overlaps with the current timeslot
            const overlap = tableSessions.find(session => isOverlap(session, { TimeslotFrom: timeslotFrom, TimeslotTo: timeslotTo }));
            if (overlap) {
                console.log(`Table ${table.table} is occupied`);
                return false;
            }
            // If there's no overlap, the table is available
            return true;
        });
        return availableTables.map(table => table.table);
    }
    

    // Function to handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (tableNumber && newTable) {
            const session = sessions.find(session => session.Table === tableNumber);
            await moveToNewTable(session, newTable);
        }

        window.location.reload();
    }

    return (
        <div>
            <button       className="inline-flex items-center gap-x-2 rounded-md bg-purple-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
 onClick={() => setShowForm(true)}>Move to new table</button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Select new table:
                        <select value={newTable} onChange={e => setNewTable(e.target.value)}>
                            {availableTables.map(table => (
                                <option key={table} value={table}>{table}</option>
                            ))}
                        </select>
                    </label>
                    <button       className="inline-flex items-center gap-x-2 rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
 type="submit">Confirm</button>
                </form>
            )}
        </div>
    );
}
