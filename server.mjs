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
import { on } from 'events';

import SocketIO from 'socket.io';
import pino from 'pino';
import { Client } from 'node-osc';

import { createStaticServer } from './lib/static-server.mjs';

const logger = pino({
  level: 'info'
});

const app = createStaticServer();
const io = new SocketIO(app.server);
const oscClient = new Client('127.0.0.1', 3333);

app.listen(3000, (err) => console.error(err));

async function main() {
  for await (const [socket] of on(io, 'connection')) {
    logger.info('new session connected');
    socket.on('message', (message) => {
      logger.info(`address: ${message.address} value: ${message.value}`)
      oscClient.send(message.address, Number(message.value));
    });
    socket.on('disconnect', () => {
      logger.info('session disconnected');
    });
  }
}

main().catch((e) => console.error(e));
