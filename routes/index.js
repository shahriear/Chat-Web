const express = require('express');
const router = express.Router();
const apiRoute = require('./api');

router.use('/api/v1', apiRoute);
router.get("/",(req,res)=>{
  res.send("Hello! Welcome to the Server.")
})
router.use((req, res) => {
  res.status(404).send('Page Not Found!');
});

module.exports = router;
