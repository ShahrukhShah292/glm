const { MongoClient } = require('mongodb');
const BSON = require('bson');
require('dotenv').config();

class Biller {
  constructor() {
    this.dbClient = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async connect() {
    await this.dbClient.connect();
  }

  async saveData(data) {
    try {
      const db = this.dbClient.db(process.env.DB_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME);

      // Serialize the data
      const serializedData = BSON.serialize(data);
      
      // Store the serialized data
      const insertResult = await collection.insertOne({ data: new BSON.Binary(serializedData) });
      return insertResult.acknowledged;
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      return false;
    }
  }
}

module.exports = Biller;
