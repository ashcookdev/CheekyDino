import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { useEffect, useState, useRef } from 'react'
import { Auth } from 'aws-amplify'
// import Peer from 'simple-peer';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:5253');

export default function Example() {

  // check if its electron or web 




  
//   const [user, setUser] = useState(null);
//   const [callActive, setCallActive] = useState(false);
//   const [peers, setPeers] = useState([]);
//   const peersRef = useRef([]);
//   const streamRef = useRef();

//   // get current email address of logged in user
//   useEffect(() => {
//     Auth.currentAuthenticatedUser().then(user => {
//       setUser(user.attributes.email)
//     })
//   }, [])

  // listen for 'voice' events from the server
//   useEffect(() => {
//     socket.on('voice', (data) => {
//       // A user is speaking
//       console.log('User is speaking:', data.user);

//       // Play the voice data
//       var audio = new Audio(data.voice);
//       audio.play();
//     });
//   }, []);

//   const joinCall = () => {
//     navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
//       streamRef.current = stream;
//       socket.emit('join', { user: user });
//       socket.on('user joined', (data) => {
//         const peer = createPeer(data.user, socket.id, stream);
//         peersRef.current.push(peer);
//         setPeers(prevPeers => [...prevPeers, data.user]);
//       });
//       setCallActive(true);
//     });
//   };

//   const leaveCall = () => {
//     socket.emit('leave', { user: user });
//     setCallActive(false);
//     setPeers([]);
//   };

//   const createPeer = (user, callerID, stream) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: stream,
//     });

//     peer.on('signal', signal => {
//       socket.emit('offer', { signal, callerID, user });
//     });

//     peer.on('stream', handleStream);

//     return peer;
//   };

//   const handleStream = (stream) => {
//     document.getElementById('remoteAudio').srcObject = stream;
//     document.getElementById('remoteAudio').play();
//   };

//   useEffect(() => {
//     socket.on('offer', handleOffer);
//     socket.on('answer', handleAnswer);
//   }, []);

//   const handleOffer = (data) => {
//     const peer = createPeer(data.user, socket.id, streamRef.current);
//     peer.signal(data.signal);
//     peersRef.current.push(peer);
//   };

//   const handleAnswer = (data) => {
//     const peer = peersRef.current.find(p => p.peerID === data.id);
//     if (peer) {
//       peer.signal(data.signal);
//     }
//   };

  return (
<div>
    <div className="flex">
        <h1 className="text-3xl font-bold">Audio Chat coming soon!</h1>
            

</div>






</div>


    )
}




// //<div className={` px-4 py-5 sm:px-6 mt-5 ${callActive ? 'bg-green-500' : 'bg-white'}`}>
// <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
// <div className="ml-4 mt-4">
//   <div className="flex items-center">
//     <div className="flex-shrink-0">
//       <img
//         className="h-12 w-12 rounded-full"
//         src="./versa.gif"
//         alt=""
//       />
//     </div>
//     <div className="ml-4">
//       <h3 className="text-base font-semibold leading-6 text-gray-900">{user}</h3>
//       <p className="text-sm text-gray-500">
//       </p>
//     </div>
//   </div>
// </div>
// <div className="ml-4 mt-4 flex flex-shrink-0">
//   {!callActive ? (
//     <button
//       type="button"
//       className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//       onClick={joinCall}
//     >
//       <PhoneIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
//       <span>Join</span>
//     </button>
//   ) : (
//     <button
//       type="button"
//       className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//       onClick={leaveCall}
//     >
//       <PhoneIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
//       <span>Leave</span>
//     </button>
//   )}
// </div>
// </div></div>
// <div className="flex">
// <div className="w-1/2">
// <ul>
// <div className="border-r border-gray-200 bg-white px-4 py-5 sm:px-6">
//   <h3 className="text-base font-semibold leading-6 text-gray-900">Connect Users</h3>
  
// </div>
//   {peers.map((peer) => (
//     <li key={peer} className={` border-gray-200 px-4 py-5 sm:px-6 mt-5 ${peer === callActive ? 'bg-green-500' : 'bg-white'}`}>
//       <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
//         <div className="ml-4 mt-4">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <img
//                 className="h-12 w-12 rounded-full"
//                 src={peer === callActive ? "./ringing.gif" : "./versa.gif"}
//                 alt=""
//               />
//             </div>
//             <div className="ml-4">
//               <h3 className="text-base font-semibold leading-6 text-gray-900">{peer}</h3>
//               <p className="text-sm text-gray-500">
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//   ))}
// </ul>
// </div>
// <div className="w-1/2">
//   {/* Your existing component code */}
// </div>
// {/* Style your new component here */}
// </div>