var User = require('../../models/User');

module.exports = {
  create: function(req, res, next) {
    User.create(req.body, function(err, user) {
      if (err) {
        if (err.code === 11000) return res.status(422).send({ message: 'Email already in use.' });
        return res.status(500).send(err);
      }
      req.user = user;
      next();
    });
  },

  find: function(req, res, next) {
    var email = req.body.email;
    User.findOne({ email }, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(422).send({ message: 'Email not found.' });

      user.passwordCompare(req.body.password, function(err, isMatch) {
        if (err) return res.status(500).send(err);
        if (!isMatch) return res.status(401).send({ message: 'Password incorrect.' });
        req.user = user;
        next();
      });

    });
  }
};

function validateEmail(email) {
  
}