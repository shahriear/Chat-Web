const express = require('express');
const {
  createConversation,
  conversationList,
} = require('../../controller/conversationController');
const authMiddleware = require('../../middleware/authMiddleware');
const {
  sendMessage,
  getMessage,
} = require('../../controller/messageController');
const router = express.Router();
router.post('/createconversation', authMiddleware, createConversation);
router.get('/conversationList', authMiddleware, conversationList);

router.post('/send', authMiddleware, sendMessage);
router.get('/getmessage/:conversationid', authMiddleware, getMessage);
module.exports = router;

// time:25:44
