var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/band-manager-db');

// Get all bands
router.get('/', function(req, res){
    var collection = db.get('Bands');
    collection.find({}, function(err,bands){
        if (err) throw err;
        res.json(bands);
    });
});

// Get one band
router.get('/:bandName/:userName',function(req, res){
    var collection = db.get('User');
    collection.findOne({userName: req.params.userName}, function(err,user){
        if(err) throw err;
        res.json(user);
    });
});

// Add a band
router.post('/', function(req, res){
    var collection = db.get('Bands');

    collection.findOne({bandName: req.body.band.bandName}, function(err,band){
        if(err) throw err;

        if(band !== null && band.bandName === req.body.band.bandName){
            console.error("Error: Band with that name already exists.");
            res.status(200).send({
                message: "Error: Band with that name already exists."
            })
        } else {
            collection.insert({
                bandName: req.body.band.bandName,
                bandOwner: req.body.band.bandOwner,
                members: req.body.band.members
            }, function(err, band){
                if(err) throw err;
        
                res.json(band);
            });
        }
        
    });
});

module.exports = router;