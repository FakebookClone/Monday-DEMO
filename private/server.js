var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var connectionString = 'postgress://michaellecke@localhost/sandbox';
var massiveInstance = massive.connectSync({connectionString: connectionString});
var config = require('./config.js');

var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: config.aws.ACCESS_KEY,
  secretAccessKey: config.aws.SECRET_KEY,
  region: config.aws.REGION
})

var app = module.exports = express();
app.set('db', massiveInstance);

app.use(bodyParser.json({limit: '25mb'})); // default is 100KB;
app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));

const s3 = new AWS.S3();

var friendsCtrl = require('./controllers/friendsCtrl.js');

app.use(express.static('../public'));
app.use(bodyParser.json());

app.post('/api/friends', friendsCtrl.createFriend);
app.get('/api/friends', friendsCtrl.readFriends);
app.put('/api/friend/:personId', friendsCtrl.updateFriend);
app.delete('/api/friend/:personId', friendsCtrl.deleteFriend);

app.post('/api/pictureUpload', function(req, res, next) {
  console.log('hit post endpoint');
  const buf = new Buffer(req.body.file.imageBody.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  //replaces that bit with an empty string, and then tells it it's a base64 string


  //bucketName variable below creates a folder for each user
  const bucketName = 'bucket-fakebook/' + req.body.file.userEmail;
  const params = {
    Bucket: bucketName,
    Key: req.body.file.imageName,
    Body: buf,
    ContentType: 'image/' + req.body.file.imageExtension,
    ACL: 'public-read' //what privacy you want
  }

  s3.upload(params, function(err, data) {
    console.log('THIS IS AN ERROR', err, 'THIS IS THE DATA', data);
    if (err) return res.status(500).send(err);
    res.status(200).json(data); //save data to database?
  });

});


app.listen(config.port, function() {
		console.log("listening on Port" + config.port);
});
