var express = require('express');
var app = express();
var path = require('path');

var userCtrl = require('./controllers/users-controller');
var seshCtrl = require('./controllers/sessions-controller');

var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname + '/../public')));

app.post('/users', userCtrl.create, seshCtrl.create);
app.post('/sessions', userCtrl.find, seshCtrl.create);

var port = process.env.PORT || 3000;
app.listen(port, console.log.bind(console, 'listening at http://localhost:' + port)); 