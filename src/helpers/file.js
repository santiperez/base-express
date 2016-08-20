'use strict';

var fs = require('fs');

function directoryExists(directory, cb) {
  fs.stat(directory, function(err, stats) {
    if (err && (err.errno === 34 || err.errno === 2 || err.code === 'ENOENT')) {
      cb(null, false);
    } else {
      cb(err, true);
    }
  });
}

module.exports = {
  directoryExists: directoryExists
};
