const { emailValidators } = require('../helpers/emailValidators');
const { sendMail } = require('../helpers/mail');
const validatePassword = require('../helpers/passValidator');
const { verifyEmailTemplate } = require('../helpers/templates');
const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');

//Registration Controller========

const Registration = async (req, res) => {
  const { fullName, email, password, avatar } = req.body;

  try {
    if (!fullName) return res.status(400).send('Name is required!');
    if (!email) return res.status(400).send('Email is required!');
    if (!password) return res.status(400).send('Password is required!');
    if (emailValidators(email))
      return res.status(400).send('Email is not Valid!');
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) return res.status(400).send('Email alredy exist!');
    const passwordValidResult = validatePassword(password);
    if (passwordValidResult) {
      return res.status(400).send(passwordValidResult);
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
    sendMail(email, 'Verify your email.', verifyEmailTemplate, randomOtp);
    res.status(201).send('Registration Successfull! please verify your Email.');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const verifyEmailAddress = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) return res.status(400).send('invalid request!');

    const verifiedUser = await userSchema.findOne({
      email,
      otp,
      otpExpiredAt: { $gt: Date.now() },
    });
    if (!verifiedUser) return res.status(400).send('invalid OTP');

    verifiedUser.otp = null;
    verifiedUser.otpExpiredAt = null;
    verifiedUser.isVarified = true;
    verifiedUser.save();
    res.status(200).send('Email Verified successfully!');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

//Loging Controller========
const LoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send('Email is required!');
  if (emailValidators(email))
    return res.status(400).send('Email is not Valid!');
  if (!password) return res.status(400).send('Password is required!');
  const existingUser = await userSchema.findOne({ email });
  const passCheck = await existingUser.isPasswordValid(password);
  if (!passCheck) return res.status(404).send('Wrong Password');
  res.status(200).send('Login Successfull');
};

module.exports = { Registration, verifyEmailAddress, LoginController };

// 13:41
