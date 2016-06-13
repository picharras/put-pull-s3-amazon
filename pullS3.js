var AWS = require('aws-sdk'),
  async = require('async'),
  fs = require('fs');

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'REGION'
});

// Set localFolder and bucket
var localFolder = __dirname + '/files',
  bucket = 's3-bucket-fake',
  params = {
    Bucket: bucket,
    Prefix: 'my_folder/' //delimits the files name
  };

s3.listObjects(params, function(s3Error, s3Object) {
  if(s3Error) {
    console.log('Error:', s3Error);
    return;
  }
  async.each(s3Object.Contents, function(object, done) {
    var obj = {
      Bucket: bucket,
      Key: object.Key
    };
    var file = fs.createWriteStream(localFolder + '/' + object.Key.replace('/', '_'));
    s3.getObject(obj).createReadStream().pipe(file);
    done();
  }, function(error) {
    console.log('Finished!', 'Error:', error);
  });
});
