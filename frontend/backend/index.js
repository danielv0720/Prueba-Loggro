const express = require("express");
const Jimp = require("jimp");
const fs = require('fs');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const port = 3000;

const ID = 'AKIAXBHP4UEJ3MYKBFWJ';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'images-loggro';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/convert", multer().single('file'), (req, res) => {
  const file = req.file;
  Jimp.read(file.buffer, (error, file) => {
    if (error) {
      console.log(error.message);
    } else {
      const imageName = `image-converted-${Date.now()}.png`
      const path = `images/${imageName}` 
      file.write(path, () => {
        // Read content from the file
        const fileContent = fs.readFileSync(path);
      
        // Setting up S3 upload parameters
        const params = {
            Bucket: BUCKET_NAME,
            Key: imageName, // File name you want to save as in S3
            Body: fileContent
        };
      
        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            res.send("Guadado correctamente")
        });
      });
    }
  });


});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
