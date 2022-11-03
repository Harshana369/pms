const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");


// ---------------------- Get sites data to the graphs  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesMilestoneData', async (req, res, next) => {
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
      existingPosts:posts,

      vendorProjectsAllMilestoneData: getVendorProjectsAllMilestoneData(posts),

      vendorProjectsTSSRMilestoneData: getVendorProjectsTSSRMilestoneData(posts), // Tssr data for Vendor milestone graphs in the front end
      vendorProjectsPOMilestoneData: getVendorProjectsPOMilestoneData(posts), // PO data for Vendor milestone graphs in the front end
      vendorProjectsLogisticsMilestoneData: getVendorProjectsLogisticsMilestoneData(posts), // Logistics data for Vendor milestone graphs in the front end
      vendorProjectsDependancyMilestoneData: getVendorProjectsDependancyMilestoneData(posts), // Dependancy data for Vendor milestone graphs in the front end
      vendorProjectsImplemenationMilestoneData: getVendorProjectsImplemenationMilestoneData(posts), // Implemenation data for Vendor milestone graphs in the front end
      vendorProjectsCapitalizationMilestoneData: getVendorProjectsCapitalizationMilestoneData(posts) // Capitalization data for Vendor milestone graphs in the front end
    });
  });
});

//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects TSSR milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getVendorProjectsTSSRMilestoneData(posts) {

  Scope = posts.filter((obj) => ((obj.HO_Date))).length,
  PRSubmitted = posts.filter((obj) => ((obj.PR_Submitted_for_TSS))).length,
  PRRaised = posts.filter((obj) => ((obj.PR_Raised_for_TSS))).length,
  POIssued = posts.filter((obj) => ((obj.PO_Issued_for_TSS))).length,
  TSSHOData = posts.filter((obj) => ((obj.TSS_HO))).length,
  TSSRSubmitted = posts.filter((obj) => ((obj.TSSR_Submitted))).length,
  TSSRapproved = posts.filter((obj) => ((obj.TSSR_Approved))).length,
  BOQsubmitted = posts.filter((obj) => ((obj.BOQ_Submitted))).length

  let TSSRcompletedData = [];
  let TSSRscopeData = [];
  let TSSRdataArray = [];
  TSSRcompletedData.push(Scope, PRSubmitted, PRRaised, POIssued, TSSHOData, TSSRSubmitted, TSSRapproved, BOQsubmitted);
  TSSRscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  TSSRdataArray.push(TSSRcompletedData,TSSRscopeData);

  // console.log(TSSRdataArray);
  return TSSRdataArray;
}
//-------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects PO milestones to the front end  -------------------------
//-------------------------------------------------------------------------------------------------------------------------

function getVendorProjectsPOMilestoneData(posts) {

  Scope = posts.filter((obj) => ((obj.HO_Date))).length,
  ImpHO = posts.filter((obj) => ((obj.Imp_HO))).length,
  PRSubmissionforImp = posts.filter((obj) => ((obj.PR_Submission_for_Imp))).length,
  PRRaisedforImp = posts.filter((obj) => ((obj.PR_Raised_for_Imp))).length,
  POIssuedforImp = posts.filter((obj) => ((obj.PO_Issued_for_Imp))).length,
  PRsubforSupply = posts.filter((obj) => ((obj.PR_Sub_for_supply))).length,
  PRRaisedforSupply = posts.filter((obj) => ((obj.PR_Raised_for_supply))).length,
  POIssuedforSupply = posts.filter((obj) => ((obj.PO_Issued_for_supply))).length

  let POcompletedData = [];
  let POscopeData = [];
  let POdataArray = [];
  POcompletedData.push(ImpHO, PRSubmissionforImp, PRRaisedforImp, POIssuedforImp, PRsubforSupply, PRRaisedforSupply, POIssuedforSupply);
  POscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  POdataArray.push(POcompletedData,POscopeData);

  // console.log(POdataArray);
  return POdataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Logistics milestones to the front end  --------------------
//---------------------------------------------------------------------------------------------------------------------------

function getVendorProjectsLogisticsMilestoneData(posts) {

  Scope = posts.filter((obj) => ((obj.HO_Date))).length,

  PISubmitted = posts.filter((obj) => ((obj.PI_Submitted))).length,
  PIApproved = posts.filter((obj) => ((obj.PI_Approved))).length,
  TRCCompleted = posts.filter((obj) => ((obj.TRC_Completed))).length,
  BOICompleted = posts.filter((obj) => ((obj.BOI_Completed))).length,
  ICLCompleted = posts.filter((obj) => ((obj.ICL_Completed))).length,
  LCIssued = posts.filter((obj) => ((obj.LC_Issued))).length,
  Shipped = posts.filter((obj) => ((obj.Shipped))).length
  ReceivedatPort = posts.filter((obj) => ((obj.Received_at_port))).length,
  DeliveredtoWH = posts.filter((obj) => ((obj.Delivered_to_WH))).length

  let LogisticscompletedData = [];
  let LogisticsscopeData = [];
  let LogisticsdataArray = [];
  LogisticscompletedData.push(PISubmitted, PIApproved, TRCCompleted, BOICompleted, ICLCompleted, LCIssued, Shipped, ReceivedatPort, DeliveredtoWH);
  LogisticsscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  LogisticsdataArray.push(LogisticscompletedData,LogisticsscopeData);

  // console.log(LogisticsdataArray);
  return LogisticsdataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Dependancy milestones to the front end  -------------------
//---------------------------------------------------------------------------------------------------------------------------

function getVendorProjectsDependancyMilestoneData(posts) {

  Scope = posts.filter((obj) => ((obj.HO_Date))).length,

  SAQdata= posts.filter((obj) => ((obj.SAQ_Clearance_Date))).length,
  Infra = posts.filter((obj) => ((obj.PI_Approved))).length, // ------------------------ not defined ----------
  Civil = posts.filter((obj) => ((obj.Civil_PAT_Date))).length,
  Power = posts.filter((obj) => ((obj.Power_Connected_Date))).length,
  TXdata = posts.filter((obj) => ((obj.TX_Connected_Date))).length,
  MCWrequesteddata = posts.filter((obj) => ((obj.MCW_Requested_Date))).length, // ------ Used as MCW scope ----
  MCWcompletedata = posts.filter((obj) => ((obj.MCW_Completed_Date))).length,
  Equipments = posts.filter((obj) => ((obj.Shipped))).length // ------------------------ not defined ----------

  let DependancycompletedData = [];
  let DependancyscopeData = [];
  let DependancydataArray = [];
  DependancycompletedData.push(SAQdata, Infra, Civil, Power, TXdata, MCWcompletedata, Equipments);
  DependancyscopeData.push(Scope, Scope, Scope, Scope, Scope, MCWrequesteddata, Scope);
  DependancydataArray.push(DependancycompletedData,DependancyscopeData);

  // console.log(DependancydataArray);
  return DependancydataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Implemenation milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getVendorProjectsImplemenationMilestoneData(posts) {

  Scope = posts.filter((obj) => ((obj.HO_Date))).length,

  Installed= posts.filter((obj) => ((obj.Installation_Status === 'Completed'))).filter((obj) => ((obj.Installation_Date !== ''))).length;
  Commissioned = posts.filter((obj) => ((obj.Commissioning_Status === 'Completed'))).filter((obj) => ((obj.Commisioned_Date !== ''))).length;
  PATpass = posts.filter((obj) => ((obj.PAT_Status === 'Pass'))).filter((obj) => ((obj.PAT_Pass_Date !== ''))).length;
  SARApprovedScope = posts.filter((obj) => ((obj.SAR_Status === 'Approved'))).filter((obj) => ((obj.SAR_Date !== ''))).length;
  SSVchecklist = posts.filter((obj) => ((obj.Check_List_Verified))).length,
  OnAir = posts.filter((obj) => ((obj.On_Air_Status === 'Completed'))).filter((obj) => ((obj.On_Air_Date !== ''))).length;
  Reconciled = posts.filter((obj) => ((obj.Reconciled))).length

  let ImplemenationcompletedData = [];
  let ImplemenationscopeData = [];
  let ImplemenationdataArray = [];

  ImplemenationcompletedData.push(Installed, Commissioned, PATpass, SARApprovedScope, SSVchecklist, OnAir, Reconciled);
  ImplemenationscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  ImplemenationdataArray.push(ImplemenationcompletedData,ImplemenationscopeData);

  // console.log(ImplemenationdataArray);
  return ImplemenationdataArray;
}
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects Capitalization milestones to the front end  -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getVendorProjectsCapitalizationMilestoneData(posts) {

  Scope = posts.filter((obj) => ((obj.HO_Date))).length,

  SupplyHWPACSubmitted= posts.filter((obj) => ((obj.Supply_HW_PAC_Submitted))).length;
  SupplyHWPACApproved = posts.filter((obj) => ((obj.Supply_HW_PAC_Approved))).length;
  ImpPACSubmitted = posts.filter((obj) => ((obj.Imp_PAC_Submitted))).length;
  ImpPACApproved = posts.filter((obj) => ((obj.Imp_PAC_Approved))).length;
  SupplySWPACSubmitted = posts.filter((obj) => ((obj.Supply_SW_PAC_Submitted))).length,
  SupplySWPACApproved = posts.filter((obj) => ((obj.Supply_SW_PAC_Approved))).length;
  CapitalizationSupplyHW = posts.filter((obj) => ((obj.Capitalization_Supply_HW))).length,
  CapitalizationImplimentation = posts.filter((obj) => ((obj.Capitalization_Imp))).length;
  CapitalizationSupplySW = posts.filter((obj) => ((obj.Capitalization_Supply_SW))).length;

  let CapitalizationcompletedData = [];
  let CapitalizationscopeData = [];
  let CapitalizationdataArray = [];

  CapitalizationcompletedData.push(SupplyHWPACSubmitted, SupplyHWPACApproved, ImpPACSubmitted, ImpPACApproved, SupplySWPACSubmitted, SupplySWPACApproved, CapitalizationSupplyHW, CapitalizationImplimentation, CapitalizationSupplySW);
  CapitalizationscopeData.push(Scope, Scope, Scope, Scope, Scope, Scope, Scope, Scope, Scope);
  CapitalizationdataArray.push(CapitalizationcompletedData,CapitalizationscopeData);

  // console.log(CapitalizationdataArray);
  return CapitalizationdataArray;
}
//----------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//------------------------ Functions for getting Mobitel projects All milestones to the front end graph -------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getVendorProjectsAllMilestoneData(posts) {

  let TSSRdataArray = getVendorProjectsTSSRMilestoneData(posts);
  let POdataArray = getVendorProjectsPOMilestoneData(posts);
  let LogisticsdataArray = getVendorProjectsLogisticsMilestoneData(posts);
  let DependancydataArray = getVendorProjectsDependancyMilestoneData(posts);
  let ImplementationdataArray = getVendorProjectsImplemenationMilestoneData(posts);
  let CapitalizationdataArray =  getVendorProjectsCapitalizationMilestoneData(posts);
  const Allmilestones = [...TSSRdataArray[0], ...POdataArray[0], ...LogisticsdataArray[0], ...DependancydataArray[0], ...ImplementationdataArray[0], ...CapitalizationdataArray[0]];
  
  // console.log(Allmilestones);
  return Allmilestones;
}
//----------------------------------------------------------------------------------------------------------------------------

module.exports = router;
