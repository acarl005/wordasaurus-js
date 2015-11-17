// place connection string here
// e.g. var uri = 'mongodb://andy:corn@ds051334.mongolab.com:51334/cli';
// or   var uri = 'mongodb://andy:corn@localhost:27017/cli';
// or   var uri = config.get('mongo');
var uri = 'mongodb://andy:corn@localhost:27017/wordasaurus';
if (!uri) throw new Error('\033[31mYou need to provide the connection string. \
You can open "models/connection-string.js" and export it or use the "setUri" command.\033[0m');
else {
  var cmd = uri.match(/^mongodb:\/\/(\w+):(.*?)@(.*?):(\d+)\/(\w+)$/);
  if (!cmd) throw new Error('\033[31m Improperly formatted URI: \033[0m' + uri);
}
module.exports = uri;