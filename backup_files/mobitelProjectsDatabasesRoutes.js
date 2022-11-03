const router = require("express").Router();
const Posts = require("../models/mobitelProjectsDatabase");


// ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/mobitelProjectsDatabases/save',async (req, res, next) => {

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return next(err);
    }
    return res.status(200).json({
      success:"Project Details Added Successfully"
    });
  });
});
// ------------------------  Getting specific site data  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.route("/mobitelProjectsDatabases/:id").get(async(req,res) =>{

    let postId = req.params.id;
  
    await Posts.findById(postId,(err,post) =>{
      if(err){
        return res.status(400).json({success:false, err});
      }    
        return res.status(200).json({
          success:true,
          post
        });
    });
  });


// ---------------------- Get sites data to the graphs  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProjectsDatabases', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    return res.status(200).json({
      success: true,
      existingPosts:posts,
      getDateFormatToDatabaseTable:  getDateFormat(posts),
      chartDataForFrontEnd: getchartData(posts),  // Graph data of number of sites Mobilized in each month sending to front end Appwebsitevisits.

      XaxisDataForTheGraphs:getXaxisData(), // x axis data labels array sending to the Column graghs front end.
      SevenDaysOfWeek: getSevenDaysOfWeek(), // 7 Days of Week going to front end weekly progress column graph

      //ScopeDataToSquares: getScopeData(posts), // Geting Scope Data for the front end Mobitel Projects Insights Scope Squares.
      HandOverDataToSquares: getHandOverData(posts), // getting HO data to the Front End Mobitel Projects Insights Handover Squares.
      PatDataForFrontEnd: getPatPassData(posts),  // getting PAT Pass data to the Front End Mobitel Projects Insights PAT Pass Squares.
      OnAirDataForFrontEnd: getOnAirData(posts), // getting On Air data to the Front End Mobitel Projects Insights ON Air Squares.
      HoldSitesDataforSquares: getHoldSitesData(posts), // On Hold Sites data to the Front end Mobitel Projects Insights Squares.

      ProjectCompletionForFrontEnd: getProjectCompletionData(posts), // Data for Front end Mobitel Projects Insights project Completion Donut Graph.
      sitesOnAirDataForFrontEnd: getSitesOnAirData(posts), // Data for Front end Mobitel Projects Insights Sites On Air Donut Graph.
      patCompletionDataForFrontEnd: getPATCompletionData(posts), // Data for Front end Mobitel Projects Insights PAT Completion Donut Graph.
      sarDataForFrontEnd: getSARData(posts), // Data for Front end Mobitel Projects Insights SAR Donut Graph.
      commissioningDataForFrontEnd: getCommissioningData(posts),  // Data for Front end Mobitel Projects Insights Commissioning Donut Graph.
      installationDataForFrontEnd: getInstallationData(posts), // Data for Front end Mobitel Projects Insights Installation Donut Graph.
      mobilizeDataforFrontEnd: getMobilizedData(posts), // Data for Front end Mobitel Projects Insights Mobilization Donut Graph.
      weeklyProgressDataForFrontEnd: getWeeklyProgressData(posts), // Data for Front end Mobitel Projects Insights Weekly Progress Graph.
      WeeklyProgressOnAirSitesData: getWeeklyProgressOnAirSitesData(posts) // Data for Front end Mobitel Projects Insights Weekly Progress Graph Tool tip.
    });
  });
});

// ------------------ Update site data in the database  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.route('/DatabasesMobitelProjects/Edit/:id').put(async(req,res) =>{

    let postID = req.params.id;
    const { 
        Project_ID,
        Implementation_By,
        Project,
        Scope,
        HO_Date,
        Site_ID,
        Site_Name,
        New_RAT,
        Site_Engineer,
        Sub_Contractor,
        Site_Status,
        Responsible,
        Civil_PAT_Date,
        SAQ_Clearance_Date,
        Approval_Received_Date,
        MCW_Requested_Date,
        MCW_Completed_Date,
        Mobilization_Status,
        Mobilized_Date,
        Installation_Status,
        Installation_Date,
        Power_Connected_Date,
        TX_Connected_Date,
        Commissioning_Status,
        Commisioned_Date,
        SAR_Status,
        SAR_Date,
        PAT_Status,
        PAT_Pass_Date,
        Check_List_Submitted,
        Check_List_Verified,
        On_Air_Status,
        On_Air_Date,
        PR_Submitted_for_TSS,
        PR_Raised_for_TSS,
        TSS_PO_number,
        PO_Issued_for_TSS,
        TSS_HO,
        TSSR_Submitted,
        TSSR_Approved,
        BOQ_Submitted,
        Imp_HO,
        PR_Submission_for_Imp,
        PR_Number_for_Imp,
        PR_Raised_for_Imp,
        PO_Issued_for_Imp,
        PR_Sub_for_supply,
        PR_Number_for_supply,
        PR_Raised_for_supply,
        PO_Issued_for_supply,
        PI_Submitted,
        PI_Number,
        PI_Approved,
        TRC_Completed,
        BOI_Completed,
        ICL_Completed,
        LC_Issued,
        Shipped,
        Received_at_port,
        Delivered_to_WH,
        Reconciled,
        COW_Submitted,
        COW_Approved,
        Supply_HW_PAC_Submitted,
        Supply_HW_PAC_Approved,
        Imp_PAC_Submitted,
        Imp_PAC_Approved,
        Supply_SW_PAC_Submitted,
        Supply_SW_PAC_Approved,
        Capitalization_Supply_HW,
        Capitalization_Imp,
        Capitalization_Supply_SW
    } = req.body;

    const updatePost = {
        Project_ID,
        Implementation_By,
        Project,
        Scope,
        HO_Date,
        Site_ID,
        Site_Name,
        New_RAT,
        Site_Engineer,
        Sub_Contractor,
        Site_Status,
        Responsible,
        Civil_PAT_Date,
        SAQ_Clearance_Date,
        Approval_Received_Date,
        MCW_Requested_Date,
        MCW_Completed_Date,
        Mobilization_Status,
        Mobilized_Date,
        Installation_Status,
        Installation_Date,
        Power_Connected_Date,
        TX_Connected_Date,
        Commissioning_Status,
        Commisioned_Date,
        SAR_Status,
        SAR_Date,
        PAT_Status,
        PAT_Pass_Date,
        Check_List_Submitted,
        Check_List_Verified,
        On_Air_Status,
        On_Air_Date,
        PR_Submitted_for_TSS,
        PR_Raised_for_TSS,
        TSS_PO_number,
        PO_Issued_for_TSS,
        TSS_HO,
        TSSR_Submitted,
        TSSR_Approved,
        BOQ_Submitted,
        Imp_HO,
        PR_Submission_for_Imp,
        PR_Number_for_Imp,
        PR_Raised_for_Imp,
        PO_Issued_for_Imp,
        PR_Sub_for_supply,
        PR_Number_for_supply,
        PR_Raised_for_supply,
        PO_Issued_for_supply,
        PI_Submitted,
        PI_Number,
        PI_Approved,
        TRC_Completed,
        BOI_Completed,
        ICL_Completed,
        LC_Issued,
        Shipped,
        Received_at_port,
        Delivered_to_WH,
        Reconciled,
        COW_Submitted,
        COW_Approved,
        Supply_HW_PAC_Submitted,
        Supply_HW_PAC_Approved,
        Imp_PAC_Submitted,
        Imp_PAC_Approved,
        Supply_SW_PAC_Submitted,
        Supply_SW_PAC_Approved,
        Capitalization_Supply_HW,
        Capitalization_Imp,
        Capitalization_Supply_SW
    }

    const update = await Posts.findByIdAndUpdate(postID, updatePost)
    .then(() => {
      res.status(200).send({status:"Project Details Updated"})
    }).catch ((err) => {
      console.log(err);
      res.status(500).send({status:"Update Error", error: err.message});
    })
  });

// ---------------- Delete sites database posts ---------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

router.route('/mobitelProjectsDatabases/delete/:id').delete(async(req,res) =>{
    let postID = req.params.id;
    await Posts.findByIdAndDelete(postID)
    .then(() => {
      res.status(200).send({status: "Project Data Deleted"});
    }).catch((err) => {
      console.log(err);
      res.status(500).send({status: "Error occured while deleting Preject details", error: err.message});
    })
  });

//---------------------------------------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for X Axis Labels to the Front End of Mobitel Project Databases ---------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getXaxisData() {

  var theMonths = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
  var now = new Date();

  for (var i = 0; i < 11; i++) {
    var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
    var month = theMonths[future.getMonth()];
    var year = future.getFullYear();
    var monthsArray = [];

    for (var i = 0; i < 11; i++) {
      monthsArray.push(theMonths[now.getMonth()] + '/01/' + now.getFullYear().toString());
      now.setMonth(now.getMonth() - 1);
    }
    
    var nextMonth = (new Date(now.setMonth(now.getMonth() + 1, 1)));
    var nextMm = ('0'+(nextMonth.getMonth())).slice(-2);
    var nextMy = (nextMonth.getFullYear()+1);
    var nextMonthDate = ((nextMm) + '/01/' + (nextMy));

    // console.log(nextMonthDate);
    monthsArray.unshift(nextMonthDate);

    monthsArray.reverse();

    var XaxisMonths = monthsArray;
  }
  // console.log(XaxisMonths);
  return XaxisMonths;
}

//---------------------------------------------------------------------------------------------------------------------------
//-------------- Function for 7 days of week for Front End Weekly Progress Graph of Mobitel Project Databases ---------------
//---------------------------------------------------------------------------------------------------------------------------

function getSevenDaysOfWeek() {

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let today = new Date();
  let start = today.getDay();
  if (start == 6) {
      return days
      console.log(days);
  }
  else {
      return days.slice(start).concat(days.slice(0,start))
      console.log(days.slice(start).concat(days.slice(0,start)));
  }
}
// ---------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------

let projectName = 'All Projects';

async function changeProject(){
  projectName = 'All Projects';
  //console.log(projectName);
}

async function changeProject1(){
  projectName = 'Other Project';
  //console.log(projectName);
}

async function changeProject2() {
  projectName='Covid P3';
  //console.log(projectName);
}

async function changeProject3() {
  projectName='Huawei IBBE P1';
  //console.log(projectName);
}

async function changeProject4() {
  projectName='ZTE BBE 2020';
  //console.log(projectName);
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProjects', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProject1', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject1(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProject2', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject2(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProject3', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject3(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------
router.get('/mobitelProject4', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject4(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Functions for Getting Dates to dd - MMM - yy format in the MObitel Database Table -----------------------
//---------------------------------------------------------------------------------------------------------------------------

function getDateFormat(posts) {
  
  let event = [];
  let isoDate = [];
  let current_datetime = [];
  let formatted_date = [];
  let MonthNameDate = [];
  let hoDataLength = posts.filter((obj) => ((obj.HO_Date))).length;

  for (var i = 0; i < hoDataLength; i++) {
   event[i] = new Date(posts.filter((obj) => (obj.HO_Date))[i].HO_Date);
   isoDate[i] = event[i].toISOString();
  }
  //console.log(isoDate);
  for (var i = 0; i < hoDataLength; i++) {
  current_datetime[i] = new Date(isoDate[i]);
  }

  //console.log(current_datetime);

  for (var i = 0; i < hoDataLength; i++) {
  formatted_date[i] = (current_datetime[i]).getDate() + "-" + ((current_datetime[i]).getMonth() + 1) + "-" + (current_datetime[i]).getFullYear();
  }

  //console.log(formatted_date)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (var i = 0; i < hoDataLength; i++) {
  MonthNameDate[i] = current_datetime[i].getDate() + "-" + months[current_datetime[i].getMonth()] + "-" + current_datetime[i].getFullYear();
  }
  //console.log(MonthNameDate);

  return event;
}
// ----------------------------------------------------------------------------------------------------------------------------------------------

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

    for (var i = 0; i < 12; i++) {
      monthsArrayReversed.push(now.getFullYear().toString()+'-'+theMonths[now.getMonth()]);
      now.setMonth(now.getMonth() - 1);
    }
    monthsArrayReversed.reverse();
    }

  let monthsArray = monthsArrayReversed;
  // console.log(monthsArrayReversed);
  // monthsArray = ['2021-02', '2021-03','2021-04', '2021-05','2021-06', '2021-07','2021-08', '2021-09','2021-10', '2021-11','2021-12', '2022-01']

  if ( projectName === 'All Projects' ) {
    for (var i = 0; i < 12; i++) {
      mobilizeData[i] = posts.filter((obj) => ((obj.Mobilization_Status === 'Completed'))).filter((obj) => ((obj.Mobilized_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      installedData[i] = posts.filter((obj) => ((obj.Installation_Status === 'Completed'))).filter((obj) => ((obj.Installation_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      commissioned[i] = posts.filter((obj) => ((obj.Commissioning_Status === 'Completed'))).filter((obj) => ((obj.Commisioned_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      sarData[i] = posts.filter((obj) => ((obj.SAR_Status === 'Approved' || obj.SAR_Status === 'PAT Only' ))).filter((obj) => ((obj.SAR_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      patData[i] = posts.filter((obj) => ((obj.PAT_Status === 'Pass' || obj.PAT_Status === 'Pass with minor' ))).filter((obj) => ((obj.PAT_Pass_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      onairData[i] = posts.filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date.toString().slice(0, 7)) === monthsArray[i])).length
    }
  } else  {
    for (var i = 0; i < 12; i++) {
      mobilizeData[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Mobilization_Status === 'Completed'))).filter((obj) => ((obj.Mobilized_Date.toString().slice(0, 7)) === monthsArray[i])).length
      installedData[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Installation_Status === 'Completed'))).filter((obj) => ((obj.Installation_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      commissioned[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Commissioning_Status === 'Completed'))).filter((obj) => ((obj.Commisioned_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      sarData[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.SAR_Status === 'Approved' || obj.SAR_Status === 'PAT Only' ))).filter((obj) => ((obj.SAR_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      patData[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.PAT_Status === 'Pass' || obj.PAT_Status === 'Pass with minor' ))).filter((obj) => ((obj.PAT_Pass_Date.toString().slice(0, 7)) === monthsArray[i])).length,
      onairData[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date.toString().slice(0, 7)) === monthsArray[i])).length
    }
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

      let chartData = []
      chartData.push(
        {'name': 'On Air', 'type': 'column', 'data': cumilative6},
        {'name': 'PAT', 'type': 'column', 'data': cumilative5},
        {'name': 'SAR', 'type': 'column', 'data': cumilative4},
        {'name': 'Commisioned', 'type': 'column', 'data': cumilative3},
        {'name': 'Installed', 'type': 'column', 'data': cumilative2},
        {'name': 'Mobilized', 'type': 'column', 'data': cumilative1}
        );

    //console.log(chartData);
  return chartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Scope Data to the Front End Squares of Mobitel Projects ------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------


// function getScopeData(posts) {
  
//   var scopeData = [];

//   scopeData.push((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => (obj.Scope)).length)

//   console.log(projectName);
//   return scopeData;
// }


//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Handover Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getHandOverData(posts) {

  var handOverData = [];

  if ( projectName === 'All Projects' ) {
    handOverData.push((posts.filter((obj) => ((obj.HO_Date !== ''))).length));
  } else  {
    handOverData.push((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.HO_Date !== ''))).length);
  }

  //console.log(handOverData);
return handOverData;
}
//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Pat Pass Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getPatPassData(posts) {

  var patPassData = [];

  if ( projectName === 'All Projects' ) {
    patPass = posts.filter((obj) => ((obj.PAT_Status === 'Pass'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length;
    patPassMinor = posts.filter((obj) => ((obj.PAT_Status === 'Pass with minor'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length;
    sarOnly = posts.filter((obj) => ((obj.PAT_Status === 'SAR Only'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length;
  } else  {
    patPass = (posts.filter((obj) => ((obj.Project) === projectName)))
    .filter((obj) => ((obj.PAT_Status === 'Pass'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length;
    patPassMinor = (posts.filter((obj) => ((obj.Project) === projectName)))
    .filter((obj) => ((obj.PAT_Status === 'Pass with minor'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length;
    sarOnly = (posts.filter((obj) => ((obj.Project) === projectName)))
    .filter((obj) => ((obj.PAT_Status === 'SAR Only'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length;
  }

  patPassData.push(patPass+patPassMinor+sarOnly);
  //console.log(patPassData);
  return patPassData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Get On Air Data to the Front End Squares of Mobitel Projects ---------------------
//---------------------------------------------------------------------------------------------------------------------------

function getOnAirData(posts) {

  var OnAirData = [];

  if ( projectName === 'All Projects' ) {
    OnAirData.push(posts.filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date !== ''))).length)
  } else  {
    OnAirData.push((posts.filter((obj) => ((obj.Project) === projectName)))
    .filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date !== ''))).length)
  }


  //console.log(OnAirData);
  return OnAirData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting On Hold Site Data to the Front End Squares of Mobitel Projects ------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getHoldSitesData(posts) {
  
  var holdData = [];

    if ( projectName === 'All Projects' ) {
      holdData.push(posts.filter((obj) => ((obj.HO_Date === ''))).length)
    } else  {
      holdData.push((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.HO_Date === ''))).length);
    }

  //console.log(holdData);
  return holdData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------Function for Getting Scope Data to the Front End Mobitel Projects Insights Project Completion Donut---------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectCompletionData(posts) {

  onAirSites = getOnAirData(posts),
  handOverSites = getHandOverData(posts),
  holdSites = getHoldSitesData(posts)

  const projectCompletionChartData = [];
  const completed = onAirSites[0];
  const pending = handOverSites - onAirSites;
  const hold = holdSites[0];

  projectCompletionChartData.push(completed, pending, hold);

  // console.log(projectCompletionChartData);
  return projectCompletionChartData;
}

//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Function for Getting Scope Data to the Front End Mobitel Projects Insights Sites On Air Donut -------
//---------------------------------------------------------------------------------------------------------------------------

function getSitesOnAirData(posts) {

  var sitesOnAir = [];

  if ( projectName === 'All Projects' ) {
    completed = posts.filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date !== ''))).length,
    pending = posts.filter((obj) => ((obj.On_Air_Status === 'Pending'))).length,
    rejected = posts.filter((obj) => ((obj.On_Air_Status === 'Hold'))).length
  } else  {
    completed = (posts.filter((obj) => ((obj.Project) === projectName)))
      .filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date !== ''))).length,
    pending = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Status === 'Pending'))).length,
    rejected = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Status === 'Hold'))).length
  }


  sitesOnAir.push(completed, pending, rejected);

  //console.log(sitesOnAir);
  return sitesOnAir;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting PAT Completion to the Front End Mobitel Projects Insights PAT Completion Donut-----------
//---------------------------------------------------------------------------------------------------------------------------

function getPATCompletionData(posts) {

  var patCompletionData = [];

  if (projectName === 'All Projects') {
    pass = posts.filter((obj) => ((obj.PAT_Status === 'Pass'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length,
    sarOnly = posts.filter((obj) => ((obj.PAT_Status === 'SAR Only'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length,
    passWM = posts.filter((obj) => ((obj.PAT_Status === 'Pass with minor'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length,

    submitted = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.PAT_Status === 'Submitted'))).length,
    pending = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.PAT_Status === 'Pending'))).length,
    rejected = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.PAT_Status === 'Rejected'))).length

  } else {
    pass = (posts.filter((obj) => ((obj.Project) === projectName)))
      .filter((obj) => ((obj.PAT_Status === 'Pass'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length,
    sarOnly = (posts.filter((obj) => ((obj.Project) === projectName)))
      .filter((obj) => ((obj.PAT_Status === 'SAR Only'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length,
    passWM = (posts.filter((obj) => ((obj.Project) === projectName)))
      .filter((obj) => ((obj.PAT_Status === 'Pass with minor'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length,

    submitted = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.PAT_Status === 'Submitted'))).length,
    pending = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.PAT_Status === 'Pending'))).length,
    rejected = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.PAT_Status === 'Rejected'))).length
  }


  patCompletionData.push(pass, passWM, sarOnly, submitted, pending, rejected);

  //console.log(patCompletionData);
  return patCompletionData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights SAR Donut chart ---------------
//---------------------------------------------------------------------------------------------------------------------------

function getSARData(posts) {

  var sarData = [];

  if (projectName === 'All Projects') {

    approved = posts.filter((obj) => ((obj.SAR_Status === 'Approved'))).filter((obj) => ((obj.SAR_Date !== ''))).length,
    patOnly = posts.filter((obj) => ((obj.SAR_Status === 'PAT Only'))).filter((obj) => ((obj.SAR_Date !== ''))).length,
    submitted = posts.filter((obj) => ((obj.SAR_Status === 'Submitted'))).length,
    pending = posts.filter((obj) => ((obj.SAR_Status === 'Pending'))).length,
    rejected = posts.filter((obj) => ((obj.SAR_Status === 'Rejected'))).length

  } else {

    approved = (posts.filter((obj) => ((obj.Project) === projectName)))
    .filter((obj) => ((obj.SAR_Status === 'Approved'))).filter((obj) => ((obj.SAR_Date !== ''))).length,
    patOnly = (posts.filter((obj) => ((obj.Project) === projectName)))
    .filter((obj) => ((obj.SAR_Status === 'PAT Only'))).filter((obj) => ((obj.SAR_Date !== ''))).length,
    submitted = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.SAR_Status === 'Submitted'))).length,
    pending = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.SAR_Status === 'Pending'))).length,
    rejected = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.SAR_Status === 'Rejected'))).length
  }

  sarData.push(approved, patOnly, submitted, pending, rejected);

   //console.log(sarData);
  return sarData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights Commissioning Donut -----------
//---------------------------------------------------------------------------------------------------------------------------

function getCommissioningData(posts) {

  var commissioningData = [];

  if (projectName === 'All Projects') {
    completed = posts.filter((obj) => ((obj.Commissioning_Status === 'Completed'))).filter((obj) => ((obj.Commisioned_Date !== ''))).length,
    pending = posts.filter((obj) => ((obj.Commissioning_Status === 'Pending'))).length,
    rejected = posts.filter((obj) => ((obj.Commissioning_Status === 'Hold'))).length

  } else {
    completed = (posts.filter((obj) => ((obj.Project) === projectName)))
      .filter((obj) => ((obj.Commissioning_Status === 'Completed'))).filter((obj) => ((obj.Commisioned_Date !== ''))).length,
    pending = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Commissioning_Status === 'Pending'))).length,
    rejected = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Commissioning_Status === 'Hold'))).length
  }

  commissioningData.push(completed, pending, rejected);

  //console.log(commissioningData);
  return commissioningData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights Installation Donut -----------
//---------------------------------------------------------------------------------------------------------------------------

function getInstallationData(posts) {

  var installationData = [];

  if (projectName === 'All Projects') {
    ITCnPC = posts.filter((obj) => ((obj.Installation_Status === 'Completed'))).filter((obj) => ((obj.Installation_Date !== ''))).length,
    ITCnPP = posts.filter((obj) => ((obj.Installation_Status === 'TX Completed-Power Pending'))).filter((obj) => ((obj.Installation_Date !== ''))).length,
    ITPnPC = posts.filter((obj) => ((obj.Installation_Status === 'TX Pending-Power Completed'))).filter((obj) => ((obj.Installation_Date !== ''))).length,
    ITPnPP = posts.filter((obj) => ((obj.Installation_Status === 'TX Pending-Power Pending'))).length,
    IPending = posts.filter((obj) => ((obj.Installation_Status === 'Installation Pending'))).length,
    IHold = posts.filter((obj) => ((obj.Installation_Status === 'Installation Hold'))).length

  } else {
    ITCnPC = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Installation_Status === 'Completed'))).filter((obj) => ((obj.Installation_Date !== ''))).length,
    ITCnPP = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Installation_Status === 'TX Completed-Power Pending'))).filter((obj) => ((obj.Installation_Date !== ''))).length,
    ITPnPC = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Installation_Status === 'TX Pending-Power Completed'))).filter((obj) => ((obj.Installation_Date !== ''))).length,
    ITPnPP = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Installation_Status === 'TX Pending-Power Pending'))).length,
    IPending = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Installation_Status === 'Installation Pending'))).length,
    IHold = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Installation_Status === 'Installation Hold'))).length
  }

  installationData.push(ITCnPC, ITCnPP, ITPnPC, ITPnPP, IPending, IHold);

  //console.log(installationData);
  return installationData;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------ Function for Getting Pat Completion to the Front End Mobitel Projects Insights Mobilization Donut ------------
//---------------------------------------------------------------------------------------------------------------------------

function getMobilizedData(posts) {

  var mobilizedData = [];

  if (projectName === 'All Projects') {
    Completed = posts.filter((obj) => ((obj.Mobilization_Status === 'Completed'))).filter((obj) => ((obj.Mobilized_Date !== ''))).length,
    Pending = posts.filter((obj) => ((obj.Mobilization_Status === 'Pending'))).length,
    Hold = posts.filter((obj) => ((obj.Mobilization_Status === 'Hold'))).length

  } else {
    Completed = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Mobilization_Status === 'Completed'))).filter((obj) => ((obj.Mobilized_Date !== ''))).length,
    Pending = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Mobilization_Status === 'Pending'))).length,
    Hold = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.Mobilization_Status === 'Hold'))).length
  }

  mobilizedData.push(Completed, Pending, Hold);

  //console.log(mobilizedData);
  return mobilizedData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------- Functions for Getting Last Week Progress Graph Data to the Front End of Mobitel Project Databases Insights------
//---------------------------------------------------------------------------------------------------------------------------

function getWeeklyProgressData(posts) {
  var onairData = []

  var lastWeekDates = [];
  var yesterdayDate = [];
  var yesterdayMonth = [];
  var yesterdayYear = [];

    for (var i = 0; i < 7; i++) {

    yesterdayDate[i] = new Date(new Date().setDate(new Date().getDate() - i)).getDate();
    yesterdayMonth[i] = ('0'+(new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)).slice(-2);
    yesterdayYear[i] = new Date(new Date().setDate(new Date().getDate() - i)).getFullYear();

    lastWeekDates[i] = yesterdayYear[i] +"-"+yesterdayMonth[i] +"-"+ yesterdayDate[i];

    }
  lastWeekDates.reverse();

  // console.log(lastWeekDates);
  // lastWeekDates = ['2022-01-10','2022-01-11','2022-01-12','2022-01-13','2022-01-14','2022-01-15','2022-01-16']

  if (projectName === 'All Projects') {
    for (var i = 0; i < 7; i++) {
      onairData[i] = posts.filter((obj) => ((obj.On_Air_Date.toString()) === lastWeekDates[i])).length;
    }
  } else {
    for (var i = 0; i < 7; i++) {
      onairData[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date.toString()) === lastWeekDates[i])).length;
    }
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------
    // console.log(onairData);

    let onAirArray = onairData;
    // console.log(onAirArray);

    let weeklyProgressData = [];
    weeklyProgressData.push(
      {name: 'Completed', type: 'column', data: onAirArray},
      {name: 'Targeted', type: 'column', data: [4, 5, 1, 7, 2, 3, 2]}
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

    yesterdayDate[i] = new Date(new Date().setDate(new Date().getDate() - i)).getDate();
    yesterdayMonth[i] = ('0'+(new Date(new Date().setDate(new Date().getDate() - i)).getMonth() + 1)).slice(-2);
    yesterdayYear[i] = new Date(new Date().setDate(new Date().getDate() - i)).getFullYear();

    lastWeekDates[i] = yesterdayYear[i] +"-"+yesterdayMonth[i] +"-"+ yesterdayDate[i];

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


  if (projectName === 'All Projects') {

    for (var i = 0; i < 7; i++) {
      onairData[i] = posts.filter((obj) => ((obj.On_Air_Date.toString()) === lastWeekDates[i])).length
    }
    //console.log(onairData);
      //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      for (var j = 0; j < onairData[0] ; j++) {
        onairSitesId1.push((posts.filter((obj) => ((obj.On_Air_Date) === lastWeekDates[0])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[1] ; j++) {
        onairSitesId2.push((posts.filter((obj) => ((obj.On_Air_Date) === lastWeekDates[1])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[2] ; j++) {
        onairSitesId3.push((posts.filter((obj) => ((obj.On_Air_Date) === lastWeekDates[2])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[3] ; j++) {
        onairSitesId4.push((posts.filter((obj) => ((obj.On_Air_Date) === lastWeekDates[3])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[4] ; j++) {
        onairSitesId5.push((posts.filter((obj) => ((obj.On_Air_Date) === lastWeekDates[4])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[5] ; j++) {
        onairSitesId6.push((posts.filter((obj) => ((obj.On_Air_Date) === lastWeekDates[5])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[6] ; j++) {
        onairSitesId7.push((posts.filter((obj) => ((obj.On_Air_Date) === lastWeekDates[6])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}

  } else {
    for (var i = 0; i < 7; i++) {
      onairData[i] = (posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date.toString()) === lastWeekDates[i])).length
    }
    // console.log(onairData);
      //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      for (var j = 0; j < onairData[0] ; j++) {
        onairSitesId1.push(((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date) === lastWeekDates[0])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[1] ; j++) {
        onairSitesId2.push(((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date) === lastWeekDates[1])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[2] ; j++) {
        onairSitesId3.push(((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date) === lastWeekDates[2])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[3] ; j++) {
        onairSitesId4.push(((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date) === lastWeekDates[3])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[4] ; j++) {
        onairSitesId5.push(((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date) === lastWeekDates[4])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[5] ; j++) {
        onairSitesId6.push(((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date) === lastWeekDates[5])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
      for (var j = 0; j < onairData[6] ; j++) {
        onairSitesId7.push(((posts.filter((obj) => ((obj.Project) === projectName))).filter((obj) => ((obj.On_Air_Date) === lastWeekDates[6])).filter((obj) => (obj.Site_ID)))[j].Site_ID);}
  }


    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    weeklyOnAirSitesID.push(onairSitesId1,onairSitesId2,onairSitesId3,onairSitesId4,onairSitesId5,onairSitesId6,onairSitesId7);
    
    //console.log(projectName);
    //console.log(weeklyOnAirSitesID);
  return weeklyOnAirSitesID;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;
