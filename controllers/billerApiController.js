// const axios = require('axios');
// const crypto = require('crypto');

// // Encryption function
// function encrypt(plainText, key) {
//     const keyBuffer = Buffer.from(key.padEnd(16, '\0').slice(0, 16), 'utf8');
//     const initVector = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
//     const cipher = crypto.createCipheriv('aes-128-cbc', keyBuffer, initVector);
//     let encryptedText = cipher.update(plainText, 'utf8', 'hex');
//     encryptedText += cipher.final('hex');
//     return encryptedText;
// }

// // Decryption function
// function decrypt(encryptedText, key) {
//     const keyBuffer = Buffer.from(key.padEnd(16, '\0').slice(0, 16), 'utf8');
//     const initVector = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
//     const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, initVector);
//     let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
//     decryptedText += decipher.final('utf8');
//     return decryptedText;
// }

// exports.getBillerInfo = (req, res) => {
// };
