const express = require('express');
const { Registration } = require('../../controller/authController');
const router = express.Router();

router.post('/registration', Registration);

module.exports = router;
