const userSchema = require('../models/userSchema');

const Registration = (req, res) => {
  const { fullName, email, password, avatar } = req.body;
  const user = new userSchema({
    fullName,
    email,
    password,
    avatar,
  });
  user.save();
  res.status(201).send('Registration Successfull');
};
module.exports = { Registration };
