const express = require('express');
const router = express.Router();
const userController = require('../controllers/userDetailsGet');

router.get('/:phoneNumber', userController.getUserByPhoneNumber);

module.exports = router;
