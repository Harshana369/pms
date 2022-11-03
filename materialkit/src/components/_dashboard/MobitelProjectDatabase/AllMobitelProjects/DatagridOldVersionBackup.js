import React, { useEffect, useState } from 'react';
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
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
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

  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [siteEngineerNamesList, setSiteEngineerNamesList] = useState([]);

  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayForInsights);
      });
  };

  const projectNames = projectNamesArray;

  useEffect(() => {
    fetchData();
    fetchProjectNames();
    fetchSiteEngineerNames();
  }, []);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/mobitelProjectsDatabasesSiteData`);
    setState(res.data.posts);
  };

  // ----------------------------------------------------------------------------------------------------------

  const fetchSiteEngineerNames = async () => {
    const req = await axiosInstance.get('/siteEngineersNamesList').then((res) => {
      setSiteEngineerNamesList(res.data.siteEngineersNamesArray);
    });
  };

  const siteEngineerNamesArray = [];

  for (let i = 0; i < siteEngineerNamesList.length; i += 1) {
    siteEngineerNamesArray[i] = siteEngineerNamesList[i];
  }

  const siteEngineerNames = siteEngineerNamesArray;

  // ----------------------------------------------------------------------------------------------------------

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
            deleteUser(selectedIDs);
            // if (selectedIDs.length > 1) {
            //   alert('You can not delete more than one project at a time.');
            // } else if (selectedIDs.length < 1) {
            //   alert('Please select a project to delete.');
            // } else {
            //   const confirmBox = window.confirm('Do you want to delete this ?');
            //   if (confirmBox === true) {
            //     // console.log(selectedIDs);
            //     deleteUser(selectedIDs);
            //     // navigate('/dashboard/vendorProjectsOverview', { replace: true });
            //   }
            // }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };

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

  function getCivil_PAT_Date(params) {
    if (
      typeof params.row.Civil_PAT_Date === 'undefined' ||
      params.row.Civil_PAT_Date == null ||
      params.row.Civil_PAT_Date === 'Invalid date'
    ) {
      return ``;
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
      return ``;
    }
    return `${params.row.SAQ_Clearance_Date}`;
  }

  function setSAQ_Clearance_Date(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const SAQ_Clearance_Date = dateString;
    return { ...params.row, SAQ_Clearance_Date };
  }

  function getApproval_Received_Date(params) {
    if (
      typeof params.row.Approval_Received_Date === 'undefined' ||
      params.row.Approval_Received_Date == null ||
      params.row.Approval_Received_Date === 'Invalid date'
    ) {
      return ``;
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
      return ``;
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
      return ``;
    }
    return `${params.row.MCW_Completed_Date}`;
  }

  function setMCW_Completed_Date(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const MCW_Completed_Date = dateString;
    return { ...params.row, MCW_Completed_Date };
  }

  function getMobilized_Date(params) {
    if (
      typeof params.row.Mobilized_Date === 'undefined' ||
      params.row.Mobilized_Date == null ||
      params.row.Mobilized_Date === 'Invalid date'
    ) {
      return ``;
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
      return ``;
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
      return ``;
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
      params.row.Power_Connected_Date === 'Invalid date'
    ) {
      return ``;
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
      return ``;
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
      return ``;
    }
    return `${params.row.SAR_Date}`;
  }

  function setSAR_Date(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const SAR_Date = dateString;
    return { ...params.row, SAR_Date };
  }

  function getPAT_Pass_Date(params) {
    if (
      typeof params.row.PAT_Pass_Date === 'undefined' ||
      params.row.PAT_Pass_Date == null ||
      params.row.PAT_Pass_Date === 'Invalid date'
    ) {
      return ``;
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
      return ``;
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
      return ``;
    }
    return `${params.row.Check_List_Verified}`;
  }

  function setCheck_List_Verified(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Check_List_Verified = dateString;
    return { ...params.row, Check_List_Verified };
  }

  function getOn_Air_Target(params) {
    if (
      typeof params.row.On_Air_Target === 'undefined' ||
      params.row.On_Air_Target == null ||
      params.row.On_Air_Target === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.On_Air_Target}`;
  }

  function setOn_Air_Target(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const On_Air_Target = dateString;
    return { ...params.row, On_Air_Target };
  }

  function getOn_Air_Date(params) {
    if (
      typeof params.row.On_Air_Date === 'undefined' ||
      params.row.On_Air_Date == null ||
      params.row.On_Air_Date === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.On_Air_Date}`;
  }

  function setOn_Air_Date(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const On_Air_Date = dateString;
    return { ...params.row, On_Air_Date };
  }

  function getPR_Submitted_for_TSS(params) {
    if (
      typeof params.row.PR_Submitted_for_TSS === 'undefined' ||
      params.row.PR_Submitted_for_TSS == null ||
      params.row.PR_Submitted_for_TSS === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PR_Submitted_for_TSS}`;
  }

  function setPR_Submitted_for_TSS(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PR_Submitted_for_TSS = dateString;
    return { ...params.row, PR_Submitted_for_TSS };
  }

  function getPR_Raised_for_TSS(params) {
    if (
      typeof params.row.PR_Raised_for_TSS === 'undefined' ||
      params.row.PR_Raised_for_TSS == null ||
      params.row.PR_Raised_for_TSS === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PR_Raised_for_TSS}`;
  }

  function setPR_Raised_for_TSS(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PR_Raised_for_TSS = dateString;
    return { ...params.row, PR_Raised_for_TSS };
  }

  function getPO_Issued_for_TSS(params) {
    if (
      typeof params.row.PO_Issued_for_TSS === 'undefined' ||
      params.row.PO_Issued_for_TSS == null ||
      params.row.PO_Issued_for_TSS === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PO_Issued_for_TSS}`;
  }

  function setPO_Issued_for_TSS(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PO_Issued_for_TSS = dateString;
    return { ...params.row, PO_Issued_for_TSS };
  }

  function getTSSR_Submitted(params) {
    if (
      typeof params.row.TSSR_Submitted === 'undefined' ||
      params.row.TSSR_Submitted == null ||
      params.row.TSSR_Submitted === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.TSSR_Submitted}`;
  }

  function setTSSR_Submitted(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const TSSR_Submitted = dateString;
    return { ...params.row, TSSR_Submitted };
  }

  function getTSSR_Approved(params) {
    if (
      typeof params.row.TSSR_Approved === 'undefined' ||
      params.row.TSSR_Approved == null ||
      params.row.TSSR_Approved === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.TSSR_Approved}`;
  }

  function setTSSR_Approved(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const TSSR_Approved = dateString;
    return { ...params.row, TSSR_Approved };
  }

  function getBOQ_Submitted(params) {
    if (
      typeof params.row.BOQ_Submitted === 'undefined' ||
      params.row.BOQ_Submitted == null ||
      params.row.BOQ_Submitted === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.BOQ_Submitted}`;
  }

  function setBOQ_Submitted(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const BOQ_Submitted = dateString;
    return { ...params.row, BOQ_Submitted };
  }

  function getImp_HO(params) {
    if (
      typeof params.row.Imp_HO === 'undefined' ||
      params.row.Imp_HO == null ||
      params.row.Imp_HO === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Imp_HO}`;
  }

  function setImp_HO(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Imp_HO = dateString;
    return { ...params.row, Imp_HO };
  }

  function getPR_Submission_for_Imp(params) {
    if (
      typeof params.row.PR_Submission_for_Imp === 'undefined' ||
      params.row.PR_Submission_for_Imp == null ||
      params.row.PR_Submission_for_Imp === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PR_Submission_for_Imp}`;
  }

  function setPR_Submission_for_Imp(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PR_Submission_for_Imp = dateString;
    return { ...params.row, PR_Submission_for_Imp };
  }

  function getPR_Raised_for_Imp(params) {
    if (
      typeof params.row.PR_Raised_for_Imp === 'undefined' ||
      params.row.PR_Raised_for_Imp == null ||
      params.row.PR_Raised_for_Imp === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PR_Raised_for_Imp}`;
  }

  function setPR_Raised_for_Imp(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PR_Raised_for_Imp = dateString;
    return { ...params.row, PR_Raised_for_Imp };
  }

  function getPO_Issued_for_Imp(params) {
    if (
      typeof params.row.PO_Issued_for_Imp === 'undefined' ||
      params.row.PO_Issued_for_Imp == null ||
      params.row.PO_Issued_for_Imp === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PO_Issued_for_Imp}`;
  }

  function setPO_Issued_for_Imp(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PO_Issued_for_Imp = dateString;
    return { ...params.row, PO_Issued_for_Imp };
  }

  function getPR_Sub_for_supply(params) {
    if (
      typeof params.row.PR_Sub_for_supply === 'undefined' ||
      params.row.PR_Sub_for_supply == null ||
      params.row.PR_Sub_for_supply === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PR_Sub_for_supply}`;
  }

  function setPR_Sub_for_supply(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PR_Sub_for_supply = dateString;
    return { ...params.row, PR_Sub_for_supply };
  }

  function getPR_Number_for_supply(params) {
    if (
      typeof params.row.PR_Number_for_supply === 'undefined' ||
      params.row.PR_Number_for_supply == null ||
      params.row.PR_Number_for_supply === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PR_Number_for_supply}`;
  }

  function setPR_Number_for_supply(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PR_Number_for_supply = dateString;
    return { ...params.row, PR_Number_for_supply };
  }

  function getPR_Raised_for_supply(params) {
    if (
      typeof params.row.PR_Raised_for_supply === 'undefined' ||
      params.row.PR_Raised_for_supply == null ||
      params.row.PR_Raised_for_supply === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PR_Raised_for_supply}`;
  }

  function setPR_Raised_for_supply(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PR_Raised_for_supply = dateString;
    return { ...params.row, PR_Raised_for_supply };
  }

  function getPO_Issued_for_supply(params) {
    if (
      typeof params.row.PO_Issued_for_supply === 'undefined' ||
      params.row.PO_Issued_for_supply == null ||
      params.row.PO_Issued_for_supply === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PO_Issued_for_supply}`;
  }

  function setPO_Issued_for_supply(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PO_Issued_for_supply = dateString;
    return { ...params.row, PO_Issued_for_supply };
  }

  function getPI_Submitted(params) {
    if (
      typeof params.row.PI_Submitted === 'undefined' ||
      params.row.PI_Submitted == null ||
      params.row.PI_Submitted === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PI_Submitted}`;
  }

  function setPI_Submitted(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PI_Submitted = dateString;
    return { ...params.row, PI_Submitted };
  }

  function getPI_Approved(params) {
    if (
      typeof params.row.PI_Approved === 'undefined' ||
      params.row.PI_Approved == null ||
      params.row.PI_Approved === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.PI_Approved}`;
  }

  function setPI_Approved(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const PI_Approved = dateString;
    return { ...params.row, PI_Approved };
  }

  function getTRC_Completed(params) {
    if (
      typeof params.row.TRC_Completed === 'undefined' ||
      params.row.TRC_Completed == null ||
      params.row.TRC_Completed === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.TRC_Completed}`;
  }

  function setTRC_Completed(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const TRC_Completed = dateString;
    return { ...params.row, TRC_Completed };
  }

  function getBOI_Completed(params) {
    if (
      typeof params.row.BOI_Completed === 'undefined' ||
      params.row.BOI_Completed == null ||
      params.row.BOI_Completed === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.BOI_Completed}`;
  }

  function setBOI_Completed(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const BOI_Completed = dateString;
    return { ...params.row, BOI_Completed };
  }

  function getICL_Completed(params) {
    if (
      typeof params.row.ICL_Completed === 'undefined' ||
      params.row.ICL_Completed == null ||
      params.row.ICL_Completed === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.ICL_Completed}`;
  }

  function setICL_Completed(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const ICL_Completed = dateString;
    return { ...params.row, ICL_Completed };
  }

  function getLC_Issued(params) {
    if (
      typeof params.row.LC_Issued === 'undefined' ||
      params.row.LC_Issued == null ||
      params.row.LC_Issued === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.LC_Issued}`;
  }

  function setLC_Issued(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const LC_Issued = dateString;
    return { ...params.row, LC_Issued };
  }

  function getShipped(params) {
    if (
      typeof params.row.Shipped === 'undefined' ||
      params.row.Shipped == null ||
      params.row.Shipped === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Shipped}`;
  }

  function setShipped(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Shipped = dateString;
    return { ...params.row, Shipped };
  }

  function getReceived_at_port(params) {
    if (
      typeof params.row.Received_at_port === 'undefined' ||
      params.row.Received_at_port == null ||
      params.row.Received_at_port === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Received_at_port}`;
  }

  function setReceived_at_port(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Received_at_port = dateString;
    return { ...params.row, Received_at_port };
  }

  function getDelivered_to_WH(params) {
    if (
      typeof params.row.Delivered_to_WH === 'undefined' ||
      params.row.Delivered_to_WH == null ||
      params.row.Delivered_to_WH === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Delivered_to_WH}`;
  }

  function setDelivered_to_WH(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Delivered_to_WH = dateString;
    return { ...params.row, Delivered_to_WH };
  }

  function getReconciled(params) {
    if (
      typeof params.row.Reconciled === 'undefined' ||
      params.row.Reconciled == null ||
      params.row.Reconciled === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Reconciled}`;
  }

  function setReconciled(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Reconciled = dateString;
    return { ...params.row, Reconciled };
  }

  function getCOW_Submitted(params) {
    if (
      typeof params.row.COW_Submitted === 'undefined' ||
      params.row.COW_Submitted == null ||
      params.row.COW_Submitted === 'Invalid date'
    ) {
      return ``;
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
      return ``;
    }
    return `${params.row.COW_Approved}`;
  }

  function setCOW_Approved(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const COW_Approved = dateString;
    return { ...params.row, COW_Approved };
  }

  function getSupply_HW_PAC_Submitted(params) {
    if (
      typeof params.row.Supply_HW_PAC_Submitted === 'undefined' ||
      params.row.Supply_HW_PAC_Submitted == null ||
      params.row.Supply_HW_PAC_Submitted === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Supply_HW_PAC_Submitted}`;
  }

  function setSupply_HW_PAC_Submitted(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Supply_HW_PAC_Submitted = dateString;
    return { ...params.row, Supply_HW_PAC_Submitted };
  }

  function getSupply_HW_PAC_Approved(params) {
    if (
      typeof params.row.Supply_HW_PAC_Approved === 'undefined' ||
      params.row.Supply_HW_PAC_Approved == null ||
      params.row.Supply_HW_PAC_Approved === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Supply_HW_PAC_Approved}`;
  }

  function setSupply_HW_PAC_Approved(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Supply_HW_PAC_Approved = dateString;
    return { ...params.row, Supply_HW_PAC_Approved };
  }

  function getImp_PAC_Submitted(params) {
    if (
      typeof params.row.Imp_PAC_Submitted === 'undefined' ||
      params.row.Imp_PAC_Submitted == null ||
      params.row.Imp_PAC_Submitted === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Imp_PAC_Submitted}`;
  }

  function setImp_PAC_Submitted(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Imp_PAC_Submitted = dateString;
    return { ...params.row, Imp_PAC_Submitted };
  }

  function getImp_PAC_Approved(params) {
    if (
      typeof params.row.Imp_PAC_Approved === 'undefined' ||
      params.row.Imp_PAC_Approved == null ||
      params.row.Imp_PAC_Approved === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Imp_PAC_Approved}`;
  }

  function setImp_PAC_Approved(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Imp_PAC_Approved = dateString;
    return { ...params.row, Imp_PAC_Approved };
  }

  function getSupply_SW_PAC_Submitted(params) {
    if (
      typeof params.row.Supply_SW_PAC_Submitted === 'undefined' ||
      params.row.Supply_SW_PAC_Submitted == null ||
      params.row.Supply_SW_PAC_Submitted === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Supply_SW_PAC_Submitted}`;
  }

  function setSupply_SW_PAC_Submitted(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Supply_SW_PAC_Submitted = dateString;
    return { ...params.row, Supply_SW_PAC_Submitted };
  }

  function getSupply_SW_PAC_Approved(params) {
    if (
      typeof params.row.Supply_SW_PAC_Approved === 'undefined' ||
      params.row.Supply_SW_PAC_Approved == null ||
      params.row.Supply_SW_PAC_Approved === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Supply_SW_PAC_Approved}`;
  }

  function setSupply_SW_PAC_Approved(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Supply_SW_PAC_Approved = dateString;
    return { ...params.row, Supply_SW_PAC_Approved };
  }

  function getCapitalization_Supply_HW(params) {
    if (
      typeof params.row.Capitalization_Supply_HW === 'undefined' ||
      params.row.Capitalization_Supply_HW == null ||
      params.row.Capitalization_Supply_HW === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Capitalization_Supply_HW}`;
  }

  function setCapitalization_Supply_HW(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Capitalization_Supply_HW = dateString;
    return { ...params.row, Capitalization_Supply_HW };
  }

  function getCapitalization_Imp(params) {
    if (
      typeof params.row.Capitalization_Imp === 'undefined' ||
      params.row.Capitalization_Imp == null ||
      params.row.Capitalization_Imp === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Capitalization_Imp}`;
  }

  function setCapitalization_Imp(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Capitalization_Imp = dateString;
    return { ...params.row, Capitalization_Imp };
  }

  function getCapitalization_Supply_SW(params) {
    if (
      typeof params.row.Capitalization_Supply_SW === 'undefined' ||
      params.row.Capitalization_Supply_SW == null ||
      params.row.Capitalization_Supply_SW === 'Invalid date'
    ) {
      return ``;
    }
    return `${params.row.Capitalization_Supply_SW}`;
  }

  function setCapitalization_Supply_SW(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const Capitalization_Supply_SW = dateString;
    return { ...params.row, Capitalization_Supply_SW };
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
      field: 'On_Air_Target',
      headerName: 'On Air Target',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getOn_Air_Target,
      valueSetter: setOn_Air_Target,
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
      field: 'PR_Submitted_for_TSS',
      headerName: 'PR Submitted for TSS',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPR_Submitted_for_TSS,
      valueSetter: setPR_Submitted_for_TSS,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Raised_for_TSS',
      headerName: 'PR Raised for TSS',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPR_Raised_for_TSS,
      valueSetter: setPR_Raised_for_TSS,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Number_for_TSS',
      headerName: 'PR Number for TSS',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'TSS_PO_number',
      headerName: 'TSS PO number',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PO_Issued_for_TSS',
      headerName: 'PO Issued for TSS',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPO_Issued_for_TSS,
      valueSetter: setPO_Issued_for_TSS,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'TSS_HO',
      headerName: 'TSS HO',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'TSSR_Submitted',
      headerName: 'TSSR Submitted',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getTSSR_Submitted,
      valueSetter: setTSSR_Submitted,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'TSSR_Approved',
      headerName: 'TSSR Approved',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getTSSR_Approved,
      valueSetter: setTSSR_Approved,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'BOQ_Submitted',
      headerName: 'BOQ Submitted',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getBOQ_Submitted,
      valueSetter: setBOQ_Submitted,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Imp_HO',
      headerName: 'Imp HO',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getImp_HO,
      valueSetter: setImp_HO,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Submission_for_Imp',
      headerName: 'PR Submission for Imp',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPR_Submission_for_Imp,
      valueSetter: setPR_Submission_for_Imp,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Number_for_Imp',
      headerName: 'PR Number for Imp',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Raised_for_Imp',
      headerName: 'PR Raised for Imp',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPR_Raised_for_Imp,
      valueSetter: setPR_Raised_for_Imp,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PO_Issued_for_Imp',
      headerName: 'PO Issued for Imp',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPO_Issued_for_Imp,
      valueSetter: setPO_Issued_for_Imp,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Sub_for_supply',
      headerName: 'PR Sub for supply',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPR_Sub_for_supply,
      valueSetter: setPR_Sub_for_supply,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Number_for_supply',
      headerName: 'PR Number for supply',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPR_Number_for_supply,
      valueSetter: setPR_Number_for_supply,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PR_Raised_for_supply',
      headerName: 'PR Raised for supply',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPR_Raised_for_supply,
      valueSetter: setPR_Raised_for_supply,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PO_Issued_for_supply',
      headerName: 'PO Issued for supply',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPO_Issued_for_supply,
      valueSetter: setPO_Issued_for_supply,
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
      field: 'PI_Approved',
      headerName: 'PI Approved',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPI_Approved,
      valueSetter: setPI_Approved,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'TRC_Completed',
      headerName: 'TRC Completed',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getTRC_Completed,
      valueSetter: setTRC_Completed,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'BOI_Completed',
      headerName: 'BOI Completed',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getBOI_Completed,
      valueSetter: setBOI_Completed,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'ICL_Completed',
      headerName: 'ICL Completed',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getICL_Completed,
      valueSetter: setICL_Completed,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'LC_Issued',
      headerName: 'LC Issued',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getLC_Issued,
      valueSetter: setLC_Issued,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Shipped',
      headerName: 'Shipped',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getShipped,
      valueSetter: setShipped,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Received_at_port',
      headerName: 'Received at port',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getReceived_at_port,
      valueSetter: setReceived_at_port,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Delivered_to_WH',
      headerName: 'Delivered to WH',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getDelivered_to_WH,
      valueSetter: setDelivered_to_WH,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Reconciled',
      headerName: 'Reconciled',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getReconciled,
      valueSetter: setReconciled,
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
      field: 'Supply_HW_PAC_Submitted',
      headerName: 'Supply HW PAC Submitted',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getSupply_HW_PAC_Submitted,
      valueSetter: setSupply_HW_PAC_Submitted,
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Supply_HW_PAC_Approved',
      headerName: 'Supply HW PAC Approved',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getSupply_HW_PAC_Approved,
      valueSetter: setSupply_HW_PAC_Approved,
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Imp_PAC_Submitted',
      headerName: 'Imp PAC Submitted',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getImp_PAC_Submitted,
      valueSetter: setImp_PAC_Submitted,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Imp_PAC_Approved',
      headerName: 'Imp PAC Approved',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getImp_PAC_Approved,
      valueSetter: setImp_PAC_Approved,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Supply_SW_PAC_Submitted',
      headerName: 'Supply SW PAC Submitted',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getSupply_SW_PAC_Submitted,
      valueSetter: setSupply_SW_PAC_Submitted,
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Supply_SW_PAC_Approved',
      headerName: 'Supply SW PAC Approved',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getSupply_SW_PAC_Approved,
      valueSetter: setSupply_SW_PAC_Approved,
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Capitalization_Supply_HW',
      headerName: 'Capitalization Supply HW',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getCapitalization_Supply_HW,
      valueSetter: setCapitalization_Supply_HW,
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Capitalization_Imp',
      headerName: 'Capitalization Imp',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getCapitalization_Imp,
      valueSetter: setCapitalization_Imp,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Capitalization_Supply_SW',
      headerName: 'Capitalization Supply SW',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getCapitalization_Supply_SW,
      valueSetter: setCapitalization_Supply_SW,
      headerAlign: 'left',
      align: 'left',
      width: 240,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    }
  ];

  // -------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------

  const deleteUser = async (selectionModel) => {
    await axiosInstance
      .delete(`/mobitelProjectsDatabases/delete/${selectionModel}`)
      .catch((err) => {
        console.log(err.message);
      });
    alert('Successfully Deleted');
    fetchData();
  };

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);

      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        console.log(editRowData);
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
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
      // fetchData();
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
