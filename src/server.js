'use strict';

var compression = require('compression')
, express = require('express')
, methodOverride = require('method-override')
, bodyParser = require('body-parser')
, errorHandler = require('errorhandler')
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

  app.use(methodOverride());
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json());

  testReports.init(app);

  swagger.init(app);

  app.use(require(path.join(__dirname, '../', routesFolderPath))(baseURL));

  // error handling middleware should be loaded after the loading the routes
  if (process.env.NODE_ENV == 'development') {
    app.use(errorHandler());
    logger.debug('Registering errorHandler middleware');
  }
  return app;
}

module.exports = {
  app: app,
  start: start
};
