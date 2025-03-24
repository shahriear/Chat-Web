const { emailValidators } = require('../helpers/emailValidators');
const validatePassword = require('../helpers/passValidator');
const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');

//Registration Controller========

const Registration = async (req, res) => {
  const { fullName, email, password, avatar } = req.body;

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

  // =======DataBase below======

  const user = new userSchema({
    fullName,
    email,
    password,
    avatar,
    otp: null,
  });
  user.save();

  res.status(201).send('Registration Successfull');
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

module.exports = { Registration, LoginController };
