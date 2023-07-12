'use strict';
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signInUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId, userPassword } = req.body;

  if (!userId || !userPassword) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide all information!',
    });
  }

  try {
    await client.connect();
    const db = client.db('final_project');

    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Incorrect user id or password. Please try again.',
      });
    }

    //compare the given password and the password in the database.
    const validPassword = await bcrypt.compare(userPassword, user.password);
    if (!validPassword) {
      return res.status(404).json({
        status: 404,
        message: 'Incorrect user id or password. Please try again.',
      });
    }

    const data = { _id: userId };

    return res.status(200).json({
      status: 200,
      message: 'Signed in successfully.',
      data: data,
    });
  } catch (error) {
    console.error;
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

module.exports = { signInUser };
