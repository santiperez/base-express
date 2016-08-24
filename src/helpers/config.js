'use strict';

var config = require('config');
var logger = require('../tools/logger');

function getApiUrl() {
  let urlBasePath = getApiRootUrl();
  urlBasePath += getApiBaseUrl();
  return urlBasePath;
}

function getApiRootUrl() {
  const api = config.get('api');
  return `${getApiProtocol()}://${api.domain}:${api.port}`;
}

function getApiBaseUrl() {
  return config.has('api.baseUrl') ? config.get('api.baseUrl') : '';
}

function getApiProtocol() {
  return config.has('api.protocol') ? config.get('api.protocol') : 'http';
}

function getApiName() {
  return config.has('api.name') ? config.get('api.name') : '';
}

function getRoutesFolder() {
  return config.has('api.routesFolder') ?
  config.get('api.routesFolder') : './src/routes';
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
  getApiRootUrl: getApiRootUrl,
  getApiBaseUrl: getApiBaseUrl,
  getApiProtocol: getApiProtocol,
  getApiName: getApiName,
  getRoutesFolder: getRoutesFolder,
  apiConfigIsValid: apiConfigIsValid,
  swaggerConfigIsValid: swaggerConfigIsValid
};
