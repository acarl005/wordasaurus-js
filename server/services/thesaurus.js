var request = require('request');

function ThesService(apiKey) {
  if (!apiKey) throw new Error('API Key required for thesaurus API.');
  this.apiKey = apiKey;
}

ThesService.prototype.get = function get(word, next) {
  var options = {
    url: `http://words.bighugelabs.com/api/2/${this.apiKey}/${word}/json`,
    json: true
  };
  request(options, (err, res, body) => {
    if (err) return next(err);
    next(null, res, body);
  });
};

module.exports = ThesService;
