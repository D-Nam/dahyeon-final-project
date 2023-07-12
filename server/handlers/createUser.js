'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId, userPassword } = req.body;

  if (!userId || !userPassword) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide all information!',
    });
  }

  if (userId.length < 5 || userId.length > 15) {
    return res
      .status(400)
      .json({ status: 400, message: 'User id must be 5-15 characters!' });
  }

  if (userPassword.length < 5 || userPassword.length > 15) {
    return res
      .status(400)
      .json({ status: 400, message: 'User password must be 5-15 characters!' });
  }

  //run the password through a hashing algorithm.
  const hashPassword = await bcrypt.hash(userPassword, 12);

  try {
    await client.connect();
    const db = client.db('final_project');

    //check if the userId already exists or not.
    const checkIfUserIdExists = await db
      .collection('users')
      .findOne({ _id: userId });

    if (checkIfUserIdExists) {
      return res.status(400).json({
        status: 400,
        message:
          'Someone is using the same user id now. Please try different one.',
      });
    }

    //add new user's info(userId & hashed password) into 'users' collection.
    await db
      .collection('users')
      .insertOne({ _id: userId, password: hashPassword });

    const data = { _id: userId, password: hashPassword };

    return res.status(200).json({ status: 200, success: true, data: data });
  } catch (error) {
    console.error;
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

module.exports = { createUser };
