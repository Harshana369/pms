const mongoose = require('mongoose');

const mobitelProjectsOverviewSchema = new mongoose.Schema({
    Database:String,
    ProjectName:String,
    Vendor:String,
    StartDate:String,
    EndDate:String,
    Budget:String,
    ProjectScope:Number,
    HandoverScope:String,
    OnHoldSites:String,
    PATPass:String,
    Completed:String,
    Remaining:String,
    Progress:String
});

module.exports = mongoose.model('MobitelProjectsOverviewData',mobitelProjectsOverviewSchema);
