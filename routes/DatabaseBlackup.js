//const cron = require("node-cron");
const moment = require("moment");
var csvjson = require("csvjson");
const fs = require("fs");

let MobitelData = require("../models/mobitelProjectsDatabase");

const VenderData = require("../models/vendorProjectsDatabase");

// cron.schedule("*/1 * * * *", () => backupvender());
// //every day -> 0 0 * * *
// //every 12 hours -> 0 */12 * * *
// // one minute -> * * * * *
// // two minute -> */2 * * * *
// function backupvender() {
//   //Vender database json
//   VenderData.find({}, function (err, data) {
//     console.log("run vender json");
//     fs.writeFile("./vender.json", JSON.stringify(data), (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });
// }

// cron.schedule("* * * * *", () => backupmobitel());
// function backupmobitel() {
//   //Mobitel database json
//   MobitelData.find({}, function (err, data) {
//     console.log("run mobitel json");
//     fs.writeFile("./mobitel.json", JSON.stringify(data), (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });

// }

// cron.schedule("*/2 * * * *", () => mobitelCsvbackup());

// function mobitelCsvbackup() {
//   //Mobitel database csv
//   fs.readFile("./mobitel.json", "utf-8", (err, fileContent) => {
//     console.log("run mobitel csv");

//     if (err) {
//       console.log(err);
//     }
//     const csvData = csvjson.toCSV(fileContent, {
//       headers: "key",
//     });

//     const date = moment().format("Y-M-D");

//     fs.writeFileSync(`${date}-MobitelDatabase.csv`, csvData, (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });
// }

// cron.schedule("*/8 * * * *", () => venderCsvbackup());

// function venderCsvbackup() {
//   //Vender database csv
//   fs.readFile("./vender.json", "utf-8", (err, fileContent) => {
//     console.log("run vender csv");

//     if (err) {
//       console.log(err);
//     }
//     const csvData = csvjson.toCSV(fileContent, {
//       headers: "key",
//     });

//     const date = moment().format("Y-M-D");

//     fs.writeFileSync(`${date}-VenderDatabase.csv`, csvData, (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });
// }

// cron.schedule("* * * * *", () => backupData());

//Vender database json

VenderData.find({}, function (err, data) {
  console.log("run vender json");
  fs.writeFile("./vender.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
});
//Mobitel database json
MobitelData.find({}, function (err, data) {
  console.log("run mobitel json");
  fs.writeFile("./mobitel.json", JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

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
