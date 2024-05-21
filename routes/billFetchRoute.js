// routes/billFetchRoute.js
const express = require('express');
const router = express.Router();
const billerController = require('../controllers/billFetchController');

router.post('/fetchBill', billerController.fetchBillerInfo); // Check if billerController.fetchBillerInfo is properly exported

module.exports = router;
