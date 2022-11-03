import react, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import CryptoJS from 'react-native-crypto-js';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// material
import Alert from '@mui/material/Alert';
import { Stack, TextField, Button, Grid, Typography, Link } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
/* eslint-disable camelcase */

const Implementation_ByVendor = [
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
  },
  {
    value: 'Not Available',
    label: 'Not Available'
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

export default function DataInputFormNew() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const navigate = useNavigate();
  const theme = useTheme();

  const [projectNamesArray, setprojectNamesArray] = useState([]);
  const [siteEngineerNamesList, setSiteEngineerNamesList] = useState([]);
  const [specialTag, setSpecialTag] = useState([]);
  const [Dependencies, setDependencies] = useState([]);
  const [Site_Statuses, setSite_Statuses] = useState([]);
  const [Responsibles, setResponsibles] = useState([]);
  const [Scopes, setScopes] = useState([]);
  const [RATs, setRATs] = useState([]);
  const [Sub_Contractors, setSub_Contractors] = useState([]);

  const [Planning_ID, setPlanning_ID] = useState('');
  const [Implementation_By, setImplementation_By] = useState('');
  const [Project, setProject] = useState('');
  const [Site_ID, setSite_ID] = useState('');
  const [Site_Name, setSite_Name] = useState('');

  const [HO_Date, setHO_Date] = useState('');
  const [HO_Modification, setHO_Modification] = useState('');
  const [HO_Modified_Date, setHO_Modified_Date] = useState('');

  const [Scope, setScope] = useState('');
  const [New_RAT, setNew_RAT] = useState('');

  const [New_Sector, setNew_Sector] = useState('');
  const [Approval_Status, setApproval_Status] = useState('');
  const [Approval_Ref, setApproval_Ref] = useState('');
  const [IMP_Scenario, setIMP_Scenario] = useState('');
  const [blank1, setblank1] = useState('');
  const [blank2, setblank2] = useState('');
  const [blank3, setblank3] = useState('');
  const [Tilt, setTilt] = useState('');
  const [Azimuth, setAzimuth] = useState('');
  const [Antenna_Height, setAntenna_Height] = useState('');
  const [New_RRU_Type, setNew_RRU_Type] = useState('');
  const [RRU_From, setRRU_From] = useState('');
  const [New_BTS_Type, setNew_BTS_Type] = useState('');
  const [BTS_From, setBTS_From] = useState('');
  const [New_Antenna_Type, setNew_Antenna_Type] = useState('');
  const [Antenna_From, setAntenna_From] = useState('');
  const [Cards_Type_n_From, setCards_Type_n_From] = useState('');
  const [Battery_count_n_From, setBattery_count_n_From] = useState('');
  const [Mobitel_Region, setMobitel_Region] = useState('');
  const [Planning_Engineer, setPlanning_Engineer] = useState('');
  const [On_Air_Target, setOn_Air_Target] = useState('');
  const [Planning_Comments, setPlanning_Comments] = useState('');

  const [Site_Engineer, setSite_Engineer] = useState('');
  const [Sub_Contractor, setSub_Contractor] = useState('');
  const [Sub_Contractor_Remarks, setSub_Contractor_Remarks] = useState('');

  const [Assigned_Date, setAssigned_Date] = useState('');
  const [Special_Tag, setSpecial_Tag] = useState('');
  const [Coordinator_Comments, setCoordinator_Comments] = useState('');
  const [Site_Status, setSite_Status] = useState('');
  const [Dependency, setDependency] = useState('');
  const [Responsible, setResponsible] = useState('');

  const [Dependencies_On_Air_Target, setDependencies_On_Air_Target] = useState('');

  const [Civil_PAT_Date, setCivil_PAT_Date] = useState('');
  const [SAQ_Clearance_Date, setSAQ_Clearance_Date] = useState('');

  const [TSSR_Referance, setTSSR_Referance] = useState('');
  const [TSSR_Submitted_Date, setTSSR_Submitted_Date] = useState('');
  const [TSSR_Approved_Date, setTSSR_Approved_Date] = useState('');
  const [Supply_BOQ_Submitted, setSupply_BOQ_Submitted] = useState('');
  const [Supply_BOQ_Approved, setSupply_BOQ_Approved] = useState('');

  const [Approval_Received_Date, setApproval_Received_Date] = useState('');
  const [MCW_Requested_Date, setMCW_Requested_Date] = useState('');
  const [MCW_Completed_Date, setMCW_Completed_Date] = useState('');

  const [Supply_PR_Submitted, setSupply_PR_Submitted] = useState('');
  const [Supply_PR_Status, setSupply_PR_Status] = useState('');
  const [Supply_PR_Approved_Date, setSupply_PR_Approved_Date] = useState('');
  const [Supply_PR_Number, setSupply_PR_Number] = useState('');
  const [Supply_PR_Raise, setSupply_PR_Raise] = useState('');
  const [Supply_PO_Number, setSupply_PO_Number] = useState('');
  const [Supply_PO_Issued, setSupply_PO_Issued] = useState('');
  const [IMP_PR_Submitted, setIMP_PR_Submitted] = useState('');
  const [IMP_PR_Approved_Date, setIMP_PR_Approved_Date] = useState('');
  const [IMP_PR_Number, setIMP_PR_Number] = useState('');
  const [IMP_PR_Raised, setIMP_PR_Raised] = useState('');

  const [IMP_PO_Number, setIMP_PO_Number] = useState('');
  const [IMP_PO_Issued, setIMP_PO_Issued] = useState('');
  const [AWR_1, setAWR_1] = useState('');
  const [AWR_2, setAWR_2] = useState('');
  const [AWR_3, setAWR_3] = useState('');
  const [PI_Number, setPI_Number] = useState('');
  const [PI_Submitted, setPI_Submitted] = useState('');
  const [PI_Approved_ENG, setPI_Approved_ENG] = useState('');
  const [TRC_Approved, setTRC_Approved] = useState('');
  const [BOI_Approved, setBOI_Approved] = useState('');
  const [ICL_Approved, setICL_Approved] = useState('');
  const [Payment_Method, setPayment_Method] = useState('');

  const [Payment_Confirmed, setPayment_Confirmed] = useState('');
  const [ETA, setETA] = useState('');
  const [Received_To_Port, setReceived_To_Port] = useState('');
  const [Port_Clearance, setPort_Clearance] = useState('');
  const [Logistics_Remarks, setLogistics_Remarks] = useState('');

  const [Mobilization_Status, setMobilization_Status] = useState('');
  const [Mobilized_Date, setMobilized_Date] = useState('');
  const [Installation_Status, setInstallation_Status] = useState('');
  const [Installation_Date, setInstallation_Date] = useState('');
  const [Power_Connected_Date, setPower_Connected_Date] = useState('');
  const [TX_Connected_Date, setTX_Connected_Date] = useState('');
  const [Commissioning_Status, setCommissioning_Status] = useState('');
  const [Commisioned_Date, setCommisioned_Date] = useState('');

  const [SAR_Reference, setSAR_Reference] = useState('');
  const [SAR_Status, setSAR_Status] = useState('');
  const [SAR_Date, setSAR_Date] = useState('');
  const [PAT_Reference, setPAT_Reference] = useState('');
  const [PAT_Status, setPAT_Status] = useState('');
  const [PAT_Submitted, setPAT_Submitted] = useState('');
  const [PAT_Pass_Date, setPAT_Pass_Date] = useState('');
  const [Check_List_Submitted, setCheck_List_Submitted] = useState('');
  const [Check_List_Verified, setCheck_List_Verified] = useState('');
  const [On_Air_Status, setOn_Air_Status] = useState('');
  const [On_Air_Date, setOn_Air_Date] = useState('');

  const [Material_Reconciled, setMaterial_Reconciled] = useState('');
  const [Balance_Material_Returned_Date, setBalance_Material_Returned_Date] = useState('');
  const [COW_Number, setCOW_Number] = useState('');

  const [COW_Submitted, setCOW_Submitted] = useState('');
  const [COW_Approved, setCOW_Approved] = useState('');
  const [CPL_Number, setCPL_Number] = useState('');
  const [CPL_Submitted, setCPL_Submitted] = useState('');
  const [CPL_Approved, setCPL_Approved] = useState('');

  const [PAC_Invoice_Number, setPAC_Invoice_Number] = useState('');
  const [PAC_Invoice_Submitted, setPAC_Invoice_Submitted] = useState('');
  const [PAC_Invoice_Approved, setPAC_Invoice_Approved] = useState('');
  const [FAC_Number, setFAC_Number] = useState('');
  const [FAC_Submitted, setFAC_Submitted] = useState('');
  const [FAC_Approved, setFAC_Approved] = useState('');

  const [PO_Status, setPO_Status] = useState('');
  const [PO_Closed_Date, setPO_Closed_Date] = useState('');
  const [Capitalization_Status, setCapitalization_Status] = useState('');
  const [Capitalized_Date, setCapitalized_Date] = useState('');
  const [Finance_Remarks, setFinance_Remarks] = useState('');

  const [currentUser, setcurrentUser] = useState('');

  const [Handover_Status, setHandover_Status] = useState('');
  const [Work_Allocation_Status, setWork_Allocation_Status] = useState('');
  const [Sub_Contractor_Status, setSub_Contractor_Status] = useState('');
  const [Dependencies_Status, setDependencies_Status] = useState('');
  const [PR_PO_Progress_Status, setPR_PO_Progress_Status] = useState('');
  const [Logistics_Status, setLogistics_Status] = useState('');
  const [Implementation_Status, setImplementation_Status] = useState('');
  const [Acceptance_Status, setAcceptance_Status] = useState('');
  const [Payment_Status, setPayment_Status] = useState('');

  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alertContent1, setAlertContent1] = useState('');
  const [alertContent2, setAlertContent2] = useState('');
  const [snackbar, setSnackbar] = react.useState(null);
  const [value, setValue] = react.useState(new Date());
  const [error, setError] = useState('');

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

  const handleCloseSnackbar = () => setSnackbar(null);

  const fetchSpecialTag = async () => {
    const req = await axiosInstance.get('/specialTag').then((res) => {
      setSpecialTag(res.data.specialTaArrayForSelectMenus);
    });
  };

  const fetchDependency = async () => {
    const req = await axiosInstance.get('/Dependency').then((res) => {
      setDependencies(res.data.DependencyArrayForSelectMenus);
    });
  };

  const fetchSiteStatus = async () => {
    const req = await axiosInstance.get('/SiteStatus').then((res) => {
      setSite_Statuses(res.data.SiteStatusesArrayForSelectMenus);
    });
  };

  const fetchResponsible = async () => {
    const req = await axiosInstance.get('/Responsible').then((res) => {
      setResponsibles(res.data.ResponsibleArrayForSelectMenus);
    });
  };

  const fetchProjectNames = async () => {
    const req = await axiosInstance
      .get('/filteredVendorProjectsNamesArray', {
        params: { Vendor: 'Huawei' }
      })
      .then((res) => {
        setprojectNamesArray(res.data.filteredProjectNamesArray);
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
    fetchSpecialTag();
    fetchDependency();
    fetchSiteStatus();
    fetchResponsible();
  }, []);

  const sendData = (e) => {
    e.preventDefault();

    setTimeout(() => {
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
        currentUser
      };

      // Forms validation part
      if (
        newPost.Planning_ID.length === 0 ||
        newPost.Implementation_By.length === 0 ||
        newPost.Project.length === 0 ||
        newPost.Site_ID.length === 0 ||
        newPost.Site_Name.length === 0 ||
        newPost.HO_Date.length === 0 ||
        // newPost.HO_Modification.length === 0 ||
        // newPost.HO_Modified_Date.length === 0 ||
        newPost.Scope.length === 0 ||
        newPost.New_RAT.length === 0 ||
        newPost.New_Sector.length === 0 ||
        newPost.Approval_Status.length === 0 ||
        newPost.Approval_Ref.length === 0 ||
        newPost.IMP_Scenario.length === 0 ||
        newPost.blank1.length === 0 ||
        newPost.blank2.length === 0 ||
        newPost.blank3.length === 0 ||
        newPost.Tilt.length === 0 ||
        newPost.Azimuth.length === 0 ||
        newPost.Antenna_Height.length === 0 ||
        newPost.New_RRU_Type.length === 0 ||
        newPost.RRU_From.length === 0 ||
        newPost.New_BTS_Type.length === 0 ||
        newPost.BTS_From.length === 0 ||
        newPost.New_Antenna_Type.length === 0 ||
        newPost.Antenna_From.length === 0 ||
        newPost.Cards_Type_n_From.length === 0 ||
        newPost.Battery_count_n_From.length === 0 ||
        newPost.Mobitel_Region.length === 0 ||
        newPost.Planning_Engineer.length === 0 ||
        newPost.On_Air_Target.length === 0 ||
        newPost.Planning_Comments.length === 0
      ) {
        setError('Please fill all the fields in Handover Details before submit!');
        setTimeout(() => {
          setError('');
        }, 5000);
      } else {
        axiosInstance
          .post('/vendorProjectsDatabases/save', newPost)
          .then(() => {
            setAlert2(true);
            setAlertContent2('New project added successfully !');
            setAlert2(true);
            setTimeout(() => {
              setAlert2(false);
            }, 6000);
            // refresh page after form submit
            navigate(0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 1);
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

  const handleChange1 = (event) => {
    setImplementation_By(event.target.value);
  };
  const handleChange2 = (event) => {
    setProject(event.target.value);
  };
  const handleChange3 = (event) => {
    setHO_Modification(event.target.value);
  };
  const handleChange4 = (event) => {
    setScope(event.target.value);
  };
  const handleChange5 = (event) => {
    setNew_RAT(event.target.value);
  };
  const handleChange6 = (event) => {
    setApproval_Status(event.target.value);
  };
  const handleChange7 = (event) => {
    setSite_Engineer(event.target.value);
  };
  const handleChange8 = (event) => {
    setSub_Contractor(event.target.value);
  };
  const handleChange9 = (event) => {
    setSite_Status(event.target.value);
  };
  const handleChange10 = (event) => {
    setDependency(event.target.value);
  };
  const handleChange11 = (event) => {
    setResponsible(event.target.value);
  };
  const handleChange12 = (event) => {
    setSupply_PR_Status(event.target.value);
  };
  const handleChange13 = (event) => {
    setMobilization_Status(event.target.value);
  };
  const handleChange14 = (event) => {
    setInstallation_Status(event.target.value);
  };
  const handleChange15 = (event) => {
    setCommissioning_Status(event.target.value);
  };
  const handleChange16 = (event) => {
    setSAR_Status(event.target.value);
  };
  const handleChange17 = (event) => {
    setPAT_Status(event.target.value);
  };
  const handleChange18 = (event) => {
    setOn_Air_Status(event.target.value);
  };
  const handleChange19 = (event) => {
    setPO_Status(event.target.value);
  };
  const handleChange20 = (event) => {
    setCapitalization_Status(event.target.value);
  };

  // Assigning arrays from DB to the select menu options array of the forms input
  const Projects = projectNamesArray;
  const Site_Engineers = siteEngineerNames;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                size="small"
                value={Planning_ID}
                fullWidth
                type="text"
                label="Planning ID"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
                onChange={(e) => {
                  setPlanning_ID(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  Implemented by--------------------------------
                fullWidth
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
              <TextField // -----------------------------------------------------------  Project----------------------------------------
                fullWidth
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
              <TextField // -----------------------------------------------------------  Site ID-----------------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Site_ID}
                fullWidth
                type="text"
                label="Site ID"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSite_ID(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------  Site Name---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Site_Name}
                fullWidth
                type="text"
                label="Site Name"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSite_Name(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- HO Date--------------------------
                size="small"
                value={HO_Date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Handover Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setHO_Date(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------ HO_Modification------------------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="HO Modification"
                size="small"
                value={HO_Modification}
                onChange={handleChange3}
              >
                {HandoverModification.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- HO_Modified_Date -------------------------
                size="small"
                value={HO_Modified_Date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="HO Modified Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setHO_Modified_Date(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Scope-------------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Scope"
                size="small"
                value={Scope}
                onChange={handleChange4}
              >
                {Scopes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------ New RAT------------------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="New RAT"
                size="small"
                value={New_RAT}
                onChange={handleChange5}
              >
                {RATs.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  New_Sector ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={New_Sector}
                fullWidth
                type="text"
                label="New Sector"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setNew_Sector(e.target.value);
                }}
              />
              <TextField // -------------------------------------------------------------------  Approval_Status-------------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Approval Status"
                size="small"
                value={Approval_Status}
                onChange={handleChange6}
              >
                {ApprovalStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Approval_Ref-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Approval_Ref}
                fullWidth
                type="text"
                label="Approval Ref"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setApproval_Ref(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  IMP_Scenario------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={IMP_Scenario}
                fullWidth
                type="text"
                label="IMP Scenario"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setIMP_Scenario(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  blank1 ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={blank1}
                fullWidth
                type="text"
                label="blank1"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setblank1(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  blank2 ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={blank2}
                fullWidth
                type="text"
                label="blank2"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setblank2(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ blank3-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={blank3}
                fullWidth
                type="text"
                label="blank3"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setblank3(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Tilt------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Tilt}
                fullWidth
                type="text"
                label="Tilt"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setTilt(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Azimuth ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Azimuth}
                fullWidth
                type="text"
                label="Azimuth"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setAzimuth(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Antenna_Height ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Antenna_Height}
                fullWidth
                type="text"
                label="Antenna Height"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setAntenna_Height(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ New_RRU_Type-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={New_RRU_Type}
                fullWidth
                type="text"
                label="New RRU Type"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setNew_RRU_Type(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  RRU_From------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={RRU_From}
                fullWidth
                type="text"
                label="RRU From"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setRRU_From(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  New_BTS_Type ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={New_BTS_Type}
                fullWidth
                type="text"
                label="New BTS Type"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setNew_BTS_Type(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  BTS_From ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={BTS_From}
                fullWidth
                type="text"
                label="BTS From"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setBTS_From(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ New_Antenna_Type-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={New_Antenna_Type}
                fullWidth
                type="text"
                label="New Antenna Type"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setNew_Antenna_Type(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Antenna_From------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Antenna_From}
                fullWidth
                type="text"
                label="Antenna From"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setAntenna_From(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Cards_Type_n_From ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Cards_Type_n_From}
                fullWidth
                type="text"
                label="Cards Type and From"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCards_Type_n_From(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Battery_count_n_From ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Battery_count_n_From}
                fullWidth
                type="text"
                label="Battery count and From"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setBattery_count_n_From(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ Mobitel_Region-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Mobitel_Region}
                fullWidth
                type="text"
                label="Mobitel Region"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setMobitel_Region(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Planning_Engineer------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Planning_Engineer}
                fullWidth
                type="text"
                label="Planning Engineer"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPlanning_Engineer(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  On_Air_Target ---------------------------
                size="small"
                value={On_Air_Target}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="On Air Target"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setOn_Air_Target(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Planning_Comments ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Planning_Comments}
                fullWidth
                type="text"
                label="Planning Comments"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPlanning_Comments(e.target.value);
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                id="outlined-select"
                select
                sx={{ width: 250 }}
                inputProps={{ style: { color: 'gray' } }}
                label="Site Engineer"
                size="small"
                value={Site_Engineer}
                onChange={handleChange7}
              >
                {Site_Engineers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
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
                type="Date"
                label="Assigned Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setAssigned_Date(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Special_Tag-------------------
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  setSpecial_Tag(e.target.value);
                }}
                id="outlined-select"
                select
                sx={{ width: 250 }}
                inputProps={{ style: { color: 'gray' } }}
                label="Special Tag"
                size="small"
                value={Special_Tag}
              >
                {specialTag.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  Coordinator_Comments---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Coordinator_Comments}
                sx={{ width: 250 }}
                type="text"
                label="Coordinator Comments"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCoordinator_Comments(e.target.value);
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                id="outlined-select"
                select
                fullWidth
                inputProps={{ style: { color: 'gray' } }}
                label="Sub Contractor"
                size="small"
                value={Sub_Contractor}
                onChange={handleChange8}
              >
                {Sub_Contractors.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  Sub_Contractor_Remarks---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Sub_Contractor_Remarks}
                fullWidth
                type="text"
                label="Sub Contractor Remarks"
                inputProps={{ style: { color: 'gray' } }}
                // onChange={handleChange125}
                onChange={(e) => {
                  setSub_Contractor_Remarks(e.target.value);
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Site Status"
                size="small"
                value={Site_Status}
                onChange={handleChange9}
              >
                {Site_Statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------ Dependency --------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Dependency"
                size="small"
                value={Dependency}
                onChange={handleChange10}
              >
                {Dependencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  Responsible--------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Responsible"
                size="small"
                value={Responsible}
                onChange={handleChange11}
              >
                {Responsibles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Dependencies_On_Air_Target -----------------------------------------
                size="small"
                value={Dependencies_On_Air_Target}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Dependencies On Air Target"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setDependencies_On_Air_Target(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
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
              />
              <TextField // ------------------------------------------------------------------ TSSR_Referance------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={TSSR_Referance}
                fullWidth
                type="text"
                label="TSSR Reference"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
                onChange={(e) => {
                  setTSSR_Referance(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- TSSR_Submitted_Date -------------------------
                size="small"
                value={TSSR_Submitted_Date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="TSSR Submitted Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setTSSR_Submitted_Date(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- TSSR_Approved_Date -------------------------
                size="small"
                value={TSSR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="TSSR Approved Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setTSSR_Approved_Date(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_BOQ_Submitted -------------------------
                size="small"
                value={Supply_BOQ_Submitted}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Supply BOQ Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_BOQ_Submitted(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_BOQ_Approved -------------------------
                size="small"
                value={Supply_BOQ_Approved}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Supply BOQ Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_BOQ_Approved(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Approval_Received_Date -------------------------
                size="small"
                value={Approval_Received_Date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Approval Received Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setApproval_Received_Date(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- MCW_Requested_Date -------------------------
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
              />
              <TextField // ------------------------------------------------------------------- MCW_Completed_Date -------------------------
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
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                fullWidth
                type="Date"
                label="Supply PR Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_PR_Submitted(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  Supply_PR_Status --------------------------------
                fullWidth
                InputLabelProps={{ shrink: true }}
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Supply PR Status"
                size="small"
                value={Supply_PR_Status}
                onChange={handleChange12}
              >
                {SupplyPRStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // -----------------------------------------------------------  Supply_PR_Approved_Date ---------------------------------
                size="small"
                value={Supply_PR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Supply PR Approved Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_PR_Approved_Date(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_PR_Number------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Supply_PR_Number}
                fullWidth
                type="text"
                label="Supply PR Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_PR_Number(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -----------------------------------------------------------  Supply_PR_Raise ---------------------------------
                size="small"
                value={Supply_PR_Raise}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Supply PR Raised"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_PR_Raise(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Supply_PO_Number------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Supply_PO_Number}
                fullWidth
                type="text"
                label="Supply PO Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_PO_Number(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  Supply_PO_Issued ---------------------------------
                size="small"
                value={Supply_PO_Issued}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Supply PO Issued"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSupply_PO_Issued(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- IMP_PR_Submitted -------------------------
                size="small"
                value={IMP_PR_Submitted}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="IMP PR Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setIMP_PR_Submitted(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- IMP_PR_Approved_Date -------------------------
                size="small"
                value={IMP_PR_Approved_Date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="IMP PR Approved Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setIMP_PR_Approved_Date(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------ IMP_PR_Number------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={IMP_PR_Number}
                fullWidth
                type="text"
                label="IMP PR Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setIMP_PR_Number(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- IMP_PR_Raised -------------------------
                size="small"
                value={IMP_PR_Raised}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="IMP PR Raised"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setIMP_PR_Raised(e.target.value);
                }}
              />
              <TextField // -------------------------------------------------------------------  IMP_PO_Number-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={IMP_PO_Number}
                fullWidth
                type="text"
                label="IMP PO Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setIMP_PO_Number(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // -------------------------------------------------------------------  IMP_PO_Issued -------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                type="Date"
                value={IMP_PO_Issued}
                fullWidth
                label="IMP PO Issued"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setIMP_PO_Issued(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  AWR_1------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={AWR_1}
                fullWidth
                type="text"
                label="AWR 1"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setAWR_1(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  AWR_2 ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={AWR_2}
                fullWidth
                type="text"
                label="AWR 2"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setAWR_2(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  AWR_3 ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={AWR_3}
                fullWidth
                type="text"
                label="AWR 3"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setAWR_3(e.target.value);
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                fullWidth
                type="text"
                label="PI Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPI_Number(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  PI_Submitted --------------------------------
                size="small"
                value={PI_Submitted}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                label="PI Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPI_Submitted(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  PI_Approved_ENG ---------------------------------
                size="small"
                value={PI_Approved_ENG}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="PI Approved ENG"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPI_Approved_ENG(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- TRC_Approved------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={TRC_Approved}
                fullWidth
                type="date"
                label="TRC Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setTRC_Approved(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // --------------------------------------------------------------------  BOI_Approved ---------------------------------
                size="small"
                value={BOI_Approved}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="BOI Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setBOI_Approved(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  ICL_Approved ---------------------------------
                size="small"
                value={ICL_Approved}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="ICL Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setICL_Approved(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  Payment_Method ---------------------------------
                size="small"
                value={Payment_Method}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="text"
                label="Payment Method"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPayment_Method(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Payment_Confirmed -------------------------
                size="small"
                value={Payment_Confirmed}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Payment Confirmed"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPayment_Confirmed(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------- ETA -------------------------
                size="small"
                value={ETA}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="ETA"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setETA(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------ Received_To_Port------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Received_To_Port}
                fullWidth
                type="date"
                label="Received To Port"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setReceived_To_Port(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- Port_Clearance -------------------------
                size="small"
                value={Port_Clearance}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="Port Clearance"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPort_Clearance(e.target.value);
                }}
              />
              <TextField // -------------------------------------------------------------------  Logistics_Remarks-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Logistics_Remarks}
                fullWidth
                type="text"
                label="Logistics Remarks"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setLogistics_Remarks(e.target.value);
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Mobilization Status"
                size="small"
                value={Mobilization_Status}
                onChange={handleChange13}
              >
                {Mobilization_Statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------- Mobilized Date --------------------------
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
                onChange={handleChange14}
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
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
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
              />
              <TextField // ------------------------------------------------------------------ Commisioning Status--------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Commisioning Status"
                size="small"
                value={Commissioning_Status}
                onChange={handleChange15}
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
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                size="small"
                value={SAR_Reference}
                fullWidth
                type="text"
                label="SAR Reference"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setSAR_Reference(e.target.value);
                }}
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
                onChange={handleChange16}
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
              />
              <TextField // ------------------------------------------------------------ PAT_Reference --------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={PAT_Reference}
                fullWidth
                type="text"
                label="PAT Reference"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPAT_Reference(e.target.value);
                }}
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
                onChange={handleChange17}
              >
                {PAT_Statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------ PAT_Submitted --------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={PAT_Submitted}
                fullWidth
                type="date"
                label="PAT Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPAT_Submitted(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------  PAT_Pass_Date --------------------------
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
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
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
              />
              <TextField // -----------------------------------------------------------  On Air Status--------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                id="outlined-select"
                select
                inputProps={{ style: { color: 'gray' } }}
                label="On Air Status"
                size="small"
                value={On_Air_Status}
                onChange={handleChange18}
              >
                {On_Air_Statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------  On Air Date --------------------------
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
              />
              <TextField // ------------------------------------------------------------  Material_Reconciled --------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Material_Reconciled}
                fullWidth
                type="date"
                label="Material Reconciled"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setMaterial_Reconciled(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------  Balance_Material_Returned_Date --------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Balance_Material_Returned_Date}
                fullWidth
                type="date"
                label="Balance Material Returned Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setBalance_Material_Returned_Date(e.target.value);
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: '#041426' }}>
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
                size="small"
                value={COW_Number}
                fullWidth
                type="text"
                label="COW Number"
                inputProps={{ style: { color: 'gray' } }}
                variant="outlined"
                onChange={(e) => {
                  setCOW_Number(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  COW_Submitted --------------------------------
                size="small"
                value={COW_Submitted}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="COW Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCOW_Submitted(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  COW_Approved----------------------------------------
                size="small"
                value={COW_Approved}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="COW Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCOW_Approved(e.target.value);
                }}
              />
              <TextField // -----------------------------------------------------------  CPL_Number-----------------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={CPL_Number}
                fullWidth
                type="text"
                label="CPL Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCPL_Number(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------ CPL_Submitted---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={CPL_Submitted}
                fullWidth
                type="date"
                label="CPL Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCPL_Submitted(e.target.value);
                }}
              />
              <TextField // ---------------------------------------------------------------- CPL_Approved--------------------------
                size="small"
                value={CPL_Approved}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="CPL Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCPL_Approved(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------ PAC_Invoice_Number------------------------------
                size="small"
                value={PAC_Invoice_Number}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="text"
                label="PAC/Invoice Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPAC_Invoice_Number(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------- PAC_Invoice_Submitted -------------------------
                size="small"
                value={PAC_Invoice_Submitted}
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="Date"
                label="PAC/Invoice Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPAC_Invoice_Submitted(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ PAC_Invoice_Approved-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={PAC_Invoice_Approved}
                fullWidth
                type="date"
                label="PAC/Invoice Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPAC_Invoice_Approved(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  FAC_Number------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={FAC_Number}
                fullWidth
                type="text"
                label="FAC Number"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setFAC_Number(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  FAC_Submitted ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={FAC_Submitted}
                fullWidth
                type="date"
                label="FAC Submitted"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setFAC_Submitted(e.target.value);
                }}
              />
              <TextField // -------------------------------------------------------------------  FAC_Approved-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={FAC_Approved}
                fullWidth
                type="date"
                label="FAC Approved"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setFAC_Approved(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------ PO_Status-------------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                inputProps={{ style: { color: 'gray' } }}
                label="PO Status"
                size="small"
                value={PO_Status}
                onChange={handleChange19}
              >
                {POStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  PO_Closed_Date------------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={PO_Closed_Date}
                fullWidth
                type="date"
                label="PO Closed Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setPO_Closed_Date(e.target.value);
                }}
              />
              <TextField // ------------------------------------------------------------------  Capitalization_Status ---------------------------
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                inputProps={{ style: { color: 'gray' } }}
                label="Capitalization Status"
                size="small"
                value={Capitalization_Status}
                onChange={handleChange20}
              >
                {CapitalizationStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField // ------------------------------------------------------------------  Capitalized_Date ---------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Capitalized_Date}
                fullWidth
                type="date"
                label="Capitalized Date"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setCapitalized_Date(e.target.value);
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" mb={3}>
              <TextField // ------------------------------------------------------------------  Finance_Remarks-------------------------
                InputLabelProps={{ shrink: true }}
                size="small"
                value={Finance_Remarks}
                fullWidth
                type="text"
                label="Finance Remakrs"
                inputProps={{ style: { color: 'gray' } }}
                onChange={(e) => {
                  setFinance_Remarks(e.target.value);
                }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
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
              autoHideDuration={5000}
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
              to="/dashboard/DatabasesVendorProjectsHuawei"
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
  );
}
