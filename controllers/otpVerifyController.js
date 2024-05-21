const JwtToken = require('../models/JwtToken');
const axios = require('axios');
const jwt = require('jsonwebtoken'); 

exports.verifyOTP = async (req, res) => {
    const { otp, phoneNumber, userId } = req.body; 
    try {
        const apiKey = process.env.API_KEY;
        const response = await axios.post(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY3/${phoneNumber}/${otp}`);
        
        if (response.data.Status === "Success") {
          
            const token = generateJWT(userId);
          
            const jwtToken = new JwtToken({
                token: token,
                userId: userId
            });
            await jwtToken.save();
            res.json({ success: true, token: token });
        } else {
            res.status(401).json({ success: false, message: "OTP verification failed" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


function generateJWT(userId) {
    const payload = {
        userId: userId
    };
    const options = {
        expiresIn: '1h'
    };
    
    const secretKey = generateSecretKey();
    return jwt.sign(payload, secretKey, options);
}


function generateSecretKey() {
    
    return require('crypto').randomBytes(64).toString('hex');
}
