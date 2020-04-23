'use strict';
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');

function createStaticServer(path) {
  return fastify({
    logger: {
      level: 'trace'
    }
  }).register(fastifyStatic, {
    root:  path
  });
}

module.exports = {
  createStaticServer
};
