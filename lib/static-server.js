'use strict';
const {resolve} = require('path');

const Fastify = require('fastify');
const fastifyStatic = require('fastify-static');

const webRoot = resolve(__dirname, '../public');
const nodeModulesRoot = resolve(__dirname, '../node_modules/');

function createStaticServer() {
  const fastify = Fastify({
    logger: {
      level: 'trace'
    }
  });
  fastify.register((instance, opts, next) => {
    instance.register(fastifyStatic, {
      root: webRoot
    });
    next();
  });
  fastify.register((instance, opts, next) => {
    instance.register(fastifyStatic, {
      root: nodeModulesRoot,
      prefix: '/node_modules/'
    });
    next();
  });
  return fastify;
}

module.exports = {
  createStaticServer
};
