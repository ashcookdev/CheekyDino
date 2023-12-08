import { CheckIcon, CogIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { DataStore, Predicates } from 'aws-amplify'
import { CafeOrder, Sessions } from '../models'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import './orderprogress.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CustomerOrderProgress() {
  const [cafeOrder, setCafeOrder] = useState(null);

    const navigate = useNavigate();

    console.log(cafeOrder)




    useEffect(() => {
      const fetchCafeOrder = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.attributes.email;
    
        // search for the session id that matches the email address of the user
        const sessions = await DataStore.query(Sessions, Predicates.ALL, {
          filter: s => s.Email('eq', userId)
        });
    
        // search for the cafe order that matches the session id
        const cafeOrders = await DataStore.query(CafeOrder, Predicates.ALL, {
          filter: c => c.Sessionid('eq', sessions)

        });
        const filteredCafeOrders = cafeOrders.filter(cafeOrder => cafeOrder.Completed === false && cafeOrder.Delieved === false|| cafeOrder.Completed === true && cafeOrder.Delieved === false);
        setCafeOrder(filteredCafeOrders[0]);
    
        // subscribe to changes in the CafeOrder model
        const subscription = DataStore.observe(CafeOrder).subscribe((msg) => {
          if (msg.model.Sessionid === sessions && (msg.model.Delieved === true || msg.model.Completed === true)) {
            setCafeOrder(msg.model);
          }
        });
      }
    
      fetchCafeOrder();
    }, []);
    


  if (!cafeOrder) {
    return (
        <div>
          <h5 className="text-2xl font-bold text-center">No Current Orders</h5>
        </div>
      );
  }

  let status;
  if (!cafeOrder.Completed && !cafeOrder.Delieved) {
    status = 'Cooking';
  } else if (cafeOrder.Completed && !cafeOrder.Delieved) {
    status = 'Being sent to table';
  } else if (cafeOrder.Completed && cafeOrder.Delieved) {
    status = 'Delivered';
  }

  const timeline = [
    {
      id: 1,
      content: 'Order status:',
      target: 'Cooking',
      icon: CogIcon,
      iconBackground: status === 'Cooking' ? 'bg-green-500' : 'bg-gray-300',
    },
    {
      id: 2,
      content: 'Order status:',
      target: 'Ready',
      icon: HandThumbUpIcon,
      iconBackground: status === 'Being sent to table' ? 'bg-green-500' : 'bg-gray-300',
    },
    {
      id: 3,
      content: 'Order status:',
      target: 'Delivered',
      icon: CheckIcon,
      iconBackground: status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300',
    },
  ];
  
  let backgroundImage;
  if (!cafeOrder.Completed && !cafeOrder.Delieved) {
    backgroundImage = 'url(https://media.giphy.com/media/WStuqMy7FTZrSHAYNE/giphy.gif)';
  } else if (cafeOrder.Completed && !cafeOrder.Delieved) {
    backgroundImage = 'url(https://media.giphy.com/media/3oKHW5ygEPHUNrb1SM/giphy.gif)';
  } else if (cafeOrder.Completed && cafeOrder.Delieved) {
    backgroundImage = 'url(/path/to/delivered.jpg)';
  }

  if (cafeOrder.Completed && cafeOrder.Delieved === true) {
    return null;
    }

    return (
      <div className="container mx-auto my-4 p-4 rounded-lg shadow-md bg-orange-500 bg-cover" style={{ backgroundImage: backgroundImage }}>
        <div className="flex flex-col items-center mb-4 bg-transparent">
          <h2 className="text-2xl font-semibold mb-2 component-title text-white">Order Information</h2>
          <div className="flex flex-col md:flex-row">
            <p className="text-lg mr-4 component-title text-white">Table: {cafeOrder.Table}</p>
            <p className="text-lg text-white">Hot Items:</p>
            <ol role="list" className="list-disc list-inside ml-4 mr-4 text-white">
              {cafeOrder.HotItems.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
    
        <div className="flex justify-center mb-4">
          <ol role="list" className="flex flex-col md:flex-row text-lg ">
            {timeline.map((event, eventIdx) => (
              <li key={event.id} className="flex flex-col items-center mb-4 mr-5 md:mb-0">
                <div className="relative pb-8">
                  <div className="relative flex flex-col items-center space-y-3 mr-5">
                    <div>
                      <span
                        className={classNames(
                          event.iconBackground,
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                        )}
                      >
                        <event.icon
                          className={classNames('h-8 w-8 text-white', event.target === status && 'animate-spin')}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5 border-black">
                      <div>
                        <p className="text-lg text-black">
                          <a href={event.href} className="font-medium text-white">
                            {event.target}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
    
    
      
}
