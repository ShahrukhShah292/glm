const Data = require('../models/pinSave');

exports.getDataByPhoneNumber = (req, res) => {
    const { PhoneNumber } = req.query;
    if (!PhoneNumber) {
        return res.status(400).json({ error: 'PhoneNumber parameter is required' });
    }
    Data.find({ PhoneNumber })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err.message }));
};
