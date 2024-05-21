// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 

// Load environment variables
dotenv.config();

const otpRoutes = require('./routes/otpRoutes');
const otpVerifyRoutes = require('./routes/otpVerifyRoutes');
const changeNumber = require('./routes/phoneNumberChangeRoutes'); 
const pinVerifyRoutes = require('./routes/pinVerifyRoutes');
const dataRoutes = require('./routes/dataRoutes');
const pinSave = require('./routes/pinRoute');
const pinSaveGet = require('./routes/pinSaveGetRoute');
const userDetails = require('./routes/userDetailsRoute');
const userDetailsGet = require('./routes/userDetailsGetRoute');
const checkPhoneNumber = require('./routes/checkPhoneRoute'); 
const userDetailsPut = require('./routes/userDetailsPutRoute');
const getBillerData = require('./routes/dataRoutes');
const panRoutes = require('./routes/panRoutes');
const billernewApiRoutes = require('./routes/bilerroutenew');
const billFetchRoutes = require('./routes/billFetchRoute');
const getBillerByIdFile = require('./routes/billerFileFetchRoute');
const billPayRoute = require('./routes/billPayRoute');
const cardPost = require('./routes/cardRoute');
const getCardRoute = require('./routes/getCardRoute');
const complaintRegister = require('./routes/ComplaintRegistrationRoute');
const complaintTracking = require('./routes/complaintTrackingRoute');


const app = express();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', otpRoutes);
app.use('/Verifyapi', otpVerifyRoutes);
app.use('/users', changeNumber); 
app.use('/checkPhoneNumbers', checkPhoneNumber);
app.use('/api', pinVerifyRoutes);
app.use('/api', dataRoutes); 
app.use('/pinSave', pinSave); 
app.use('/getPin', pinSaveGet);
app.use('/userDetailsPost', userDetails);
app.use('/userDetailsGet', userDetailsGet);
app.use('/userDetailsPut', userDetailsPut);
app.use('/category', getBillerData);
app.use('/api', panRoutes);
app.use('/builderAPI', billernewApiRoutes);
app.use('/fetchBill', billFetchRoutes);
app.use('/fetchFromFile', getBillerByIdFile); 
app.use('/payRequest', billPayRoute); 
app.use('/cardSave', cardPost); 
app.use('/cardGetDetails', getCardRoute); 
app.use('/complaint', complaintRegister); 
app.use('/tracking', complaintTracking); 




// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



