// routes/billerApiRoutes.js
const express = require('express');
const router = express.Router();
const billersAsPerCtegoryController = require('../controllers/billersAsPerCtegoryController');

router.post('/getnewBillerInfo', billersAsPerCtegoryController.getListOfBillers); 


module.exports = router;
