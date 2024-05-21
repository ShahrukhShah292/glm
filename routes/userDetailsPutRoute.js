const express = require('express');
const router = express.Router();
const userController = require('../controllers/userDetailsPut');

const upload = require('../middleware/upload');

router.put('/:id', upload.single('userImage'), userController.updateUser);

module.exports = router;
