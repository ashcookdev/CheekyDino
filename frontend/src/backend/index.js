const express = require('express');
const cors = require('cors');
const escpos = require('escpos');
escpos.Network = require('escpos-network');
const http = require('http');
const ewelink = require('ewelink-api');
const WebSocket = require('ws');







const app = express();
const port = 5253;

// Enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

// const wss = new WebSocket.Server({ port: wsPort });

// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(message) {
//         console.log('Received message from client:', message);
//         // Handle incoming messages from Electron app (e.g., acknowledgements)
//     });

//     // Handle potential disconnections or errors gracefully
//     ws.on('close', () => console.log('WebSocket connection closed'));
//     ws.on('error', (error) => console.error('WebSocket error:', error));
// });



const connection = new ewelink({
  email: 'ashcookdev@gmail.com',
  password: 'Cheekydino01!',
  region: 'eu',
});

app.post('/entrance', async function (req, res) {
  console.log('Button clicked'); // Log a message when the route is hit

  const deviceId = '1001f0e972'; // replace with your actual device ID
  
  try {

    const region = await connection.getRegion();
  console.log(region);

    

    // Specify the channel number in the third argument
  //   await connection.setDeviceChannelPowerState(deviceId, 'on', 1);
  //   res.send('Entrance relay toggled');
  // } catch (error) {
  //   console.error(error);
  //   res.send('An error occurred');
  // }
} catch (error) {
  console.error(error);
  res.send('An error occurred');
}
});







// app.post('/entrance', function (req, res) {
//   toggleRelay(1, true, 10000);
//   res.send('Entrance relay toggled');
// });

// app.post('/exit', function (req, res) {
//   toggleRelay(2, true, 10000);
//   res.send('Exit relay toggled');
// });

// app.post('/closing', function (req, res) {
//   toggleRelay(1, true, 300000);
//   toggleRelay(2, true, 300000);
//   res.send('Closing relays toggled');
// });



// Route to handle printing via POST request
app.post('/print', (req, res) => {
  const body = req.body;

  console.log(body);

  // Create a new network device and printer
  const device = new escpos.Network('192.168.1.221', 9100);
  const options = { encoding: 'GB18030' /* default */ };
  const printer = new escpos.Printer(device, options);

  device.open(function(error) {
    if (error) {
      console.error('Error opening device:', error);
      res.status(500).json({ error: 'Error opening device' });
      return;
    }

    try {
      printReceiptAndOpenDrawer(body, printer);
      res.status(200).json({ message: 'Printed successfully and drawer opened' });
    } catch (error) {
      console.error('Error printing receipt:', error);
      res.status(500).json({ error: 'Error printing receipt' });
    } finally {
      device.close();
    }
  });
});

app.post('/cafe', (req, res) => {
  const body = req.body;
  
  console.log(body);

  // Create a new network device and printer
  const device = new escpos.Network('192.168.1.222', 9100);
  const options = { encoding: 'GB18030' /* default */ };
  const printer = new escpos.Printer(device, options);

  device.open(function(error) {
    if (error) {
      console.error('Error opening device:', error);
      res.status(500).json({ error: 'Error opening device' });
      return;
    }

    try {
      printReceiptAndOpenDrawer(body, printer);
      res.status(200).json({ message: 'Printed successfully and drawer opened' });
    } catch (error) {
      console.error('Error printing receipt:', error);
      res.status(500).json({ error: 'Error printing receipt' });
    } finally {
      device.close();
    }
  });
});




async function printReceiptAndOpenDrawer(body, printer) {
  try {
    // Initialize the printer, set the font size, print some text, cut the paper, and open the drawer
    await printer
    .font('a')
    .align('ct')
    .style('b')
    .size(1, 1) // Changed the size to 1, 1
    .text('The Cheeky Dino')
    .text('--------------------------------')
    .align('lt')
    .style('normal')
    .size(1, 1) // Changed the size to 0.5, 0.5
    .text('Item\t\tPrice\tQty\tTotal')
    .text('--------------------------------')
    .text(`Product: ${body.data.product}`)
  .text(`Name: ${body.data.name}`)
    .text(`Table: ${body.data.table}`)
    .text(`Price: ${body.data.price}`)
    .text('--------------------------------')
    .align('rt')
    .style('b')
    .size(1, 1) // Changed the size to 1, 1
    // .text(`Change: ${body.data.change}`)
    .text('--------------------------------')
    .align('ct')
    .style('normal')
    .cashdraw(2) // Open the cash drawer
    .size( 1, 1) // Changed the size to 0.5, 0.5
    .text('Thank you for your purchase!')
    .cut() // Cut the paper
    .close(); // Close the printer connection
  

  
    console.log('Printed successfully and drawer opened');
  } catch (error) {
    console.error('Error printing receipt:', error);
  }
}

// Route to handle opening the drawer via POST request
app.post('/frontdrawer', (req, res) => {
  const body = req.body;

  // Create a new network device and printer
  const device = new escpos.Network('192.168.1.221', 9100);
  const options = { encoding: 'GB18030' /* default */ };
  const printer = new escpos.Printer(device, options);

  device.open(function(error) {
    if (error) {
      console.error('Error opening device:', error);
      res.status(500).json({ error: 'Error opening device' });
      return;
    }

    try {
      openDrawer(body, printer);
      res.status(200).json({ message: 'Drawer opened' });
    } catch (error) {
      console.error('Error opening drawer:', error);
      res.status(500).json({ error: 'Error opening drawer' });
    } finally {
      device.close();
    }
  }
)})
; 




async function openDrawer(body, printer) {

  try {
    // Initialize the printer, set the font size, print some text, cut the paper, and open the drawer
    await printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .cashdraw(2) // Open the cash drawer
      .close(); // Close the printer connection

    console.log('Drawer opened');
  }
  catch (error) {
    console.error('Error opening drawer:', error);
  }
}

app.post('/cafedrawer', (req, res) => {
  const body = req.body;

  // Create a new network device and printer
  const device = new escpos.Network('192.168.1.222', 9100);
  const options = { encoding: 'GB18030' /* default */ };
  const printer = new escpos.Printer(device, options);

  device.open(function(error) {
    if (error) {
      console.error('Error opening device:', error);
      res.status(500).json({ error: 'Error opening device' });
      return;
    }

    try {
      openDrawer(body, printer);
      res.status(200).json({ message: 'Drawer opened' });
    } catch (error) {
      console.error('Error opening drawer:', error);
      res.status(500).json({ error: 'Error opening drawer' });
    } finally {
      device.close();
    }

  }

)}

);


app.post('/cafeprinter', (req, res) => {
  const body = req.body;

  const device = new escpos.Network('192.168.1.222', 9100);
  const options = { encoding: 'GB18030' /* default */ };
  const printer = new escpos.Printer(device, options);

  console.log("cafe printer called")

  device.open(function(error) {
    if (error) {
      console.error('Error opening device:', error);
      res.status(500).json({ error: 'Error opening device' });
      return;
    }

    try {
      printReceiptAndOpenDrawer(body, printer);
      res.status(200).json({ message: 'Printed successfully and drawer opened' });
    } catch (error) {
      console.error('Error printing receipt:', error);
      res.status(500).json({ error: 'Error printing receipt' });
    } finally {
      device.close();
    }
  }
)}
);

app.post('/kitchenprinter', async (req, res) => {
  const body = req.body;

  const device = new escpos.Network('192.168.1.223', 9100);
  const options = { encoding: 'GB18030' /* default */ };
  const printer = new escpos.Printer(device, options);

  console.log("cafe printer called")

  device.open(async function(error) {
    if (error) {
      console.error('Error opening device:', error);
      res.status(500).json({ error: 'Error opening device' });
      return;
    }

    try {
      // Initialize the printer, set the font size, print some text, cut the paper, and open the drawer
      await printer
        .font('a')
        .align('ct')
        .style('b')
        .size(1, 1) // Changed the size to 1, 1
        .text('The Cheeky Dino')
        .text('--------------------------------')
        .align('lt')
        .style('normal')
        .size(1, 1) // Changed the size to 0.5, 0.5
        .text('--------------------------------')
        .text(`Product: ${body.data.product}`)
        .text(`Name: ${body.data.name}`)
        .text(`Table: ${body.data.table}`)
        .text('--------------------------------')
        .align('rt')
        .style('b')
        .size(1, 1) // Changed the size to 1, 1
        // .text(`Change: ${body.data.change}`)
        .text('--------------------------------')
        .align('ct')
        .style('normal')
        .size(1, 1) // Changed the size to 0.5, 0.5
        .cut() // Cut the paper
        .close(); // Close the printer connection

      console.log('Printed successfully and drawer opened');
      res.status(200).json({ message: 'Printed successfully and drawer opened' });
    } catch (error) {
      console.error('Error printing receipt:', error);
      res.status(500).json({ error: 'Error printing receipt' });
    } finally {
      device.close();
    }
  });
});


// route to handle usb relay





  // Create a new network device and printer
  

// Start the server
function startServer(mainWindow) {
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log('received: %s', message);
      
      // Parse the incoming message
      const data = JSON.parse(message);
  
      // Send the data to the renderer process
      mainWindow.webContents.send('websocket-message', data);
    });
  });



  // Return the server instance
  return server;
}


// observe the sessions table for changes











module.exports = startServer;


app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Export the function to start the server


