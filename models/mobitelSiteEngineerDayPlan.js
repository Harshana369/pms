const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    SiteEngineer: String,
    planDate: String,
    sName: String,
    selectedScope: String,
    plannedWork: String,
    Site_Status: String,
    Result_Date: String,
    Comment: String,
  },
  { timestamps: true }
);

const DayPlan = mongoose.model("MobitelSiteEngineersDayPlan", dataSchema);

module.exports = DayPlan;
