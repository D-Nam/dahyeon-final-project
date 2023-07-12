'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const editEachComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { songId, addedLyricsId, addedCommentId } = req.params;
  const { textValue, date } = req.body;

  if (!songId) {
    return res.status(404).json({ status: 404, message: 'No songId found.' });
  }

  if (!addedLyricsId) {
    return res
      .status(404)
      .json({ status: 404, message: 'No addedLyricsId found.' });
  }

  if (!addedCommentId) {
    return res
      .status(404)
      .json({ status: 404, message: 'No addedCommentId found.' });
  }

  if (!textValue) {
    return res.status(400).json({
      status: 400,
      message: 'Please write something to edit your comment.',
    });
  }

  try {
    await client.connect();
    const db = client.db('final_project');

    //update the comment and date in the 'comments' collection.
    const result = await db.collection('comments').updateOne(
      { addedCommentId: addedCommentId },
      {
        $set: { textValue, date },
      }
    );

    if (result.matchedCount === 0) {
      res
        .status(404)
        .json({ status: 404, message: 'No addedCommentId found.' });
    } else if (result.modifiedCount === 0) {
      res.status(400).json({ status: 400, message: "Comment wasn't edited." });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Your comment has been edited successfully!',
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

module.exports = { editEachComment };
