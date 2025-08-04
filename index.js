require('dotenv').config();
require('module-alias/register');
const express = require('express');
const cors = require('cors');
const BodyParser = require("body-parser");
const emailVerificationRoute = require('./src/routes/emailVerificationRoute');
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(BodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Custom Global Middlewares
app.get('/', async (req,res)=>{
  res.json({ success: true, message: "Bulk Impact IMAGE VERIFICATION" });
});

app.use('/api/email-verify',emailVerificationRoute);


app.listen(port, '0.0.0.0',  () => console.log('Server running on 4000 PORT'));

