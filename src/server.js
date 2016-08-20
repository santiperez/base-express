'use strict';

var compression = require('compression')
, express = require('express')
, bodyParser = require('body-parser')
, helmet = require('helmet');

var logger = require ('./tools/logger');

var app;

function start(port, baseURL, routesFolderPath) {
  init(baseURL);
  app.listen(port, () => {
    const message = `is listening to all incoming requests in port ${port}`;
    logger.info('Process', process.pid, message);
  }).on('error', function(err) {
    logger.error(err.message);
  });
}

function init(baseURL, routesFolderPath) {
  app = express();
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(require('./routes')(baseURL));
  return app;
}
module.exports = {
  app: app,
  start: start
};
