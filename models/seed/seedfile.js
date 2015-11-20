var mongoose = require('mongoose');

require('../all-models').toContext(global);


//------------------------
// ADD SEEDS BELOW
//------------------------

User.findOne({ email: 'andy@example.org' }, function(err, data) {

  Document.create({
    title: 'second doc',
    user: data._id
  }, function() {
    mongoose.connection.close();
  });
});