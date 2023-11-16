const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const axios = require('axios');
const { spawn } = require('child_process');
const net = require('net');

let mainWindow;
let server;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.setMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  // Start your server
  const serverScript = path.join(app.getAppPath(), '..', 'backend', 'index.js');
  const server = spawn('node', [serverScript]);  
  server.stdout.on('data', (data) => console.log(`Server: ${data}`));
  server.stderr.on('data', (data) => console.error(`Server error: ${data}`));
  server.on('error', (error) => console.error(`Error starting server: ${error}`));

  // Check if the server is running
  const client = new net.Socket();
  client.connect(5252, '127.0.0.1', function() {
    console.log('Server is running');
    client.destroy(); // kill client after server's response
  });

  client.on('error', function(error) {
    console.error('Server is not running:', error);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (server) {
    server.kill();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('print-receipt', async (event, data) => {
  try {
    const response = await axios.post('http://127.0.0.1:5252/print', data);
    event.reply('print-receipt-reply', response.data);
  } catch (error) {
    console.error('Error in print-receipt:', error);
    event.reply('print-receipt-reply', { error: 'An error occurred' });
  }
});

ipcMain.on('open-drawer', async (event, data) => {
  try {
    const response = await axios.post('http://localhost:5252/frontdrawer', data);
    event.reply('open-drawer-reply', response.data);
  } catch (error) {
    console.error('Error in open-drawer:', error);
    event.reply('open-drawer-reply', { error: 'An error occurred' });
  }
});

// Add similar handlers for other events (print-and-open, cafe-print, kitchen-print)
// ...
