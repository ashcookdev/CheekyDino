const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const axios = require('axios');
const { spawn } = require('child_process');
const net = require('net');
const { autoUpdater } = require("electron-updater");
const sound = require('sound-play');

// Trick AWS Amplify into thinking it's running in a browser environment
if (process.env.NODE_ENV !== 'production') {
  global.window = {};
}

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')


// Start the server
const startServer = require('../src/backend/index.js');

let mainWindow;
let soundWindow;

function createWindow(id, options = {}) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    ...options,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  mainWindow.loadURL(startUrl);
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize(); // This will maximize the window
  });
}

app.whenReady().then(async () => {
  createWindow('main', {
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  try {
    // Call the startServer function to start your server
    startServer();
    console.log('Server started successfully');
  } catch (error) {
    console.error('Error starting server:', error);
  }


  const client = new net.Socket();
  client.connect(5253, '127.0.0.1', function() {
    console.log('Server is running');
    client.destroy();
  });

  client.on('error', function(error) {
    console.error('Server is not running:', error);
    startServer(); // Restart the server if it's not running
  });
});

setInterval(async () => {
  try {
    const response = await axios.get('http://localhost:5253/health');
    console.log(response.data);
  } catch (error) {
    console.log('Health check failed:', error);
  }
}, 50000); // Check every 5 seconds

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow('main');
    if (!isDev) autoUpdater.checkForUpdatesAndNotify();
  }
});


autoUpdater.on('update-available', () => mainWindow.webContents.send('update_available'));
autoUpdater.on('update-downloaded', () => mainWindow.webContents.send('update_downloaded'));
ipcMain.on('restart_app', () => autoUpdater.quitAndInstall());

ipcMain.on('print-receipt', async (event, data) => {
  try {
    const response = await axios.post('http://127.0.0.1:5253/print', data);
    event.reply('print-receipt-reply', response.data);
  } catch (error) {
    console.error('Error in print-receipt:', error);
    event.reply('print-receipt-reply', { error: 'An error occurred' });
  }
});

ipcMain.on('open-drawer', async (event, data) => {
  try {
    const response = await axios.post('http://localhost:5253/frontdrawer', data);
    event.reply('open-drawer-reply', response.data);
  } catch (error) {
    console.error('Error in open-drawer:', error);
    event.reply('open-drawer-reply', { error: 'An error occurred' });
  }
});

ipcMain.on('cafe-print', async (event, data) => {
  try {
    const response = await axios.post('http://localhost:5253/cafeprinter', data);
    event.reply('cafe-print-reply', response.data);
  } catch (error) {
    console.error('Error in cafe-print:', error);
    event.reply('cafe-print-reply', { error: 'An error occurred' });
  }
});


ipcMain.on('kitchen-print', async (event, data) => {
  try {
    const response = await axios.post('http://localhost:5253/kitchenprinter', data);
    event.reply('kitchen-print-reply', response.data);
  } catch (error) {
    console.error('Error in kitchen-print:', error);
    event.reply('kitchen-print-reply', { error: 'An error occurred' });
  }
}
);

ipcMain.on('cafe-drawer', async (event, data) => {
  try {
    const response = await axios.post('http://localhost:5253/cafedrawer', data);
    event.reply('open-drawer-reply', response.data);
  } catch (error) {
    console.error('Error in open-drawer:', error);
    event.reply('open-drawer-reply', { error: 'An error occurred' });
  }
});

ipcMain.on('entrance', (event, data) => {
  console.log('Entrance event received with data:', data);
});

ipcMain.on('exit', (event, data) => {
  console.log('Exit event received with data:', data);
});

ipcMain.on('closing', (event, data) => {
  console.log('Closing event received with data:', data);
});


ipcMain.on('play-sound', () => {
  soundWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  soundWindow.loadURL(`file://${path.join(__dirname, 'audio.html')}`); // replace with the path to your HTML file

  soundWindow.webContents.on('did-finish-load', () => {
    soundWindow.webContents.executeJavaScript('document.getElementById("audio").play()');
  });

  soundWindow.on('closed', () => {
    soundWindow = null;
  });
});


