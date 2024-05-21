const express = require('express');
const router = express.Router();
const compaintController = require('../controllers/complaintRegistration');

router.post('/registerComplaint', compaintController.billPayComplaints); 

module.exports = router;
