'use strict';

var request = require('supertest')
, rewire = require('rewire')
, chai = require('chai');
var expect = chai.expect;

var server = rewire('../../src/server');
var app = server.__get__('init')('/api/v1', './src/routes');

describe('GET /users', () => {
  it('should respond with 200 code and an array with 2 users', (done) => {
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an.Array;
        expect(res.body.length).to.equal(2);
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('GET /user/:id', function() {
  it('should respond with 200 status code and 1 user object', (done) => {
    request(app)
      .get('/api/v1/user/0')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an.Object;
        expect(res.body).to.have.property('username');
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should respond with 404 status code and an empty object', (done) => {
    request(app)
      .get('/api/v1/user/x')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function(err, res) {
        expect(res.body).to.be.empty;
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
