const express = require('express');
const router = express.Router();
const userController = require('../controllers/phoneNumberChange');

router.put('/users', userController.updatePhoneNumber);

module.exports = router;
