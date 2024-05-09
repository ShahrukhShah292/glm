
const express = require('express');
const router = express.Router();
const otpController = require('../controllers/checkPhoneCreate');

router.get('/otp', otpController.getAllOtpResponses);

module.exports = router;
