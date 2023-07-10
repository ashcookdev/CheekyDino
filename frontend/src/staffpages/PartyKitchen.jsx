import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { PartyBooking, PartyGuests, Messages } from './models';
import { format } from 'date-fns';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}



export default function Kitchen() {
  const [currentTime, setCurrentTime] = useState(0);
  const [party, setPartyBookings] = useState([]);
  const [partyGuests, setPartyGuests] = useState([]);
  const [selected, setSelected] = useState({});
  const allGuestsSelected = selected.length === partyGuests.length;
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [fieldsetVisible, setFieldsetVisible] = useState(false);
  const [noPartyBookings, setNoPartyBookings] = useState(false);

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MMMM dd, yyyy');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = format(currentTime, 'h:mm:ss a');

  console.log(selected);

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
    console.log(partyBookings);
    setPartyBookings(partyBookings);
    if (partyBookings.length > 0) {
      setNoPartyBookings(false);
      const partybookingId = partyBookings[0].id;
      const partyGuests = await DataStore.query(PartyGuests);
      // get booking id from party booking and filter results from party guests
      const guests = partyGuests.filter((guest) => guest.partybookingID === partybookingId);
      console.log(guests);
      setPartyGuests(guests);
    } else {
      setNoPartyBookings(true);
    }
  }

  const stats = [
    { id: 1, name: 'Partys Today', value: party.length },
    { id: 2, name: 'Tables Occupied', value: '$119 trillion' },
    { id: 3, name: 'Current Orders', value: '46,000' },
  ];

  useEffect(() => {
    fetchTodaysPartyBookings();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(PartyBooking).subscribe(() =>
      fetchTodaysPartyBookings()
    );
    return () => subscription.unsubscribe();
  }, []);

  function handleViewOrderClick() {
    setFieldsetVisible((prevVisible) => !prevVisible);
  }

  function handleRadioChange(event) {
    const { name, value } = event.target;
    setSelected((prevSelected) => ({ ...prevSelected, [name]: JSON.parse(value) }));
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
      })
    );

    await DataStore.save(
      new Messages({
        content: 'Food Ready for ' + party.ChildName + ' Party Come to the Kitchen',
        createdAt: awstime,
        email: 'Kitchen',
        group: ['Staff', 'Kitchen', 'Team Leader'],
      })
    );
    window.location.reload();
  }

  return (
   

   
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

    
<ul className="divide-y divide-gray-100 bg-gray-900 rounded-lg shadow-lg">
{noPartyBookings && <p className='text-white'>No party bookings today.</p>}

{party
  .filter((booking) => !booking.PartyFoodComplete)
  .sort((a, b) => new Date(a.PartyTime) - new Date(b.PartyTime))
  .concat(bookingConfirmed ? party.shift() : [])
  .map((party) => {
            let buttonClasses = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';

            return (
              <li
                key={party.id}
                className={classNames(
                  bookingConfirmed ? 'bg-green-500' : 'bg-black',
                  'flex justify-between gap-x-6 py-5'
                )}
              >
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-white">
                      Child's Name: {party.ChildName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-white">
                      Guests: {party.NoOfChildren}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-white">
                      Start Time: {party.PartyTime}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-white">
                      Party Type: {party.PartyType}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-white">
                      Finish Time: {party.PartyFinish}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-white">
                      Party Food Time: {party.PartyFoodTimeDue}
                    </p>

                  {/* Render guest information */}
<ul className="mt-4 space-y-2">
  {Object.keys(selected).map((key) => {
    if (selected[key] && selected[key].Arrived === true) {
      return (
        <li key={key}>
          {selected[key].ChildName} - {selected[key].FoodOption}
        </li>
      );
    }
  })}
</ul>





                  </div>
                </div>
                <div className='flex'>
                  <button
                    onClick={handleViewOrderClick}
                    className={classNames(
                      allGuestsSelected ? 'bg-green-500 ' : 'bg-green-500 animate-pulse',
                      'px-4 py-2 rounded-md text-white mr-2'
                    )}
                    disabled={!selected}
                  >
                    View        </button>
                  <button
                    onClick={() => handleConfirmClick(party)}
                    className={classNames(
                      allGuestsSelected ? 'bg-green-500' : 'bg-green-500 hover:bg-green-700',
                      'px-4 py-2 rounded-md text-white mr-2'
                    )}
                    disabled={!selected}
                  >
                    Confirm
                  </button>
                </div>

              </li>
            );
          })}
      </ul>
      {fieldsetVisible && (

        <fieldset>
          <legend className="sr-only">Party guests</legend>
          <div className="relative -space-y-px rounded-md bg-white">
            {partyGuests.map((guest) => (
              <div key={guest.ChildName} className="relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name={guest.ChildName}
                    value={JSON.stringify(guest)}
                    onChange={handleRadioChange}
                    className="h-4 w-4 rounded  flex items-center justify-center"
                  />

                  <span className="ml-3 font-medium">{guest.ChildName}- {guest.FoodOption}- Allergies- {guest.Allergies} </span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      )}




    </div>




  )
}
