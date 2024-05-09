const express = require('express');
const router = express.Router();
const dataController = require('../controllers/pinSaveGet');

router.get('/getData', dataController.getDataByPhoneNumber);

module.exports = router;
