import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Check if running in Electron
    const isElectron = window && window.process && window.process.type;

    if (isElectron) {
      const electron = window.require('electron');
      const ipcRenderer = electron.ipcRenderer;

      // Test data to print
      const data = {
        product: 'test product',
        method: 'Cash',
        change: 0,
        price: "£10",
      };

      // Send 'print-receipt' event to Electron.js backend
      ipcRenderer.send('print-receipt', data);
    } else {
      // If not in Electron, render a 404 message or handle as needed
      console.log('Not running in Electron. Render a 404 message or handle as needed.');
    }
  }, []);

  return (
    <div className="App bg-gray-100 min-h-screen flex items-center justify-center">
      <button
        onClick={() => {
          // Handle the button click if needed
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Print Receipt
      </button>
    </div>
  );
};

export default App;
