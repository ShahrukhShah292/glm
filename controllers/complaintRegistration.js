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

exports.billPayComplaints = (req, res) => {
    const apiUrl4 = process.env.API_URL_FETCH;
    // const accessKey = process.env.ACCESS_KEY;
    // const reqId = generateRandomString();
    // const ver = process.env.VERSION;
    // const instituteCode = process.env.INSTITUTE_CODE;
    // const encBillerId = req.body.encBillerId; 
    const ComplaintType = req.body.ComplaintType;
    const ParticipationType = req.body.ParticipationType;
    const TransactionReference = req.body.TransactionReference;
    const billerId = req.body.billerId;
    const ComplaintDescription = req.body.ComplaintDescription;
    const ServiceComplaint = req.body.ServiceComplaint; 
    const ComplaintDisposition = req.body.ComplaintDisposition; 

    function generateRandomString(length = 35) {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        let randomString = '';
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return randomString;
    }

    let xmlData = `<?xml version="1.0" encoding="UTF-8"?>
    <complaintRegistrationReq>
    <complaintType>${ComplaintType}</complaintType>
    <participationType>${ParticipationType}</participationType>
    <agentId>CC01CC31000001123458</agentId>
    <txnRefId>${TransactionReference}</txnRefId>
    <billerId>${billerId}<billerId />
    <complaintDesc>${ComplaintDescription}</complaintDesc>
    <servReason>${ServiceComplaint}</servReason>
    <complaintDisposition>${ComplaintDisposition}<complaintDisposition />
    </complaintRegistrationReq>`;

    const encXmlData = encryptMessage(xmlData, process.env.ENCRYPTION_KEY);

    const requestOptions = {
        method: 'POST',
        url: `${apiUrl4}?accessCode=${accessKey}&requestId=${reqId}&ver=${ver}&instituteId=${instituteCode}&encRequest=${encXmlData}`,
        headers: {
            'Content-Type': 'text/plain'
        },
        data: encXmlData
    };

    axios(requestOptions)
    .then(response => {
        const encryptedXmlResponse = response.data;

        const decryptedXmlData = decryptMessage(encryptedXmlResponse, process.env.ENCRYPTION_KEY);

        xml2js.parseString(decryptedXmlData, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                res.status(500).send('Internal server error');
                return;
            }

            const startIndex = decryptedXmlData.indexOf('<inputParams>');
            const endIndex = decryptedXmlData.lastIndexOf('</additionalInfo>') + '</additionalInfo>'.length;
            const extractedXml = decryptedXmlData.substring(startIndex, endIndex);

            const responseObject = {
              json: result,
                xml: extractedXml,
                reqId: reqId
            };

            res.status(response.status).json(responseObject);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    });

};
