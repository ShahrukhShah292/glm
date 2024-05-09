const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const xml2js = require('xml2js');
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



    exports.billPayController = (req, res, saveToMongoDB) => {
        const apiUrl3 = process.env.API_URL3;
        const accessKey = process.env.ACCESS_KEY;
       
        const reqId = req.body.reqId;
        const ver = process.env.VERSION;
        const instituteCode = process.env.INSTITUTE_CODE;
        const mobileNumber = req.body.mobileNumber;
        const emailAddress = req.body.emailAddress;
        const adharNumber = req.body.adharNumber;
        const panNumber = req.body.panNumber;
        const inputXmlData = req.body.inputXmlData;
         
        const adhoc = req.body.adhoc; 
        const amount = req.body.amount; 
        const paymentMethod = req.body.paymentMethod; 
        const billerId = req.body.billerId; 
      
      
       
        function generateRandomString(length = 35) {
            const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const charactersLength = characters.length;
            let randomString = '';
            for (let i = 0; i < length; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return randomString;
        }
      
        let xmlData = `<?xml version="1.0" encoding="UTF-8"?><billPaymentRequest><agentId>CC01AC33MOBU00000001</agentId><billerAdhoc>${adhoc}</billerAdhoc><agentDeviceInfo><ip>117.99.242.98</ip><initChannel>MOB</initChannel><imei>358057081442269</imei><app>MOB</app><os>ios</os></agentDeviceInfo><customerInfo><customerMobile>${mobileNumber}</customerMobile><customerEmail>${emailAddress}</customerEmail><customerAdhaar>${adharNumber}</customerAdhaar><customerPan>${panNumber}</customerPan></customerInfo><billerId>${billerId}</billerId>${inputXmlData}<amountInfo><amount>${amount}</amount><currency>356</currency><custConvFee>0</custConvFee><amountTags></amountTags></amountInfo><paymentMethod><paymentMode>${paymentMethod}</paymentMode><quickPay>N</quickPay><splitPay>N</splitPay></paymentMethod><paymentInfo><info><infoName>WalletName</infoName><infoValue>GreenLinkMarket</infoValue></info><info><infoName>MobileNo</infoName><infoValue>${mobileNumber}</infoValue></info></paymentInfo></billPaymentRequest>`;

    const encXmlData = encryptMessage(xmlData, process.env.ENCRYPTION_KEY);

    const requestOptions = {
        method: 'POST',
        url: `${apiUrl3}?accessCode=${accessKey}&requestId=${reqId}&ver=${ver}&instituteId=${instituteCode}&encRequest=${encXmlData}`,
        headers: {
            'Content-Type': 'text/plain'
        },
        data: encXmlData
    };

    axios(requestOptions)
        .then(response => {
            const decryptedXmlData = decryptMessage(response.data, process.env.ENCRYPTION_KEY);

            xml2js.parseString(decryptedXmlData, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err);
                    res.status(500).send('Internal server error');
                    return;
                }

                if (response.status === 200) {
                    saveToMongoDB(result)
                        .then(() => {
                            res.status(response.status).json(result);
                        })
                        .catch(error => {
                            console.error('Error saving to MongoDB:', error);
                            res.status(500).send('Internal server error');
                        });
                } else {
                    res.status(response.status).json(result);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Internal server error');
        });
};