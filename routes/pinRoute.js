const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pinSave'); 

router.post('/pin', pinController.storePin); 

module.exports = router;
