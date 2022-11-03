const router = require("express").Router();
const Sites = require("../models/sites");

//get sites ---------------------------------------------------------------------------------------------------

router.get('/sites', (req, res) => {
  Sites.find().exec((err, sites) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
   
    return res.status(200).json({
      success: true,
      MobiAug: [50, 78, 90, 56, 45, 76, 98, 37, 87, 98, 76], // sample data sent from backend to front end as MobiAug

      MobilizedAllSites: getmobilizeData(sites),  // Graph data of number of sites Mobilized in each month sending to front end Appwebsitevisits
      InstalledAllSites: getinstalledData(sites), //Installed data sending to front end
      CommissionedAllSites: getcommissionedData(sites), // commisoned data sending to front end
    });
  });
});

// -------------------------------Mobilzed Data------------------------------------

function getmobilizeData(sites) {
  var mobilizeData = []
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  

  for (var i = 0; i < 12; i++) {

      mobilizeData[i] = sites.filter((obj) => (obj["Mobilized"] === month[i])).length
    }
    /*console.log(mobilizeData); */
    // ------------------------------------------------------------------------------------------
    let myarray = mobilizeData, cumilative = [];

    for (let i = 0, s = myarray[0]; i < myarray.length; i++, s += myarray[i]) cumilative.push(s);

    /* console.log(cumilative); */
    
  return cumilative; 
}

// --------------------------------------------------------------------------------------------------

// ---------------------------------------- Installed Data ------------------------------------------

function getinstalledData(sites) {
  var installedData = []
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];  

  for (var i = 0; i < 12; i++) {

    installedData[i] = sites.filter((obj) => (obj["Installed"] === month[i])).length
    }
    /* console.log(installedData); */
    // ---------------------------------------------------------------------------------
    let myarray = installedData, cumilative = [];

    for (let i = 0, s = myarray[0]; i < myarray.length; i++, s += myarray[i]) cumilative.push(s);

    /* console.log(cumilative); */
    
  return cumilative;
}
// ------------------------------------- Commissioned Data -----------------------------------------------
// -------------------------------------------------------------------------------------------------------
function getcommissionedData(sites) {
  var commissionedData = [];
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (var i = 0; i < 12; i++) {
    commissionedData[i] = sites.filter((obj) => (obj.Commissioned_date.split('-')[1] === month[i])).length
    }
    console.log(commissionedData);
    // ---------------------------------------------------------------------------------
    let myarray = commissionedData, cumilative = [];

    for (let i = 0, s = myarray[0]; i < myarray.length; i++, s += myarray[i]) cumilative.push(s);

    console.log(cumilative);
    
  return cumilative; 
}

module.exports = router;
