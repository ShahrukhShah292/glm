// routes/pinVerifyRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/pin-verify', async (req, res) => {
    try {
        const { phoneNumber, pin } = req.body;

        // Find user by phone number
        const existingUser = await User.findOne({ phoneNumber });

        // If user doesn't exist
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If PIN matches
        if (existingUser.pin === pin) {
            return res.status(200).json({ success: true, message: 'PIN verified successfully' });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect PIN' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
