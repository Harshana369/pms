//const moment = require("moment");
const cron1 = require("node-cron");
//const cron2 = require("node-cron");
const fs = require("fs");
const fork1 = require("child_process");
const fork2 = require("child_process");

let MobitelData = require("../models/mobitelProjectsDatabase");
let VenderData = require("../models/vendorProjectsDatabase");

// const Db = require("../routes/DatabaseBlackup");

// cron1.schedule("* * * * *", () => Test());

// function Test() {
//   console.log("Test");
//   //   cron.schedule("*/1 * * * *", () => Test2());
// }

// cron1.schedule("*/1 * * * *", async () => {
//   //Mobitel database json
//   MobitelData.find({}, function (err, data) {
//     console.log("run mobitel json");
//     fs.writeFile("./mobitel.json", JSON.stringify(data), (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });
// });

// cron2.schedule("*/2 * * * *", async () => {
//   //Vender database json
//   VenderData.find({}, function (err, data) {
//     console.log("run vender json");
//     fs.writeFile("./vender.json", JSON.stringify(data), (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });
// });

// function Test() {
//   //Mobitel database json
//   MobitelData.find({}, function (err, data) {
//     console.log("run mobitel json");
//     fs.writeFile("./mobitel.json", JSON.stringify(data), (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   });

//   cron2.schedule("*/1 * * * *", () => Vb());
// }

// function Vb() {
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

cron1.schedule("*/1 * * * *", () => backupMongoDB());

function backupMongoDB() {
  fork1(
    VenderData.find({}, function (err, data) {
      console.log("run vender json");
      fs.writeFile("./vender.json", JSON.stringify(data), (err) => {
        if (err) {
          console.log(err);
        }
      });
    })
  ),
    fork2(
      //Mobitel database json
      MobitelData.find({}, function (err, data) {
        console.log("run mobitel json");
        fs.writeFile("./mobitel.json", JSON.stringify(data), (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
    );
}
