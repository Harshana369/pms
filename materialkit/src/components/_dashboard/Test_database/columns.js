export const COLUMNS = [
  {
    Header: 'Index',
    id: 'row',
    Cell: (row) => <div>{row.index}</div>,
    disableSortBy: true,
    disableFilters: true
  },
  {
    Header: 'Project ID',
    accessor: '_id'
  },
  {
    Header: 'Implementation By',
    accessor: 'Implementation_By'
    // sticky: 'left'
  },
  {
    Header: 'Project',
    accessor: 'Project',
    minWidth: 250
  },
  {
    Header: 'Scope',
    accessor: 'Scope',
    minWidth: 250
  },
  {
    Header: 'Handover Date',
    accessor: 'HO_Date'
  },
  {
    Header: 'Site ID',
    accessor: 'Site_ID'
  },
  {
    Header: 'Site Name',
    accessor: 'Site_Name'
  },
  {
    Header: 'New RAT',
    accessor: 'New_RAT'
  },
  {
    Header: 'Site Engineer',
    accessor: 'Site_Engineer'
  },
  {
    Header: 'Sub Contractor',
    accessor: 'Sub_Contractor'
  },
  {
    Header: 'Site Status',
    accessor: 'Site_Status'
  },
  {
    Header: 'Responsible',
    accessor: 'Responsible'
  },
  {
    Header: 'Civil PAT Date',
    accessor: 'Civil_PAT_Date'
  },
  {
    Header: 'SAQ Clearance Date',
    accessor: 'SAQ_Clearance_Date'
  },
  {
    Header: 'Approval Received Date',
    accessor: 'Approval_Received_Date'
  },
  {
    Header: 'MCW Requested Date',
    accessor: 'MCW_Requested_Date'
  },
  {
    Header: 'MCW Completed Date',
    accessor: 'MCW_Completed_Date'
  },
  {
    Header: 'Mobilization Status',
    accessor: 'Mobilization_Status'
  },
  {
    Header: 'Mobilized Date',
    accessor: 'Mobilized_Date'
  },
  {
    Header: 'Installation Status',
    accessor: 'Installation_Status'
  },
  {
    Header: 'Installation Date',
    accessor: 'Installation_Date'
  },
  {
    Header: 'Power Connected Date',
    accessor: 'Power_Connected_Date'
  },
  {
    Header: 'TX Connected Date',
    accessor: 'TX_Connected_Date'
  },
  {
    Header: 'Commissioning Status',
    accessor: 'Commissioning_Status'
  },
  {
    Header: 'Commisioned Date',
    accessor: 'Commisioned_Date'
  },
  {
    Header: 'SAR Status',
    accessor: 'SAR_Status'
  },
  {
    Header: 'SAR_Date',
    accessor: 'SAR_Date'
  },
  {
    Header: 'PAT_Status',
    accessor: 'PAT_Status'
  },
  {
    Header: 'PAT_Pass_Date',
    accessor: 'PAT_Pass_Date'
  },
  {
    Header: 'Check_List_Submitted',
    accessor: 'Check_List_Submitted'
  },
  {
    Header: 'Check_List_Verified',
    accessor: 'Check_List_Verified'
  },
  {
    Header: 'On_Air_Target',
    accessor: 'On_Air_Target'
  },
  {
    Header: 'On_Air_Status',
    accessor: 'On_Air_Status'
  },
  {
    Header: 'On_Air_Date',
    accessor: 'On_Air_Date'
  },
  {
    Header: 'PR_Submitted_for_TSS',
    accessor: 'PR_Submitted_for_TSS'
  },
  {
    Header: 'PR_Raised_for_TSS',
    accessor: 'PR_Raised_for_TSS'
  },
  {
    Header: 'PR_Number_for_TSS',
    accessor: 'PR_Number_for_TSS'
  },
  {
    Header: 'TSS_PO_number',
    accessor: 'TSS_PO_number'
  },
  {
    Header: 'PO_Issued_for_TSS',
    accessor: 'PO_Issued_for_TSS'
  },
  {
    Header: 'TSS HO',
    accessor: 'TSS_HO'
  },
  {
    Header: 'TSSR Submitted',
    accessor: 'TSSR_Submitted'
  },
  {
    Header: 'TSSR Approved',
    accessor: 'TSSR_Approved'
  },
  {
    Header: 'BOQ Submitted',
    accessor: 'BOQ_Submitted'
  },
  {
    Header: 'Imp Handover',
    accessor: 'Imp_HO'
  },
  {
    Header: 'PR Submission For Imp',
    accessor: 'PR_Submission_for_Imp'
  },
  {
    Header: 'PR Number For Imp',
    accessor: 'PR_Number_for_Imp'
  },
  {
    Header: 'PR Raised For Imp',
    accessor: 'PR_Raised_for_Imp'
  },
  {
    Header: 'PO Issued For Imp',
    accessor: 'PO_Issued_for_Imp'
  },
  {
    Header: 'PR Sub For Supply',
    accessor: 'PR_Sub_for_supply'
  },
  {
    Header: 'PR Number For Supply',
    accessor: 'PR_Number_for_supply'
  },
  {
    Header: 'PR Raised For Supply',
    accessor: 'PR_Raised_for_supply'
  },
  {
    Header: 'PO Issued For Supply',
    accessor: 'PO_Issued_for_supply'
  },
  {
    Header: 'PI Submitted',
    accessor: 'PI_Submitted'
  },
  {
    Header: 'PI Number',
    accessor: 'PI_Number'
  },
  {
    Header: 'PI Approved',
    accessor: 'PI_Approved'
  },
  {
    Header: 'TRC Completed',
    accessor: 'TRC_Completed'
  },
  {
    Header: 'BOI Completed',
    accessor: 'BOI_Completed'
  },
  {
    Header: 'ICL Completed',
    accessor: 'ICL_Completed'
  },
  {
    Header: 'LC Issued',
    accessor: 'LC_Issued'
  },
  {
    Header: 'Shipped',
    accessor: 'Shipped'
  },
  {
    Header: 'Received at Port',
    accessor: 'Received_at_port'
  },
  {
    Header: 'Delivered to WH',
    accessor: 'Delivered_to_WH'
  },
  {
    Header: 'Reconciled',
    accessor: 'Reconciled'
  },
  {
    Header: 'COW Submitted',
    accessor: 'COW_Submitted'
  },
  {
    Header: 'COW Approved',
    accessor: 'COW_Approved'
  },
  {
    Header: 'Supply HW PAC Submitted',
    accessor: 'Supply_HW_PAC_Submitted'
  },
  {
    Header: 'Supply HW PAC Approved',
    accessor: 'Supply_HW_PAC_Approved'
  },
  {
    Header: 'Imp PAC Submitted',
    accessor: 'Imp_PAC_Submitted'
  },
  {
    Header: 'Imp PAC Approved',
    accessor: 'Imp_PAC_Approved'
  },
  {
    Header: 'Supply SW PAC Submitted',
    accessor: 'Supply_SW_PAC_Submitted'
  },
  {
    Header: 'Supply SW PAC Approved',
    accessor: 'Supply_SW_PAC_Approved'
  },
  {
    Header: 'Capitalization Supply HW',
    accessor: 'Capitalization_Supply_HW'
  },
  {
    Header: 'Capitalization Imp',
    accessor: 'Capitalization_Imp'
  },
  {
    Header: 'Capitalization Supply SW',
    accessor: 'Capitalization_Supply_SW'
  }
];
