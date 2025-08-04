const express = require('express');
const router = express.Router();
const emailVerificationController =  require('../controllers/emailVerificationController');

// User Registration api/auth/register
router.get('/', emailVerificationController.verifyGetMethod);
router.post('/',emailVerificationController.verifyEmail);


module.exports = router;
