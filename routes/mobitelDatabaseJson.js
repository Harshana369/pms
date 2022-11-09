const router = require("express").Router();
const moment = require("moment");
var csvjson = require("csvjson");
const fs = require("fs");

let MobitelData = require("../models/mobitelProjectsDatabase");

router.get("/json", async (req, res, next) => {
  //Mobitel database json
  MobitelData.find({}, function (err, data) {
    console.log("run mobitel json");
    fs.writeFile("./mobitel.json", JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  // mobitelCsv();

  return res.status(200).json({
    success: "mobitel backup Successfully",
  });
});

function mobitelCsv() {
  //Mobitel database csv
  fs.readFile("./mobitel.json", "utf-8", (err, fileContent) => {
    console.log("run mobitel csv");

    if (err) {
      console.log(err);
    }
    const csvData = csvjson.toCSV(fileContent, {
      headers: "key",
    });

    const date = moment().format("Y-M-D");

    fs.writeFileSync(`${date}-MobitelDatabase.csv`, csvData, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

module.exports = router;
