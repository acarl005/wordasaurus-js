var request = require('supertest');
var app = require('../../server/server');
var expect = require('chai').expect;
var Document = require('../../models/Document');
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsImVtYWlsIjoiam9obkBleGFtcGxlLm9yZyIsIl9pZCI6IjU2YTZhZjA1ZjY1M2Y0Yzg0YWFmYzUxMSIsInVwZGF0ZWRBdCI6IjIwMTYtMDEtMjVUMjM6MjU6NTcuNTkxWiIsImNyZWF0ZWRBdCI6IjIwMTYtMDEtMjVUMjM6MjU6NTcuNTkxWiIsImRvY3VtZW50cyI6W119.hGziEWz1wG24LxOZ24_HgwKOjWpc5Id3j3Ifmp0BGcY';

describe('document controller', () => {

  var id;

  it('should create a document for a user', done => {
    request(app).post('/documents')
    .set('Authorization', token)
    .send({ title: 'rye bread' })
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.property('title').and.eql('rye bread');
      done();
    });
  });

  it('should not create a document without a token', done => {
    request(app).post('/documents')
    .send({ title: 'rye bread' })
    .expect(401)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.property('message').and.eql('Unauthorized');
      done();
    });
  });

  it('should retrieve documents for a user', done => {
    request(app).get('/documents')
    .set('Authorization', token)
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.length(1);
      expect(res.body[0]).to.have.property('title').and.eql('rye bread');
      expect(res.body[0]).to.have.property('_id').and.not.eql('');
      id = res.body[0]._id;
      done();
    });
  });

  it('should get a document by its id', done => {
    request(app).get('/documents/' + id)
    .set('Authorization', token)
    .expect(200)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.property('title').and.eql('rye bread');
      done();
    });
  });

  it('should not get a document by its id without a token', done => {
    request(app).get('/documents/' + id)
    .expect(401)
    .end((err, res) => {
      expect(err).to.not.exist;
      expect(res.body).to.have.property('message').and.eql('Unauthorized');
      done();
    });
  });
});
