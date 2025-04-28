const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const chat = require('./chat');
router.use('/auth', authRoute);
router.use('/chat', chat);

module.exports = router;
