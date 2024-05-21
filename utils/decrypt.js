const md5 = require('./md5')
const crypto = require('crypto');

const key = 'AA09219929CF7AFA55899D0073C3823C'

function decrypt(encryptedText) {
    const secretKey = Buffer.from(md5(key), 'hex');
    const initVector = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    const encryptedBuffer = Buffer.from(encryptedText, 'hex');
    const decipher = crypto.createDecipheriv('aes-128-cbc', secretKey, initVector);

    let decryptedText = decipher.update(encryptedBuffer, null, 'utf8');
    decryptedText += decipher.final('utf8');

    return decryptedText;
}

module.exports = decrypt