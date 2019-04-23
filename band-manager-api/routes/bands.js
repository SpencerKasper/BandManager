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

// Get all bands owned by a given user
router.get('/:userID',function(req, res){
    var collection = db.get('Bands');

    collection.find({bandOwnerID: req.params.userID}, function(err,bands){
        if(err) throw err;
        res.json(bands);
    });
});

// Add a band
router.post('/', function(req, res){
    var collection = db.get('Bands');
    
    collection.findOne({bandName: req.body.bandName}, function(err,band){
        if(err) throw err;
        
        const returnItem = {};
        
        if(band != null && band.bandName === req.body.bandName){
            returnItem.errorMessage = "Error: Band with that name already exists.";
            returnItem.valid = false;
            returnItem.band = null;

            console.error("Error: Band with that name already exists.");
            console.log(returnItem);
            res.status(200).send({
                returnItem
            })
        } else {
            collection.insert({
                bandName: req.body.bandName,
                bandOwnerID: req.body.bandOwnerID,
                bandMemberEmailAddresses: req.body.bandMemberEmails
            }, function(err, band){
                if(err) throw err;

                returnItem.valid = true;
                returnItem.errorMessage = "";
                returnItem.band = band;
        
                res.json(returnItem);
            });
        }
        
    });
});

module.exports = router;