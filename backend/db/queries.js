const db = require("./index");
const AWS = require("aws-sdk");
const dotenv = require('dotenv');

dotenv.load();

// const authHelpers = require("../auth/helpers");
// const passport = require("../auth/local");

const awsKeys = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
  };
  
  var s3 = new AWS.S3(awsKeys);

function getAllInstruments(req, res, next) {
    db
      .any(
        `SELECT *
            FROM instrumentLibrary;`
      )
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        res.json(error);
      });
  }


function addInstrument(req, res, next) {
    return db
      .none(
        "INSERT INTO instrumentLibrary (instrument) VALUES (${instrument})",
        {
          instrument: req.body.instrument
        }
      )
      .then(data => {
        res.json("success");
      })
      .catch(error => {
        res.json(error);
      });
  }

module.exports = {
    addInstrument,
    getAllInstruments
  }