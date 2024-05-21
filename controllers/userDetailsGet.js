const User = require('../models/userDetailsModel');

exports.getUserByPhoneNumber = async (req, res) => {
    try {
        const phoneNumber = req.params.phoneNumber;
        const user = await User.findOne({ PhoneNumber: phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
