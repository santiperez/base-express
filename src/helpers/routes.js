'use strict';

var _ = require('lodash')
, config = require('config')
, path = require('path')
, express = require('express');

var fileHelper = require('./file')
, configHelper = require('./config');

var routesFolder = config.has('api.routesFolder')
? config.api.routesFolder : './src/routes';

function getRouteFiles(cb) {
  fileHelper.getFilesFromDir(routesFolder, (err, files) => {
    if (err) {
      cb(null, []);
    }
    cb(null, excludeRouteFiles(files));
  });
}

function excludeRouteFiles(files) {
  _.remove(files, (file) => {
    return file === path.join(routesFolder, 'index.js') ||
    path.extname(file) !== '.js' ;
  });
  return files;
}

function addInformationRoute() {
  var router = express.Router();
  router.get('/information', (req, res) => {
    var info = {
      version: config.get('api.version'),
      baseUrl: configHelper.getApiBaseUrl(),
      name: configHelper.getApiName()
    };
    res.json(info);
  });
  return router;
}

module.exports = {
  getRouteFiles: getRouteFiles,
  addInformationRoute: addInformationRoute
};
