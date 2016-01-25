var expect = require('chai').expect;
require('../../models/all-models').toContext(global);


describe('Document model', function() {

  var andy, updates = [], doc, doc2;
  before(function(done) {
    User.remove({}, function() {
      User.create({
        email: 'andy@example.org',
        password: 'corncorn'
      },
      function(err, user) {
        if (err) throw new Error(err);
        andy = user;
        Document.remove({}, function() {
          done();
        });
      });
    });
  });

  it('should save to database', function(done) {
    expect(andy).to.have.property('_id').and.not.be.null;

    var newDoc = new Document({
      title: 'sup world',
      user: andy._id
    });

    newDoc.save(function(err, saved) {
      if (err) throw new Error(err);
      expect(saved).to.have.property('_id').and.not.be.null;
      expect(saved).to.have.property('wordCount').and.eql(0);
      expect(saved).to.have.property('preview').and.eql('');
      expect(saved).to.have.property('updatedAt').and.not.be.null;
      updates.push(saved.updatedAt);
      doc = saved;
      done();
    });
  });

  it('should reject without a title ', function(done) {
    Document.create({ user: andy._id }, function(err, newDoc) {
      expect(err).to.exist;
      expect(err).to.have.property('message').and.eql('Document validation failed');
      done();
    });
  });

  it('should reject without a user ', function(done) {
    Document.create({ title: 'invalid' }, function(err, newDoc) {
      expect(err).to.exist;
      expect(err).to.have.property('message').and.eql('Document validation failed');
      done();
    });
  });

  it('should update the updatedAt, wordCount, and preview field on save', function(done) {
    doc.body = 'Lorem ipsum Sed adipisicing dolore labore velit aliquip eu officia in laboris velit cupidatat in adipisicing est enim cillum officia esse dolor qui amet adipisicing anim ut nulla voluptate id reprehenderit labore in nulla proident amet anim exercitation aute dolor ea Ut tempor in occaecat consectetur dolore Ut tempor laborum cupidatat reprehenderit occaecat ex proident qui veniam in sed esse dolor ullamco dolore dolore in proident eiusmod aliquip Ut Excepteur id magna mollit pariatur deserunt mollit sit fugiat quis veniam enim culpa voluptate culpa adipisicing ex nulla non adipisicing consequat nulla laboris dolore dolor elit laboris proident dolor ea enim est nulla sint anim culpa sed deserunt cupidatat deserunt ullamco ullamco officia eiusmod ea labore et pariatur dolor consectetur velit ad aliqua culpa Duis id minim in aute quis nostrud quis est in dolor velit reprehenderit ut in consequat ad ea mollit adipisicing in minim reprehenderit in Ut incididunt sit eiusmod cillum do amet labore dolore irure fugiat nostrud dolor do cillum pariatur ex minim esse aute eu qui aute adipisicing sint deserunt ad et ea adipisicing ex ea laborum anim dolor deserunt.';
    setTimeout(function() {
      doc.save(function(err, saved) {
        if (err) throw new Error(err);
        expect(saved.updatedAt).to.be.above(updates[0]);
        updates.push(saved.updatedAt);
        expect(saved.wordCount).to.eql(183);
        expect(saved.preview).to.eql('Lorem ipsum Sed adipisicing dolore labore velit aliquip eu officia in laboris velit cupidatat in adipisicing est enim cillum officia esse dolor qui amet adipisicing anim ut nulla voluptate id reprehenderit labore in nulla proident amet anim exercitation aute dolor ea Ut tempor in occaecat consectetu');
        doc = saved;
        done();
      });
    }, 100);
  });

  it('should update the updatedAt field on update', function(done) {
    setTimeout(function() {
      Document.update(
        { _id: doc._id },
        { $set: { title: 'new title'} },
        null,
        function(err, status) {
          if (err) throw new Error(err);
          Document.findById(doc._id, function(err, saved) {
            expect(saved.title).to.eql('new title');
            expect(saved.updatedAt).to.be.above(updates[1]);
            updates.push(saved.updatedAt);
            doc = saved;
            done();
          });
        }
      );
    }, 100);
  });

  it('should update the updatedAt field on findOneAndUpdate', function(done) {
    setTimeout(function() {
      Document.findOneAndUpdate(
        { _id: doc._id },
        { $set: { title: 'newer title' } },
        null,
        function(err, record) {
          if (err) throw new Error(err);
          Document.findById(doc._id, function(err, saved) {
            expect(saved.title).to.eql('newer title');
            expect(saved.updatedAt).to.be.above(updates[2]);
            updates.push(saved.updatedAt);
            doc = saved;
            done();
          });
        }
      );
    }, 100);
  });

  describe('associations', function() {

    it('should have the new document in andy associations', function(done) {
      User.findById(andy._id, function(err, found) {
        if (err) throw new Error(err);
        expect(found.documents).to.have.length(1);
        expect(found.documents[0]).to.eql(doc._id);
        andy = found;
        done();
      });
    });

    it('users should populate documents', function(done) {
      User.findById(andy._id).populate({ path: 'documents', select: 'wordCount' }).exec(function(err, data) {
        expect(data.documents).to.have.length(1);
        expect(data.documents[0]).to.have.property('wordCount').and.eql(183);
        done();
      });
    });

    it('documents should populate users', function(done) {
      Document.findById(doc._id).populate({ path: 'user', select: 'email' }).exec(function(err, data) {
        expect(data.user).to.have.property('email').and.eql('andy@example.org');
        done();
      });
    });

    it('should add a second association', function(done) {
      Document.create({
        title: 'second doc',
        user: andy._id
      }).then(function(newDoc) {
        expect(newDoc).to.have.property('title').and.eql('second doc');
        User.findById(andy._id, function(err, updated) {
          if (err) throw new Error(err);
          expect(updated.documents).to.have.length(2);
          expect(updated.documents[1]).to.eql(newDoc._id);
          doc2 = newDoc;
          andy = updated;
          done();
        });
      });
    });

    it('should remove association from user when a doc is deleted', function(done) {
      doc2.remove(function(err) {
        if (err) throw new Error(err);
        User.findById(andy._id, function(err, updated) {
          if (err) throw new Error(err);
          expect(updated.documents).to.have.length(1);
          andy = updated;
          done();
        });
      });
    });

    it('should remove associated document when user is deleted', function(done) {
      andy.remove(function(err) {
        if (err) throw new Error(err);
        Document.count(function(err, num) {
          if (err) throw new Error(err);
          expect(num).to.eql(0);
          done();
        });
      });
    });

  });

});
