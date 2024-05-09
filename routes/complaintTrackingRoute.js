// routes/billFetchRoute.js
const express = require('express');
const router = express.Router();
const complaintTracking = require('../controllers/complaintTracking');

router.post('/track', complaintTracking.complaintTrcking); // Check if billerController.fetchBillerInfo is properly exported

module.exports = router;
