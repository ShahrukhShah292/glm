const express = require('express');
const router = express.Router();
const panController = require('../controllers/panController');

router.post('/verifyPan', panController.verifyPan);

module.exports = router;
