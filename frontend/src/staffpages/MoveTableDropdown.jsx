import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Sessions } from './models';

export function MoveTableDropdown({ freeTables, session }) {
    const navigate = useNavigate();

  const [selectedTable, setSelectedTable] = useState(null);

  async function handleConfirmClick() {

    //turn selected into a integer

    const selectTable = parseInt(selectedTable);
    // Update the session record in the DataStore with the new table number
    await DataStore.save(
      Sessions.copyOf(session, (updated) => {
        updated.Table = selectTable;
      })
    );
    window.location.reload();
    navigate('/Tables');
  }

  // Create an array of option elements for the free tables
  const freeTableOptions = freeTables.map((table) => (
    <option key={table.number} value={table.number}>
      Table {table.number}
    </option>
  ));

  return (
    <div>
      <label htmlFor="moveTable" className="block text-sm font-medium leading-6 text-gray-900">
        Move to table:
      </label>
      <select
        id="moveTable"
        name="moveTable"
        onChange={(event) => setSelectedTable(event.target.value)}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {freeTableOptions}
      </select>
      <button
        type="button"
        onClick={handleConfirmClick}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm
      </button>
    </div>
  );
}
