const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl= require('../controllers/post');

router.get('/', postsCtrl.getAllPost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.post('/', postsCtrl.createPost);
router.put('/', auth, postsCtrl.modifyPost);
router.delete('/', auth, postsCtrl.deletePost);

module.exports = router;