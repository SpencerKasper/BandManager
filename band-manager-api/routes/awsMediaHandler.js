var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var s3 = new aws.S3({accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'bandmanager-mediafiles',
        metadata: function (req, file, cb){
            cb(null, {fieldName: file.fieldname, contentType: "audio/mpreg"});
        },
        key: function(req, file, cb){
            cb(null, Date.now().toString());
        }
    })
})

router.post('/upload', upload.any(), function(req, res, next){
    res.send("Successfully uploaded " + req.files.length + " files!");
})

module.exports = router;
