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
    const returnItem = {
        valid: false,
        errorMessages: [],
        band: {}
    };

    // Validation
    if(req.body.bandName === "" || req.body.bandName === undefined || req.body.bandName === null){
        returnItem.valid = false;
        returnItem.errorMessages.push("Band name is a required field.");
    }

    if(req.body.bandOwnerID === "" || req.body.bandOwnerID === undefined || req.body.bandOwnerID === null){
        returnItem.valid = false;
        returnItem.errorMessages.push("Band ownderID is a required field.");
    }

    if(returnItem.errorMessages.length > 0){
        res.status(400).send({
            returnItem
        })

        return;
    }
    
    collection.findOne({bandName: req.body.bandName}, function(err,band){
        if(err) throw err;
        
        if(band != null && band.bandName === req.body.bandName){
            returnItem.errorMessages.push("Error: Band with that name already exists.");
            returnItem.valid = false;
            returnItem.band = null;

            console.error("Error: Band with that name already exists.");
            console.log(returnItem);
            res.status(400).send({
                returnItem
            })

            return;
        } else {
            collection.insert({
                bandName: req.body.bandName,
                bandOwnerID: req.body.bandOwnerID,
                bandMemberEmailAddresses: req.body.bandMemberEmails
            }, function(err, band){
                if(err){
                    returnItem.valid = false;
                    returnItem.errorMessage = err.message;
                    
                    res.json(returnItem);
                    return;
                }

                returnItem.valid = true;
                returnItem.errorMessage = "";
                returnItem.band = band;
        
                res.json(returnItem);
                return;
            });
        }
        
    });
});

module.exports = router;