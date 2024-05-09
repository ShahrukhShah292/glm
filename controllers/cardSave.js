const Card = require('../models/cardModel');

exports.createCard = async (req, res) => {
    try {
        const { nameOnCard, cardNumber, expiryDate, cvv, userId} = req.body;
        const newCard = new Card({ nameOnCard, cardNumber, expiryDate, cvv, userId });
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
