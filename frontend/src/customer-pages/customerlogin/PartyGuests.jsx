import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { PartyBooking } from '../../staffpages/models';
import { PartyGuests } from '../../staffpages/models';
import { CheckIcon } from '@heroicons/react/24/solid';
import "./customer.css";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GuestDashboard() {
  const location = useLocation();
  const { id, noOfChildren, partyType } = location.state;

  // State to keep track of the guests data
  const [guestsData, setGuestsData] = useState([]);

  // Query the PartyGuests model to get the guests data
  useEffect(() => {
    getGuestsData();
  }, [id]);

  async function getGuestsData() {
    const guests = await DataStore.query(PartyGuests);
    const filteredGuests = guests.filter((guest) => guest.partybookingID === id);
    setGuestsData(filteredGuests);
    console.log(filteredGuests);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target);
    // Get party booking ID
    const partyBookingId = id;
    // Save data to PartyGuests model
    for (let i = 0; i < noOfChildren; i++) {
      // Only save fields that have a value
      if (formData.get(`childName${i}`)) {
        await DataStore.save(
          new PartyGuests({
            ChildName: formData.get(`childName${i}`),
            FoodOption: formData.get(`foodOption${i}`),
            Allergies: formData.get(`allergies${i}`),
            ContactInfoEmail: formData.get(`contactInfoEmail${i}`),
            partybookingID: partyBookingId,
          })
        );
      }
    }
    // Re-query PartyGuests model to update guestsData state
    getGuestsData();
  }

  return (
    <form onSubmit={handleFormSubmit} className="p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              No.
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Child Name
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Food Option
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Allergies
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Contact Info Email
            </th>
          </tr>
        </thead>
  
        <tbody>
          {Array.from({ length: noOfChildren }, (_, i) => (
            <tr key={i} className="hover:bg-grey-lighter">
              <td
                data-label="No."
                className="py-4 px-6 border-b border-grey-light"
              >
                {i + 1}
              </td>
              <td
                data-label="Child Name"
                className="py-4 px-6 border-b border-grey-light"
              >
                {guestsData[i]?.ChildName ? (
                  guestsData[i].ChildName
                ) : (
                  <input
                    type="text"
                    name={`childName${i}`}
                    className="border rounded w-full py-2 px-3"
                  />
                )}
              </td>
              <td
                data-label="Food Option"
                className="py-4 px-6 border-b border-grey-light"
              >
                {guestsData[i]?.FoodOption ? (
                  guestsData[i].FoodOption
                ) : (
                  <input
                    type="text"
                    name={`foodOption${i}`}
                    className="border rounded w-full py-2 px-3"
                  />
                )}
              </td>
              <td
                data-label="Allergies"
                className="py-4 px-6 border-b border-grey-light"
              >
                {guestsData[i]?.Allergies ? (
                  guestsData[i].Allergies
                ) : (
                  <input
                    type="text"
                    name={`allergies${i}`}
                    className="border rounded w-full py-2 px-3"
                  />
                )}
              </td>
              <td
                data-label="Contact Info Email"
                className="py-4 px-6 border-b border-grey-light"
              >
                {guestsData[i]?.ContactInfoEmail ? (
                  guestsData[i].ContactInfoEmail
                ) : (
                  <input
                    type="email"
                    name={`contactInfoEmail${i}`}
                    className="border rounded w-full py-2 px-3"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="submit"
        className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </form>
  );
                }  
