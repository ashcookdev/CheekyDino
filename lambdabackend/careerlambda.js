const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // your domain email
        pass: process.env.EMAIL_PASS // your email password
    }
});

exports.handler = async (event) => {
    let body = JSON.parse(event.body);
    if (body.variable === "career") {
        let mailOptions = {
            from: 'jobs@cheekydino.co.uk',
            to: 'jobs@cheekydino.co.uk',
            subject: "New Career Application",
            html: `<div style="background-color: orange; font-family: Arial, sans-serif; padding: 10px;">
                       <p>Hello,</p>
                       <p>A new career application has been submitted:</p>
                       <p>Name: <strong>${body.name}</strong></p>
                       <p>Email: <strong>${body.email}</strong></p>
                       <p>Phone: <strong>${body.telephone}</strong></p>
                       <p>Cover Letter: <strong>${body.about}</strong></p>
                       <p> Role: <strong>${body.role}</strong></p>
                       <p> Town: <strong>${body.town}</strong></p>
                       <p> Experience: <strong>${body.experience}</strong></p>
                       <p> Age: <strong>${body.age}</strong></p>
                       <p>Regards,</p>
                       <p>Website Bot</p>
                   </div>`,
            attachments: [
                {
                    filename: 'cv.pdf',
                    content: body.cv, // assuming cv is sent as base64 encoded string
                    encoding: 'base64'
                }
            ]
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};
