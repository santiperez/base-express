'use strict';

var express = require('express')
, path = require('path')
, _ = require('lodash');

var logger = require('../tools/logger')
, routesHelper = require('../helpers/routes');

module.exports = (baseUrl) => {
  var router = express.Router();

  routesHelper.getRouteFiles((err, files) => {
    if (err) {
      logger.error(`Error getting routes. No routes added. error: ${err}`);
    }

    files.forEach((file) => {
      router.use(baseUrl, require(path.join('..', '..', file)));
    });

    listRoutes(router, baseUrl).map((route) => {
      logger.debug('Registering route', route, '...');
    });
  });
  return router;
};

function listRoutes(router, baseUrl) {
  var routes = [];
  if (router && router.stack) {
    router.stack.forEach((middleware) => {
      if (middleware && middleware.route) {
        routes.push(processRoute(middleware.route, baseUrl));
      } else if (middleware && middleware.name && middleware.name === 'router'
&& _.has(middleware, 'handle.stack')) {
        routes = routes.concat(middleware.handle.stack.map((handler) => {
          if (_.has(handler, 'route')) {
            return processRoute(handler.route, baseUrl);
          }
        }));
      }
    });
  }
  return routes;
}

function processRoute(route, baseUrl) {
  const methods = (Object.keys(route.methods)) ?
Object.keys(route.methods).toString().toUpperCase() : '';

  return `${methods} ${baseUrl}${route.path}`;
}

