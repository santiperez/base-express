'use strict';

var _ = require('lodash')
, config = require('config')
, path = require('path')
, express = require('express');

var fileHelper = require('./file');
var configHelper = require('./config');

const routesFolder = config.has('api.routesFolder')
? config.api.routesFolder : './src/routes';

function getRouteFiles(cb) {
  fileHelper.getFilesFromDir(routesFolder, (err, files) => {
    if (err) {
      cb(err);
    }
    cb(null, excludeRouteFiles(files));
  });
}

function excludeRouteFiles(files) {
  _.remove(files, function(file) {
    return file === path.join(routesFolder, 'index.js') ||
    file === path.join(routesFolder, 'info.js') ;
  });
  return files;
}

function addInformationRoute() {
  var router = express.Router();
  router.get('/information', (req, res) => {
    const info = {
      version: config.get('api.version')
    };

    info.baseUrl = configHelper.getApiBaseUrl();
    info.name = configHelper.getApiName();

    res.json(info);
  });
  return router;
}

module.exports = {
  getRouteFiles: getRouteFiles,
  addInformationRoute: addInformationRoute
};
