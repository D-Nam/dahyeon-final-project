'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const editLyrics = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { songId, addedLyricsId } = req.params;
  const { language, lyrics, signedInUser_id } = req.body;

  if (!songId) {
    return res.status(404).json({ status: 404, message: 'No songId found.' });
  }

  if (!addedLyricsId) {
    return res
      .status(404)
      .json({ status: 404, message: 'No addedLyricsId found.' });
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

    //update the lyrics info in the 'songs' collection.
    const updateLyricsElement = await db.collection('songs').updateOne(
      { addedLyricsId: addedLyricsId },
      {
        $set: { lyrics: [{ language, lyrics, userId: signedInUser_id._id }] },
      }
    );

    //update the lyrics info in the 'lyrics' collection.
    const updateLyricsCollection = await db.collection('lyrics').updateOne(
      { addedLyricsId: addedLyricsId },
      {
        $set: { lyrics: [{ language, lyrics, userId: signedInUser_id._id }] },
      }
    );

    if (
      updateLyricsElement.matchedCount === 0 ||
      updateLyricsCollection.matchedCount === 0
    ) {
      res.status(404).json({ status: 404, message: 'No addedLyricsId found.' });
    } else if (
      updateLyricsElement.modifiedCount === 0 ||
      updateLyricsCollection.modifiedCount === 0
    ) {
      res.status(400).json({ status: 400, message: "Lyrics wasn't edited." });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        message:
          'Your lyrics has been edited successfully! Thank you for your help!',
      });
    }
  } catch (error) {
    console.error;
    res
      .status(500)
      .json({ status: 500, data: req.body, message: error.message });
  }
  client.close();
};

module.exports = { editLyrics };
