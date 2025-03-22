const mongoose = require('mongoose');

const dbConfig = () => {
  return mongoose
    .connect(process.env.DB_CONECTION_STRING)
    .then(() => console.log('Connected!'));
};
module.exports = dbConfig;
