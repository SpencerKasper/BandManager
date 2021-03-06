var express = require('express');
var router = express.Router();
var monk = require('monk');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const {Readable} = require('stream');
const assert = require('assert');
const multer = require('multer');
const metadataDB = monk("localhost:27017/band-manager-metadata");
let db;

mongodb.MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    assert.ifError(err);

    db = client.db('band-manager-media');
});

// Stream a song
router.get('/:trackID/:bucketName', (req, res) => {
    try {
        var trackID = new ObjectID(req.params.trackID);
    } catch(err) {
        return res.status(400).json({message: JSON.stringify(err), error: err});
    }
    
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    
    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: req.params.bucketName
    });

    let downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });
})

router.get('/GetAllTracks', (req, res) => {
    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: "track"
    });

    const files = [];
    
    bucket.find().forEach(file => {
        files.push(file);
    }, () => {
        return res.status(201).json({ tracks: files});
    });
})

router.get('/:bucketName', (req, res) => {
    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: req.params.bucketName
    });

    const tracks = [];
    
    bucket.find().forEach(file => {
        tracks.push(file);
    }, () => {
        return res.status(201).json({ tracks: tracks});
    });
})

// Add a track to a band's database
router.post('/:name/:band', (req, res) => {
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});

    upload.single("track")(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Upload Request Validation Failed" });
      } else if(!req.params.name) {
        return res.status(400).json({ message: "No track name in request body" });
      }
      
      let trackName = req.params.name;
      
      // Covert buffer to Readable Stream
      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);
  
      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: req.params.band
      });
  
      let uploadStream = bucket.openUploadStream(trackName);
      let id = uploadStream.id;
      readableTrackStream.pipe(uploadStream);
  
      uploadStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
  
      uploadStream.on('finish', () => {  
        return res.status(201).json({trackID: id});
      });
    });
  });

module.exports = router;