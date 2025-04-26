const express = require('express');
const createConversation = require('../../controller/conversationController');
const router = express.Router();
router.post('/createconversation', createConversation);
module.exports = router;
