var env = process.env;
if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
  require('dotenv').load({ path: `${__dirname}/../.env.${env.NODE_ENV}` });
}

var url = require('url')

var uri = process.env.MONGO;

if (!uri) {
  throw new Error(
    '\033[31mYou need to provide the connection string. ' +
    'You can open "models/connection-string.js" and export it or use the "setUri" command.\033[0m'
  );
}

var uriObj = url.parse(uri)
if (uriObj.protocol !== 'mongodb:') {
  throw new Error('Must be a mongodb URI')
}
if (!uriObj.host || !uriObj.path) {
  throw new Error('Improperly formatted URI')
}

module.exports = uri;

