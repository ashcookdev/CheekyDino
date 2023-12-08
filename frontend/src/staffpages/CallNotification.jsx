// import { Fragment, useState, useEffect, useRef } from 'react'
// import { Transition } from '@headlessui/react'
// import io from 'socket.io-client';
// import Peer from 'simple-peer';

// export default function CallNotification() {
//   const [show, setShow] = useState(false);
//   const [peer, setPeer] = useState('');
//   const peersRef = useRef([]);
//   const streamRef = useRef();

//   useEffect(() => {
//     const socket = io('http://localhost:5100'); // Replace with your server URL

//     socket.on('incoming call', (data) => {
//       console.log('Incoming call from:', data.user);
//       setPeer(data.user);
//       setShow(true);
//       // Play a sound here
//     });

//     return () => {
//       socket.off('incoming call');
//     };
//   }, []);

//   const joinCall = () => {
//     navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
//       streamRef.current = stream;
//       socket.emit('join', { user: peer });
//       socket.on('user joined', (data) => {
//         const peer = createPeer(data.user, socket.id, stream);
//         peersRef.current.push(peer);
//       });
//     });
//   };

//   const handleConnect = () => {
//     joinCall();
//     setShow(false);
//   };

//   const handleLeave = () => {
//     socket.emit('leave', { user: user });
//     setShow(false);
//   };

//   const createPeer = (userToSignal, callerID, stream) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', (signal) => {
//       socket.emit('sending signal', { userToSignal, callerID, signal });
//     });

//     return peer;
//   };

//   return (
//     <>
//       {/* Global notification live region, render this permanently at the end of the document */}
//       <div
//         aria-live="assertive"
//         className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
//       >
//         <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
//           {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
//           <Transition
//             show={show}
//             as={Fragment}
//             enter="transform ease-out duration-300 transition"
//             enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
//             enterTo="translate-y-0 opacity-100 sm:translate-x-0"
//             leave="transition ease-in duration-100"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//               <div className="w-0 flex-1 p-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 pt-0.5">
//                     <img
//                       className="h-10 w-10 rounded-full"
//                       src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
//                       alt=""
//                     />
//                   </div>
//                   <div className="ml-3 w-0 flex-1">
//                     <p className="text-sm font-medium text-gray-900">{peer}</p>
//                     <p className="mt-1 text-sm text-gray-500">Incoming call...</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex border-l border-gray-200">
//                 <button
//                   type="button"
//                   className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onClick={handleConnect}
//                 >
//                   Connect
//                 </button>
//                 <button
//                   type="button"
//                   className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   onClick={handleLeave}
//                 >
//                   Leave
//                 </button>
//               </div>
//             </div>
//           </Transition>
//         </div>
//       </div>
//     </>
//   )
// }
