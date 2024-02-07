import React, { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { PartyBooking, PartyGuests, Messages, KitchenMenu } from '../models';
import { format } from 'date-fns';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Kitchen() {
  const [currentTime, setCurrentTime] = useState(0);
  const [parties, setParties] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [fieldsetVisible, setFieldsetVisible] = useState(false);
  const [noPartyBookings, setNoPartyBookings] = useState(false);
  const [adultFood, setAdultFood] = useState(false);
  const [clickedGuests, setClickedGuests] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchTodaysPartyBookings();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(PartyBooking).subscribe(() =>
      fetchTodaysPartyBookings()
    );
    return () => subscription.unsubscribe();
  }, []);

  async function fetchTodaysPartyBookings() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    const allPartyBookings = await DataStore.query(PartyBooking);
    const partyBookings = allPartyBookings.filter(
      (booking) =>
        new Date(booking.PartyDate) >= today && new Date(booking.PartyDate) < tomorrow
    );
  
    const allGuests = await DataStore.query(PartyGuests);
    const selectedGuests = {};
  
    for (const party of partyBookings) {
      const guests = allGuests.filter((guest) => guest.partybookingID === party.id);
      selectedGuests[party.id] = guests;
    }
  
    setParties(partyBookings);
    setSelectedGuests(selectedGuests);
    setNoPartyBookings(partyBookings.length === 0);
  }
  

  function handleViewOrderClick(partyId) {
    calculateFoodOptions(selectedGuests[partyId]);
    calculateAllergies(selectedGuests[partyId]);
    setFieldsetVisible((prevVisible) => ({
      ...prevVisible,
      [partyId]: !prevVisible[partyId],
    }));
  }

  
  


  

  async function handleConfirmClick(party) {
    const awstime = currentTime.toISOString().split('T')[1].split('.')[0];

    const partyGuests = await DataStore.query(PartyGuests);
    for (const guest of partyGuests) {
      await DataStore.save(
        PartyGuests.copyOf(guest, (updated) => {
          updated.Completed = true;
        })
      );
    }

    const original = await DataStore.query(PartyBooking, party.id);
    await DataStore.save(
      PartyBooking.copyOf(original, (updated) => {
        updated.PartyFoodComplete = true;
        updated.PartyFoodPrepared = awstime
      })
    );

    await DataStore.save(
      new Messages({
        content: 'Food Ready for ' + party.ChildName + ' Party Come to the Kitchen',
        createdAt: awstime,
        email: 'Kitchen',
        partyID: party.id,

        group: ['Staff', 'Kitchen', 'Team Leader'],
      })
    );
    window.location.reload();
  }

  function handleAdultFoodClick() {
    setAdultFood((prevAdultFood) => !prevAdultFood);
  }


  function allGuestsSelected(partyId) {
    const selected = selectedGuests[partyId];
    return selected && Object.values(selected).every((guest) => guest.Arrived === true);
  }

  function handleGuestClick(partyId, guestName) {
    setClickedGuests((prevClickedGuests) => ({
      ...prevClickedGuests,
      [partyId]: {
        ...(prevClickedGuests[partyId] || {}),
        [guestName]: !prevClickedGuests[partyId]?.[guestName],
      },
    }));
  }
  
  const calculateFoodOptions = (guests) => {
    const foodOptions = {};
  
    guests.forEach((guest) => {
      if (foodOptions[guest.FoodOption]) {
        foodOptions[guest.FoodOption]++;
      } else {
        foodOptions[guest.FoodOption] = 1;
      }
    });
  
    return foodOptions;
  };

  const calculateAllergies = (guests) => {
    const allergies = {};
  
    guests.forEach((guest) => {
      if (allergies[guest.Allergies]) {
        allergies[guest.Allergies]++;
      } else {
        allergies[guest.Allergies] = 1;
      }
    });
  
    return allergies;
  };


  const calibrateStock = async () => {
    console.log('Starting stock calibration...');
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    const allBookings = await DataStore.query(PartyBooking);
    const todaysBookings = allBookings.filter(
      (booking) =>
        new Date(booking.PartyDate) >= today && new Date(booking.PartyDate) < tomorrow
    );
  
    console.log(todaysBookings);
  
    const allGuests = await DataStore.query(PartyGuests);
    const guestsForToday = {};
  
    for (const booking of todaysBookings) {
      const guests = allGuests.filter((guest) => guest.partybookingID === booking.id);
      guestsForToday[booking.id] = guests;
    }
  
    console.log(guestsForToday);
  
    const foodCount = {};
  
    for (const bookingId in guestsForToday) {
      const guests = guestsForToday[bookingId];
      guests.forEach((guest) => {
        if (foodCount[guest.FoodOption]) {
          foodCount[guest.FoodOption]++;
        } else {
          foodCount[guest.FoodOption] = 1;
        }
      });
    }
  
    console.log(foodCount);
  
    const menuData = await DataStore.query(KitchenMenu);
    const foodNames = Object.keys(foodCount);
    const availableFoodOptions = menuData.filter((menu) => foodNames.includes(menu.Name));
  
    console.log(availableFoodOptions);
  
    for (const foodOption of availableFoodOptions) {
      const foodName = foodOption.Name;
      const portions = foodCount[foodName];
      const menuItem = (await DataStore.query(KitchenMenu)).find(
        (item) => item.Name === foodName
      );
  
      if (menuItem) {
        const remainingPortions = [];
  
        for (const ingredient of menuItem.Ingredients) {
          const requiredStock = ingredient.weight > 0 ? ingredient.weight : ingredient.quantity;
          const stockItem = await DataStore.query(StockControl, ingredient.id);
  
          if (stockItem) {
            await DataStore.save(
              StockControl.copyOf(stockItem, (updated) => {
                updated.CurrentStockLevel -= requiredStock * portions;
              })
            );
  
            remainingPortions.push(
              Math.floor(stockItem.CurrentStockLevel / requiredStock)
            );
          }
        }
  
        const minRemainingPortions = Math.min(...remainingPortions);
  
        await DataStore.save(
          KitchenMenu.copyOf(menuItem, (updated) => {
            updated.StockLevel = minRemainingPortions;
          })
        );
      }
      await DataStore.save(
        PartyBooking.copyOf(allBookings, (updated) => {
          updated.CalibrateStock = true;
        })
      );
    }
  }
  

const isPartyToday = parties.some(party => new Date(party.PartyDate).toDateString() === new Date().toDateString());
   

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center">
      {!isPartyToday || parties.Calibrate === true ? null : 
    <button className='bg-red-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' onClick={calibrateStock}>
        Calibrate Stock At Start of Day
    </button>
}

       </div>
{parties.filter(party => !party.PartyFoodComplete).map((party) => (
        <div key={party.id} className="mt-8">
          <div className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-purple-700">
                  Child's Name: {party.ChildName}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-purple-700">
                  Guests: {party.NoOfChildren}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-purple-700">
                  Party Time: {party.PartyTime}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-purple-700">
                  Party Date: {format(new Date(party.PartyDate), 'dd/MM/yyyy')}
                </p>
                <h3 className="mt-1 mb-5 truncate text-xs leading-5 text-purple-700">
                  Party Food Due: {party.PartyFoodTimeDue}
                </h3>
                {Object.entries(calculateFoodOptions(selectedGuests[party.id] || [])).map(([foodOption, count]) => (
        <p className='mt-1 truncate text-xs leading-5 text-orange-700' key={foodOption}>{`${foodOption}: ${count}`}</p>
      ))}
      {Object.entries(calculateAllergies(selectedGuests[party.id] || [])).map(([allergy, count]) => (
        <p className='mt-1 truncate text-xs leading-5 text-red-700' key={allergy}>{`Allergies: ${allergy}`}</p>
      ))}
      
              </div>
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => handleViewOrderClick(party.id)}
                className={classNames(
                  allGuestsSelected(party.id) ? 'bg-purple-500 ' : 'bg-purple-500 animate-pulse',
                  'px-4 py-2 rounded-md text-white mb-2'
                )}
                disabled={!selectedGuests[party.id]}
              >
                View Guests
              </button>
              <button
                onClick={() => handleConfirmClick(party)}
                className={classNames(
                  allGuestsSelected(party.id) ? 'bg-green-500' : 'bg-green-500 hover:bg-green-700',
                  'px-4 py-2 rounded-md text-white mb-2'
                )}
                disabled={!selectedGuests[party.id]}
              >
                Confirm
              </button>
              <button
                onClick={handleAdultFoodClick}
                className="bg-indigo-500 hover:bg-green-700 px-4 py-2 rounded-md text-white mb-2"
              >
                Adult Party Food
              </button>
            </div>
          </div>
          {fieldsetVisible[party.id] && (
          <fieldset>
            <legend className="sr-only">Party guests</legend>
            <div className="relative rounded-md bg-purple-100 w-full">
              
              {(selectedGuests[party.id] || []).map((guest, index) => (
                <div
                  key={guest.ChildName}
                  onClick={() => handleGuestClick(party.id, guest.ChildName)}
                  className={classNames(
                    'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6 w-full shadow-lg',
                    {
                      'bg-green-500': clickedGuests[party.id]?.[guest.ChildName], // Change color based on the click status
                    }
                  )}
                >
                  <span className="ml-3 w-full font-medium mt-5">
                    
                    <ol>
                      <li>
                        <span
                          className={classNames(
                            'inline-block h-4 w-4 rounded-full mr-2',
                            {
                              'bg-green-500': guest.Arrived,
                            }
                          )}
                        ></span>
                        {index + 1}
                      </li>
                      <li className='text-black text-xs'>{guest.ChildName}</li>
                      <li className='text-black text-xs text-bold'>{guest.FoodOption}</li>
                      <li className='text-red-900 text-sm'>Allergies: {guest.Allergies}</li>
                    </ol>
                  </span>
                </div>
              ))}
            </div>
          </fieldset>


          )}
          {adultFood && (
            <fieldset>
              <legend className="sr-only">Adult Food</legend>
              <div className="relative -space-y-px rounded-md bg-white">
                <li
                  key={party.id}
                  className="relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6"
                >
                  <p>{party.PartyAdultFoodChoices.join(', ')}</p>
                </li>
              </div>
            </fieldset>
          )}
        </div>
      ))}
    </div>
  );
  
}


