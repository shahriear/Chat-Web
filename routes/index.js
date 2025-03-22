const express = require('express');
const router = express.Router();
const apiRoute = require('./api');

router.use('/api/v1', apiRoute);
router.use((req, res) => {
  res.status(404).send('Page Not Found!');
});

module.exports = router;
