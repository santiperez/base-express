'use strict';

var express = require('express');

module.exports = (baseURL) => {
  const router = express.Router();
  router.use(baseURL, require('./time'));
  router.use(baseURL, require('./user'));
  return router;
};
