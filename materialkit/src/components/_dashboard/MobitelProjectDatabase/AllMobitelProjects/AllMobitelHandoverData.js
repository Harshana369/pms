/* eslint-disable */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Page from '../../../../components/Page';

import { Box } from '@mui/material';
import MaterialTable from 'material-table';

function AllMobitelHandoverData() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [dat, setData] = useState();

  const DropDownValue = 'All Site Engineers';
  const ProjectNameDropdownValue = 'All Mobitel Projects';

  const fetchData = async () => {
    const res = await axiosInstance.get(`/mobitelProjectsDatabasesSiteData`, {
      params: { Site_Engineer: DropDownValue, Project: ProjectNameDropdownValue }
    });
    setData(res.data.posts);
    console.log(res.data.posts);
  };

  // const addNewRowData = async () => {
  //   console.log('ok');

  //   await axiosInstance.post(`/materialProjectsDatabases/save/${objID}`, addNewRow).then((res) => {
  //     alert(res.status);
  //   });
  //   //   try {
  //   //     const res = await axios.post(
  //   //       `/materialProjectsDatabases/save/${objID}`,
  //   //       addNewRow
  //   //     );
  //   //   } catch (e) {
  //   //     alert(e);
  //   //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const column = [
    // {
    //   field: '_id',
    //   title: 'Project ID',
    //   width: 150
    // },
    {
      field: 'Planning_ID',
      title: 'Planning_ID'
    },
    {
      field: 'Implementation_By',
      title: 'Implementation_By'
    },
    {
      field: 'Project',
      title: 'Project',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      field: 'Site_ID',
      title: 'Site_ID',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      field: 'Site_Name',
      title: 'Site_Name',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      field: 'HO_Date',
      title: 'HO_Date'
    },
    {
      field: 'HO_Modification',
      title: 'HO_Modification'
    },
    {
      field: 'HO_Modified_Date',
      title: 'HO_Modified_Date'
    },
    {
      field: 'Scope',
      title: 'Scope',
      cellStyle: {
        minWidth: 300,
        maxWidth: 300
      }
    },
    {
      field: 'New_RAT',
      title: 'New_RAT',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      field: 'New_Sector',
      title: 'New_Sector'
    },
    {
      field: 'Approval_Status',
      title: 'Approval_Status'
    },
    {
      field: 'Approval_Ref',
      title: 'Approval_Ref'
    },
    {
      field: 'IMP_Scenario',
      title: 'IMP_Scenario.'
    },
    {
      field: 'blank1',
      title: 'Blank'
    },
    {
      field: 'blank2',
      title: 'Blank'
    },
    {
      field: 'blank3',
      title: 'Blank'
    },
    {
      field: 'Tilt',
      title: 'Tilt'
    },
    {
      field: 'Azimuth',
      title: 'Azimuth',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      field: 'Antenna_Height',
      title: 'Antenna_Height'
    },
    {
      field: 'New_RRU_Type',
      title: 'New_RRU_Type'
    },
    {
      field: 'RRU_From',
      title: 'RRU_From'
    },
    {
      field: 'New_BTS_Type',
      title: 'New_BTS_Type'
    },
    {
      field: 'BTS_From',
      title: 'BTS_From'
    },
    {
      field: 'New_Antenna_Type',
      title: 'New_Antenna_Type'
    },
    {
      field: 'Antenna_From',
      title: 'Antenna_From'
    },
    {
      field: 'Cards_Type_n_From',
      title: 'Cards_Type_n_From'
    },
    {
      field: 'Battery_count_n_From',
      title: 'Battery_count_n_From'
    },

    {
      field: 'Mobitel_Region',
      title: 'Mobitel_Region'
    },
    {
      field: 'Planning_Engineer',
      title: 'Planning_Engineer'
    },
    {
      field: 'On_Air_Target',
      title: 'On_Air_Target'
    },
    {
      field: 'Planning_Comments',
      title: 'Planning_Comments',

      cellStyle: {
        minWidth: 1800,
        maxWidth: 1800
      }
    },
    {
      field: 'Site_Engineer',
      title: 'Site_Engineer',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      field: 'Assigned_Date',
      title: 'Assigned_Date'
    },
    {
      field: 'Special_Tag',
      title: 'Special_Tag',
      cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }
    },
    {
      field: 'Coordinator_Comments',
      title: 'Coordinator_Comments'
    },
    {
      field: 'Sub_Contractor',
      title: 'Sub_Contractor',
      cellStyle: {
        minWidth: 300,
        maxWidth: 300
      }
    },
    {
      field: 'Sub_Contractor_Remarks',
      title: 'Sub_Contractor_Remarks',
      cellStyle: {
        minWidth: 300,
        maxWidth: 300
      }
    },
    {
      field: 'Site_Status',
      title: 'Site_Status'
    },
    {
      field: 'Dependency',
      title: 'Dependency'
    },
    {
      field: 'Responsible',
      title: 'Responsible'
    },
    {
      field: 'Dependencies_On_Air_Target',
      title: 'Dependencies_On_Air_Target'
    },
    {
      field: 'Civil_PAT_Date',
      title: 'Civil_PAT_Date'
    },
    {
      field: 'SAQ_Clearance_Date',
      title: 'SAQ_Clearance_Date'
    },
    {
      field: 'TSSR_Referance',
      title: 'TSSR_Referance'
    },
    {
      field: 'TSSR_Submitted_Date',
      title: 'TSSR_Submitted_Date'
    },
    {
      field: 'TSSR_Approved_Date',
      title: 'TSSR_Approved_Date'
    },
    {
      field: 'Supply_BOQ_Submitted',
      title: 'Supply_BOQ_Submitted'
    },
    {
      field: 'Supply_BOQ_Approved',
      title: 'Supply_BOQ_Approved'
    },
    {
      field: 'Approval_Received_Date',
      title: 'Approval_Received_Date'
    },
    {
      field: 'MCW_Requested_Date',
      title: 'MCW_Requested_Date'
    },
    {
      field: 'MCW_Completed_Date',
      title: 'MCW_Completed_Date'
    },
    {
      field: 'Supply_PR_Submitted',
      title: 'Supply_PR_Submitted'
    },
    {
      field: 'Supply_PR_Status',
      title: 'Supply_PR_Status'
    },
    {
      field: 'Supply_PR_Approved_Date',
      title: 'Supply_PR_Approved_Date'
    },
    {
      field: 'Supply_PR_Number',
      title: 'Supply_PR_Number'
    },
    {
      field: 'Supply_PR_Raise',
      title: 'Supply_PR_Raise'
    },
    {
      field: 'Supply_PO_Number',
      title: 'Supply_PO_Number'
    },
    {
      field: 'Supply_PO_Issued',
      title: 'Supply_PO_Issued'
    },
    {
      field: 'IMP_PR_Submitted',
      title: 'IMP_PR_Submitted'
    },
    {
      field: 'IMP_PR_Approved_Date',
      title: 'IMP_PR_Approved_Date'
    },
    {
      field: 'IMP_PR_Number',
      title: 'IMP_PR_Number'
    },
    {
      field: 'IMP_PR_Raised',
      title: 'IMP_PR_Raised'
    },
    {
      field: 'IMP_PO_Number',
      title: 'IMP_PO_Number'
    },
    {
      field: 'IMP_PO_Issued',
      title: 'IMP_PO_Issued'
    },
    {
      field: 'AWR_1',
      title: 'AWR_1'
    },
    {
      field: 'AWR_2',
      title: 'AWR_2'
    },
    {
      field: 'AWR_3',
      title: 'AWR_3'
    },
    {
      field: 'PI_Number',
      title: 'PI_Number'
    },
    {
      field: 'PI_Submitted',
      title: 'PI_Submitted'
    },
    {
      field: 'PI_Approved_ENG',
      title: 'PI_Approved_ENG'
    },
    {
      field: 'TRC_Approved',
      title: 'TRC_Approved'
    },
    {
      field: 'BOI_Approved',
      title: 'BOI_Approved'
    },
    {
      field: 'ICL_Approved',
      title: 'ICL_Approved'
    },
    {
      field: 'Payment_Method',
      title: 'Payment_Method'
    },
    {
      field: 'Payment_Confirmed',
      title: 'Payment_Confirmed'
    },
    {
      field: 'ETA',
      title: 'ETA'
    },
    {
      field: 'Received_To_Port',
      title: 'Received_To_Port'
    },
    {
      field: 'Port_Clearance',
      title: 'Port_Clearance'
    },
    {
      field: 'Logistics_Remarks',
      title: 'Logistics_Remarks'
    },
    {
      field: 'Mobilization_Status',
      title: 'Mobilization_Status'
    },
    {
      field: 'Mobilized_Date',
      title: 'Mobilized_Date'
    },
    {
      field: 'Installation_Status',
      title: 'Installation_Status'
    },
    {
      field: 'Installation_Date',
      title: 'Installation_Date'
    },
    {
      field: 'Power_Connected_Date',
      title: 'Power_Connected_Date'
    },
    {
      field: 'TX_Connected_Date',
      title: 'TX_Connected_Date'
    },
    {
      field: 'Commissioning_Status',
      title: 'Commissioning_Status'
    },
    {
      field: 'Commisioned_Date',
      title: 'Commisioned_Date'
    },
    {
      field: 'SAR_Reference',
      title: 'SAR_Reference'
    },
    {
      field: 'SAR_Status',
      title: 'SAR_Status'
    },
    {
      field: 'SAR_Date',
      title: 'SAR_Date'
    },
    {
      field: 'PAT_Reference',
      title: 'PAT_Reference'
    },
    {
      field: 'PAT_Status',
      title: 'PAT_Status'
    },
    {
      field: 'PAT_Submitted',
      title: 'PAT_Submitted'
    },
    {
      field: 'PAT_Pass_Date',
      title: 'PAT_Pass_Date'
    },
    {
      field: 'Check_List_Submitted',
      title: 'Check_List_Submitted'
    },
    {
      field: 'Check_List_Verified',
      title: 'Check_List_Verified'
    },
    {
      field: 'On_Air_Status',
      title: 'On_Air_Status'
    },
    {
      field: 'On_Air_Date',
      title: 'On_Air_Date'
    },
    {
      field: 'Material_Reconciled',
      title: 'Material_Reconciled'
    },
    {
      field: 'Balance_Material_Returned_Date',
      title: 'Balance_Material_Returned_Date'
    },
    {
      field: 'COW_Number',
      title: 'COW_Number'
    },
    {
      field: 'COW_Submitted',
      title: 'COW_Submitted'
    },
    {
      field: 'COW_Approved',
      title: 'COW_Approved'
    },
    {
      field: 'CPL_Number',
      title: 'CPL_Number'
    },
    {
      field: 'CPL_Submitted',
      title: 'CPL_Submitted'
    },
    {
      field: 'CPL_Approved',
      title: 'CPL_Approved'
    },
    {
      field: 'PAC_Invoice_Number',
      title: 'PAC_Invoice_Number'
    },
    {
      field: 'PAC_Invoice_Submitted',
      title: 'PAC_Invoice_Submitted'
    },
    {
      field: 'PAC_Invoice_Approved',
      title: 'PAC_Invoice_Approved'
    },
    {
      field: 'FAC_Number',
      title: 'FAC_Number'
    },
    {
      field: 'FAC_Submitted',
      title: 'FAC_Submitted'
    },
    {
      field: 'FAC_Approved',
      title: 'FAC_Approved'
    },
    {
      field: 'PO_Status',
      title: 'PO_Status'
    },
    {
      field: 'PO_Closed_Date',
      title: 'PO_Closed_Date'
    },
    {
      field: 'Capitalization_Status',
      title: 'Capitalization_Status'
    },
    {
      field: 'Capitalized_Date',
      title: 'Capitalized_Date'
    },
    {
      field: 'Finance_Remarks',
      title: 'Finance_Remarks'
    },
    {
      field: 'currentUser',
      title: 'Last Modified By'
    }
  ];

  // const column = [
  //   { title: 'Adı', field: 'name' },
  //   { title: 'Soyadı', field: 'surname' },
  //   { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
  //   { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
  // ];

  const rows = [{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }];
  return (
    <Page title="Mobitel Projects Databases | Projects Management Database">
      {/* <Typography variant="h6" gutterBottom>
        HandOverData
      </Typography> */}
      <Box>
        <MaterialTable
          title="HandOver Data"
          data={dat}
          columns={column}
          options={{
            filtering: true,
            // addRowPosition: 'first',
            // actionsColumnIndex: -1
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF'
            },
            columnsButton: true
          }}
        />
      </Box>
    </Page>
  );
}

export default AllMobitelHandoverData;
