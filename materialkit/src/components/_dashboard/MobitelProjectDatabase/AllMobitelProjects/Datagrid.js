import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
  gridSortedRowIdsSelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
  useGridApiRef,
  SortGridMenuItems,
  GridColumnMenu,
  GridFilterMenuItem,
  GridColumnHeaderItem
} from '@mui/x-data-grid';
import { createSvgIcon } from '@mui/material/utils';
import { Box, MenuItem, Stack } from '@mui/material';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { GridColumnMenuContainer } from '@mui/x-data-grid-pro';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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

// function CustomColumnMenuComponent(props) {
//   const [hidecol, setHidecol] = useState([]);
//   const { hideMenu, currentColumn } = props;

//   if (currentColumn.field) {
//     const { hideMenu, currentColumn } = props;

//     const golbleHide = (event) => {
//       const temp = [];
//       temp.push(currentColumn.field);
//       setHidecol(temp);
//       console.log(hidecol);
//     };
//     return (
//       // <GridColumnMenuContainer>
//       <>
//         <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
//         <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
//         <MenuItem onClick={golbleHide}>Hide</MenuItem>
//       </>

//       //   {/* <MenuItem onClick={handleClose(currentColumn.field)}>Hide</MenuItem> */}
//       // </GridColumnMenuContainer>

//       // <GridColumnMenu hideMenu={hideMenu} currentColumn={currentColumn} />
//     );
//   }
// }

// CustomColumnMenuComponent.propTypes = {
//   currentColumn: PropTypes.object.isRequired,
//   hideMenu: PropTypes.func.isRequired
// };

// export { CustomColumnMenuComponent };

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
  const [Site_Statuses, setSite_Statuses] = useState([]);
  const [Dependencies, setDependencies] = useState([]);
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
    const res = await axiosInstance.get(`/mobitelProjectsDatabasesSiteData`, {
      params: { Site_Engineer: DropDownValue, Project: ProjectNameDropdownValue }
    });
    setState(res.data.posts);
  };

  // ---------------------------------------------------------

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
      headerName: 'Planning_ID',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'Implementation_By',
      headerName: 'Implementation_By',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: ['ZTE', 'Huawei', 'Mobitel Direct'],
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
      editable: true
    },
    {
      field: 'Site_ID',
      headerName: 'Site_ID',
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
      headerName: 'Site_Name',
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
      headerName: 'HO_Date',
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
      field: 'Approval_Status',
      headerName: 'Approval_Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: ['Approved', 'Rejected', 'Pending'],
      hide: false,
      editable: true
    },
    {
      field: 'Approval_Ref',
      headerName: 'Approval_Ref',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'IMP_Scenario',
      headerName: 'IMP_Scenario.',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },

    {
      field: 'On_Air_Target',
      headerName: 'On_Air_Target',
      type: 'date',
      valueGetter: getOn_Air_Target,
      valueSetter: setOn_Air_Target,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },

    {
      field: 'Site_Engineer',
      headerName: 'Site_Engineer',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: siteEngineerNames,
      hide: false,
      editable: true
    },
    {
      field: 'Assigned_Date',
      headerName: 'Assigned_Date',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'date',
      valueGetter: getAssigned_Date,
      valueSetter: setAssigned_Date,
      editable: true
    },
    {
      field: 'Special_Tag',
      headerName: 'Special_Tag',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 210,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: specialTag,
      hide: false,
      editable: true
    },
    {
      field: 'Coordinator_Comments',
      headerName: 'Coordinator_Comments',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'Sub_Contractor',
      headerName: 'Sub_Contractor',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: Sub_Contractors,
      hide: false,
      editable: true
    },
    {
      field: 'Sub_Contractor_Remarks',
      headerName: 'Sub_Contractor_Remarks',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'Site_Status',
      headerName: 'Site_Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 200,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: Site_Statuses,
      hide: false,
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
      hide: false,
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
      hide: false,
      editable: true
    },
    {
      field: 'Dependencies_On_Air_Target',
      headerName: 'Dependencies_On_Air_Target',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getDependencies_On_Air_Target,
      valueSetter: setDependencies_On_Air_Target,
      headerAlign: 'left',
      align: 'left',
      width: 220,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'Civil_PAT_Date',
      headerName: 'Civil_PAT_Date',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getCivil_PAT_Date,
      valueSetter: setCivil_PAT_Date,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'SAQ_Clearance_Date',
      headerName: 'SAQ_Clearance_Date',
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
      headerName: 'TSSR_Referance',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'TSSR_Submitted_Date',
      headerName: 'TSSR_Submitted_Date',
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
      headerName: 'TSSR_Approved_Date',
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
      headerName: 'Supply_BOQ_Submitted',
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
      headerName: 'Supply_BOQ_Approved',
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
      headerName: 'Approval_Received_Date',
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
      headerName: 'MCW_Requested_Date',
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
      headerName: 'MCW_Completed_Date',
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
      field: 'IMP_PR_Submitted',
      headerName: 'IMP_PR_Submitted',
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
      headerName: 'IMP_PR_Approved_Date',
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
      headerName: 'IMP_PR_Number',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
      editable: true
    },
    {
      field: 'IMP_PR_Raised',
      headerName: 'IMP_PR_Raised',
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
      hide: false,
      editable: true
    },
    {
      field: 'IMP_PO_Issued',
      headerName: 'IMP_PO_Issued',
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
      editable: true,
      hide: true
    },

    {
      field: 'Mobilization_Status',
      headerName: 'Mobilization_Status',
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
      field: 'Mobilized_Date',
      headerName: 'Mobilized_Date',
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
      headerName: 'Installation_Status',
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
      hide: false,
      editable: true
    },
    {
      field: 'Installation_Date',
      headerName: 'Installation_Date',
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
      headerName: 'Power_Connected_Date',
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
      headerName: 'TX_Connected_Date',
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
      headerName: 'Commissioning_Status',
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
      field: 'Commisioned_Date',
      headerName: 'Commisioned_Date',
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
      headerName: 'SAR_Reference',
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
      headerName: 'SAR_Status',
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
      headerName: 'SAR_Date',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getSAR_Date,
      valueSetter: setSAR_Date,
      headerAlign: 'left',
      align: 'left',
      width: 150,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PAT_Reference',
      headerName: 'PAT_Reference',
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
      headerName: 'PAT_Status',
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
      headerName: 'PAT_Submitted',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getPAT_Submitted,
      valueSetter: setPAT_Submitted,
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },
    {
      field: 'PAT_Pass_Date',
      headerName: 'PAT_Pass_Date',
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
      headerName: 'Check_List_Submitted',
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
      headerName: 'Check_List_Verified',
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
      headerName: 'On_Air_Status',
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
      headerName: 'On_Air_Date',
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
      headerName: 'Material_Reconciled',
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
      headerName: 'Balance_Material_Returned_Date',
      headerClassName: 'super-app-theme--header',
      type: 'date',
      valueGetter: getBalance_Material_Returned_Date,
      valueSetter: setBalance_Material_Returned_Date,
      headerAlign: 'center',
      align: 'left',
      width: 250,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      editable: true
    },

    {
      field: 'PO_Status',
      headerName: 'PO_Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: ['Open', 'Closed'],
      hide: false,
      editable: true
    },
    {
      field: 'PO_Closed_Date',
      headerName: 'PO_Closed_Date',
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
      headerName: 'Capitalization_Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      type: 'singleSelect',
      valueOptions: ['Completed', 'Pending'],
      hide: false,
      editable: true
    },
    {
      field: 'Capitalized_Date',
      headerName: 'Capitalized_Date',
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
      field: 'Finance_Remarks',
      headerName: 'Finance_Remarks',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      width: 180,
      cellClassName: (params) => clsx('super-app-theme--cell'),
      hide: false,
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
        // console.log(err.message);
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
        const Scope = editRowData.Scope.value;
        const Approval_Status = editRowData.Approval_Status.value;
        const Approval_Ref = editRowData.Approval_Ref.value;
        const IMP_Scenario = editRowData.IMP_Scenario.value;
        const blank1 = editRowData.blank1.value;
        const blank2 = editRowData.blank2.value;
        const blank3 = editRowData.blank3.value;
        const On_Air_Target = moment(editRowData.On_Air_Target.value).format('YYYY-MM-DD');

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

        const IMP_PR_Submitted = moment(editRowData.IMP_PR_Submitted.value).format('YYYY-MM-DD');
        const IMP_PR_Approved_Date = moment(editRowData.IMP_PR_Approved_Date.value).format(
          'YYYY-MM-DD'
        );
        const IMP_PR_Number = editRowData.IMP_PR_Number.value;
        const IMP_PR_Raised = moment(editRowData.IMP_PR_Raised.value).format('YYYY-MM-DD');
        const IMP_PO_Number = editRowData.IMP_PO_Number.value;
        const IMP_PO_Issued = moment(editRowData.IMP_PO_Issued.value).format('YYYY-MM-DD');
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

          Scope,
          Approval_Status,
          Approval_Ref,
          IMP_Scenario,
          blank1,
          blank2,
          blank3,

          On_Air_Target,

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

          IMP_PR_Submitted,
          IMP_PR_Approved_Date,
          IMP_PR_Number,
          IMP_PR_Raised,
          IMP_PO_Number,
          IMP_PO_Issued,
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

          PO_Status,
          PO_Closed_Date,
          Capitalization_Status,
          Capitalized_Date,
          Finance_Remarks,

          currentUser
        };
        // console.log(newPost);
        // console.log(editRowData);
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
                    navigate(`/dashboard/DatabasesMobitelProjects/Edit/${selectionModel}`);
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

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const handleChange = (event) => {
    setColumnVisibilityModel({
      ...columnVisibilityModel,
      [event.target.name]: event.target.checked
    });
  };

  const getData = async () => {
    await axiosInstance.get('/column/').then((res) => {
      // console.log(res.data);
      setColumnVisibilityModel(res.data);
    });
  };

  const updateColumn = async () => {
    await axiosInstance.put('/column/Edit', columnVisibilityModel).then((res) => {});
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    updateColumn();
  }, [columnVisibilityModel]);

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
        // initialState={{
        //   columns: {
        //     columnVisibilityModel: {
        //       // Hide columns status and traderName, the other columns will remain visible
        //       Planning_ID: false,
        //       Implementation_By: false,
        //       Project: false
        //     }
        //   }
        // }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={5000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
