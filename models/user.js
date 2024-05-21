const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    pin: String,
    email: String,
    address: String,
    photo: String,
    aadharNumber: String,
    panNumber: String,
    jwtToken: String,
});

const User = mongoose.model('User1', userSchema);

module.exports = User;
