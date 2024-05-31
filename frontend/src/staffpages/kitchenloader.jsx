import { CakeIcon } from "@heroicons/react/20/solid";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-purple-200 border border-purple-500 shadow-lg p-4 rounded-md">
      <CakeIcon className="h-12 w-12 text-purple-500 animate-spin" />  {/* Add the CakeIcon with spin animation. */}
      <p className="text-lg font-medium text-gray-700">Sending to kitchen... Please wait</p>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}
