'use strict';

var fs = require('fs')
, path = require('path');

function directoryExists(dir, cb) {
  fs.stat(dir, (err) => {
    if (err && (err.errno === 34 || err.errno === 2 || err.code === 'ENOENT')) {
      cb(null, false);
    } else {
      cb(err, true);
    }
  });
}

function getFilesFromDir(dir, cb) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      cb(err);
    }

    files = files.map((file) => {
      return path.join(dir, file);
    }).filter((file) => {
      return fs.statSync(file).isFile();
    });
    cb(null, files);
  });
}

module.exports = {
  directoryExists: directoryExists,
  getFilesFromDir: getFilesFromDir
};
