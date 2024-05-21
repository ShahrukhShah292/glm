// routes/billerApiRoutes.js
const express = require('express');
const router = express.Router();
const billerController = require('../controllers/billerController');

router.post('/getnewBillerInfo', billerController.getBillerInfo); // Update the route here

module.exports = router;
