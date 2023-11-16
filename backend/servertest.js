const escpos = require('escpos');
escpos.Network = require('escpos-network');

// Create a new network device and printer
const device = new escpos.Network('192.168.1.221', 9100);
const options = { encoding: "GB18030" /* default */ }
const printer = new escpos.Printer(device, options);

device.open(function(error){
  printer
    .font('a')
    .align('ct')
    .style('bu')
    .size(1, 1)
    .text('The Cheeky Dino')
    .text('--------------------------------')
    .align('lt')
    .text('Item                 Price  Qty  Total')
    .text('--------------------------------')
    // Add each item in the receipt here
    .text('Product 1            $10    1   $10')
    .text('Product 2            $5     2   $10')
    .text('--------------------------------')
    .align('rt')
    .text('Total: $20')
    .text('--------------------------------')
    .align('ct')
    .text('Thank you for your purchase!')
    .cashdraw(2) // Open the cash drawer
    .cut()
    .close();
});


