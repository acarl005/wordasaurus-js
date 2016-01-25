var request = require('supertest');
var app = require('../../server/server');
var expect = require('chai').expect;
var User = require('../../models/User');

describe('User controller', () => {
  it('should register a user', done => {
    request(app).post('/users')
    .send({ email: 'john@example.org', password: 'lololol' })
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.property('token').and.not.eql('');
      done();
    });
  });

  it('should not register without email', done => {
    request(app).post('/users')
    .send({ username: 'john@example.org', password: 'lololol' })
    .expect(400)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.property('errors');
      expect(res.body.message).to.eql('User validation failed');
      done();
    });
  });

  it('should not register without password', done => {
    request(app).post('/users')
    .send({ email: 'john@example.org' })
    .expect(400)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.property('errors');
      expect(res.body.message).to.eql('User validation failed');
      done();
    });
  });

  it('should not register with duplicate email', done => {
    request(app).post('/users')
    .send({ email: 'john@example.org', password: 'supsup' })
    .expect(422)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body.message).to.eql('Email already in use.');
      User.count({}, (err, num) => {
        expect(num).to.eql(1);
        done();
      });
    });
  });

});
