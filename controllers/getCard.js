
const Card = require('../models/cardModel');

exports.getCard = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cards = await Card.find({ userId: userId });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
