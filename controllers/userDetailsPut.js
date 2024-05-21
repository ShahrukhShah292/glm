const User = require('../models/userDetailsModel');
const ImageKit = require('imagekit');
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imagekit = new ImageKit({
    publicKey: 'public_yD8H7nDF40SLXKtJAC4OA+HD3LQ=',
    privateKey: 'private_oxb6qqwjzT3FbMPZszVyo6UTKx4=',
    urlEndpoint: 'https://ik.imagekit.io/ShahShah'
});

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { FullName, Email, PhoneNumber, Address } = req.body;
        
        if (req.file) {
            const file = req.file.buffer;
            const uploaded = await imagekit.upload({
                file: file.toString('base64'),
                fileName: req.file.originalname,
                tags: ['userImage']
            });

            req.body.userImage = uploaded.url; 
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
