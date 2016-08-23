'use strict';

var _ = require('lodash')
, config = require('config')
, path = require('path');

var fileHelper = require('./file');

const routesFolder = config.has('api.routesFolder')
? config.api.routesFolder : './src/routes';

function getRouteFiles(cb) {
  fileHelper.readFilesFromDir(routesFolder, (err, files) => {
    if (err) {
      cb(err);
    }
    cb(null, excludeRouteFiles(files));
  });
}

function excludeRouteFiles(files) {
  _.remove(files, function(file) {
    return file === path.join(routesFolder, 'index.js');
  });
  return files;
}

module.exports = {
  getRouteFiles: getRouteFiles
};
