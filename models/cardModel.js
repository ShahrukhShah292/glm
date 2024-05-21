// cardDetailsModel.js

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    nameOnCard: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    expiryDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    }, 
    userId: {
        type: String,
        required: true
    }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
