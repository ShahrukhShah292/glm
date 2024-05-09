const User = require('../models/userDetailsModel');
const ImageKit = require('imagekit');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize ImageKit client
const imagekit = new ImageKit({
    publicKey: 'public_yD8H7nDF40SLXKtJAC4OA+HD3LQ=',
    privateKey: 'private_oxb6qqwjzT3FbMPZszVyo6UTKx4=',
    urlEndpoint: 'https://ik.imagekit.io/ShahShah'
});

exports.createUser = async (req, res) => {
    try {
        const { FullName, Email, PhoneNumber, Address } = req.body;
        
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        // Upload image to ImageKit
        const file = req.file.buffer;
        const uploaded = await imagekit.upload({
            file: file.toString('base64'),
            fileName: req.file.originalname,
            tags: ['userImage']
        });

        // Save user with ImageKit URL
        const newUser = new User({
            FullName,
            Email,
            PhoneNumber,
            Address,
            userImage: uploaded.url // Saving ImageKit URL
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
