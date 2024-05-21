const User = require('../models/user');

exports.updatePhoneNumber = async (req, res) => {
    const { oldPhoneNumber, newPhoneNumber } = req.body;

    try {
        const existingUser = await User.findOne({ phoneNumber: oldPhoneNumber });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        existingUser.phoneNumber = newPhoneNumber;

        await existingUser.save();

        res.status(200).json({ message: 'Phone number updated successfully', user: existingUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
