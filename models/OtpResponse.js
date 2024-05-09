
const mongoose = require('mongoose');

const otpResponseSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const OtpResponse = mongoose.model('OtpResponse', otpResponseSchema);

module.exports = OtpResponse;
