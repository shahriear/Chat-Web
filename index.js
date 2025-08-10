const express = require('express');
const dbConfig = require('./dbConfig/db');
const router = require('./routes');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { log } = require('console');
const app = express();
app.use(express.json());
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: '*',
});
global.io = io;

const activeUsers = new Map();

io.on('connection', socket => {
  // console.log('User connected with socket ' + socket.id);
  socket.on('join_room', convoId => {
    socket.join(convoId);
    // console.log(`user joined room with ${convoId}`);
  });
  socket.on('join_user', userId => {
    activeUsers.set(socket.id, userId);
    io.emit('active_users', Array.from(activeUsers.values()));
  });
  socket.on('disconnect', () => {
    activeUsers.delete(socket.id);
    setTimeout(() => {
      io.emit('active_users', Array.from(activeUsers.values()));
    }, 2000);
  });
});

dbConfig();
app.use(router);

// console.log(new Date('2025-08-05T06:38:22.313+00:00').toLocaleString());

httpServer.listen(8000, () => console.log('Server is running'));

// c4329rgxNMXsuYcq;
