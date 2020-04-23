/*
Copyright 2020 Myles Borins

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict'
const SocketIO = require('socket.io');
const pino = require('pino');
const { Client } = require('node-osc');

const { createStaticServer } = require('./lib/static-server.js');

const logger = pino({
  level: 'info'
});

const app = createStaticServer();

const io = new SocketIO(app.server);

const oscClient = new Client('127.0.0.1', 3333);

io.on('connection', (socket) => {
  logger.info('new session connected')
  socket.on('message', (message) => {
    logger.info(`address: ${message.address} value: ${message.value}`)
    oscClient.send(message.address, Number(message.value));
  });
  socket.on('disconnect', () => {
    logger.info('session disconnected');
  });
});

app.listen(3000, (err) => console.error(err));
