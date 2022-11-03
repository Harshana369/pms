const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------ Get Overview HO, PAT, On Air Data to the front end overview table  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/AutomateVendorProjectsOverviewTable', async (req, res, next) => {

  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    return res.status(200).json({
      success: true,
      OverviewDataForFrontendOverviewTable: OverviewDataForFrontend(posts), // Handover, PAT pass, On air Details to the Front end overview table.
    });
  });
});

//---------------------------------------------------------------------------------------------------------------------------
//----------- Functions for Getting Overview Table data for the Vendor Overview Table  ---------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function OverviewDataForFrontend(posts) {
  var HandoverData = [];
  var PATData = [];
  var OnAirData = [];

  let overviewTableData = [];

  HandoverData = posts.filter((obj) => ((obj.HO_Date !== ''))).filter((obj) => ((
    obj.Site_Status !== 'Site Withdrawn' &&
    obj.Site_Status !== 'Tower Pending / Power Not Connected' &&
    obj.Site_Status !== 'Equipment Pending / Power Not Connected' &&
    obj.Site_Status !== 'Equipment Pending' &&
    obj.Site_Status !== 'Approval Pending' &&
    obj.Site_Status !== 'SAQ Clearance Pending' &&
    obj.Site_Status !== 'Supply Only'
  )));

  OnAirData = posts.filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date !== '')));

  PATData = posts.filter((obj) => ((obj.PAT_Status === 'Pass' || obj.PAT_Status === 'Pass with minor' || obj.PAT_Status === 'SAR Only'))).filter((obj) => ((obj.PAT_Pass_Date !== '')));

  overviewTableData.push( HandoverData, PATData, OnAirData );

  // console.log(overviewTableData);
  return overviewTableData;
}

//----------------------------------------------------------------------------------------------------------------------------
module.exports = router;
