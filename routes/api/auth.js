const express = require('express');
const {
  Registration,
  LoginController,
} = require('../../controller/authController');
const router = express.Router();

router.post('/registration', Registration);
router.post('/login', LoginController);

module.exports = router;
