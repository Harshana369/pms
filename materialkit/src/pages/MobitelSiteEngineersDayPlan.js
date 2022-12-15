/* eslint-disable */

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Page from '../components/Page';
import SiteEngineerDayPlanPopup from './SiteEngineerDayPlanPopup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AllSiteId } from 'src/Redux/Action/DayPlanAction';

const columns = [
  { field: '_id', headerName: 'ID', width: 100 },

  { field: 'planDate', headerName: 'Plan Date', width: 100 },
  {
    field: 'sName',
    headerName: 'Site ID',
    width: 150
  },
  {
    field: 'selectedScope',
    headerName: 'Scope',
    width: 250
  },
  {
    field: 'plannedWork',
    headerName: 'Planned work',
    width: 150
  },
  {
    field: 'Site_Status',
    headerName: 'Site Status',
    width: 150
  },
  {
    field: 'Result_Date',
    headerName: 'Result Date',
    width: 150
  },
  {
    field: 'Comment',
    headerName: 'Comment',
    width: 150
  }
];

const rows = [
  {
    _id: '001',
    planDate: '2022-12-02',
    sName: 'Test01',
    selectedScope: 'Relevant scope to Test01',
    plannedWork: 'Text',
    Site_Status: 'PAT Submitted',
    Result_Date: '2022-12-02',
    Comment: 'Text'
  }
  // {
  //   id: '002',
  //   Plan_Date: '2023-11-02',
  //   Site_ID: 'Test03',
  //   Scope: 'WWWWW scope ',
  //   Planned_work: 'Text'
  // }
];

const columnGroupingModel = [
  {
    groupId: 'Plan_data',
    headerName: 'Plan',
    headerClassName: 'naming-group-plan',
    children: [
      { field: 'planDate' },
      { field: 'sName' },
      { field: 'selectedScope' },
      { field: 'plannedWork' }
    ]
  },
  {
    groupId: 'Result_data',
    headerName: 'Result',
    headerClassName: 'naming-group-result',
    children: [{ field: 'Site_Status' }, { field: 'Result_Date' }, { field: 'Comment' }]
  }
];

export default function MobitelSiteEngineersDayPlan() {
  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const [openPopup, setOpenPopup] = React.useState(false);
  //---------------
  const [options, setOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [siteEName, setSiteENmae] = React.useState();
  const [seSite, setSeSite] = React.useState([]);
  const [siteEngineerForTable, setSiteEngineerForTable] = React.useState();

  const load = open && options.length === 0;

  const dispatch = useDispatch();

  const SiteEngineerDayPlanDetails = useSelector((state) => state.mobitelSiteEngineerDayPlan);
  const { loading, error, SiteIdData } = SiteEngineerDayPlanDetails;

  const getSiteEngineerForSiteIdFunction = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/getSiteEngineerForSiteData/${siteEName.Site_Engineer}`
      );
      setSeSite(data.Site);
      // console.log(data.Site);
    } catch (error) {
      console.log(
        error.response && error.response.data.message ? error.response.data.message : error.message
      );
    }
  };

  const getSiteEngineerForTableData = async () => {
    try {
      const { data } = await axiosInstance.get('/getSiteEngineerForTable');
      // console.log(data.siteEngineerForTable);
      setSiteEngineerForTable(data.siteEngineerForTable);
    } catch (error) {
      console.log(
        error.response && error.response.data.message ? error.response.data.message : error.message
      );
    }
  };

  React.useEffect(() => {
    dispatch(AllSiteId());
  }, [dispatch]);

  React.useEffect(() => {
    getSiteEngineerForTableData();
  }, []);

  React.useEffect(() => {
    getSiteEngineerForSiteIdFunction();
  }, [siteEName]);

  //----------------Site Engineer--------------------
  React.useEffect(() => {
    let active = true;
    if (!load) {
      return undefined;
    }
    if (active) {
      setOptions([...SiteIdData.allSiteEngineersNames]);
    }
    return () => {
      active = false;
    };
  }, [load]);
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Page title="Mobitel Projects Database | Site Enginners DayPlan">
        <Stack alignItems="center">
          <Typography variant="h6" gutterBottom>
            Day plan
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          spacing={1}
          mb={2}
        >
          <Button color="primary" variant="outlined" on onClick={() => setOpenPopup(true)}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.2}>
              <AddIcon />
              Add Plan
              {/* </Link> */}
            </Stack>
          </Button>

          {loading ? (
            <h1>Loding...</h1>
          ) : error ? (
            <h1>error...</h1>
          ) : (
            <Autocomplete
              id="asynchronous-demo"
              sx={{ width: 300, marginTop: 3 }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) => option.Site_Engineer === value.Site_Engineer}
              getOptionLabel={(option) => option.Site_Engineer}
              options={options}
              loading={load}
              value={siteEName}
              onChange={(event, newValue) => setSiteENmae(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Site Engineers"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {load ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    )
                  }}
                />
              )}
            />
          )}
        </Stack>

        <Box
          sx={{
            height: 515,
            width: '100%'
          }}
        >
          <DataGrid
            sx={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              color: 'rgb(198,198,198)',
              '& .naming-group-plan': {
                backgroundColor: 'rgba(255, 7, 0, 0.55)'
              },
              '& .naming-group-result': {
                backgroundColor: '#4834d4'
              }
            }}
            rows={siteEngineerForTable}
            columns={columns}
            getRowId={(siteEngineerForTable) => siteEngineerForTable._id}
            // getRowId={(rows) => rows._id}
            experimentalFeatures={{ columnGrouping: true }}
            disableSelectionOnClick
            columnGroupingModel={columnGroupingModel}
            checkboxSelection={false}
          />
        </Box>

        <SiteEngineerDayPlanPopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          seSite={seSite}
          siteEName={siteEName}
        ></SiteEngineerDayPlanPopup>
      </Page>
    </>
  );
}
