// // routes/billerApiRoutes.js

// const express = require('express');
// const router = express.Router();
// const generateRandomString = require('../utils/stringGenerator');
// const axios = require('axios');
// const encrypt = require('../utils/encrypt');
// const decrypt = require('../utils/decrypt');

// router.post('/getBillerInfo', async (req, res) => {
//     const accessCode = "AVPA22SU86GX97LHQN"
//     const requestId = generateRandomString()
//     const ver = 1.0
//     const instituteId = 'AC33'

//     const cipheredRequest = encrypt('ABLP01000WMDXF')

//     const infoRequest = await axios.post(
//         `https://api.billavenue.com/billpay/extMdmCntrl/mdmRequestNew/xml?accesscode=${accessCode}&requestId=${requestId}&ver=${ver}&instituteid=${instituteId}`,
//         cipheredRequest
//     );

//     const encryptedResponse = infoRequest.data
//     const decryptedResponse = decrypt(encryptedResponse)
//     // console.log(cipheredRequest)
//     // console.log(decryptedResponse)
// });

// module.exports = router;
