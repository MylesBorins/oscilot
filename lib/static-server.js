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
