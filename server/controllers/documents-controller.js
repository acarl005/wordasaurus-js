var Document = require('../../models/Document');

module.exports = {
  index: function(req, res) {
    Document.find({ user: req.user._id }, function(err, docs) {
      if (err) return res.status(500).send(err);
      res.send(docs);
    });
  },

  show: function(req, res) {
    Document.findById(req.params.id, function(err, doc) {
      if (err) return res.status(500).send(err);
      if (doc.user != req.user._id) 
        return res.status(401).send({ message: 'This is not your document.' });
      res.send(doc);
    });
  },

  create: function(req, res) {
    Document.create({
      title: req.body.title,
      user: req.user._id
    }, function(err, doc) {
      if (err) return res.status(500).send(err);
      res.send(doc);
    });
  }
}