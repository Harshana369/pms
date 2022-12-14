const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    Plan_Data: String,
    Site_ID: String,
    Scope: String,
    Planned_Work: String,
    Site_Status: String,
  },
  { timestamps: true }
);

const DayPlan = mongoose.model("MobitelSiteEngineersDayPlan", dataSchema);

module.exports = DayPlan;
