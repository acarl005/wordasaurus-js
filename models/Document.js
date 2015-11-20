var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  'title': { type: String, required: true },
  'body': { type: String, default: '' },
  'wordCount': { type: Number, default: 0 },
  'preview': { type: String },
  'user': { type: Schema.Types.ObjectId, ref: 'User', required: true },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  try {
    this.wordCount = this.body.match(/\w+/g).length;
  } catch(err) {
    this.wordCount = 0;
  }
  this.preview = this.body.slice(0, 300);
  next();
});

newSchema.post('save', function(doc) {
  this.model('User').findOneAndUpdate({ _id: doc.user }, { $addToSet: { documents: doc._id } })
  .exec(function(err, user) {
    if (err) console.error(err);
  });
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('remove', function(next) {
  var doc = this;
  this.model('User').update(
    { _id: doc.user }, 
    { $pull: { documents: doc._id } }, 
    {},
    next
  );
});



module.exports = mongoose.model('Document', newSchema);
