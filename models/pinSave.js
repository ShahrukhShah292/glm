const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema({
    PhoneNumber: String,
    PinNumber: String,
    jwtToken: String
});

const pinSave = mongoose.model('pinSave', dataSchema); // Export as pinSave

module.exports = pinSave;
