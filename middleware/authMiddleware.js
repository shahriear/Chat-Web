var jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('authorization');
    // console.log(token);

    if (token) {
      jwt.verify(token, process.env.JWT_SEC, function (err, decoded) {
        if (err) {
          req.status(400).send('Bad request!');
        }

        if (decoded.data) {
          req.user = decoded.data;
          next();
        }
      });
    } else {
      res.status(400).send('Bad request!');
    }
  } catch (error) {
    res.status(500).send('Server error !');
  }
};
module.exports = authMiddleware;
