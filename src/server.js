'use strict';

var compression = require('compression')
, express = require('express')
, bodyParser = require('body-parser')
, path = require('path')
, helmet = require('helmet');

var logger = require('./tools/logger')
, testReports = require('./tools/test-reports')
, swagger = require('./tools/swagger');

var app;

function start(port, baseURL, routesFolderPath) {
  init(baseURL, routesFolderPath);
  app.listen(port, () => {
    const message = `is listening to all incoming requests in port ${port}`;
    logger.info('Process', process.pid, message);
  }).on('error', function(err) {
    logger.error(err.message);
  });
}

function init(baseURL, routesFolderPath) {
  app = express();
  app.use(compression());
  testReports.init(app);
  swagger.init(app);
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(require(path.join(__dirname, '../', routesFolderPath))(baseURL));
  return app;
}
module.exports = {
  app: app,
  start: start
};
