'use strict';

var config = require('config');
var logger = require('../tools/logger');

function getApiUrl() {
  const api = config.get('api');
  let urlBasePath = `${api.protocol}://${api.domain}:${api.port}`;
  urlBasePath += (config.has('api.baseURL')) ? config.get('api.baseURL') : '';
  return urlBasePath;
}

function apiConfigIsValid() {
  const valid =
  config.has('api.protocol') &&
  config.has('api.domain') &&
  config.has('api.port');

  if (!valid) {
    var errMsg = 'Invalid swagger config:';
    logger.error(`${errMsg} api.protocol, api.domain, api.port are required`);
  }
  return valid;
}

function swaggerConfigIsValid() {
  const valid = config.has('swagger.url') && config.has('swagger.path');
  if (!valid) {
    var errMsg = 'Invalid swagger config:';
    logger.error(`${errMsg}: swagger.url, swagger.path are required`);
  }
  return valid;
}

module.exports = {
  getApiUrl: getApiUrl,
  apiConfigIsValid: apiConfigIsValid,
  swaggerConfigIsValid: swaggerConfigIsValid
};
