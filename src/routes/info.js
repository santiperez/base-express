'use strict';

var express = require('express')
, config = require('config');

var configHelper = require('../helpers/config');

var router = express.Router();

/**
 * @swagger
 * resourcePath: /information
 * description: All about get api information
 */

/**
 * @swagger
 * path: /information
 * operations:
 *   -  httpMethod: GET
 *      summary: Get api info
 *      responseClass: Info
 *      nickname: info
 */

router.get('/information', (req, res) => {
  const info = {
    version: config.get('api.version')
  };
  if (configHelper.apiConfigIsValid()) {
    info.url = configHelper.getApiUrl();
  }
  res.json(info);
});

module.exports = router;

/**
 * @swagger
 * models:
 *  Info:
 *     id: Info
 *     properties:
 *       version:
 *         type: "string"
 *         defaultValue: "0.0.1"
 *         url: "string"
 *         defaultValue: "http://domain:port/api/"
 *
 */
