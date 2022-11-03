import react, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../../../App.css';
// material
import Alert from '@mui/material/Alert';
import { Stack, TextField, Button, Box, Typography, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
// import { dataSitesSchema } from './FormValidation';

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

export default function Testdataforms() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();

  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [siteEngineerNamesList, setSiteEngineerNamesList] = useState([]);

  const [Project_ID, seProjectID] = useState('');
  const [Implementation_By, setImplementation_By] = useState('');
  const [Project, setProject] = useState('');
  const [Scope, setScope] = useState('');
  const [HO_Date, setHO_Date] = useState('');
  const [Site_ID, setSite_ID] = useState('');
  const [Site_Name, setSite_Name] = useState('');
  const [New_RAT, setNew_RAT] = useState('');
  const [Site_Engineer, setSite_Engineers] = useState('');
  const [Sub_Contractor, setSub_Contractor] = useState('');
  const [Site_Status, setSite_Status] = useState('');
  const [Responsible, setResponsible] = useState('');
  const [Civil_PAT_Date, setCivil_PAT_Date] = useState('');
  const [SAQ_Clearance_Date, setSAQ_Clearance_Date] = useState('');
  const [Approval_Received_Date, setApproval_Received_Date] = useState('');
  const [MCW_Requested_Date, setMCW_Requested_Date] = useState('');
  const [MCW_Completed_Date, setMCW_Completed_Date] = useState('');
  const [Mobilization_Status, setMobilization_Status] = useState('');
  const [Mobilized_Date, setMobilized_Date] = useState('');
  const [Installation_Status, setInstallation_Status] = useState('');
  const [Installation_Date, setInstallation_Date] = useState('');
  const [Power_Connected_Date, setPower_Connected_Date] = useState('');
  const [TX_Connected_Date, setTX_Connected_Date] = useState('');
  const [Commissioning_Status, setCommissioning_Status] = useState('');
  const [Commisioned_Date, setCommisioned_Date] = useState('');
  const [SAR_Status, setSAR_Status] = useState('');
  const [SAR_Date, setSAR_Date] = useState('');
  const [PAT_Status, setPAT_Status] = useState('');
  const [PAT_Pass_Date, setPAT_Pass_Date] = useState('');
  const [Check_List_Submitted, setCheck_List_Submitted] = useState('');
  const [Check_List_Verified, setCheck_List_Verified] = useState('');
  const [On_Air_Target, setOn_Air_Target] = useState('');
  const [On_Air_Status, setOn_Air_Status] = useState('');
  const [On_Air_Date, setOn_Air_Date] = useState('');
  const [PR_Submitted_for_TSS, setPR_Submitted_for_TSS] = useState('');
  const [PR_Raised_for_TSS, setPRraisedforTSS] = useState('');
  const [PR_Number_for_TSS, setPR_Number_for_TSS] = useState('');
  const [TSS_PO_number, setTSS_PO_number] = useState('');
  const [PO_Issued_for_TSS, setPO_Issued_for_TSS] = useState('');
  const [TSS_HO, setTSS_HO] = useState('');
  const [TSSR_Submitted, setTSSR_Submitted] = useState('');
  const [TSSR_Approved, setTSSR_Approved] = useState('');
  const [BOQ_Submitted, setBOQ_Submitted] = useState('');
  const [Imp_HO, setImp_HO] = useState('');
  const [PR_Submission_for_Imp, setPR_Submission_for_Imp] = useState('');
  const [PR_Number_for_Imp, setPR_Number_for_Imp] = useState('');
  const [PR_Raised_for_Imp, setPR_Raised_for_Imp] = useState('');
  const [PO_Issued_for_Imp, setPO_Issued_for_Imp] = useState('');
  const [PR_Sub_for_supply, setPR_Sub_for_supply] = useState('');
  const [PR_Number_for_supply, setPR_Number_for_supply] = useState('');
  const [PR_Raised_for_supply, setPR_Raised_for_supply] = useState('');
  const [PO_Issued_for_supply, setPO_Issued_for_supply] = useState('');
  const [PI_Submitted, setPI_Submitted] = useState('');
  const [PI_Number, setPI_Number] = useState('');
  const [PI_Approved, setPI_Approved] = useState('');
  const [TRC_Completed, setTRC_Completed] = useState('');
  const [BOI_Completed, setBOI_Completed] = useState('');
  const [ICL_Completed, setICL_Completed] = useState('');
  const [LC_Issued, setLC_Issued] = useState('');
  const [Shipped, setShipped] = useState('');
  const [Received_at_port, setReceived_at_port] = useState('');
  const [Delivered_to_WH, setDelivered_to_WH] = useState('');
  const [Reconciled, setReconciled] = useState('');
  const [COW_Submitted, setCOW_Submitted] = useState('');
  const [COW_Approved, setCOW_Approved] = useState('');
  const [Supply_HW_PAC_Submitted, setSupply_HW_PAC_Submitted] = useState('');
  const [Supply_HW_PAC_Approved, setSupply_HW_PAC_Approved] = useState('');
  const [Imp_PAC_Submitted, setImp_PAC_Submitted] = useState('');
  const [Imp_PAC_Approved, setImp_PAC_Approved] = useState('');
  const [Supply_SW_PAC_Submitted, setSupply_SW_PAC_Submitted] = useState('');
  const [Supply_SW_PAC_Approved, setSupply_SW_PAC_Approved] = useState('');
  const [Capitalization_Supply_HW, setCapitalization_Supply_HW] = useState('');
  const [Capitalization_Imp, setCapitalization_Imp] = useState('');
  const [Capitalization_Supply_SW, setCapitalization_Supply_SW] = useState('');
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alertContent1, setAlertContent1] = useState('');
  const [alertContent2, setAlertContent2] = useState('');
  const [value, setValue] = react.useState(new Date());
  const [open1, setOpen1] = react.useState(false);
  const [error, setError] = useState('');

  const fetchProjectNames = async () => {
    const req = await axiosInstance.get('/vendorProjectsOverviewTableProjectsArray').then((res) => {
      setprojectNamesArray(res.data.vendorProjectsNamesArray);
    });
  };

  // ----------------------------------------------------------------------------------------------------------

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

  useEffect(() => {
    fetchProjectNames();
    fetchSiteEngineerNames();
  }, []);

  const sendData = (e) => {
    // handleId(e);
    e.preventDefault();
    // const newID = { Project_ID };
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
    // Forms validation part
    if (
      newPost.Implementation_By.length === 0 ||
      newPost.Project.length === 0 ||
      newPost.Scope.length === 0 ||
      newPost.HO_Date.length === 0 ||
      newPost.Site_ID.length === 0 ||
      newPost.Site_Name.length === 0 ||
      newPost.New_RAT.length === 0 ||
      newPost.Site_Engineer.length === 0 ||
      newPost.Sub_Contractor.length === 0 ||
      newPost.Site_Status.length === 0 ||
      newPost.Responsible.length === 0
    ) {
      setError('Please fill all the mandatory requiered* fields before submit!');
      setTimeout(() => {
        setError('');
      }, 5000);
    } else {
      axiosInstance
        .post('/vendorProjectsDatabases/save', newPost)
        .then(() => {
          setAlertContent2('New Project Added');
          setAlert2(true);
          navigate('/dashboard/DatabasesVendorProjects', { replace: true });
        })
        .catch((error) => {
          console.log(error);
          // setError(error.response.data.error);
          // setError('Please fill all the requiered* fields before submit!');
          // setTimeout(() => {
          //   setError('');
          // }, 5000);
        });
    }
  };

  const dataSchema = Yup.object().shape({
    // Project_ID: Yup.string().required('* required'),
    // Site_ID: Yup.string().required('* required'),
    // Site_Name: Yup.string().required('* required')
    // TSS_PO_number: Yup.string().required('* required'),
    // TSS_HO: Yup.string().required('* required'),
    // PI_Number: Yup.string().required('* required')
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
    // onSubmit: () => {
    //   navigate('/dashboard/MobitelProjectsOverview', { replace: false });
    // }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleChange1 = (event) => {
    setImplementation_By(event.target.value);
  };
  const handleChange2 = (event) => {
    setProject(event.target.value);
  };
  const handleChange3 = (event) => {
    setScope(event.target.value);
  };
  const handleChange4 = (event) => {
    setNew_RAT(event.target.value);
  };
  const handleChange5 = (event) => {
    setSite_Engineers(event.target.value);
  };
  const handleChange6 = (event) => {
    setSub_Contractor(event.target.value);
  };
  const handleChange7 = (event) => {
    setSite_Status(event.target.value);
    if (event.target.value === 'On Air') {
      setResponsible('Not Apllicable');
      setMobilization_Status('Completed');
      setInstallation_Status('Completed');
      setCommissioning_Status('Completed');
    } else if (event.target.value === 'Site Withdrawn') {
      setResponsible('Not Apllicable');
      setMobilization_Status('Hold');
      setInstallation_Status('Hold');
      setCommissioning_Status('Hold');
    } else if (event.target.value === 'PAT Pending') {
      setResponsible('Regional Operations');
      setMobilization_Status('Completed');
      setInstallation_Status('Completed');
      setCommissioning_Status('Completed');
    } else if (event.target.value === 'Commissioning Pending') {
      setResponsible('Project');
      setMobilization_Status('Completed');
      setInstallation_Status('Completed');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Commissioned / Power Pending') {
      setResponsible('Power');
      setMobilization_Status('Completed');
      setInstallation_Status('TX Completed-Power Pending');
      setCommissioning_Status('Completed');
    } else if (event.target.value === 'Installed / Power Pending') {
      setResponsible('Power');
      setMobilization_Status('Completed');
      setInstallation_Status('TX Completed-Power Pending');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Installed / TX Pending / Power Pending') {
      setResponsible('Power / Transmission');
      setMobilization_Status('Completed');
      setInstallation_Status('TX Pending-Power Pending');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Installation WIP / Power Pending') {
      setResponsible('Power');
      setMobilization_Status('Completed');
      setInstallation_Status('Installation Pending');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Installation Pending / Power Not Connected') {
      setResponsible('Project / Power');
      setMobilization_Status('Pending');
      setInstallation_Status('Installation Pending');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Installed / TX Pending') {
      setResponsible('Transmission');
      setMobilization_Status('Completed');
      setInstallation_Status('TX Pending-Power Completed');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Installation Pending') {
      setResponsible('Project');
      setMobilization_Status('Pending');
      setInstallation_Status('Installation Pending');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Tower Pending / Power Not Connected') {
      setResponsible('Civil');
      setMobilization_Status('Hold');
      setInstallation_Status('Hold');
      setCommissioning_Status('Hold');
    } else if (event.target.value === 'Relocation Pending / Power Pending') {
      setResponsible('Power');
      setMobilization_Status('Pending');
      setInstallation_Status('Installation Pending');
      setCommissioning_Status('Pending');
    } else if (event.target.value === 'Equipment Pending / Power Not Connected') {
      setResponsible('Power');
      setMobilization_Status('Hold');
      setInstallation_Status('Hold');
      setCommissioning_Status('Hold');
    } else if (event.target.value === 'Equipment Pending') {
      setResponsible('RNO / PRC');
      setMobilization_Status('Hold');
      setInstallation_Status('Hold');
      setCommissioning_Status('Hold');
    } else if (event.target.value === 'Approval Pending') {
      setResponsible('RNO');
      setMobilization_Status('Hold');
      setInstallation_Status('Hold');
      setCommissioning_Status('Hold');
    } else if (event.target.value === 'SAQ Clearance Pending') {
      setResponsible('SAQ');
      setMobilization_Status('Hold');
      setInstallation_Status('Hold');
      setCommissioning_Status('Hold');
    } else if (event.target.value === 'Supply Only') {
      setResponsible('Not Apllicable');
      setMobilization_Status('Hold');
      setInstallation_Status('Hold');
      setCommissioning_Status('Hold');
    }
  };
  const handleChange8 = (event) => {
    setResponsible(event.target.value);
  };
  const handleChange9 = (event) => {
    setMobilization_Status(event.target.value);
  };
  const handleChange10 = (event) => {
    setInstallation_Status(event.target.value);
  };
  const handleChange11 = (event) => {
    setCommissioning_Status(event.target.value);
  };
  const handleChange12 = (event) => {
    setSAR_Status(event.target.value);
  };
  const handleChange13 = (event) => {
    setPAT_Status(event.target.value);
  };
  const handleChange14 = (event) => {
    setOn_Air_Status(event.target.value);
  };

  // Assigning arrays from DB to the select menu options of the forms input
  const Projects = projectNamesArray;
  const Site_Engineers = siteEngineerNames;

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
              size="small"
              disabled
              value={Project_ID}
              fullWidth
              type="text"
              label="Project ID"
              inputProps={{ style: { color: 'gray' } }}
              variant="outlined"
              onChange={(e) => {
                seProjectID(e.target.value);
              }}
            />
            <TextField // ------------------------------------------------------------- Implemented by--------------------------------
              fullWidth
              required="required"
              InputLabelProps={{ shrink: true }}
              id="outlined-select-currency"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Implemented By"
              size="small"
              value={Implementation_By}
              onChange={handleChange1}
            >
              {Implementation_ByVendor.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ---------------------------------------------------------------- Project---------------------------
              fullWidth
              required="required"
              InputLabelProps={{ shrink: true }}
              id="outlined-select-currency"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Project Name"
              size="small"
              value={Project}
              onChange={handleChange2}
            >
              {Projects.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------------ Scope-------------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              required="required"
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Scope"
              size="small"
              value={Scope}
              onChange={handleChange3}
            >
              {Scopes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <TextField // ------------------------------------------------------------------- HO Date--------------------------
              size="small"
              required="required"
              value={HO_Date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="Handover Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setHO_Date(e.target.value);
              }}
              // {...getFieldProps('HO_Date')}
              error={Boolean(touched.date && errors.date)}
              helperText={touched.date && errors.date}
            />
            <TextField // ------------------------------------------------------------------- Site ID------------------------
              InputLabelProps={{ shrink: true }}
              required="required"
              size="small"
              value={Site_ID}
              fullWidth
              type="text"
              label="Site ID"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setSite_ID(e.target.value);
              }}
              // {...getFieldProps('Site_ID')}
              error={Boolean(touched.Site_ID && errors.Site_ID)}
              helperText={touched.Site_ID && errors.Site_ID}
            />
            <TextField // ------------------------------------------------------------------- Site Name---------------------------
              InputLabelProps={{ shrink: true }}
              required="required"
              size="small"
              value={Site_Name}
              fullWidth
              type="text"
              label="Site Name"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setSite_Name(e.target.value);
              }}
              // {...getFieldProps('Site_Name')}
              error={Boolean(touched.Site_Name && errors.Site_Name)}
              helperText={touched.Site_Name && errors.Site_Name}
            />
            <TextField // ------------------------------------------------------------------ New RAT------------------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              required="required"
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="New RAT"
              size="small"
              value={New_RAT}
              onChange={handleChange4}
            >
              {RATs.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mb={8}>
            <TextField // ------------------------------------------------------------------ Site Engineers--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              required="required"
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Site Engineer"
              size="small"
              value={Site_Engineer}
              onChange={handleChange5}
            >
              {Site_Engineers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------------ Sub Contractors--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              required="required"
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Sub Contractor"
              size="small"
              value={Sub_Contractor}
              onChange={handleChange6}
            >
              {Sub_Contractors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------------ Site Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              required="required"
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Site Status"
              size="small"
              value={Site_Status}
              onChange={handleChange7}
            >
              {Site_Statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------------ Responsible--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              required="required"
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Responsible"
              size="small"
              value={Responsible}
              onChange={handleChange8}
            >
              {Responsibles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <TextField // ------------------------------------------------------------------- Civil PAT Date-------------------
              size="small"
              value={Civil_PAT_Date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="Civil PAT Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setCivil_PAT_Date(e.target.value);
              }}
              // {...getFieldProps('Civil_PAT_Date')}
              error={Boolean(touched.Civil_PAT_Date && errors.Civil_PAT_Date)}
              helperText={touched.Civil_PAT_Date && errors.Civil_PAT_Date}
            />
            <TextField // ------------------------------------------------------------------- SAQ Clearance Date-----------------
              size="small"
              value={SAQ_Clearance_Date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="SAQ Clearance Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setSAQ_Clearance_Date(e.target.value);
              }}
              // {...getFieldProps('SAQ_Clearance_Date')}
              error={Boolean(touched.SAQ_Clearance_Date && errors.SAQ_Clearance_Date)}
              helperText={touched.SAQ_Clearance_Date && errors.SAQ_Clearance_Date}
            />
            <TextField // ------------------------------------------------------------------- Approval Received Date-----------------
              size="small"
              value={Approval_Received_Date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              autoComplete="Date"
              type="Date"
              label="Approval Received Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setApproval_Received_Date(e.target.value);
              }}
              // {...getFieldProps('Approval_Received_Date')}
              error={Boolean(touched.Approval_Received_Date && errors.Approval_Received_Date)}
              helperText={touched.Approval_Received_Date && errors.Approval_Received_Date}
            />
            <TextField // ------------------------------------------------------------------- MCW Requested Date-----------------
              size="small"
              value={MCW_Requested_Date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="MCW Requested Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setMCW_Requested_Date(e.target.value);
              }}
              // {...getFieldProps('MCW_Requested_Date')}
              error={Boolean(touched.MCW_Requested_Date && errors.MCW_Requested_Date)}
              helperText={touched.MCW_Requested_Date && errors.MCW_Requested_Date}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={8}>
            <TextField // ------------------------------------------------------------------- MCW Completed Date-----------------
              size="small"
              value={MCW_Completed_Date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="MCW Completed Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setMCW_Completed_Date(e.target.value);
              }}
              // {...getFieldProps('MCW_Completed_Date')}
              error={Boolean(touched.MCW_Completed_Date && errors.MCW_Completed_Date)}
              helperText={touched.MCW_Completed_Date && errors.MCW_Completed_Date}
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
              value={Mobilization_Status}
              onChange={handleChange9}
            >
              {Mobilization_Statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------------- Mobilized Date--------------------------
              size="small"
              value={Mobilized_Date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="Date"
              label="Mobilized Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setMobilized_Date(e.target.value);
              }}
              // {...getFieldProps('Mobilized_Date')}
              error={Boolean(touched.Mobilized_Date && errors.Mobilized_Date)}
              helperText={touched.Mobilized_Date && errors.Mobilized_Date}
            />
            <TextField // ------------------------------------------------------------------ Installation Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="Installation Status"
              size="small"
              value={Installation_Status}
              onChange={handleChange10}
            >
              {Installation_Statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------ Installation Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={Installation_Date}
              fullWidth
              type="date"
              label="Installation Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setInstallation_Date(e.target.value);
              }}
              // {...getFieldProps('Installation_Date')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={8}>
            <TextField // ------------------------------------------------------------ Power Connected Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={Power_Connected_Date}
              fullWidth
              type="date"
              label="Power Connected Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setPower_Connected_Date(e.target.value);
              }}
              // {...getFieldProps('Power_Connected_Date')}
              error={Boolean(touched.Power_Connected_Date && errors.Power_Connected_Date)}
              helperText={touched.Power_Connected_Date && errors.Power_Connected_Date}
            />
            <TextField // ------------------------------------------------------------ TX Connected Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={TX_Connected_Date}
              fullWidth
              type="date"
              label="TX Connected Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setTX_Connected_Date(e.target.value);
              }}
              // {...getFieldProps('TX_Connected_Date')}
              error={Boolean(touched.Power_Connected_Date && errors.Power_Connected_Date)}
              helperText={touched.Power_Connected_Date && errors.Power_Connected_Date}
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
              value={Commissioning_Status}
              onChange={handleChange11}
            >
              {Commissioning_Statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------ Commisioning Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={Commisioned_Date}
              fullWidth
              type="date"
              label="Commisioning Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setCommisioned_Date(e.target.value);
              }}
              // {...getFieldProps('Commisioned_Date')}
              error={Boolean(touched.Commisioned_Date && errors.Commisioned_Date)}
              helperText={touched.Commisioned_Date && errors.Commisioned_Date}
            />
            <TextField // ------------------------------------------------------------------ SAR Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="SAR Status"
              size="small"
              value={SAR_Status}
              onChange={handleChange12}
            >
              {SAR_Statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------ SAR Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={SAR_Date}
              fullWidth
              type="date"
              label="SAR Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setSAR_Date(e.target.value);
              }}
              // {...getFieldProps('SAR_Date')}
              error={Boolean(touched.SAR_Date && errors.SAR_Date)}
              helperText={touched.SAR_Date && errors.SAR_Date}
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
              value={PAT_Status}
              onChange={handleChange13}
            >
              {PAT_Statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------ PAT Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={PAT_Pass_Date}
              fullWidth
              type="date"
              label="PAT Pass Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setPAT_Pass_Date(e.target.value);
              }}
              // {...getFieldProps('PAT_Pass_Date')}
              error={Boolean(touched.PAT_Pass_Date && errors.PAT_Pass_Date)}
              helperText={touched.PAT_Pass_Date && errors.PAT_Pass_Date}
            />
            <TextField // ------------------------------------------------------------ Check List Submitted Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={Check_List_Submitted}
              fullWidth
              type="date"
              label="Check List Submitted Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setCheck_List_Submitted(e.target.value);
              }}
              // {...getFieldProps('Check_List_Submitted')}
              error={Boolean(touched.Check_List_Submitted && errors.Check_List_Submitted)}
              helperText={touched.Check_List_Submitted && errors.Check_List_Submitted}
            />
            <TextField // ------------------------------------------------------------ Check List Verified Date--------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={Check_List_Verified}
              fullWidth
              type="date"
              label="Check List Verified Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setCheck_List_Verified(e.target.value);
              }}
              // {...getFieldProps('Check_List_Verified')}
              error={Boolean(touched.Check_List_Verified && errors.Check_List_Verified)}
              helperText={touched.Check_List_Verified && errors.Check_List_Verified}
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={1}>
            <TextField // ------------------------------------------------------------ On Air Target --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={On_Air_Target}
              fullWidth
              type="date"
              label="On Air Target"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setOn_Air_Target(e.target.value);
              }}
              // {...getFieldProps('On_Air_Target')}
              error={Boolean(touched.On_Air_Target && errors.On_Air_Target)}
              helperText={touched.On_Air_Target && errors.On_Air_Target} // -------------------------------------------------------------
            />
            <TextField // ------------------------------------------------------------------ On Air Status--------------------
              InputLabelProps={{ shrink: true }}
              fullWidth
              id="outlined-select"
              select
              inputProps={{ style: { color: 'gray' } }}
              label="On Air Status"
              size="small"
              value={On_Air_Status}
              onChange={handleChange14}
            >
              {On_Air_Statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField // ------------------------------------------------------------ On Air Date --------------------------
              InputLabelProps={{ shrink: true }}
              size="small"
              value={On_Air_Date}
              fullWidth
              type="date"
              label="On Air Date"
              inputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                setOn_Air_Date(e.target.value);
              }}
              // {...getFieldProps('On_Air_Date')}
              error={Boolean(touched.On_Air_Date && errors.On_Air_Date)}
              helperText={touched.On_Air_Date && errors.On_Air_Date} // -------------------------------------------------------------
            />
          </Stack>
          <Stack spacing={2} direction="row" mb={3}>
            <Box sx={{ width: '100%' }}>
              <Collapse in={open1}>
                <Stack spacing={2} direction="row" mb={7} />
                <Stack spacing={2} direction="row" mb={3}>
                  <Typography variant="subtitle9" gutterBottom>
                    Finance
                  </Typography>
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ PR Submitted for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Submitted_for_TSS}
                    fullWidth
                    type="date"
                    label=" PR Submitted for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPR_Submitted_for_TSS(e.target.value);
                    }}
                    // {...getFieldProps('PR_Submitted_for_TSS')}
                    error={Boolean(touched.PR_Submitted_for_TSS && errors.PR_Submitted_for_TSS)}
                    helperText={touched.PR_Submitted_for_TSS && errors.PR_Submitted_for_TSS}
                  />
                  <TextField // ------------------------------------------------------------ PR Raised for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Raised_for_TSS}
                    fullWidth
                    type="date"
                    label=" PR Submitted for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPRraisedforTSS(e.target.value);
                    }}
                    // {...getFieldProps('PR_Raised_for_TSS')}
                    error={Boolean(touched.PR_Raised_for_TSS && errors.PR_Raised_for_TSS)}
                    helperText={touched.PR_Raised_for_TSS && errors.PR_Raised_for_TSS}
                  />
                  <TextField // ------------------------------------------------------------ PR Number for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Number_for_TSS}
                    fullWidth
                    type="text"
                    label=" PR Number for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPR_Number_for_TSS(e.target.value);
                    }}
                    // {...getFieldProps('PR_Raised_for_TSS')}
                    error={Boolean(touched.PR_Raised_for_TSS && errors.PR_Raised_for_TSS)}
                    helperText={touched.PR_Raised_for_TSS && errors.PR_Raised_for_TSS}
                  />
                  <TextField // ------------------------------------------------------------ TSS PO number --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={TSS_PO_number}
                    fullWidth
                    type="text"
                    label="TSS PO Number"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setTSS_PO_number(e.target.value);
                    }}
                    // {...getFieldProps('TSS_PO_number')}
                    error={Boolean(touched.TSS_PO_number && errors.TSS_PO_number)}
                    helperText={touched.TSS_PO_number && errors.TSS_PO_number}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ PO Issued for TSS --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PO_Issued_for_TSS}
                    fullWidth
                    type="date"
                    label="PO Issued for TSS"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPO_Issued_for_TSS(e.target.value);
                    }}
                    // {...getFieldProps('PO_Issued_for_TSS')}
                    error={Boolean(touched.PO_Issued_for_TSS && errors.PO_Issued_for_TSS)}
                    helperText={touched.PO_Issued_for_TSS && errors.PO_Issued_for_TSS}
                  />
                  <TextField // ------------------------------------------------------------------- TSS HO---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={TSS_HO}
                    fullWidth
                    type="text"
                    label="TSS HO"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setTSS_HO(e.target.value);
                    }}
                    // {...getFieldProps('TSS_HO')}
                    error={Boolean(touched.TSS_HO && errors.TSS_HO)}
                    helperText={touched.TSS_HO && errors.TSS_HO}
                  />
                  <TextField // ------------------------------------------------------------ TSSR Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={TSSR_Submitted}
                    fullWidth
                    type="date"
                    label="TSSR Submitted "
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setTSSR_Submitted(e.target.value);
                    }}
                    // {...getFieldProps('TSSR_Submitted')}
                    error={Boolean(touched.TSSR_Submitted && errors.TSSR_Submitted)}
                    helperText={touched.TSSR_Submitted && errors.TSSR_Submitted}
                  />
                  <TextField // ------------------------------------------------------------ TSSR Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={TSSR_Approved}
                    fullWidth
                    type="date"
                    label="TSSR Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setTSSR_Approved(e.target.value);
                    }}
                    // {...getFieldProps('TSSR_Approved')}
                    error={Boolean(touched.TSSR_Approved && errors.TSSR_Approved)}
                    helperText={touched.TSSR_Approved && errors.TSSR_Approved}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ BOQ Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={BOQ_Submitted}
                    fullWidth
                    type="date"
                    label="BOQ Submitted "
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setBOQ_Submitted(e.target.value);
                    }}
                    // {...getFieldProps('BOQ_Submitted')}
                    error={Boolean(touched.BOQ_Submitted && errors.BOQ_Submitted)}
                    helperText={touched.BOQ_Submitted && errors.BOQ_Submitted}
                  />
                  <TextField // ------------------------------------------------------------------- Imp HO---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Imp_HO}
                    fullWidth
                    type="date"
                    label="Imp HO"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setImp_HO(e.target.value);
                    }}
                    // {...getFieldProps('Imp_HO')}
                    error={Boolean(touched.Imp_HO && errors.Imp_HO)}
                    helperText={touched.Imp_HO && errors.Imp_HO}
                  />
                  <TextField // ------------------------------------------------------------ PR Submission for Imp--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Submission_for_Imp}
                    fullWidth
                    type="date"
                    label="PR Submission for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPR_Submission_for_Imp(e.target.value);
                    }}
                    // {...getFieldProps('PR_Submission_for_Imp')}
                    error={Boolean(touched.PR_Submission_for_Imp && errors.PR_Submission_for_Imp)}
                    helperText={touched.PR_Submission_for_Imp && errors.PR_Submission_for_Imp}
                  />
                  <TextField // ------------------------------------------------------------ PR Number for Imp --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Number_for_Imp}
                    fullWidth
                    type="date"
                    label="PR Number for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPR_Number_for_Imp(e.target.value);
                    }}
                    // {...getFieldProps('PR_Number_for_Imp')}
                    error={Boolean(touched.PR_Number_for_Imp && errors.PR_Number_for_Imp)}
                    helperText={touched.PR_Number_for_Imp && errors.PR_Number_for_Imp}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={3}>
                  <TextField // ------------------------------------------------------------ PR Raised for Imp --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Raised_for_Imp}
                    fullWidth
                    type="date"
                    label="PR Raised for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPR_Raised_for_Imp(e.target.value);
                    }}
                    // {...getFieldProps('PR_Raised_for_Imp')}
                    error={Boolean(touched.PR_Raised_for_Imp && errors.PR_Raised_for_Imp)}
                    helperText={touched.PR_Raised_for_Imp && errors.PR_Raised_for_Imp}
                  />
                  <TextField // ------------------------------------------------------------------- PO Issued for Imp---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PO_Issued_for_Imp}
                    fullWidth
                    type="date"
                    label="PO Issued for Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPO_Issued_for_Imp(e.target.value);
                    }}
                    // {...getFieldProps('PO_Issued_for_Imp')}
                    error={Boolean(touched.PO_Issued_for_Imp && errors.PO_Issued_for_Imp)}
                    helperText={touched.PO_Issued_for_Imp && errors.PO_Issued_for_Imp}
                  />
                  <TextField // ------------------------------------------------------------ PR Sub for supply--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Sub_for_supply}
                    fullWidth
                    type="date"
                    label="PR Sub for Supply"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPR_Sub_for_supply(e.target.value);
                    }}
                    // {...getFieldProps('PR_Sub_for_supply')}
                    error={Boolean(touched.PR_Sub_for_supply && errors.PR_Sub_for_supply)}
                    helperText={touched.PR_Sub_for_supply && errors.PR_Sub_for_supply}
                  />
                  <TextField // ------------------------------------------------------------ PR Number for supply --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PR_Number_for_supply}
                    fullWidth
                    type="date"
                    label="PR Number for Supply"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPR_Number_for_supply(e.target.value);
                    }}
                    // {...getFieldProps('PR_Number_for_supply')}
                    error={Boolean(touched.PR_Number_for_supply && errors.PR_Number_for_supply)}
                    helperText={touched.PR_Number_for_supply && errors.PR_Number_for_supply}
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
                    onChange={(e) => {
                      setPR_Raised_for_supply(e.target.value);
                    }}
                    // {...getFieldProps('PR_Raised_for_supply')}
                    error={Boolean(touched.PR_Raised_for_supply && errors.PR_Raised_for_supply)}
                    helperText={touched.PR_Raised_for_supply && errors.PR_Raised_for_supply}
                  />
                  <TextField // ------------------------------------------------------------------- PO Issued for supply---------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PO_Issued_for_supply}
                    fullWidth
                    type="date"
                    label="PO Issued for supply"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPO_Issued_for_supply(e.target.value);
                    }}
                    // {...getFieldProps('PO_Issued_for_supply')}
                    error={Boolean(touched.PO_Issued_for_supply && errors.PO_Issued_for_supply)}
                    helperText={touched.PO_Issued_for_supply && errors.PO_Issued_for_supply}
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
                    onChange={(e) => {
                      setPI_Submitted(e.target.value);
                    }}
                    // {...getFieldProps('PI_Submitted')}
                    error={Boolean(touched.PI_Submitted && errors.PI_Submitted)}
                    helperText={touched.PI_Submitted && errors.PI_Submitted}
                  />
                  <TextField // ------------------------------------------------------------ PI Number--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PI_Number}
                    fullWidth
                    type="text"
                    label="PI Number"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPI_Number(e.target.value);
                    }}
                    // {...getFieldProps('PI_Number')}
                    error={Boolean(touched.PI_Number && errors.PI_Number)}
                    helperText={touched.PI_Number && errors.PI_Number}
                  />
                  <TextField // ------------------------------------------------------------ PI Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={PI_Approved}
                    fullWidth
                    type="date"
                    label="PI Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setPI_Approved(e.target.value);
                    }}
                    // {...getFieldProps('PI_Approved')}
                    error={Boolean(touched.PI_Approved && errors.PI_Approved)}
                    helperText={touched.PI_Approved && errors.PI_Approved}
                  />
                  <TextField // ------------------------------------------------------------ TRC Completed --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={TRC_Completed}
                    fullWidth
                    type="date"
                    label="TRC Completed"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setTRC_Completed(e.target.value);
                    }}
                    // {...getFieldProps('TRC_Completed')}
                    error={Boolean(touched.TRC_Completed && errors.TRC_Completed)}
                    helperText={touched.TRC_Completed && errors.TRC_Completed}
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
                    onChange={(e) => {
                      setBOI_Completed(e.target.value);
                    }}
                    // {...getFieldProps('BOI_Completed')}
                    error={Boolean(touched.BOI_Completed && errors.BOI_Completed)}
                    helperText={touched.BOI_Completed && errors.BOI_Completed}
                  />
                  <TextField // ------------------------------------------------------------ ICL Completed--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={ICL_Completed}
                    fullWidth
                    type="date"
                    label="ICL Completed"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setICL_Completed(e.target.value);
                    }}
                    // {...getFieldProps('ICL_Completed')}
                    error={Boolean(touched.ICL_Completed && errors.ICL_Completed)}
                    helperText={touched.ICL_Completed && errors.ICL_Completed}
                  />
                  <TextField // ------------------------------------------------------------ LC Issued --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={LC_Issued}
                    fullWidth
                    type="date"
                    label="LC Issued"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setLC_Issued(e.target.value);
                    }}
                    // {...getFieldProps('LC_Issued')}
                    error={Boolean(touched.LC_Issued && errors.LC_Issued)}
                    helperText={touched.LC_Issued && errors.LC_Issued}
                  />
                  <TextField // ------------------------------------------------------------ Shipped --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Shipped}
                    fullWidth
                    type="date"
                    label="Shipped"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setShipped(e.target.value);
                    }}
                    // {...getFieldProps('Shipped')}
                    error={Boolean(touched.Shipped && errors.Shipped)}
                    helperText={touched.Shipped && errors.Shipped}
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
                    onChange={(e) => {
                      setReceived_at_port(e.target.value);
                    }}
                    // {...getFieldProps('Received_at_port')}
                    error={Boolean(touched.Received_at_port && errors.Received_at_port)}
                    helperText={touched.Received_at_port && errors.Received_at_port}
                  />
                  <TextField // ------------------------------------------------------------ Delivered to WH--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Delivered_to_WH}
                    fullWidth
                    type="date"
                    label="Delivered to WH"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setDelivered_to_WH(e.target.value);
                    }}
                    // {...getFieldProps('Delivered_to_WH')}
                    error={Boolean(touched.Delivered_to_WH && errors.Delivered_to_WH)}
                    helperText={touched.Delivered_to_WH && errors.Delivered_to_WH}
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
                    onChange={(e) => {
                      setReconciled(e.target.value);
                    }}
                    // {...getFieldProps('Reconciled')}
                    error={Boolean(touched.Reconciled && errors.Reconciled)}
                    helperText={touched.Reconciled && errors.Reconciled}
                  />
                  <TextField // ------------------------------------------------------------ COW Submitted--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={COW_Submitted}
                    fullWidth
                    type="date"
                    label="COW Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setCOW_Submitted(e.target.value);
                    }}
                    // {...getFieldProps('COW_Submitted')}
                    error={Boolean(touched.COW_Submitted && errors.COW_Submitted)}
                    helperText={touched.COW_Submitted && errors.COW_Submitted}
                  />
                  <TextField // ------------------------------------------------------------ COW Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={COW_Approved}
                    fullWidth
                    type="date"
                    label="COW Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setCOW_Approved(e.target.value);
                    }}
                    // {...getFieldProps('COW_Approved')}
                    error={Boolean(touched.COW_Approved && errors.COW_Approved)}
                    helperText={touched.COW_Approved && errors.COW_Approved}
                  />
                  <TextField // ------------------------------------------------------------ Supply HW PAC Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Supply_HW_PAC_Submitted}
                    fullWidth
                    type="date"
                    label="Supply HW PAC Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setSupply_HW_PAC_Submitted(e.target.value);
                    }}
                    // {...getFieldProps('Supply_HW_PAC_Submitted')}
                    error={Boolean(
                      touched.Supply_HW_PAC_Submitted && errors.Supply_HW_PAC_Submitted
                    )}
                    helperText={touched.Supply_HW_PAC_Submitted && errors.Supply_HW_PAC_Submitted}
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
                    onChange={(e) => {
                      setSupply_HW_PAC_Approved(e.target.value);
                    }}
                    // {...getFieldProps('Supply_HW_PAC_Approved')}
                    error={Boolean(touched.Supply_HW_PAC_Approved && errors.Supply_HW_PAC_Approved)}
                    helperText={touched.Supply_HW_PAC_Approved && errors.Supply_HW_PAC_Approved}
                  />
                  <TextField // ------------------------------------------------------------ Imp PAC Submitted--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Imp_PAC_Submitted}
                    fullWidth
                    type="date"
                    label="Imp PAC Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setImp_PAC_Submitted(e.target.value);
                    }}
                    // {...getFieldProps('Imp_PAC_Submitted')}
                    error={Boolean(touched.Imp_PAC_Submitted && errors.Imp_PAC_Submitted)}
                    helperText={touched.Imp_PAC_Submitted && errors.Imp_PAC_Submitted}
                  />
                  <TextField // ------------------------------------------------------------ Imp PAC Approved --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Imp_PAC_Approved}
                    fullWidth
                    type="date"
                    label="Imp PAC Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setImp_PAC_Approved(e.target.value);
                    }}
                    // {...getFieldProps('Imp_PAC_Approved')}
                    error={Boolean(touched.Imp_PAC_Approved && errors.Imp_PAC_Approved)}
                    helperText={touched.Imp_PAC_Approved && errors.Imp_PAC_Approved}
                  />
                  <TextField // ------------------------------------------------------------ Supply SW PAC Submitted --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Supply_SW_PAC_Submitted}
                    fullWidth
                    type="date"
                    label="Supply SW PAC Submitted"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setSupply_SW_PAC_Submitted(e.target.value);
                    }}
                    // {...getFieldProps('Supply_SW_PAC_Submitted')}
                    error={Boolean(
                      touched.Supply_SW_PAC_Submitted && errors.Supply_SW_PAC_Submitted
                    )}
                    helperText={touched.Supply_SW_PAC_Submitted && errors.Supply_SW_PAC_Submitted}
                  />
                </Stack>
                <Stack spacing={2} direction="row" mb={2}>
                  <TextField // ------------------------------------------------------------------- Supply SW PAC Approved--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Supply_SW_PAC_Approved}
                    fullWidth
                    type="date"
                    label="Supply SW PAC Approved"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setSupply_SW_PAC_Approved(e.target.value);
                    }}
                    // {...getFieldProps('Supply_SW_PAC_Approved')}
                    error={Boolean(touched.Supply_SW_PAC_Approved && errors.Supply_SW_PAC_Approved)}
                    helperText={touched.Supply_SW_PAC_Approved && errors.Supply_SW_PAC_Approved}
                  />
                  <TextField // ------------------------------------------------------------ Capitalization Supply HW--------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Capitalization_Supply_HW}
                    fullWidth
                    type="date"
                    label="Capitalization Supply HW"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setCapitalization_Supply_HW(e.target.value);
                    }}
                    // {...getFieldProps('Capitalization_Supply_HW')}
                    error={Boolean(
                      touched.Capitalization_Supply_HW && errors.Capitalization_Supply_HW
                    )}
                    helperText={touched.Capitalization_Supply_HW && errors.Capitalization_Supply_HW}
                  />
                  <TextField // ------------------------------------------------------------ Capitalization Imp --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Capitalization_Imp}
                    fullWidth
                    type="date"
                    label="Capitalization Imp"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setCapitalization_Imp(e.target.value);
                    }}
                    // {...getFieldProps('Capitalization_Imp')}
                    error={Boolean(touched.Capitalization_Imp && errors.Capitalization_Imp)}
                    helperText={touched.Capitalization_Imp && errors.Capitalization_Imp}
                  />
                  <TextField // ------------------------------------------------------------ Capitalization Supply SW --------------------------
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={Capitalization_Supply_SW}
                    fullWidth
                    type="date"
                    format="dd-MMM-yy"
                    label="Capitalization Supply SW"
                    inputProps={{ style: { color: 'gray' } }}
                    onChange={(e) => {
                      setCapitalization_Supply_SW(e.target.value);
                    }}
                    // {...getFieldProps('Capitalization_Supply_SW')}
                    error={Boolean(
                      touched.Capitalization_Supply_SW && errors.Capitalization_Supply_SW
                    )}
                    helperText={touched.Capitalization_Supply_SW && errors.Capitalization_Supply_SW}
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
                to="/dashboard/DatabasesMobitelProjects"
              >
                Cancel
              </Link>
            </Button>
            <Button
              fullWidth
              size="large"
              // type="submit"
              variant="contained"
              // loading={isSubmitting}
              onClick={sendData}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </Stack>
  );
}
