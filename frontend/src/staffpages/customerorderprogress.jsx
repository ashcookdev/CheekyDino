import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { DataStore, Predicates } from 'aws-amplify'
import { CafeOrder } from './models'
import { useNavigate } from 'react-router-dom'
import './orderprogress.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CustomerOrderProgress({sessionId}) {
  const [cafeOrder, setCafeOrder] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
  const fetchCafeOrder = async () => {
    const cafeOrders = await DataStore.query(CafeOrder, Predicates.ALL, {
      filter: c => c.Sessionid('eq', sessionId)
    });
    setCafeOrder(cafeOrders[0]);
  }

  fetchCafeOrder();

  const subscription = DataStore.observe(CafeOrder).subscribe((msg) => {
    if (msg.model.Sessionid === sessionId) {
      setCafeOrder(msg.model);
    }
  });

  return () => subscription.unsubscribe();
}, [sessionId]);
      

  if (!cafeOrder) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
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
      icon: CheckIcon,
      iconBackground: status === 'Cooking' ? 'bg-green-500' : 'bg-gray-300',
    },
    {
      id: 2,
      content: 'Order status:',
      target: 'Being sent to table',
      icon: CheckIcon,
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
    backgroundImage = 'url(https://media.giphy.com/media/FM7Dhn7JIgngDAhij6/giphy.gif)';
  } else if (cafeOrder.Completed && !cafeOrder.Delieved) {
    backgroundImage = 'url(https://media.giphy.com/media/8Bv8MBkdjnPKB6r59o/giphy.gif)';
  } else if (cafeOrder.Completed && cafeOrder.Delieved) {
    backgroundImage = 'url(/path/to/delivered.jpg)';
  }

  if (cafeOrder.Completed && cafeOrder.Delieved === true) {
    return (navigate('/sessionbookings'))
    }

    return (
        <div className="bg-cover bg-center" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className="flex justify-center bg-black text-white p-4 rounded-lg overflow-hidden relative mb-10">
      <div className="flex relative animate-marquee">
        <div className="flex pr-4">
          <p className="text-lg mr-4">Table: {cafeOrder.Table}</p>
          <p className="text-lg">Hot Items:</p>
          <ul role="list" className="list-disc list-inside ml-4">
            {cafeOrder.HotItems.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex pr-4">
          <p className="text-lg mr-4">Table: {cafeOrder.Table}</p>
          <p className="text-lg">Hot Items:</p>
          <ul role="list" className="list-disc list-inside ml-4">
            {cafeOrder.HotItems.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center h-full ">
   
            <ul role="list" className="text-lg bg-opacity-90 backdrop-blur-md max-w-md sm:max-w-none">
              {timeline.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8 ">
                    {eventIdx !== timeline.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={classNames(
                            event.iconBackground,
                            'h-12 w-12 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
<event.icon className={classNames('h-8 w-8 text-white', event.target === status && 'animate-spin')} aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-lg text-white">
                            {event.content}{' '}
                            <a href={event.href} className="font-medium text-gray-900">
                              {event.target}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
      
}
