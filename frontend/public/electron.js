const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const axios = require('axios');
const net = require('net');
const { autoUpdater } = require("electron-updater");
const pdfjsLib = require('pdfjs-dist');
require('dotenv').config({ path: require('path').resolve(__dirname, '../src/.env') });

// get worker file path
pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(__dirname, 'pdf.worker.js');

// Trick AWS Amplify into thinking it's running in a browser environment
if (process.env.NODE_ENV !== 'production') {
  global.window = {};
}

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

// Start the server
const startServer = require('../src/backend/index.js');

let mainWindow;
let secondWindow;
let serverInstance; // Variable to hold the reference to the server instance

function createWindow(id, options = {}) {
  // Create the main window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    ...options,
    webPreferences: {
      autoplayPolicy: 'no-user-gesture-required',

      nodeIntegration: true,
  
      contextIsolation: false,
      partition: 'persist:mainSession',
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Create the second window
  secondWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    ...options,
    webPreferences: {
      nodeIntegration: true,
      partition: 'persist:mainSession',
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  
  secondWindow.loadURL(startUrl);
  mainWindow.loadURL(startUrl);
  
  // Send screen numbers
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('screen-number', 1);
  });
  secondWindow.webContents.on('did-finish-load', () => {
    secondWindow.webContents.send('screen-number', 2);
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize(); // This will maximize the window
  });

  secondWindow.on('ready-to-show', () => {
    secondWindow.show();
    secondWindow.maximize(); // This will maximize the window
  });
}

app.whenReady().then(async () => {
  // Call createWindow before startServer
  createWindow('main', {
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  try {
    // Call the startServer function to start your server
    serverInstance = startServer(mainWindow, secondWindow);
    console.log('Server started successfully');

    // Listen for the 'close' event to know when the server is closed
    if (serverInstance) {
      serverInstance.on('close', () => {
        console.log('Server has been closed');
        // You can perform any additional actions here after the server is closed
      });
    } else {
      console.error('Server instance is undefined');
    }
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
    setTimeout(() => {
      startServer(); // Restart the server if it's not running
      app.relaunch(); // Relaunch the app
      app.exit(); // Exit the current app
    }, 5000); // Wait for 5 seconds before relaunching
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

// Gracefully stop the server when the app is quitting
let isQuitting = false;

app.on('before-quit', (event) => {
  if (!isQuitting) {
    event.preventDefault();

    isQuitting = true; // Set the flag to true

    if (serverInstance && serverInstance.listening) {
      serverInstance.close((err) => {
        if (err) {
          console.error('Error stopping server:', err);
        } else {
          console.log('Server stopped successfully');
        }
        app.quit(); // This will now only be called once
      });
    } else {
      console.log('Server is not running or already stopped. Quitting the app...');
      app.quit(); // This will now only be called once
    }
  }
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
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

// Other IPC event listeners...
// ...
ipcMain.on('show-form', () => {
  secondWindow.webContents.send('show-form');
});

ipcMain.on('show-data', (event, data) => {
  secondWindow.webContents.send('show-data', data);
});

ipcMain.on('new-customer', (event, data) => {
  secondWindow.webContents.send('new-customer', data);
}
);





ipcMain.on('form-info', (event, data) => {
  mainWindow.webContents.send('form-info', data);
});

ipcMain.on('websocket-message', (event, data) => {
  // Send the data to the renderer process
  mainWindow.webContents.send('websocket-message', data);
});





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
  try {
    const response = axios.post('http://localhost:5253/entrance', data);
    event.reply('entrance-reply', response.data);
  } catch (error) {
    console.error('Error in entrance:', error);
    event.reply('entrance-reply', { error: 'An error occurred' });
  }
}
);

ipcMain.on('exit', (event, data) => {
  try {
    const response = axios.post('http://localhost:5253/exit', data);
    event.reply('exit-reply', response.data);
  } catch (error) {
    console.error('Error in exit:', error);
    event.reply('exit-reply', { error: 'An error occurred' });
  }
});
  
  



ipcMain.on('closing', (event, data) => {
  console.log('Closing event received with data:', data);
});

ipcMain.on('file-uploaded', (event, result) => {
  console.log('File uploaded:', result);
  const buffer = Buffer.from(result);

  let loadingTask = pdfjsLib.getDocument({data: buffer});
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');
    
    // Fetch the first page
    let pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');
      
      // Extract the text content from the page
      page.getTextContent().then(function(textContent) {
        console.log('Text content:', textContent);
        
        // Convert the text content to a JSON string
        let jsonString = JSON.stringify(textContent);
        
        // Send the JSON string back to the renderer process
        event.sender.send('file-content', jsonString);
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
});

ipcMain.on('restart-server', () => {
  serverInstance.close((err) => {
    if (err) {
      console.error('Error stopping server:', err);
    } else {
      console.log('Server stopped successfully');
      serverInstance = startServer();
      console.log('Server restarted successfully');
    }
  });
});

let soundWindow;



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


