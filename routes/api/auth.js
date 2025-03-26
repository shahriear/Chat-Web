const express = require('express');
const {
  Registration,
  LoginController,
  verifyEmailAddress,
} = require('../../controller/authController');
const router = express.Router();

router.post('/registration', Registration);
router.post('/verifyemail', verifyEmailAddress);
router.post('/login', LoginController);

module.exports = router;
