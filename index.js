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

const SMTPConnection = require('smtp-connection');

const pingEmail = (email) => {
  const domain = email.split('@')[1];  // Extract the domain part
  const connection = new SMTPConnection({
    host: 'smtp.' + domain, // SMTP server (you can also use MX records here)
    port: 25,  // SMTP default port
  });

  connection.connect(() => {
    connection.helo('localhost');  // Send HELO command
    connection.mail('test@chatpix.xyz');  // Sender email
    connection.rcpt(email, (err, response) => {
      if (err) {
        console.log('Email is invalid or not deliverable.');
      } else {
        console.log('Email is valid and can receive messages.');
      }
      connection.quit();  // Close the connection
    });
  });
};

// Replace 'example@domain.com' with the email you want to ping
pingEmail('applandsys@gmail.com');
