
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const fs = require('fs');

var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your domain email
      pass: process.env.EMAIL_PASS // your email password
    }
});


exports.handler = async (event, context, callback) => {
    let body = JSON.parse(event.body);
    if (body.variable === "booklater") {
        var bookingIDString = body.bookingID.toString();

        // Save the QR code as an image file
        QRCode.toFile('/tmp/qrcode.png', bookingIDString, function(err) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                var mailOptions = {
                    from: 'bookings@cheekydino.co.uk',
                    to: body.email + ', bookings@cheekydino.co.uk',
                    subject: "My Booking Confirmation- Cheeky Dino",
                    html: `<div style="background-color: orange; font-family: Arial, sans-serif; padding: 10px;">
                               <p>Hello ${body.name},</p>
                               <p>Your booking has been confirmed for <span style="border: 1px solid black; padding: 2px;"><strong>${body.date}</strong> at <strong>${body.timeslot}</strong></span>.</p>
                               <p>Table:<strong>${body.table}</strong></p>
                               <p>Booking ID: <strong>${body.bookingID}</strong></p>
                               <p>Adults: <strong>${body.adults}</strong></p>
                               <p>Children: <strong>${body.children}</strong></p>
                               <p>Total: <span style="border: 1px solid black; padding: 2px;"><strong>£${body.total}</strong></span></p>
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
                        path: '/tmp/qrcode.png', // path to the saved QR code image
                        cid: 'unique@qr' // same cid value as in the html img src
                    }]
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                        callback(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        callback(null, 'Email sent!');
                    }
                });
            }
        });
    }





    else if (body.variable === "entry") {
        var mailOptions = {
            from: 'bookings@cheekydino.co.uk',
            to: body.email + 'bookings@cheekydino.co.uk',
            subject: "My Booking Confirmation- Cheeky Dino",
            html: `<div style="background-color: orange; font-family: Arial, sans-serif; padding: 10px;">
                       <p>Hello ${body.name},</p>
                       <p>Your booking has been confirmed for <span style="border: 1px solid black; padding: 2px;"><strong>${body.date}</strong> at <strong>${body.timeslot}</strong></span>.</p>
                       <p>Table:<strong>${body.table}</strong></p>
                       <p>Adults: <strong>${body.adults}</strong></p>
                       <p>Children: <strong>${body.children}</strong></p>
                       <p>Total: <span style="border: 1px solid black; padding: 2px;"><strong>£${body.total}</strong></span></p>
                       <p>To order from your phone whilst in the centre please visit www.cheekydino.co.uk/login </p>
                       <p>Thank you for booking with us!</p>
                       <p>Kind regards,</p>
                       <p>The Cheeky Dino Team</p>
                   </div>`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                callback(error);
            }
            else {
                console.log('Email sent: ' + info.response);
                callback(null, 'Email sent!');
            }
        }
        );


    } else if (body.variable === "exit") {
        var hotItemsList = body.hotItems.map(item => `<p>${item}</p>`).join('');
        var drinksList = body.drinks.map(item => `<p>${item}</p>`).join('');

        var mailOptions = {
            from: 'bookings@cheekydino.co.uk',
            to: body.email + ', bookings@cheekydino.co.uk',
            subject: "My Booking Confirmation- Cheeky Dino",
            html: `<div style="background-color: orange; font-family: Arial, sans-serif; padding: 10px;">
                       <p>Hello ${body.name},</p>
                       <p>Your booking was on <span style="border: 1px solid black; padding: 2px;"><strong>${body.date}</strong> at <strong>${body.timeslot}</strong></span>.</p>
                       <p>Time Left:<strong>${body.timeLeft}</strong></p>
                       <p>Table:<strong>${body.table}</strong></p>
                       <p>Adults: <strong>${body.adults}</strong></p>
                       <p>Children: <strong>${body.children}</strong></p>
                       <p> Orders placed: <strong>${body.orders}</strong></p>
                    <p>Hot Items Purchased: <strong>${hotItemsList}</strong></p>
                    <p>Drinks Purchased: <strong>${drinksList}</strong></p>
                       <p>Total: <span style="border: 1px solid black; padding: 2px;"><strong>£${body.total}</strong></span></p>
                       

                       <p>Thank you for booking with us!, we hope to see you again soon!</p>
                       <p>Kind regards,</p>
                       <p>The Cheeky Dino Team</p>
                   </div>`
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            callback(error);
          } else {
            console.log('Email sent: ' + info.response);
            callback(null, 'Email sent!');
          }
        });
    }

}

