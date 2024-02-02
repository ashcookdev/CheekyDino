import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { PartyBooking } from '../../models';

import { PartyGuests, Teddys } from '../../models';
import "./customer.css";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GuestDashboard() {
  const location = useLocation();
  const { id, noOfChildren, partyType } = location.state;

  // State to keep track of the guests data
  const [guestsData, setGuestsData] = useState([]);
  const [party, setPartyType] = useState('');
  const [teddys, setTeddys] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTeddy, setSelectedTeddy] = useState(null);

  console.log(teddys)

  function Party () {
    setPartyType(partyType);
  }

  // Query the PartyGuests model to get the guests data
  useEffect(() => {
    getGuestsData();
    Party();
  }, [id]);


  async function getTeddys () {
    const teddys = await DataStore.query(Teddys);
    setTeddys(teddys);
  }


  useEffect(() => {
    getTeddys();
  }, []);



  


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
  
    for (let i = 0; i < noOfChildren; i++) {
      // Only save fields that have a value
      if (formData.get(`childName${i}`)) {
        // Check if the party type is 'Teddy'
        if (party === 'Teddy') {
          const selectedTeddyName = formData.get(`selectedTeddy${i}`);
          const selectedTeddyImgSrc = teddys.find(
            (teddy) => teddy.Name === selectedTeddyName
          ).ImgSrc;
          await DataStore.save(
            new PartyGuests({
              ChildName: formData.get(`childName${i}`),
              FoodOption: formData.get(`foodOption${i}`),
              Allergies: formData.get(`allergies${i}`),
              ContactInfoEmail: formData.get(`contactInfoEmail${i}`),
              TeddyTasticBear: selectedTeddyName,
              ImgSrc: selectedTeddyImgSrc,
              partybookingID: partyBookingId,
              Arrived: false,
            })
          );
        } else {
          // Save non-Teddy-related information if the party type is not 'Teddy'
          await DataStore.save(
            new PartyGuests({
              ChildName: formData.get(`childName${i}`),
              FoodOption: formData.get(`foodOption${i}`),
              Allergies: formData.get(`allergies${i}`),
              ContactInfoEmail: formData.get(`contactInfoEmail${i}`),
              partybookingID: partyBookingId,
              Arrived: false,
            })
          );
        }
      }
    }
    // Re-query PartyGuests model to update guestsData state
    getGuestsData();
  }
  
  
  
  async function handleDelete(guestId) {
    // Get guest by ID
    const guest = await DataStore.query(PartyGuests, guestId);
    // Delete guest from PartyGuests model
    await DataStore.delete(guest);
    // Re-query PartyGuests model to update guestsData state
    getGuestsData();
  }


const backgroundImage = "https://media.giphy.com/media/ZdIdb8TWH8VW6fpuUt/giphy.gif"





  return (
    <div className="min-h-screen bg-gray-100">
  <div className="bg-white">
  {party === 'Teddy' && (
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-extrabold tracking-tight text-center text-gray-900 component-title">Teddys</h2>
    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
      {teddys.map((product) => (
        <div key={product.id} className="group relative">
          <div className="w-full h-32 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
            <img
              src={product.ImgSrc}
              alt={product.imageAlt}
              className="h-full w-full object-contain object-center"
            />
          </div>
          <p className="text-sm text-center mt-2 component-title">{product.Name}</p>
        </div>
      ))}
    </div>
  </div>
)}
</div>

  

    
    <form onSubmit={handleFormSubmit}>
<div className='overflow-x-auto'> <table className="w-full text-left border-collapse">
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
            Email
            </th>
            {party === 'Teddy' && (
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Teddy
              </th>
            )}
            
           
  
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
            Actions
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
    <select
      name={`foodOption${i}`}
      className="border rounded w-full py-2 px-3"
    >
      <option value="Kids Nuggets and Chips Meal">Nuggets</option>
      <option value="Kids Fish Fingers and Chips Meal">Fish Fingers</option>
      <option value="Kids Burger and Chips Meal">Burger</option>
      <option value="Kids Mozzarella Sticks and Chips Meal">Mozzarella Sticks</option>
      <option value="Kids Sausage and Chips Meal">Sausages</option>
      <option value="Kids Chicken Burger and Chips Meal"> Chicken Burger</option>
      <option value="Kids Chicken Burger and Chips Meal"> Hot Dog</option>


    </select>
  )}
</td>

<td
  data-label="Allergies"
  className="py-4 px-6 border-b border-grey-light"
>
  {guestsData[i]?.Allergies ? (
    guestsData[i].Allergies
  ) : (
    <select
      name={`allergies${i}`}
      className="border rounded w-full py-2 px-3"
    >
      <option value="No">No</option>
      <option value="Tree nuts">Tree nuts</option>
      <option value="Milk">Milk</option>
      <option value="Eggs">Eggs</option>
      <option value="Wheat">Wheat</option>
      <option value="Soy">Soy</option>
      <option value="Fish">Fish</option>
      <option value="Shellfish">Shellfish</option>
    </select>
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
              
              
              <td
  data-label="Teddy"
  className="py-4 px-6 border-b border-blue-light"
>
  {party === 'Teddy' && (
    <>
      {!guestsData[i]?.SelectedTeddy && (
        <select
          name={`selectedTeddy${i}`}
          className="border rounded w-full py-2 px-3"
        >
          {teddys.map((teddy) => (
            <option key={teddy.Name} value={teddy.Name}>
              {teddy.Name}
            </option>
          ))}
        </select>
      )}
      {guestsData[i]?.TeddyTasticBear && (
        <img
        src={guestsData[i].ImgSrc}
        alt={guestsData[i].TeddyTasticBear}
        className="w-24 h-24 object-cover rounded-full mt-2"
      />

      
          
      )}
    </>
  )}
</td>
<td>
  {guestsData[i] && (
    <button
      type="button"
      onClick={() => handleDelete(guestsData[i].id)}
      className="text-sm text-red-500 hover:text-red-700"
    >
      Delete
    </button>
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
      </div>
      



    </form>
    </div>

  );
                }  
