'use strict';

var express = require('express');

var router = express.Router();

router.get('/time', (req, res) => {
  res.json({time: new Date().toISOString()});
});


module.exports = router;
