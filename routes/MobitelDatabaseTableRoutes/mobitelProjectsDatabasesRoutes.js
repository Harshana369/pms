const router = require("express").Router();
const Posts = require("../../models/mobitelProjectsDatabase");

// ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/mobitelProjectsDatabases/save", (req, res) => {
  let newPost = new Posts(req.body);

  newPost.save((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Project Details Added Successfully",
    });
  });
});

// ------------------------ Getting specific site data  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.route("/mobitelProjectsDatabases/:id").get(async (req, res) => {
  let postId = req.params.id;

  await Posts.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
});

// ---------------------- Get sites data to the graphs  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/mobitelProjectsDatabases", async (req, res, next) => {
  // console.log(req.query.Project);

  let reqQuery = [];
  if (req.query.Project === "All Mobitel Projects") {
    reqQuery = {};
  } else {
    reqQuery = { ...req.query };
  }

  // console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr)).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: true,
      existingPosts: posts,
      getDateFormatToDatabaseTable: getDateFormat(posts),
      // chartDataForFrontEnd: getchartData(posts),  // Graph data of number of sites Mobilized in each month sending to front end Appwebsitevisits.
      chartDataArraysForFrontEndDashboard: getchartDataForDashboard(posts), // Chart data arrays for the front end dahsboard app graphs

      // XaxisDataForTheGraphs: getXaxisData(), // x axis data labels array sending to the Column graghs front end.
      SevenDaysOfWeek: getSevenDaysOfWeek(), // 7 Days of Week going to front end weekly progress column graph.

      mobitelProjectsOverviewData: getOvervieTableData(posts), // Getting overview data of HO scope, PAT pass scope and completed scope to the mobitel projects overview table

      mobitelProjectsAllMilestoneData:
        getMobitelProjectsAllMilestoneData(posts),

      //ScopeDataToSquares: getScopeData(posts), // Geting Scope Data for the front end Mobitel Projects Insights Scope Squares.
      HandOverDataToSquares: getHandOverData(posts), // getting HO data to the Front End Mobitel Projects Insights Handover Squares.
      PatDataForFrontEnd: getPatPassData(posts), // getting PAT Pass data to the Front End Mobitel Projects Insights PAT Pass Squares.
      OnAirDataForFrontEnd: getOnAirData(posts), // getting On Air data to the Front End Mobitel Projects Insights ON Air Squares.
      HoldSitesDataforSquares: getHoldSitesData(posts), // On Hold Sites data to the Front end Mobitel Projects Insights Squares.
      WidthdrawnDataforSquares: getWidthdrawnSites(posts), // On Hold Sites data (number of widthdrawn sites) to the frot end mobitel projects engineers wise analysis.

      ProjectCompletionForFrontEnd: getProjectCompletionData(posts), // Data for Front end Mobitel Projects Insights project Completion Donut Graph.
      sitesOnAirDataForFrontEnd: getSitesOnAirData(posts), // Data for Front end Mobitel Projects Insights Sites On Air Donut Graph.
      patCompletionDataForFrontEnd: getPATCompletionData(posts), // Data for Front end Mobitel Projects Insights PAT Completion Donut Graph.
      sarDataForFrontEnd: getSARData(posts), // Data for Front end Mobitel Projects Insights SAR Donut Graph.
      commissioningDataForFrontEnd: getCommissioningData(posts), // Data for Front end Mobitel Projects Insights Commissioning Donut Graph.
      installationDataForFrontEnd: getInstallationData(posts), // Data for Front end Mobitel Projects Insights Installation Donut Graph.
      mobilizeDataforFrontEnd: getMobilizedData(posts), // Data for Front end Mobitel Projects Insights Mobilization Donut Graph.
      weeklyProgressDataForFrontEnd: getWeeklyProgressData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph.
      WeeklyProgressOnAirSitesData: getWeeklyProgressOnAirSitesData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph Tool tip.

      mobitelProjectsTSSRMilestoneData:
        getMobitelProjectsTSSRMilestoneData(posts), // Tssr data for mobitel milestone graphs in the front end
      mobitelProjectsPOMilestoneData: getMobitelProjectsPOMilestoneData(posts), // PO data for mobitel milestone graphs in the front end
      mobitelProjectsLogisticsMilestoneData:
        getMobitelProjectsLogisticsMilestoneData(posts), // Logistics data for mobitel milestone graphs in the front end
      mobitelProjectsDependancyMilestoneData:
        getMobitelProjectsDependancyMilestoneData(posts), // Dependancy data for mobitel milestone graphs in the front end
      mobitelProjectsImplemenationMilestoneData:
        getMobitelProjectsImplemenationMilestoneData(posts), // Implemenation data for mobitel milestone graphs in the front end
      mobitelProjectsCapitalizationMilestoneData:
        getMobitelProjectsCapitalizationMilestoneData(posts), // Capitalization data for mobitel milestone graphs in the front end
    });
  });
});

// ------------------ Update site data in the database  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.route("/DatabasesMobitelProjects/Edit/:id").put(async (req, res) => {
  let postID = req.params.id;
  const {
    Planning_ID,
    Implementation_By,
    Project,
    Site_ID,
    Site_Name,
    HO_Date,
    HO_Modification,
    HO_Modified_Date,
    Scope,
    New_RAT,
    New_Sector,
    Approval_Status,
    Approval_Ref,
    IMP_Scenario,
    blank1,
    blank2,
    blank3,
    Tilt,
    Azimuth,
    Antenna_Height,
    New_RRU_Type,
    RRU_From,
    New_BTS_Type,
    BTS_From,
    New_Antenna_Type,
    Antenna_From,
    Cards_Type_n_From,
    Battery_count_n_From,
    Mobitel_Region,
    Planning_Engineer,
    On_Air_Target,
    Planning_Comments,
    Site_Engineer,
    Assigned_Date,
    Special_Tag,
    Coordinator_Comments,
    Sub_Contractor,
    Sub_Contractor_Remarks,
    Site_Status,
    Dependency,
    Responsible,
    Dependencies_On_Air_Target,
    Civil_PAT_Date,
    SAQ_Clearance_Date,
    TSSR_Referance,
    TSSR_Submitted_Date,
    TSSR_Approved_Date,
    Supply_BOQ_Submitted,
    Supply_BOQ_Approved,
    Approval_Received_Date,
    MCW_Requested_Date,
    MCW_Completed_Date,
    Supply_PR_Submitted,
    Supply_PR_Status,
    Supply_PR_Approved_Date,
    Supply_PR_Number,
    Supply_PR_Raise,
    Supply_PO_Number,
    Supply_PO_Issued,
    IMP_PR_Submitted,
    IMP_PR_Approved_Date,
    IMP_PR_Number,
    IMP_PR_Raised,
    IMP_PO_Number,
    IMP_PO_Issued,
    AWR_1,
    AWR_2,
    AWR_3,
    PI_Number,
    PI_Submitted,
    PI_Approved_ENG,
    TRC_Approved,
    BOI_Approved,
    ICL_Approved,
    Payment_Method,
    Payment_Confirmed,
    ETA,
    Received_To_Port,
    Port_Clearance,
    Logistics_Remarks,
    Mobilization_Status,
    Mobilized_Date,
    Installation_Status,
    Installation_Date,
    Power_Connected_Date,
    TX_Connected_Date,
    Commissioning_Status,
    Commisioned_Date,
    SAR_Reference,
    SAR_Status,
    SAR_Date,
    PAT_Reference,
    PAT_Status,
    PAT_Submitted,
    PAT_Pass_Date,
    Check_List_Submitted,
    Check_List_Verified,
    On_Air_Status,
    On_Air_Date,
    Material_Reconciled,
    Balance_Material_Returned_Date,
    COW_Number,
    COW_Submitted,
    COW_Approved,
    CPL_Number,
    CPL_Submitted,
    CPL_Approved,
    PAC_Invoice_Number,
    PAC_Invoice_Submitted,
    PAC_Invoice_Approved,
    FAC_Number,
    FAC_Submitted,
    FAC_Approved,
    PO_Status,
    PO_Closed_Date,
    Capitalization_Status,
    Capitalized_Date,
    Finance_Remarks,
    currentUser,
    Handover_Status,
    Work_Allocation_Status,
    Sub_Contractor_Status,
    Dependencies_Status,
    PR_PO_Progress_Status,
    Logistics_Status,
    Implementation_Status,
    Acceptance_Status,
    Payment_Status,
  } = req.body;

  const updatePost = {
    Planning_ID,
    Implementation_By,
    Project,
    Site_ID,
    Site_Name,
    HO_Date,
    HO_Modification,
    HO_Modified_Date,
    Scope,
    New_RAT,
    New_Sector,
    Approval_Status,
    Approval_Ref,
    IMP_Scenario,
    blank1,
    blank2,
    blank3,
    Tilt,
    Azimuth,
    Antenna_Height,
    New_RRU_Type,
    RRU_From,
    New_BTS_Type,
    BTS_From,
    New_Antenna_Type,
    Antenna_From,
    Cards_Type_n_From,
    Battery_count_n_From,
    Mobitel_Region,
    Planning_Engineer,
    On_Air_Target,
    Planning_Comments,
    Site_Engineer,
    Assigned_Date,
    Special_Tag,
    Coordinator_Comments,
    Sub_Contractor,
    Sub_Contractor_Remarks,
    Site_Status,
    Dependency,
    Responsible,
    Dependencies_On_Air_Target,
    Civil_PAT_Date,
    SAQ_Clearance_Date,
    TSSR_Referance,
    TSSR_Submitted_Date,
    TSSR_Approved_Date,
    Supply_BOQ_Submitted,
    Supply_BOQ_Approved,
    Approval_Received_Date,
    MCW_Requested_Date,
    MCW_Completed_Date,
    Supply_PR_Submitted,
    Supply_PR_Status,
    Supply_PR_Approved_Date,
    Supply_PR_Number,
    Supply_PR_Raise,
    Supply_PO_Number,
    Supply_PO_Issued,
    IMP_PR_Submitted,
    IMP_PR_Approved_Date,
    IMP_PR_Number,
    IMP_PR_Raised,
    IMP_PO_Number,
    IMP_PO_Issued,
    AWR_1,
    AWR_2,
    AWR_3,
    PI_Number,
    PI_Submitted,
    PI_Approved_ENG,
    TRC_Approved,
    BOI_Approved,
    ICL_Approved,
    Payment_Method,
    Payment_Confirmed,
    ETA,
    Received_To_Port,
    Port_Clearance,
    Logistics_Remarks,
    Mobilization_Status,
    Mobilized_Date,
    Installation_Status,
    Installation_Date,
    Power_Connected_Date,
    TX_Connected_Date,
    Commissioning_Status,
    Commisioned_Date,
    SAR_Reference,
    SAR_Status,
    SAR_Date,
    PAT_Reference,
    PAT_Status,
    PAT_Submitted,
    PAT_Pass_Date,
    Check_List_Submitted,
    Check_List_Verified,
    On_Air_Status,
    On_Air_Date,
    Material_Reconciled,
    Balance_Material_Returned_Date,
    COW_Number,
    COW_Submitted,
    COW_Approved,
    CPL_Number,
    CPL_Submitted,
    CPL_Approved,
    PAC_Invoice_Number,
    PAC_Invoice_Submitted,
    PAC_Invoice_Approved,
    FAC_Number,
    FAC_Submitted,
    FAC_Approved,
    PO_Status,
    PO_Closed_Date,
    Capitalization_Status,
    Capitalized_Date,
    Finance_Remarks,
    currentUser,
    Handover_Status,
    Work_Allocation_Status,
    Sub_Contractor_Status,
    Dependencies_Status,
    PR_PO_Progress_Status,
    Logistics_Status,
    Implementation_Status,
    Acceptance_Status,
    Payment_Status,
  };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
    .then(() => {
      res.status(200).send({ status: "Project Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Update Error", error: err.message });
    });
});

// ---------------- Delete sites database posts ---------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

router
  .route("/mobitelProjectsDatabases/delete/:id")
  .delete(async (req, res) => {
    let postIDs = req.params.id;

    const postIDsArray = postIDs.split(",");
    // console.log(postIDsArray);

    await Posts.deleteMany({ _id: { $in: postIDsArray } })
      .then(() => {
        res.status(200).send({ status: "Project Data Deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          status: "Error occured while deleting Preject details",
          error: err.message,
        });
      });
  });

//---------------------------------------------------------------------------------------------------------------------------
//-------------- Function for 7 days of week for Front End Weekly Progress Graph of Mobitel Project Databases ---------------
//---------------------------------------------------------------------------------------------------------------------------

function getSevenDaysOfWeek() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let today = new Date();
  let start = today.getDay();
  if (start == 6) {
    return days;
    console.log(days);
  } else {
    return days.slice(start).concat(days.slice(0, start));
    //console.log(days.slice(start).concat(days.slice(0,start)));
  }
}

// ---------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------
function getchartData(posts) {
  mobilizeData = posts;

  // console.log(mobilizeData);
  return mobilizeData;
}
// ---------------------------------------------------------------------------------------------------------------------------

let projectName = "All Projects";

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Functions for Getting Dates to dd - MMM - yy format in the MObitel Database Table -----------------------
//---------------------------------------------------------------------------------------------------------------------------

function getDateFormat(posts) {
  let event = [];
  let isoDate = [];
  let current_datetime = [];
  let formatted_date = [];
  let MonthNameDate = [];
  let hoDataLength = posts.filter((obj) => obj.HO_Date).length;

  for (var i = 0; i < hoDataLength; i++) {
    event[i] = new Date(posts.filter((obj) => obj.HO_Date)[i].HO_Date);
    isoDate[i] = event[i].toISOString();
  }
  //console.log(isoDate);
  for (var i = 0; i < hoDataLength; i++) {
    current_datetime[i] = new Date(isoDate[i]);
  }

  //console.log(current_datetime);

  for (var i = 0; i < hoDataLength; i++) {
    formatted_date[i] =
      current_datetime[i].getDate() +
      "-" +
      (current_datetime[i].getMonth() + 1) +
      "-" +
      current_datetime[i].getFullYear();
  }

  //console.log(formatted_date)

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (var i = 0; i < hoDataLength; i++) {
    MonthNameDate[i] =
      current_datetime[i].getDate() +
      "-" +
      months[current_datetime[i].getMonth()] +
      "-" +
      current_datetime[i].getFullYear();
  }
  //console.log(MonthNameDate);

  return event;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------- Functions for Getting Column Graph chart Data Arrays to the Dashboard in fornt end  ---------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getchartDataForDashboard(posts) {
  var mobilizeData = [];
  var installedData = [];
  var commissioned = [];
  var sarData = [];
  var patData = [];
  var onairData = [];

  var theMonths = new Array(
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  );
  var now = new Date();

  for (var i = 0; i < 12; i++) {
    var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
    var month = theMonths[future.getMonth()];
    var year = future.getFullYear();
    var monthsArrayReversed = [];

    for (var i = 0; i < 12; i++) {
      monthsArrayReversed.push(
        now.getFullYear().toString() + "-" + theMonths[now.getMonth()]
      );
      now.setMonth(now.getMonth() - 1);
    }
    monthsArrayReversed.reverse();
  }

  let monthsArray = monthsArrayReversed;
  // console.log(monthsArrayReversed);
  // monthsArray = ['2021-02', '2021-03','2021-04', '2021-05','2021-06', '2021-07','2021-08', '2021-09','2021-10', '2021-11','2021-12', '2022-01']

  for (var i = 0; i < 12; i++) {
    mobilizeData[i] = parseInt(
      posts.filter((obj) => obj.Mobilization_Status === "Completed").length
    );
    installedData[i] = parseInt(
      posts.filter((obj) => obj.Installation_Status === "Completed").length
    );

    commissioned[i] = parseInt(
      posts.filter((obj) => obj.Commissioning_Status === "Completed").length
    );
    sarData[i] = parseInt(
      posts.filter(
        (obj) => obj.SAR_Status === "Approved" || obj.SAR_Status === "PAT Only"
      ).length
    );
    patData[i] = parseInt(
      posts.filter(
        (obj) =>
          obj.PAT_Status === "Pass" || obj.PAT_Status === "Pass with minor"
      ).length
    );
    onairData[i] = parseInt(
      posts.filter((obj) => obj.On_Air_Status === "Completed").length
    );
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------

  //console.log(onairData);

  let myarray1 = mobilizeData,
    cumilative1 = [];
  let myarray2 = installedData,
    cumilative2 = [];
  let myarray3 = commissioned,
    cumilative3 = [];
  let myarray4 = sarData,
    cumilative4 = [];
  let myarray5 = patData,
    cumilative5 = [];
  let myarray6 = onairData,
    cumilative6 = [];

  for (let i = 0, s = myarray1[0]; i < myarray1.length; i++, s += myarray1[i])
    cumilative1.push(s);
  for (let i = 0, s = myarray2[0]; i < myarray2.length; i++, s += myarray2[i])
    cumilative2.push(s);
  for (let i = 0, s = myarray3[0]; i < myarray3.length; i++, s += myarray3[i])
    cumilative3.push(s);
  for (let i = 0, s = myarray4[0]; i < myarray4.length; i++, s += myarray4[i])
    cumilative4.push(s);
  for (let i = 0, s = myarray5[0]; i < myarray5.length; i++, s += myarray5[i])
    cumilative5.push(s);
  for (let i = 0, s = myarray6[0]; i < myarray6.length; i++, s += myarray6[i])
    cumilative6.push(s);

  let chartData = [];

  chartData.push(
    cumilative6,
    cumilative5,
    cumilative4,
    cumilative3,
    cumilative2,
    cumilative1
  );

  // console.log(chartData);
  return chartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Handover Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getHandOverData(posts) {
  var handOverData = [];

  handOverData.push(
    posts
      .filter((obj) => obj.HO_Date !== "")
      .filter(
        (obj) =>
          obj.Site_Status !== "Site Withdrawn" &&
          obj.Site_Status !== "Tower Pending / Power Not Connected" &&
          obj.Site_Status !== "Equipment Pending / Power Not Connected" &&
          obj.Site_Status !== "Equipment Pending" &&
          obj.Site_Status !== "Approval Pending" &&
          obj.Site_Status !== "SAQ Clearance Pending" &&
          obj.Site_Status !== "Supply Only"
      ).length
  );

  //console.log(handOverData);
  return handOverData;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Function for Getting number of widthdrawn sites to the Mobitel site engineers analysis ------------------
//---------------------------------------------------------------------------------------------------------------------------

function getWidthdrawnSites(posts) {
  var widthdrawData = [];

  widthdrawData.push(
    posts.filter((obj) => obj.Site_Status === "Site Withdrawn").length
  );

  // console.log(widthdrawData);
  return widthdrawData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Pat Pass Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getPatPassData(posts) {
  var patPassData = [];

  patPass = posts
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  patPassMinor = posts
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  sarOnly = posts
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;

  patPassData.push(patPass + patPassMinor + sarOnly);
  //console.log(patPassData);
  return patPassData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get On Air Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getOnAirData(posts) {
  var OnAirData = [];

  OnAirData = posts
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;

  //console.log(OnAirData);
  return OnAirData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting On Hold Site Data to the Front End Squares of Mobitel Projects ------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getHoldSitesData(posts) {
  var holdData = [];

  SitesWithdrawn = posts.filter(
    (obj) => obj.Site_Status === "Site Withdrawn"
  ).length;
  TowerPendingnPowerNC = posts.filter(
    (obj) => obj.Site_Status === "Tower Pending / Power Not Connected"
  ).length;
  EquipmentPendingnPowerNC = posts.filter(
    (obj) => obj.Site_Status === "Equipment Pending / Power Not Connected"
  ).length;
  EquipmentPending = posts.filter(
    (obj) => obj.Site_Status === "Equipment Pending"
  ).length;
  ApprovalPending = posts.filter(
    (obj) => obj.Site_Status === "Approval Pending"
  ).length;
  SAQclearancePending = posts.filter(
    (obj) => obj.Site_Status === "SAQ Clearance Pending"
  ).length;
  SupplyOnly = posts.filter((obj) => obj.Site_Status === "Supply Only").length;

  holdData =
    SitesWithdrawn +
    TowerPendingnPowerNC +
    EquipmentPendingnPowerNC +
    EquipmentPending +
    ApprovalPending +
    SAQclearancePending +
    SupplyOnly;

  //console.log(holdData);
  return holdData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------Function for Getting Project Cpmpletion Data to the Front End Mobitel Projects Insights Project Completion Donut---
//---------------------------------------------------------------------------------------------------------------------------

function getProjectCompletionData(posts) {
  (onAirSites = getOnAirData(posts)),
    (handOverSites = getHandOverData(posts)),
    (holdSites = getHoldSitesData(posts));

  const projectCompletionChartData = [];
  const completed = onAirSites;
  const pending = handOverSites - holdSites - onAirSites;
  const hold = holdSites;

  projectCompletionChartData.push(completed, pending, hold);

  //console.log(projectCompletionChartData);
  return projectCompletionChartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Scope Data to the Front End Mobitel Projects Insights Sites On Air Donut -------
//---------------------------------------------------------------------------------------------------------------------------

function getSitesOnAirData(posts) {
  var sitesOnAir = [];

  (completed = posts
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length),
    (pending = posts.filter((obj) => obj.On_Air_Status === "Pending").length),
    (rejected = posts.filter((obj) => obj.On_Air_Status === "Hold").length);

  sitesOnAir.push(completed, pending, rejected);

  //console.log(sitesOnAir);
  return sitesOnAir;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting PAT Completion to the Front End Mobitel Projects Insights PAT Completion Donut-----------
//---------------------------------------------------------------------------------------------------------------------------

function getPATCompletionData(posts) {
  var patCompletionData = [];

  (pass = posts
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length),
    (sarOnly = posts
      .filter((obj) => obj.PAT_Status === "SAR Only")
      .filter((obj) => obj.PAT_Pass_Date !== "").length),
    (passWM = posts
      .filter((obj) => obj.PAT_Status === "Pass with minor")
      .filter((obj) => obj.PAT_Pass_Date !== "").length),
    (submitted = posts.filter((obj) => obj.PAT_Status === "Submitted").length),
    (pending = posts.filter((obj) => obj.PAT_Status === "Pending").length),
    (rejected = posts.filter((obj) => obj.PAT_Status === "Rejected").length);

  patCompletionData.push(pass, passWM, sarOnly, submitted, pending, rejected);

  //console.log(patCompletionData);
  return patCompletionData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights SAR Donut chart ---------------
//---------------------------------------------------------------------------------------------------------------------------

function getSARData(posts) {
  var sarData = [];

  (approved = posts
    .filter((obj) => obj.SAR_Status === "Approved")
    .filter((obj) => obj.SAR_Date !== "").length),
    (patOnly = posts
      .filter((obj) => obj.SAR_Status === "PAT Only")
      .filter((obj) => obj.SAR_Date !== "").length),
    (submitted = posts.filter((obj) => obj.SAR_Status === "Submitted").length),
    (pending = posts.filter((obj) => obj.SAR_Status === "Pending").length),
    (rejected = posts.filter((obj) => obj.SAR_Status === "Rejected").length);

  sarData.push(approved, patOnly, submitted, pending, rejected);

  //console.log(sarData);
  return sarData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights Commissioning Donut -----------
//---------------------------------------------------------------------------------------------------------------------------

function getCommissioningData(posts) {
  var commissioningData = [];

  (completed = posts
    .filter((obj) => obj.Commissioning_Status === "Completed")
    .filter((obj) => obj.Commisioned_Date !== "").length),
    (pending = posts.filter(
      (obj) => obj.Commissioning_Status === "Pending"
    ).length),
    (rejected = posts.filter(
      (obj) => obj.Commissioning_Status === "Hold"
    ).length);

  commissioningData.push(completed, pending, rejected);

  //console.log(commissioningData);
  return commissioningData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights Installation Donut -----------
//---------------------------------------------------------------------------------------------------------------------------

function getInstallationData(posts) {
  var installationData = [];

  (ITCnPC = posts
    .filter((obj) => obj.Installation_Status === "Completed")
    .filter((obj) => obj.Installation_Date !== "").length),
    (ITCnPP = posts
      .filter((obj) => obj.Installation_Status === "TX Completed-Power Pending")
      .filter((obj) => obj.Installation_Date !== "").length),
    (ITPnPC = posts
      .filter((obj) => obj.Installation_Status === "TX Pending-Power Completed")
      .filter((obj) => obj.Installation_Date !== "").length),
    (ITPnPP = posts.filter(
      (obj) => obj.Installation_Status === "TX Pending-Power Pending"
    ).length),
    (IPending = posts.filter(
      (obj) => obj.Installation_Status === "Installation Pending"
    ).length),
    (IHold = posts.filter(
      (obj) => obj.Installation_Status === "Installation Hold"
    ).length);

  installationData.push(ITCnPC, ITCnPP, ITPnPC, ITPnPP, IPending, IHold);

  //console.log(installationData);
  return installationData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights Mobilization Donut ------------
//---------------------------------------------------------------------------------------------------------------------------

function getMobilizedData(posts) {
  var mobilizedData = [];

  (Completed = posts
    .filter((obj) => obj.Mobilization_Status === "Completed")
    .filter((obj) => obj.Mobilized_Date !== "").length),
    (Pending = posts.filter(
      (obj) => obj.Mobilization_Status === "Pending"
    ).length),
    (Hold = posts.filter((obj) => obj.Mobilization_Status === "Hold").length);

  mobilizedData.push(Completed, Pending, Hold);

  //console.log(mobilizedData);
  return mobilizedData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------- Functions for Getting Last Week Progress Graph Data to the Front End of Mobitel Project Databases Insights------
//---------------------------------------------------------------------------------------------------------------------------

function getWeeklyProgressData(posts) {
  var onairData = [];
  var onairTargetData = [];

  var lastWeekDates = [];
  var yesterdayDate = [];
  var yesterdayMonth = [];
  var yesterdayYear = [];

  for (var i = 0; i < 7; i++) {
    yesterdayDate[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getDate();
    yesterdayMonth[i] = (
      "0" +
      (new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)
    ).slice(-2);
    yesterdayYear[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getFullYear();

    lastWeekDates[i] =
      yesterdayYear[i] + "-" + yesterdayMonth[i] + "-" + yesterdayDate[i];
  }
  lastWeekDates.reverse();

  // console.log(lastWeekDates);
  // lastWeekDates = ['2022-01-10','2022-01-11','2022-01-12','2022-01-13','2022-01-14','2022-01-15','2022-01-16']

  for (var i = 0; i < 7; i++) {
    onairData[i] = posts.filter(
      (obj) => obj.On_Air_Date === lastWeekDates[i]
    ).length;
    onairTargetData[i] = posts.filter(
      (obj) => obj.On_Air_Target === lastWeekDates[i]
    ).length;
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------
  // console.log(onairData);

  let onAirArray = onairData;
  let onAirTargetArray = onairTargetData;
  // console.log(onAirArray);

  let weeklyProgressData = [];
  weeklyProgressData.push(
    { name: "Completed", type: "column", data: onAirArray },
    { name: "Targeted", type: "column", data: onAirTargetArray }
  );

  // console.log(weeklyProgressData);
  return weeklyProgressData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------- Functions for Last Week Progress On Air Sites Data to the Front End of Mobitel Project Databases Insights-------
//---------------------------------------------------------------------------------------------------------------------------

function getWeeklyProgressOnAirSitesData(posts) {
  var lastWeekDates = [];
  var yesterdayDate = [];
  var yesterdayMonth = [];
  var yesterdayYear = [];

  for (var i = 0; i < 7; i++) {
    yesterdayDate[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getDate();
    yesterdayMonth[i] = (
      "0" +
      (new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)
    ).slice(-2);
    yesterdayYear[i] = new Date(
      new Date().setDate(new Date().getDate() - i)
    ).getFullYear();

    lastWeekDates[i] =
      yesterdayYear[i] + "-" + yesterdayMonth[i] + "-" + yesterdayDate[i];
  }
  lastWeekDates.reverse();
  // console.log(lastWeekDates);
  // lastWeekDates = ['2022-01-10','2022-01-11','2022-01-12','2022-01-13','2022-01-14','2022-01-15','2022-01-16']

  var onairData = [];
  var onairSitesID = [];
  var weeklyOnAirSitesID = [];
  var onairSitesId1 = [];
  var onairSitesId2 = [];
  var onairSitesId3 = [];
  var onairSitesId4 = [];
  var onairSitesId5 = [];
  var onairSitesId6 = [];
  var onairSitesId7 = [];

  if (projectName === "All Projects") {
    for (var i = 0; i < 7; i++) {
      onairData[i] = posts.filter(
        (obj) => obj.On_Air_Date === lastWeekDates[i]
      ).length;
    }
    // console.log(onairData);
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    for (var j = 0; j < onairData[0]; j++) {
      onairSitesId1.push(
        posts
          .filter((obj) => obj.On_Air_Date === lastWeekDates[0])
          .filter((obj) => obj.Site_ID)[j].Site_ID
      );
    }
    for (var j = 0; j < onairData[1]; j++) {
      onairSitesId2.push(
        posts
          .filter((obj) => obj.On_Air_Date === lastWeekDates[1])
          .filter((obj) => obj.Site_ID)[j].Site_ID
      );
    }
    for (var j = 0; j < onairData[2]; j++) {
      onairSitesId3.push(
        posts
          .filter((obj) => obj.On_Air_Date === lastWeekDates[2])
          .filter((obj) => obj.Site_ID)[j].Site_ID
      );
    }
    for (var j = 0; j < onairData[3]; j++) {
      onairSitesId4.push(
        posts
          .filter((obj) => obj.On_Air_Date === lastWeekDates[3])
          .filter((obj) => obj.Site_ID)[j].Site_ID
      );
    }
    for (var j = 0; j < onairData[4]; j++) {
      onairSitesId5.push(
        posts
          .filter((obj) => obj.On_Air_Date === lastWeekDates[4])
          .filter((obj) => obj.Site_ID)[j].Site_ID
      );
    }
    for (var j = 0; j < onairData[5]; j++) {
      onairSitesId6.push(
        posts
          .filter((obj) => obj.On_Air_Date === lastWeekDates[5])
          .filter((obj) => obj.Site_ID)[j].Site_ID
      );
    }
    for (var j = 0; j < onairData[6]; j++) {
      onairSitesId7.push(
        posts
          .filter((obj) => obj.On_Air_Date === lastWeekDates[6])
          .filter((obj) => obj.Site_ID)[j].Site_ID
      );
    }
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  weeklyOnAirSitesID.push(
    onairSitesId1,
    onairSitesId2,
    onairSitesId3,
    onairSitesId4,
    onairSitesId5,
    onairSitesId6,
    onairSitesId7
  );

  //console.log(projectName);
  return weeklyOnAirSitesID;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------- Functions getting HO scope, PAT scope, Completed scope to the Mobitel Projects Overview Data Table  ------------
//---------------------------------------------------------------------------------------------------------------------------

function getOvervieTableData(posts) {
  var overvieTableDataP1 = [];

  var handOverDataP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.HO_Date !== "").length;
  var patPassP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var completedP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;

  patPassDataP1 = patPassP1 + patPassMinorP1 + sarOnlyP1;

  overvieTableDataP1.push(handOverDataP1, patPassDataP1, completedP1);
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  var overvieTableDataP2 = [];

  var handOverDataP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.HO_Date !== "").length;
  var patPassP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var completedP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;

  patPassDataP2 = patPassP2 + patPassMinorP2 + sarOnlyP2;

  overvieTableDataP2.push(handOverDataP2, patPassDataP2, completedP2);
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  var overvieTableDataP3 = [];

  var handOverDataP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.HO_Date !== "").length;
  var patPassP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var completedP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;

  patPassDataP3 = patPassP3 + patPassMinorP3 + sarOnlyP3;

  overvieTableDataP3.push(handOverDataP3, patPassDataP3, completedP3);
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  var overvieTableDataP4 = [];

  var handOverDataP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.HO_Date !== "").length;
  var patPassP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var completedP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;

  patPassDataP4 = patPassP4 + patPassMinorP4 + sarOnlyP4;

  overvieTableDataP4.push(handOverDataP4, patPassDataP4, completedP4);
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // console.log(overvieTableDataP1);
  // console.log(overvieTableDataP2);
  // console.log(overvieTableDataP3);
  // console.log(overvieTableDataP4);
  var overvieTableData = [];

  overvieTableData.push(
    overvieTableDataP1,
    overvieTableDataP2,
    overvieTableDataP3,
    overvieTableDataP4
  );
  //console.log(overvieTableData);

  return overvieTableData;
}

function getOvervieTableData(posts) {
  var handOverDataP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.HO_Date !== "").length;
  var handOverDataP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.HO_Date !== "").length;
  var handOverDataP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.HO_Date !== "").length;
  var handOverDataP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.HO_Date !== "").length;

  var patPassP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;

  var patPassP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;

  var patPassP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;

  var patPassP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var patPassMinorP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.PAT_Status === "Pass with minor")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  var sarOnlyP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.PAT_Status === "SAR Only")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;

  var completedP1 = posts
    .filter((obj) => obj.Project === "Other Project")
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;
  var completedP2 = posts
    .filter((obj) => obj.Project === "Covid P3")
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;
  var completedP3 = posts
    .filter((obj) => obj.Project === "Huawei IBBE P1")
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;
  var completedP4 = posts
    .filter((obj) => obj.Project === projectName)
    .filter((obj) => obj.On_Air_Status === "Completed")
    .filter((obj) => obj.On_Air_Date !== "").length;

  patPassDataP1 = patPassP1 + patPassMinorP1 + sarOnlyP1;
  patPassDataP2 = patPassP2 + patPassMinorP2 + sarOnlyP2;
  patPassDataP3 = patPassP3 + patPassMinorP3 + sarOnlyP3;
  patPassDataP4 = patPassP4 + patPassMinorP4 + sarOnlyP4;

  var overvieTableData = [];
  var handOverData = [];
  var patPassData = [];
  var completedData = [];

  // handOverData.push(handOverDataP1, handOverDataP2, handOverDataP3, handOverDataP4);
  // patPassData.push(patPassDataP1, patPassDataP2, patPassDataP3, patPassDataP4);
  // completedData.push(completedP1, completedP2, completedP3, completedP4);
  //-------------------------------------------------------------------------------------------------------------------------------

  handOverData.push(
    { HandoverData: handOverDataP1 },
    { HandoverData: handOverDataP2 },
    { HandoverData: handOverDataP3 }
    // {'HandoverData': handOverDataP1},
  );

  patPassData.push(
    { PatPassData: patPassDataP1 },
    { PatPassData: patPassDataP2 },
    { PatPassData: patPassDataP3 }
    // {'PatPassData': patPassDataP4},
  );

  completedData.push(
    { completedData: completedP1 },
    { completedData: completedP2 },
    { completedData: completedP3 }
    // {'completedData': completedP4},
  );

  overvieTableData.push(handOverData, patPassData, completedData);
  //console.log(overvieTableData);

  return overvieTableData;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects TSSR milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getMobitelProjectsTSSRMilestoneData(posts) {
  (Scope = posts.filter((obj) => obj.HO_Date).length),
    (PRSubmitted = posts.filter((obj) => obj.PR_Submitted_for_TSS).length),
    (PRRaised = posts.filter((obj) => obj.PR_Raised_for_TSS).length),
    (POIssued = posts.filter((obj) => obj.PO_Issued_for_TSS).length),
    (TSSHOData = posts.filter((obj) => obj.TSS_HO).length),
    (TSSRSubmitted = posts.filter((obj) => obj.TSSR_Submitted).length),
    (TSSRapproved = posts.filter((obj) => obj.TSSR_Approved).length),
    (BOQsubmitted = posts.filter((obj) => obj.BOQ_Submitted).length);

  let TSSRcompletedData = [];
  let TSSRscopeData = [];
  let TSSRdataArray = [];
  TSSRcompletedData.push(
    Scope,
    PRSubmitted,
    PRRaised,
    POIssued,
    TSSHOData,
    TSSRSubmitted,
    TSSRapproved,
    BOQsubmitted
  );
  TSSRscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  TSSRdataArray.push(TSSRcompletedData, TSSRscopeData);

  // console.log(TSSRdataArray);
  return TSSRdataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects PO milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getMobitelProjectsPOMilestoneData(posts) {
  (Scope = posts.filter((obj) => obj.HO_Date).length),
    (ImpHO = posts.filter((obj) => obj.Imp_HO).length),
    (PRSubmissionforImp = posts.filter(
      (obj) => obj.PR_Submission_for_Imp
    ).length),
    (PRRaisedforImp = posts.filter((obj) => obj.PR_Raised_for_Imp).length),
    (POIssuedforImp = posts.filter((obj) => obj.PO_Issued_for_Imp).length),
    (PRsubforSupply = posts.filter((obj) => obj.PR_Sub_for_supply).length),
    (PRRaisedforSupply = posts.filter(
      (obj) => obj.PR_Raised_for_supply
    ).length),
    (POIssuedforSupply = posts.filter(
      (obj) => obj.PO_Issued_for_supply
    ).length);

  let POcompletedData = [];
  let POscopeData = [];
  let POdataArray = [];
  POcompletedData.push(
    ImpHO,
    PRSubmissionforImp,
    PRRaisedforImp,
    POIssuedforImp,
    PRsubforSupply,
    PRRaisedforSupply,
    POIssuedforSupply
  );
  POscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  POdataArray.push(POcompletedData, POscopeData);

  // console.log(POdataArray);
  return POdataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Logistics milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getMobitelProjectsLogisticsMilestoneData(posts) {
  (Scope = posts.filter((obj) => obj.HO_Date).length),
    (PISubmitted = posts.filter((obj) => obj.PI_Submitted).length),
    (PIApproved = posts.filter((obj) => obj.PI_Approved).length),
    (TRCCompleted = posts.filter((obj) => obj.TRC_Completed).length),
    (BOICompleted = posts.filter((obj) => obj.BOI_Completed).length),
    (ICLCompleted = posts.filter((obj) => obj.ICL_Completed).length),
    (LCIssued = posts.filter((obj) => obj.LC_Issued).length),
    (Shipped = posts.filter((obj) => obj.Shipped).length);
  (ReceivedatPort = posts.filter((obj) => obj.Received_at_port).length),
    (DeliveredtoWH = posts.filter((obj) => obj.Delivered_to_WH).length);

  let LogisticscompletedData = [];
  let LogisticsscopeData = [];
  let LogisticsdataArray = [];
  LogisticscompletedData.push(
    PISubmitted,
    PIApproved,
    TRCCompleted,
    BOICompleted,
    ICLCompleted,
    LCIssued,
    Shipped,
    ReceivedatPort,
    DeliveredtoWH
  );
  LogisticsscopeData.push(
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope
  );
  LogisticsdataArray.push(LogisticscompletedData, LogisticsscopeData);

  // console.log(LogisticsdataArray);
  return LogisticsdataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Dependancy milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getMobitelProjectsDependancyMilestoneData(posts) {
  (Scope = posts.filter((obj) => obj.HO_Date).length),
    (SAQdata = posts.filter((obj) => obj.SAQ_Clearance_Date).length),
    (Infra = posts.filter((obj) => obj.PI_Approved).length), // ------------------------ not defined ----------
    (Civil = posts.filter((obj) => obj.Civil_PAT_Date).length),
    (Power = posts.filter((obj) => obj.Power_Connected_Date).length),
    (TXdata = posts.filter((obj) => obj.TX_Connected_Date).length),
    (MCWrequesteddata = posts.filter((obj) => obj.MCW_Requested_Date).length), // ------ Used as MCW scope ----
    (MCWcompletedata = posts.filter((obj) => obj.MCW_Completed_Date).length),
    (Equipments = posts.filter((obj) => obj.Shipped).length); // ------------------------ not defined ----------

  let DependancycompletedData = [];
  let DependancyscopeData = [];
  let DependancydataArray = [];
  DependancycompletedData.push(
    SAQdata,
    Infra,
    Civil,
    Power,
    TXdata,
    MCWcompletedata,
    Equipments
  );
  DependancyscopeData.push(
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    MCWrequesteddata,
    Scope
  );
  DependancydataArray.push(DependancycompletedData, DependancyscopeData);

  // console.log(DependancydataArray);
  return DependancydataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Implemenation milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getMobitelProjectsImplemenationMilestoneData(posts) {
  (Scope = posts.filter((obj) => obj.HO_Date).length),
    (Installed = posts
      .filter((obj) => obj.Installation_Status === "Completed")
      .filter((obj) => obj.Installation_Date !== "").length);
  Commissioned = posts
    .filter((obj) => obj.Commissioning_Status === "Completed")
    .filter((obj) => obj.Commisioned_Date !== "").length;
  PATpass = posts
    .filter((obj) => obj.PAT_Status === "Pass")
    .filter((obj) => obj.PAT_Pass_Date !== "").length;
  SARApprovedScope = posts
    .filter((obj) => obj.SAR_Status === "Approved")
    .filter((obj) => obj.SAR_Date !== "").length;
  (SSVchecklist = posts.filter((obj) => obj.Check_List_Verified).length),
    (OnAir = posts
      .filter((obj) => obj.On_Air_Status === "Completed")
      .filter((obj) => obj.On_Air_Date !== "").length);
  Reconciled = posts.filter((obj) => obj.Reconciled).length;

  let ImplemenationcompletedData = [];
  let ImplemenationscopeData = [];
  let ImplemenationdataArray = [];

  ImplemenationcompletedData.push(
    Installed,
    Commissioned,
    PATpass,
    SARApprovedScope,
    SSVchecklist,
    OnAir,
    Reconciled
  );
  ImplemenationscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  ImplemenationdataArray.push(
    ImplemenationcompletedData,
    ImplemenationscopeData
  );

  // console.log(ImplemenationdataArray);
  return ImplemenationdataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Capitalization milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getMobitelProjectsCapitalizationMilestoneData(posts) {
  (Scope = posts.filter((obj) => obj.HO_Date).length),
    (SupplyHWPACSubmitted = posts.filter(
      (obj) => obj.Supply_HW_PAC_Submitted
    ).length);
  SupplyHWPACApproved = posts.filter(
    (obj) => obj.Supply_HW_PAC_Approved
  ).length;
  ImpPACSubmitted = posts.filter((obj) => obj.Imp_PAC_Submitted).length;
  ImpPACApproved = posts.filter((obj) => obj.Imp_PAC_Approved).length;
  (SupplySWPACSubmitted = posts.filter(
    (obj) => obj.Supply_SW_PAC_Submitted
  ).length),
    (SupplySWPACApproved = posts.filter(
      (obj) => obj.Supply_SW_PAC_Approved
    ).length);
  (CapitalizationSupplyHW = posts.filter(
    (obj) => obj.Capitalization_Supply_HW
  ).length),
    (CapitalizationImplimentation = posts.filter(
      (obj) => obj.Capitalization_Imp
    ).length);
  CapitalizationSupplySW = posts.filter(
    (obj) => obj.Capitalization_Supply_SW
  ).length;

  let CapitalizationcompletedData = [];
  let CapitalizationscopeData = [];
  let CapitalizationdataArray = [];

  CapitalizationcompletedData.push(
    SupplyHWPACSubmitted,
    SupplyHWPACApproved,
    ImpPACSubmitted,
    ImpPACApproved,
    SupplySWPACSubmitted,
    SupplySWPACApproved,
    CapitalizationSupplyHW,
    CapitalizationImplimentation,
    CapitalizationSupplySW
  );
  CapitalizationscopeData.push(
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope,
    Scope
  );
  CapitalizationdataArray.push(
    CapitalizationcompletedData,
    CapitalizationscopeData
  );

  // console.log(CapitalizationdataArray);
  return CapitalizationdataArray;
}
//----------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects All milestones to the front end graph -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getMobitelProjectsAllMilestoneData(posts) {
  let TSSRdataArray = getMobitelProjectsTSSRMilestoneData(posts);
  let POdataArray = getMobitelProjectsPOMilestoneData(posts);
  let LogisticsdataArray = getMobitelProjectsLogisticsMilestoneData(posts);
  let DependancydataArray = getMobitelProjectsDependancyMilestoneData(posts);
  let ImplementationdataArray =
    getMobitelProjectsImplemenationMilestoneData(posts);
  let CapitalizationdataArray =
    getMobitelProjectsCapitalizationMilestoneData(posts);
  const Allmilestones = [
    ...TSSRdataArray[0],
    ...POdataArray[0],
    ...LogisticsdataArray[0],
    ...DependancydataArray[0],
    ...ImplementationdataArray[0],
    ...CapitalizationdataArray[0],
  ];

  // console.log(Allmilestones);
  return Allmilestones;
}
//----------------------------------------------------------------------------------------------------------------------------
module.exports = router;
