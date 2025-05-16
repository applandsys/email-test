const nodemailer = require('nodemailer');

// Replace with your actual Gmail and App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'casielisa98@gmail.com',
        pass: 'tlxxbzlyddttyafa', // Use the 16-character app password here
    },
});

const mailOptions = {
    from: 'casielisa98@gmail.com',
    to: 'applandsys@gmail.com',
    subject: 'Test Email from Node.js',
    text: 'Hello! This is a test email sent using Gmail and Nodemailer.',
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
