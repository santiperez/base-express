'use strict';

var express = require('express');

var User = require('../models/user');

var router = express.Router();

/**
 * @swagger
 * resourcePath: /user
 * description: All about get users
 */

/**
 * @swagger
 * path: /user/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get a user by a given id
 *      notes: Example id = 0, id = 1
 *      responseClass: User
 *      nickname: User
 *      parameters:
 *        - name: id
 *          description: id of the user
 *          required: true
 *          allowMultiple: false
 *          type: string
 *          paramType: path
 *      responseMessages:
 *        - code: 404
 *          message: Not found
 *          responseModel: Empty
 *        - code: 500
 *          message: Internal server error
 *          responseModel: Error
 *        - code: 200
 *          message: User found
 */

router.get('/user/:id', (req, res) => {
  User.get(req.params.id, (err, user) => {
    if (err) {
      res.status(500).json({error: err});
    } else if (!user) {
      res.status(404).json({});
    } else {
      res.status(200).json(user);
    }
  });
});

/**
 * @swagger
 * path: /users
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all the users
 *      responseClass: array[User]
 *      nickname: User
 *      responseMessages:
 *        - code: 500
 *          message: Internal server error
 *          responseModel: Error
 *        - code: 200
 *          message: User found
 */

router.get('/users', (req, res) => {
  User.getAll((err, users) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(users);
    }
  });
});

module.exports = router;

/**
 * @swagger
 * models:
 *  User:
 *     id: User
 *     properties:
 *       time:
 *         type: "string"
 *         defaultValue: "Goyo Ramos"
 *         required: true
 *       username:
 *         type: "string"
 *         defaultValue: "goyo-ramos"
 *         required: true
 *       location:
 *         type: "string"
 *         defaultValue: "Gijon"
 *       phone:
 *         type: "string"
 *         defaultValue: "982563426"
 *       createdAt:
 *         type: "string"
 *         format: "date-time"
 *         defaultValue: "2016-08-23T08:52:14.084Z"
 *         required: true
 *  Empty:
 *     id: Empty
 *  Error:
 *     id: Error
 *     properties:
 *       error:
 *         type: "string"
 *         defaultValue: "Internal server error"
 *         required: true
 */
