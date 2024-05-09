
const OtpResponse = require('../models/OtpResponse');

exports.getAllOtpResponses = async (req, res) => {
    try {
        const allOtpResponses = await OtpResponse.find();
        res.json(allOtpResponses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
