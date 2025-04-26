console.log("My Server is Running well");

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

validateDomain('applandsys@gmail.com');