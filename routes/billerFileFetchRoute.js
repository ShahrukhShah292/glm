// routes/billerFileFetchRoute.js
const express = require('express');
const router = express.Router();
const BillerController = require('../controllers/BillerFetchDataFile');

router.get('/getBillerById', BillerController.getBillerByIdOrCategory); // Change to getBillerByIdOrCategory

module.exports = router;
