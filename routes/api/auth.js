const express = require('express');
const {
  Registration,
  LoginController,
  verifyEmailAddress,
  forgetPass,
  resetPass,
  Update,
} = require('../../controller/authController');
const upload = require('../../helpers/multer');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/registration', Registration);
router.post('/verifyemail', verifyEmailAddress);
router.post('/login', LoginController);
router.post('/forgatpass', forgetPass);
router.post('/resetpassword/:randomstring', resetPass);
router.post('/update', authMiddleware, upload.single('avatar'), Update);

module.exports = router;
