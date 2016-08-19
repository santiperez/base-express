'use strict';

var path = require('path')
, config = require('config');

var cluster = require('./cluster')
, server = require('./server')
, logger = require('./tools/logger');


start();

function start() {
  process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config');
  const port = config.get('api.port');
  const baseURL = config.has('api.baseURL') ? config.api.baseURL : '';
  const routesFolder = config.has('api.routesFolder')
  ? config.api.routesFolder : './routes';

  registerUncaughtException();
  cluster.start(server.start, [port, baseURL, routesFolder], config.workers);
}

function registerUncaughtException() {
  process.on('uncaughtException', (err) => {
    logger.error(' uncaughtException:', err.message);
    logger.error(err.stack);
    process.exit(1);
  });
}
