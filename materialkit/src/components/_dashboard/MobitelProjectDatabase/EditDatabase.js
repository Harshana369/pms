import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Alert from '@mui/material/Alert';
import { Stack, TextField, Button, Grid, Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';

// -------------------------------------------------------------------------------------------------------------
/* eslint-disable camelcase */
const Implementation_ByVendor = [
  {
    value: 'ZTE',
    label: 'ZTE'
  },
  {
    value: 'Huawei',
    label: 'Huawei'
  },
  {
    value: 'Mobitel',
    label: 'Mobitel Direct'
  }
];

const Projects = [
  {
    value: 'ZTE BBE 2020',
    label: 'ZTE BBE 2020'
  },
  {
    value: 'Huawei BBE 2020',
    label: 'Huawei BBE 2020'
  },
  {
    value: 'Other Project',
    label: 'Other Project'
  },
  {
    value: 'Covid P3',
    label: 'Covid P3'
  },
  {
    value: 'ZTE L850 P3',
    label: 'ZTE L850 P3'
  },
  {
    value: 'Huawei L850 P3',
    label: 'Huawei L850 P3'
  },
  {
    value: 'Huawei IBBE P1',
    label: 'Huawei IBBE P1'
  },
  {
    value: 'Huawei IBBE P2',
    label: 'Huawei IBBE P2'
  },
  {
    value: 'ZTE IBBE P1',
    label: 'ZTE IBBE P1'
  },
  {
    value: 'ZTE IBBE P2',
    label: 'ZTE IBBE P2'
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
    value: 'Sector Installation TEMP',
    label: 'Sector Installation TEMP'
  },
  {
    value: 'Site Installation TEMP',
    label: 'Site Installation TEMP'
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
    value: 'DBUL850',
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
    value: '18UL',
    label: '18UL'
  },
  {
    value: 'NA',
    label: 'NA'
  }
];

const Site_Engineers = [
  {
    value: 'Yomal',
    label: 'Yomal'
  },
  {
    value: 'Suranga',
    label: 'Suranga'
  },
  {
    value: 'Shehan',
    label: 'Shehan'
  },
  {
    value: 'Dumindu',
    label: 'Dumindu'
  },
  {
    value: 'Imran',
    label: 'Imran'
  },
  {
    value: 'Amilanath',
    label: 'Amilanath'
  },
  {
    value: 'Indika',
    label: 'Indika'
  },
  {
    value: 'Himantha',
    label: 'Himantha'
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
    value: 'Installation Hold',
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

export default function EditDatabase() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alertContent1, setAlertContent1] = useState('');
  const [alertContent2, setAlertContent2] = useState('');
  const [value, setValue] = react.useState(new Date());
  const [open1, setOpen1] = react.useState(false);
  const [error, setError] = useState('');

  const { id } = useParams();
  const [checkBox, setCheckBox] = useState('False');
  const [newPost, setNewPost] = useState({
    Project_ID: '',
    Implementation_By: '',
    Project: '',
    Scope: '',
    HO_Date: '',
    Site_ID: '',
    Site_Name: '',
    New_RAT: '',
    Site_Engineer: '',
    Sub_Contractor: '',
    Site_Status: '',
    Responsible: '',
    Civil_PAT_Date: '',
    SAQ_Clearance_Date: '',
    Approval_Received_Date: '',
    MCW_Requested_Date: '',
    MCW_Completed_Date: '',
    Mobilization_Status: '',
    Mobilized_Date: '',
    Installation_Status: '',
    Installation_Date: '',
    Power_Connected_Date: '',
    TX_Connected_Date: '',
    Commissioning_Status: '',
    Commisioned_Date: '',
    SAR_Status: '',
    SAR_Date: '',
    PAT_Status: '',
    PAT_Pass_Date: '',
    Check_List_Submitted: '',
    Check_List_Verified: '',
    On_Air_Target: '',
    On_Air_Status: '',
    On_Air_Date: '',
    PR_Submitted_for_TSS: '',
    PR_Raised_for_TSS: '',
    PR_Number_for_TSS: '',
    TSS_PO_number: '',
    PO_Issued_for_TSS: '',
    TSS_HO: '',
    TSSR_Submitted: '',
    TSSR_Approved: '',
    BOQ_Submitted: '',
    Imp_HO: '',
    PR_Submission_for_Imp: '',
    PR_Number_for_Imp: '',
    PR_Raised_for_Imp: '',
    PO_Issued_for_Imp: '',
    PR_Sub_for_supply: '',
    PR_Number_for_supply: '',
    PR_Raised_for_supply: '',
    PO_Issued_for_supply: '',
    PI_Submitted: '',
    PI_Number: '',
    PI_Approved: '',
    TRC_Completed: '',
    BOI_Completed: '',
    ICL_Completed: '',
    LC_Issued: '',
    Shipped: '',
    Received_at_port: '',
    Delivered_to_WH: '',
    Reconciled: '',
    COW_Submitted: '',
    COW_Approved: '',
    Supply_HW_PAC_Submitted: '',
    Supply_HW_PAC_Approved: '',
    Imp_PAC_Submitted: '',
    Imp_PAC_Approved: '',
    Supply_SW_PAC_Submitted: '',
    Supply_SW_PAC_Approved: '',
    Capitalization_Supply_HW: '',
    Capitalization_Imp: '',
    Capitalization_Supply_SW: ''
  });

  const {
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
  } = newPost;

  const onInputChange = (e) => {
    console.log(e.target.value);
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const result = await axiosInstance.get(`/mobitelProjectsDatabases/${id}`);
    setNewPost(result.data.post);
    // console.log(result.data.post);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/DatabasesMobitelProjects/Edit/${id}`, newPost);
    setAlertContent2('Details Updated Successfully!');
    setAlert2(true);
    console.log(newPost);
    navigate('/dashboard/DatabasesMobitelProjects', { replace: true });
  };

  const formik = useFormik({
    initialValues: {
      Project: '',
      Site: '',
      Site_: '',
      TSS_PO: '',
      TSS: '',
      PI: ''
    }
  });

  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <Stack mb={3}>
      <Stack mb={3}>
        {alert1 ? (
          <Alert fullwidth size="small" variant="outlined" severity="success">
            {alertContent1}
          </Alert>
        ) : (
          <></>
        )}
      </Stack>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Stack spacing={2} direction="row" mb={3}>
            <Typography variant="subtitle9" gutterBottom>
              Implementation
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row" mb={3}>
            <TextField // ------------------------------------------------------------ Project ID---------------------------------
              InputLabelProps={{ shrink: true }}
              id="Project_ID"
              disabled
              size="small"
              required="required"
              fullWidth
              type="Text"
              label="Project ID"
              inputProps={{ style: { color: 'gray' } }}
              value={Project_ID}
              name="Project_ID"
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------- Implemented by--------------------------------
              fullWidth
              InputLabelProps={{ shrink: true }}
              id="outlined-select-currency"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Implemented By"
              size="small"
              name="Implementation_By"
              value={Implementation_By}
              onChange={(e) => onInputChange(e)}
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
            <TextField // ---------------------------------------------------------------- Project---------------------------
              fullWidth
              InputLabelProps={{ shrink: true }}
              id="outlined-select-currency"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Project Name"
              size="small"
              name="Project"
              value={Project}
              onChange={(e) => onInputChange(e)}
            >
              {Projects.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  selected={Project === option.value ? 'selected' : ''}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------------ Scope-------------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Scope"
              size="small"
              name="Scope"
              value={Scope}
              onChange={(e) => onInputChange(e)}
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
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <TextField // ------------------------------------------------------------------- HO Date--------------------------
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="Handover Date"
              inputProps={{ style: { color: 'gray' } }}
              name="HO_Date"
              value={HO_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------- Site ID------------------------
              InputLabelProps={{ shrink: true }}
              required="required"
              size="small"
              fullWidth
              type="text"
              label="Site ID"
              inputProps={{ style: { color: 'gray' } }}
              name="Site_ID"
              value={Site_ID}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------- Site Name---------------------------
              InputLabelProps={{ shrink: true }}
              required="required"
              size="small"
              fullWidth
              type="text"
              label="Site Name"
              inputProps={{ style: { color: 'gray' } }}
              name="Site_Name"
              value={Site_Name}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------ New RAT------------------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="New RAT"
              size="small"
              name="New_RAT"
              value={New_RAT}
              onChange={(e) => onInputChange(e)}
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
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mb={8}>
            <TextField // ------------------------------------------------------------------ Site Engineers--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Site Engineer"
              size="small"
              name="Site_Engineer"
              value={Site_Engineer}
              onChange={(e) => onInputChange(e)}
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
            <TextField // ------------------------------------------------------------------ Sub Contractors--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Sub Contractor"
              size="small"
              name="Sub_Contractor"
              value={Sub_Contractor}
              onChange={(e) => onInputChange(e)}
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
            <TextField // ------------------------------------------------------------------ Site Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Site Status"
              size="small"
              name="Site_Status"
              value={Site_Status}
              onChange={(e) => {
                onInputChange(e);
                // onInputChangeSite_Status(e);
              }}
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
            <TextField // ------------------------------------------------------------------ Responsible--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Responsible"
              size="small"
              name="Responsible"
              value={Responsible}
              onChange={(e) => onInputChange(e)}
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
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <TextField // ------------------------------------------------------------------- Civil PAT Date-----------------
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="Civil PAT Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Civil_PAT_Date"
              value={Civil_PAT_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------- SAQ Clearance Date-----------------
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="SAQ Clearance Date"
              inputProps={{ style: { color: 'gray' } }}
              name="SAQ_Clearance_Date"
              value={SAQ_Clearance_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------- Approval Received Date-----------------
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              autoComplete="Date"
              type="Date"
              label="Approval Received Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Approval_Received_Date"
              value={Approval_Received_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------- MCW Requested Date-----------------
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="MCW Requested Date"
              inputProps={{ style: { color: 'gray' } }}
              name="MCW_Requested_Date"
              value={MCW_Requested_Date}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={8}>
            <TextField // ------------------------------------------------------------------- MCW Completed Date-----------------
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="MCW Completed Date"
              inputProps={{ style: { color: 'gray' } }}
              name="MCW_Completed_Date"
              value={MCW_Completed_Date}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={3}>
            <TextField // ------------------------------------------------------------------ Mobilization Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Mobilization Status"
              size="small"
              name="Mobilization_Status"
              value={Mobilization_Status}
              onChange={(e) => onInputChange(e)}
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
            <TextField // ------------------------------------------------------------------- Mobilized Date--------------------------
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="Mobilized Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Mobilized_Date"
              value={Mobilized_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------ Installation Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Installation Status"
              size="small"
              name="Installation_Status"
              value={Installation_Status}
              onChange={(e) => onInputChange(e)}
            >
              {Installation_Statuses.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  selected={Installation_Status === option.value ? 'selected' : ''}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------ Installation Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="Installation Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Installation_Date"
              value={Installation_Date}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={8}>
            <TextField // ------------------------------------------------------------ Power Connected Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="Power Connected Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Power_Connected_Date"
              value={Power_Connected_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------ TX Connected Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="TX Connected Date"
              inputProps={{ style: { color: 'gray' } }}
              name="TX_Connected_Date"
              value={TX_Connected_Date}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={3}>
            <TextField // ------------------------------------------------------------------ Commisioning Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Commisioning Status"
              size="small"
              name="Commissioning_Status"
              value={Commissioning_Status}
              onChange={(e) => onInputChange(e)}
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
              size="small"
              fullWidth
              type="date"
              label="Commisioned Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Commisioned_Date"
              value={Commisioned_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------ SAR Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="SAR Status"
              size="small"
              name="SAR_Status"
              value={SAR_Status}
              onChange={(e) => onInputChange(e)}
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
              size="small"
              fullWidth
              type="date"
              label="SAR Date"
              inputProps={{ style: { color: 'gray' } }}
              name="SAR_Date"
              value={SAR_Date}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={3}>
            <TextField // ------------------------------------------------------------------ PAT Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="PAT Status"
              size="small"
              name="PAT_Status"
              value={PAT_Status}
              onChange={(e) => onInputChange(e)}
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
            <TextField // ------------------------------------------------------------ PAT Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="PAT Pass Date"
              inputProps={{ style: { color: 'gray' } }}
              name="PAT_Pass_Date"
              value={PAT_Pass_Date}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------ Check List Submitted Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="Check List Submitted Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Check_List_Submitted"
              value={Check_List_Submitted}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------ Check List Verified Date--------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="Check List Verified Date"
              inputProps={{ style: { color: 'gray' } }}
              name="Check_List_Verified"
              value={Check_List_Verified}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={8}>
            <TextField // ------------------------------------------------------------ On Air Target --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="On Air Target"
              inputProps={{ style: { color: 'gray' } }}
              name="On_Air_Date"
              value={On_Air_Target}
              onChange={(e) => onInputChange(e)}
            />
            <TextField // ------------------------------------------------------------------ On Air Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="On Air Status"
              size="small"
              name="On_Air_Status"
              value={On_Air_Status}
              onChange={(e) => onInputChange(e)}
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
            <TextField // ------------------------------------------------------------ On Air Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              label="On Air Date"
              inputProps={{ style: { color: 'gray' } }}
              name="On_Air_Date"
              value={On_Air_Date}
              onChange={(e) => onInputChange(e)}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={3}>
            <Box sx={{ width: '100%' }}>
              <Collapse in={open1}>
                <Stack spacing={2} direction="row" mb={3}>
                  <Typography variant="subtitle9" gutterBottom>
                    Finance
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ PR Submitted for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label=" PR Submitted for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Submitted_for_TSS"
                    value={PR_Submitted_for_TSS}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PR Raised for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label=" PR Submitted for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Raised_for_TSS"
                    value={PR_Raised_for_TSS}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PR Number for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="text"
                    label="PR Number for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Number_for_TSS"
                    value={PR_Number_for_TSS}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ TSS PO number --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="text"
                    label="TSS PO Number"
                    inputProps={{ style: { color: 'gray' } }}
                    name="TSS_PO_number"
                    value={TSS_PO_number}
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ PO Issued for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="PO Issued for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PO_Issued_for_TSS"
                    value={PO_Issued_for_TSS}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------------- TSS HO---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="text"
                    label="TSS HO"
                    inputProps={{ style: { color: 'gray' } }}
                    name="TSS_HO"
                    value={TSS_HO}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ TSSR Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="TSSR Submitted "
                    inputProps={{ style: { color: 'gray' } }}
                    name="TSSR_Submitted"
                    value={TSSR_Submitted}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ TSSR Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="TSSR Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    name="TSSR_Approved"
                    value={TSSR_Approved}
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ BOQ Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="BOQ Submitted "
                    inputProps={{ style: { color: 'gray' } }}
                    name="BOQ_Submitted"
                    value={BOQ_Submitted}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------------- Imp HO---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="Imp HO"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Imp_HO"
                    value={Imp_HO}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PR Submission for Imp--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="PR Submission for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Submission_for_Imp"
                    value={PR_Submission_for_Imp}
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PR Number for Imp --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="PR Number for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Number_for_Imp"
                    value={PR_Number_for_Imp}
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ PR Raised for Imp --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                    type="date"
                    label="PR Raised for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    value={PR_Raised_for_Imp}
                    name="PR_Raised_for_Imp"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------------- PO Issued for Imp---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PO_Issued_for_Imp}
                    fullWidth
                    type="date"
                    label="PO Issued for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PO_Issued_for_Imp"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PR Sub for supply--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Sub_for_supply}
                    fullWidth
                    type="date"
                    label="PR Sub for Supply"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Sub_for_supply"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PR Number for supply --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Number_for_supply}
                    fullWidth
                    type="date"
                    label="PR Number for Supply"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Number_for_supply"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={8}>
                  <TextField // ------------------------------------------------------------ PR Raised for Supply --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Raised_for_supply}
                    fullWidth
                    type="date"
                    label="PR Raised for Supply"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PR_Raised_for_supply"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------------- PO Issued for supply---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PO_Issued_for_supply}
                    fullWidth
                    type="date"
                    label="PO Issued for supply"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PO_Issued_for_supply"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <Typography variant="subtitle9" gutterBottom>
                    Logistics
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------------- PI Submitted--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PI_Submitted}
                    fullWidth
                    type="date"
                    label="PI Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PI_Submitted"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PI Number--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PI_Number}
                    fullWidth
                    type="text"
                    label="PI Number"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PI_Number"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ PI Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PI_Approved}
                    fullWidth
                    type="date"
                    label="PI Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    name="PI_Approved"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ TRC Completed --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={TRC_Completed}
                    fullWidth
                    type="date"
                    label="TRC Completed"
                    inputProps={{ style: { color: 'gray' } }}
                    name="TRC_Completed"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------------- BOI Completed--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={BOI_Completed}
                    fullWidth
                    type="date"
                    label="BOI Completed"
                    inputProps={{ style: { color: 'gray' } }}
                    name="BOI_Completed"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ ICL Completed--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={ICL_Completed}
                    fullWidth
                    type="date"
                    label="ICL Completed"
                    inputProps={{ style: { color: 'gray' } }}
                    name="ICL_Completed"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ LC Issued --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={LC_Issued}
                    fullWidth
                    type="date"
                    label="LC Issued"
                    inputProps={{ style: { color: 'gray' } }}
                    name="LC_Issued"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Shipped --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Shipped}
                    fullWidth
                    type="date"
                    label="Shipped"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Shipped"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={8}>
                  <TextField // ------------------------------------------------------------------- Received at port--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Received_at_port}
                    fullWidth
                    type="date"
                    label="Received at Port"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Received_at_port"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Delivered to WH--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Delivered_to_WH}
                    fullWidth
                    type="date"
                    label="Delivered to WH"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Delivered_to_WH"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <Typography variant="subtitle9" gutterBottom>
                    Capitalization
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------------- Reconciled--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Reconciled}
                    fullWidth
                    type="date"
                    label="Reconciled"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Reconciled"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ COW Submitted--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={COW_Submitted}
                    fullWidth
                    type="date"
                    label="COW Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    name="COW_Submitted"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ COW Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={COW_Approved}
                    fullWidth
                    type="date"
                    label="COW Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    name="COW_Approved"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Supply HW PAC Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Supply_HW_PAC_Submitted}
                    fullWidth
                    type="date"
                    label="Supply HW PAC Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Supply_HW_PAC_Submitted"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------------- Supply HW PAC Approved--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Supply_HW_PAC_Approved}
                    fullWidth
                    type="date"
                    label="Supply HW PAC Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Supply_HW_PAC_Approved"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Imp PAC Submitted--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Imp_PAC_Submitted}
                    fullWidth
                    type="date"
                    label="Imp PAC Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Imp_PAC_Submitted"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Imp PAC Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Imp_PAC_Approved}
                    fullWidth
                    type="date"
                    label="Imp PAC Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Imp_PAC_Approved"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Supply SW PAC Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Supply_SW_PAC_Submitted}
                    fullWidth
                    type="date"
                    label="Supply SW PAC Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Supply_SW_PAC_Submitted"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------------- Supply SW PAC Approved--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Supply_SW_PAC_Approved}
                    fullWidth
                    type="date"
                    label="Supply SW PAC Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Supply_SW_PAC_Approved"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Capitalization Supply HW--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Capitalization_Supply_HW}
                    fullWidth
                    type="date"
                    label="Capitalization Supply HW"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Capitalization_Supply_HW"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Capitalization Imp --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Capitalization_Imp}
                    fullWidth
                    type="date"
                    label="Capitalization Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Capitalization_Imp"
                    onChange={(e) => onInputChange(e)}
                  />
                  <TextField // ------------------------------------------------------------ Capitalization Supply SW --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Capitalization_Supply_SW}
                    fullWidth
                    type="date"
                    label="Capitalization Supply SW"
                    inputProps={{ style: { color: 'gray' } }}
                    name="Capitalization_Supply_SW"
                    onChange={(e) => onInputChange(e)}
                  />
                </Stack>
              </Collapse>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                <Typography variant="h8" gutterBottom>
                  {error && <span className="error-message">{error}</span>}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                <Button
                  disabled={open1}
                  variant="text"
                  onClick={() => {
                    setOpen1(true);
                  }}
                >
                  View All
                </Button>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen1(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
          <Stack mb={1}>
            {alert2 ? (
              <Alert
                severity="success"
                variant="outlined"
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
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={onSubmit}
            loading={isSubmitting}
          >
            Update
          </Button>
        </Form>
      </FormikProvider>
    </Stack>
  );
}
