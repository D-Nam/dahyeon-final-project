'use strict';
const uuid = require('uuid');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addLyrics = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { songId } = req.params;
  const { signedInUser_id, language, lyrics } = req.body;

  if (!songId) {
    return res.status(404).json({ status: 404, message: 'No songId found.' });
  }

  if (!signedInUser_id) {
    return res.status(404).json({ status: 404, message: 'No userId found.' });
  }

  if (!language || !lyrics) {
    return res.status(400).json({
      status: 400,
      message: 'Please fill all boxes.',
    });
  }

  try {
    await client.connect();
    const db = client.db('final_project');

    const addedLyricsId = uuid.v4();

    //add the lyrics info into the 'songs' collection.
    await db.collection('songs').insertOne({
      songId: songId,
      lyrics: [{ language, lyrics, userId: signedInUser_id._id }],
      addedLyricsId: addedLyricsId,
    });

    //add the lyrics info into 'lyrics' collection.
    await db.collection('lyrics').insertOne({
      userId: signedInUser_id._id,
      songId: songId,
      lyrics: [{ language, lyrics, userId: signedInUser_id._id }],
      addedLyricsId: addedLyricsId,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message:
        'Your lyrics has been added successfully! Thank you for your help!',
    });
  } catch (error) {
    console.error;
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

module.exports = { addLyrics };
