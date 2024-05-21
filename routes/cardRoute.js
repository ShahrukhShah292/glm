
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardSave');

router.post('/cards', cardController.createCard);


module.exports = router;
