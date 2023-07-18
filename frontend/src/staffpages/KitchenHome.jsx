import KitchenStats from "./KitchenStats";
import CafeKitchen from "./CafeKitchen";
import PartyKitchen from "./PartyKitchen";
import { format } from "date-fns";

export default function Kitchen() {

  const now = new Date();

  // Format the time and date using date-fns
  const time = format(now, "h:mm a");
  const date = format(now, "EEEE, MMMM do, yyyy");

  // Add your kitchen stats here


  return (
    <div className="bg-black mx-auto max-w-7xl sm:px-6 lg:px-8" style={{backgroundImage: `url(/background.gif)`}}>
    <div className="text-white py-6">
      <h1 className="text-2xl font-medium">Kitchen</h1>
      <p className="mt-2">
        {time} | {date}
      </p>
      <div className="mt-4"></div>
    </div>
  
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-medium text-white">Orders</h2>
          <CafeKitchen />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-medium text-white">Party</h2>
          <PartyKitchen />
        </div>
      </div>
    </div>  

  );
}






  