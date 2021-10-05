const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const messageCtrl = require('../controllers/messages');

router.get('/', auth, messageCtrl.getAllMessage);
router.get('/getMessage', auth, messageCtrl.getMessage);
router.post('/', auth, messageCtrl.createMessage);
router.delete('/', auth, messageCtrl.deleteMessage);

module.exports = router;