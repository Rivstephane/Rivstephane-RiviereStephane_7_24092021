const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl= require('../controllers/post');

router.get('/', auth, postsCtrl.getAllPost);
router.get('/getOnePost', auth, postsCtrl.getOnePost);
router.post('/', postsCtrl.createPost);
router.put('/modifyPost', auth, postsCtrl.modifyPost);
router.delete('/', auth, postsCtrl.deletePost);

module.exports = router;