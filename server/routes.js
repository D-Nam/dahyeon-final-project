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

router.get('/searchSongs/:songId', getAllLyrics);
router.get('/newLyrics/:songId/:addedLyricsId', getLyrics);
router.get('/newLyrics/:songId/:addedLyricsId/comment', getComment);
router.get(
  '/newLyrics/:songId/:addedLyricsId/comment/:addedCommentId',
  getEachComment
);
router.get('/myPage/:signedInUser_id', myPage);

router.post('/signup', createUser);
router.post('/signin', signInUser);
router.post('/addLyrics/:songId', addLyrics);
router.post('/newLyrics/:songId/:addedLyricsId/comment', createComment);

router.patch('/newLyrics/:songId/:addedLyricsId/edit', editLyrics);
router.patch(
  '/newLyrics/:songId/:addedLyricsId/comment/:addedCommentId/edit',
  editEachComment
);

router.delete('/newLyrics/:songId/:addedLyricsId/delete', deleteLyrics);
router.delete(
  '/newLyrics/:songId/:addedLyricsId/:addedCommentId/delete',
  deleteComment
);

module.exports = router;
