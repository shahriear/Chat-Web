const express = require('express');
const {
  Registration,
  LoginController,
  verifyEmailAddress,
  forgetPass,
  resetPass,
  Update,
} = require('../../controller/authController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + 'Profile';
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post('/registration', Registration);
router.post('/verifyemail', verifyEmailAddress);
router.post('/login', LoginController);
router.post('/forgatpass', forgetPass);
router.post('/resetpassword/:randomstring', resetPass);
router.post('/update', upload.single('avatar'), Update);

module.exports = router;
