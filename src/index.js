'use strict';

var path = require('path')
, config = require('config');

var cluster = require('./cluster')
, server = require('./server');


start();

function start() {
  process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config');
  const port = config.get('api.port');
  const baseURL = config.has('api.baseURL') ? config.api.baseURL : '';
  const routesFolder = config.has('api.routesFolder')
  ? config.api.routesFolder : './src/routes';

  cluster.start(server.start, [port, baseURL, routesFolder], config.workers);
}
