const cron = require("node-cron");
const moment = require("moment");
const fs = require("fs");
var csvjson = require("csvjson");

cron.schedule("0 0 * * *", () => mobitelCsvbackup());

function mobitelCsvbackup() {
  //Mobitel database csv
  fs.readFile("./mobitel.json", "utf-8", (err, fileContent) => {
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

cron.schedule("0 0 * * *", () => venderCsvbackup());

function venderCsvbackup() {
  //Vender database csv
  fs.readFile("./vender.json", "utf-8", (err, fileContent) => {
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
