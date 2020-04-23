'use strict'
const SocketIO = require('socket.io');
const pino = require('pino');

const { createStaticServer } = require('./lib/static-server.js');

const logger = pino({
  level: 'info'
});

const app = createStaticServer();

const io = new SocketIO(app.server);

io.on('connection', (socket) => {
  logger.info('new session connected')
  socket.on('message', (message) => {
    logger.info(`address: ${message.address} value: ${message.value}`)
  });
  socket.on('disconnect', () => {
    logger.info('session disconnected');
  });
});

app.listen(3000, (err) => console.error(err));
