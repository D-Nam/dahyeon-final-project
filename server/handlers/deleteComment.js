'use strict';
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { songId, addedLyricsId, addedCommentId } = req.params;

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

  try {
    await client.connect();
    const db = client.db('final_project');

    //delete the comment from the 'comments' collection.
    const deteteCommentFromComments = await db
      .collection('comments')
      .deleteOne({ addedCommentId: addedCommentId });

    if (deteteCommentFromComments.deletedCount === 0) {
      res.status(400).json({ status: 400, message: "Comment wasn't deleted." });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Comment has been deleted successfully!',
      });
    }
  } catch (error) {
    console.error;
    res.status(500).json({ status: 500, message: error.message });
  }
  client.close();
};

module.exports = { deleteComment };
