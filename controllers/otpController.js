const axios = require('axios');
const OtpResponse = require('../models/OtpResponse');

exports.generateOTP = async (req, res) => {
    const { phone } = req.params;
    try {
        const apiKey = process.env.API_KEY;
        const otpTemplateName = "Create_Account";
        const response = await axios.get(`https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN3/Create+Account`);
        const otpResponse = new OtpResponse({
            phone: phone,
            status: response.data.Status,
            details: response.data.Details,
            otp: response.data.Details 
        });
        await otpResponse.save();
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
