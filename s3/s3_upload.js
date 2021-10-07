// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
var file = process.argv[3];
//this will change 
//bucket will be bucket name
//ask dan about the argv s 
//file should be the actual image itself req.file.buffer 


// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
//fs req.body.buffer
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
//this will be part of the files structore for the bucket /something
uploadParams.Key = path.basename(file);


// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
