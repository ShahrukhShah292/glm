const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/:categoryName', dataController.getDataByCategory);

module.exports = router;
