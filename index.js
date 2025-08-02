require('dotenv').config();
require('module-alias/register');
const express = require('express');
const cors = require('cors');
const BodyParser = require("body-parser");
const port = process.env.PORT;

const emailExistence = require('email-existence');
const verifier = require('email-verify');
const infoCodes = verifier.infoCodes;

const emailVerificationRoute = require('./src/routes/emailVerificationRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use(BodyParser.json());
app.use(express.urlencoded({ extended: true }));


emailExistence.check('iltaplata@pixmatech.com', function(error, response){
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Email exists frist time:', response);
  }
});


// 2nd time 

verifier.verify( 'ultapalta@pixmatech.com', function( err, info ){
  if( err ) console.log(err);
  else{
    console.log( "2nd timeSuccess (T/F): " + info.success );
    console.log("Info: " + JSON.stringify(info, null, 2));
 
  }
});

// Custom Global Middlewares
app.get('/', async (req,res)=>{
  res.json({ success: true, message: "Bulk Impact IMAGE VERIFICATION" });
});



app.use('/api/email-verify',emailVerificationRoute);

app.listen(port, '0.0.0.0',  () => console.log('Server running on 4000 PORT'));

