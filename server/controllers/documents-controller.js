var Document = require('../../models/Document');

module.exports = {
  index: function(req, res) {
    Document.find({ user: req.user._id }, function(err, docs) {
      if (err) return res.status(500).send(err);
      res.send(docs);
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