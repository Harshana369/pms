import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  gridSortedRowIdsSelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
  useGridApiRef
} from '@mui/x-data-grid';
import { createSvgIcon } from '@mui/material/utils';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Columns } from './Columns';
/* eslint-disable camelcase */

const getRowsFromCurrentPage = ({ apiRef }) => gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

const getFilteredRows = ({ apiRef }) => gridVisibleSortedRowIdsSelector(apiRef);

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt'
);

const useDummyMutation = () =>
  React.useCallback(
    (post) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve(post);
        }, 500)
      ),
    []
  );

export default function Datagrid() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const mutateRow = useDummyMutation();
  const apiRef = useGridApiRef();

  const [pageSize, setPageSize] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [snackbar, setSnackbar] = React.useState(null);
  const [state, setState] = React.useState([]);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/mobitelProjectsDatabasesSiteData`);
    setState(res.data.posts);
  };

  // const columnsArray = useMemo(() => Columns, []);
  // const data = useMemo(() => rows);

  const getRowsFromCurrentPage = ({ apiRef }) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

  const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

  const getFilteredRows = ({ apiRef }) => gridVisibleSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    'SaveAlt'
  );

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

    const buttonBaseProps = {
      color: 'primary',
      size: 'small',
      startIcon: <ExportIcon />
    };

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button
          {...buttonBaseProps}
          onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
        >
          All Database
        </Button>
        <Button
          {...buttonBaseProps}
          onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
        >
          Filtered rows
        </Button>
        <Button
          {...buttonBaseProps}
          onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}
        >
          Current page rows
        </Button>
        <IconButton
          style={{ float: 'right' }}
          onClick={() => {
            const selectedIDs = selectionModel;
            const confirmBox = window.confirm('Do you want to delete this?');
            if (confirmBox === true) {
              // console.log(selectedIDs);
              // delete function here
              deleteUser(selectedIDs);
              // setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
              navigate('/dashboard/TasksTestDatagrid', { replace: true });
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };

  const deleteUser = async (selectedIDs) => {
    await axiosInstance.delete(`/mobitelProjectsDatabases/delete/${selectedIDs}`).catch((err) => {
      console.log(err.message);
    });
    alert('Successfully Deleted');
  };

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);

      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        // console.log(editRowData);
        // console.log(JSON.stringify(editRowData, null, 4));

        const Project_ID = ``;
        const Implementation_By = editRowData.Implementation_By.value;
        const Project = editRowData.Project.value;
        const Scope = editRowData.Scope.value;
        const HO_Date = moment(editRowData.HO_Date.value).format('YYYY-MM-DD');
        const Site_ID = editRowData.Site_ID.value;
        const Site_Name = editRowData.Site_Name.value;
        const New_RAT = editRowData.New_RAT.value;
        const Site_Engineer = editRowData.Site_Engineer.value;
        const Sub_Contractor = editRowData.Sub_Contractor.value;
        const Site_Status = editRowData.Site_Status.value;
        const Responsible = editRowData.Responsible.value;
        const Civil_PAT_Date = moment(editRowData.Civil_PAT_Date.value).format('YYYY-MM-DD');
        const SAQ_Clearance_Date = moment(editRowData.SAQ_Clearance_Date.value).format(
          'YYYY-MM-DD'
        );
        const Approval_Received_Date = moment(editRowData.Approval_Received_Date.value).format(
          'YYYY-MM-DD'
        );
        const MCW_Requested_Date = moment(editRowData.MCW_Requested_Date.value).format(
          'YYYY-MM-DD'
        );
        const MCW_Completed_Date = moment(editRowData.MCW_Completed_Date.value).format(
          'YYYY-MM-DD'
        );
        const Mobilization_Status = editRowData.Mobilization_Status.value;
        const Mobilized_Date = moment(editRowData.Mobilized_Date.value).format('YYYY-MM-DD');
        const Installation_Status = editRowData.Installation_Status.value;
        const Installation_Date = moment(editRowData.Installation_Date.value).format('YYYY-MM-DD');
        const Power_Connected_Date = moment(editRowData.Power_Connected_Date.value).format(
          'YYYY-MM-DD'
        );
        const TX_Connected_Date = moment(editRowData.TX_Connected_Date.value).format('YYYY-MM-DD');
        const Commissioning_Status = editRowData.Commissioning_Status.value;
        const Commisioned_Date = moment(editRowData.Commisioned_Date.value).format('YYYY-MM-DD');
        const SAR_Status = editRowData.SAR_Status.value;
        const SAR_Date = moment(editRowData.SAR_Date.value).format('YYYY-MM-DD');
        const PAT_Status = editRowData.PAT_Status.value;
        const PAT_Pass_Date = moment(editRowData.PAT_Pass_Date.value).format('YYYY-MM-DD');
        const Check_List_Submitted = moment(editRowData.Check_List_Submitted.value).format(
          'YYYY-MM-DD'
        );
        const Check_List_Verified = moment(editRowData.Check_List_Verified.value).format(
          'YYYY-MM-DD'
        );
        const On_Air_Target = moment(editRowData.On_Air_Target.value).format('YYYY-MM-DD');
        const On_Air_Status = editRowData.On_Air_Status.value;
        const On_Air_Date = moment(editRowData.On_Air_Date.value).format('YYYY-MM-DD');
        const PR_Submitted_for_TSS = moment(editRowData.PR_Submitted_for_TSS.value).format(
          'YYYY-MM-DD'
        );
        const PR_Raised_for_TSS = moment(editRowData.PR_Raised_for_TSS.value).format('YYYY-MM-DD');
        const PR_Number_for_TSS = editRowData.PR_Number_for_TSS.value;
        const TSS_PO_number = editRowData.TSS_PO_number.value;
        const PO_Issued_for_TSS = moment(editRowData.PO_Issued_for_TSS.value).format('YYYY-MM-DD');
        const TSS_HO = editRowData.TSS_HO.value;
        const TSSR_Submitted = moment(editRowData.TSSR_Submitted.value).format('YYYY-MM-DD');
        const TSSR_Approved = moment(editRowData.TSSR_Approved.value).format('YYYY-MM-DD');
        const BOQ_Submitted = moment(editRowData.BOQ_Submitted.value).format('YYYY-MM-DD');
        const Imp_HO = moment(editRowData.Imp_HO.value).format('YYYY-MM-DD');
        const PR_Submission_for_Imp = moment(editRowData.PR_Submission_for_Imp.value).format(
          'YYYY-MM-DD'
        );
        const PR_Number_for_Imp = editRowData.PR_Number_for_Imp.value;
        const PR_Raised_for_Imp = moment(editRowData.PR_Raised_for_Imp.value).format('YYYY-MM-DD');
        const PO_Issued_for_Imp = moment(editRowData.PO_Issued_for_Imp.value).format('YYYY-MM-DD');
        const PR_Sub_for_supply = moment(editRowData.PR_Sub_for_supply.value).format('YYYY-MM-DD');
        const PR_Number_for_supply = editRowData.PR_Number_for_supply.value;
        const PR_Raised_for_supply = moment(editRowData.PR_Raised_for_supply.value).format(
          'YYYY-MM-DD'
        );
        const PO_Issued_for_supply = moment(editRowData.PO_Issued_for_supply.value).format(
          'YYYY-MM-DD'
        );
        const PI_Submitted = moment(editRowData.PI_Submitted.value).format('YYYY-MM-DD');
        const PI_Number = editRowData.PI_Number.value;
        const PI_Approved = moment(editRowData.PI_Approved.value).format('YYYY-MM-DD');
        const TRC_Completed = moment(editRowData.TRC_Completed.value).format('YYYY-MM-DD');
        const BOI_Completed = moment(editRowData.BOI_Completed.value).format('YYYY-MM-DD');
        const ICL_Completed = moment(editRowData.ICL_Completed.value).format('YYYY-MM-DD');
        const LC_Issued = moment(editRowData.LC_Issued.value).format('YYYY-MM-DD');
        const Shipped = moment(editRowData.Shipped.value).format('YYYY-MM-DD');
        const Received_at_port = moment(editRowData.Received_at_port.value).format('YYYY-MM-DD');
        const Delivered_to_WH = moment(editRowData.Delivered_to_WH.value).format('YYYY-MM-DD');
        const Reconciled = moment(editRowData.Reconciled.value).format('YYYY-MM-DD');
        const COW_Submitted = moment(editRowData.COW_Submitted.value).format('YYYY-MM-DD');
        const COW_Approved = moment(editRowData.COW_Approved.value).format('YYYY-MM-DD');
        const Supply_HW_PAC_Submitted = moment(editRowData.Supply_HW_PAC_Submitted.value).format(
          'YYYY-MM-DD'
        );
        const Supply_HW_PAC_Approved = moment(editRowData.Supply_HW_PAC_Approved.value).format(
          'YYYY-MM-DD'
        );
        const Imp_PAC_Submitted = moment(editRowData.Imp_PAC_Submitted.value).format('YYYY-MM-DD');
        const Imp_PAC_Approved = moment(editRowData.Imp_PAC_Approved.value).format('YYYY-MM-DD');
        const Supply_SW_PAC_Submitted = moment(editRowData.Supply_SW_PAC_Submitted.value).format(
          'YYYY-MM-DD'
        );
        const Supply_SW_PAC_Approved = moment(editRowData.Supply_SW_PAC_Approved.value).format(
          'YYYY-MM-DD'
        );
        const Capitalization_Supply_HW = moment(editRowData.Capitalization_Supply_HW.value).format(
          'YYYY-MM-DD'
        );
        const Capitalization_Imp = moment(editRowData.Capitalization_Imp.value).format(
          'YYYY-MM-DD'
        );
        const Capitalization_Supply_SW = moment(editRowData.Capitalization_Supply_SW.value).format(
          'YYYY-MM-DD'
        );

        const newPost = {
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
          On_Air_Target,
          On_Air_Status,
          On_Air_Date,
          PR_Submitted_for_TSS,
          PR_Raised_for_TSS,
          PR_Number_for_TSS,
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
        };

        // update to the MongoDB
        const confirmBox = window.confirm('Do you want to save this ?');
        if (confirmBox === true) {
          axiosInstance.put(`/DatabasesMobitelProjects/Edit/${editRowData._id.value}`, newPost);
          setSnackbar({ children: 'Successfully saved', severity: 'success' });
        }
        fetchData();
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
    },
    [editRowData]
  );

  return (
    <Box
      sx={{
        height: 515,
        width: '100%',
        '& .super-app-theme--header': {
          backGridolor: 'rgba(0,0,0,0)',
          color: 'rgb(198,198,198)',
          fontWeight: '600'
        },
        '& .super-app-theme--cell': {
          backGridolor: 'rgba(0,0,0,0)',
          color: 'rgb(128,128,128)',
          fontWeight: '200'
        }
      }}
    >
      <DataGrid
        apiRef={apiRef}
        rows={state}
        columns={Columns}
        components={{ Toolbar: CustomToolbar }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        pagination
        density="compact"
        disableSelectionOnClick
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        checkboxSelection
        // onCellEditCommit={handleCellEditCommit}
        // onRowEditCommit={handleRowEditCommit}
        editMode="row"
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        sx={{
          boxShadow: 0,
          border: 0.1,
          borderColor: 'secondary.main',
          '& .MuidataGrid-cell:hover': {
            color: 'secondary.main'
          }
        }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={5000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
