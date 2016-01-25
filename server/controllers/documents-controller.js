var Document = require('../../models/Document');

function index(req, res) {
  Document.find({ user: req.user._id }, (err, docs) => {
    if (err) return res.status(500).send(err);
    res.send(docs);
  });
}

function show(req, res) {
  Document.findById(req.params.id, (err, doc) => {
    if (err) return res.status(500).send(err);
    if (doc.user != req.user._id)
      return res.status(401).send({ message: 'This is not your document.' });
    res.send(doc);
  });
}

function create(req, res) {
  Document.create({
    title: req.body.title,
    user: req.user._id
  }, (err, doc) => {
    if (err) return res.status(500).send(err);
    res.send(doc);
  });
}

module.exports = { index, show, create };
