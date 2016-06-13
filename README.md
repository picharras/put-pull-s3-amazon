# put-pull-s3-amazon
Simple node script for upload and download files to amazon

- Clone this repo
  ```
    git clone https://github.com/picharras/put-pull-s3-amazon.git
  ```

- Go to project folder
  ```
    cd put-pull-s3-amazon
  ```

- Edit 'localFolder', 's3Folder' and 'Bucket' in putS3.js file
- Edit 'localFolder', 'bucket' and 'params.Prefix' in pullS3.js file

- Install dependences:
  ```
    npm install
  ```

- Run script:
  ```
    node putS3.js
  ```
  or
  ```
    node pullS3.js
  ```

- Enjoy!
