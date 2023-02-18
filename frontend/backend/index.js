const express = require("express");
const Jimp = require("jimp");
const fs = require('fs');
const AWS = require('aws-sdk');

const app = express();
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

app.get("/convert", (req, res) => {
  Jimp.read("image1.jpg", (error, file) => {
    if (error) {
      console.log(error.message);
    } else {
      file.write("images/new-image.png", () => {
        // Read content from the file
        const fileContent = fs.readFileSync("images/new-image.png");
      
        // Setting up S3 upload parameters
        const params = {
            Bucket: BUCKET_NAME,
            Key: 'new-image.png', // File name you want to save as in S3
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
