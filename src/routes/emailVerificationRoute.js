const express = require('express');
const emailVerificationController =  require('../controllers/emailVerificationController');

const router = express.Router();

// User Registration api/auth/register
router.get('/', emailVerificationController.verifyGetMethod);
router.post('/',emailVerificationController.verifyEmail);



module.exports = router;
