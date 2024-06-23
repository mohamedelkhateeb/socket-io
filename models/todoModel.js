const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let client = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
  return client.db('todo');
}

async function getTodos() {
  const db = await connectToDatabase();
  const collection = db.collection('Todo');
  return collection.find({}).toArray();
}

module.exports = {
  connectToDatabase, // Export the function
  getTodos,
};
