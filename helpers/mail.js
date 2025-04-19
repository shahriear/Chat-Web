const nodemailer = require('nodemailer');
const sendMail = async (email, subject, template, random) => {
  //Send this generate OTP to the user email..

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"no reply"ChatWeb', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    // text: 'Hello world?', // plain text body
    html: template(random, email), // html body
  });
};

module.exports = { sendMail };
