const { emailValidators } = require('../helpers/emailValidators');
const { sendMail } = require('../helpers/mail');
const validatePassword = require('../helpers/passValidator');
const {
  verifyEmailTemplate,
  resetPassTemplate,
} = require('../helpers/templates');
const userSchema = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const generateRandomString = require('../helpers/generateRandomString');
const cloudinary = require('../helpers/cloudinary');
const { time, error } = require('console');

//Registration Controller========

const Registration = async (req, res) => {
  const { email, fullName, password, avatar } = req.body;

  try {
    if (!email) return res.status(400).send({ error: 'Email is required!' });
    if (!fullName) return res.status(400).send({ error: 'Name is required!' });

    if (!password)
      return res.status(400).send({ error: 'Password is required!' });
    if (emailValidators(email))
      return res.status(400).send({ error: 'Email is not Valid!' });
    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res.status(400).send({ error: 'Email already exist!' });
    const passwordValidResult = validatePassword(password);
    if (passwordValidResult) {
      return res.status(400).send({
        error: passwordValidResult.message || 'Password is not valid!',
      });
    }
    //Generate random 4 digit OTP Number
    const randomOtp = Math.floor(Math.random() * 9000);

    // =======DataBase below======
    const user = new userSchema({
      fullName,
      email,
      password,
      avatar,
      otp: randomOtp,
      otpExpiredAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    user.save();
    //Send this generate otp to the user email
    sendMail(email, 'Verify your email.', verifyEmailTemplate, randomOtp);
    res
      .status(201)
      .send({ success: 'Registration Successfull! please verify your Email.' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};
//verify EmailAddress ======================
const verifyEmailAddress = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp)
      return res.status(400).send({ error: 'invalid request!' });

    const verifiedUser = await userSchema.findOne({
      email,
      otp,
      otpExpiredAt: { $gt: Date.now() },
    });
    if (!verifiedUser) return res.status(400).send({ error: 'invalid OTP' });

    verifiedUser.otp = null;
    verifiedUser.otpExpiredAt = null;
    verifiedUser.isVarified = true;
    verifiedUser.save();
    res.status(200).send({ success: 'Email Verified successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

//Loging Controller========
const LoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).send('Email is required!');
    if (emailValidators(email))
      return res.status(400).send('Email is not Valid!');
    if (!password) return res.status(400).send('Password is required!');
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser) return res.status(400).send('User Not Found !');
    const passCheck = await existingUser.isPasswordValid(password);
    if (!passCheck) return res.status(400).send('Wrong Password');
    if (!existingUser.isVarified)
      return res.status(400).send('Email is Not Verified !');

    const accessToken = jwt.sign(
      {
        data: {
          email: existingUser.email,
          id: existingUser._id,
        },
      },
      process.env.JWT_SEC,
      { expiresIn: '24h' }
    );
    const loggedUser = {
      email: existingUser.email,
      _id: existingUser._id,
      fullName: existingUser.fullName,
      avatar: existingUser.avatar,
      isVarified: existingUser.isVarified,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };
    res.status(200).send({
      message: 'Login Successfull',
      user: loggedUser,
      existingUser,
      accessToken,
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

//Forget Password   =========================
const forgetPass = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).send('Email is required!');
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser) return res.status(400).send('User Not Found !');
    const randomString = generateRandomString(28);
    existingUser.resetPassId = randomString;
    existingUser.resetpassExpiredAt = new Date(Date.now() + 10 * 60 * 1000);
    existingUser.save();

    //Send reset pass email
    sendMail(email, 'Reset Password.', resetPassTemplate, randomString);

    res.status(201).send('Check your email');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Reset Password   ========================
const resetPass = async (req, res) => {
  try {
    const { newPass } = req.body;
    const randomString = req.params.randomstring;
    const email = req.query.email;
    const existingUser = await userSchema.findOne({
      email,
      resetPassId: randomString,

      resetpassExpiredAt: { $gt: Date.now() },
    });
    if (!existingUser) return res.status(400).send('invalid Request');
    if (!newPass) return res.status(400).send('input your new password');
    existingUser.password = newPass;
    existingUser.resetPassId = null;
    existingUser.resetpassExpiredAt = null;

    existingUser.save();
    res.send('Reset password Successfull !');
  } catch (error) {
    res.status(500).send('Server error !');
  }
};

//Update profile ========
const Update = async (req, res) => {
  const { fullName, password } = req.body;
  try {
    const existingUser = await userSchema.findById(req.user.id);

    if (fullName) existingUser.fullName = fullName.trim();
    if (password) existingUser.password = password;

    if (req.file.path) {
      await cloudinary.uploader.destroy(
        existingUser.avatar.split('/').pop().split('.')[0]
      );

      const result = await cloudinary.uploader.upload(req.file.path);
      existingUser.avatar = result.url;
      fs.unlinkSync(req.file.path);
    }
    existingUser.save();

    res.status(200).send(existingUser);
  } catch (error) {
    res.status(500).send('Server error !');
  }
};

module.exports = {
  Registration,
  verifyEmailAddress,
  LoginController,
  forgetPass,
  resetPass,
  Update,
};

// time:done video nxt--> 25
