const handleShowPassword1 = () => {
    setShowCheckMark1((show) => !show);
    if (showCheckMark1 === false) {
      newPost.On_Air_Target = 'Not Applicable';
    } else if (showCheckMark1 === true) {
      newPost.On_Air_Target = '';
    }
  };

  const handleShowPassword2 = () => {
    setShowCheckMark2((show) => !show);
    if (showCheckMark2 === false) {
      newPost.Assigned_Date = 'Not Applicable';
    } else if (showCheckMark1 === true) {
      newPost.Assigned_Date = '';
    }
  };

  const handleShowPassword3 = () => {
    setShowCheckMark3((show) => !show);
    if (showCheckMark3 === false) {
      newPost.HO_Modified_Date = 'Not Applicable';
    } else if (showCheckMark1 === true) {
      newPost.HO_Modified_Date = '';
    }
  };

  const handleShowPassword4 = () => {
    setShowCheckMark4((show) => !show);
    if (showCheckMark4 === false) {
      newPost.Dependencies_On_Air_Target = 'Not Applicable';
    } else if (showCheckMark4 === true) {
      newPost.Dependencies_On_Air_Target = '';
    }
  };

  const handleShowPassword5 = () => {
    setShowCheckMark5((show) => !show);
    if (showCheckMark5 === false) {
      newPost.Civil_PAT_Date = 'Not Applicable';
    } else if (showCheckMark5 === true) {
      newPost.Civil_PAT_Date = '';
    }
  };

  const handleShowPassword6 = () => {
    setShowCheckMark6((show) => !show);
    if (showCheckMark6 === false) {
      newPost.SAQ_Clearance_Date = 'Not Applicable';
    } else if (showCheckMark6 === true) {
      newPost.SAQ_Clearance_Date = '';
    }
  };

  const handleShowPassword7 = () => {
    setShowCheckMark7((show) => !show);
    if (showCheckMark7 === false) {
      newPost.TSSR_Submitted_Date = 'Not Applicable';
    } else if (showCheckMark7 === true) {
      newPost.TSSR_Submitted_Date = '';
    }
  };

  const handleShowPassword8 = () => {
    setShowCheckMark8((show) => !show);
    if (showCheckMark8 === false) {
      newPost.TSSR_Approved_Date = 'Not Applicable';
    } else if (showCheckMark8 === true) {
      newPost.TSSR_Approved_Date = '';
    }
  };

  const handleShowPassword9 = () => {
    setShowCheckMark9((show) => !show);
    if (showCheckMark9 === false) {
      newPost.Supply_BOQ_Submitted = 'Not Applicable';
    } else if (showCheckMark9 === true) {
      newPost.Supply_BOQ_Submitted = '';
    }
  };

  const handleShowPassword10 = () => {
    setShowCheckMark10((show) => !show);
    if (showCheckMark10 === false) {
      newPost.Supply_BOQ_Approved = 'Not Applicable';
    } else if (showCheckMark10 === true) {
      newPost.Supply_BOQ_Approved = '';
    }
  };

  const handleShowPassword11 = () => {
    setShowCheckMark11((show) => !show);
    if (showCheckMark11 === false) {
      newPost.Approval_Received_Date = 'Not Applicable';
    } else if (showCheckMark11 === true) {
      newPost.Approval_Received_Date = '';
    }
  };

  const handleShowPassword12 = () => {
    setShowCheckMark12((show) => !show);
    if (showCheckMark12 === false) {
      newPost.MCW_Requested_Date = 'Not Applicable';
    } else if (showCheckMark12 === true) {
      newPost.MCW_Requested_Date = '';
    }
  };

  const handleShowPassword13 = () => {
    setShowCheckMark13((show) => !show);
    if (showCheckMark13 === false) {
      newPost.MCW_Completed_Date = 'Not Applicable';
    } else if (showCheckMark13 === true) {
      newPost.MCW_Completed_Date = '';
    }
  };

  const handleShowPassword14 = () => {
    setShowCheckMark14((show) => !show);
    if (showCheckMark14 === false) {
      newPost.Supply_PR_Submitted = 'Not Applicable';
    } else if (showCheckMark14 === true) {
      newPost.Supply_PR_Submitted = '';
    }
  };

  const handleShowPassword15 = () => {
    setShowCheckMark15((show) => !show);
    if (showCheckMark15 === false) {
      newPost.Supply_PR_Approved_Date = 'Not Applicable';
    } else if (showCheckMark15 === true) {
      newPost.Supply_PR_Approved_Date = '';
    }
  };

  const handleShowPassword16 = () => {
    setShowCheckMark16((show) => !show);
    if (showCheckMark16 === false) {
      newPost.Supply_PR_Raise = 'Not Applicable';
    } else if (showCheckMark16 === true) {
      newPost.Supply_PR_Raise = '';
    }
  };

  const handleShowPassword17 = () => {
    setShowCheckMark17((show) => !show);
    if (showCheckMark17 === false) {
      newPost.Supply_PO_Issued = 'Not Applicable';
    } else if (showCheckMark17 === true) {
      newPost.Supply_PO_Issued = '';
    }
  };

  const handleShowPassword18 = () => {
    setShowCheckMark18((show) => !show);
    if (showCheckMark18 === false) {
      newPost.IMP_PR_Submitted = 'Not Applicable';
    } else if (showCheckMark18 === true) {
      newPost.IMP_PR_Submitted = '';
    }
  };

  const handleShowPassword19 = () => {
    setShowCheckMark19((show) => !show);
    if (showCheckMark19 === false) {
      newPost.IMP_PR_Approved_Date = 'Not Applicable';
    } else if (showCheckMark19 === true) {
      newPost.IMP_PR_Approved_Date = '';
    }
  };

  const handleShowPassword20 = () => {
    setShowCheckMark20((show) => !show);
    if (showCheckMark20 === false) {
      newPost.IMP_PR_Raised = 'Not Applicable';
    } else if (showCheckMark20 === true) {
      newPost.IMP_PR_Raised = '';
    }
  };

  const handleShowPassword21 = () => {
    setShowCheckMark21((show) => !show);
    if (showCheckMark21 === false) {
      newPost.IMP_PO_Issued = 'Not Applicable';
    } else if (showCheckMark21 === true) {
      newPost.IMP_PO_Issued = '';
    }
  };

  const handleShowPassword22 = () => {
    setShowCheckMark22((show) => !show);
    if (showCheckMark22 === false) {
      newPost.PI_Submitted = 'Not Applicable';
    } else if (showCheckMark22 === true) {
      newPost.PI_Submitted = '';
    }
  };

  const handleShowPassword23 = () => {
    setShowCheckMark23((show) => !show);
    if (showCheckMark23 === false) {
      newPost.PI_Approved_ENG = 'Not Applicable';
    } else if (showCheckMark23 === true) {
      newPost.PI_Approved_ENG = '';
    }
  };

  const handleShowPassword24 = () => {
    setShowCheckMark24((show) => !show);
    if (showCheckMark24 === false) {
      newPost.TRC_Approved = 'Not Applicable';
    } else if (showCheckMark24 === true) {
      newPost.TRC_Approved = '';
    }
  };

  const handleShowPassword25 = () => {
    setShowCheckMark25((show) => !show);
    if (showCheckMark25 === false) {
      newPost.BOI_Approved = 'Not Applicable';
    } else if (showCheckMark25 === true) {
      newPost.BOI_Approved = '';
    }
  };

  const handleShowPassword26 = () => {
    setShowCheckMark26((show) => !show);
    if (showCheckMark26 === false) {
      newPost.ICL_Approved = 'Not Applicable';
    } else if (showCheckMark26 === true) {
      newPost.ICL_Approved = '';
    }
  };

  const handleShowPassword27 = () => {
    setShowCheckMark27((show) => !show);
    if (showCheckMark27 === false) {
      newPost.Payment_Confirmed = 'Not Applicable';
    } else if (showCheckMark27 === true) {
      newPost.Payment_Confirmed = '';
    }
  };

  const handleShowPassword28 = () => {
    setShowCheckMark28((show) => !show);
    if (showCheckMark28 === false) {
      newPost.ETA = 'Not Applicable';
    } else if (showCheckMark28 === true) {
      newPost.ETA = '';
    }
  };

  const handleShowPassword29 = () => {
    setShowCheckMark29((show) => !show);
    if (showCheckMark29 === false) {
      newPost.Received_To_Port = 'Not Applicable';
    } else if (showCheckMark29 === true) {
      newPost.Received_To_Port = '';
    }
  };

  const handleShowPassword30 = () => {
    setShowCheckMark30((show) => !show);
    if (showCheckMark30 === false) {
      newPost.Port_Clearance = 'Not Applicable';
    } else if (showCheckMark30 === true) {
      newPost.Port_Clearance = '';
    }
  };

  const handleShowPassword31 = () => {
    setShowCheckMark31((show) => !show);
    if (showCheckMark31 === false) {
      newPost.Power_Connected_Date = 'Not Applicable';
    } else if (showCheckMark31 === true) {
      newPost.Power_Connected_Date = '';
    }
  };

  const handleShowPassword32 = () => {
    setShowCheckMark32((show) => !show);
    if (showCheckMark32 === false) {
      newPost.TX_Connected_Date = 'Not Applicable';
    } else if (showCheckMark32 === true) {
      newPost.TX_Connected_Date = '';
    }
  };

  const handleShowPassword33 = () => {
    setShowCheckMark33((show) => !show);
    if (showCheckMark33 === false) {
      newPost.Check_List_Submitted = 'Not Applicable';
    } else if (showCheckMark33 === true) {
      newPost.Check_List_Submitted = '';
    }
  };

  const handleShowPassword34 = () => {
    setShowCheckMark34((show) => !show);
    if (showCheckMark34 === false) {
      newPost.Check_List_Verified = 'Not Applicable';
    } else if (showCheckMark34 === true) {
      newPost.Check_List_Verified = '';
    }
  };

  const handleShowPassword35 = () => {
    setShowCheckMark35((show) => !show);
    if (showCheckMark35 === false) {
      newPost.Material_Reconciled = 'Not Applicable';
    } else if (showCheckMark35 === true) {
      newPost.Material_Reconciled = '';
    }
  };

  const handleShowPassword36 = () => {
    setShowCheckMark36((show) => !show);
    if (showCheckMark36 === false) {
      newPost.Balance_Material_Returned_Date = 'Not Applicable';
    } else if (showCheckMark36 === true) {
      newPost.Balance_Material_Returned_Date = '';
    }
  };

  const handleShowPassword37 = () => {
    setShowCheckMark37((show) => !show);
    if (showCheckMark37 === false) {
      newPost.COW_Submitted = 'Not Applicable';
    } else if (showCheckMark37 === true) {
      newPost.COW_Submitted = '';
    }
  };

  const handleShowPassword38 = () => {
    setShowCheckMark38((show) => !show);
    if (showCheckMark38 === false) {
      newPost.COW_Approved = 'Not Applicable';
    } else if (showCheckMark38 === true) {
      newPost.COW_Approved = '';
    }
  };

  const handleShowPassword39 = () => {
    setShowCheckMark39((show) => !show);
    if (showCheckMark39 === false) {
      newPost.CPL_Submitted = 'Not Applicable';
    } else if (showCheckMark39 === true) {
      newPost.CPL_Submitted = '';
    }
  };

  const handleShowPassword40 = () => {
    setShowCheckMark40((show) => !show);
    if (showCheckMark40 === false) {
      newPost.CPL_Approved = 'Not Applicable';
    } else if (showCheckMark40 === true) {
      newPost.CPL_Approved = '';
    }
  };

  const handleShowPassword41 = () => {
    setShowCheckMark41((show) => !show);
    if (showCheckMark41 === false) {
      newPost.PAC_Invoice_Submitted = 'Not Applicable';
    } else if (showCheckMark41 === true) {
      newPost.PAC_Invoice_Submitted = '';
    }
  };

  const handleShowPassword42 = () => {
    setShowCheckMark42((show) => !show);
    if (showCheckMark42 === false) {
      newPost.PAC_Invoice_Approved = 'Not Applicable';
    } else if (showCheckMark42 === true) {
      newPost.PAC_Invoice_Approved = '';
    }
  };

  const handleShowPassword43 = () => {
    setShowCheckMark43((show) => !show);
    if (showCheckMark43 === false) {
      newPost.FAC_Submitted = 'Not Applicable';
    } else if (showCheckMark43 === true) {
      newPost.FAC_Submitted = '';
    }
  };

  const handleShowPassword44 = () => {
    setShowCheckMark44((show) => !show);
    if (showCheckMark44 === false) {
      newPost.FAC_Approved = 'Not Applicable';
    } else if (showCheckMark44 === true) {
      newPost.FAC_Approved = '';
    }
  };

  const handleShowPassword45 = () => {
    setShowCheckMark45((show) => !show);
    if (showCheckMark45 === false) {
      newPost.PO_Closed_Date = 'Not Applicable';
    } else if (showCheckMark45 === true) {
      newPost.PO_Closed_Date = '';
    }
  };

  const handleShowPassword46 = () => {
    setShowCheckMark46((show) => !show);
    if (showCheckMark46 === false) {
      newPost.Capitalized_Date = 'Not Applicable';
    } else if (showCheckMark46 === true) {
      newPost.Capitalized_Date = '';
    }
  };