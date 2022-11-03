import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Grid, Button, Stack, Typography, Chip } from '@mui/material';
import ExcellTemplate from '../../../../_mocks_/SampleExcellTemplate.xlsx';
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable global-require */
/* eslint-disable valid-typeof */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 10,
    fontWeight: 0.5,
    backgroundColor: '#000000',
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    fontWeight: 0.4,
    color: theme.palette.common.white
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#161747'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#161747'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const Input = styled('input')({
  display: 'none'
});

function UploadExcellData() {
  const navigate = useNavigate();
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

  const [items, setItems] = useState([]);
  const [file, setFile] = useState([]);

  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [currentUser, setcurrentUser] = useState('');

  const [validationErrorMessage, setvalidationErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setvalidationError] = useState('');
  const [dateValidationError, setDateValidationError] = useState('');
  const [tablecelColor, settablecelColor] = useState('#ffffff');

  // const [projectNameValidation, setProjectNameValidation] = useState();
  // const [projectNamevalidationError, setProjectNamevalidationError] = useState('');

  const [mobilizationStatusError, setMobilizationStatusError] = useState('');
  const [installationStatusError, setInstallationStatusError] = useState('');
  const [commissioningStatusError, setCommissioningStatusError] = useState('');
  const [sarStatusError, setSARStatusError] = useState('');
  const [patStatusError, setPATStatusError] = useState('');
  const [onAirStatusError, setOnAirStatusError] = useState('');

  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/mobitelProjectsOverviewTable/ProjectsArray')
      .then((res) => {
        setprojectNamesArray(res.data.mobitelProjectsNamesArrayToTheExcelUploads);
      });
  };

  useEffect(() => {
    fetchProjectNames();
  }, []);

  const changeFileHandler = () => {
    setItems([]);
  };

  const errorHandler = () => {
    for (let i = 0; i < items.length; i += 1) {
      if (
        !items[i].Planning_ID ||
        !items[i].Implementation_By ||
        !items[i].Project ||
        !items[i].Site_ID ||
        !items[i].Site_Name ||
        !items[i].HO_Date ||
        !items[i].Scope ||
        !items[i].New_RAT ||
        !items[i].New_Sector ||
        !items[i].Approval_Status ||
        !items[i].Approval_Ref ||
        !items[i].IMP_Scenario ||
        !items[i].blank1 ||
        !items[i].blank2 ||
        !items[i].blank3 ||
        !items[i].Tilt ||
        !items[i].Azimuth ||
        !items[i].Antenna_Height ||
        !items[i].New_RRU_Type ||
        !items[i].RRU_From ||
        !items[i].New_BTS_Type ||
        !items[i].BTS_From ||
        !items[i].New_Antenna_Type ||
        !items[i].Antenna_From ||
        !items[i].Cards_Type_n_From ||
        !items[i].Battery_count_n_From ||
        !items[i].Mobitel_Region ||
        !items[i].Planning_Engineer ||
        !items[i].On_Air_Target ||
        !items[i].Planning_Comments
      ) {
        setvalidationError('Validation Error!');
        setvalidationErrorMessage(
          'Please fill all the mandatorily required fields before submit !'
        );
        settablecelColor('#FF0000');
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 10000);
      } else if (!validationError) {
        // console.log('No validation err!');
      }
    }
  };

  const Formatter = () => {
    // Date validation for handover date.
    for (let i = 0; i < items.length; i += 1) {
      // ---------------------------------------------------------------------------

      if (items[i].Implementation_By) {
        if (items[i].Implementation_By === 'Huawei' || items[i].Implementation_By === 'ZTE') {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          items[i].Implementation_By !== 'Huawei' ||
          items[i].Implementation_By !== 'ZTE'
        ) {
          setDateValidationError('Implementation_By format error !');
          setvalidationErrorMessage(
            'Invalid Implementation_By input. Please fill with either Huawei or ZTE !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setDateValidationError('Implementation_By is empty !');
        setvalidationErrorMessage(
          'Implementation_By input is empty. Please fill with either Huawei or ZTE !'
        );
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 8000);
      }

      // ------------------------- Project -------------------------------

      // for (let j = 0; j < projectNamesArray.length; j += 1) {
      //   if (items[i].Project) {
      //     const array1 = [];
      //     const array2 = [];

      //     array1[i] = items[i].Project;
      //     array2[j] = projectNamesArray[j];
      //     const hasValue = array2.some(Set.prototype.has, new Set(array1));
      //     setProjectNameValidation(hasValue);
      //     console.log(projectNameValidation);

      //     if (projectNameValidation === true) {
      //       setSuccessMessage('Your Excell is ready to upload !');
      //       setProjectNamevalidationError('');
      //       setvalidationErrorMessage('');
      //     } else if (projectNameValidation === false) {
      //       setProjectNamevalidationError('Project name error !');
      //       setvalidationErrorMessage(
      //         'Invalid Project name input. Please define your Project name in Overview Table !'
      //       );
      //       setTimeout(() => {
      //         setvalidationErrorMessage('');
      //       }, 8000);
      //     }
      //   } else {
      //     setProjectNamevalidationError('Project name is empty !');
      //     setvalidationErrorMessage('Project input is empty. Please fill with Project name !');
      //     setTimeout(() => {
      //       setvalidationErrorMessage('');
      //     }, 8000);
      //   }
      // }
      // ----------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------

      // ------------------------- HO_Date --------------------------------------
      if (items[i].HO_Date) {
        if (
          Number.isNaN(Number(items[i].HO_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].HO_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].HO_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].HO_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].HO_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].HO_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid HO_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- HO_Modified_Date -----------------------------
      if (items[i].HO_Modified_Date) {
        if (
          Number.isNaN(Number(items[i].HO_Modified_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].HO_Modified_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].HO_Modified_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].HO_Modified_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].HO_Modified_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].HO_Modified_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid HO_Modified_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- On_Air_Target -------------------------------
      if (items[i].On_Air_Target) {
        if (
          Number.isNaN(Number(items[i].On_Air_Target.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].On_Air_Target.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].On_Air_Target.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].On_Air_Target.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].On_Air_Target.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].On_Air_Target.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid On_Air_Target format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Assigned_Date -------------------------------
      if (items[i].Assigned_Date) {
        if (
          Number.isNaN(Number(items[i].Assigned_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Assigned_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Assigned_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Assigned_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Assigned_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Assigned_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Assigned_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Dependencies_On_Air_Target -------------------------------
      if (items[i].Dependencies_On_Air_Target) {
        if (
          Number.isNaN(Number(items[i].Dependencies_On_Air_Target.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Dependencies_On_Air_Target.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Dependencies_On_Air_Target.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Dependencies_On_Air_Target.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Dependencies_On_Air_Target.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Dependencies_On_Air_Target.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Dependencies_On_Air_Target format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Civil_PAT_Date -------------------------------
      if (items[i].Civil_PAT_Date) {
        if (
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Civil_PAT_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Civil_PAT_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- SAQ_Clearance_Date -------------------------------
      if (items[i].SAQ_Clearance_Date) {
        if (
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].SAQ_Clearance_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid SAQ_Clearance_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TSSR_Submitted_Date -------------------------------
      if (items[i].TSSR_Submitted_Date) {
        if (
          Number.isNaN(Number(items[i].TSSR_Submitted_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TSSR_Submitted_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TSSR_Submitted_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TSSR_Submitted_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TSSR_Submitted_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TSSR_Submitted_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TSSR_Submitted_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TSSR_Approved_Date -------------------------------
      if (items[i].TSSR_Approved_Date) {
        if (
          Number.isNaN(Number(items[i].TSSR_Approved_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TSSR_Approved_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TSSR_Approved_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TSSR_Approved_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TSSR_Approved_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TSSR_Approved_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TSSR_Approved_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_BOQ_Submitted -------------------------------
      if (items[i].Supply_BOQ_Submitted) {
        if (
          Number.isNaN(Number(items[i].Supply_BOQ_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_BOQ_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_BOQ_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_BOQ_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_BOQ_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_BOQ_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_BOQ_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_BOQ_Approved -------------------------------
      if (items[i].Supply_BOQ_Approved) {
        if (
          Number.isNaN(Number(items[i].Supply_BOQ_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_BOQ_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_BOQ_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_BOQ_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_BOQ_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_BOQ_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_BOQ_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Approval_Received_Date -------------------------------
      if (items[i].Approval_Received_Date) {
        if (
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Approval_Received_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Approval_Received_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- MCW_Requested_Date -------------------------------
      if (items[i].MCW_Requested_Date) {
        if (
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].MCW_Requested_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid MCW_Requested_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- MCW_Completed_Date -------------------------------
      if (items[i].MCW_Completed_Date) {
        if (
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].MCW_Completed_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid MCW_Completed_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_PR_Submitted -------------------------------
      if (items[i].Supply_PR_Submitted) {
        if (
          Number.isNaN(Number(items[i].Supply_PR_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_PR_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_PR_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_PR_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_PR_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_PR_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_PR_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_PR_Approved_Date -------------------------------
      if (items[i].Supply_PR_Approved_Date) {
        if (
          Number.isNaN(Number(items[i].Supply_PR_Approved_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_PR_Approved_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_PR_Approved_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_PR_Approved_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_PR_Approved_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_PR_Approved_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_PR_Approved_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_PR_Raise -------------------------------
      if (items[i].Supply_PR_Raise) {
        if (
          Number.isNaN(Number(items[i].Supply_PR_Raise.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_PR_Raise.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_PR_Raise.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_PR_Raise.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_PR_Raise.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_PR_Raise.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_PR_Raise format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Supply_PO_Issued -------------------------------
      if (items[i].Supply_PO_Issued) {
        if (
          Number.isNaN(Number(items[i].Supply_PO_Issued.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Supply_PO_Issued.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Supply_PO_Issued.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Supply_PO_Issued.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Supply_PO_Issued.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Supply_PO_Issued.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Supply_PO_Issued format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- IMP_PR_Submitted -------------------------------
      if (items[i].IMP_PR_Submitted) {
        if (
          Number.isNaN(Number(items[i].IMP_PR_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].IMP_PR_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].IMP_PR_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].IMP_PR_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].IMP_PR_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].IMP_PR_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid IMP_PR_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- IMP_PR_Approved_Date -------------------------------
      if (items[i].IMP_PR_Approved_Date) {
        if (
          Number.isNaN(Number(items[i].IMP_PR_Approved_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].IMP_PR_Approved_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].IMP_PR_Approved_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].IMP_PR_Approved_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].IMP_PR_Approved_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].IMP_PR_Approved_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid IMP_PR_Approved_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- IMP_PR_Raised -------------------------------
      if (items[i].IMP_PR_Raised) {
        if (
          Number.isNaN(Number(items[i].IMP_PR_Raised.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].IMP_PR_Raised.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].IMP_PR_Raised.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].IMP_PR_Raised.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].IMP_PR_Raised.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].IMP_PR_Raised.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid IMP_PR_Raised format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- IMP_PO_Issued -------------------------------
      if (items[i].IMP_PO_Issued) {
        if (
          Number.isNaN(Number(items[i].IMP_PO_Issued.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].IMP_PO_Issued.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].IMP_PO_Issued.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].IMP_PO_Issued.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].IMP_PO_Issued.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].IMP_PO_Issued.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid IMP_PO_Issued format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PI_Submitted -------------------------------
      if (items[i].PI_Submitted) {
        if (
          Number.isNaN(Number(items[i].PI_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PI_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PI_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PI_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PI_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PI_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PI_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PI_Approved_ENG -------------------------------
      if (items[i].PI_Approved_ENG) {
        if (
          Number.isNaN(Number(items[i].PI_Approved_ENG.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PI_Approved_ENG.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PI_Approved_ENG.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PI_Approved_ENG.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PI_Approved_ENG.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PI_Approved_ENG.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PI_Approved_ENG format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TRC_Approved -------------------------------
      if (items[i].TRC_Approved) {
        if (
          Number.isNaN(Number(items[i].TRC_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TRC_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TRC_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TRC_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TRC_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TRC_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TRC_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- BOI_Approved -------------------------------
      if (items[i].BOI_Approved) {
        if (
          Number.isNaN(Number(items[i].BOI_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].BOI_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].BOI_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].BOI_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].BOI_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].BOI_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid BOI_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- ICL_Approved -------------------------------
      if (items[i].ICL_Approved) {
        if (
          Number.isNaN(Number(items[i].ICL_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].ICL_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].ICL_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].ICL_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].ICL_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].ICL_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid ICL_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Payment_Confirmed -------------------------------
      if (items[i].Payment_Confirmed) {
        if (
          Number.isNaN(Number(items[i].Payment_Confirmed.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Payment_Confirmed.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Payment_Confirmed.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Payment_Confirmed.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Payment_Confirmed.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Payment_Confirmed.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Payment_Confirmed format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- ETA -------------------------------
      if (items[i].ETA) {
        if (
          Number.isNaN(Number(items[i].ETA.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].ETA.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].ETA.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].ETA.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].ETA.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].ETA.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid ETA format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Received_To_Port -------------------------------
      if (items[i].Received_To_Port) {
        if (
          Number.isNaN(Number(items[i].Received_To_Port.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Received_To_Port.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Received_To_Port.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Received_To_Port.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Received_To_Port.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Received_To_Port.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Received_To_Port format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Port_Clearance -------------------------------
      if (items[i].Port_Clearance) {
        if (
          Number.isNaN(Number(items[i].Port_Clearance.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Port_Clearance.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Port_Clearance.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Port_Clearance.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Port_Clearance.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Port_Clearance.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Port_Clearance format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Mobilized_Date -------------------------------
      if (items[i].Mobilized_Date) {
        if (
          Number.isNaN(Number(items[i].Mobilized_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Mobilized_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Mobilized_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Mobilized_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Mobilized_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Mobilized_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Mobilized_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Installation_Date -------------------------------
      if (items[i].Installation_Date) {
        if (
          Number.isNaN(Number(items[i].Installation_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Installation_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Installation_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Installation_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Installation_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Installation_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Installation_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Power_Connected_Date -------------------------------
      if (items[i].Power_Connected_Date) {
        if (
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Power_Connected_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Power_Connected_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- TX_Connected_Date -------------------------------
      if (items[i].TX_Connected_Date) {
        if (
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].TX_Connected_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid TX_Connected_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Commisioned_Date -------------------------------
      if (items[i].Commisioned_Date) {
        if (
          Number.isNaN(Number(items[i].Commisioned_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Commisioned_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Commisioned_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Commisioned_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Commisioned_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Commisioned_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Commisioned_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- SAR_Date -------------------------------
      if (items[i].SAR_Date) {
        if (
          Number.isNaN(Number(items[i].SAR_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].SAR_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].SAR_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].SAR_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].SAR_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].SAR_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid SAR_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAT_Submitted -------------------------------
      if (items[i].PAT_Submitted) {
        if (
          Number.isNaN(Number(items[i].PAT_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PAT_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PAT_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PAT_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PAT_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PAT_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PAT_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAT_Pass_Date -------------------------------
      if (items[i].PAT_Pass_Date) {
        if (
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PAT_Pass_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PAT_Pass_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Check_List_Submitted -------------------------------
      if (items[i].Check_List_Submitted) {
        if (
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Check_List_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Check_List_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Check_List_Verified -------------------------------
      if (items[i].Check_List_Verified) {
        if (
          Number.isNaN(Number(items[i].Check_List_Verified.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Check_List_Verified.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Check_List_Verified.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Check_List_Verified.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Check_List_Verified.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Check_List_Verified.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Check_List_Verified format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- On_Air_Date -------------------------------
      if (items[i].On_Air_Date) {
        if (
          Number.isNaN(Number(items[i].On_Air_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].On_Air_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].On_Air_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].On_Air_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].On_Air_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].On_Air_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid On_Air_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Material_Reconciled -------------------------------
      if (items[i].Material_Reconciled) {
        if (
          Number.isNaN(Number(items[i].Material_Reconciled.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Material_Reconciled.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Material_Reconciled.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Material_Reconciled.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Material_Reconciled.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Material_Reconciled.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Material_Reconciled format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Balance_Material_Returned_Date -------------------------------
      if (items[i].Balance_Material_Returned_Date) {
        if (
          Number.isNaN(Number(items[i].Balance_Material_Returned_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Balance_Material_Returned_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Balance_Material_Returned_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Balance_Material_Returned_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Balance_Material_Returned_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Balance_Material_Returned_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Balance_Material_Returned_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- COW_Submitted -------------------------------
      if (items[i].COW_Submitted) {
        if (
          Number.isNaN(Number(items[i].COW_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].COW_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].COW_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].COW_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].COW_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].COW_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid COW_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- COW_Approved -------------------------------
      if (items[i].COW_Approved) {
        if (
          Number.isNaN(Number(items[i].COW_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].COW_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].COW_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].COW_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].COW_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].COW_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid COW_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- CPL_Submitted -------------------------------
      if (items[i].CPL_Submitted) {
        if (
          Number.isNaN(Number(items[i].CPL_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].CPL_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].CPL_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].CPL_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].CPL_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].CPL_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid CPL_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- CPL_Approved -------------------------------
      if (items[i].CPL_Approved) {
        if (
          Number.isNaN(Number(items[i].CPL_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].CPL_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].CPL_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].CPL_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].CPL_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].CPL_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid CPL_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAC_Invoice_Submitted -------------------------------
      if (items[i].PAC_Invoice_Submitted) {
        if (
          Number.isNaN(Number(items[i].PAC_Invoice_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PAC_Invoice_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PAC_Invoice_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PAC_Invoice_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PAC_Invoice_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PAC_Invoice_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PAC_Invoice_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAC_Invoice_Approved -------------------------------
      if (items[i].PAC_Invoice_Approved) {
        if (
          Number.isNaN(Number(items[i].PAC_Invoice_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PAC_Invoice_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PAC_Invoice_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PAC_Invoice_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PAC_Invoice_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PAC_Invoice_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PAC_Invoice_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- FAC_Submitted -------------------------------
      if (items[i].FAC_Submitted) {
        if (
          Number.isNaN(Number(items[i].FAC_Submitted.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].FAC_Submitted.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].FAC_Submitted.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].FAC_Submitted.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].FAC_Submitted.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].FAC_Submitted.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid FAC_Submitted format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- FAC_Approved -------------------------------
      if (items[i].FAC_Approved) {
        if (
          Number.isNaN(Number(items[i].FAC_Approved.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].FAC_Approved.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].FAC_Approved.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].FAC_Approved.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].FAC_Approved.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].FAC_Approved.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid FAC_Approved format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PO_Closed_Date -------------------------------
      if (items[i].PO_Closed_Date) {
        if (
          Number.isNaN(Number(items[i].PO_Closed_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].PO_Closed_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].PO_Closed_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].PO_Closed_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].PO_Closed_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].PO_Closed_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid PO_Closed_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Capitalized_Date -------------------------------
      if (items[i].Capitalized_Date) {
        if (
          Number.isNaN(Number(items[i].Capitalized_Date.slice(0, 4))) === false &&
          Number.isNaN(Number(items[i].Capitalized_Date.slice(5, 7))) === false &&
          Number.isNaN(Number(items[i].Capitalized_Date.slice(8, 10))) === false
        ) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (
          Number.isNaN(Number(items[i].Capitalized_Date.slice(0, 4))) === true ||
          Number.isNaN(Number(items[i].Capitalized_Date.slice(5, 7))) === true ||
          Number.isNaN(Number(items[i].Capitalized_Date.slice(8, 10))) === true
        ) {
          setDateValidationError('Date format error !');
          setvalidationErrorMessage('Invalid Capitalized_Date format !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 8000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }
      // ----------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------
      // ----------------------------------------------------------------------------------

      // ------------------------- Mobilization_Status -------------------------------------
      if (items[i].Mobilization_Status) {
        if (items[i].Mobilization_Status === 'Completed' && items[i].Mobilized_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].Mobilization_Status !== 'Completed' && items[i].Mobilized_Date) {
          setMobilizationStatusError('Mobilization_Status error !');
          setvalidationErrorMessage(
            'Invalid Mobilization_Status format. Please add Mobilization Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        } else if (items[i].Mobilization_Status === 'Completed' && !items[i].Mobilized_Date) {
          setMobilizationStatusError('Mobilization_Status error !');
          setvalidationErrorMessage(
            'Invalid Mobilization_Status format. Please add Mobilization Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else if (!items[i].Mobilization_Status) {
        setMobilizationStatusError('Mobilization_Status error !');
        setvalidationErrorMessage(
          'Invalid Mobilization_Status format. Please add Mobilization_Status !'
        );
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 6000);
        if (!items[i].Mobilization_Status && items[i].Mobilized_Date) {
          setMobilizationStatusError('Mobilization_Status error !');
          setvalidationErrorMessage(
            'Invalid Mobilization_Status format. Please add Mobilization Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Installation_Status -------------------------------------
      if (items[i].Installation_Status) {
        if (items[i].Installation_Status === 'Completed' && items[i].Installation_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].Installation_Status !== 'Completed' && items[i].Installation_Date) {
          setInstallationStatusError('Installation_Status error !');
          setvalidationErrorMessage(
            'Invalid Installation_Status format. Please add Installation Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        } else if (items[i].Installation_Status === 'Completed' && !items[i].Installation_Date) {
          setInstallationStatusError('Installation_Status error !');
          setvalidationErrorMessage(
            'Invalid Installation_Status format. Please add Installation Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else if (!items[i].Installation_Status) {
        setInstallationStatusError('Installation_Status error !');
        setvalidationErrorMessage(
          'Invalid Installation_Status format. Please add Installation_Status !'
        );
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 6000);
        if (!items[i].Installation_Status && items[i].Installation_Date) {
          setInstallationStatusError('Installation_Status error !');
          setvalidationErrorMessage(
            'Invalid Installation_Status format. Please add Installation Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- Commissioning_Status -------------------------------------
      if (items[i].Commissioning_Status) {
        if (items[i].Commissioning_Status === 'Completed' && items[i].Commisioned_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].Commissioning_Status !== 'Completed' && items[i].Commisioned_Date) {
          setCommissioningStatusError('Commissioning_Status error !');
          setvalidationErrorMessage(
            'Invalid Commissioning_Status format. Please add Commissioning Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        } else if (items[i].Commissioning_Status === 'Completed' && !items[i].Commisioned_Date) {
          setCommissioningStatusError('Commissioning_Status error !');
          setvalidationErrorMessage(
            'Invalid Commissioning_Status format. Please add Commissioning Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else if (!items[i].Commissioning_Status) {
        setCommissioningStatusError('Commissioning_Status error !');
        setvalidationErrorMessage(
          'Invalid Commissioning_Status format. Please add Commissioning_Status !'
        );
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 6000);
        if (!items[i].Commissioning_Status && items[i].Commisioned_Date) {
          setCommissioningStatusError('Commissioning_Status error !');
          setvalidationErrorMessage(
            'Invalid Commissioning_Status format. Please add Commissioning Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- SAR_Status -------------------------------------
      if (items[i].SAR_Status) {
        if (items[i].SAR_Status === 'Approved' && items[i].SAR_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].SAR_Status !== 'Approved' && items[i].SAR_Date) {
          setSARStatusError('SAR_Status error !');
          setvalidationErrorMessage('Invalid SAR_Status format. Please add SAR Approved date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        } else if (items[i].SAR_Status === 'Approved' && !items[i].SAR_Date) {
          setSARStatusError('SAR_Status error !');
          setvalidationErrorMessage('Invalid SAR_Status format. Please add SAR Approved date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else if (!items[i].SAR_Status) {
        setSARStatusError('SAR_Status error !');
        setvalidationErrorMessage('Invalid SAR_Status format. Please add SAR_Status !');
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 6000);
        if (!items[i].SAR_Status && items[i].SAR_Date) {
          setSARStatusError('SAR_Status error !');
          setvalidationErrorMessage('Invalid SAR_Status format. Please add SAR Approved date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- PAT_Status -------------------------------------
      if (items[i].PAT_Status) {
        if (items[i].PAT_Status === 'Pass' && items[i].PAT_Pass_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].PAT_Status !== 'Pass' && items[i].PAT_Pass_Date) {
          setPATStatusError('PAT_Status error !');
          setvalidationErrorMessage('Invalid PAT_Status format. Please add PAT Completed date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        } else if (items[i].PAT_Status === 'Pass' && !items[i].PAT_Pass_Date) {
          setPATStatusError('PAT_Status error !');
          setvalidationErrorMessage('Invalid PAT_Status format. Please add PAT Completed date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else if (!items[i].PAT_Status) {
        setPATStatusError('PAT_Status error !');
        setvalidationErrorMessage('Invalid PAT_Status format. Please add PAT_Status !');
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 6000);
        if (!items[i].PAT_Status && items[i].PAT_Pass_Date) {
          setPATStatusError('PAT_Status error !');
          setvalidationErrorMessage('Invalid PAT_Status format. Please add PAT Completed date !');
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }

      // ------------------------- On_Air_Status -------------------------------------
      if (items[i].On_Air_Status) {
        if (items[i].On_Air_Status === 'Completed' && items[i].On_Air_Date) {
          setSuccessMessage('Your Excell is ready to upload !');
        } else if (items[i].On_Air_Status !== 'Completed' && items[i].On_Air_Date) {
          setOnAirStatusError('On_Air_Status error !');
          setvalidationErrorMessage(
            'Invalid On_Air_Status format. Please add On Air Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        } else if (items[i].On_Air_Status === 'Completed' && !items[i].On_Air_Date) {
          setOnAirStatusError('On_Air_Status error !');
          setvalidationErrorMessage(
            'Invalid On_Air_Status format. Please add On Air Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else if (!items[i].On_Air_Status) {
        setOnAirStatusError('On_Air_Status error !');
        setvalidationErrorMessage('Invalid On_Air_Status format. Please add On_Air_Status !');
        setTimeout(() => {
          setvalidationErrorMessage('');
        }, 6000);
        if (!items[i].On_Air_Status && items[i].On_Air_Date) {
          setOnAirStatusError('On_Air_Status error !');
          setvalidationErrorMessage(
            'Invalid On_Air_Status format. Please add On Air Completed date !'
          );
          setTimeout(() => {
            setvalidationErrorMessage('');
          }, 6000);
        }
      } else {
        setSuccessMessage('Your Excell is ready to upload !');
      }
      // -----------------------------------------------------------------------------
    }
  };

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
          setcurrentUser(`${jsonDecInfo.username} ${jsonDecInfo.lastName}`);
        }
      }
    }
  }, []);

  // paramaeters change with change of items
  useEffect(() => {
    setMobilizationStatusError('');
    setInstallationStatusError('');
    setCommissioningStatusError('');
    setSARStatusError('');
    setPATStatusError('');
    setOnAirStatusError('');
    setvalidationError('');
    settablecelColor('');
    setDateValidationError('');
    setvalidationErrorMessage('');
    setSuccessMessage('');
    errorHandler();
    Formatter();
  }, [items]);

  // uploading excell data to the database
  const uplaodHandler = async (e) => {
    e.preventDefault();
    const newPost = items;

    if (validationError) {
      errorHandler();
      setvalidationErrorMessage('Please fill all the mandatorily required fields before submit !');
    } else if (dateValidationError === 'Date format error !') {
      Formatter();
      setvalidationErrorMessage(
        'Please change date format of fields with invalid date to yyyy-mm-dd format before submit !'
      );
    } else if (dateValidationError === 'Implementation_By format error !') {
      Formatter();
      setvalidationErrorMessage(
        'Invalid Implementation_By input. Please fill with "ZTE" or "Huawei" before submit !'
      );
    } else if (dateValidationError === 'Implementation_By is empty !') {
      Formatter();
      setvalidationErrorMessage(
        'Please fill Implementation_By field with "ZTE" or "Huawei" before submit !'
      );
    }
    // else if (projectNamevalidationError === 'Project name error !') {
    //   Formatter();
    //   setvalidationErrorMessage(
    //     'Invalid Project name input. Please define your Project name in Overview Table !'
    //   );
    // }
    else if (mobilizationStatusError) {
      Formatter();
      setvalidationErrorMessage(
        'Please fill Mobilization_Status or Mobilized_Date field before submit !'
      );
    } else if (installationStatusError) {
      Formatter();
      setvalidationErrorMessage(
        'Please fill Installation_Status or Installation_Date field before submit !'
      );
    } else if (commissioningStatusError) {
      Formatter();
      setvalidationErrorMessage(
        'Please fill Commissioning_Status or Commisioned_Date field before submit !'
      );
    } else if (sarStatusError) {
      Formatter();
      setvalidationErrorMessage('Please fill SAR_Status or SAR_Date field before submit !');
    } else if (patStatusError) {
      Formatter();
      setvalidationErrorMessage('Please fill PAT_Status or PAT_Pass_Date field before submit !');
    } else if (onAirStatusError) {
      Formatter();
      setvalidationErrorMessage('Please fill On_Air_Status or On_Air_Date field before submit !');
      // Today validation work
    } else {
      axiosInstance
        .post('/vendorProjectsDatabasesExcell/upload', newPost)
        .then((res) => {
          alert(`${res.data.success}`);

          // const confirmBox = window.confirm('Do you want to upload more documents ?');
          // if (confirmBox === true) {
          //   navigate('/dashboard/DatabasesUploadProjectFiles', { replace: true });
          // } else {
          //   navigate('/dashboard/DatabasesVendorProjects', { replace: true });
          // }
        })
        .catch((error) => {
          if (error && error.response.data.error === 'Planning ID must be a unique value !') {
            alert('Planning ID must be a unique value !');
            // console.log(error);
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error && error.response.data.error === 'request entity too large') {
            alert('Too large file. Please split the file and upload !');
          }
        });
    }
  };

  // inpit excell reading
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false
        });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {items.length > 0 ? (
          <Chip icon={<AttachmentIcon />} label={file.name} color="success" variant="outlined" />
        ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          {items.length > 0 ? (
            <Button size="medium" variant="outlined" component="span" onClick={changeFileHandler}>
              Change File
            </Button>
          ) : null}
          {items.length > 0 ? (
            <Button size="small" variant="contained" component="span" onClick={uplaodHandler}>
              Upload file
            </Button>
          ) : (
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                    setFile(file);
                  }}
                />
                <Button size="medium" variant="outlined" component="span">
                  Choose File
                </Button>
              </label>
              <a href={ExcellTemplate} download="SampleExcellTemplate.xlsx">
                Download Sample Excell Sheet
              </a>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {validationErrorMessage && (
          <Grid item xs={12} sm={6} md={12}>
            <Accordion
              sx={{
                backgroundColor: '#c20202',
                borderRadius: 0.2,
                alignItems: 'center'
              }}
            >
              <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant="h8" justifyContent="space-between">
                  <span className="error-message">{validationErrorMessage}</span>
                </Typography>
              </AccordionSummary>
            </Accordion>
          </Grid>
        )}
      </Stack>
      {items.length > 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: '380px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Index</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Planning_ID</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Implementation_By
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Project&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Site_ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Site_Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  HO_Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>HO_Modification</StyledTableCell>
                <StyledTableCell>
                  HO_Modified_Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Scope&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  New_RAT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  New_Sector&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Approval_Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Approval_Ref&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  IMP_Scenario&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  blank1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  blank2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  blank3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Tilt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Azimuth&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Antenna_Height</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>New_RRU_Type</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  RRU_From&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>New_BTS_Type</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  BTS_From&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>New_Antenna_Type</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Antenna_From</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Cards_Type_n_From
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Battery_count_n_From
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>Mobitel_Region</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Planning_Engineer
                </StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>On_Air_Target</StyledTableCell>
                <StyledTableCell style={{ color: tablecelColor }}>
                  Planning_Comments
                </StyledTableCell>
                <StyledTableCell>Site_Engineer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>Assigned_Date</StyledTableCell>
                <StyledTableCell>Special_Tag</StyledTableCell>
                <StyledTableCell>Coordinator_Comments</StyledTableCell>
                <StyledTableCell>Sub_Contractor</StyledTableCell>
                <StyledTableCell>Sub_Contractor_Remarks</StyledTableCell>
                <StyledTableCell>Site_Status</StyledTableCell>
                <StyledTableCell>Dependency&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>Responsible&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>Dependencies_On_Air_Target</StyledTableCell>
                <StyledTableCell>Civil_PAT_Date</StyledTableCell>
                <StyledTableCell>SAQ_Clearance_Date</StyledTableCell>
                <StyledTableCell>TSSR_Referance</StyledTableCell>
                <StyledTableCell>TSSR_Submitted_Date</StyledTableCell>
                <StyledTableCell>TSSR_Approved_Date</StyledTableCell>
                <StyledTableCell>Supply_BOQ_Submitted</StyledTableCell>
                <StyledTableCell>Supply_BOQ_Approved</StyledTableCell>
                <StyledTableCell>Approval_Received_Date</StyledTableCell>
                <StyledTableCell>MCW_Requested_Date</StyledTableCell>
                <StyledTableCell>MCW_Completed_Date</StyledTableCell>
                <StyledTableCell>Supply_PR_Submitted</StyledTableCell>
                <StyledTableCell>Supply_PR_Status</StyledTableCell>
                <StyledTableCell>Supply_PR_Approved_Date</StyledTableCell>
                <StyledTableCell>Supply_PR_Number</StyledTableCell>
                <StyledTableCell>Supply_PR_Raise</StyledTableCell>
                <StyledTableCell>Supply_PO_Number</StyledTableCell>
                <StyledTableCell>Supply_PO_Issued</StyledTableCell>
                <StyledTableCell>IMP_PR_Submitted</StyledTableCell>
                <StyledTableCell>IMP_PR_Approved_Date</StyledTableCell>
                <StyledTableCell>IMP_PR_Number</StyledTableCell>
                <StyledTableCell>IMP_PR_Raised</StyledTableCell>
                <StyledTableCell>IMP_PO_Number</StyledTableCell>
                <StyledTableCell>IMP_PO_Issued</StyledTableCell>
                <StyledTableCell>
                  AWR_1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>
                  AWR_2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>
                  AWR_3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>PI_Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>PI_Submitted</StyledTableCell>
                <StyledTableCell>PI_Approved_ENG</StyledTableCell>
                <StyledTableCell>TRC_Approved</StyledTableCell>
                <StyledTableCell>BOI_Approved</StyledTableCell>
                <StyledTableCell>ICL_Approved</StyledTableCell>
                <StyledTableCell>Payment_Method</StyledTableCell>
                <StyledTableCell>Payment_Confirmed</StyledTableCell>
                <StyledTableCell>
                  ETA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </StyledTableCell>
                <StyledTableCell>Received_To_Port</StyledTableCell>
                <StyledTableCell>Port_Clearance</StyledTableCell>
                <StyledTableCell>Logistics_Remarks</StyledTableCell>
                <StyledTableCell>Mobilization_Status&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>Mobilized_Date</StyledTableCell>
                <StyledTableCell>Installation_Status</StyledTableCell>
                <StyledTableCell>Installation_Date</StyledTableCell>
                <StyledTableCell>Power_Connected_Date&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>TX_Connected_Date</StyledTableCell>
                <StyledTableCell>Commissioning_Status</StyledTableCell>
                <StyledTableCell>Commisioned_Date</StyledTableCell>
                <StyledTableCell>SAR_Reference</StyledTableCell>
                <StyledTableCell>SAR_Status</StyledTableCell>
                <StyledTableCell>SAR_Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>PAT_Reference</StyledTableCell>
                <StyledTableCell>PAT_Status</StyledTableCell>
                <StyledTableCell>PAT_Submitted</StyledTableCell>
                <StyledTableCell>PAT_Pass_Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>Check_List_Submitted</StyledTableCell>
                <StyledTableCell>Check_List_Verified</StyledTableCell>
                <StyledTableCell>On_Air_Status</StyledTableCell>
                <StyledTableCell>On_Air_Date</StyledTableCell>
                <StyledTableCell>Material_Reconciled</StyledTableCell>
                <StyledTableCell>Balance_Material_Returned_Date</StyledTableCell>
                <StyledTableCell>COW_Number</StyledTableCell>
                <StyledTableCell>COW_Submitted</StyledTableCell>
                <StyledTableCell>COW_Approved</StyledTableCell>
                <StyledTableCell>CPL_Number</StyledTableCell>
                <StyledTableCell>CPL_Submitted</StyledTableCell>
                <StyledTableCell>CPL_Approved</StyledTableCell>
                <StyledTableCell>PAC_Invoice_Number</StyledTableCell>
                <StyledTableCell>PAC_Invoice_Submitted</StyledTableCell>
                <StyledTableCell>PAC_Invoice_Approved</StyledTableCell>
                <StyledTableCell>FAC_Number</StyledTableCell>
                <StyledTableCell>FAC_Submitted</StyledTableCell>
                <StyledTableCell>FAC_Approved</StyledTableCell>
                <StyledTableCell>PO_Status&nbsp;&nbsp;&nbsp;</StyledTableCell>
                <StyledTableCell>PO_Closed_Date</StyledTableCell>
                <StyledTableCell>Capitalization_Status</StyledTableCell>
                <StyledTableCell>Capitalized_Date</StyledTableCell>
                <StyledTableCell>Finance_Remarks</StyledTableCell>
                <StyledTableCell>Uploading_By</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <StyledTableRow key={item.Planning_ID}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{item.Planning_ID}</StyledTableCell>
                  <StyledTableCell align="left">{item.Implementation_By}</StyledTableCell>
                  <StyledTableCell align="left">{item.Project}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_ID}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Name}</StyledTableCell>
                  <StyledTableCell align="left">{item.HO_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.HO_Modification}</StyledTableCell>
                  <StyledTableCell align="left">{item.HO_Modified_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Scope}</StyledTableCell>
                  <StyledTableCell align="left">{item.New_RAT}</StyledTableCell>
                  <StyledTableCell align="left">{item.New_Sector}</StyledTableCell>
                  <StyledTableCell align="left">{item.Approval_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Approval_Ref}</StyledTableCell>
                  <StyledTableCell align="left">{item.IMP_Scenario}</StyledTableCell>
                  <StyledTableCell align="left">{item.blank1}</StyledTableCell>
                  <StyledTableCell align="left">{item.blank2}</StyledTableCell>
                  <StyledTableCell align="left">{item.blank3}</StyledTableCell>
                  <StyledTableCell align="left">{item.Tilt}</StyledTableCell>
                  <StyledTableCell align="left">{item.Azimuth}</StyledTableCell>
                  <StyledTableCell align="left">{item.Antenna_Height}</StyledTableCell>
                  <StyledTableCell align="left">{item.New_RRU_Type}</StyledTableCell>
                  <StyledTableCell align="left">{item.RRU_From}</StyledTableCell>
                  <StyledTableCell align="left">{item.New_BTS_Type}</StyledTableCell>
                  <StyledTableCell align="left">{item.BTS_From}</StyledTableCell>
                  <StyledTableCell align="left">{item.New_Antenna_Type}</StyledTableCell>
                  <StyledTableCell align="left">{item.Antenna_From}</StyledTableCell>
                  <StyledTableCell align="left">{item.Cards_Type_n_From}</StyledTableCell>
                  <StyledTableCell align="left">{item.Battery_count_n_From}</StyledTableCell>
                  <StyledTableCell align="left">{item.Mobitel_Region}</StyledTableCell>
                  <StyledTableCell align="left">{item.Planning_Engineer}</StyledTableCell>
                  <StyledTableCell align="left">{item.On_Air_Target}</StyledTableCell>
                  <StyledTableCell align="left">{item.Planning_Comments}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Engineer}</StyledTableCell>
                  <StyledTableCell align="left">{item.Assigned_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Special_Tag}</StyledTableCell>
                  <StyledTableCell align="left">{item.Coordinator_Comments}</StyledTableCell>
                  <StyledTableCell align="left">{item.Sub_Contractor}</StyledTableCell>
                  <StyledTableCell align="left">{item.Sub_Contractor_Remarks}</StyledTableCell>
                  <StyledTableCell align="left">{item.Site_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Dependency}</StyledTableCell>
                  <StyledTableCell align="left">{item.Responsible}</StyledTableCell>
                  <StyledTableCell align="left">{item.Dependencies_On_Air_Target}</StyledTableCell>
                  <StyledTableCell align="left">{item.Civil_PAT_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAQ_Clearance_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.TSSR_Referance}</StyledTableCell>
                  <StyledTableCell align="left">{item.TSSR_Submitted_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.TSSR_Approved_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_BOQ_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_BOQ_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.Approval_Received_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.MCW_Requested_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.MCW_Completed_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_PR_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_PR_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_PR_Approved_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_PR_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_PR_Raise}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_PO_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.Supply_PO_Issued}</StyledTableCell>
                  <StyledTableCell align="left">{item.IMP_PR_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.IMP_PR_Approved_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.IMP_PR_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.IMP_PR_Raised}</StyledTableCell>
                  <StyledTableCell align="left">{item.IMP_PO_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.IMP_PO_Issued}</StyledTableCell>
                  <StyledTableCell align="left">{item.AWR_1}</StyledTableCell>
                  <StyledTableCell align="left">{item.AWR_2}</StyledTableCell>
                  <StyledTableCell align="left">{item.AWR_3}</StyledTableCell>
                  <StyledTableCell align="left">{item.PI_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.PI_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.PI_Approved_ENG}</StyledTableCell>
                  <StyledTableCell align="left">{item.TRC_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.BOI_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.ICL_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.Payment_Method}</StyledTableCell>
                  <StyledTableCell align="left">{item.Payment_Confirmed}</StyledTableCell>
                  <StyledTableCell align="left">{item.ETA}</StyledTableCell>
                  <StyledTableCell align="left">{item.Received_To_Port}</StyledTableCell>
                  <StyledTableCell align="left">{item.Port_Clearance}</StyledTableCell>
                  <StyledTableCell align="left">{item.Logistics_Remarks}</StyledTableCell>
                  <StyledTableCell align="left">{item.Mobilization_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Mobilized_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Installation_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Installation_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Power_Connected_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.TX_Connected_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Commissioning_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Commisioned_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAR_Reference}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAR_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.SAR_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAT_Reference}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAT_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAT_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAT_Pass_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Check_List_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.Check_List_Verified}</StyledTableCell>
                  <StyledTableCell align="left">{item.On_Air_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.On_Air_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Material_Reconciled}</StyledTableCell>
                  <StyledTableCell align="left">
                    {item.Balance_Material_Returned_Date}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.COW_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.COW_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.COW_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.CPL_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.CPL_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.CPL_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAC_Invoice_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAC_Invoice_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.PAC_Invoice_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.FAC_Number}</StyledTableCell>
                  <StyledTableCell align="left">{item.FAC_Submitted}</StyledTableCell>
                  <StyledTableCell align="left">{item.FAC_Approved}</StyledTableCell>
                  <StyledTableCell align="left">{item.PO_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.PO_Closed_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Capitalization_Status}</StyledTableCell>
                  <StyledTableCell align="left">{item.Capitalized_Date}</StyledTableCell>
                  <StyledTableCell align="left">{item.Finance_Remarks}</StyledTableCell>
                  <StyledTableCell align="left">{item.Uploading_By}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
}

export default UploadExcellData;
