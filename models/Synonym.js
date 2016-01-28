var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var synSchema = new Schema({
  'word': { type: String },
  'verb': { type: Schema.Types.Mixed },
  'noun': { type: Schema.Types.Mixed },
  'adjective': { type: Schema.Types.Mixed },
  'adverb': { type: Schema.Types.Mixed },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

synSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

synSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

synSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

synSchema.methods.toJSON = function() {
  var data = this.toObject();
  delete data._id;
  delete data.__v;
  delete data.createdAt;
  delete data.updatedAt;
  delete data.word;
  return data;
};

module.exports = mongoose.model('Synonym', synSchema);
