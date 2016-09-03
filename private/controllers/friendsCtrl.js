var app = require('../server.js');
var db = app.get('db');

module.exports = {
  createFriend: function(req, res, next) {
    db.createFriend(req.body.first_name, req.body.last_name, function(err, r){
      db.readFriends(function(err, r) {
        res.json(r);
      })
    });
  },
  readFriends: function(req, res) {
    db.readFriends(function(err, r) {
      res.json(r);
    })
  }
}
