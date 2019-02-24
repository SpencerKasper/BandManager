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

// Validate one user for login
router.get('/:userName/:password',function(req, res){
    var collection = db.get('User');
    collection.findOne({userName: req.params.userName}, function(err,user){
        if(err) throw err;

        if(user != null && user != undefined){
            if(user.password === req.params.password){
                var validUser = {
                    validUser: true,
                    userName: req.params.userName,
                    fullName: user.firstName + " " + user.lastName
                }
                res.json(validUser);
            } else {
                res.json(false);
            }
        } else {
            res.json(false);
        }
    });
});

// Add a user
router.post('/', function(req, res){
    var collection = db.get('User');

    collection.findOne({userName: req.body.userName}, function(err,user){
        if(err) throw err;

        if(user !== null && user.userName === req.body.userName){
            console.error("Error: Username already exists.");
            res.status(200).send({
                message: "Error: Username already exists."
            })
        } else if( user !== null && user.email === req.body.email){
            console.error("Error: Email already exists.");
            res.status(200).send({
                message: "Error: Email already exists."
            })
        }else {
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
        }
        
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