const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get sites data to the graphs  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesChartDataColumnChartData', async (req, res, next) => {
  // console.log(req.query);

  let reqQuery = [];
  if (req.query.Project === 'All Vendor Projects') {
    reqQuery = {};
  } else if (req.query.Project === 'All Huawei Projects') {
    reqQuery = { Implementation_By: "Huawei" };
  } else if (req.query.Project === 'All ZTE Projects') {
    reqQuery = { Implementation_By: "ZTE" };
  } else {
    reqQuery = { ...req.query };
  }

  // console.log(reqQuery);
  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr)).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    return res.status(200).json({
      success: true,
      existingPosts: posts,
      chartDataForFrontEnd: getchartData(posts),  // Graph data of number of sites Mobilized in each month sending to front end Appwebsitevisits.
      XaxisDataForTheGraphs: getXaxisData(), // x axis data labels array sending to the Column graghs front end.
    });
  });
});

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for X Axis Labels to the Front End of Vendor Project Databases ---------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getXaxisData() {

  var theMonths = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
  var now = new Date();

  for (var i = 0; i < 11; i++) {
    var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
    var month = theMonths[future.getMonth()];
    var year = future.getFullYear();
    var monthsArray = [];
  }

  for (var i = 0; i < 11; i++) {
    monthsArray.push(theMonths[now.getMonth()] + '/01/' + now.getFullYear().toString());
    now.setMonth(now.getMonth() - 1);
    // console.log(monthsArray);
  }
  // console.log(monthsArray);

  var nextMonth = (new Date(now.setMonth(now.getMonth() + 1)));
  var nextMm = ('0' + (nextMonth.getMonth())).slice(-2);
  var nextMy = (nextMonth.getFullYear() + 1);
  var nextMonthDate = ((nextMm) + '/01/' + (nextMy));

  // console.log(monthsArray);

  monthsArray.unshift(nextMonthDate);
  // console.log(monthsArray);

  monthsArray.reverse();
  // console.log(monthsArray);

  var XaxisMonths = monthsArray;

  // console.log(XaxisMonths);
  return XaxisMonths;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Functions for Getting Graph Data to the Front End of Mobitel Project Databases ----------------------
//---------------------------------------------------------------------------------------------------------------------------

function getchartData(posts) {
  var mobilizeData = [];
  var installedData = [];
  var commissioned = [];
  var sarData = [];
  var patData = [];
  var onairData = [];

  var theMonths = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
  var now = new Date();

  for (var i = 0; i < 12; i++) {

      var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
      var month = theMonths[future.getMonth()];
      var year = future.getFullYear();
      var monthsArrayReversed = [];
      var monthsCountFrom2015 =  (year-2014)*12;

      for (var i = 0; i < monthsCountFrom2015 ; i++) {
          monthsArrayReversed.push(now.getFullYear().toString() + '-' + theMonths[now.getMonth()]);
          now.setMonth(now.getMonth() - 1);
      }
      monthsArrayReversed.reverse();
  }

  let monthsArray = monthsArrayReversed;
  // console.log(monthsArrayReversed);
  // monthsArray = ['2021-02', '2021-03','2021-04', '2021-05','2021-06', '2021-07','2021-08', '2021-09','2021-10', '2021-11','2021-12', '2022-01']

  for (var i = 0; i < monthsCountFrom2015; i++) {
      mobilizeData[i] = posts.filter((obj) => ((obj.Mobilization_Status === 'Completed'))).filter((obj) => ((obj.Mobilized_Date.slice(0, 7)) === monthsArray[i])).length,
      installedData[i] = posts.filter((obj) => ((obj.Installation_Status === 'Completed'))).filter((obj) => ((obj.Installation_Date.slice(0, 7)) === monthsArray[i])).length,
      commissioned[i] = posts.filter((obj) => ((obj.Commissioning_Status === 'Completed'))).filter((obj) => ((obj.Commisioned_Date.slice(0, 7)) === monthsArray[i])).length,
      sarData[i] = posts.filter((obj) => ((obj.SAR_Status === 'Approved' || obj.SAR_Status === 'PAT Only'))).filter((obj) => ((obj.SAR_Date.slice(0, 7)) === monthsArray[i])).length,
      patData[i] = posts.filter((obj) => ((obj.PAT_Status === 'Pass' || obj.PAT_Status === 'Pass with minor' || obj.PAT_Status === 'SAR Only'))).filter((obj) => ((obj.PAT_Pass_Date.slice(0, 7)) === monthsArray[i])).length,
      onairData[i] = posts.filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date.slice(0, 7)) === monthsArray[i])).length
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------

  //console.log(onairData);

  let myarray1 = mobilizeData, cumilative1 = [];
  let myarray2 = installedData, cumilative2 = [];
  let myarray3 = commissioned, cumilative3 = [];
  let myarray4 = sarData, cumilative4 = [];
  let myarray5 = patData, cumilative5 = [];
  let myarray6 = onairData, cumilative6 = [];

  for (let i = 0, s = myarray1[0]; i < myarray1.length; i++, s += myarray1[i]) cumilative1.push(s);
  for (let i = 0, s = myarray2[0]; i < myarray2.length; i++, s += myarray2[i]) cumilative2.push(s);
  for (let i = 0, s = myarray3[0]; i < myarray3.length; i++, s += myarray3[i]) cumilative3.push(s);
  for (let i = 0, s = myarray4[0]; i < myarray4.length; i++, s += myarray4[i]) cumilative4.push(s);
  for (let i = 0, s = myarray5[0]; i < myarray5.length; i++, s += myarray5[i]) cumilative5.push(s);
  for (let i = 0, s = myarray6[0]; i < myarray6.length; i++, s += myarray6[i]) cumilative6.push(s);

  let chartData = [];
  let LastYearCum6 = cumilative6.slice(cumilative6.length-13, cumilative6.length-1); // On air
  let LastYearCum5 = cumilative5.slice(cumilative5.length-13, cumilative5.length-1);;
  let LastYearCum4 = cumilative4.slice(cumilative4.length-13, cumilative4.length-1);;
  let LastYearCum3 = cumilative3.slice(cumilative3.length-13, cumilative3.length-1);;
  let LastYearCum2 = cumilative2.slice(cumilative2.length-13, cumilative2.length-1);;
  let LastYearCum1 = cumilative1.slice(cumilative1.length-13, cumilative1.length-1);; // Mobilized

  chartData.push(LastYearCum6, LastYearCum5, LastYearCum4, LastYearCum3, LastYearCum2, LastYearCum1);

  // console.log(cumilative4);
  return chartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;
