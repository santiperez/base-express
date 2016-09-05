'use strict';

var compression = require('compression')
, express = require('express')
, methodOverride = require('method-override')
, bodyParser = require('body-parser')
, errorHandler = require('errorhandler')
, path = require('path')
, fs = require('fs')
, helmet = require('helmet');

var logger = require('./tools/logger')
, testReports = require('./tools/test-reports')
, swagger = require('./tools/swagger');

var app;
const sslOptions = {
  key: fs.readFileSync('config/certificates/agent2-key.pem'),
  cert: fs.readFileSync('config/certificates/agent2-cert.pem')
};

function start(port, protocol, baseUrl, routesFolderPath) {
  init(baseUrl, routesFolderPath);
  var http = require(protocol);
  const params = (protocol === 'https') ? [sslOptions, app] : [app];
  http.createServer.apply(this, params).listen(port, () => {
    const message = `is listening to all incoming requests in port ${port}`;
    logger.info('Process', process.pid, message);
  }).on('error', function(err) {
    logger.error(err.message);
  });
}


function init(baseUrl, routesFolderPath) {
  app = express();

  app.use(methodOverride());
  app.use(compression());
  app.use(helmet());
  app.use(bodyParser.json());

  testReports.init(app);

  swagger.init(app);

  app.use(require(path.join(__dirname, '../', routesFolderPath))(baseUrl));

  // error handling middleware should be loaded after the loading the routes
  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
    logger.debug('Registering errorHandler middleware');
  }
  return app;
}

module.exports = {
  app: app,
  start: start
};
