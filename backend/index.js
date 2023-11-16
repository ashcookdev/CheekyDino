const express = require('express');
const cors = require('cors');
const escpos = require('escpos');
escpos.Network = require('escpos-network');

const app = express();
const port = 5252;


// Enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

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





async function printReceiptAndOpenDrawer(body, printer) {
  try {
    // Initialize the printer, set the font size, print some text, cut the paper, and open the drawer
    await printer
  .font('a')
  .align('ct')
  .style('b')
  .size(2, 2)
  .text('The Cheeky Dino')
  .text('--------------------------------')
  .align('lt')
  .style('normal')
  .size(1, 1)
  .text('Item\t\tPrice\tQty\tTotal')
  .text('--------------------------------')
  // Add each item in the receipt here
  .text(`Product: ${body.data.product}`)
.text(`Name: ${body.data.name}`)
  .text(`Table: ${body.data.table}`)
  .text(`Price: ${body.data.price}`)
  .text('--------------------------------')
  .align('rt')
  .style('b')
  .size(2, 2)
  .text(`Change: ${body.data.change}`)
  .text('--------------------------------')
  .align('ct')
  .style('normal')
  .size(1, 1)
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





// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
