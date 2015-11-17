var jwt = require('jwt-simple');

module.exports = {
  create: function(req, res) {
    delete req.user.password;
    var token = jwt.encode(req.user, 'secret');
    res.send({ token });
  }
};