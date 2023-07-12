'use strict';
const uuid = require('uuid');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { songId, addedLyricsId } = req.params;
  const { signedInUser_id, textValue, date } = req.body;

  if (!textValue) {
    return res.status(400).json({
      status: 400,
      message: 'Please write something to add your comment.',
    });
  }

  try {
    await client.connect();
    const db = client.db('final_project');

    const addedCommentId = uuid.v4();

    //add the comment info into the 'comments' collection.
    const result = await db.collection('comments').insertOne({
      userId: signedInUser_id._id,
      textValue,
      date,
      songId,
      addedLyricsId,
      addedCommentId: addedCommentId,
    });

    return res.status(200).json({ status: 200, success: true, data: result });
  } catch (error) {
    console.error;
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

module.exports = { createComment };
