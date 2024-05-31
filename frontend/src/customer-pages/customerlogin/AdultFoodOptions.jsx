import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { PartyAdultFood } from "../../models";
import { PartyBooking } from "../../models";
import '../customerfont.css'
import MyBooking from "./mybookings";



export default function AdultFoodOptions({ selectedParty }) {
  const [adultFoodOptions, setAdultFoodOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const fetchAdultFoodOptions = async () => {
      const adultFoodOptions = await DataStore.query(PartyAdultFood);
      setAdultFoodOptions(adultFoodOptions);
    };
    fetchAdultFoodOptions();
  }, []);

  const handleOptionChange = (option, quantity) => {
    setSelectedOptions({ ...selectedOptions, [option]: quantity });
  };

  const handleSave = async () => {
    const selectedOptionArray = Object.entries(selectedOptions).flatMap(
      ([option, quantity]) => Array(quantity).fill(option)
    );
const getPartyBooking = (await DataStore.query(PartyBooking)).filter(booking => booking.id === selectedParty);
const partyBooking = getPartyBooking[0];

// update the booking with the selected food options
await DataStore.save(
  PartyBooking.copyOf(partyBooking, updated => {
    updated.PartyAdultFoodChoices = selectedOptionArray;
  })
);
setConfirm(true);
  };

if (confirm === true) {
  return (
    <MyBooking />
  )
}



    

  return (
    <div className="flex-col items-center justify-center h-screen bg-gray-100 mt-10">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 component-title">Adult Party Food Options</h2>
        <fieldset>
          <legend className="text-base font-semibold text-gray-900 mb-4">Select 5 Options</legend>
          <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
            {adultFoodOptions.map((side, sideIdx) => (
              <div key={sideIdx} className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor={`side-${side.id}`}
                    className="select-none font-medium text-black"
                  >
                    {side.Name}
                  </label>
                </div>
                <div className="ml-3 flex h-full items-center">
                  <select
                    id={`side-${side.id}`}
                    name="plan"
                    onChange={(e) =>
                      handleOptionChange(side.Name, parseInt(e.target.value))
                    }
                    value={selectedOptions[side.Name] || 0}
                    className="h-full w-full border-gray-300 text-orange-600 focus:ring-indigo-600"
                  >
                    {[0, 1, 2, 3, 4, 5].map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
  
        <h3 className="text-lg font-medium leading-6 text-gray-900 mt-8 mb-4">
          Selected Options
        </h3>
        <ul className="mt-2 divide-y divide-gray-200">
          {Object.entries(selectedOptions).map(([option, quantity], optionIdx) =>
            quantity > 0 ? (
              <li key={optionIdx} className="py-4 flex items-center justify-between">
                <span>{`${option} x${quantity}`}</span>
                <button
                  type="button"
                  onClick={() => handleOptionChange(option, 0)}
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Delete
                </button>
              </li>
            ) : null
          )}
        </ul>
  
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  
}
