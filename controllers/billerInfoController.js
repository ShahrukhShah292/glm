// // controllers/billerInfoController.js

// const crypto = require('crypto');

// // Sample billers data (replace this with your actual biller data)
// const billerData = {
//     "CCAV00000MAH01": {
//         "billerName": "OTME",
//         "billerCategory": "Mobile",
//         "billerAdhoc": true,
//         "billerCoverage": "IND",
//         "billerFetchRequirement": "MANDATORY",
//         "billerPaymentExactness": "Exact",
//         "billerInputParams": [
//             {"paramName": "a", "dataType": "NUMERIC", "isOptional": false},
//             {"paramName": "a b", "dataType": "NUMERIC", "isOptional": false},
//             {"paramName": "a b c", "dataType": "NUMERIC", "isOptional": false},
//             {"paramName": "a b c d", "dataType": "NUMERIC", "isOptional": false},
//             {"paramName": "a b c d e", "dataType": "NUMERIC", "isOptional": false}
//         ],
//         "billerAmountOptions": "BASE_BILL_AMOUNT,Fixed Charges,,|Additional Charges,BASE_BILL_AMOUNT,,|Late Payment Fee,BASE_BILL_AMOUNT,Fixed Charges,|Additional Charges,Late Payment Fee,BASE_BILL_AMOUNT,|Additional Charges,Late Payment Fee,BASE_BILL_AMOUNT,Fixed Charges|BASE_BILL_AMOUNT,,,|Late Payment Fee,,,|Fixed Charges,,,|Additional Charges,,,|Late Payment Fee,BASE_BILL_AMOUNT,,",
//         "billerPaymentModes": "Internet Banking, Debit Card, Credit Card, Prepaid Card, IMPS, Cash, UPI, Wallet, NEFT"
//     }
// };

// exports.getBillerInfo = (req, res) => {
//     const accessCode = req.body.accessCode;
//     const encryptedRequestBody = req.body.encRequest;

//     // Decrypt the encrypted request body
//     const decryptedRequestBody = decryptAES(encryptedRequestBody);

//     // Parse decrypted request body
//     const requestData = parseRequest(decryptedRequestBody);

//     // Check if all required parameters are present
//     if (!requestData.requestId || !requestData.ver || !requestData.instituteId || !requestData.billerId) {
//         return res.status(400).json({ error: "Incomplete request data" });
//     }

//     // Get biller ID from request data
//     const billerId = requestData.billerId;

//     // Check if biller ID exists in biller data
//     if (!billerData[billerId]) {
//         return res.status(404).json({ error: "Biller ID not found" });
//     }

//     // Return biller information
//     res.json(billerData[billerId]);
// };

// // Decrypt AES function
// // Decrypt AES function
// function decryptAES(ciphertext) {
//     // Generate a random key with the correct length (32 bytes for AES-256)
//     const key = crypto.randomBytes(32);

//     const iv = Buffer.alloc(0); // No IV needed for ECB mode

//     const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
//     let decrypted = decipher.update(ciphertext, 'base64', 'utf-8');
//     decrypted += decipher.final('utf-8');
//     return decrypted;
// }

// // Parse request function
// function parseRequest(requestBody) {
//     // Parse request body into object
//     const parsedData = {};
//     requestBody.split('\n').forEach(line => {
//         if (line) {
//             const [key, value] = line.split(': ');
//             parsedData[key] = value;
//         }
//     });
//     return parsedData;
// }
