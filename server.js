'use strict'
const { join } = require('path');

const SocketIO = require('socket.io');
const pino = require('pino');

const { createStaticServer } = require('./lib/static-server.js');

const logger = pino({
  level: 'info'
});

const app = createStaticServer(join(__dirname, './public'));

const io = new SocketIO(app.server);

io.on('connection', (socket) => {
  logger.info('new session connected')
  socket.on('message', function (m) {
    logger.info(m);
  });
  socket.on('disconnect', function () {
    logger.info('session disconnected');
  });
});

app.listen(3000, (err) => console.error(err));
