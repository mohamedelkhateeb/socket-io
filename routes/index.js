const express = require('express');
const router = express.Router();
const socketIo = require('socket.io');
const todoController = require('../controllers/todoController');

let io;

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

function setupSocket(server) {
  io = socketIo(server);
  io.on('connection', (socket) => {
    todoController.handleClientConnection(socket);
  });
}

module.exports = {
  router,
  setupSocket,
};
