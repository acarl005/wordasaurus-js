var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}

var bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
  'email': { type: String, required: true, index: { unique: true } },
  'password': { type: String, required:true },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

userSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

userSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});


userSchema.pre('save', function(next) {
  var record = this;

  // only hash if it has been modified (or is new)
  if (!record.isModified('password')) return next();

  // hash the password using our new salt
  bcrypt.hash(record['password'], null, null, function(err, hash) {
    if (err) return next(err);
    record['password'] = hash;
    next();
  });
});

userSchema.methods['passwordCompare'] = function(attempt, next) {
  bcrypt.compare(attempt, this['password'], function(err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password;
  return user;
};


userSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email); 
}, 'The email is improperly formatted.');


module.exports = mongoose.model('User', userSchema);
