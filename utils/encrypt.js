const md5 = require('./md5')
const crypto = require('crypto');

const key = 'AA09219929CF7AFA55899D0073C3823C'

function encrypt(billerId) {
    const plainText = `<?xml version="1.0" encoding="UTF-8"?><billerInfoRequest><billerId>${billerId}</billerId></billerInfoRequest>`
    const secretKey = Buffer.from(md5(key), 'hex');
    const initVector = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    const cipher = crypto.createCipheriv('aes-128-cbc', secretKey, initVector);

    let encryptedText = cipher.update(plainText, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText;
}

module.exports = encrypt