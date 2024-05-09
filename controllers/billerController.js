const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
require('dotenv').config();

function encryptMessage(msg, key) {
    const secretKey = convertToBinary(generateHash(key));
    const initVector = Buffer.from([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    const cipher = crypto.createCipheriv('aes-128-cbc', secretKey, initVector);
    let encryptedMsg = cipher.update(msg, 'utf8', 'hex');
    encryptedMsg += cipher.final('hex');
    return encryptedMsg;
}

function decryptMessage(encryptedMsg, key) {
    const secretKey = convertToBinary(generateHash(key));
    const initVector = Buffer.from([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    const decipher = crypto.createDecipheriv('aes-128-cbc', secretKey, initVector);
    let decryptedMsg = decipher.update(encryptedMsg, 'hex', 'utf8');
    decryptedMsg += decipher.final('utf8');
    return decryptedMsg;
}

function convertToBinary(hexStr) {
    const len = hexStr.length;
    const binArray = [];
    for (let i = 0; i < len; i += 2) {
        binArray.push(parseInt(hexStr.substr(i, 2), 16));
    }
    return Buffer.from(binArray);
}

const generateHash = (str) => crypto.createHash('md5').update(str).digest('hex');

exports.getBillerInfo = (req, res) => {
  const apiUrl = process.env.API_URL;
  const accessKey = process.env.ACCESS_KEY;
  const reqId = process.env.REQUEST_ID;
  const ver = process.env.VERSION;
  const instituteCode = process.env.INSTITUTE_CODE;
  // const encBillerId = req.body.encBillerId; 

  const xmlData = `<?xml version="1.0" encoding="UTF-8"?><billerInfoRequest><billerId>AADH00000NATPT</billerId></billerInfoRequest>`;
  const encXmlData = encryptMessage(xmlData, process.env.ENCRYPTION_KEY);

  const requestOptions = {
    method: 'POST',
    url: `${apiUrl}?accessCode=${accessKey}&requestId=${reqId}&ver=${ver}&instituteId=${instituteCode}`,
    headers: {
      'Content-Type': 'text/plain'
    },
    data: encXmlData
  };

  axios(requestOptions)
    .then(response => {
      console.log('Encrypted Response:', response.data);
      const decryptedXmlData = decryptMessage(response.data, process.env.ENCRYPTION_KEY);
      console.log('Decrypted Response:', decryptedXmlData);
      res.status(response.status).send(decryptedXmlData);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal server error');
    });
};
