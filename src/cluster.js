'use strict';

var cluster = require('cluster')
, logger = require ('./tools/logger');

function start(fnProcess, fnArgs, numWorkers) {
  numWorkers = (!numWorkers || numWorkers === 0) ?
  require('os').cpus().length : numWorkers;

  if (cluster.isMaster) {
    createWorkers(numWorkers);
  } else {
    fnProcess.apply(this, fnArgs);
  }
}

function createWorkers(numWorkers) {
  logger.info('Master cluster setting up', numWorkers, 'workers...');

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.debug('Worker', worker.process.pid, 'is online');
  });

  cluster.on('exit', (worker, code, signal) => {
    const message = `died with code: ${code} and signal: ${signal}`;
    logger.debug('Worker ', worker.process.pid, message);
    logger.debug('Starting a new worker!');
    cluster.fork();
  });
}

module.exports = {
  start: start
};
