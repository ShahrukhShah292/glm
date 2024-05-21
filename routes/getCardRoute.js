
const express = require('express');
const router = express.Router();
const getCardController = require('../controllers/getCard');

router.get('/getcards/:userId', getCardController.getCard);

module.exports = router;
