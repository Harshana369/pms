// ---------------------------- Columns ------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

function getHOdate(params) {
  if (
	typeof params.row.HO_Date === 'undefined' ||
	params.row.HO_Date == null ||
	params.row.HO_Date === 'Invalid date'
  ) {
  	return;
  }
  return `${params.row.HO_Date}`;
}

function setHOdate(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const HO_Date = dateString;
  return { ...params.row, HO_Date };
}

function getHO_Modified_Date(params) {
    if (
      typeof params.row.HO_Modified_Date === 'undefined' ||
      params.row.HO_Modified_Date == null ||
      params.row.HO_Modified_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.HO_Modified_Date}`;
}

function setHO_Modified_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const HO_Modified_Date = dateString;
  return { ...params.row, HO_Modified_Date };
}

function getOn_Air_Target(params) {
    if (
      typeof params.row.On_Air_Target === 'undefined' ||
      params.row.On_Air_Target == null ||
      params.row.On_Air_Target === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.On_Air_Target}`;
}

function setOn_Air_Target(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const On_Air_Target = dateString;
  return { ...params.row, On_Air_Target };
}

function getAssigned_Date(params) {
    if (
      typeof params.row.Assigned_Date === 'undefined' ||
      params.row.Assigned_Date == null ||
      params.row.Assigned_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Assigned_Date}`;
}

function setAssigned_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Assigned_Date = dateString;
  return { ...params.row, Assigned_Date };
}

function getDependencies_On_Air_Target(params) {
    if (
      typeof params.row.Dependencies_On_Air_Target === 'undefined' ||
      params.row.Dependencies_On_Air_Target == null ||
      params.row.Dependencies_On_Air_Target === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Dependencies_On_Air_Target}`;
}

function setDependencies_On_Air_Target(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Dependencies_On_Air_Target = dateString;
  return { ...params.row, Dependencies_On_Air_Target };
}

function getCivil_PAT_Date(params) {
    if (
      typeof params.row.Civil_PAT_Date === 'undefined' ||
      params.row.Civil_PAT_Date == null ||
      params.row.Civil_PAT_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Civil_PAT_Date}`;
}

function setCivil_PAT_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Civil_PAT_Date = dateString;
  return { ...params.row, Civil_PAT_Date };
}

function getSAQ_Clearance_Date(params) {
    if (
      typeof params.row.SAQ_Clearance_Date === 'undefined' ||
      params.row.SAQ_Clearance_Date == null ||
      params.row.SAQ_Clearance_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.SAQ_Clearance_Date}`;
}

function setSAQ_Clearance_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const SAQ_Clearance_Date = dateString;
  return { ...params.row, SAQ_Clearance_Date };
}

function getTSSR_Submitted_Date(params) {
    if (
      typeof params.row.TSSR_Submitted_Date === 'undefined' ||
      params.row.TSSR_Submitted_Date == null ||
      params.row.TSSR_Submitted_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.TSSR_Submitted_Date}`;
}

function setTSSR_Submitted_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const TSSR_Submitted_Date = dateString;
  return { ...params.row, TSSR_Submitted_Date };
}

function getTSSR_Approved_Date(params) {
    if (
      typeof params.row.TSSR_Approved_Date === 'undefined' ||
      params.row.TSSR_Approved_Date == null ||
      params.row.TSSR_Approved_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.TSSR_Approved_Date}`;
}

function setTSSR_Approved_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const TSSR_Approved_Date = dateString;
  return { ...params.row, TSSR_Approved_Date };
}

function getSupply_BOQ_Submitted(params) {
    if (
      typeof params.row.Supply_BOQ_Submitted === 'undefined' ||
      params.row.Supply_BOQ_Submitted == null ||
      params.row.Supply_BOQ_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Supply_BOQ_Submitted}`;
}

function setSupply_BOQ_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Supply_BOQ_Submitted = dateString;
  return { ...params.row, Supply_BOQ_Submitted };
}

function getSupply_BOQ_Approved(params) {
    if (
      typeof params.row.Supply_BOQ_Approved === 'undefined' ||
      params.row.Supply_BOQ_Approved == null ||
      params.row.Supply_BOQ_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Supply_BOQ_Approved}`;
}

function setSupply_BOQ_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Supply_BOQ_Approved = dateString;
  return { ...params.row, Supply_BOQ_Approved };
}

function getApproval_Received_Date(params) {
    if (
      typeof params.row.Approval_Received_Date === 'undefined' ||
      params.row.Approval_Received_Date == null ||
      params.row.Approval_Received_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Approval_Received_Date}`;
}

function setApproval_Received_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Approval_Received_Date = dateString;
  return { ...params.row, Approval_Received_Date };
}

function getMCW_Requested_Date(params) {
    if (
      typeof params.row.MCW_Requested_Date === 'undefined' ||
      params.row.MCW_Requested_Date == null ||
      params.row.MCW_Requested_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.MCW_Requested_Date}`;
}

function setMCW_Requested_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const MCW_Requested_Date = dateString;
  return { ...params.row, MCW_Requested_Date };
}

function getMCW_Completed_Date(params) {
    if (
      typeof params.row.MCW_Completed_Date === 'undefined' ||
      params.row.MCW_Completed_Date == null ||
      params.row.MCW_Completed_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.MCW_Completed_Date}`;
}

function setMCW_Completed_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const MCW_Completed_Date = dateString;
  return { ...params.row, MCW_Completed_Date };
}

function getSupply_PR_Submitted(params) {
    if (
      typeof params.row.Supply_PR_Submitted === 'undefined' ||
      params.row.Supply_PR_Submitted == null ||
      params.row.Supply_PR_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Supply_PR_Submitted}`;
}

function setSupply_PR_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Supply_PR_Submitted = dateString;
  return { ...params.row, Supply_PR_Submitted };
}

function getSupply_PR_Approved_Date(params) {
    if (
      typeof params.row.Supply_PR_Approved_Date === 'undefined' ||
      params.row.Supply_PR_Approved_Date == null ||
      params.row.Supply_PR_Approved_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Supply_PR_Approved_Date}`;
}

function setSupply_PR_Approved_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Supply_PR_Approved_Date = dateString;
  return { ...params.row, Supply_PR_Approved_Date };
}

function getSupply_PR_Raise(params) {
    if (
      typeof params.row.Supply_PR_Raise === 'undefined' ||
      params.row.Supply_PR_Raise == null ||
      params.row.Supply_PR_Raise === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Supply_PR_Raise}`;
}

function setSupply_PR_Raise(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Supply_PR_Raise = dateString;
  return { ...params.row, Supply_PR_Raise };
}

function getSupply_PO_Issued(params) {
    if (
      typeof params.row.Supply_PO_Issued === 'undefined' ||
      params.row.Supply_PO_Issued == null ||
      params.row.Supply_PO_Issued === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Supply_PO_Issued}`;
}

function setSupply_PO_Issued(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Supply_PO_Issued = dateString;
  return { ...params.row, Supply_PO_Issued };
}

function getIMP_PR_Submitted(params) {
    if (
      typeof params.row.IMP_PR_Submitted === 'undefined' ||
      params.row.IMP_PR_Submitted == null ||
      params.row.IMP_PR_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.IMP_PR_Submitted}`;
}

function setIMP_PR_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const IMP_PR_Submitted = dateString;
  return { ...params.row, IMP_PR_Submitted };
}

function getIMP_PR_Approved_Date(params) {
    if (
      typeof params.row.IMP_PR_Approved_Date === 'undefined' ||
      params.row.IMP_PR_Approved_Date == null ||
      params.row.IMP_PR_Approved_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.IMP_PR_Approved_Date}`;
}

function setIMP_PR_Approved_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const IMP_PR_Approved_Date = dateString;
  return { ...params.row, IMP_PR_Approved_Date };
}

function getIMP_PR_Raised(params) {
    if (
      typeof params.row.IMP_PR_Raised === 'undefined' ||
      params.row.IMP_PR_Raised == null ||
      params.row.IMP_PR_Raised === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.IMP_PR_Raised}`;
}

function setIMP_PR_Raised(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const IMP_PR_Raised = dateString;
  return { ...params.row, IMP_PR_Raised };
}

function getIMP_PO_Issued(params) {
    if (
      typeof params.row.IMP_PO_Issued === 'undefined' ||
      params.row.IMP_PO_Issued == null ||
      params.row.IMP_PO_Issued === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.IMP_PO_Issued}`;
}

function setIMP_PO_Issued(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const IMP_PO_Issued = dateString;
  return { ...params.row, IMP_PO_Issued };
}

function getPI_Submitted(params) {
    if (
      typeof params.row.PI_Submitted === 'undefined' ||
      params.row.PI_Submitted == null ||
      params.row.PI_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.PI_Submitted}`;
}

function setPI_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const PI_Submitted = dateString;
  return { ...params.row, PI_Submitted };
}

function getPI_Approved_ENG(params) {
    if (
      typeof params.row.PI_Approved_ENG === 'undefined' ||
      params.row.PI_Approved_ENG == null ||
      params.row.PI_Approved_ENG === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.PI_Approved_ENG}`;
}

function setPI_Approved_ENG(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const PI_Approved_ENG = dateString;
  return { ...params.row, PI_Approved_ENG };
}

function getTRC_Approved(params) {
    if (
      typeof params.row.TRC_Approved === 'undefined' ||
      params.row.TRC_Approved == null ||
      params.row.TRC_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.TRC_Approved}`;
}

function setTRC_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const TRC_Approved = dateString;
  return { ...params.row, TRC_Approved };
}

function getBOI_Approved(params) {
    if (
      typeof params.row.BOI_Approved === 'undefined' ||
      params.row.BOI_Approved == null ||
      params.row.BOI_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.BOI_Approved}`;
}

function setBOI_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const BOI_Approved = dateString;
  return { ...params.row, BOI_Approved };
}

function getICL_Approved(params) {
    if (
      typeof params.row.ICL_Approved === 'undefined' ||
      params.row.ICL_Approved == null ||
      params.row.ICL_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.ICL_Approved}`;
}

function setICL_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const ICL_Approved = dateString;
  return { ...params.row, ICL_Approved };
}

function getPayment_Confirmed(params) {
    if (
      typeof params.row.Payment_Confirmed === 'undefined' ||
      params.row.Payment_Confirmed == null ||
      params.row.Payment_Confirmed === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Payment_Confirmed}`;
}

function setPayment_Confirmed(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Payment_Confirmed = dateString;
  return { ...params.row, Payment_Confirmed };
}

function getETA(params) {
    if (
      typeof params.row.ETA === 'undefined' ||
      params.row.ETA == null ||
      params.row.ETA === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.ETA}`;
}

function setETA(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const ETA = dateString;
  return { ...params.row, ETA };
}

function getReceived_To_Port(params) {
    if (
      typeof params.row.Received_To_Port === 'undefined' ||
      params.row.Received_To_Port == null ||
      params.row.Received_To_Port === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Received_To_Port}`;
}

function setReceived_To_Port(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Received_To_Port = dateString;
  return { ...params.row, Received_To_Port };
}

function getPort_Clearance(params) {
    if (
      typeof params.row.Port_Clearance === 'undefined' ||
      params.row.Port_Clearance == null ||
      params.row.Port_Clearance === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Port_Clearance}`;
}

function setPort_Clearance(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Port_Clearance = dateString;
  return { ...params.row, Port_Clearance };
}

function getMobilized_Date(params) {
    if (
      typeof params.row.Mobilized_Date === 'undefined' ||
      params.row.Mobilized_Date == null ||
      params.row.Mobilized_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Mobilized_Date}`;
}

function setMobilized_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Mobilized_Date = dateString;
  return { ...params.row, Mobilized_Date };
}

function getInstallation_Date(params) {
    if (
      typeof params.row.Installation_Date === 'undefined' ||
      params.row.Installation_Date == null ||
      params.row.Installation_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Installation_Date}`;
}

function setInstallation_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Installation_Date = dateString;
  return { ...params.row, Installation_Date };
}

function getPower_Connected_Date(params) {
    if (
      typeof params.row.Power_Connected_Date === 'undefined' ||
      params.row.Power_Connected_Date == null ||
      params.row.Power_Connected_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Power_Connected_Date}`;
}

function setPower_Connected_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Power_Connected_Date = dateString;
  return { ...params.row, Power_Connected_Date };
}

function getTX_Connected_Date(params) {
    if (
      typeof params.row.TX_Connected_Date === 'undefined' ||
      params.row.TX_Connected_Date == null ||
      params.row.TX_Connected_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.TX_Connected_Date}`;
}

function setTX_Connected_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const TX_Connected_Date = dateString;
  return { ...params.row, TX_Connected_Date };
}

function getCommisioned_Date(params) {
    if (
      typeof params.row.Commisioned_Date === 'undefined' ||
      params.row.Commisioned_Date == null ||
      params.row.Commisioned_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Commisioned_Date}`;
}

function setCommisioned_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Commisioned_Date = dateString;
  return { ...params.row, Commisioned_Date };
}

function getSAR_Date(params) {
    if (
      typeof params.row.SAR_Date === 'undefined' ||
      params.row.SAR_Date == null ||
      params.row.SAR_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.SAR_Date}`;
}

function setSAR_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const SAR_Date = dateString;
  return { ...params.row, SAR_Date };
}

function getPAT_Submitted(params) {
    if (
      typeof params.row.PAT_Submitted === 'undefined' ||
      params.row.PAT_Submitted == null ||
      params.row.PAT_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.PAT_Submitted}`;
}

function setPAT_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const PAT_Submitted = dateString;
  return { ...params.row, PAT_Submitted };
}

function getPAT_Pass_Date(params) {
    if (
      typeof params.row.PAT_Pass_Date === 'undefined' ||
      params.row.PAT_Pass_Date == null ||
      params.row.PAT_Pass_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.PAT_Pass_Date}`;
}

function setPAT_Pass_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const PAT_Pass_Date = dateString;
  return { ...params.row, PAT_Pass_Date };
}

function getCheck_List_Submitted(params) {
    if (
      typeof params.row.Check_List_Submitted === 'undefined' ||
      params.row.Check_List_Submitted == null ||
      params.row.Check_List_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Check_List_Submitted}`;
}

function setCheck_List_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Check_List_Submitted = dateString;
  return { ...params.row, Check_List_Submitted };
}

function getCheck_List_Verified(params) {
    if (
      typeof params.row.Check_List_Verified === 'undefined' ||
      params.row.Check_List_Verified == null ||
      params.row.Check_List_Verified === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Check_List_Verified}`;
}

function setCheck_List_Verified(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Check_List_Verified = dateString;
  return { ...params.row, Check_List_Verified };
}

function getOn_Air_Date(params) {
    if (
      typeof params.row.On_Air_Date === 'undefined' ||
      params.row.On_Air_Date == null ||
      params.row.On_Air_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.On_Air_Date}`;
}

function setOn_Air_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const On_Air_Date = dateString;
  return { ...params.row, On_Air_Date };
}

function getMaterial_Reconciled(params) {
    if (
      typeof params.row.Material_Reconciled === 'undefined' ||
      params.row.Material_Reconciled == null ||
      params.row.Material_Reconciled === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Material_Reconciled}`;
}

function setMaterial_Reconciled(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Material_Reconciled = dateString;
  return { ...params.row, Material_Reconciled };
}

function getBalance_Material_Returned_Date(params) {
    if (
      typeof params.row.Balance_Material_Returned_Date === 'undefined' ||
      params.row.Balance_Material_Returned_Date == null ||
      params.row.Balance_Material_Returned_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Balance_Material_Returned_Date}`;
}

function setBalance_Material_Returned_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Balance_Material_Returned_Date = dateString;
  return { ...params.row, Balance_Material_Returned_Date };
}

function getCOW_Submitted(params) {
    if (
      typeof params.row.COW_Submitted === 'undefined' ||
      params.row.COW_Submitted == null ||
      params.row.COW_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.COW_Submitted}`;
}

function setCOW_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const COW_Submitted = dateString;
  return { ...params.row, COW_Submitted };
}

function getCOW_Approved(params) {
    if (
      typeof params.row.COW_Approved === 'undefined' ||
      params.row.COW_Approved == null ||
      params.row.COW_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.COW_Approved}`;
}

function setCOW_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const COW_Approved = dateString;
  return { ...params.row, COW_Approved };
}

function getCPL_Submitted(params) {
    if (
      typeof params.row.CPL_Submitted === 'undefined' ||
      params.row.CPL_Submitted == null ||
      params.row.CPL_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.CPL_Submitted}`;
}

function setCPL_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const CPL_Submitted = dateString;
  return { ...params.row, CPL_Submitted };
}

function getCPL_Approved(params) {
    if (
      typeof params.row.CPL_Approved === 'undefined' ||
      params.row.CPL_Approved == null ||
      params.row.CPL_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.CPL_Approved}`;
}

function setCPL_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const CPL_Approved = dateString;
  return { ...params.row, CPL_Approved };
}

function getPAC_Invoice_Submitted(params) {
    if (
      typeof params.row.PAC_Invoice_Submitted === 'undefined' ||
      params.row.PAC_Invoice_Submitted == null ||
      params.row.PAC_Invoice_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.PAC_Invoice_Submitted}`;
}

function setPAC_Invoice_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const PAC_Invoice_Submitted = dateString;
  return { ...params.row, PAC_Invoice_Submitted };
}

function getPAC_Invoice_Approved(params) {
    if (
      typeof params.row.PAC_Invoice_Approved === 'undefined' ||
      params.row.PAC_Invoice_Approved == null ||
      params.row.PAC_Invoice_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.PAC_Invoice_Approved}`;
}

function setPAC_Invoice_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const PAC_Invoice_Approved = dateString;
  return { ...params.row, PAC_Invoice_Approved };
}

function getFAC_Submitted(params) {
    if (
      typeof params.row.FAC_Submitted === 'undefined' ||
      params.row.FAC_Submitted == null ||
      params.row.FAC_Submitted === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.FAC_Submitted}`;
}

function setFAC_Submitted(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const FAC_Submitted = dateString;
  return { ...params.row, FAC_Submitted };
}

function getFAC_Approved(params) {
    if (
      typeof params.row.FAC_Approved === 'undefined' ||
      params.row.FAC_Approved == null ||
      params.row.FAC_Approved === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.FAC_Approved}`;
}

function setFAC_Approved(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const FAC_Approved = dateString;
  return { ...params.row, FAC_Approved };
}

function getPO_Closed_Date(params) {
    if (
      typeof params.row.PO_Closed_Date === 'undefined' ||
      params.row.PO_Closed_Date == null ||
      params.row.PO_Closed_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.PO_Closed_Date}`;
}

function setPO_Closed_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const PO_Closed_Date = dateString;
  return { ...params.row, PO_Closed_Date };
}

function getCapitalized_Date(params) {
    if (
      typeof params.row.Capitalized_Date === 'undefined' ||
      params.row.Capitalized_Date == null ||
      params.row.Capitalized_Date === 'Invalid date'
    ) {
      return;
    }
    return `${params.row.Capitalized_Date}`;
}

function setCapitalized_Date(params) {
  const date = params.value;
  const dateString = moment(date).format('YYYY-MM-DD');
  const Capitalized_Date = dateString;
  return { ...params.row, Capitalized_Date };
}




const Columns = [
	// {
	//   field: 'Index',
	//   headerName: 'Index',
	//   hide: false,
	//   headerClassName: 'super-app-theme--header',
	//   cellClassName: (params) => clsx('super-app-theme--cell')
	// },
	{
		field: '_id',
		headerName: 'Project ID',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 250,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true,
		hide: true
	},	
	{
		field: 'Planning_ID',
		headerName: 'Planning ID',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 250,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Implementation_By',
		headerName: 'Implementation By',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['ZTE', 'Huawei', 'Mobitel Direct'],
		hide: false,
		editable: true
	},
	{
		field: 'Project',
		headerName: 'Project',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 220,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: projectNames,
		hide: false,
		editable: true
	},
	{
		field: 'Site_ID',
		headerName: 'Site ID',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Site_Name',
		headerName: 'Site Name',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'HO_Date',
		headerName: 'Handover Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueSetter: setHOdate,
		valueGetter: getHOdate,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'HO_Modification',
		headerName: 'HO Modification',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 270,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['ScopeChanged', 'Material Changed', 'Withdrawn'],
		hide: false,
		editable: true
	},
	{
		field: 'HO_Modified_Date',
		headerName: 'HO Modified Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueSetter: setHOdate,
		valueGetter: getHOdate,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Scope',
		headerName: 'Scope',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 270,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: [
			'New Site',
			'Sector Installation',
			'Relocation',
			'Cabinet Swap',
			'RRU SWAP',
			'Antenna & RRU SWAP',
			'SB Antenna to Sector Split',
			'Card Addition',
			'Jumper Instalation',
			'Jumper Instalation & Card Addition',
			'Antenna & RRU Instalation',
			'SB Antenna to Sector Split & Card Addition',
			'Antenna, RRU Installation & Card Addition',
			'Antenna Instalation & RRU SWAP',
			'Antenna SWAP',
			'RFU SWAP',
			'Technology Marge',
			'Antenna Installation',
			'Antenna Removal',
			'Antenna SWAP & RRU Instalation',
			'Antenna installation & Card Addition',
			'Card Swap',
			'RRU Removal',
			'Sector Removal',
			'Antenna Height Increase',
			'Sector Installation TEMP',
			'Site Installation TEMP',
			'Card Removal',
			'Site Removal',
			'Filter Installation',
			'Battery Cabinet installation',
			'NBIoT-G900',
			'Not Available'
		],
		hide: false,
		editable: true
	},
	{
		field: 'New_RAT',
		headerName: 'New RAT',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: [
			'9',
			'18',
			'U',
			'L18',
			'L850',
			'DB',
			'9U',
			'9L18',
			'9L850',
			'18U',
			'18L18',
			'18L850',
			'18UL18',
			'18UL850',
			'18UL18L850',
			'DBU',
			'DBL18',
			'DBL850',
			'DBL18L850',
			'DBUL18',
			'DBUL850',
			'9UL18',
			'9UL850',
			'9UL18L850',
			'UL18',
			'UL850',
			'UL18L850',
			'L18L850',
			'18UL',
			'18L850L18',
			'9UL',
			'18UL',
			'NA',
			'Not Available'
		],
		editable: true
	},
	{
		field: 'New_Sector',
		headerName: 'New Sector',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Approval_Status',
		headerName: 'Approval Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Approved', 'Rejected', 'Pending'],
		editable: true
	},
	{
		field: 'Approval_Ref.',
		headerName: 'Approval Ref.',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'IMP_Scenario.',
		headerName: 'IMP Scenario.',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'blank1',
		headerName: 'Blank',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Blank'],
		editable: true
	},
	{
		field: 'blank2',
		headerName: 'Blank',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Blank'],
		editable: true
	},
	{
		field: 'blank3',
		headerName: 'Blank',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Blank'],
		editable: true
	},
	{
		field: 'Tilt',
		headerName: 'Tilt',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Azimuth',
		headerName: 'Azimuth',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Antenna_Height',
		headerName: 'Antenna Height',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'New_RRU_Type',
		headerName: 'New RRU Type',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'RRU_From',
		headerName: 'RRU From',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'New_BTS_Type',
		headerName: 'New BTS Type',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'BTS_From',
		headerName: 'BTS From',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'New_Antenna_Type',
		headerName: 'New Antenna Type',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Antenna_From',
		headerName: 'Antenna From',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Cards_Type_n_From',
		headerName: 'Cards Type & From',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Battery_count_n_From',
		headerName: 'Battery count & From',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Mobitel_Region',
		headerName: 'Mobitel Region',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Planning_Engineer',
		headerName: 'Planning Engineer',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'On_Air_Target',
		headerName: 'On Air Target',
		type: 'date',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Planning_Comments',
		headerName: 'Planning Comments',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Site_Engineer',
		headerName: 'Site Engineer',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: siteEngineerNames,
		editable: true
	},
	{
		field: 'Sub_Contractor',
		headerName: 'Sub Contractor',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: [
			'Etel',
			'Intel',
			'L&H',
			'Assure',
			'Elecom',
			'Suvitech',
			'Gartar',
			'ZTE',
			'Huawei',
			'N/A'
		],
		editable: true
	},
	{
		field: 'Assigned_Date',
		headerName: 'Assigned Date',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'date',
		editable: true
	},
	{
		field: 'Special_Tag',
		headerName: 'Special Tag',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Comes from tagging'],
		editable: true
	},
	{
		field: 'Coordinator_Comments',
		headerName: 'Coordinator Comments',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Site_Status',
		headerName: 'Site Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 200,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: [
			'On Air',
			'Site Withdrawn',
			'PAT Pending',
			'Commissioning Pending',
			'Commissioned / Power Pending',
			'Installed / Power Pending',
			'Installed / TX Pending / Power Pending',
			'Installation WIP / Power Pending',
			'Installation Pending / Power Not Connected',
			'Installed / TX Pending',
			'Installation Pending',
			'Tower Pending / Power Not Connected',
			'Relocation Pending / Power Pending',
			'Equipment Pending / Power Not Connected',
			'Equipment Pending',
			'Approval Pending',
			'SAQ Clearance Pending',
			'Supply Only'
		],
		editable: true
	},
	{
		field: 'Dependency',
		headerName: 'Dependency',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: [
			'On Air',
			'PAT Pending',
			'PAT Pass',
			'PAT Reject / Pass with minor',
			'PAT Pending',
			'Commission Pending',
			'Power Pending',
			'TX & Power Pending',
			'TX Pending',
			'Installation Pending',
			'Material Pending',
			'MCW Pending',
			'Approval Pending',
			'TSSR Pending',
			'TSSR Approval Pending',
			'SAQ Issue',
			'Civil Pending',
			'Installation Pending/ Power Pending',
			'Withdrawn',
			'To be withdrawn'
		],
		editable: true
	},
	{
		field: 'Responsible',
		headerName: 'Responsible',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'center',
		align: 'center',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: [
			'Not Apllicable',
			'Regional Operations',
			'Project',
			'Power',
			'Power / Transmission',
			'Project / Power',
			'Transmission',
			'Civil',
			'RNO / PRC',
			'RNO',
			'SAQ'
		],
		editable: true
	},
	{
		field: 'Dependencies_On_Air_Target',
		headerName: 'Dependencies On Air Target',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getOn_Air_Target,
		valueSetter: setOn_Air_Target,
		headerAlign: 'left',
		align: 'left',
		width: 210,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Civil_PAT_Date',
		headerName: 'Civil PAT Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCivil_PAT_Date,
		valueSetter: setCivil_PAT_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'SAQ_Clearance_Date',
		headerName: 'SAQ Clearance Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSAQ_Clearance_Date,
		valueSetter: setSAQ_Clearance_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'TSSR_Referance',
		headerName: 'TSSR Referance',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'TSSR_Submitted_Date',
		headerName: 'TSSR Submitted Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getTSSR_Submitted_Date,
		valueSetter: setTSSR_Submitted_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'TSSR_Approved_Date',
		headerName: 'TSSR Approved Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getTSSR_Approved_Date,
		valueSetter: setTSSR_Approved_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_BOQ_Submitted',
		headerName: 'Supply BOQ Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSupply_BOQ_Submitted,
		valueSetter: setSupply_BOQ_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_BOQ_Approved',
		headerName: 'Supply BOQ Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSupply_BOQ_Approved,
		valueSetter: setSupply_BOQ_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Approval_Received_Date',
		headerName: 'Approval Received Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getApproval_Received_Date,
		valueSetter: setApproval_Received_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'MCW_Requested_Date',
		headerName: 'MCW Requested Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getMCW_Requested_Date,
		valueSetter: setMCW_Requested_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'MCW_Completed_Date',
		headerName: 'MCW Completed Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getMCW_Completed_Date,
		valueSetter: setMCW_Completed_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_PR_Submitted',
		headerName: 'Supply PR Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSupply_PR_Submitted,
		valueSetter: setSupply_PR_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_PR_Status',
		headerName: 'Supply PR Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'center',
		align: 'center',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Approved', 'Rejected'],
		editable: true
	},
	{
		field: 'Supply_PR_Approved_Date',
		headerName: 'Supply PR Approved Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSupply_PR_Approved_Date,
		valueSetter: setSupply_PR_Approved_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_PR_Number',
		headerName: 'Supply PR Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_PR_Raise',
		headerName: 'Supply PR Raise',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSupply_PR_Raise,
		valueSetter: setSupply_PR_Raise,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_PO_Number',
		headerName: 'Supply PO Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Supply_PO_Issued',
		headerName: 'Supply_PO_Issued',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSupply_PO_Issued,
		valueSetter: setSupply_PO_Issued,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'IMP_PR_Submitted',
		headerName: 'IMP PR Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getIMP_PR_Submitted,
		valueSetter: setIMP_PR_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'IMP_PR_Approved_Date',
		headerName: 'IMP PR Approved Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getIMP_PR_Approved_Date,
		valueSetter: setIMP_PR_Approved_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'IMP_PR_Number',
		headerName: 'IMP PR Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'IMP_PR_Raised',
		headerName: 'IMP PR Raised',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getIMP_PR_Raised,
		valueSetter: setIMP_PR_Raised,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'IMP_PO_Number',
		headerName: 'IMP_PO_Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'IMP_PO_Issued',
		headerName: 'IMP PO Issued',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getIMP_PO_Issued,
		valueSetter: setIMP_PO_Issued,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'AWR_1',
		headerName: 'AWR 1',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'AWR_2',
		headerName: 'AWR 2',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'AWR_3',
		headerName: 'AWR 3',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PI_Number',
		headerName: 'PI Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PI_Submitted',
		headerName: 'PI Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPI_Submitted,
		valueSetter: setPI_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PI_Approved_ENG',
		headerName: 'PI Approved ENG',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPI_Approved_ENG,
		valueSetter: setPI_Approved_ENG,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'TRC_Approved',
		headerName: 'TRC Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getTRC_Approved,
		valueSetter: setTRC_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'BOI_Approved',
		headerName: 'BOI Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getBOI_Approved,
		valueSetter: setBOI_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'ICL_Approved',
		headerName: 'ICL_Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getICL_Approved,
		valueSetter: setICL_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Payment_Method',
		headerName: 'Payment Method',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Payment_Confirmed',
		headerName: 'Payment_Confirmed',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPayment_Confirmed,
		valueSetter: setPayment_Confirmed,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'ETA',
		headerName: 'ETA',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getETA,
		valueSetter: setETA,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Received_To_Port',
		headerName: 'Received_To_Port',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getReceived_To_Port,
		valueSetter: setReceived_To_Port,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Port_Clearance',
		headerName: 'Port Clearance Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPort_Clearance,
		valueSetter: setPort_Clearance,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Remarks',
		headerName: 'Remarks',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Mobilization_Status',
		headerName: 'Mobilization Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Completed', 'Pending', 'Hold'],
		editable: true
	},
	{
		field: 'Mobilized_Date',
		headerName: 'Mobilized Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getMobilized_Date,
		valueSetter: setMobilized_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Installation_Status',
		headerName: 'Installation Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 240,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: [
			'Completed',
			'TX Completed-Power Pending',
			'TX Pending-Power Completed',
			'TX Pending-Power Pending',
			'Installation Pending',
			'Hold'
		],
		editable: true
	},
	{
		field: 'Installation_Date',
		headerName: 'Installation Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getInstallation_Date,
		valueSetter: setInstallation_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Power_Connected_Date',
		headerName: 'Power Connected Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPower_Connected_Date,
		valueSetter: setPower_Connected_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'TX_Connected_Date',
		headerName: 'TX Connected Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getTX_Connected_Date,
		valueSetter: setTX_Connected_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Commissioning_Status',
		headerName: 'Commissioning Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Completed', 'Pending', 'Hold'],
		editable: true
	},
	{
		field: 'Commisioned_Date',
		headerName: 'Commisioned Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCommisioned_Date,
		valueSetter: setCommisioned_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'SAR_Reference',
		headerName: 'SAR Reference',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'SAR_Status',
		headerName: 'SAR Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Approved', 'Submitted', 'Pending', 'Rejected', 'PAT Only'],
		editable: true
	},
	{
		field: 'SAR_Date',
		headerName: 'SAR Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getSAR_Date,
		valueSetter: setSAR_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PAT_Reference',
		headerName: 'PAT Reference',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PAT_Status',
		headerName: 'PAT Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Pass', 'Pass with minor', 'Submitted', 'Rejected', 'Pending', 'SAR Only'],
		editable: true
	},
	{
		field: 'PAT_Submitted',
		headerName: 'PAT Submitted Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPAT_Pass_Date,
		valueSetter: setPAT_Pass_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PAT_Pass_Date',
		headerName: 'PAT Pass Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPAT_Pass_Date,
		valueSetter: setPAT_Pass_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Check_List_Submitted',
		headerName: 'Check List Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCheck_List_Submitted,
		valueSetter: setCheck_List_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Check_List_Verified',
		headerName: 'Check List Verified',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCheck_List_Verified,
		valueSetter: setCheck_List_Verified,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'On_Air_Status',
		headerName: 'On Air Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Completed', 'Pending', 'Hold'],
		editable: true
	},
	{
		field: 'On_Air_Date',
		headerName: 'On Air Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getOn_Air_Date,
		valueSetter: setOn_Air_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Material_Reconciled',
		headerName: 'Material Reconciled',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getMaterial_Reconciled,
		valueSetter: setMaterial_Reconciled,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Balance_Material_Returned_Date',
		headerName: 'Balance Material Returned Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getBalance_Material_Returned_Date,
		valueSetter: setBalance_Material_Returned_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'COW_Number',
		headerName: 'COW Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'COW_Submitted',
		headerName: 'COW Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCOW_Submitted,
		valueSetter: setCOW_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'COW_Approved',
		headerName: 'COW Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCOW_Approved,
		valueSetter: setCOW_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'CPL_Number',
		headerName: 'CPL Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'CPL_Submitted',
		headerName: 'CPL Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCPL_Submitted,
		valueSetter: setCPL_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'CPL_Approved',
		headerName: 'CPL Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCPL_Approved,
		valueSetter: setCPL_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PAC_Invoice_Number',
		headerName: 'PAC/Invoice Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PAC_Invoice_Submitted',
		headerName: 'PAC/Invoice Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPAC_Invoice_Submitted,
		valueSetter: setPAC_Invoice_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PAC_Invoice_Approved',
		headerName: 'PAC/Invoice Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPAC_Invoice_Approved,
		valueSetter: setPAC_Invoice_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'FAC_Number',
		headerName: 'FAC Number',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'FAC_Submitted',
		headerName: 'FAC Submitted',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getFAC_Submitted,
		valueSetter: setFAC_Submitted,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'FAC_Approved',
		headerName: 'FAC Approved',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getFAC_Approved,
		valueSetter: setFAC_Approved,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'PO_Status',
		headerName: 'PO Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Open', 'Closed'],
		editable: true
	},
	{
		field: 'PO_Closed_Date',
		headerName: 'PO Closed Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getPO_Closed_Date,
		valueSetter: setPO_Closed_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Capitalization_Status',
		headerName: 'Capitalization Status',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		type: 'singleSelect',
		valueOptions: ['Completed', 'Pending'],
		editable: true
	},
	{
		field: 'Capitalized_Date',
		headerName: 'Capitalized Date',
		headerClassName: 'super-app-theme--header',
		type: 'date',
		valueGetter: getCapitalized_Date,
		valueSetter: setCapitalized_Date,
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	},
	{
		field: 'Fiance_Remakrs',
		headerName: 'Fiance Remakrs',
		headerClassName: 'super-app-theme--header',
		headerAlign: 'left',
		align: 'left',
		width: 180,
		cellClassName: (params) => clsx('super-app-theme--cell'),
		editable: true
	}
]