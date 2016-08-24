'use strict';

var express = require('express')
, config = require('config');

var configHelper = require('../helpers/config');

var router = express.Router();

router.get('/information', (req, res) => {
  const info = {
    version: config.get('api.version')
  };

  info.baseUrl = configHelper.getApiBaseUrl();
  info.name = configHelper.getApiName();

  res.json(info);
});

module.exports = router;
