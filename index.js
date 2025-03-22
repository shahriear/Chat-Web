const express = require('express');
const dbConfig = require('./dbConfig/db');
const router = require('./routes');

const app = express();
require('dotenv').config();
app.use(express.json());
dbConfig();
// app.use(router);
app.use(router);
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(8000, () => console.log('Server is running'));
// c4329rgxNMXsuYcq;
