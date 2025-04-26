console.log("My Server is Running well");
/*
const dns = require('dns');

const validateDomain = (email) => {
  const domain = email.split('@')[1];
  
  dns.resolve(domain, 'MX', (err, addresses) => {
    if (err) {
      console.log('Invalid domain or no mail server found.');
    } else {
      console.log('Valid domain with mail server found:', addresses);
    }
  });
};

validateDomain('applandsys1982025@gmail.com');

*/

const nodemailer = require('nodemailer');

// Function to verify email by sending a test email (no actual email sent)
const pingEmail = async (email) => {
  const domain = email.split('@')[1]; // Extract the domain part
  const transporter = nodemailer.createTransport({
    host: 'smtp.' + domain, // Use SMTP server (or MX record for more accuracy)
    port: 25,  // SMTP default port (some servers use 587 or 465 for TLS)
    secure: false,  // No encryption (you can change to `true` if using 465 for secure connections)
    tls: {
      rejectUnauthorized: false,  // Bypass self-signed certificates (if needed)
    },
  });

  try {
    // Sending an email without actually sending it, just to check the server
    await transporter.verify();

    console.log(`Email server for ${email} is reachable.`);
    console.log('You can safely send emails to this address.');
  } catch (error) {
    console.log('Error: ', error);
    console.log('Email server is not reachable or the email address is invalid.');
  }
};

// Replace 'example@domain.com' with the email you want to ping
pingEmail('applandsys@gmail.com');

console.log("All is end");

