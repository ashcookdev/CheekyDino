const { ipcRenderer } = require('electron');

// Example function to send an IPC message to the main process
function sendPrintRequest(data) {
  ipcRenderer.send('print-receipt', data);
}

// Example listener for the reply from the main process
ipcRenderer.on('print-receipt-reply', (event, data) => {
  console.log('Received reply from main process:', data);
});

function sendOpenDrawerRequest(data) {
  ipcRenderer.send('open-drawer', data);
}

ipcRenderer.on('open-drawer-reply', (event, data) => {
  console.log('Received reply from main process:', data);
});


