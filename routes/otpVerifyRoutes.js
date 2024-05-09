const express = require('express');
const router = express.Router();
const otpVerifyController = require('../controllers/otpVerifyController');

router.post('/verify-otp', otpVerifyController.verifyOTP);

module.exports = router;