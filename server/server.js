var env = process.env;
if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
  require('dotenv').load({ path: `${__dirname}/../.env.${env.NODE_ENV}` });
}

var express = require('express');
var app = express();
var path = require('path');

var userCtrl = require('./controllers/users-controller');
var seshCtrl = require('./controllers/sessions-controller');
var docsCtrl = require('./controllers/documents-controller');

var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname + '/../public')));

app.post('/users', userCtrl.create, seshCtrl.create);
app.post('/sessions', userCtrl.find, seshCtrl.create);

app.get('/documents', seshCtrl.verify, docsCtrl.index);
app.get('/documents/:id', seshCtrl.verify, docsCtrl.show);
app.post('/documents', seshCtrl.verify, docsCtrl.create);

var port = env.PORT || 3000;
app.listen(port, console.log.bind(console, 'listening at http://localhost:' + port)); 