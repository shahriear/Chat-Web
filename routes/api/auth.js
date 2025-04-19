const express = require('express');
const {
  Registration,
  LoginController,
  verifyEmailAddress,
  forgetPass,
  resetPass,
} = require('../../controller/authController');

const router = express.Router();

router.post('/registration', Registration);
router.post('/verifyemail', verifyEmailAddress);
router.post('/login', LoginController);
router.post('/forgatpass', forgetPass);
router.post('/resetpassword/:randomstring', resetPass);

module.exports = router;
