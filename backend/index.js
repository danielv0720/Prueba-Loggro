const express = require("express");
const Jimp = require("jimp");
const fs = require("fs");
const AWS = require("aws-sdk");
const cors = require("cors");
const Images = require("./models/Images");
require("dotenv").config();
require("./data/database");
const moment = require('moment')

const port = 8000;
const bodyParser = require("body-parser");
const multer = require("multer");
const toColUTC = require("./utils/toCol");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const ID = "AKIAXBHP4UEJ3MYKBFWJ";
const SECRET = "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";

const BUCKET_NAME = "images-loggro";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/convert", multer().single("file"), (req, res) => {
  const file = req.file;
  Jimp.read(file.buffer, (error, file) => {
    if (error) {
      console.log(error.message);
    } else {
      const imageName = `image-converted-${Date.now()}.png`;
      const path = `images/${imageName}`;
      file.write(path, () => {
        const fileContent = fs.readFileSync(path);

        const params = {
          Bucket: BUCKET_NAME,
          Key: imageName,
          Body: fileContent,
        };

        s3.upload(params, async function (err, data) {
          if (err) {
            throw err;
          }
          console.log(`File uploaded successfully. ${data.Location}`);

          await Images.create({
            imageName,
            url: data.Location,
            date: toColUTC(moment(Date.now()).local().toDate()),
            time: new Date().getHours(),
            user: "Daniel Velez",
          });

          res.send("Guadado correctamente");
        });
      });
    }
  });
});

app.get("/findImages", async (req, res) => {
  const response = await Images.find({
    date: {
      $gte: new Date(req.query.date1 + "T00:00:00"),
      $lt: new Date(req.query.date2 + "T23:59:59"),
    },
  });
  res.json(response);
});

app.get("/groupByTime", async (req, res) => {
  const response = await Images.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(req.query.date1 + "T00:00:00"),
          $lt: new Date(req.query.date2 + "T23:59:59"),
        },
      },
    },
    { $group: { _id: "$time", total: { $sum: 1 } } },
  ]);
  res.json(response);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
