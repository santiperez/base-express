'use strict';

var express = require('express')
, _ = require('lodash');

var logger = require('../tools/logger');

module.exports = (baseURL) => {
  var router = express.Router();

  router.use(baseURL, require('./time'));
  router.use(baseURL, require('./user'));

  listRoutes(router).map((route) => {
    logger.info('Registering route ', route, '...');
  });

  return router;
};

function listRoutes(router) {
  var routes = [];
  if (router && router.stack) {
    router.stack.forEach((middleware) => {
      if (middleware && middleware.route) {
        routes.push(processRoute(middleware.route));
      } else if (middleware && middleware.name && middleware.name === 'router'
&& _.has(middleware, 'handle.stack')) {
        routes = routes.concat(middleware.handle.stack.map((handler) => {
          if (_.has(handler, 'route')) {
            return processRoute(handler.route);
          }
        }));
      }
    });
  }
  return routes;
}

function processRoute(route) {
  const methods = (Object.keys(route.methods)) ?
Object.keys(route.methods).toString().toUpperCase() : '';

  return `${methods} ${route.path}`;
}

