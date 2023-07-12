'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteLyrics = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { songId, addedLyricsId } = req.params;

  if (!songId) {
    return res.status(404).json({ status: 404, message: 'No songId found.' });
  }

  if (!addedLyricsId) {
    return res
      .status(404)
      .json({ status: 404, message: 'No addedLyricsId found.' });
  }

  try {
    await client.connect();
    const db = client.db('final_project');

    //delete the lyrics info from the 'songs' collection.
    const deleteLyricsElement = await db
      .collection('songs')
      .deleteOne({ addedLyricsId: addedLyricsId });

    //delete the lyrics info from the 'lyrics' collection.
    const deteteLyricsFromUser = await db
      .collection('lyrics')
      .deleteOne({ addedLyricsId: addedLyricsId });

    //delete the comments from the 'comments' collection.
    await db.collection('comments').deleteOne({ addedLyricsId: addedLyricsId });

    if (
      deleteLyricsElement.deletedCount === 0 ||
      deteteLyricsFromUser.deletedCount === 0
    ) {
      res.status(400).json({ status: 400, message: "Lyrics wasn't deleted." });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Your lyrics has been deleted successfully!',
      });
    }
  } catch (error) {
    console.error;
    res.status(500).json({ status: 500, message: error.message });
  }
  client.close();
};

module.exports = { deleteLyrics };
