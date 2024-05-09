// models/JwtToken.js
const mongoose = require('mongoose');

const jwtTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h' 
    }
});

const JwtToken = mongoose.model('JwtToken', jwtTokenSchema);

module.exports = JwtToken;
