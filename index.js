const express = require('express');
const dbConfig = require('./dbConfig/db');
const router = require('./routes');
require('dotenv').config();
const { Server } = require('socket.io');
const httpServer = require('http').createServer();
const app = express();
app.use(express.json());

const io = new Server(httpServer, {
  cors: '*',
});
global.io = io;

dbConfig();
app.use(router);

app.listen(8000, () => console.log('Server is running'));

// c4329rgxNMXsuYcq;
