
import { DataStore, Predicates } from "aws-amplify";
import { CafeOrder, Sessions } from "./models";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function TillPayment({ order, total, table, setOrder, setTotal, childName }) {

    const [paymentMethod, setPaymentMethod] = useState(null);
  const [amountEntered, setAmountEntered] = useState(0);
    const [isFlashing, setIsFlashing] = useState(false);
    const [orders , setOrders] = useState([])
    const [prep, setPrep] = useState([])

  

console.log(orders)
const navigate = useNavigate();



    const handleConfirmClick = async () => {
      const currentTime = new Date();
      const options = {
        timeZone: 'Europe/London',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        millisecond: '2-digit',
      };

    
      
      const awstime = currentTime.toLocaleTimeString('en-GB', options);
  
      const sessions = await DataStore.query(Sessions, Predicates.ALL);
      const session = sessions.find(
        (s) => s.Table === table && s.Arrived === true && s.LeftCenter === false
      );
  
      if (!session) {
        alert('Error: No customer at table');
        return;
      }
  
      // Update the session with the new order and total price
      await DataStore.save(
        Sessions.copyOf(session, (updated) => {
          updated.Orders += 1;
          updated.TotalSpent += total;
        })
      );
      console.log('Session updated');
      const hotItems = orders.filter(item => item.Kitchen).map(item => item.Name);
      
// convert prep time to string
const prepTime = prep.toString();



      const drinkItems = orders.filter(item => !item.Kitchen).map(item => item.Name);
      const kitchen = hotItems.length > 0;
      
      await DataStore.save(
        new CafeOrder({
          HotItems: hotItems,
          DrinkItems: drinkItems,
          CreatedTime: awstime,
          CreatedDate: new Date().toISOString().split('T')[0],
          Total: total,
          Table: table,
          Completed: !kitchen,
          Sessionid: session.id,
          Delieved: !kitchen,
          Kitchen: kitchen,
          HotOrderPrep: prepTime,
          KitchenMenuId: orders.map(item => item.ID),
          TotalNoVAT: total / 1.2,
        })
      );
      
      console.log('Order confirmed' + session.id);
      // Reset the order and total price
      setOrder([]);
      setTotal(0);
        setPaymentMethod(null);
        setAmountEntered(0);
        setIsFlashing(false);
        window.location.reload();
    };
  
const handleCashClick = () => {
    setPaymentMethod('cash');
    setOrders(order)
    setAmountEntered(0);
    };




   const newtotal = order.reduce((acc, item) => acc + item.Price, 0);
const change = amountEntered - total;

const handleDenominationClick = (amount) => {
  setAmountEntered(amountEntered + amount);
};

const handleNumberClick = (number) => {
  setAmountEntered((amountEntered * 10 + number) / 100);
};

const handleCardClick = () => {
  setPaymentMethod('card');
  setIsFlashing(true);
  setOrders(order)
};


useEffect(() => {

let totalPrepInMinutes = 0;
order.forEach((item) => {
  const [hours, minutes] = item.Prep.split(":").map(Number);
  totalPrepInMinutes += hours * 60 + minutes;
});
const totalHours = Math.floor(totalPrepInMinutes / 60);
const totalMinutes = totalPrepInMinutes % 60;
const totalPrep = `${totalHours}:${totalMinutes.toString().padStart(2, "0")}`;
setPrep(totalPrep);
}, [order]);


return (
  <div className="grid grid-cols-3 gap-4 p-4">
    <div className="border-r border-gray-300 pr-4">
      <div className="flex flex-col gap-2">
        <button
          className={`${
            paymentMethod === 'cash' ? 'bg-green-700' : 'bg-green-500'
          } text-white p-2 rounded`}
          onClick={handleCashClick}
        >
          Cash
        </button>
        <button
          className={`${
            paymentMethod === 'card' ? 'bg-blue-700' : 'bg-blue-500'
          } text-white p-2 rounded`}
          onClick={handleCardClick}
        >
          Card
        </button>
      </div>
      {paymentMethod === 'cash' && (
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="bg-gray-200 p-2 rounded"
            onClick={() => handleDenominationClick(5)}
          >
            £5
          </button>
          <button
            className="bg-gray-200 p-2 rounded"
            onClick={() => handleDenominationClick(10)}
          >
            £10
          </button>
          <button
            className="bg-gray-200 p-2 rounded"
            onClick={() => handleDenominationClick(20)}
          >
            £20
          </button>
        </div>
      )}
    </div>
    <div className="grid grid-cols-3 gap-2 border-r border-gray-300 pr-4">
      {[...Array(9)].map((_, i) => (
        <button
          className="bg-gray-200 p-2 rounded"
          onClick={() => handleNumberClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="bg-gray-200 p-2 rounded"
        onClick={() => handleNumberClick(0)}
      >
        0
      </button>
    </div>
    <div>
      
      <ul>
        {table && <li>Table: {table}</li>}
        {childName && <li>Child: {childName}</li>}
        
        {order.map((item, index) => (
          <li key={index} className="mb-2">
            {item.Name} £{item.Price.toFixed(2)}
          </li>
          
        ))}
      </ul>
      {order.map((item, index) => (
          <li key={index} className="mb-2">
            {item.Prep}
          </li>
          
        ))}

      {paymentMethod === 'cash' && (
        <>
          <p>Amount entered: £{amountEntered.toFixed(2)}</p>
          {change > 0 && <p>Change: £{change.toFixed(2)}</p>}
        </>
      )}
      {paymentMethod === 'card' && (
        <>
          <p>Full amount: £{total.toFixed(2)}</p>
        </>
      )}
      <p className="text-bold">Total: £{total.toFixed(2)}</p>
      <div className="mt-4">
        <button
          className={`${
            isFlashing ? 'animate-pulse' : ''
          } bg-purple-500 text-white p-2 rounded w-full`}
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);}
