var express = require('express');
var nodemailer = require('nodemailer');
var cors = require('cors');
var bodyParser = require('body-parser');
var QRCode = require('qrcode');
var fs = require('fs');


var app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable JSON body for POST requests

var transporter = nodemailer.createTransport({
  host: "smtp.ionos.co.uk",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'bookings@cheekydino.co.uk', // your domain email
    pass: 'LjgZ_Wa$$3LNTQi' // your email password
  }
});

app.post('/booklater', function(req, res){
    var bookingIDString = req.body.bookingID.toString();

    // Save the QR code as an image file
    QRCode.toFile('./qrcode.png', bookingIDString, function(err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            var mailOptions = {
                from: 'bookings@cheekydino.co.uk',
                to: req.body.email + ', bookings@cheekydino.co.uk',
                subject: "My Booking Confirmation- Cheeky Dino",
                html: `<div style="background-color: orange; font-family: Arial, sans-serif; padding: 10px;">
                           <p>Hello ${req.body.name},</p>
                           <p>Your booking has been confirmed for <span style="border: 1px solid black; padding: 2px;"><strong>${req.body.date}</strong> at <strong>${req.body.timeslot}</strong></span>.</p>
                           <p>Table:<strong>${req.body.table}</strong></p>
                           <p>Booking ID: <strong>${req.body.bookingID}</strong></p>
                           <p>Adults: <strong>${req.body.adults}</strong></p>
                           <p>Children: <strong>${req.body.children}</strong></p>
                           <p>Total: <span style="border: 1px solid black; padding: 2px;"><strong>£${req.body.total}</strong></span></p>
                           <p> Please pay at the till when you arrive.</p>
                           <p>To order from your phone whilst in the centre please visit www.cheekydino.co.uk/login </p>
                           <p>QR Code:</p>
                           <img src="cid:unique@qr" style="border: 1px solid black;"/> <!-- Use the Content-ID as the source of the image -->
                           <p>Thank you for booking with us!</p>
                           <p>Kind regards,</p>
                           <p>The Cheeky Dino Team</p>
                       </div>`, // Embed the QR code image
                attachments: [{
                    filename: 'qrcode.png',
                    path: './qrcode.png', // path to the saved QR code image
                    cid: 'unique@qr' // same cid value as in the html img src
                }]
            };
            

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.status(500).send(error);
              } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent!');
              }
            });
        }
    });
});

app.post('/entry', function(req, res){

    // Save the QR code as an image feile
  
            var mailOptions = {
                from: 'bookings@cheekydino.co.uk',
                to: req.body.email + ', bookings@cheekydino.co.uk',
                subject: "My Booking Confirmation- Cheeky Dino",
                html: `<div style="background-color: orange; font-family: Arial, sans-serif; padding: 10px;">
                           <p>Hello ${req.body.name},</p>
                           <p>Your booking has been confirmed for <span style="border: 1px solid black; padding: 2px;"><strong>${req.body.date}</strong> at <strong>${req.body.timeslot}</strong></span>.</p>
                           <p>Table:<strong>${req.body.table}</strong></p>
                           <p>Adults: <strong>${req.body.adults}</strong></p>
                           <p>Children: <strong>${req.body.children}</strong></p>
                           <p>Total: <span style="border: 1px solid black; padding: 2px;"><strong>£${req.body.total}</strong></span></p>
                           <p>To order from your phone whilst in the centre please visit www.cheekydino.co.uk/login </p>
                           <p>Thank you for booking with us!</p>
                           <p>Kind regards,</p>
                           <p>The Cheeky Dino Team</p>
                       </div>`, // Embed the QR code image
                
                }
        
            

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.status(500).send(error);
              } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent!');
              }
            });
        }
    );


    app.post('/exit', function(req, res){

        // Save the QR code as an image file

        var hotItemsList = req.body.hotItems.map(item => `<p>${item}</p>`).join('');
var drinksList = req.body.drinks.map(item => `<p>${item}</p>`).join('');
      
                var mailOptions = {
                    from: 'bookings@cheekydino.co.uk',
                    to: req.body.email + ', bookings@cheekydino.co.uk',
                    subject: "My Booking Confirmation- Cheeky Dino",
                    html: `<div style="background-color: orange; font-family: Arial, sans-serif; padding: 10px;">
                               <p>Hello ${req.body.name},</p>
                               <p>Your booking was on <span style="border: 1px solid black; padding: 2px;"><strong>${req.body.date}</strong> at <strong>${req.body.timeslot}</strong></span>.</p>
                               <p>Time Left:<strong>${req.body.timeLeft}</strong></p>
                               <p>Table:<strong>${req.body.table}</strong></p>
                               <p>Adults: <strong>${req.body.adults}</strong></p>
                               <p>Children: <strong>${req.body.children}</strong></p>
                               <p> Orders placed: <strong>${req.body.orders}</strong></p>
                            <p>Hot Items Purchased: <strong>${hotItemsList}</strong></p>
                            <p>Drinks Purchased: <strong>${drinksList}</strong></p>
                               <p>Total: <span style="border: 1px solid black; padding: 2px;"><strong>£${req.body.total}</strong></span></p>
                               

                               <p>Thank you for booking with us!, we hope to see you again soon!</p>
                               <p>Kind regards,</p>
                               <p>The Cheeky Dino Team</p>
                           </div>`, // Embed the QR code image
                    
                    }
            
                
    
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                    res.status(500).send(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send('Email sent!');
                  }
                });
            }
        );
    





app.listen(3001, function(){
    console.log('Server is running on port 3001');
});