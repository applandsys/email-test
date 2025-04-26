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


/*
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


*/

/*

const dns = require('dns');
const net = require('net');

async function verifyEmail(email) {

    console.log("Mail test stared");

  const [_, domain] = email.split('@');

  // Step 1: Lookup MX records
  const mxRecords = await new Promise((resolve, reject) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err) return reject(err);
      // Sort by priority
      addresses.sort((a, b) => a.priority - b.priority);
      resolve(addresses);
    });
  });

  if (mxRecords.length === 0) {
    throw new Error('No MX records found for domain.');
  }

  const mxServer = mxRecords[0].exchange;

  // Step 2: Connect to SMTP server
  const client = net.createConnection(25, mxServer);

  return new Promise((resolve, reject) => {
    let response = '';

    client.on('data', (data) => {
      response += data.toString();

      // Wait for initial server greeting
      if (response.includes('220') && response.includes(mxServer)) {
        client.write(`HELO chatpix.xyz\r\n`);
      }
      // After HELO
      else if (response.includes('250') && response.includes('chatpix.xyz')) {
        client.write(`MAIL FROM:<test@chatpix.xyz>\r\n`);
      }
      // After MAIL FROM
      else if (response.includes('250') && response.includes('Sender ok')) {
        client.write(`RCPT TO:<${email}>\r\n`);
      }
      // After RCPT TO
      else if (response.includes('250') || response.includes('550') || response.includes('450') || response.includes('550 5.1.1')) {
        if (response.includes('250')) {
          resolve({ success: true, message: 'Email address is valid!' });
        } else {
          resolve({ success: false, message: 'Email address is invalid or rejected.' });
        }
        client.write('QUIT\r\n');
        client.end();
      }
    });

    client.on('error', (err) => {
      reject(err);
    });

    client.on('end', () => {
      console.log('Disconnected from SMTP server');
    });
  });
}

// Usage
verifyEmail('applandsys@gmail.com')
  .then(result => console.log(result))
  .catch(err => console.error('Error:', err));


  **/

  const emailExistence = require('email-existence');

emailExistence.check('samir_noyan@yahoo.com', function(error, response){
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email exists:', response);
  }
});

