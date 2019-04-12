var express = require('express');
var router = express.Router();
var monk = require('monk');
const mongodb = require('mongodb');
const metadataDB = monk("localhost:27017/band-manager-metadata");

// Save meta data and connect it with the trackID
router.post('/:trackID', (req, res) => {
    var collection = metadataDB.get(String(req.body.bandName));

    collection.insert({
        trackID: req.params.trackID,
        songName: req.body.songName,
        bandName: req.body.bandName,
        genre: req.body.genre
    }, function(err, track){
        if(err) throw err;
    
        res.json(track);
    });
})

// Get all tracks for a band
router.get('/:bandName',function(req, res){
    var collection = metadataDB.get(String(req.params.bandName));

    collection.find({bandName: req.params.bandName}, function(err,tracks){
        if(err) throw err;
        res.json(tracks);
    });
});

module.exports = router;