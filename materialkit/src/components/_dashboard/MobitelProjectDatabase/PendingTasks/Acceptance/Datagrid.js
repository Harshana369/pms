import React, { useMemo, Component, useEffect, useState } from 'react';
import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridPaginatedVisibleSortedGridRowIdsSelector,
  GridToolbar,
  gridSortedRowIdsSelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
  GridColDef,
  GridOverlay,
  GridCellEditCommitParams,
  GridValueFormatterParams,
  useGridApiRef
} from '@mui/x-data-grid';
import { createSvgIcon } from '@mui/material/utils';
import { Box, Card, Container, Typography, Stack } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SaveIcon from '@mui/icons-material/Save';
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

export default function Datagrid({ DropDownValue, ProjectNameDropdownValue }) {
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
  const [specialTag, setSpecialTag] = useState([]);
  const [Dependencies, setDependencies] = useState([]);
  const [Site_Statuses, setSite_Statuses] = useState([]);
  const [Responsibles, setResponsibles] = useState([]);
  const [Scopes, setScopes] = useState([]);
  const [RATs, setRATs] = useState([]);
  const [Sub_Contractors, setSub_Contractors] = useState([]);

  const [userModified, setUserModified] = useState('');
  const [userPrivilage, setuserPrivilage] = useState('');

  const [Handover_Status, setHandover_Status] = useState('');
  const [Work_Allocation_Status, setWork_Allocation_Status] = useState('');
  const [Sub_Contractor_Status, setSub_Contractor_Status] = useState('');
  const [Dependencies_Status, setDependencies_Status] = useState('');
  const [PR_PO_Progress_Status, setPR_PO_Progress_Status] = useState('');
  const [Logistics_Status, setLogistics_Status] = useState('');
  const [Implementation_Status, setImplementation_Status] = useState('');
  const [Acceptance_Status, setAcceptance_Status] = useState('');
  const [Payment_Status, setPayment_Status] = useState('');

  useEffect(() => {
    // get current user name from the local storage
    const secret = 'AuH8e#?y!E87nyVh';
    const encryptedData = localStorage.getItem('encInf');

    if (encryptedData && typeof encryptedData !== 'undefined') {
      const decData = CryptoJS.AES.decrypt(encryptedData, secret);
      if (decData) {
        const decInfo = decData.toString(CryptoJS.enc.Utf8);
        if (decData) {
          const jsonDecInfo = JSON.parse(decInfo);
          setUserModified(`${jsonDecInfo.username} ${jsonDecInfo.lastName}`);
          setuserPrivilage(jsonDecInfo.adminLevel);
        }
      }
    }
  }, []);

  // ---------------------------------------------------------
  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayForInsights);
      });
  };

  const projectNames = projectNamesArray;
  // ---------------------------------------------------------
  const fetchSpecialTag = async () => {
    const req = await axiosInstance.get('/specialTag').then((res) => {
      setSpecialTag(res.data.specialTagArray);
    });
  };

  const fetchDependency = async () => {
    const req = await axiosInstance.get('/Dependency').then((res) => {
      setDependencies(res.data.DependencyArray);
    });
  };

  const fetchSiteStatus = async () => {
    const req = await axiosInstance.get('/SiteStatus').then((res) => {
      setSite_Statuses(res.data.SiteStatusArray);
    });
  };

  const fetchResponsible = async () => {
    const req = await axiosInstance.get('/Responsible').then((res) => {
      setResponsibles(res.data.ResponsibleArray);
    });
  };

  const fetchScope = async () => {
    const req = await axiosInstance.get('/Scope').then((res) => {
      setScopes(res.data.ScopeArray);
    });
  };

  const fetchSubCon = async () => {
    const req = await axiosInstance.get('/Sub_Contractor').then((res) => {
      setSub_Contractors(res.data.Sub_ContractorArray);
    });
  };

  const fetchNewRat = async () => {
    const req = await axiosInstance.get('/New_RAT').then((res) => {
      setRATs(res.data.New_RATArray);
    });
  };

  useEffect(() => {
    fetchScope();
    fetchNewRat();
    fetchSubCon();
    fetchData();
    fetchProjectNames();
    fetchSiteEngineerNames();
    fetchSpecialTag();
    fetchDependency();
    fetchSiteStatus();
    fetchResponsible();
  }, []);

  useEffect(() => {
    fetchScope();
    fetchNewRat();
    fetchSubCon();
    fetchData();
    fetchProjectNames();
    fetchSiteEngineerNames();
    fetchSpecialTag();
    fetchDependency();
    fetchSiteStatus();
    fetchResponsible();
  }, [DropDownValue]);

  useEffect(() => {
    fetchScope();
    fetchNewRat();
    fetchSubCon();
    fetchData();
    fetchProjectNames();
    fetchSiteEngineerNames();
    fetchSpecialTag();
    fetchDependency();
    fetchSiteStatus();
    fetchResponsible();
  }, [ProjectNameDropdownValue]);

  const fetchData = async () => {
    const res = await axiosInstance.get(`/mobitelProjectsDatabasesPendingTasks`, {
      params: { Site_Engineer: DropDownValue, Project: ProjectNameDropdownValue }
    });
    setState(res.data.AcceptancePendingTasks);
  };
  // -----------------------------------------------------------------------------

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

  // ---------------------------------------------------------

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={0}
          >
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
              Filtered
            </Button>
            <Button
              {...buttonBaseProps}
              onClick={() => handleExport({ getRowsToExport: getRowsFromCurrentPage })}
            >
              Current page
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={0}
          >
            <Tooltip title="Refresh">
              <IconButton
                color="secondary"
                style={{ float: 'right' }}
                onClick={() => {
                  fetchData();
                  fetchProjectNames();
                  fetchSiteEngineerNames();
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  const selectedIDs = selectionModel;
                  if (selectedIDs.length === 1) {
                    navigate(
                      `/dashboard/DatabasesMobitelProjects/Acceptance/Edit/${selectionModel}`
                    );
                  } else if (selectedIDs.length === 0) {
                    alert('Please select any project details to edit !');
                  } else if (selectedIDs.length > 1) {
                    alert('Can not edit multiple project details at once !');
                  }
                }}
                aria-label="edit"
                color="secondary"
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                style={{ float: 'right' }}
                color="secondary"
                onClick={() => {
                  const selectedIDs = selectionModel;

                  if (userPrivilage === 'Admin' && selectedIDs.length > 0) {
                    const confirmBox = window.confirm('Do you want to delete this ?');
                    if (confirmBox === true) {
                      deleteUser(selectionModel);
                    }
                    fetchData();
                  } else if (userPrivilage !== 'Admin' && selectedIDs.length > 1) {
                    alert('Can not delete multiple project details at once !');
                  } else if (selectedIDs.length === 0) {
                    alert('Please select any project details to delete !');
                  } else if (userPrivilage !== 'Admin' && selectedIDs.length === 1) {
                    const confirmBox = window.confirm('Do you want to delete this ?');
                    if (confirmBox === true) {
                      deleteUser(selectionModel);
                    }
                    fetchData();
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </GridToolbarContainer>
    );
  };

  // -------------------------------------------------------------------------------------------------
  // ---------------------------- Columns ------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------
  function getHO_Date(params) {
    if (
      typeof params.row.HO_Date === 'undefined' ||
      params.row.HO_Date === 'Invalid date' ||
      params.row.HO_Date === '' ||
      params.row.HO_Date == null
    ) {
      return '';
    }
    return `${params.row.HO_Date}`;
  }

  function setHO_Date(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const HO_Date = dateString;
    return { ...params.row, HO_Date };
  }

  function getHO_Modified_Date(params) {
    if (
      typeof params.row.HO_Modified_Date === 'undefined' ||
      params.row.HO_Modified_Date === 'Invalid date' ||
      params.row.HO_Modified_Date === '' ||
      params.row.HO_Modified_Date == null
    ) {
      return '';
    }
    return `${params.row.HO_Modified_Date}`;
  }

  function setHO_Modified_Date(params) {
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const HO_Modified_Date = dateString;
    return { ...params.row, HO_Modified_Date };
  }

  function formatHO_Modified_Date(params) {
    if (params.value == null || params.value === '' || params.value === 'Invalid date') {
      return '';
    }
    const date = params.value;
    const dateString = moment(date).format('YYYY-MM-DD');
    const HO_Modified_Date = dateString;
    return HO_Modified_Date;
  }

  function getOn_Air_Target(params) {
    if (
      typeof params.row.On_Air_Target === 'undefined' ||
      params.row.On_Air_Target === 'Invalid date' ||
      params.row.On_Air_Target == null ||
      params.row.On_Air_Target === ''
    ) {
      return '';
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
      params.row.Assigned_Date === 'Invalid date' ||
      params.row.Assigned_Date == null ||
      params.row.Assigned_Date === ''
    ) {
      return '';
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
      params.row.Dependencies_On_Air_Target === 'Invalid date' ||
      params.row.Dependencies_On_Air_Target == null ||
      params.row.Dependencies_On_Air_Target === ''
    ) {
      return '';
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
      params.row.Civil_PAT_Date === 'Invalid date' ||
      params.row.Civil_PAT_Date == null ||
      params.row.Civil_PAT_Date === ''
    ) {
      return '';
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
      params.row.SAQ_Clearance_Date === 'Invalid date' ||
      params.row.SAQ_Clearance_Date == null ||
      params.row.SAQ_Clearance_Date === ''
    ) {
      return '';
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
      params.row.TSSR_Submitted_Date === 'Invalid date' ||
      params.row.TSSR_Submitted_Date == null ||
      params.row.TSSR_Submitted_Date === ''
    ) {
      return '';
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
      params.row.TSSR_Approved_Date === 'Invalid date' ||
      params.row.TSSR_Approved_Date == null ||
      params.row.TSSR_Approved_Date === ''
    ) {
      return '';
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
      params.row.Supply_BOQ_Submitted === 'Invalid date' ||
      params.row.Supply_BOQ_Submitted == null ||
      params.row.Supply_BOQ_Submitted === ''
    ) {
      return '';
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
      params.row.Supply_BOQ_Approved === 'Invalid date' ||
      params.row.Supply_BOQ_Approved == null ||
      params.row.Supply_BOQ_Approved === ''
    ) {
      return '';
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
      params.row.Approval_Received_Date === 'Invalid date' ||
      params.row.Approval_Received_Date == null ||
      params.row.Approval_Received_Date === ''
    ) {
      return '';
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
      params.row.MCW_Requested_Date === 'Invalid date' ||
      params.row.MCW_Requested_Date == null ||
      params.row.MCW_Requested_Date === ''
    ) {
      return '';
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
      params.row.MCW_Completed_Date === 'Invalid date' ||
      params.row.MCW_Completed_Date == null ||
      params.row.MCW_Completed_Date === ''
    ) {
      return '';
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
      params.row.Supply_PR_Submitted === 'Invalid date' ||
      params.row.Supply_PR_Submitted == null ||
      params.row.Supply_PR_Submitted === ''
    ) {
      return '';
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
      params.row.Supply_PR_Approved_Date === 'Invalid date' ||
      params.row.Supply_PR_Approved_Date == null ||
      params.row.Supply_PR_Approved_Date === ''
    ) {
      return '';
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
      params.row.Supply_PR_Raise === 'Invalid date' ||
      params.row.Supply_PR_Raise == null ||
      params.row.Supply_PR_Raise === ''
    ) {
      return '';
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
      params.row.Supply_PO_Issued === 'Invalid date' ||
      params.row.Supply_PO_Issued == null ||
      params.row.Supply_PO_Issued === ''
    ) {
      return '';
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
      params.row.IMP_PR_Submitted === 'Invalid date' ||
      params.row.IMP_PR_Submitted == null ||
      params.row.IMP_PR_Submitted === ''
    ) {
      return '';
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
      params.row.IMP_PR_Approved_Date === 'Invalid date' ||
      params.row.IMP_PR_Approved_Date == null ||
      params.row.IMP_PR_Approved_Date === ''
    ) {
      return '';
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
      params.row.IMP_PR_Raised === 'Invalid date' ||
      params.row.IMP_PR_Raised == null ||
      params.row.IMP_PR_Raised === ''
    ) {
      return '';
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
      params.row.IMP_PO_Issued === 'Invalid date' ||
      params.row.IMP_PO_Issued == null ||
      params.row.IMP_PO_Issued === ''
    ) {
      return '';
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
      params.row.PI_Submitted === 'Invalid date' ||
      params.row.PI_Submitted == null ||
      params.row.PI_Submitted === ''
    ) {
      return '';
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
      params.row.PI_Approved_ENG === 'Invalid date' ||
      params.row.PI_Approved_ENG == null ||
      params.row.PI_Approved_ENG === ''
    ) {
      return '';
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
      params.row.TRC_Approved === 'Invalid date' ||
      params.row.TRC_Approved == null ||
      params.row.TRC_Approved === ''
    ) {
      return '';
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
      params.row.BOI_Approved === 'Invalid date' ||
      params.row.BOI_Approved == null ||
      params.row.BOI_Approved === ''
    ) {
      return '';
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
      params.row.ICL_Approved === 'Invalid date' ||
      params.row.ICL_Approved == null ||
      params.row.ICL_Approved === ''
    ) {
      return '';
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
      params.row.Payment_Confirmed === 'Invalid date' ||
      params.row.Payment_Confirmed == null ||
      params.row.Payment_Confirmed === ''
    ) {
      return '';
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
      params.row.ETA === 'Invalid date' ||
      params.row.ETA == null ||
      params.row.ETA === ''
    ) {
      return '';
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
      params.row.Received_To_Port === 'Invalid date' ||
      params.row.Received_To_Port == null ||
      params.row.Received_To_Port === ''
    ) {
      return '';
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
      params.row.Port_Clearance === 'Invalid date' ||
      params.row.Port_Clearance == null ||
      params.row.Port_Clearance === ''
    ) {
      return '';
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
      params.row.Mobilized_Date === 'Invalid date' ||
      params.row.Mobilized_Date == null ||
      params.row.Mobilized_Date === ''
    ) {
      return '';
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
      params.row.Installation_Date === 'Invalid date' ||
      params.row.Installation_Date == null ||
      params.row.Installation_Date === ''
    ) {
      return '';
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
      params.row.Power_Connected_Date === 'Invalid date' ||
      params.row.Power_Connected_Date == null ||
      params.row.Power_Connected_Date === ''
    ) {
      return '';
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
      params.row.TX_Connected_Date === 'Invalid date' ||
      params.row.TX_Connected_Date == null ||
      params.row.TX_Connected_Date === ''
    ) {
      return '';
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
      params.row.Commisioned_Date === 'Invalid date' ||
      params.row.Commisioned_Date == null ||
      params.row.Commisioned_Date === ''
    ) {
      return '';
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
      params.row.SAR_Date === 'Invalid date' ||
      params.row.SAR_Date == null ||
      params.row.SAR_Date === ''
    ) {
      return '';
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
      params.row.PAT_Submitted === 'Invalid date' ||
      params.row.PAT_Submitted == null ||
      params.row.PAT_Submitted === ''
    ) {
      return '';
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
      params.row.PAT_Pass_Date === 'Invalid date' ||
      params.row.PAT_Pass_Date == null ||
      params.row.PAT_Pass_Date === ''
    ) {
      return '';
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
      params.row.Check_List_Submitted === 'Invalid date' ||
      params.row.Check_List_Submitted == null ||
      params.row.Check_List_Submitted === ''
    ) {
      return '';
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
      params.row.Check_List_Verified === 'Invalid date' ||
      params.row.Check_List_Verified == null ||
      params.row.Check_List_Verified === ''
    ) {
      return '';
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
      params.row.On_Air_Date === 'Invalid date' ||
      params.row.On_Air_Date == null ||
      params.row.On_Air_Date === ''
    ) {
      return '';
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
      params.row.Material_Reconciled === 'Invalid date' ||
      params.row.Material_Reconciled == null ||
      params.row.Material_Reconciled === ''
    ) {
      return '';
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
      params.row.Balance_Material_Returned_Date === 'Invalid date' ||
      params.row.Balance_Material_Returned_Date == null ||
      params.row.Balance_Material_Returned_Date === ''
    ) {
      return '';
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
      params.row.COW_Submitted === 'Invalid date' ||
      params.row.COW_Submitted == null ||
      params.row.COW_Submitted === ''
    ) {
      return '';
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
      params.row.COW_Approved === 'Invalid date' ||
      params.row.COW_Approved == null ||
      params.row.COW_Approved === ''
    ) {
      return '';
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
      params.row.CPL_Submitted === 'Invalid date' ||
      params.row.CPL_Submitted == null ||
      params.row.CPL_Submitted === ''
    ) {
      return '';
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
      params.row.CPL_Approved === 'Invalid date' ||
      params.row.CPL_Approved == null ||
      params.row.CPL_Approved === ''
    ) {
      return '';
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
      params.row.PAC_Invoice_Submitted === 'Invalid date' ||
      params.row.PAC_Invoice_Submitted == null ||
      params.row.PAC_Invoice_Submitted === ''
    ) {
      return '';
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
      params.row.PAC_Invoice_Approved === 'Invalid date' ||
      params.row.PAC_Invoice_Approved == null ||
      params.row.PAC_Invoice_Approved === ''
    ) {
      return '';
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
      params.row.FAC_Submitted === 'Invalid date' ||
      params.row.FAC_Submitted == null ||
      params.row.FAC_Submitted === ''
    ) {
      return '';
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
      params.row.FAC_Approved === 'Invalid date' ||
      params.row.FAC_Approved == null ||
      params.row.FAC_Approved === ''
    ) {
      return '';
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
      params.row.PO_Closed_Date === 'Invalid date' ||
      params.row.PO_Closed_Date == null ||
      params.row.PO_Closed_Date === ''
    ) {
      return '';
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
      params.row.Capitalized_Date === 'Invalid date' ||
      params.row.Capitalized_Date == null ||
      params.row.Capitalized_Date === ''
    ) {
      return '';
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
    //   field: 'id',
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
      width: 200,
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
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
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
      hide: false,
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
      hide: false,
      editable: true
    },
    {
      field: 'HO_Date',
      headerName: 'Handover Date',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueSetter: setHO_Date,
      valueGetter: getHO_Date,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'HO_Modification',
      headerName: 'HO Modification',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 200,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: ['Scope Changed', 'Material Changed', 'Withdrawn'],
      hide: true,
      editable: true
    },
    {
      field: 'HO_Modified_Date',
      headerName: 'HO Modified Date',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueSetter: setHO_Modified_Date,
      valueGetter: getHO_Modified_Date,
      valueFormatter: formatHO_Modified_Date,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      valueOptions: Scopes,
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
      valueOptions: RATs,
      hide: true,
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
      hide: true,
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
      hide: true,
      editable: true
    },
    {
      field: 'Approval_Ref',
      headerName: 'Approval Ref',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
      editable: true
    },
    {
      field: 'IMP_Scenario',
      headerName: 'IMP Scenario.',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
      editable: true
    },
    {
      field: 'On_Air_Target',
      headerName: 'On Air Target',
      type: 'date',
      valueGetter: getOn_Air_Target,
      valueSetter: setOn_Air_Target,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      hide: true,
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
      valueGetter: getAssigned_Date,
      valueSetter: setAssigned_Date,
      hide: true,
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
      valueOptions: specialTag,
      hide: true,
      editable: true
    },
    {
      field: 'Coordinator_Comments',
      headerName: 'Coordinator Comments',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      valueOptions: Sub_Contractors,
      hide: true,
      editable: true
    },
    {
      field: 'Sub_Contractor_Remarks',
      headerName: 'Team Allocation Remarks',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      valueOptions: Site_Statuses,
      hide: true,
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
      valueOptions: Dependencies,
      hide: true,
      editable: true
    },
    {
      field: 'Responsible',
      headerName: 'Responsible',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: Responsibles,
      hide: true,
      editable: true
    },
    {
      field: 'Dependencies_On_Air_Target',
      headerName: 'Dependencies On Air Target',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getDependencies_On_Air_Target,
      valueSetter: setDependencies_On_Air_Target,
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      hide: true,
      editable: true
    },
    {
      field: 'TSSR_Referance',
      headerName: 'TSSR Reference',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      width: 150,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      width: 150,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      hide: true,
      editable: true
    },
    {
      field: 'Logistics_Remarks',
      headerName: 'Logistics Remarks',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: false,
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
      hide: false,
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
      width: 150,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
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
      hide: false,
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
      hide: false,
      editable: true
    },
    {
      field: 'PAT_Submitted',
      headerName: 'PAT Submitted Date',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPAT_Submitted,
      valueSetter: setPAT_Submitted,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
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
      hide: false,
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
      hide: false,
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
      hide: false,
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
      hide: false,
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
      hide: false,
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
      hide: false,
      editable: true
    },
    {
      field: 'Balance_Material_Returned_Date',
      headerName: 'Balance Material Returned Date',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getBalance_Material_Returned_Date,
      valueSetter: setBalance_Material_Returned_Date,
      headerAlign: 'center',
      align: 'left',
      width: 250,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
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
      hide: true,
      editable: true
    },
    {
      field: 'Finance_Remarks',
      headerName: 'Finance Remarks',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: true,
      editable: true
    },
    {
      field: 'currentUser',
      headerName: 'Last Modified By',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell')
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
        // console.log(editRowData);
        // console.log(JSON.stringify(editRowData, null, 4));

        const Planning_ID = editRowData.Planning_ID.value;
        const Implementation_By = editRowData.Implementation_By.value;
        const Project = editRowData.Project.value;
        const Site_ID = editRowData.Site_ID.value;
        const Site_Name = editRowData.Site_Name.value;
        const HO_Date = moment(editRowData.HO_Date.value).format('YYYY-MM-DD');
        const HO_Modification = editRowData.HO_Modification.value;
        const HO_Modified_Date = moment(editRowData.HO_Modified_Date.value).format('YYYY-MM-DD');
        const Scope = editRowData.Scope.value;
        const New_RAT = editRowData.New_RAT.value;
        const New_Sector = editRowData.New_Sector.value;
        const Approval_Status = editRowData.Approval_Status.value;
        const Approval_Ref = editRowData.Approval_Ref.value;
        const IMP_Scenario = editRowData.IMP_Scenario.value;
        const blank1 = editRowData.blank1.value;
        const blank2 = editRowData.blank2.value;
        const blank3 = editRowData.blank3.value;
        const Tilt = editRowData.Tilt.value;
        const Azimuth = editRowData.Azimuth.value;
        const Antenna_Height = editRowData.Antenna_Height.value;
        const New_RRU_Type = editRowData.New_RRU_Type.value;
        const RRU_From = editRowData.RRU_From.value;
        const New_BTS_Type = editRowData.New_BTS_Type.value;
        const BTS_From = editRowData.BTS_From.value;
        const New_Antenna_Type = editRowData.New_Antenna_Type.value;
        const Antenna_From = editRowData.Antenna_From.value;
        const Cards_Type_n_From = editRowData.Cards_Type_n_From.value;
        const Battery_count_n_From = editRowData.Battery_count_n_From.value;
        const Mobitel_Region = editRowData.Mobitel_Region.value;
        const Planning_Engineer = editRowData.Planning_Engineer.value;
        const On_Air_Target = moment(editRowData.On_Air_Target.value).format('YYYY-MM-DD');
        const Planning_Comments = editRowData.Planning_Comments.value;

        const Site_Engineer = editRowData.Site_Engineer.value;
        const Assigned_Date = moment(editRowData.Assigned_Date.value).format('YYYY-MM-DD');
        const Special_Tag = editRowData.Special_Tag.value;
        const Coordinator_Comments = editRowData.Coordinator_Comments.value;

        const Sub_Contractor = editRowData.Sub_Contractor.value;
        const Sub_Contractor_Remarks = editRowData.Sub_Contractor_Remarks.value;

        const Site_Status = editRowData.Site_Status.value;
        const Dependency = editRowData.Dependency.value;
        const Responsible = editRowData.Responsible.value;
        const Dependencies_On_Air_Target = moment(
          editRowData.Dependencies_On_Air_Target.value
        ).format('YYYY-MM-DD');
        const Civil_PAT_Date = moment(editRowData.Civil_PAT_Date.value).format('YYYY-MM-DD');
        const SAQ_Clearance_Date = moment(editRowData.SAQ_Clearance_Date.value).format(
          'YYYY-MM-DD'
        );
        const TSSR_Referance = editRowData.TSSR_Referance.value;
        const TSSR_Submitted_Date = moment(editRowData.TSSR_Submitted_Date.value).format(
          'YYYY-MM-DD'
        );
        const TSSR_Approved_Date = moment(editRowData.TSSR_Approved_Date.value).format(
          'YYYY-MM-DD'
        );
        const Supply_BOQ_Submitted = moment(editRowData.Supply_BOQ_Submitted.value).format(
          'YYYY-MM-DD'
        );
        const Supply_BOQ_Approved = moment(editRowData.Supply_BOQ_Approved.value).format(
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
        const Supply_PR_Submitted = moment(editRowData.Supply_PR_Submitted.value).format(
          'YYYY-MM-DD'
        );
        const Supply_PR_Status = editRowData.Supply_PR_Status.value;
        const Supply_PR_Approved_Date = moment(editRowData.Supply_PR_Approved_Date.value).format(
          'YYYY-MM-DD'
        );
        const Supply_PR_Number = editRowData.Supply_PR_Number.value;
        const Supply_PR_Raise = moment(editRowData.Supply_PR_Raise.value).format('YYYY-MM-DD');
        const Supply_PO_Number = editRowData.Supply_PO_Number.value;
        const Supply_PO_Issued = moment(editRowData.Supply_PO_Issued.value).format('YYYY-MM-DD');
        const IMP_PR_Submitted = moment(editRowData.IMP_PR_Submitted.value).format('YYYY-MM-DD');
        const IMP_PR_Approved_Date = moment(editRowData.IMP_PR_Approved_Date.value).format(
          'YYYY-MM-DD'
        );
        const IMP_PR_Number = editRowData.IMP_PR_Number.value;
        const IMP_PR_Raised = moment(editRowData.IMP_PR_Raised.value).format('YYYY-MM-DD');
        const IMP_PO_Number = editRowData.IMP_PO_Number.value;
        const IMP_PO_Issued = moment(editRowData.IMP_PO_Issued.value).format('YYYY-MM-DD');
        const AWR_1 = editRowData.AWR_1.value;
        const AWR_2 = editRowData.AWR_2.value;
        const AWR_3 = editRowData.AWR_3.value;
        const PI_Number = editRowData.PI_Number.value;
        const PI_Submitted = moment(editRowData.PI_Submitted.value).format('YYYY-MM-DD');
        const PI_Approved_ENG = moment(editRowData.PI_Approved_ENG.value).format('YYYY-MM-DD');
        const TRC_Approved = moment(editRowData.TRC_Approved.value).format('YYYY-MM-DD');
        const BOI_Approved = moment(editRowData.BOI_Approved.value).format('YYYY-MM-DD');
        const ICL_Approved = moment(editRowData.ICL_Approved.value).format('YYYY-MM-DD');
        const Payment_Method = editRowData.Payment_Method.value;
        const Payment_Confirmed = moment(editRowData.Payment_Confirmed.value).format('YYYY-MM-DD');
        const ETA = moment(editRowData.ETA.value).format('YYYY-MM-DD');
        const Received_To_Port = moment(editRowData.Received_To_Port.value).format('YYYY-MM-DD');
        const Port_Clearance = moment(editRowData.Port_Clearance.value).format('YYYY-MM-DD');
        const Logistics_Remarks = editRowData.Logistics_Remarks.value;
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
        const SAR_Reference = editRowData.SAR_Reference.value;
        const SAR_Status = editRowData.SAR_Status.value;
        const SAR_Date = moment(editRowData.SAR_Date.value).format('YYYY-MM-DD');
        const PAT_Reference = editRowData.PAT_Reference.value;
        const PAT_Status = editRowData.PAT_Status.value;
        const PAT_Submitted = moment(editRowData.PAT_Submitted.value).format('YYYY-MM-DD');
        const PAT_Pass_Date = moment(editRowData.PAT_Pass_Date.value).format('YYYY-MM-DD');
        const Check_List_Submitted = moment(editRowData.Check_List_Submitted.value).format(
          'YYYY-MM-DD'
        );
        const Check_List_Verified = moment(editRowData.Check_List_Verified.value).format(
          'YYYY-MM-DD'
        );
        const On_Air_Status = editRowData.On_Air_Status.value;
        const On_Air_Date = moment(editRowData.On_Air_Date.value).format('YYYY-MM-DD');
        const Material_Reconciled = moment(editRowData.Material_Reconciled.value).format(
          'YYYY-MM-DD'
        );
        const Balance_Material_Returned_Date = moment(
          editRowData.Balance_Material_Returned_Date.value
        ).format('YYYY-MM-DD');
        const COW_Number = editRowData.COW_Number.value;
        const COW_Submitted = moment(editRowData.COW_Submitted.value).format('YYYY-MM-DD');
        const COW_Approved = moment(editRowData.COW_Approved.value).format('YYYY-MM-DD');
        const CPL_Number = editRowData.CPL_Number.value;
        const CPL_Submitted = moment(editRowData.CPL_Submitted.value).format('YYYY-MM-DD');
        const CPL_Approved = moment(editRowData.CPL_Approved.value).format('YYYY-MM-DD');
        const PAC_Invoice_Number = editRowData.PAC_Invoice_Number.value;
        const PAC_Invoice_Submitted = moment(editRowData.PAC_Invoice_Submitted.value).format(
          'YYYY-MM-DD'
        );
        const PAC_Invoice_Approved = moment(editRowData.PAC_Invoice_Approved.value).format(
          'YYYY-MM-DD'
        );
        const FAC_Number = editRowData.FAC_Number.value;
        const FAC_Submitted = moment(editRowData.FAC_Submitted.value).format('YYYY-MM-DD');
        const FAC_Approved = moment(editRowData.FAC_Approved.value).format('YYYY-MM-DD');
        const PO_Status = editRowData.PO_Status.value;
        const PO_Closed_Date = moment(editRowData.PO_Closed_Date.value).format('YYYY-MM-DD');
        const Capitalization_Status = editRowData.Capitalization_Status.value;
        const Capitalized_Date = moment(editRowData.Capitalized_Date.value).format('YYYY-MM-DD');
        const Finance_Remarks = editRowData.Finance_Remarks.value;
        const currentUser = userModified;

        const newPost = {
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
          Payment_Status
        };
        console.log(newPost);

        // update to the MongoDB
        const confirmBox = window.confirm('Do you want to save this ?');
        if (confirmBox === true) {
          axiosInstance.put(`/DatabasesMobitelProjects/Edit/${editRowData._id.value}`, newPost);
          setSnackbar({ children: 'Successfully saved', severity: 'success' });
          fetchData();
        } else if (confirmBox === false) {
          fetchData();
        }
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
      fetchData();
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
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        pagination
        density="compact"
        disableSelectionOnClick
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        checkboxSelection
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
