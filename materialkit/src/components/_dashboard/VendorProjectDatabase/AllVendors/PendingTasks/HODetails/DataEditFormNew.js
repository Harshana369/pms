import react, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import CryptoJS from 'react-native-crypto-js';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckMark from '@iconify/icons-eva/checkmark-fill';
import Clear from '@iconify/icons-eva/question-mark-outline';
import { Icon } from '@iconify/react';
// material
import Alert from '@mui/material/Alert';
import {
  Stack,
  TextField,
  Button,
  Grid,
  Typography,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
/* eslint-disable camelcase */

const Implementation_ByVendor = [
  {
    value: 'ZTE',
    label: 'ZTE'
  },
  {
    value: 'Huawei',
    label: 'Huawei'
  }
];

const HandoverModification = [
  {
    value: 'Scope Changed',
    label: 'Scope Changed'
  },
  {
    value: 'Material Changed',
    label: 'Material Changed'
  },
  {
    value: 'Withdrawn',
    label: 'Withdrawn'
  }
];

const SpecialTag = [
  {
    value: 'VIP site',
    label: 'VIP site'
  },
  {
    value: 'VIP New Site',
    label: 'VIP New Site'
  },
  {
    value: 'GS New Site',
    label: 'GS New Site'
  },
  {
    value: 'New Site',
    label: 'New Site'
  },
  {
    value: 'Lamp Pole',
    label: 'Lamp Pole'
  },
  {
    value: 'Urgent',
    label: 'Urgent'
  },
  {
    value: 'Not Applicable',
    label: 'Not Applicable'
  }
];

const ApprovalStatus = [
  {
    value: 'Approved',
    label: 'Approved'
  },
  {
    value: 'Pending',
    label: 'Pending'
  }
];

const SupplyPRStatus = [
  {
    value: 'Approved',
    label: 'Approved'
  },
  {
    value: 'Rejected',
    label: 'Rejected'
  }
];

const POStatus = [
  {
    value: 'Open',
    label: 'Open'
  },
  {
    value: 'Closed',
    label: 'Closed'
  }
];

const Dependencies = [
  {
    value: 'Dependencies1',
    label: 'Dependencies1'
  },
  {
    value: 'Dependencies2',
    label: 'Dependencies2'
  }
];

const CapitalizationStatus = [
  {
    value: 'Completed',
    label: 'Completed'
  },
  {
    value: 'Pending',
    label: 'Pending'
  }
];

const Scopes = [
  {
    value: 'New Site',
    label: 'New Site'
  },
  {
    value: 'Sector Installation',
    label: 'Sector Installation'
  },
  {
    value: 'Relocation',
    label: 'Relocation'
  },
  {
    value: 'Cabinet Swap',
    label: 'Cabinet Swap'
  },
  {
    value: 'RRU SWAP',
    label: 'RRU SWAP'
  },
  {
    value: 'Antenna & RRU SWAP',
    label: 'Antenna & RRU SWAP'
  },
  {
    value: 'SB Antenna to Sector Split',
    label: 'SB Antenna to Sector Split'
  },
  {
    value: 'Card Addition',
    label: 'Card Addition'
  },
  {
    value: 'Jumper Instalation',
    label: 'Jumper Instalation'
  },
  {
    value: 'Jumper Instalation & Card Addition',
    label: 'Jumper Instalation & Card Addition'
  },
  {
    value: 'Antenna & RRU Instalation',
    label: 'Antenna & RRU Instalation'
  },
  {
    value: 'SB Antenna to Sector Split & Card Addition',
    label: 'SB Antenna to Sector Split & Card Addition'
  },
  {
    value: 'Antenna, RRU Installation & Card Addition',
    label: 'Antenna, RRU Installation & Card Addition'
  },
  {
    value: 'Antenna Instalation & RRU SWAP',
    label: 'Antenna Instalation & RRU SWAP'
  },
  {
    value: 'Antenna SWAP',
    label: 'Antenna SWAP'
  },
  {
    value: 'RFU SWAP',
    label: 'RFU SWAP'
  },
  {
    value: 'Technology Marge',
    label: 'Technology Marge'
  },
  {
    value: 'Antenna Installation',
    label: 'Antenna Installation'
  },
  {
    value: 'Antenna Removal',
    label: 'Antenna Removal'
  },
  {
    value: 'Antenna SWAP & RRU Instalation',
    label: 'Antenna SWAP & RRU Instalation'
  },
  {
    value: 'Antenna installation & Card Addition',
    label: 'Antenna installation & Card Addition'
  },
  {
    value: 'Card Swap',
    label: 'Card Swap'
  },
  {
    value: 'RRU Removal',
    label: 'RRU Removal'
  },
  {
    value: 'Sector Removal',
    label: 'Sector Removal'
  },
  {
    value: 'Antenna Height Increase',
    label: 'Antenna Height Increase'
  },
  {
    value: 'Sector Installation_TEMP',
    label: 'Sector Installation_TEMP'
  },
  {
    value: 'Site Installation_TEMP',
    label: 'Site Installation_TEMP'
  },
  {
    value: 'Card Removal',
    label: 'Card Removal'
  },
  {
    value: 'Site Removal',
    label: 'Site Removal'
  },
  {
    value: 'Filter Installation',
    label: 'Filter Installation'
  },
  {
    value: 'Battery Cabinet installation',
    label: 'Battery Cabinet installation'
  },
  {
    value: 'NBIoT-G900',
    label: 'NBIoT-G900'
  },
  {
    value: 'Not Available',
    label: 'Not Available'
  }
];

const RATs = [
  {
    value: '9',
    label: '9'
  },
  {
    value: '18',
    label: '18'
  },
  {
    value: 'U',
    label: 'U'
  },
  {
    value: 'L18',
    label: 'L18'
  },
  {
    value: 'L850',
    label: 'L850'
  },
  {
    value: 'DB',
    label: 'DB'
  },
  {
    value: '9U',
    label: '9U'
  },
  {
    value: '9L18',
    label: '9L18'
  },
  {
    value: '9L850',
    label: '9L850'
  },
  {
    value: '18U',
    label: '18U'
  },
  {
    value: '18L18',
    label: '18L18'
  },
  {
    value: '18L850',
    label: '18L850'
  },
  {
    value: '18UL18',
    label: '18UL18'
  },
  {
    value: '18UL850',
    label: '18UL850'
  },
  {
    value: '18UL18L850',
    label: '18UL18L850'
  },
  {
    value: 'DBU',
    label: 'DBU'
  },
  {
    value: 'DBL18',
    label: 'DBL18'
  },
  {
    value: 'DBL850',
    label: 'DBL850'
  },
  {
    value: 'DBL18L850',
    label: 'DBL18L850'
  },
  {
    value: 'DBUL18',
    label: 'DBUL18'
  },
  {
    value: 'DBUL18L850',
    label: 'DBUL18L850'
  },
  {
    value: '9UL18',
    label: '9UL18'
  },
  {
    value: '9UL850',
    label: '9UL850'
  },
  {
    value: '9UL18L850',
    label: '9UL18L850'
  },
  {
    value: 'UL18',
    label: 'UL18'
  },
  {
    value: 'UL850',
    label: 'UL850'
  },
  {
    value: 'UL18L850',
    label: 'UL18L850'
  },
  {
    value: 'L18L850',
    label: 'L18L850'
  },
  {
    value: '18UL',
    label: '18UL'
  },
  {
    value: '18L850L18',
    label: '18L850L18'
  },
  {
    value: '9UL',
    label: '9UL'
  },
  {
    value: 'Not Available',
    label: 'Not Available'
  }
];

const Sub_Contractors = [
  {
    value: 'Etel',
    label: 'Etel'
  },
  {
    value: 'Intel',
    label: 'Intel'
  },
  {
    value: 'L&H',
    label: 'L&H'
  },
  {
    value: 'Assure',
    label: 'Assure'
  },
  {
    value: 'Elecom',
    label: 'Elecom'
  },
  {
    value: 'Suvitech',
    label: 'Suvitech'
  },
  {
    value: 'Gartar',
    label: 'Gartar'
  },
  {
    value: 'ZTE',
    label: 'ZTE'
  },
  {
    value: 'Huawei',
    label: 'Huawei'
  }
];

const Site_Statuses = [
  {
    value: 'On Air',
    label: 'On Air'
  },
  {
    value: 'Site Withdrawn',
    label: 'Site Withdrawn'
  },
  {
    value: 'PAT Pending',
    label: 'PAT Pending'
  },
  {
    value: 'Commissioning Pending',
    label: 'Commissioning Pending'
  },
  {
    value: 'Commissioned / Power Pending',
    label: 'Commissioned / Power Pending'
  },
  {
    value: 'Installed / Power Pending',
    label: 'Installed / Power Pending'
  },
  {
    value: 'Installed / TX Pending / Power Pending',
    label: 'Installed / TX Pending / Power Pending'
  },
  {
    value: 'Installation WIP / Power Pending',
    label: 'Installation WIP / Power Pending'
  },
  {
    value: 'Installation Pending / Power Not Connected',
    label: 'Installation Pending / Power Not Connected'
  },
  {
    value: 'Installed / TX Pending',
    label: 'Installed / TX Pending'
  },
  {
    value: 'Installation Pending',
    label: 'Installation Pending'
  },
  {
    value: 'Tower Pending / Power Not Connected',
    label: 'Tower Pending / Power Not Connected'
  },
  {
    value: 'Relocation Pending / Power Pending',
    label: 'Relocation Pending / Power Pending'
  },
  {
    value: 'Equipment Pending / Power Not Connected',
    label: 'Equipment Pending / Power Not Connected'
  },
  {
    value: 'Equipment Pending',
    label: 'Equipment Pending'
  },
  {
    value: 'Approval Pending',
    label: 'Approval Pending'
  },
  {
    value: 'SAQ Clearance Pending',
    label: 'SAQ Clearance Pending'
  },
  {
    value: 'Supply Only',
    label: 'Supply Only'
  }
];

const Responsibles = [
  {
    value: 'Not Apllicable',
    label: 'Not Apllicable'
  },
  {
    value: 'Regional Operations',
    label: 'Regional Operations'
  },
  {
    value: 'Project',
    label: 'Project'
  },
  {
    value: 'Power',
    label: 'Power'
  },
  {
    value: 'Power / Transmission',
    label: 'Power / Transmission'
  },
  {
    value: 'Project / Power',
    label: 'Project / Power'
  },
  {
    value: 'Transmission',
    label: 'Transmission'
  },
  {
    value: 'Civil',
    label: 'Civil'
  },
  {
    value: 'RNO / PRC',
    label: 'RNO / PRC'
  },
  {
    value: 'RNO',
    label: 'RNO'
  },
  {
    value: 'SAQ',
    label: 'SAQ'
  }
];

const Mobilization_Statuses = [
  {
    value: 'Completed',
    label: 'Completed'
  },
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Hold',
    label: 'Hold'
  }
];

const Installation_Statuses = [
  {
    value: 'Completed',
    label: 'Completed'
  },
  {
    value: 'TX Completed-Power Pending',
    label: 'TX Completed-Power Pending'
  },
  {
    value: 'TX Pending-Power Completed',
    label: 'TX Pending-Power Completed'
  },
  {
    value: 'TX Pending-Power Pending',
    label: 'TX Pending-Power Pending'
  },
  {
    value: 'Installation Pending',
    label: 'Installation Pending'
  },
  {
    value: 'Hold',
    label: 'Hold'
  }
];

const Commissioning_Statuses = [
  {
    value: 'Completed',
    label: 'Completed'
  },
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Hold',
    label: 'Hold'
  }
];

const SAR_Statuses = [
  {
    value: 'Approved',
    label: 'Approved'
  },
  {
    value: 'Submitted',
    label: 'Submitted'
  },
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Rejected',
    label: 'Rejected'
  },
  {
    value: 'PAT Only',
    label: 'PAT Only'
  }
];

const PAT_Statuses = [
  {
    value: 'Pass',
    label: 'Pass'
  },
  {
    value: 'Pass with minor',
    label: 'Pass with minor'
  },
  {
    value: 'Submitted',
    label: 'Submitted'
  },
  {
    value: 'Rejected',
    label: 'Rejected'
  },
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'SAR Only',
    label: 'SAR Only'
  }
];

const On_Air_Statuses = [
  {
    value: 'Completed',
    label: 'Completed'
  },
  {
    value: 'Pending',
    label: 'Pending'
  },
  {
    value: 'Hold',
    label: 'Hold'
  }
];

export default function DataEditFormNew() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();
  const theme = useTheme();

  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [siteEngineerNamesList, setSiteEngineerNamesList] = useState([]);
  const [Scopes, setScopes] = useState([]);
  const [RATs, setRATs] = useState([]);
  const [Sub_Contractors, setSub_Contractors] = useState([]);

  const [CurrentUserName, setCurrentUserName] = useState();

  const [showCheckMark1, setShowCheckMark1] = useState(false);
  const [showCheckMark2, setShowCheckMark2] = useState(false);
  const [showCheckMark3, setShowCheckMark3] = useState(false);
  const [showCheckMark4, setShowCheckMark4] = useState(false);
  const [showCheckMark5, setShowCheckMark5] = useState(false);
  const [showCheckMark6, setShowCheckMark6] = useState(false);
  const [showCheckMark7, setShowCheckMark7] = useState(false);
  const [showCheckMark8, setShowCheckMark8] = useState(false);
  const [showCheckMark9, setShowCheckMark9] = useState(false);
  const [showCheckMark10, setShowCheckMark10] = useState(false);
  const [showCheckMark11, setShowCheckMark11] = useState(false);
  const [showCheckMark12, setShowCheckMark12] = useState(false);
  const [showCheckMark13, setShowCheckMark13] = useState(false);
  const [showCheckMark14, setShowCheckMark14] = useState(false);
  const [showCheckMark15, setShowCheckMark15] = useState(false);
  const [showCheckMark16, setShowCheckMark16] = useState(false);
  const [showCheckMark17, setShowCheckMark17] = useState(false);
  const [showCheckMark18, setShowCheckMark18] = useState(false);
  const [showCheckMark19, setShowCheckMark19] = useState(false);
  const [showCheckMark20, setShowCheckMark20] = useState(false);
  const [showCheckMark21, setShowCheckMark21] = useState(false);
  const [showCheckMark22, setShowCheckMark22] = useState(false);
  const [showCheckMark23, setShowCheckMark23] = useState(false);
  const [showCheckMark24, setShowCheckMark24] = useState(false);
  const [showCheckMark25, setShowCheckMark25] = useState(false);
  const [showCheckMark26, setShowCheckMark26] = useState(false);
  const [showCheckMark27, setShowCheckMark27] = useState(false);
  const [showCheckMark28, setShowCheckMark28] = useState(false);
  const [showCheckMark29, setShowCheckMark29] = useState(false);
  const [showCheckMark30, setShowCheckMark30] = useState(false);
  const [showCheckMark31, setShowCheckMark31] = useState(false);
  const [showCheckMark32, setShowCheckMark32] = useState(false);
  const [showCheckMark33, setShowCheckMark33] = useState(false);
  const [showCheckMark34, setShowCheckMark34] = useState(false);
  const [showCheckMark35, setShowCheckMark35] = useState(false);
  const [showCheckMark36, setShowCheckMark36] = useState(false);
  const [showCheckMark37, setShowCheckMark37] = useState(false);
  const [showCheckMark38, setShowCheckMark38] = useState(false);
  const [showCheckMark39, setShowCheckMark39] = useState(false);
  const [showCheckMark40, setShowCheckMark40] = useState(false);
  const [showCheckMark41, setShowCheckMark41] = useState(false);
  const [showCheckMark42, setShowCheckMark42] = useState(false);
  const [showCheckMark43, setShowCheckMark43] = useState(false);
  const [showCheckMark44, setShowCheckMark44] = useState(false);
  const [showCheckMark45, setShowCheckMark45] = useState(false);
  const [showCheckMark46, setShowCheckMark46] = useState(false);

  const { id } = useParams();
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alertContent1, setAlertContent1] = useState('');
  const [alertContent2, setAlertContent2] = useState('');
  const [snackbar, setSnackbar] = react.useState(null);
  const [value, setValue] = react.useState(new Date());
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState({
    Planning_ID: '',
    Implementation_By: '',
    Project: '',
    Site_ID: '',
    Site_Name: '',
    HO_Date: '',
    HO_Modification: '',
    HO_Modified_Date: '',
    Scope: '',
    New_RAT: '',
    New_Sector: '',
    Approval_Status: '',
    Approval_Ref: '',
    IMP_Scenario: '',
    blank1: '',
    blank2: '',
    blank3: '',
    Tilt: '',
    Azimuth: '',
    Antenna_Height: '',
    New_RRU_Type: '',
    RRU_From: '',
    New_BTS_Type: '',
    BTS_From: '',
    New_Antenna_Type: '',
    Antenna_From: '',
    Cards_Type_n_From: '',
    Battery_count_n_From: '',
    Mobitel_Region: '',
    Planning_Engineer: '',
    On_Air_Target: '',
    Planning_Comments: '',
    Site_Engineer: '',
    Assigned_Date: '',
    Special_Tag: '',
    Coordinator_Comments: '',
    Sub_Contractor: '',
    Sub_Contractor_Remarks: '',
    Site_Status: '',
    Dependency: '',
    Responsible: '',
    Dependencies_On_Air_Target: '',
    Civil_PAT_Date: '',
    SAQ_Clearance_Date: '',
    TSSR_Referance: '',
    TSSR_Submitted_Date: '',
    TSSR_Approved_Date: '',
    Supply_BOQ_Submitted: '',
    Supply_BOQ_Approved: '',
    Approval_Received_Date: '',
    MCW_Requested_Date: '',
    MCW_Completed_Date: '',
    Supply_PR_Submitted: '',
    Supply_PR_Status: '',
    Supply_PR_Approved_Date: '',
    Supply_PR_Number: '',
    Supply_PR_Raise: '',
    Supply_PO_Number: '',
    Supply_PO_Issued: '',
    IMP_PR_Submitted: '',
    IMP_PR_Approved_Date: '',
    IMP_PR_Number: '',
    IMP_PR_Raised: '',
    IMP_PO_Number: '',
    IMP_PO_Issued: '',
    AWR_1: '',
    AWR_2: '',
    AWR_3: '',
    PI_Number: '',
    PI_Submitted: '',
    PI_Approved_ENG: '',
    TRC_Approved: '',
    BOI_Approved: '',
    ICL_Approved: '',
    Payment_Method: '',
    Payment_Confirmed: '',
    ETA: '',
    Received_To_Port: '',
    Port_Clearance: '',
    Logistics_Remarks: '',
    Mobilization_Status: '',
    Mobilized_Date: '',
    Installation_Status: '',
    Installation_Date: '',
    Power_Connected_Date: '',
    TX_Connected_Date: '',
    Commissioning_Status: '',
    Commisioned_Date: '',
    SAR_Reference: '',
    SAR_Status: '',
    SAR_Date: '',
    PAT_Reference: '',
    PAT_Status: '',
    PAT_Submitted: '',
    PAT_Pass_Date: '',
    Check_List_Submitted: '',
    Check_List_Verified: '',
    On_Air_Status: '',
    On_Air_Date: '',
    Material_Reconciled: '',
    Balance_Material_Returned_Date: '',
    COW_Number: '',
    COW_Submitted: '',
    COW_Approved: '',
    CPL_Number: '',
    CPL_Submitted: '',
    CPL_Approved: '',
    PAC_Invoice_Number: '',
    PAC_Invoice_Submitted: '',
    PAC_Invoice_Approved: '',
    FAC_Number: '',
    FAC_Submitted: '',
    FAC_Approved: '',
    PO_Status: '',
    PO_Closed_Date: '',
    Capitalization_Status: '',
    Capitalized_Date: '',
    Finance_Remarks: '',
    currentUser: ''
  });

  const {
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
    currentUser
  } = newPost;

  const onInputChange = (e) => {
    console.log(e.target.value);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    // setNewPost({ ...newPost, [currentUser]: e.target.value });
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
          setCurrentUserName(`${jsonDecInfo.username} ${jsonDecInfo.lastName}`);
        }
      }
    }
  }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  const fetchProjectNames = async () => {
    const req = await axiosInstance.get('/vendorProjectsOverviewTableProjectsArray').then((res) => {
      setprojectNamesArray(res.data.AllvendorProjectsArrayToEditForms);
    });
  };

  const fetchSiteEngineerNames = async () => {
    const req = await axiosInstance.get('/siteEngineersNamesList').then((res) => {
      setSiteEngineerNamesList(res.data.siteEngineersNamesArray);
    });
  };

  const siteEngineerNamesArray = [];

  for (let i = 0; i < siteEngineerNamesList.length; i += 1) {
    siteEngineerNamesArray[i] = {
      value: siteEngineerNamesList[i],
      label: siteEngineerNamesList[i]
    };
  }
  const siteEngineerNames = siteEngineerNamesArray;
  // ----------------------------------------------------------------------------------------------------------
  const fetchScope = async () => {
    const req = await axiosInstance.get('/Scope').then((res) => {
      setScopes(res.data.ScopeArrayForSelectMenus);
    });
  };

  const fetchSubCon = async () => {
    const req = await axiosInstance.get('/Sub_Contractor').then((res) => {
      setSub_Contractors(res.data.Sub_ContractorArrayForSelectMenus);
    });
  };

  const fetchNewRat = async () => {
    const req = await axiosInstance.get('/New_RAT').then((res) => {
      setRATs(res.data.New_RATArrayForSelectMenus);
    });
  };

  useEffect(() => {
    fetchScope();
    fetchNewRat();
    fetchSubCon();
    fetchProjectNames();
    fetchSiteEngineerNames();
    loadPost();
  }, []);

  const loadPost = async () => {
    const result = await axiosInstance.get(`/vendorProjectsDatabases/${id}`);
    setNewPost(result.data.post);
    // console.log(result.data.post);
  };

  const onSubmit = async (e) => {
    newPost.currentUser = CurrentUserName;
    e.preventDefault();
    await axiosInstance.put(`/DatabasesVendorProjects/Edit/${id}`, newPost);
    setAlert2(true);
    setAlertContent2('Projet details Updated Successfully !');
    setTimeout(() => {
      setAlert2(false);
    }, 6000);
    setTimeout(() => {
      navigate('/dashboard/DatabasesVendorProjectsAll/PendingTasks/Handover', { replace: true });
    }, 1000);
  };

  const dataSchema = Yup.object().shape({
    // Project_ID: Yup.string().required('* required'),
  });

  const formik = useFormik({
    initialValues: {
      Project_ID: '',
      Site_ID: '',
      Site_Name: '',
      TSS_PO_number: '',
      TSS_HO: '',
      PI_Number: ''
    },
    validationSchema: dataSchema
  });

  const { handleSubmit } = formik;

  // Assigning arrays from DB to the select menu options array of the forms input
  const Projects = projectNamesArray;
  const Site_Engineers = siteEngineerNames;

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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Accordion sx={{ backgroundColor: '#041426' }} expanded="true">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Handover Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  Planning_ID ---------------------------------
                InputLabelProps={{ shrink: true }}
                name="Planning_ID"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Planning_ID}
                fullWidth
                type="text"
                label="Planning ID"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
              />
              <TextField // -----------------------------------------------------------  Implemented by--------------------------------
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="Implementation_By"
                onChange={(e) => onInputChange(e)}
                id="outlined-select-currency"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Implemented By"
                size="small"
                value={Implementation_By}
              >
                {Implementation_ByVendor.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Implementation_ByVendor === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Project----------------------------------------
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="Project_ID"
                onChange={(e) => onInputChange(e)}
                id="outlined-select-currency"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Project Name"
                size="small"
                value={Project}
              >
                {Projects.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Projects === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Site ID-----------------------------------------
                InputLabelProps={{ shrink: true }}
                name="Site_ID"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Site_ID}
                fullWidth
                type="text"
                label="Site ID"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------  Site Name---------------------------
                InputLabelProps={{ shrink: true }}
                name="Site_Name"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Site_Name}
                fullWidth
                type="text"
                label="Site Name"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- HO Date--------------------------
                size="small"
                value={HO_Date}
                InputLabelProps={{ shrink: true }}
                name="Project_ID"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Handover Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ HO_Modification------------------------------
                InputLabelProps={{ shrink: true }}
                name="HO_Modification"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="HO Modification"
                size="small"
                value={HO_Modification}
              >
                {HandoverModification.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={HandoverModification === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- HO_Modified_Date -------------------------
                size="small"
                value={HO_Modified_Date}
                InputLabelProps={{ shrink: true }}
                name="HO_Modified_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="HO Modified Date"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword3} edge="end">
                        <Icon icon={showCheckMark3 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Scope-------------------------
                InputLabelProps={{ shrink: true }}
                name="Scope"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Scope"
                size="small"
                value={Scope}
              >
                {Scopes.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Scopes === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------ New RAT------------------------------
                InputLabelProps={{ shrink: true }}
                name="New_RAT"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="New RAT"
                size="small"
                value={New_RAT}
              >
                {RATs.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={RATs === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  New_Sector ---------------------------
                InputLabelProps={{ shrink: true }}
                name="New_Sector"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_Sector}
                fullWidth
                type="text"
                label="New Sector"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -------------------------------------------------------------------  Approval_Status-------------------------
                InputLabelProps={{ shrink: true }}
                name="Approval_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Approval Status"
                size="small"
                value={Approval_Status}
              >
                {ApprovalStatus.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={ApprovalStatus === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Approval_Ref-------------------------
                InputLabelProps={{ shrink: true }}
                name="Approval_Ref"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Approval_Ref}
                fullWidth
                type="text"
                label="Approval Ref"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  IMP_Scenario------------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_Scenario"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={IMP_Scenario}
                fullWidth
                type="text"
                label="IMP Scenario"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  blank1 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="blank1"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={blank1}
                fullWidth
                type="text"
                label="blank1"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  blank2 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="blank2"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={blank2}
                fullWidth
                type="text"
                label="blank2"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ blank3-------------------------
                InputLabelProps={{ shrink: true }}
                name="blank3"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={blank3}
                fullWidth
                type="text"
                label="blank3"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Tilt------------------------------
                InputLabelProps={{ shrink: true }}
                name="Tilt"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Tilt}
                fullWidth
                type="text"
                label="Tilt"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Azimuth ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Azimuth"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Azimuth}
                fullWidth
                type="text"
                label="Azimuth"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Antenna_Height ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Antenna_Height"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Antenna_Height}
                fullWidth
                type="text"
                label="Antenna Height"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ New_RRU_Type-------------------------
                InputLabelProps={{ shrink: true }}
                name="New_RRU_Type"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_RRU_Type}
                fullWidth
                type="text"
                label="New RRU Type"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  RRU_From------------------------------
                InputLabelProps={{ shrink: true }}
                name="RRU_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={RRU_From}
                fullWidth
                type="text"
                label="RRU From"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  New_BTS_Type ---------------------------
                InputLabelProps={{ shrink: true }}
                name="New_BTS_Type"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_BTS_Type}
                fullWidth
                type="text"
                label="New BTS Type"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  BTS_From ---------------------------
                InputLabelProps={{ shrink: true }}
                name="BTS_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={BTS_From}
                fullWidth
                type="text"
                label="BTS From"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ New_Antenna_Type-------------------------
                InputLabelProps={{ shrink: true }}
                name="New_Antenna_Type"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={New_Antenna_Type}
                fullWidth
                type="text"
                label="New Antenna Type"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Antenna_From------------------------------
                InputLabelProps={{ shrink: true }}
                name="Antenna_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Antenna_From}
                fullWidth
                type="text"
                label="Antenna From"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Cards_Type_n_From ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Cards_Type_n_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Cards_Type_n_From}
                fullWidth
                type="text"
                label="Cards Type and From"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Battery_count_n_From ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Battery_count_n_From"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Battery_count_n_From}
                fullWidth
                type="text"
                label="Battery count and From"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Mobitel_Region-------------------------
                InputLabelProps={{ shrink: true }}
                name="Mobitel_Region"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Mobitel_Region}
                fullWidth
                type="text"
                label="Mobitel Region"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Planning_Engineer------------------------------
                InputLabelProps={{ shrink: true }}
                name="Planning_Engineer"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Planning_Engineer}
                fullWidth
                type="text"
                label="Planning Engineer"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  On_Air_Target ---------------------------
                size="small"
                value={On_Air_Target}
                InputLabelProps={{ shrink: true }}
                name="On_Air_Target"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="On Air Target"
                InputProps={{
                  style: { color: 'gray' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword1} edge="end">
                        <Icon icon={showCheckMark1 ? CheckMark : Clear} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField // ------------------------------------------------------------------  Planning_Comments ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Planning_Comments"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Planning_Comments}
                fullWidth
                type="text"
                label="Planning Comments"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Work Allocation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Site Engineers--------------------
                InputLabelProps={{ shrink: true }}
                name="Site_Engineer"
                onChange={(e) => onInputChange(e)}
                id="outlined-select"
                select
                sx={{ width: 250 }}
                inputProps={{ style: { color: 'gray' } }}
                label="Site Engineer"
                size="small"
                value={Site_Engineer}
              >
                {Site_Engineers.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Site_Engineers === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- Assigned_Date-------------------
                size="small"
                fullWidth
                sx={{ width: 250 }}
                value={Assigned_Date}
                InputLabelProps={{ shrink: true }}
                name="Assigned_Date"
                onChange={(e) => onInputChange(e)}
                type="Date"
                label="Assigned Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Special_Tag-------------------
                InputLabelProps={{ shrink: true }}
                name="Special_Tag"
                onChange={(e) => onInputChange(e)}
                id="outlined-select"
                select
                sx={{ width: 250 }}
                inputProps={{ style: { color: 'gray' } }}
                label="Special Tag"
                size="small"
                value={Special_Tag}
              >
                {SpecialTag.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={SpecialTag === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  Coordinator_Comments---------------------------
                InputLabelProps={{ shrink: true }}
                name="Coordinator_Comments"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Coordinator_Comments}
                sx={{ width: 250 }}
                type="text"
                label="Coordinator Comments"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Team Allocation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Sub Contractors--------------------
                InputLabelProps={{ shrink: true }}
                name="Sub_Contractor"
                onChange={(e) => onInputChange(e)}
                id="outlined-select"
                select
                fullWidth
                inputProps={{ style: { color: 'gray' } }}
                label="Sub Contractor"
                size="small"
                value={Sub_Contractor}
              >
                {Sub_Contractors.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Sub_Contractors === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  Sub_Contractor_Remarks---------------------------
                InputLabelProps={{ shrink: true }}
                name="Sub_Contractor_Remarks"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Sub_Contractor_Remarks}
                fullWidth
                type="text"
                label="Sub Contractor Remarks"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Dependencies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Site Status--------------------
                InputLabelProps={{ shrink: true }}
                name="Site_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Site Status"
                size="small"
                value={Site_Status}
              >
                {Site_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Site_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------ Dependency --------------------
                InputLabelProps={{ shrink: true }}
                name="Dependency"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Dependency"
                size="small"
                value={Dependency}
              >
                {Dependencies.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Dependencies === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  Responsible--------------------
                InputLabelProps={{ shrink: true }}
                name="Responsible"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Responsible"
                size="small"
                value={Responsible}
              >
                {Responsibles.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Responsibles === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Dependencies_On_Air_Target -----------------------------------------
                size="small"
                value={Dependencies_On_Air_Target}
                InputLabelProps={{ shrink: true }}
                name="Dependencies_On_Air_Target"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Dependencies On Air Target"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- Civil PAT Date-------------------
                size="small"
                value={Civil_PAT_Date}
                InputLabelProps={{ shrink: true }}
                name="Civil_PAT_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Civil PAT Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- SAQ Clearance Date-----------------
                size="small"
                value={SAQ_Clearance_Date}
                InputLabelProps={{ shrink: true }}
                name="SAQ_Clearance_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="SAQ Clearance Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ TSSR_Referance------------------------------
                InputLabelProps={{ shrink: true }}
                name="TSSR_Referance"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={TSSR_Referance}
                fullWidth
                type="text"
                label="TSSR Reference"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
              />
              <TextField // ------------------------------------------------------------------- TSSR_Submitted_Date -------------------------
                size="small"
                value={TSSR_Submitted_Date}
                InputLabelProps={{ shrink: true }}
                name="TSSR_Submitted_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="TSSR Submitted Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- TSSR_Approved_Date -------------------------
                size="small"
                value={TSSR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                name="TSSR_Approved_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="TSSR Approved Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Supply_BOQ_Submitted -------------------------
                size="small"
                value={Supply_BOQ_Submitted}
                InputLabelProps={{ shrink: true }}
                name="Supply_BOQ_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply BOQ Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Supply_BOQ_Approved -------------------------
                size="small"
                value={Supply_BOQ_Approved}
                InputLabelProps={{ shrink: true }}
                name="Supply_BOQ_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply BOQ Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Approval_Received_Date -------------------------
                size="small"
                value={Approval_Received_Date}
                InputLabelProps={{ shrink: true }}
                name="Approval_Received_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Approval Received Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- MCW_Requested_Date -------------------------
                size="small"
                value={MCW_Requested_Date}
                InputLabelProps={{ shrink: true }}
                name="MCW_Requested_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="MCW Requested Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- MCW_Completed_Date -------------------------
                size="small"
                value={MCW_Completed_Date}
                InputLabelProps={{ shrink: true }}
                name="MCW_Completed_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="MCW Completed Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">PR/PO Progress</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  Supply_PR_Submitted ---------------------------------
                size="small"
                value={Supply_PR_Submitted}
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PR Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  Supply_PR_Status --------------------------------
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Status"
                onChange={(e) => onInputChange(e)}
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Supply PR Status"
                size="small"
                value={Supply_PR_Status}
              >
                {SupplyPRStatus.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={SupplyPRStatus === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Supply_PR_Approved_Date ---------------------------------
                size="small"
                value={Supply_PR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Approved_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PR Approved Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Supply_PR_Number------------------------
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Supply_PR_Number}
                fullWidth
                type="text"
                label="Supply PR Number"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  Supply_PR_Raise ---------------------------------
                size="small"
                value={Supply_PR_Raise}
                InputLabelProps={{ shrink: true }}
                name="Supply_PR_Raise"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PR Raised"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Supply_PO_Number------------------------
                InputLabelProps={{ shrink: true }}
                name="Supply_PO_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Supply_PO_Number}
                fullWidth
                type="text"
                label="Supply PO Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  Supply_PO_Issued ---------------------------------
                size="small"
                value={Supply_PO_Issued}
                InputLabelProps={{ shrink: true }}
                name="Supply_PO_Issued"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Supply PO Issued"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- IMP_PR_Submitted -------------------------
                size="small"
                value={IMP_PR_Submitted}
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="IMP PR Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- IMP_PR_Approved_Date -------------------------
                size="small"
                value={IMP_PR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Approved_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="IMP PR Approved Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ IMP_PR_Number------------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={IMP_PR_Number}
                fullWidth
                type="text"
                label="IMP PR Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- IMP_PR_Raised -------------------------
                size="small"
                value={IMP_PR_Raised}
                InputLabelProps={{ shrink: true }}
                name="IMP_PR_Raised"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="IMP PR Raised"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -------------------------------------------------------------------  IMP_PO_Number-------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_PO_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={IMP_PO_Number}
                fullWidth
                type="text"
                label="IMP PO Number"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -------------------------------------------------------------------  IMP_PO_Issued -------------------------
                InputLabelProps={{ shrink: true }}
                name="IMP_PO_Issued"
                onChange={(e) => onInputChange(e)}
                size="small"
                type="Date"
                value={IMP_PO_Issued}
                fullWidth
                label="IMP PO Issued"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  AWR_1------------------------------
                InputLabelProps={{ shrink: true }}
                name="AWR_1"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={AWR_1}
                fullWidth
                type="text"
                label="AWR 1"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  AWR_2 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="AWR_2"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={AWR_2}
                fullWidth
                type="text"
                label="AWR 2"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  AWR_3 ---------------------------
                InputLabelProps={{ shrink: true }}
                name="AWR_3"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={AWR_3}
                fullWidth
                type="text"
                label="AWR 3"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Logistics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  PI_Number ---------------------------------
                size="small"
                value={PI_Number}
                InputLabelProps={{ shrink: true }}
                name="PI_Number"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="text"
                label="PI Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  PI_Submitted --------------------------------
                size="small"
                value={PI_Submitted}
                InputLabelProps={{ shrink: true }}
                name="PI_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="date"
                label="PI Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  PI_Approved_ENG ---------------------------------
                size="small"
                value={PI_Approved_ENG}
                InputLabelProps={{ shrink: true }}
                name="PI_Approved_ENG"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="PI Approved ENG"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- TRC_Approved------------------------
                InputLabelProps={{ shrink: true }}
                name="TRC_Approved"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={TRC_Approved}
                fullWidth
                type="date"
                label="TRC Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // --------------------------------------------------------------------  BOI_Approved ---------------------------------
                size="small"
                value={BOI_Approved}
                InputLabelProps={{ shrink: true }}
                name="BOI_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="BOI Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  ICL_Approved ---------------------------------
                size="small"
                value={ICL_Approved}
                InputLabelProps={{ shrink: true }}
                name="ICL_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="ICL Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  Payment_Method ---------------------------------
                size="small"
                value={Payment_Method}
                InputLabelProps={{ shrink: true }}
                name="Payment_Method"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="text"
                label="Payment Method"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Payment_Confirmed -------------------------
                size="small"
                value={Payment_Confirmed}
                InputLabelProps={{ shrink: true }}
                name="Payment_Confirmed"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Payment Confirmed"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- ETA -------------------------
                size="small"
                value={ETA}
                InputLabelProps={{ shrink: true }}
                name="ETA"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="ETA"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ Received_To_Port------------------------------
                InputLabelProps={{ shrink: true }}
                name="Received_To_Port"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Received_To_Port}
                fullWidth
                type="date"
                label="Received To Port"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- Port_Clearance -------------------------
                size="small"
                value={Port_Clearance}
                InputLabelProps={{ shrink: true }}
                name="Port_Clearance"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Port Clearance"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -------------------------------------------------------------------  Logistics_Remarks-------------------------
                InputLabelProps={{ shrink: true }}
                name="Logistics_Remarks"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Logistics_Remarks}
                fullWidth
                type="text"
                label="Logistics Remarks"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Implementation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Mobilization Status --------------------
                InputLabelProps={{ shrink: true }}
                name="Mobilization_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Mobilization Status"
                size="small"
                value={Mobilization_Status}
              >
                {Mobilization_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Mobilization_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- Mobilized Date --------------------------
                size="small"
                value={Mobilized_Date}
                InputLabelProps={{ shrink: true }}
                name="Mobilized_Date"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="Mobilized Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ Installation Status--------------------
                InputLabelProps={{ shrink: true }}
                name="Installation_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Installation Status"
                size="small"
                value={Installation_Status}
              >
                {Installation_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Installation_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ Installation Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Installation_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Installation_Date}
                fullWidth
                type="date"
                label="Installation Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ Power Connected Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Power_Connected_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Power_Connected_Date}
                fullWidth
                type="date"
                label="Power Connected Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------ TX Connected Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="TX_Connected_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={TX_Connected_Date}
                fullWidth
                type="date"
                label="TX Connected Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ Commisioning Status--------------------
                InputLabelProps={{ shrink: true }}
                name="Commissioning_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Commisioning Status"
                size="small"
                value={Commissioning_Status}
              >
                {Commissioning_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={Commissioning_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ Commisioning Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Commisioned_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Commisioned_Date}
                fullWidth
                type="date"
                label="Commisioning Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Acceptance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ SAR_Reference --------------------------
                InputLabelProps={{ shrink: true }}
                name="SAR_Reference"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={SAR_Reference}
                fullWidth
                type="text"
                label="SAR Reference"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ SAR Status--------------------
                InputLabelProps={{ shrink: true }}
                name="SAR_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="SAR Status"
                size="small"
                value={SAR_Status}
              >
                {SAR_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={SAR_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ SAR Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="SAR_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={SAR_Date}
                fullWidth
                type="date"
                label="SAR Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------ PAT_Reference --------------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Reference"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PAT_Reference}
                fullWidth
                type="text"
                label="PAT Reference"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ PAT Status--------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="PAT Status"
                size="small"
                value={PAT_Status}
              >
                {PAT_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={PAT_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ PAT_Submitted --------------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Submitted"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PAT_Submitted}
                fullWidth
                type="date"
                label="PAT Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------  PAT_Pass_Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="PAT_Pass_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PAT_Pass_Date}
                fullWidth
                type="date"
                label="PAT Pass Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------ Check List Submitted Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Check_List_Submitted"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Check_List_Submitted}
                fullWidth
                type="date"
                label="Check List Submitted Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ Check List Verified Date--------------------------
                InputLabelProps={{ shrink: true }}
                name="Check_List_Verified"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Check_List_Verified}
                fullWidth
                type="date"
                label="Check List Verified Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  On Air Status--------------------
                InputLabelProps={{ shrink: true }}
                name="On_Air_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="On Air Status"
                size="small"
                value={On_Air_Status}
              >
                {On_Air_Statuses.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={On_Air_Statuses === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  On Air Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="On_Air_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={On_Air_Date}
                fullWidth
                type="date"
                label="On Air Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------  Material_Reconciled --------------------------
                InputLabelProps={{ shrink: true }}
                name="Material_Reconciled"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Material_Reconciled}
                fullWidth
                type="date"
                label="Material Reconciled"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------  Balance_Material_Returned_Date --------------------------
                InputLabelProps={{ shrink: true }}
                name="Balance_Material_Returned_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Balance_Material_Returned_Date}
                fullWidth
                type="date"
                label="Balance Material Returned Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        {/* <Accordion sx={{ backgroundColor: '#041426' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Payment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  COW_Number ---------------------------------
                InputLabelProps={{ shrink: true }}
                name="COW_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={COW_Number}
                fullWidth
                type="text"
                label="COW Number"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
              />
              <TextField // -----------------------------------------------------------  COW_Submitted --------------------------------
                size="small"
                value={COW_Submitted}
                InputLabelProps={{ shrink: true }}
                name="COW_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="COW Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  COW_Approved----------------------------------------
                size="small"
                value={COW_Approved}
                InputLabelProps={{ shrink: true }}
                name="COW_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="COW Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -----------------------------------------------------------  CPL_Number-----------------------------------------
                InputLabelProps={{ shrink: true }}
                name="CPL_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={CPL_Number}
                fullWidth
                type="text"
                label="CPL Number"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ CPL_Submitted---------------------------
                InputLabelProps={{ shrink: true }}
                name="CPL_Submitted"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={CPL_Submitted}
                fullWidth
                type="date"
                label="CPL Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ---------------------------------------------------------------- CPL_Approved--------------------------
                size="small"
                value={CPL_Approved}
                InputLabelProps={{ shrink: true }}
                name="CPL_Approved"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="CPL Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------ PAC_Invoice_Number------------------------------
                size="small"
                value={PAC_Invoice_Number}
                InputLabelProps={{ shrink: true }}
                name="PAC_Invoice_Number"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="text"
                label="PAC/Invoice Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------- PAC_Invoice_Submitted -------------------------
                size="small"
                value={PAC_Invoice_Submitted}
                InputLabelProps={{ shrink: true }}
                name="PAC_Invoice_Submitted"
                onChange={(e) => onInputChange(e)}
                fullWidth
                type="Date"
                label="PAC/Invoice Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ PAC_Invoice_Approved-------------------------
                InputLabelProps={{ shrink: true }}
                name="PAC_Invoice_Approved"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PAC_Invoice_Approved}
                fullWidth
                type="date"
                label="PAC/Invoice Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  FAC_Number------------------------------
                InputLabelProps={{ shrink: true }}
                name="FAC_Number"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={FAC_Number}
                fullWidth
                type="text"
                label="FAC Number"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  FAC_Submitted ---------------------------
                InputLabelProps={{ shrink: true }}
                name="FAC_Submitted"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={FAC_Submitted}
                fullWidth
                type="date"
                label="FAC Submitted"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // -------------------------------------------------------------------  FAC_Approved-------------------------
                InputLabelProps={{ shrink: true }}
                name="FAC_Approved"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={FAC_Approved}
                fullWidth
                type="date"
                label="FAC Approved"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ PO_Status-------------------------
                InputLabelProps={{ shrink: true }}
                name="PO_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                select
                inputProps={{ style: { color: 'gray' } }}
                label="PO Status"
                size="small"
                value={PO_Status}
              >
                {POStatus.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={POStatus === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  PO_Closed_Date------------------------------
                InputLabelProps={{ shrink: true }}
                name="PO_Closed_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={PO_Closed_Date}
                fullWidth
                type="date"
                label="PO Closed Date"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  Capitalization_Status ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Capitalization_Status"
                onChange={(e) => onInputChange(e)}
                fullWidth
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Capitalization Status"
                size="small"
                value={Capitalization_Status}
              >
                {CapitalizationStatus.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={CapitalizationStatus === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  Capitalized_Date ---------------------------
                InputLabelProps={{ shrink: true }}
                name="Capitalized_Date"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Capitalized_Date}
                fullWidth
                type="date"
                label="Capitalized Date"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------  Finance_Remarks-------------------------
                InputLabelProps={{ shrink: true }}
                name="Finance_Remarks"
                onChange={(e) => onInputChange(e)}
                size="small"
                value={Finance_Remarks}
                fullWidth
                type="text"
                label="Finance Remarks"
                inputProps={{ style: { color: 'gray' } }}
              />
              <TextField // ------------------------------------------------------------------  currentUser-------------------------
                InputLabelProps={{ shrink: true }}
                disabled
                name="currentUser"
                onChange={handleChange}
                size="small"
                value={CurrentUserName}
                fullWidth
                type="text"
                label="Modified By"
                inputProps={{ style: { color: 'gray' } }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          {error && (
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
                    <span className="error-message">{error}</span>
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </Grid>
          )}
        </Stack>
        <Stack mb={3}>
          {alert2 ? (
            <Alert
              variant="filled"
              color="primary"
              autohideduration={5000}
              iconMapping={{
                success: <CheckCircleOutlineIcon fontSize="inherit" />
              }}
            >
              {alertContent2}
            </Alert>
          ) : (
            <></>
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          mb={1}
        >
          <Button fullWidth size="large" color="primary" variant="outlined">
            <Link
              underline="none"
              component={RouterLink}
              to="/dashboard/DatabasesVendorProjectsAll/PendingTasks/Handover"
            >
              Cancel
            </Link>
          </Button>
          <Button fullWidth size="large" variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
