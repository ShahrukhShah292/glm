// routes/otpRoutes.js
const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');
const otpVerifyController = require('../controllers/otpVerifyController');

router.post('/verify-otp', otpVerifyController.verifyOTP);

router.get('/generate-otp/:phone', otpController.generateOTP);

module.exports = router;
