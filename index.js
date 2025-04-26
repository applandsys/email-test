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

const verifyEmail = (email) => {
  const domain = email.split('@')[1];
  const connection = new SMTPConnection({
    host: 'smtp.' + domain, // or use MX records to get the exact mail server
    port: 25,
  });

  connection.connect(() => {
    connection.helo('localhost'); // Initiate handshake with the server
    connection.mail('test@chatpix.xyz'); // Set a sender email for the verification
    connection.rcpt(email, (err, response) => {
      if (err) {
        console.log(`Error: ${err}`);
        console.log('Email is invalid or not active');
      } else {
        console.log(`Response: ${response}`);
        console.log('Email is deliverable and active');
      }
      connection.quit(); // Close the connection
    });
  });
};

verifyEmail('applandsys@gmail.com');
