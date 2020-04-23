const socket = globalThis.socket = io();
socket.emit('message', 'OMG!');
