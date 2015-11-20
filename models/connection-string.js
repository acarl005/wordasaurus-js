var env = process.env;
if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
  require('dotenv').load({ path: `${__dirname}/../.env.${env.NODE_ENV}` });
}

var uri = process.env.MONGO;

if (!uri) throw new Error('\033[31mYou need to provide the connection string. \
You can open "models/connection-string.js" and export it or use the "setUri" command.\033[0m');
else {
  var cmd = uri.match(/^mongodb:\/\/(\w+):(.*?)@(.*?):(\d+)\/(\w+)$/);
  if (!cmd) throw new Error('\033[31m Improperly formatted URI: \033[0m' + uri);
}
module.exports = uri;