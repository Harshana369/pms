const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");


//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get Vendor projects pending tasks data to the data grids  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesPendingTasks', async (req, res, next) => {
    // console.log(req.query.Project);
    const Site_Engineer = req.query.Site_Engineer;
    const Project = req.query.Project;

    let reqQuery = [];
    if (!req.query.Project && !req.query.Site_Engineer) {
        reqQuery = {};
    } else if (req.query.Project && req.query.Project === 'All Vendor Projects' && !req.query.Site_Engineer) {
        reqQuery = {};
    } else if (req.query.Project && req.query.Project !== 'All Vendor Projects' && !req.query.Site_Engineer) {
        reqQuery = { Project };
    } else if (req.query.Site_Engineer && req.query.Site_Engineer === 'All Site Engineers' && !req.query.Project) {
        reqQuery = {};
    } else if (req.query.Site_Engineer && req.query.Site_Engineer !== 'All Site Engineers' && !req.query.Project) {
        reqQuery = { Site_Engineer };
    } else if (req.query.Project === 'All Vendor Projects' && req.query.Site_Engineer === 'All Site Engineers') {
        reqQuery = {};
    } else if (req.query.Project === 'All Vendor Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
        reqQuery = { Site_Engineer };
    } else if (req.query.Site_Engineer === 'All Site Engineers' && req.query.Project !== 'All Vendor Projects') {
        reqQuery = { Project };
    } else if (req.query.Project !== 'All Vendor Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
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
            HOPendingTasks: getHOPendingTasks(posts),
            AssignPendingTasks: getAssignPendingTasks(posts),
            TeamAllocationPendingTasks: getTeamAllocationPendingTasks(posts),
            DependenciesPendingTasks: getDependenciesPendingTasks(posts),
            PRPOProgressPendingTasks: getPRPOProgressPendingTasks(posts),
            LogisticsPendingTasks: getLogisticsPendingTasks(posts),
            ImplementationPendingTasks: getImplementationPendingTasks(posts),
            AcceptancePendingTasks: getAcceptancePendingTasks(posts),
            PaymentPendingTasks: getPaymentPendingTasks(posts),
        });
    });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get Huawei projects pending tasks data to the data grids  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesPendingTasks/Huawei', async (req, res, next) => {
    // console.log(req.query.Project);
    const Site_Engineer = req.query.Site_Engineer;
    const Project = req.query.Project;
    const Implementation_By = req.query.Implementation_By;

    let reqQuery = [];
    if (!req.query.Project && !req.query.Site_Engineer) {
        reqQuery = { Implementation_By };
    } else if (req.query.Project && req.query.Project === 'All Huawei Projects' && !req.query.Site_Engineer) {
        reqQuery = { Implementation_By };
    } else if (req.query.Project && req.query.Project !== 'All Huawei Projects' && !req.query.Site_Engineer) {
        reqQuery = { Implementation_By, Project };
    } else if (req.query.Site_Engineer && req.query.Site_Engineer === 'All Site Engineers' && !req.query.Project) {
        reqQuery = { Implementation_By };
    } else if (req.query.Site_Engineer && req.query.Site_Engineer !== 'All Site Engineers' && !req.query.Project) {
        reqQuery = { Implementation_By, Site_Engineer };
    } else if (req.query.Project === 'All Huawei Projects' && req.query.Site_Engineer === 'All Site Engineers') {
        reqQuery = { Implementation_By };
    } else if (req.query.Project === 'All Huawei Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
        reqQuery = { Implementation_By, Site_Engineer };
    } else if (req.query.Site_Engineer === 'All Site Engineers' && req.query.Project !== 'All Huawei Projects') {
        reqQuery = { Implementation_By, Project };
    } else if (req.query.Project !== 'All Huawei Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
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
            HOPendingTasks: getHOPendingTasks(posts),
            AssignPendingTasks: getAssignPendingTasks(posts),
            TeamAllocationPendingTasks: getTeamAllocationPendingTasks(posts),
            DependenciesPendingTasks: getDependenciesPendingTasks(posts),
            PRPOProgressPendingTasks: getPRPOProgressPendingTasks(posts),
            LogisticsPendingTasks: getLogisticsPendingTasks(posts),
            ImplementationPendingTasks: getImplementationPendingTasks(posts),
            AcceptancePendingTasks: getAcceptancePendingTasks(posts),
            PaymentPendingTasks: getPaymentPendingTasks(posts),
        });
    });
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get ZTE projects pending tasks data to the data grids  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesPendingTasks/ZTE', async (req, res, next) => {
    // console.log(req.query.Project);
    const Site_Engineer = req.query.Site_Engineer;
    const Project = req.query.Project;
    const Implementation_By = req.query.Implementation_By;

    let reqQuery = [];
    if (!req.query.Project && !req.query.Site_Engineer) {
        reqQuery = { Implementation_By };
    } else if (req.query.Project && req.query.Project === 'All ZTE Projects' && !req.query.Site_Engineer) {
        reqQuery = { Implementation_By };
    } else if (req.query.Project && req.query.Project !== 'All ZTE Projects' && !req.query.Site_Engineer) {
        reqQuery = { Implementation_By, Project };
    } else if (req.query.Site_Engineer && req.query.Site_Engineer === 'All Site Engineers' && !req.query.Project) {
        reqQuery = { Implementation_By };
    } else if (req.query.Site_Engineer && req.query.Site_Engineer !== 'All Site Engineers' && !req.query.Project) {
        reqQuery = { Implementation_By, Site_Engineer };
    } else if (req.query.Project === 'All ZTE Projects' && req.query.Site_Engineer === 'All Site Engineers') {
        reqQuery = { Implementation_By };
    } else if (req.query.Project === 'All ZTE Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
        reqQuery = { Implementation_By, Site_Engineer };
    } else if (req.query.Site_Engineer === 'All Site Engineers' && req.query.Project !== 'All ZTE Projects') {
        reqQuery = { Implementation_By, Project };
    } else if (req.query.Project !== 'All ZTE Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
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
            HOPendingTasks: getHOPendingTasks(posts),
            AssignPendingTasks: getAssignPendingTasks(posts),
            TeamAllocationPendingTasks: getTeamAllocationPendingTasks(posts),
            DependenciesPendingTasks: getDependenciesPendingTasks(posts),
            PRPOProgressPendingTasks: getPRPOProgressPendingTasks(posts),
            LogisticsPendingTasks: getLogisticsPendingTasks(posts),
            ImplementationPendingTasks: getImplementationPendingTasks(posts),
            AcceptancePendingTasks: getAcceptancePendingTasks(posts),
            PaymentPendingTasks: getPaymentPendingTasks(posts),
        });
    });
});
//---------------------------------------------------------------------------------------------------------------------------
//--------------------- Getting Pending Handover Details to the Handover Pending tasks Table   ---------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getHOPendingTasks(posts) {

    let PendingHandoverDetails = [];
    PendingHandoverDetails = posts.filter((obj) => ((
        obj.Planning_ID === undefined || obj.Planning_ID === '' || obj.Planning_ID === 'Invalid date' || obj.Planning_ID === null ||
        obj.Implementation_By === undefined || obj.Implementation_By === '' || obj.Implementation_By === 'Invalid date' || obj.Implementation_By === null ||
        obj.Project === undefined || obj.Project === '' || obj.Project === 'Invalid date' || obj.Project === null ||
        obj.Site_ID === undefined || obj.Site_ID === '' || obj.Site_ID === 'Invalid date' || obj.Site_ID === null ||
        obj.Site_Name === undefined || obj.Site_Name === '' || obj.Site_Name === 'Invalid date' || obj.Site_Name === null ||
        obj.HO_Date === undefined || obj.HO_Date === '' || obj.HO_Date === 'Invalid date' || obj.HO_Date === null ||
        obj.Scope === undefined || obj.Scope === '' || obj.Scope === 'Invalid date' || obj.Scope === null ||
        obj.New_RAT === undefined || obj.New_RAT === '' || obj.New_RAT === 'Invalid date' || obj.New_RAT === null ||
        obj.New_Sector === undefined || obj.New_Sector === '' || obj.New_Sector === 'Invalid date' || obj.New_Sector === null ||
        obj.Approval_Status === undefined || obj.Approval_Status === '' || obj.Approval_Status === 'Invalid date' || obj.Approval_Status === null ||
        obj.Approval_Ref === undefined || obj.Approval_Ref === '' || obj.Approval_Ref === 'Invalid date' || obj.Approval_Ref === null ||
        obj.IMP_Scenario === undefined || obj.IMP_Scenario === '' || obj.IMP_Scenario === 'Invalid date' || obj.IMP_Scenario === null ||
        obj.blank1 === undefined || obj.blank1 === '' || obj.blank1 === 'Invalid date' || obj.blank1 === null ||
        obj.blank2 === undefined || obj.blank2 === '' || obj.blank2 === 'Invalid date' || obj.blank2 === null ||
        obj.blank3 === undefined || obj.blank3 === '' || obj.blank3 === 'Invalid date' || obj.blank3 === null ||
        obj.Tilt === undefined || obj.Tilt === '' || obj.Tilt === 'Invalid date' || obj.Tilt === null ||
        obj.Azimuth === undefined || obj.Azimuth === '' || obj.Azimuth === 'Invalid date' || obj.Azimuth === null ||
        obj.Antenna_Height === undefined || obj.Antenna_Height === '' || obj.Antenna_Height === 'Invalid date' || obj.Antenna_Height === null ||
        obj.New_RRU_Type === undefined || obj.New_RRU_Type === '' || obj.New_RRU_Type === 'Invalid date' || obj.New_RRU_Type === null ||
        obj.RRU_From === undefined || obj.RRU_From === '' || obj.RRU_From === 'Invalid date' || obj.RRU_From === null ||
        obj.New_BTS_Type === undefined || obj.New_BTS_Type === '' || obj.New_BTS_Type === 'Invalid date' || obj.New_BTS_Type === null ||
        obj.BTS_From === undefined || obj.BTS_From === '' || obj.BTS_From === 'Invalid date' || obj.BTS_From === null ||
        obj.New_Antenna_Type === undefined || obj.New_Antenna_Type === '' || obj.New_Antenna_Type === 'Invalid date' || obj.New_Antenna_Type === null ||
        obj.Antenna_From === undefined || obj.Antenna_From === '' || obj.Antenna_From === 'Invalid date' || obj.Antenna_From === null ||
        obj.Cards_Type_n_From === undefined || obj.Cards_Type_n_From === '' || obj.Cards_Type_n_From === 'Invalid date' || obj.Cards_Type_n_From === null ||
        obj.Battery_count_n_From === undefined || obj.Battery_count_n_From === '' || obj.Battery_count_n_From === 'Invalid date' || obj.Battery_count_n_From === null ||
        obj.Mobitel_Region === undefined || obj.Mobitel_Region === '' || obj.Mobitel_Region === 'Invalid date' || obj.Mobitel_Region === null ||
        obj.Planning_Engineer === undefined || obj.Planning_Engineer === '' || obj.Planning_Engineer === 'Invalid date' || obj.Planning_Engineer === null ||
        obj.On_Air_Target === undefined || obj.On_Air_Target === '' || obj.On_Air_Target === 'Invalid date' || obj.On_Air_Target === null ||
        obj.Planning_Comments === undefined || obj.Planning_Comments === '' || obj.Planning_Comments === 'Invalid date' || obj.Planning_Comments === null
    )));

    // console.log(PendingHandoverDetails.length);
    return PendingHandoverDetails;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Pending Work Allocation (Assign) Details to the Work Allocation Pending tasks Table  ------------
//---------------------------------------------------------------------------------------------------------------------------

function getAssignPendingTasks(posts) {

    let PendingAssignDetails = [];
    PendingAssignDetails = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null) &&
        (
            obj.Site_Engineer === '' || obj.Site_Engineer === 'Invalid date' || obj.Site_Engineer === null || obj.Site_Engineer === undefined ||
            obj.Assigned_Date === '' || obj.Assigned_Date === 'Invalid date' || obj.Assigned_Date === null || obj.Assigned_Date === undefined ||
            obj.Special_Tag === '' || obj.Special_Tag === 'Invalid date' || obj.Special_Tag === null || obj.Special_Tag === undefined ||
            obj.Coordinator_Comments === '' || obj.Coordinator_Comments === 'Invalid date' || obj.Coordinator_Comments === null || obj.Coordinator_Comments === undefined)
    )));

    // console.log(PendingAssignDetails.length);
    return PendingAssignDetails;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Pending Team Allocation Details to the Team Allocation Pending tasks Table  ------------
//---------------------------------------------------------------------------------------------------------------------------

function getTeamAllocationPendingTasks(posts) {

    let PendingTeamAllocationDetails = [];
    PendingTeamAllocationDetails = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null &&
            obj.Site_Engineer !== undefined && obj.Site_Engineer !== '' && obj.Site_Engineer !== 'Invalid date' && obj.Site_Engineer !== null &&
            obj.Assigned_Date !== undefined && obj.Assigned_Date !== '' && obj.Assigned_Date !== 'Invalid date' && obj.Assigned_Date !== null &&
            obj.Special_Tag !== undefined && obj.Special_Tag !== '' && obj.Special_Tag !== 'Invalid date' && obj.Special_Tag !== null &&
            obj.Coordinator_Comments !== undefined && obj.Coordinator_Comments !== '' && obj.Coordinator_Comments !== 'Invalid date' && obj.Coordinator_Comments !== null) &&
        (
            obj.Sub_Contractor === '' || obj.Sub_Contractor === 'Invalid date' || obj.Sub_Contractor === null || obj.Sub_Contractor === undefined ||
            obj.Sub_Contractor_Remarks === '' || obj.Sub_Contractor_Remarks === 'Invalid date' || obj.Sub_Contractor_Remarks === null || obj.Sub_Contractor_Remarks === undefined)
    )));

    // console.log(PendingTeamAllocationDetails.length);
    return PendingTeamAllocationDetails;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Pending Dependencies tasks to the Work Dependencies Pending tasks Table  ------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getDependenciesPendingTasks(posts) {

    let PendingDependenciesDetails = [];
    PendingDependenciesDetails = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null &&
            obj.Site_Engineer !== undefined && obj.Site_Engineer !== '' && obj.Site_Engineer !== 'Invalid date' && obj.Site_Engineer !== null &&
            obj.Assigned_Date !== undefined && obj.Assigned_Date !== '' && obj.Assigned_Date !== 'Invalid date' && obj.Assigned_Date !== null &&
            obj.Special_Tag !== undefined && obj.Special_Tag !== '' && obj.Special_Tag !== 'Invalid date' && obj.Special_Tag !== null &&
            obj.Coordinator_Comments !== undefined && obj.Coordinator_Comments !== '' && obj.Coordinator_Comments !== 'Invalid date' && obj.Coordinator_Comments !== null) &&
        (
            obj.Dependencies_On_Air_Target === '' || obj.Dependencies_On_Air_Target === 'Invalid date' || obj.Dependencies_On_Air_Target === null || obj.Dependencies_On_Air_Target === undefined ||
            obj.Civil_PAT_Date === '' || obj.Civil_PAT_Date === 'Invalid date' || obj.Civil_PAT_Date === null || obj.Civil_PAT_Date === undefined ||
            obj.SAQ_Clearance_Date === '' || obj.SAQ_Clearance_Date === 'Invalid date' || obj.SAQ_Clearance_Date === null || obj.SAQ_Clearance_Date === undefined ||
            obj.Supply_BOQ_Submitted === '' || obj.Supply_BOQ_Submitted === 'Invalid date' || obj.Supply_BOQ_Submitted === null || obj.Supply_BOQ_Submitted === undefined ||
            obj.Supply_BOQ_Approved === '' || obj.Supply_BOQ_Approved === 'Invalid date' || obj.Supply_BOQ_Approved === null || obj.Supply_BOQ_Approved === undefined ||
            obj.Approval_Received_Date === '' || obj.Approval_Received_Date === 'Invalid date' || obj.Approval_Received_Date === null || obj.Approval_Received_Date === undefined)
    )));

    // console.log(PendingDependenciesDetails.length);
    return PendingDependenciesDetails;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Pending PR/PO Progress tasks to the Work PR/PO Progress Pending tasks Table  --------------------
//---------------------------------------------------------------------------------------------------------------------------

function getPRPOProgressPendingTasks(posts) {

    let PendingPRPOProgressDetails = [];
    PendingPRPOProgressDetails = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null &&
            obj.Site_Engineer !== undefined && obj.Site_Engineer !== '' && obj.Site_Engineer !== 'Invalid date' && obj.Site_Engineer !== null &&
            obj.Assigned_Date !== undefined && obj.Assigned_Date !== '' && obj.Assigned_Date !== 'Invalid date' && obj.Assigned_Date !== null &&
            obj.Special_Tag !== undefined && obj.Special_Tag !== '' && obj.Special_Tag !== 'Invalid date' && obj.Special_Tag !== null &&
            obj.Coordinator_Comments !== undefined && obj.Coordinator_Comments !== '' && obj.Coordinator_Comments !== 'Invalid date' && obj.Coordinator_Comments !== null) &&
        (
            obj.Supply_PR_Submitted === '' || obj.Supply_PR_Submitted === 'Invalid date' || obj.Supply_PR_Submitted === null || obj.Supply_PR_Submitted === undefined ||
            obj.Supply_PR_Status === '' || obj.Supply_PR_Status === 'Invalid date' || obj.Supply_PR_Status === null || obj.Supply_PR_Status === undefined ||
            obj.Supply_PR_Approved_Date === '' || obj.Supply_PR_Approved_Date === 'Invalid date' || obj.Supply_PR_Approved_Date === null || obj.Supply_PR_Approved_Date === undefined ||
            obj.Supply_PR_Number === '' || obj.Supply_PR_Number === 'Invalid date' || obj.Supply_PR_Number === null || obj.Supply_PR_Number === undefined ||
            obj.Supply_PR_Raise === '' || obj.Supply_PR_Raise === 'Invalid date' || obj.Supply_PR_Raise === null || obj.Supply_PR_Raise === undefined ||
            obj.Supply_PO_Number === '' || obj.Supply_PO_Number === 'Invalid date' || obj.Supply_PO_Number === null || obj.Supply_PO_Number === undefined ||
            obj.Supply_PO_Issued === '' || obj.Supply_PO_Issued === 'Invalid date' || obj.Supply_PO_Issued === null || obj.Supply_PO_Issued === undefined ||
            obj.IMP_PR_Submitted === '' || obj.IMP_PR_Submitted === 'Invalid date' || obj.IMP_PR_Submitted === null || obj.IMP_PR_Submitted === undefined ||
            obj.IMP_PR_Approved_Date === '' || obj.IMP_PR_Approved_Date === 'Invalid date' || obj.IMP_PR_Approved_Date === null || obj.IMP_PR_Approved_Date === undefined ||
            obj.IMP_PR_Number === '' || obj.IMP_PR_Number === 'Invalid date' || obj.IMP_PR_Number === null || obj.IMP_PR_Number === undefined ||
            obj.IMP_PR_Raised === '' || obj.IMP_PR_Raised === 'Invalid date' || obj.IMP_PR_Raised === null || obj.IMP_PR_Raised === undefined ||
            obj.IMP_PO_Number === '' || obj.IMP_PO_Number === 'Invalid date' || obj.IMP_PO_Number === null || obj.IMP_PO_Number === undefined ||
            obj.IMP_PO_Issued === '' || obj.IMP_PO_Issued === 'Invalid date' || obj.IMP_PO_Issued === null || obj.IMP_PO_Issued === undefined)
    )));

    // console.log(PendingPRPOProgressDetails.length);
    return PendingPRPOProgressDetails;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Pending Logistics tasks to the Work Logistics Pending tasks Table  --------------------
//---------------------------------------------------------------------------------------------------------------------------

function getLogisticsPendingTasks(posts) {

    let PendingLogisticsData = [];
    PendingLogisticsData = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null &&
            obj.Site_Engineer !== undefined && obj.Site_Engineer !== '' && obj.Site_Engineer !== 'Invalid date' && obj.Site_Engineer !== null &&
            obj.Assigned_Date !== undefined && obj.Assigned_Date !== '' && obj.Assigned_Date !== 'Invalid date' && obj.Assigned_Date !== null &&
            obj.Special_Tag !== undefined && obj.Special_Tag !== '' && obj.Special_Tag !== 'Invalid date' && obj.Special_Tag !== null &&
            obj.Coordinator_Comments !== undefined && obj.Coordinator_Comments !== '' && obj.Coordinator_Comments !== 'Invalid date' && obj.Coordinator_Comments !== null) &&
        (
            obj.PI_Number === '' || obj.PI_Number === 'Invalid date' || obj.PI_Number === null || obj.PI_Number === undefined ||
            obj.PI_Submitted === '' || obj.PI_Submitted === 'Invalid date' || obj.PI_Submitted === null || obj.PI_Submitted === undefined ||
            obj.PI_Approved_ENG === '' || obj.PI_Approved_ENG === 'Invalid date' || obj.PI_Approved_ENG === null || obj.PI_Approved_ENG === undefined ||
            obj.TRC_Approved === '' || obj.TRC_Approved === 'Invalid date' || obj.TRC_Approved === null || obj.TRC_Approved === undefined ||
            obj.BOI_Approved === '' || obj.BOI_Approved === 'Invalid date' || obj.BOI_Approved === null || obj.BOI_Approved === undefined ||
            obj.ICL_Approved === '' || obj.ICL_Approved === 'Invalid date' || obj.ICL_Approved === null || obj.ICL_Approved === undefined ||
            obj.Payment_Method === '' || obj.Payment_Method === 'Invalid date' || obj.Payment_Method === null || obj.Payment_Method === undefined ||
            obj.Payment_Confirmed === '' || obj.Payment_Confirmed === 'Invalid date' || obj.Payment_Confirmed === null || obj.Payment_Confirmed === undefined ||
            obj.ETA === '' || obj.ETA === 'Invalid date' || obj.ETA === null || obj.ETA === undefined ||
            obj.Received_To_Port === '' || obj.Received_To_Port === 'Invalid date' || obj.Received_To_Port === null || obj.Received_To_Port === undefined ||
            obj.Port_Clearance === '' || obj.Port_Clearance === 'Invalid date' || obj.Port_Clearance === null || obj.Port_Clearance === undefined)
    )));

    // console.log(PendingLogisticsData.length);
    return PendingLogisticsData;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Implementation Logistics tasks to the Work Implementation Pending tasks Table  --------------------
//---------------------------------------------------------------------------------------------------------------------------

function getImplementationPendingTasks(posts) {

    let PendingImplementationData = [];
    PendingImplementationData = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null &&
            obj.Site_Engineer !== undefined && obj.Site_Engineer !== '' && obj.Site_Engineer !== 'Invalid date' && obj.Site_Engineer !== null &&
            obj.Assigned_Date !== undefined && obj.Assigned_Date !== '' && obj.Assigned_Date !== 'Invalid date' && obj.Assigned_Date !== null &&
            obj.Special_Tag !== undefined && obj.Special_Tag !== '' && obj.Special_Tag !== 'Invalid date' && obj.Special_Tag !== null &&
            obj.Coordinator_Comments !== undefined && obj.Coordinator_Comments !== '' && obj.Coordinator_Comments !== 'Invalid date' && obj.Coordinator_Comments !== null) &&
        (
            obj.Mobilization_Status === '' || obj.Mobilization_Status === 'Invalid date' || obj.Mobilization_Status === null || obj.Mobilization_Status === undefined ||
            obj.Mobilized_Date === '' || obj.Mobilized_Date === 'Invalid date' || obj.Mobilized_Date === null || obj.Mobilized_Date === undefined ||
            obj.Installation_Status === '' || obj.Installation_Status === 'Invalid date' || obj.Installation_Status === null || obj.Installation_Status === undefined ||
            obj.Installation_Date === '' || obj.Installation_Date === 'Invalid date' || obj.Installation_Date === null || obj.Installation_Date === undefined ||
            obj.Power_Connected_Date === '' || obj.Power_Connected_Date === 'Invalid date' || obj.Power_Connected_Date === null || obj.Power_Connected_Date === undefined ||
            obj.TX_Connected_Date === '' || obj.TX_Connected_Date === 'Invalid date' || obj.TX_Connected_Date === null || obj.TX_Connected_Date === undefined ||
            obj.Commissioning_Status === '' || obj.Commissioning_Status === 'Invalid date' || obj.Commissioning_Status === null || obj.Commissioning_Status === undefined ||
            obj.Commisioned_Date === '' || obj.Commisioned_Date === 'Invalid date' || obj.Commisioned_Date === null || obj.Commisioned_Date === undefined)
    )));

    // console.log(PendingImplementationData.length);
    return PendingImplementationData;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Pending Acceptance tasks to the Work Acceptance Pending tasks Table  --------------------
//---------------------------------------------------------------------------------------------------------------------------

function getAcceptancePendingTasks(posts) {

    let PendingAcceptanceData = [];
    PendingAcceptanceData = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null &&
            obj.Site_Engineer !== undefined && obj.Site_Engineer !== '' && obj.Site_Engineer !== 'Invalid date' && obj.Site_Engineer !== null &&
            obj.Assigned_Date !== undefined && obj.Assigned_Date !== '' && obj.Assigned_Date !== 'Invalid date' && obj.Assigned_Date !== null &&
            obj.Special_Tag !== undefined && obj.Special_Tag !== '' && obj.Special_Tag !== 'Invalid date' && obj.Special_Tag !== null &&
            obj.Coordinator_Comments !== undefined && obj.Coordinator_Comments !== '' && obj.Coordinator_Comments !== 'Invalid date' && obj.Coordinator_Comments !== null) &&
        (
            obj.SAR_Reference === '' || obj.SAR_Reference === 'Invalid date' || obj.SAR_Reference === null || obj.SAR_Reference === undefined ||
            obj.SAR_Status === '' || obj.SAR_Status === 'Invalid date' || obj.SAR_Status === null || obj.SAR_Status === undefined ||
            obj.SAR_Date === '' || obj.SAR_Date === 'Invalid date' || obj.SAR_Date === null || obj.SAR_Date === undefined ||
            obj.PAT_Reference === '' || obj.PAT_Reference === 'Invalid date' || obj.PAT_Reference === null || obj.PAT_Reference === undefined ||
            obj.PAT_Status === '' || obj.PAT_Status === 'Invalid date' || obj.PAT_Status === null || obj.PAT_Status === undefined ||
            obj.PAT_Submitted === '' || obj.PAT_Submitted === 'Invalid date' || obj.PAT_Submitted === null || obj.PAT_Submitted === undefined ||
            obj.PAT_Pass_Date === '' || obj.PAT_Pass_Date === 'Invalid date' || obj.PAT_Pass_Date === null || obj.PAT_Pass_Date === undefined ||
            obj.Check_List_Submitted === '' || obj.Check_List_Submitted === 'Invalid date' || obj.Check_List_Submitted === null || obj.Check_List_Submitted === undefined ||
            obj.Check_List_Verified === '' || obj.Check_List_Verified === 'Invalid date' || obj.Check_List_Verified === null || obj.Check_List_Verified === undefined ||
            obj.On_Air_Status === '' || obj.On_Air_Status === 'Invalid date' || obj.On_Air_Status === null || obj.On_Air_Status === undefined ||
            obj.On_Air_Date === '' || obj.On_Air_Date === 'Invalid date' || obj.On_Air_Date === null || obj.On_Air_Date === undefined ||
            obj.Material_Reconciled === '' || obj.Material_Reconciled === 'Invalid date' || obj.Material_Reconciled === null || obj.Material_Reconciled === undefined ||
            obj.Balance_Material_Returned_Date === '' || obj.Balance_Material_Returned_Date === 'Invalid date' || obj.Balance_Material_Returned_Date === null || obj.Balance_Material_Returned_Date === undefined
        )
    )));

    // console.log(PendingAcceptanceData.length);
    return PendingAcceptanceData;
}

//---------------------------------------------------------------------------------------------------------------------------
//----------------- Getting Pending Payments tasks to the Work Payments Pending tasks Table  --------------------
//---------------------------------------------------------------------------------------------------------------------------

function getPaymentPendingTasks(posts) {

    let PendingPaymentData = [];
    PendingPaymentData = posts.filter((obj) => ((
        (
            obj.Planning_ID !== undefined && obj.Planning_ID !== '' && obj.Planning_ID !== 'Invalid date' && obj.Planning_ID !== null &&
            obj.Implementation_By !== undefined && obj.Implementation_By !== '' && obj.Implementation_By !== 'Invalid date' && obj.Implementation_By !== null &&
            obj.Project !== undefined && obj.Project !== '' && obj.Project !== 'Invalid date' && obj.Project !== null &&
            obj.Site_ID !== undefined && obj.Site_ID !== '' && obj.Site_ID !== 'Invalid date' && obj.Site_ID !== null &&
            obj.Site_Name !== undefined && obj.Site_Name !== '' && obj.Site_Name !== 'Invalid date' && obj.Site_Name !== null &&
            obj.HO_Date !== undefined && obj.HO_Date !== '' && obj.HO_Date !== 'Invalid date' && obj.HO_Date !== null &&
            obj.Scope !== undefined && obj.Scope !== '' && obj.Scope !== 'Invalid date' && obj.Scope !== null &&
            obj.Site_Engineer !== undefined && obj.Site_Engineer !== '' && obj.Site_Engineer !== 'Invalid date' && obj.Site_Engineer !== null &&
            obj.Assigned_Date !== undefined && obj.Assigned_Date !== '' && obj.Assigned_Date !== 'Invalid date' && obj.Assigned_Date !== null &&
            obj.Special_Tag !== undefined && obj.Special_Tag !== '' && obj.Special_Tag !== 'Invalid date' && obj.Special_Tag !== null &&
            obj.Coordinator_Comments !== undefined && obj.Coordinator_Comments !== '' && obj.Coordinator_Comments !== 'Invalid date' && obj.Coordinator_Comments !== null) &&
        (
            obj.COW_Number === '' || obj.COW_Number === 'Invalid date' || obj.COW_Number === null || obj.COW_Number === undefined ||
            obj.COW_Submitted === '' || obj.COW_Submitted === 'Invalid date' || obj.COW_Submitted === null || obj.COW_Submitted === undefined ||
            obj.COW_Approved === '' || obj.COW_Approved === 'Invalid date' || obj.COW_Approved === null || obj.COW_Approved === undefined ||
            obj.CPL_Number === '' || obj.CPL_Number === 'Invalid date' || obj.CPL_Number === null || obj.CPL_Number === undefined ||
            obj.CPL_Submitted === '' || obj.CPL_Submitted === 'Invalid date' || obj.CPL_Submitted === null || obj.CPL_Submitted === undefined ||
            obj.CPL_Approved === '' || obj.CPL_Approved === 'Invalid date' || obj.CPL_Approved === null || obj.CPL_Approved === undefined ||
            obj.PAC_Invoice_Number === '' || obj.PAC_Invoice_Number === 'Invalid date' || obj.PAC_Invoice_Number === null || obj.PAC_Invoice_Number === undefined ||
            obj.PAC_Invoice_Submitted === '' || obj.PAC_Invoice_Submitted === 'Invalid date' || obj.PAC_Invoice_Submitted === null || obj.PAC_Invoice_Submitted === undefined ||
            obj.PAC_Invoice_Approved === '' || obj.PAC_Invoice_Approved === 'Invalid date' || obj.PAC_Invoice_Approved === null || obj.PAC_Invoice_Approved === undefined ||
            obj.FAC_Number === '' || obj.FAC_Number === 'Invalid date' || obj.FAC_Number === null || obj.FAC_Number === undefined ||
            obj.FAC_Submitted === '' || obj.FAC_Submitted === 'Invalid date' || obj.FAC_Submitted === null || obj.FAC_Submitted === undefined ||
            obj.FAC_Approved === '' || obj.FAC_Approved === 'Invalid date' || obj.FAC_Approved === null || obj.FAC_Approved === undefined ||
            obj.PO_Status === '' || obj.PO_Status === 'Invalid date' || obj.PO_Status === null || obj.PO_Status === undefined ||
            obj.PO_Closed_Date === '' || obj.PO_Closed_Date === 'Invalid date' || obj.PO_Closed_Date === null || obj.PO_Closed_Date === undefined ||
            obj.Capitalization_Status === '' || obj.Capitalization_Status === 'Invalid date' || obj.Capitalization_Status === null || obj.Capitalization_Status === undefined ||
            obj.Capitalized_Date === '' || obj.Capitalized_Date === 'Invalid date' || obj.Capitalized_Date === null || obj.Capitalized_Date === undefined ||
            obj.Finance_Remarks === '' || obj.Finance_Remarks === 'Invalid date' || obj.Finance_Remarks === null || obj.Finance_Remarks === undefined)
    )));

    // console.log(PendingPaymentData.length);
    return PendingPaymentData;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;