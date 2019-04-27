var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/band-manager-db');

// Get all events
router.get('/', function(req, res){
    var collection = db.get('Events');

    collection.find({}, function(err,events){
        if (err) throw err;

        res.json(events);
    });
});

// Get all events for a given user
router.get('/:userID', function(req, res){
    var collection = db.get('Events');

    collection.find({userID: req.params.userID}, function(err, events){
        if(err) throw err;

        res.json(events);
    })
})

//Add an event
router.post('/', function(req, res){
    var collection = db.get('Events');
    var returnItem = {};

    collection.insert({
        title: req.body.title,
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        userID: req.body.userID,
        eventType: req.body.eventType
    }, function(err, event){
        if(err){
            returnItem.valid = false;
            returnItem.message = err.message;
        } else{
            returnItem.valid = true;
            returnItem.errorMessage = "";
            returnItem.event = event;
        }

        res.json(returnItem);
    });
});

module.exports = router;