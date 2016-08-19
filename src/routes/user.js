'use strict';

var express = require('express');

var User = require('../models/user');

var router = express.Router();

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

