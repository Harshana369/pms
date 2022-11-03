const mongoose = require('mongoose');

const vendorProjectsOverviewSchema = new mongoose.Schema({
    Project_ID:String,
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

module.exports = mongoose.model('VendorProjectsOverviewData',vendorProjectsOverviewSchema);
