const { Server } = require('node-osc');

var oscServer = new Server(3333, '0.0.0.0');

oscServer.on('listening', (err) => {
  console.log('listening');
});

oscServer.on('message', (msg) => {
  console.log(`Address: ${msg}`);
});
