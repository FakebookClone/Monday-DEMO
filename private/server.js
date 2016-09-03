var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectionString = 'postgress://michaellecke@localhost/sandbox';
var massiveInstance = massive.connectSync({connectionString: connectionString});
var config = require('./config.js');

var app = module.exports = express();
app.set('db', massiveInstance);

var friendsCtrl = require('./controllers/friendsCtrl.js');

app.use(express.static('../public'));
app.use(bodyParser.json());

app.post('/api/friends', friendsCtrl.createFriend);
app.get('/api/friends', friendsCtrl.readFriends);


app.listen(config.port, function() {
		console.log("listening on Port" + config.port);
});
