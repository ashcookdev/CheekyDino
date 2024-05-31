import { DataStore } from 'aws-amplify';
import { CafeOrder } from './models';
import { useState, useEffect } from 'react';

export default function CafeOrderStatus({ cafeOrderId }) {
  const [status, setStatus] = useState('');

  console.log(status);

  useEffect(() => {
    async function fetchCafeOrderStatus() {
      const cafeOrder = await DataStore.query(CafeOrder, cafeOrderId);
      console.log(cafeOrder);
      updateStatus(cafeOrder);
    }
    fetchCafeOrderStatus();

    const subscription = DataStore.observe(CafeOrder, cafeOrderId).subscribe((msg) => {
      updateStatus(msg.model);
    });

    return () => subscription.unsubscribe();
  }, [cafeOrderId]);

  function updateStatus(cafeOrder) {
    if (!cafeOrder.Completed && !cafeOrder.Delieved) {
      setStatus('Cooking');
    } else if (cafeOrder.Completed && !cafeOrder.Delieved) {
      setStatus('On its way');
    } else if (cafeOrder.Completed && cafeOrder.Delieved) {
      setStatus('');
    }
  }

  let progress = 0;
  if (status === 'Cooking') {
    progress = 33;
  } else if (status === 'On its way') {
    progress = 66;
  } else if (status === '') {
    progress = 100;
  }

  return (
    <div>
      <h4 className="sr-only">Status</h4>
      {progress < 100 && (
        <>
          <p className="text-sm font-medium text-gray-900">{status}</p>
          <div className="mt-6" aria-hidden="true">
            <div className="overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
              <div className="text-indigo-600">Cooking</div>
              <div className="text-center text-indigo-600">On its way</div>
              <div className="text-right">Delivered</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
