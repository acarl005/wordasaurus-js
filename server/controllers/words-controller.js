var ThesService = require('../services/thesaurus');
var thesaurus = new ThesService(process.env.THES_API);
var Synonym = require('../../models/Synonym');

function index(req, res, next) {
  Synonym.findOne({ word: req.params.word }, (err, syns) => {
    if (err) return res.status(500).send(err);
    if (syns) return res.send(syns.toJSON());
    next();
  });
}

function create(req, res) {
  var word = req.params.word;
  thesaurus.get(word, (err, resp, data) => {
    if (err) return res.status(500).send(err);
    if (resp.statusCode === 404) {
      return res.status(404).send({ message: 'Could not find synonyms for "' + word + '".'});
    }
    if (resp.statusCode !== 200) {
      return res.status(resp.statusCode).send(resp);
    }
    data.word = word;
    Synonym.create(data, (err, word) => {
      if (err) return res.status(500).send(err);
      res.send(word.toJSON());
    });
  });
}

module.exports = { index, create };
