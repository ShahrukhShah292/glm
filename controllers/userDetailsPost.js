const User = require('../models/userDetailsModel');
const ImageKit = require('imagekit');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imagekit = new ImageKit({
    publicKey: 'public_yD8H7nDF40SLXKtJAC4OA+HD3LQ=',
    privateKey: 'private_oxb6qqwjzT3FbMPZszVyo6UTKx4=',
    urlEndpoint: 'https://ik.imagekit.io/ShahShah'
});

exports.createUser = async (req, res) => {
    try {
        const { FullName, Email, PhoneNumber, Address } = req.body;
        let userImage = null;

        if (req.file) {
            const file = req.file.buffer;
            const uploaded = await imagekit.upload({
                file: file.toString('base64'),
                fileName: req.file.originalname,
                tags: ['userImage']
            });
            userImage = uploaded.url;
        }

        const newUser = new User({
            FullName,
            Email,
            PhoneNumber,
            Address,
            userImage 
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
