const { ipcRenderer } = require('electron');

function checkForUpdate() {
  ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    // Notify the user about the update
  });
}

function downloadUpdate() {
  ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    // Ask the user to restart the app
  });
}

function restartApp() {
  ipcRenderer.send('restart_app');
}

function sendPrintRequest(data) {
  ipcRenderer.send('print-receipt', data);
  ipcRenderer.on('print-receipt-reply', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function sendOpenDrawerRequest(data) {
  ipcRenderer.send('open-drawer', data);
  ipcRenderer.on('open-drawer-reply', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function sendCafePrintRequest(event, data) {
  ipcRenderer.send('cafe-print', data);
  ipcRenderer.on('cafe-print-reply', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function sendKitchenPrintRequest(event, data) {
  ipcRenderer.send('kitchen-print', data);
  ipcRenderer.on('kitchen-print-reply', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function sendCafeDrawerRequest(event, data) {
  ipcRenderer.send('cafe-drawer', data);
  ipcRenderer.on('cafe-drawer-reply', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function entrance() {
  ipcRenderer.on('entrance', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function exit() {
  ipcRenderer.on('exit', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function closing() {
  ipcRenderer.on('closing', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

function playSound() {
  ipcRenderer.send('play-sound');
  ipcRenderer.on('play-sound-reply', (event, data) => {
    console.log('Received reply from main process:', data);
  });
}

