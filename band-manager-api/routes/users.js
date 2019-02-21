var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/band-manager-db');

// Get all users
router.get('/', function(req, res){
    var collection = db.get('User');
    collection.find({}, function(err,users){
        if (err) throw err;
        res.json(users);
    });
});

// Get one user
router.get('/:userName',function(req, res){
    var collection = db.get('User');
    collection.findOne({userName: req.params.userName}, function(err,user){
        if(err) throw err;
        res.json(user);
    });
});

// Add a user
router.post('/', function(req, res){
    var collection = db.get('User');

    collection.insert({
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        type: 'Regular'
    }, function(err, user){
        if(err) throw err;

        res.json(user);
    });
});

// Update type for user to 'Moderator'
router.post('/:userName/:type', function(req,res){
    var collection = db.get('User');
    
    collection.findOneAndUpdate({userName: req.params.userName}, {$set:{type: req.params.type}},
      function(err,newUser){
        res.json(newUser);
      })
    })

module.exports = router;