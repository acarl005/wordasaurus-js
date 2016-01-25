var jwt = require('jwt-simple');

function create(req, res) {
  delete req.user.password;
  var token = jwt.encode(req.user, 'secret');
  res.send({ token });
}

function verify(req, res, next) {
  var token = req.headers.authorization;
  try {
    req.user = jwt.decode(token, 'secret');
  } catch(err) {}
  if (!req.user) return res.status(401).send({ message: 'Unauthorized' });
  next();
}


module.exports = { create, verify };
