const cron = require("node-cron");
const fs = require("fs");

let MobitelData = require("../models/mobitelProjectsDatabase");
let VenderData = require("../models/vendorProjectsDatabase");

cron.schedule("0 */12 * * *", () => backupvender());
//every day -> 0 0 * * *
//every 12 hours -> 0 */12 * * *
// one minute -> * * * * *
// two minute -> */2 * * * *
function backupvender() {
  //Vender database json
  VenderData.find({}, function (err, data) {
    fs.writeFile("./vender.json", JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

cron.schedule("0 */12 * * *", () => backupmobitel());
function backupmobitel() {
  //Mobitel database json
  MobitelData.find({}, function (err, data) {
    fs.writeFile("./mobitel.json", JSON.stringify(data), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}
