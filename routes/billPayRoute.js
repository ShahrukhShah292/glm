const express = require('express');
const router = express.Router();
const billerController = require('../controllers/billPayController');
const { MongoClient } = require('mongodb');
require('dotenv').config();

router.post('/billPay', (req, res) => {
    billerController.billPayController(req, res, saveToMongoDB);
});

async function saveToMongoDB(data) {
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(); 
        const collection = database.collection(process.env.MONGO_COLLECTION_NAME);
        await collection.insertOne(data);
    } finally {
        await client.close();
    }
}

module.exports = router;
