const axios = require('axios');
const CryptoJS = require('crypto-js');

// Encryption function
function encrypt(plainText, key) {
    const secretKey = CryptoJS.enc.Hex.parse(CryptoJS.MD5(key).toString(CryptoJS.enc.Hex));
    const initVector = CryptoJS.lib.WordArray.random(16);
    const encryptedText = CryptoJS.AES.encrypt(plainText, secretKey, { iv: initVector }).toString();
    return {
        encryptedText: encryptedText,
        initVector: initVector.toString()
    };
}

// Decryption function
function decrypt(encryptedText, key, initVector) {
    const secretKey = CryptoJS.enc.Hex.parse(CryptoJS.MD5(key).toString(CryptoJS.enc.Hex));
    const decryptedText = CryptoJS.AES.decrypt(encryptedText, secretKey, { iv: CryptoJS.enc.Hex.parse(initVector) }).toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

// API function to get biller info
exports.getBillerInfo = async (req, res) => {
    const url = 'https://api.billavenue.com/billpay/extMdmCntrl/mdmRequestNew/xml';
    const accessCode = 'AVPA22SU86GX97LHQN';
    const requestId = 'IBxf0CQuPDxKFYT05XrGCKqGxgl5QCvpfwY';
    const ver = '1.0';
    const instituteId = 'AC33';
    const key = 'AA09219929CF7AFA55899D0073C3823C'; // Set your encryption key here
    const billerId = req.params.billerId; // Get biller id from request params

    // Encrypt billerId
    const { encryptedText, initVector } = encrypt(`<billerInfoRequest><billerId>${billerId}</billerId></billerInfoRequest>`, key);

    const options = {
        method: 'POST',
        url: `${url}?accessCode=${accessCode}&requestId=${requestId}&ver=${ver}&instituteId=${instituteId}&encReques=${encryptedText}`,
        headers: {
            'Content-Type': 'text/plain'
        },
        data: encryptedText
    };

    try {
        const response = await axios(options);
        // Decrypt response
        const decryptedResponse = decrypt(response.data, key, initVector);
        console.log('Decrypted Response:', decryptedResponse);
        res.status(200).send(decryptedResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
};
