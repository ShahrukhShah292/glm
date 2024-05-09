const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            pin: req.body.pin,
            email: req.body.email,
            address: req.body.address,
            photo: req.body.photo,
            aadharNumber: req.body.aadharNumber,
            panNumber: req.body.panNumber,
            jwtToken: req.body.jwtToken
        });        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/users/checkPhoneNumber/:phoneNumber', async (req, res) => {
    try {
        const phoneNumber = req.params.phoneNumber;
        const existingUser = await User.findOne({ phoneNumber: phoneNumber });
        if (existingUser) {
            return res.status(200).json({ exists: true, message: 'Phone number already exists' });
        } else {
            return res.status(200).json({ exists: false, message: 'Phone number does not exist' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
