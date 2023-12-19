const express = require('express');
const cors = require('cors');
const escpos = require('escpos');
escpos.Network = require('escpos-network');
const http = require('http');
// const USBRelay = require('@josephdadams/usbrelay');

const app = express();
const port = 5253;
// Enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

// let relay;
// try {
//   relay = new USBRelay();
// } catch (error) {
//   console.log('USBRelay not available:', error);
// }

// function toggleRelay(relayNumber, state, delay) {
//   if (!relay) return;
//   relay.setState(relayNumber, state);
//   console.log(`Relay ${relayNumber} enabled? ${relay.getState(relayNumber)}`);
//   if (delay) {
//     setTimeout(() => {
//       relay.setState(relayNumber, false);
//       console.log(`Relay ${relayNumber} enabled? ${relay.getState(relayNumber)}`);
//     }, delay);
//   }
// }

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

  const device = new escpos.Network('192.168.1.222', 9100);
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
function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});


module.exports = startServer;