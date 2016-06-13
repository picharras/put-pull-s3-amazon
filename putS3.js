var AWS = require('aws-sdk'),
  async = require('async'),
  fs = require('fs');

 var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'REGION'
 });

var localFolder = __dirname + '/my_files',
  s3Folder = 'my_files_s3';

fs.readdir(localFolder, function(error, files) {
  if(error) {
    console.log('Error:', error);
    return;
  }

  async.each(files, function(file, done) {
    var obj = {
      Bucket: 's3_bucket_fake',
      Key: s3Folder + '/' + file,
      Body: fs.createReadStream(localFolder + '/' + file)
    };
    s3.putObject(obj, function(s3Error, s3Object) {
      console.log('s3 error:', s3Error, '; s3 object:', s3Object);
      done(s3Error);
    }); 
  }, function(error) {
    console.log('Finished!', 'Error:',error);
  });
});
