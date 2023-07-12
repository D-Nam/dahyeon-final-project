'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const myPage = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { signedInUser_id } = req.params;

  try {
    await client.connect();
    const db = client.db('final_project');

    const result = await db
      .collection('lyrics')
      .find({
        userId: signedInUser_id,
      })
      .toArray();

    if (!result) {
      res.status(404).json({ status: 404, message: 'not found.' });
    } else {
      res.status(200).json({ status: 200, data: result });
    }
  } catch (error) {
    console.error;
    res.status(500).json({ status: 500, message: error.message });
  }
  client.close();
};

module.exports = { myPage };
