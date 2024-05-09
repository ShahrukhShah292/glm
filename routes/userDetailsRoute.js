const express = require('express');
const router = express.Router();
const userController = require('../controllers/userDetailsPost');

const upload = require('../middleware/upload');

router.post('/userDetailsPost', upload.single('userImage'), userController.createUser);

module.exports = router;
