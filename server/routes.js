const router = require('express').Router();
const { addLyrics } = require('./handlers/addLyrics');
const { createComment } = require('./handlers/createComment');
const { createUser } = require('./handlers/createUser');
const { deleteComment } = require('./handlers/deleteComment');
const { deleteLyrics } = require('./handlers/deleteLyrics');
const { editEachComment } = require('./handlers/editEachComment');
const { editLyrics } = require('./handlers/editLyrics');
const { getAllLyrics } = require('./handlers/getAllLyrics');
const { getComment } = require('./handlers/getComment');
const { getEachComment } = require('./handlers/getEachComment');
const { getLyrics } = require('./handlers/getLyrics');
const { myPage } = require('./handlers/myPage');
const { signInUser } = require('./handlers/signInUser');

router.get('/', (req, res) => {
  res.status(200).json({ status: 200, success: true });
});

router.get('/api/searchSongs/:songId', getAllLyrics);
router.get('/api/newLyrics/:songId/:addedLyricsId', getLyrics);
router.get('/api/newLyrics/:songId/:addedLyricsId/comment', getComment);
router.get(
  '/api/newLyrics/:songId/:addedLyricsId/comment/:addedCommentId',
  getEachComment
);
router.get('/api/myPage/:signedInUser_id', myPage);

router.post('/api/signup', createUser);
router.post('/api/signin', signInUser);
router.post('/api/addLyrics/:songId', addLyrics);
router.post('/api/newLyrics/:songId/:addedLyricsId/comment', createComment);

router.patch('/api/newLyrics/:songId/:addedLyricsId/edit', editLyrics);
router.patch(
  '/api/newLyrics/:songId/:addedLyricsId/comment/:addedCommentId/edit',
  editEachComment
);

router.delete('/api/newLyrics/:songId/:addedLyricsId/delete', deleteLyrics);
router.delete(
  '/api/newLyrics/:songId/:addedLyricsId/:addedCommentId/delete',
  deleteComment
);

module.exports = router;
