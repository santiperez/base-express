'use strict';

var path = require('path')
, config = require('config');

var cluster = require('./cluster')
, server = require('./server')
, configHelper = require('./helpers/config');


start();

function start() {
  process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config');

  const port = config.get('api.port');
  const baseUrl = configHelper.getApiBaseUrl();
  const routesFolder = configHelper.getRoutesFolder();
  const protocol = configHelper.getApiProtocol();

  const params = [port, protocol, baseUrl, routesFolder];
  cluster.start(server.start, params, config.workers);
}
