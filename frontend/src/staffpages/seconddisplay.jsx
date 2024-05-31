import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../customer-pages/customerfont.css'

const FullScreenComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [screenNumber, setScreenNumber] = useState(null);
    const [showData, setShowData] = useState(false);
    const [data, setData] = useState({});

    const dinosaurGifUrl = "https://img.freepik.com/free-vector/game-landscape-with-tropical-plants_105738-749.jpg";

    const navigate = useNavigate();

    // Define ipcRenderer
    let ipcRenderer = null;

    // Define your WebSocket connection at the top of your component
    const socket = new WebSocket('ws://localhost:5253');

    // Check if running in Electron
    const isElectron = window && window.process && window.process.type;
    if (isElectron) {
        const electron = window.require('electron'); // Importing electron in renderer process
        ipcRenderer  = electron.ipcRenderer;

        useEffect(() => {
            ipcRenderer.on('show-form', () => {
              setShowForm(true);
              setShowData(false);
            });
      
            ipcRenderer.on('screen-number', (event, number) => {
              setScreenNumber(number);
            });
      
            ipcRenderer.on('show-data', (event, data) => {
              console.log(data);
              setShowForm(false);
              setShowData(true);
              console.log(data);
              setData(data);
            });

            ipcRenderer.on('new-customer', () => {
                setShowForm(false);
                setShowData(false);
            }
            );

      
            // Clean up the event listeners
            return () => {
              ipcRenderer.removeAllListeners('show-form');
              ipcRenderer.removeAllListeners('screen-number');
              ipcRenderer.removeAllListeners('show-data');
              ipcRenderer.removeAllListeners('new-customer');
            };
          }, []);
        }


    return (

        <div className="fixed inset-0 flex items-center justify-center" 
             style={{ backgroundImage: `url(${dinosaurGifUrl})`, backgroundSize: 'cover' }}>

            {showForm ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <form className="space-y-4 bg-white bg-opacity-50 p-4 rounded-lg">

  <input className="border p-4 text-xl rounded-full component-title" type="text" placeholder="Name" onChange={(event) => {
    const message = {
      field: 'name',
      value: event.target.value,
    };
    socket.send(JSON.stringify(message));
  }}/>
 <input 
  className="border p-4 text-xl rounded-full component-title" 
  type="email" 
  placeholder="Email" 
  onChange={(event) => {
    const message = {
      field: 'email',
      value: event.target.value,
    };
    socket.send(JSON.stringify(message));
  }}
  required
/>

  <input className="border p-4 text-xl rounded-full component-title" type="tel" placeholder="Telephone" onChange={(event) => {
    const message = {
      field: 'telephone',
      value: event.target.value,
    };
    socket.send(JSON.stringify(message));
  }}/>
  <input className="border p-4 text-xl rounded-full component-title" type="text" placeholder="Car Reg" onChange={(event) => {
    const message = {
      field: 'carReg',
      value: event.target.value,
    };
    socket.send(JSON.stringify(message));
  }}/>
</form>

                </div>

 ) : showData ? (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-black p-4 rounded-lg border-4 border-gray-200 bg-opacity-50 w-full h-full overflow-auto text-center text-white">
      <h1 className="text-4xl font-bold mb-4 component-title">Your Booking</h1>
      <p className="text-2xl mb-2 component-title"><strong>Name:</strong> {data.name}</p>
      <p className="text-2xl mb-2 component-title"><strong>Email:</strong> {data.email}</p>
      <p className="text-2xl mb-2 component-title"><strong>Telephone:</strong> {data.telephone}</p>
      <p className="text-2xl mb-2 component-title"><strong>Car Reg:</strong> {data.carReg}</p>
      <p className="text-2xl mb-2 component-title"><strong>Table:</strong> {data.table}</p>
      <p className="text-2xl mb-2 component-title"><strong>Time:</strong> {data.time} to {data.time2}</p>
      <p className="text-2xl mb-2 component-title"><strong>Children:</strong> {data.children}</p>
      <p className="text-2xl mb-2 component-title"><strong>Adults:</strong> {data.adults}</p>
      <p className="text-4xl mb-2 mt-2 component-title animate-pulse"><strong>Total:</strong> £{data.total.toFixed(2)}</p>
    </div>
  </div>
  


    ) : (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <button className="absolute top-4 right-4 bg-red-500 text-white p-4 text-xl rounded-full" onClick={() => navigate('/dashboard')}>Close</button>
                <img src={"dino-logo.png"} alt="Dinosaur" className="max-w-full max-h-full" />
                </div>

            )}


        </div>
    );
}


export default FullScreenComponent;
