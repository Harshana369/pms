const router = require("express").Router();
const moment = require("moment");
var csvjson = require("csvjson");
const fs = require("fs");

const VenderData = require("../models/vendorProjectsDatabase");

router.get("/json", async (req, res, next) => {
  try {
    //Vender database json
    VenderData.find({}, function (err, data) {
      console.log("run vender json");
      fs.writeFile("./vender.json", JSON.stringify(data), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    // venderCsv();

    return res.status(200).json({
      success: "vender backup Successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

function venderCsv() {
  //Vender database csv
  fs.readFile("./vender.json", "utf-8", (err, fileContent) => {
    console.log("run vender csv");

    if (err) {
      console.log(err);
    }
    const csvData = csvjson.toCSV(fileContent, {
      headers: "key",
    });

    const date = moment().format("Y-M-D");

    fs.writeFileSync(`${date}-VenderDatabase.csv`, csvData, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

module.exports = router;
