const express = require('express');
const escpos = require('escpos');
escpos.USB = require('escpos-usb-usb'); // Manually install escpos-usb adapter module
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
var QRCode = require('qrcode');

app.use(bodyParser.json()); // Enable JSON body for POST requests


// Create a new USB device connection
const device = new escpos.USB(); // No need for VendorID and ProductID
const options = { encoding: "GB18030" /* default */ }; // encoding is optional
const printer = new escpos.Printer(device, options);

// Check printer status when server starts
device.open(function(error){
  if (error) {
    console.log('Error opening device:', error);
  } else {
    device.write(Buffer.from([0x10, 0x04, 0x01])); // Send DLE EOT 1 command to check printer status
    device.on('data', function(data) {
      console.log('Printer status:', data); // Log the printer status
    });
  }
});

app.get('/printer-status', (req, res) => {
    device.open(function(error){
      if (error) {
        console.log('Error opening device:', error);
        res.send('Error opening device: ' + error);
      } else {
        device.write(Buffer.from([0x10, 0x04, 0x01])); // Send DLE EOT 1 command to check printer status
        device.on('data', function(data) {
          console.log('Printer status:', data); // Log the printer status
          res.send('Printer status: ' + data);
        });
      }
    });
  });


  app.post('/print-receipt', (req, res) => {
    // Extract receipt details from request body
    const { price, change, product } = req.body;
  
    // Combine receipt details into a single string
    const receiptDetails = `Price: ${price}\nChange: ${change}\nProduct: ${product}`;
  
    device.open(function(error){
      if (error) {
        console.log('Error opening device:', error);
        res.send('Error opening device: ' + error);
      } else {
        // Print receipt details
        const receiptBuffer = Buffer.from(receiptDetails);
        device.write(receiptBuffer);
        console .log('Receipt printed successfully. Receipt details: ' + receiptDetails);
  
        // Open cash drawer
        device.write(Buffer.from([0x07])); // Send Ctrl+G command to open cash drawer
  
        device.close();
  
        res.send('Receipt printed and cash drawer opened successfully. Receipt details: ' + receiptDetails);
      }
    });
  });
  
  
  


// API endpoint to open the cash drawer
app.post('/open-drawer', (req, res) => {
    // Open the cash drawer
    device.open(function(error){
      if (error) {
        console.log('Error opening device:', error);
        res.send('Error opening device: ' + error);
      } else {
        device.write(Buffer.from([0x07])); // Send Ctrl+G command to open cash drawer
        device.close();
        res.send('Cash drawer opened successfully.');
      }
    });
  });


  


  
// Start the server
const PORT = 5252;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




