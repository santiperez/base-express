'use strict';

var express = require('express');

var router = express.Router();

/**
 * @swagger
 * resourcePath: /time
 * description: All about get actual time
 */

/**
 * @swagger
 * path: /time
 * operations:
 *   -  httpMethod: GET
 *      summary: Get the actual time
 *      notes: Get time in ISOString format
 *      responseClass: Time
 *      nickname: time
 */
router.get('/time', (req, res) => {
  res.json({time: new Date().toISOString()});
});

module.exports = router;

/**
 * @swagger
 * models:
 *  Time:
 *     id: Time
 *     properties:
 *       time:
 *         type: "string"
 *         format: "date-time"
 *         defaultValue: "2016-08-23T08:52:14.084Z"
 *         required: true
 */
