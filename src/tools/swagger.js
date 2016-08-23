'use strict';

var swagger = require('swagger-express')
, express = require('express')
, config = require('config');

var logger = require('./logger');
var configHelper = require('../helpers/config');
var routesHelper = require('../helpers/routes');

function init(app) {

  if (config.has('swagger') &&
    configHelper.swaggerConfigIsValid() && configHelper.apiConfigIsValid()) {

    const swaggerURL = config.get('swagger.url');
    const urlBasePath = configHelper.getApiUrl();

    logger.info(`Initializing swagger ${urlBasePath}${swaggerURL} ...`);

    app.use(swaggerURL, express.static(config.get('swagger.path')));

    routesHelper.getRouteFiles((err, files) => {
      if (err) {
        logger.error('Error retriving routes for swagger');
      } else {
        logger.debug('Swagger api files: ', files.join(', '));

        const swaggerMiddleware = function() {
          return swagger.init(app, {
            apiVersion: config.get('api.version') || '1.0',
            swaggerVersion: '1.0',
            basePath: urlBasePath,
            swaggerURL: swaggerURL,
            swaggerJSON: '/api-docs.json',
            swaggerUI: './src/public/swagger',
            apis: files
          });
        };
        app.use(swaggerMiddleware());
      }
    });
  }
}


module.exports = {
  init: init
};
