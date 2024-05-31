import {
    ArrowDownIcon,
    ArrowUpIcon,
    CursorArrowRaysIcon,
    EnvelopeOpenIcon,
    UsersIcon
  } from '@heroicons/react/20/solid';
  import { useEffect, useState } from 'react';
  import { DataStore, Predicates } from 'aws-amplify';
  import { Sessions, PartyBooking, StockControl, CafeOrder, ClockIns, } from '../models';
  import { format, isToday, parse } from 'date-fns';
import { ArrowRightCircleIcon, CakeIcon, ClockIcon, CurrencyPoundIcon, ScaleIcon, ShoppingBagIcon, TableCellsIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { id } from 'date-fns/locale';


    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
        }

  
 export default function FinancialStats() {
    const [sessions, setSessions] = useState([]);
    const [partyBookings, setPartyBookings] = useState([]);
    const [cafeOrders, setCafeOrders] = useState([]);
    const [staff, setStaff] = useState([]);

 

  
    const fetchSessions = async () => {
      const sessions = await DataStore.query(Sessions);
      setSessions(sessions);
    };
  
    const fetchCafeOrders = async () => {
        const cafeOrders = await DataStore.query(CafeOrder);
        setCafeOrders(cafeOrders);
        };

    const fetchStaff = async () => {
        const staff = await DataStore.query(ClockIns);
        setStaff(staff);





        };


    const fetchPartyBookings = async () => {
      const partyBookings = await DataStore.query(PartyBooking);
      setPartyBookings(partyBookings);
    };
   




    // work out staff costs 


    useEffect(() => {
      fetchSessions();
      fetchPartyBookings();
        fetchCafeOrders();
        fetchStaff();
    }, []);


  
    const currentGuests = sessions.filter(
      session => session.Arrived === true && session.LeftCenter === false
    );
    const addGuests = currentGuests.reduce((acc, session) => acc + session.Children + session.Adults, 0);
  
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  
    const yesterdaySessions = sessions.filter(session => session.Date === yesterday);
    const yesterdayGuests = yesterdaySessions.reduce(
      (acc, session) => acc + session.Children + session.Adults,
      0
    );
  
    const guestsChange = addGuests - yesterdayGuests;
  
    const today = format(new Date(), 'yyyy-MM-dd');

    const todaySessions = sessions.filter(session => {
      const sessionDate = parse(session.Date, 'yyyy-MM-dd', new Date());
      return isToday(sessionDate);
    });
    
      const cleanTables = sessions.filter(session => session.CleanTable === true && session.TableCleaned === false);


    
    const todayTotalSpend = todaySessions.reduce((total, session) => total + (session.TotalSpent || 0), 0);

    const yesterdayTotalSpend = yesterdaySessions.reduce((total, session) => total + (session.TotalSpent || 0), 0);

    const totalSpendChange = todayTotalSpend - yesterdayTotalSpend;
  

    const currentTime = format(new Date(), 'HH:mm');    
    const futureBookings = sessions.filter(session => session.TimeslotFrom > currentTime && session.Date === today && session.Arrived === false);
    const futureSessionsCount = futureBookings.length;

  
    const occupiedTables = sessions.filter(session => session.Arrived === true && session.LeftCenter === false).length;
    const totalTables = sessions.filter(session => session.Table).length;
  
    const totalSpendAllSessions = sessions.reduce((total, session) => total + (session.TotalSpent || 0), 0);
    const averageSpendPerSession = totalSpendAllSessions / sessions.length;
  
    const partyBookingsTodayCount = partyBookings.filter(booking => booking.PartyDate === today).length;

    const currentOrders = cafeOrders.filter(order => order.Completed === false && order.Delieved === false && order.Date === today);
    const currentOrdersCount = currentOrders.length;

    // yesterdays average spend

    const yesterdaySessionsTotalSpent = yesterdaySessions.reduce((total, session) => total + (session.TotalSpent || 0), 0);
const totalAllSessions = yesterdaySessionsTotalSpent / yesterdaySessions.length;


// find out how many staff are clocked in

const staffClockedIn = staff.filter(staff => staff.ClockedIn === true && staff.ClockedOut === false && today === staff.Date);
const staffClockedInCount = staffClockedIn.length;

const staffOnBreak = staff.filter(staff => staff.Break === true);
const staffOnBreakCount = staffOnBreak.length;

// find out how much staff costs are 




const mostPopularDrink = cafeOrders.reduce((acc, order) => {
  order.DrinkItems.forEach((drink) => {
    if (acc[drink]) {
      acc[drink] += 1;
    } else {
      acc[drink] = 1;
    }
  });
  return acc;
}, {});

const mostPopularMeal = cafeOrders.reduce((acc, order) => {
  order.HotItems.forEach((meal) => {
    if (acc[meal]) {
      acc[meal] += 1;
    } else {
      acc[meal] = 1;
    }
  });
  return acc;
}, {});


  const highestGrossingTable = sessions.reduce((acc, session) => {
    if (acc[session.Table]) {
      acc[session.Table] += session.TotalSpent;
    } else {
      acc[session.Table] = session.TotalSpent;
    }
    return acc;

  }, {});


  
    const stats = [
      {
        id: 1,
        name: 'Current Session Guests',
        stat: addGuests,
        icon: UsersIcon,
        change: guestsChange,
        changeType: guestsChange >= 0 ? 'increase' : 'decrease'
      },
      {
        id: 2,
        name: 'Total Spend Today',
        stat: `£${todayTotalSpend.toFixed(2)}`,
        icon: CurrencyPoundIcon,
        change: `£${totalSpendChange.toFixed(2)}`,
        changeType: totalSpendChange >= 0 ? 'increase' : 'decrease'
      },
      {
        id: 3,
        name: 'Current Orders',
        stat: currentOrdersCount,
        icon: ShoppingBagIcon,
        change: '', // You can provide a description here if needed
      },
      {
        id: 4,
        name: 'Tables Occupied',
        stat: occupiedTables,
        icon: TableCellsIcon,
        change: '', // You can provide a description here if needed
      },
      {
        id: 9,
        name: 'Clean Tables',
        stat: cleanTables.length,
        icon: CursorArrowRaysIcon,
        change: '', // You can provide a description here if needed
      },
      {
        id: 5,
        name: 'Future Sessions',
        stat: futureSessionsCount,
        icon: ArrowRightCircleIcon,
        change: '', // You can provide a description here if needed
      },
      {
        id: 6,
        name: 'Party Bookings Today',
        stat: partyBookingsTodayCount,
        icon: CakeIcon,
        change: '', // You can provide a description here if needed
      },
      {
        id: 7,
        name: 'Average Spend',
        stat: `£${averageSpendPerSession.toFixed(2)}`,
        icon: ScaleIcon,
        change: '', // You can provide a description here if needed
        changeType: totalSpendChange >= 0 ? 'increase' : 'decrease'
      },
      {
        id: 8,
        name: 'Staff On Break',
        stat: staffOnBreakCount,
        icon: UsersIcon,
        change: '', // You can provide a description here if needed
        changeType: totalSpendChange >= 0 ? 'increase' : 'decrease'
    },

      {
        id: 10,
        name: 'Staff Clocked In',
        stat: staffClockedInCount,
        icon: UserGroupIcon,
      },

      {
        id: 11,
        name: 'Most Popular Drink',
        stat: mostPopularDrink && Object.keys(mostPopularDrink).length > 0 ? Object.keys(mostPopularDrink).reduce((a, b) => mostPopularDrink[a] > mostPopularDrink[b] ? a : b) : 'null',
        icon: EnvelopeOpenIcon,
      },
      {
        id: 12,
        name: 'Most Popular Meal',
        stat: mostPopularMeal && Object.keys(mostPopularMeal).length > 0 ? Object.keys(mostPopularMeal).reduce((a, b) => mostPopularMeal[a] > mostPopularMeal[b] ? a : b) : 'null',
        icon: EnvelopeOpenIcon,
      }
      

      
      
     




      
      
       
    ];
  
    const todaysDate = format(new Date(), 'do MMMM yyyy');
  
   
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">{todaysDate}</h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}

                <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {item.change}
              </p>
             
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
